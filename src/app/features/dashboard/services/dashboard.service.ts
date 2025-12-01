import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of, map, catchError } from 'rxjs';
import { environment } from '../../../../enviroments/enviroment';
import { ApiResponse } from '../../../core/models/common.model';

export interface DashboardStats {
  // Perfil
  nombreCompleto: string;
  objetivo: string;
  nivelActividad: string;
  
  // Mediciones
  pesoActual: number;
  pesoInicial: number;
  pesoObjetivo: number;
  altura: number;
  imc: number;
  categoriaIMC: string;
  cambiosPeso: number;
  
  // Progreso del día
  caloriasConsumidas: number;
  caloriasObjetivo: number;
  proteinasConsumidas: number;
  proteinasObjetivo: number;
  carbohidratosConsumidos: number;
  carbohidratosObjetivo: number;
  grasasConsumidas: number;
  grasasObjetivo: number;
  
  // Ejercicios
  caloriasQuemadas: number;
  ejerciciosCompletados: number;
  ejerciciosProgramados: number;
  minutosEntrenamiento: number;
  
  // Rachas y logros
  rachaActual: number;
  rachaMasLarga: number;
  diasActivo: number;
  
  // Plan y rutina activa
  planActivo: any;
  rutinaActiva: any;
  diasEnPlan: number;
  diasEnRutina: number;
  semanasEnRutina: number;
}

export interface HistorialMedida {
  id: number;
  peso: number;
  altura: number;
  imc: number;
  fechaMedicion: string;
  unidadPeso: string;
}

export interface ProgresoSemanal {
  fecha: string;
  calorias: number;
  proteinas: number;
  carbohidratos: number;
  grasas: number;
  caloriasQuemadas: number;
  ejerciciosCompletados: number;
}

