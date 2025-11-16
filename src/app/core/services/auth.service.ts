import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../enviroments/enviroment';
import { StorageService } from './storage.service';
import { LoginRequest, RegisterRequest, ApiLoginResponse, AuthResponse, UserResponse, RoleType } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private storage = inject(StorageService);
  private router = inject(Router);
  private apiUrl = `${environment.apiUrl}/auth`;

  // Signals para ESTADO COMPARTIDO
  private _currentUser = signal<UserResponse | null>(null);
  private _isAuthenticated = signal<boolean>(false);
  private _token = signal<string | null>(null);

  currentUser = this._currentUser.asReadonly();
  isAuthenticated = this._isAuthenticated.asReadonly();
  token = this._token.asReadonly();

  constructor() {
    this.loadAuthData();
  }

  // POST - Login
  login(credentials: LoginRequest): Observable<ApiLoginResponse> {
    console.log('🚀 Enviando login a:', `${this.apiUrl}/login`);
    console.log('📧 Credenciales:', credentials.email);
    
    return this.http.post<ApiLoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        console.log('✅ Respuesta completa recibida:', response);
        console.log('✅ Response.data:', response.data);
        
        // Extraer el data de la respuesta envuelta
        this.saveAuthData(response.data);
      })
    );
  }

  // POST - Register
  register(data: RegisterRequest): Observable<ApiLoginResponse> {
    return this.http.post<ApiLoginResponse>(`${this.apiUrl}/registro`, data).pipe(
      tap(response => {
        // Extraer el data de la respuesta envuelta
        this.saveAuthData(response.data);
      })
    );
  }

  // Logout
  logout(): void {
    this.storage.removeItem('token');
    this.storage.removeItem('user');
    this._currentUser.set(null);
    this._isAuthenticated.set(false);
    this._token.set(null);
    this.router.navigate(['/login']);
  }

  // Helpers privados
  private saveAuthData(response: AuthResponse): void {
    console.log('🔐 Respuesta del backend:', JSON.stringify(response, null, 2));
    
    this.storage.setItem('token', response.token);
    this._token.set(response.token);

    // Convertir el role string a id_rol numérico
    let roleId: number;
    if (response.role === 'ROLE_ADMIN') {
      roleId = RoleType.ROLE_ADMIN; // 2
      console.log('✅ Usuario identificado como ADMIN');
    } else {
      roleId = RoleType.ROLE_USER; // 1
      console.log('✅ Usuario identificado como USER');
    }
    
    console.log('📋 id_rol asignado:', roleId);

    // Construir el usuario con los datos del backend (manejo seguro de campos opcionales)
    const user: UserResponse = {
      id: response.userId?.toString() || '',
      email: response.email,
      name: `${response.nombre || ''} ${response.apellido || ''}`.trim() || response.email,
      id_rol: roleId,
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    console.log('👤 Usuario guardado:', JSON.stringify(user, null, 2));
    
    this.storage.setItem('user', user);
    this._currentUser.set(user);
    this._isAuthenticated.set(true);
    
    console.log('🔑 Es admin?:', this.isAdmin());
  }

  private loadAuthData(): void {
    const token = this.storage.getItem<string>('token');
    const user = this.storage.getItem<UserResponse>('user');

    if (token && user) {
      this._token.set(token);
      this._currentUser.set(user);
      this._isAuthenticated.set(true);
    }
  }

  // Getters para guards
  isAdmin(): boolean {
    const user = this._currentUser();
    // id_rol = 2 es Admin
    return user?.id_rol === RoleType.ROLE_ADMIN || user?.id_rol === 2;
  }

  isUser(): boolean {
    const user = this._currentUser();
    // id_rol = 1 es Usuario normal
    return user?.id_rol === RoleType.ROLE_USER || user?.id_rol === 1;
  }

  getToken(): string | null {
    return this._token();
  }

  get currentUserValue(): UserResponse | null {
    return this._currentUser();
  }
}