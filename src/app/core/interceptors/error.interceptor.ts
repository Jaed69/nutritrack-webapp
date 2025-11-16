import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('🔴 Error interceptado:', error);
      
      let errorMessage = 'Ocurrió un error';

      if (error.error instanceof ErrorEvent) {
        // Error del cliente (red, etc)
        errorMessage = `Error de conexión: ${error.error.message}`;
        console.error('🔴 Error del cliente:', errorMessage);
      } else {
        // Error del servidor
        errorMessage = error.error?.message || error.message || 'Error desconocido';
        console.error('🔴 Error del servidor:', {
          status: error.status,
          message: errorMessage,
          url: error.url
        });

        // Si el error es 401 (Unauthorized), hacer logout solo si no es login/registro
        if (error.status === 401 && !error.url?.includes('/auth/login') && !error.url?.includes('/auth/registro')) {
          console.log('🔒 Token expirado, cerrando sesión');
          authService.logout();
          router.navigate(['/login']);
        }

        // Si el error es 403 (Forbidden), redirigir
        if (error.status === 403) {
          console.log('🚫 Acceso denegado');
          router.navigate(['/']);
        }
      }

      return throwError(() => error);
    })
  );
};