export interface Logro {
  id: string;
  nombre: string;
  descripcion: string;
  icono: string;
  desbloqueado: boolean;
  fechaDesbloqueo?: string;
  progreso: number;
  objetivo: number;
  tipo: 'racha' | 'peso' | 'ejercicio' | 'nutricion' | 'consistencia';
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  /**
   * Obtener perfil completo del usuario
   */
  obtenerPerfilCompleto(): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/perfil/completo`);
  }

  /**
   * Obtener historial de mediciones
   */
  obtenerHistorialMediciones(): Observable<ApiResponse<HistorialMedida[]>> {
    return this.http.get<ApiResponse<HistorialMedida[]>>(`${this.apiUrl}/perfil/mediciones`);
  }

  /**
   * Obtener plan activo
   */
  obtenerPlanActivo(): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/usuario/planes/activo`);
  }

  /**
   * Obtener rutina activa
   */
  obtenerRutinaActiva(): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/usuario/rutinas/activa`);
  }

  /**
   * Obtener progreso del plan de hoy
   */
  obtenerProgresoHoy(): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/usuario/registros/plan/hoy`);
  }

  /**
   * Obtener ejercicios de hoy
   */
  obtenerEjerciciosHoy(): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/usuario/registros/rutina/hoy`);
  }

  /**
   * Obtener progreso semanal de comidas
   */
  obtenerProgresoSemanalComidas(): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/usuario/registros/comidas/progreso/semanal`);
  }

  /**
   * Obtener progreso semanal de ejercicios
   */
  obtenerProgresoSemanalEjercicios(): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/usuario/registros/ejercicios/progreso/semanal`);
  }

  /**
   * Obtener historial de comidas
   */
  obtenerHistorialComidas(fechaInicio: string, fechaFin: string): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(
      `${this.apiUrl}/usuario/registros/comidas/historial`,
      { params: { fechaInicio, fechaFin } }
    );
  }

  /**
   * Obtener historial de ejercicios
   */
  obtenerHistorialEjercicios(fechaInicio: string, fechaFin: string): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(
      `${this.apiUrl}/usuario/registros/ejercicios/historial`,
      { params: { fechaInicio, fechaFin } }
    );
  }

  /**
   * Cargar todos los datos del dashboard
   */
  cargarDashboardCompleto(): Observable<{
    perfil: any;
    mediciones: HistorialMedida[];
    planActivo: any;
    rutinaActiva: any;
    progresoHoy: any;
    ejerciciosHoy: any;
    progresoSemanalComidas: any;
    progresoSemanalEjercicios: any;
  }> {
    return forkJoin({
      perfil: this.obtenerPerfilCompleto().pipe(
        map(r => r.data),
        catchError(() => of(null))
      ),
      mediciones: this.obtenerHistorialMediciones().pipe(
        map(r => r.data || []),
        catchError(() => of([]))
      ),
      planActivo: this.obtenerPlanActivo().pipe(
        map(r => r.data),
        catchError(() => of(null))
      ),
      rutinaActiva: this.obtenerRutinaActiva().pipe(
        map(r => r.data),
        catchError(() => of(null))
      ),
      progresoHoy: this.obtenerProgresoHoy().pipe(
        map(r => r.data),
        catchError(() => of(null))
      ),
      ejerciciosHoy: this.obtenerEjerciciosHoy().pipe(
        map(r => r.data),
        catchError(() => of(null))
      ),
      progresoSemanalComidas: this.obtenerProgresoSemanalComidas().pipe(
        map(r => r.data),
        catchError(() => of(null))
      ),
      progresoSemanalEjercicios: this.obtenerProgresoSemanalEjercicios().pipe(
        map(r => r.data),
        catchError(() => of(null))
      )
    });
  }

  /**
   * Calcular logros basados en los datos
   */
  calcularLogros(data: any): Logro[] {
    const logros: Logro[] = [];
    const mediciones = data.mediciones || [];
    const perfil = data.perfil;
    const progresoSemanal = data.progresoSemanalComidas;

    // Logro: Primera medición
    logros.push({
      id: 'primera-medicion',
      nombre: '¡Primera Medición!',
      descripcion: 'Registra tu primera medición corporal',
      icono: '📏',
      desbloqueado: mediciones.length > 0,
      progreso: Math.min(mediciones.length, 1),
      objetivo: 1,
      tipo: 'peso'
    });

    // Logro: 7 días de racha
    const rachaActual = this.calcularRacha(data);
    logros.push({
      id: 'racha-7',
      nombre: 'Semana Perfecta',
      descripcion: 'Mantén una racha de 7 días consecutivos',
      icono: '🔥',
      desbloqueado: rachaActual >= 7,
      progreso: Math.min(rachaActual, 7),
      objetivo: 7,
      tipo: 'racha'
    });

    // Logro: 30 días de racha
    logros.push({
      id: 'racha-30',
      nombre: 'Mes Imparable',
      descripcion: 'Mantén una racha de 30 días consecutivos',
      icono: '🏆',
      desbloqueado: rachaActual >= 30,
      progreso: Math.min(rachaActual, 30),
      objetivo: 30,
      tipo: 'racha'
    });

    // Logro: Pérdida de peso
    if (mediciones.length >= 2) {
      const primeraM = mediciones[mediciones.length - 1];
      const ultimaM = mediciones[0];
      const diferencia = primeraM.peso - ultimaM.peso;
      
      logros.push({
        id: 'perdida-5kg',
        nombre: 'Transformación',
        descripcion: 'Pierde 5 kg desde tu peso inicial',
        icono: '⚖️',
        desbloqueado: diferencia >= 5,
        progreso: Math.min(Math.max(diferencia, 0), 5),
        objetivo: 5,
        tipo: 'peso'
      });
    }

    // Logro: 10 ejercicios completados
    const ejerciciosTotal = data.progresoSemanalEjercicios?.ejerciciosCompletados || 0;
    logros.push({
      id: 'ejercicios-10',
      nombre: 'En Movimiento',
      descripcion: 'Completa 10 ejercicios',
      icono: '💪',
      desbloqueado: ejerciciosTotal >= 10,
      progreso: Math.min(ejerciciosTotal, 10),
      objetivo: 10,
      tipo: 'ejercicio'
    });

    // Logro: Meta diaria cumplida
    const comidasHoy = data.progresoHoy?.comidas?.filter((c: any) => c.registrada)?.length || 0;
    const totalComidasHoy = data.progresoHoy?.comidas?.length || 0;
    logros.push({
      id: 'meta-diaria',
      nombre: 'Día Perfecto',
      descripcion: 'Cumple todas las comidas del día',
      icono: '✨',
      desbloqueado: comidasHoy > 0 && comidasHoy === totalComidasHoy,
      progreso: comidasHoy,
      objetivo: Math.max(totalComidasHoy, 1),
      tipo: 'nutricion'
    });

    // Logro: Perfil completo
    const perfilCompleto = perfil && perfil.perfilSalud && perfil.ultimaMedicion;
    logros.push({
      id: 'perfil-completo',
      nombre: 'Listo para Empezar',
      descripcion: 'Completa tu perfil de salud y primera medición',
      icono: '🎯',
      desbloqueado: !!perfilCompleto,
      progreso: perfilCompleto ? 2 : (perfil?.perfilSalud ? 1 : 0),
      objetivo: 2,
      tipo: 'consistencia'
    });

    return logros;
  }

  /**
   * Calcular racha de días activos
   */
  calcularRacha(data: any): number {
    // Simplificación: usar días desde inicio del plan/rutina
    const planActivo = data.planActivo;
    const rutinaActiva = data.rutinaActiva;
    
    let diasActivo = 0;
    
    if (planActivo?.fechaInicio) {
      const inicio = new Date(planActivo.fechaInicio);
      const hoy = new Date();
      diasActivo = Math.max(diasActivo, Math.floor((hoy.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24)) + 1);
    }
    
    if (rutinaActiva?.fechaInicio) {
      const inicio = new Date(rutinaActiva.fechaInicio);
      const hoy = new Date();
      diasActivo = Math.max(diasActivo, Math.floor((hoy.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24)) + 1);
    }

    return diasActivo;
  }
}
