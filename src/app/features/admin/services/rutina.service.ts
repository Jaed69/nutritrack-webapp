import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../enviroments/enviroment';
import {
  ApiResponse,
  RutinaResponse,
  RutinaDetalleResponse,
  CrearRutinaRequest,
  ActualizarRutinaRequest,
  EjercicioRutinaRequest,
  EjercicioRutinaResponse,
  ActualizarEjercicioRutinaRequest
} from '../../../shared/models';

/**
 * Servicio para gestión de Rutinas de Ejercicio (Admin)
 * Endpoints: /api/v1/admin/rutinas
 * Módulo 3 - US-11 a US-15
 */
@Injectable({
  providedIn: 'root'
})
export class RutinaService {
  private readonly baseUrl = `${environment.apiUrl}/admin/rutinas`;

  // Signals para estado reactivo
  private readonly _rutinas = signal<RutinaResponse[]>([]);
  private readonly _rutinaActual = signal<RutinaDetalleResponse | null>(null);

  // Getters públicos de signals
  readonly rutinas = this._rutinas.asReadonly();
  readonly rutinaActual = this._rutinaActual.asReadonly();

  constructor(private http: HttpClient) {}

  /**
   * Obtener lista de rutinas (US-11)
   */
  obtenerRutinas(incluirInactivas: boolean = false): Observable<ApiResponse<RutinaResponse[]>> {
    let params = new HttpParams();
    if (incluirInactivas) {
      params = params.set('incluirInactivas', 'true');
    }

    return this.http
      .get<ApiResponse<RutinaResponse[]>>(this.baseUrl, { params })
      .pipe(
        tap(response => {
          if (response.success && response.data) {
            this._rutinas.set(response.data);
          }
        })
      );
  }

  /**
   * Obtener detalle de rutina con ejercicios (US-11)
   */
  obtenerRutinaPorId(id: number): Observable<ApiResponse<RutinaDetalleResponse>> {
    return this.http
      .get<ApiResponse<RutinaDetalleResponse>>(`${this.baseUrl}/${id}`)
      .pipe(
        tap(response => {
          if (response.success && response.data) {
            this._rutinaActual.set(response.data);
          }
        })
      );
  }

  /**
   * Crear rutina (US-12)
   * RN11: Nombre único
   */
  crearRutina(rutina: CrearRutinaRequest): Observable<ApiResponse<RutinaResponse>> {
    return this.http.post<ApiResponse<RutinaResponse>>(this.baseUrl, rutina);
  }

  /**
   * Actualizar rutina (US-13)
   */
  actualizarRutina(id: number, rutina: ActualizarRutinaRequest): Observable<ApiResponse<RutinaResponse>> {
    return this.http.put<ApiResponse<RutinaResponse>>(`${this.baseUrl}/${id}`, rutina);
  }

  /**
   * Eliminar rutina (US-13)
   * RN14: No eliminar si usuarios activos
   */
  eliminarRutina(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);
  }

  /**
   * Agregar ejercicio a rutina (US-15)
   * RN13: Series y repeticiones positivas
   */
  agregarEjercicio(rutinaId: number, ejercicio: EjercicioRutinaRequest): Observable<ApiResponse<EjercicioRutinaResponse>> {
    return this.http.post<ApiResponse<EjercicioRutinaResponse>>(
      `${this.baseUrl}/${rutinaId}/ejercicios`,
      ejercicio
    );
  }

  /**
   * Actualizar ejercicio de rutina (US-15)
   */
  actualizarEjercicio(
    rutinaId: number,
    ejercicioId: number,
    ejercicio: ActualizarEjercicioRutinaRequest
  ): Observable<ApiResponse<EjercicioRutinaResponse>> {
    return this.http.put<ApiResponse<EjercicioRutinaResponse>>(
      `${this.baseUrl}/${rutinaId}/ejercicios/${ejercicioId}`,
      ejercicio
    );
  }

  /**
   * Eliminar ejercicio de rutina (US-15)
   */
  eliminarEjercicio(rutinaId: number, ejercicioId: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(
      `${this.baseUrl}/${rutinaId}/ejercicios/${ejercicioId}`
    );
  }

  /**
   * Duplicar rutina con ejercicios
   */
  duplicarRutina(id: number, nuevoNombre: string): Observable<ApiResponse<RutinaResponse>> {
    return this.http.post<ApiResponse<RutinaResponse>>(`${this.baseUrl}/${id}/duplicar`, {
      nombre: nuevoNombre
    });
  }

  /**
   * Activar/desactivar rutina
   */
  cambiarEstadoRutina(id: number, activo: boolean): Observable<ApiResponse<RutinaResponse>> {
    return this.http.patch<ApiResponse<RutinaResponse>>(`${this.baseUrl}/${id}/estado`, {
      activo
    });
  }

  /**
   * Limpiar estado
   */
  limpiarEstado(): void {
    this._rutinas.set([]);
    this._rutinaActual.set(null);
  }
}
