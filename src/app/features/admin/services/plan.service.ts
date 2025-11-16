import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../enviroments/enviroment';
import {
  ApiResponse,
  PlanResponse,
  PlanDetalleResponse,
  CrearPlanRequest,
  ActualizarPlanRequest,
  DiaPlanRequest,
  DiaPlanResponse
} from '../../../shared/models';

/**
 * Servicio para gestión de Planes Nutricionales (Admin)
 * Endpoints: /api/v1/admin/planes
 * Módulo 3 - US-11 a US-15
 */
@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private readonly baseUrl = `${environment.apiUrl}/admin/planes`;

  // Signals para estado reactivo
  private readonly _planes = signal<PlanResponse[]>([]);
  private readonly _planActual = signal<PlanDetalleResponse | null>(null);

  // Getters públicos de signals
  readonly planes = this._planes.asReadonly();
  readonly planActual = this._planActual.asReadonly();

  constructor(private http: HttpClient) {}

  /**
   * Obtener lista de planes (US-11)
   * @param incluirInactivos - Incluir planes desactivados
   */
  obtenerPlanes(incluirInactivos: boolean = false): Observable<ApiResponse<PlanResponse[]>> {
    let params = new HttpParams();
    if (incluirInactivos) {
      params = params.set('incluirInactivos', 'true');
    }

    return this.http
      .get<ApiResponse<PlanResponse[]>>(this.baseUrl, { params })
      .pipe(
        tap(response => {
          if (response.success && response.data) {
            this._planes.set(response.data);
          }
        })
      );
  }

  /**
   * Obtener detalle de un plan con sus días configurados (US-11)
   */
  obtenerPlanPorId(id: number): Observable<ApiResponse<PlanDetalleResponse>> {
    return this.http
      .get<ApiResponse<PlanDetalleResponse>>(`${this.baseUrl}/${id}`)
      .pipe(
        tap(response => {
          if (response.success && response.data) {
            this._planActual.set(response.data);
          }
        })
      );
  }

  /**
   * Crear un nuevo plan (US-12)
   * RN11: Validar nombre único
   * RN12: Etiquetas deben existir
   */
  crearPlan(plan: CrearPlanRequest): Observable<ApiResponse<PlanResponse>> {
    return this.http.post<ApiResponse<PlanResponse>>(this.baseUrl, plan);
  }

  /**
   * Actualizar plan existente (US-13)
   * RN11: Nombre único (si se cambia)
   */
  actualizarPlan(id: number, plan: ActualizarPlanRequest): Observable<ApiResponse<PlanResponse>> {
    return this.http.put<ApiResponse<PlanResponse>>(`${this.baseUrl}/${id}`, plan);
  }

  /**
   * Eliminar plan (US-13)
   * RN14: No se puede eliminar si tiene usuarios activos
   * RN28: Soft delete (marca como inactivo)
   */
  eliminarPlan(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);
  }

  /**
   * Asignar comida a un día del plan (US-14)
   */
  agregarDiaAlPlan(planId: number, dia: DiaPlanRequest): Observable<ApiResponse<DiaPlanResponse>> {
    return this.http.post<ApiResponse<DiaPlanResponse>>(
      `${this.baseUrl}/${planId}/dias`,
      dia
    );
  }

  /**
   * Eliminar día/comida del plan (US-14)
   */
  eliminarDiaDelPlan(planId: number, diaId: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${planId}/dias/${diaId}`);
  }

  /**
   * Duplicar un plan existente con todos sus días
   */
  duplicarPlan(id: number, nuevoNombre: string): Observable<ApiResponse<PlanResponse>> {
    return this.http.post<ApiResponse<PlanResponse>>(`${this.baseUrl}/${id}/duplicar`, {
      nombre: nuevoNombre
    });
  }

  /**
   * Activar/desactivar plan
   */
  cambiarEstadoPlan(id: number, activo: boolean): Observable<ApiResponse<PlanResponse>> {
    return this.http.patch<ApiResponse<PlanResponse>>(`${this.baseUrl}/${id}/estado`, {
      activo
    });
  }

  /**
   * Limpiar estado local
   */
  limpiarEstado(): void {
    this._planes.set([]);
    this._planActual.set(null);
  }
}
