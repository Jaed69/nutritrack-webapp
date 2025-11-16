/**
 * Modelos para Rutinas de Ejercicio (Módulo 3)
 * Backend: /api/v1/admin/rutinas
 */

export enum NivelDificultad {
  PRINCIPIANTE = 'PRINCIPIANTE',
  INTERMEDIO = 'INTERMEDIO',
  AVANZADO = 'AVANZADO'
}

export enum DiaSemana {
  LUNES = 'LUNES',
  MARTES = 'MARTES',
  MIERCOLES = 'MIERCOLES',
  JUEVES = 'JUEVES',
  VIERNES = 'VIERNES',
  SABADO = 'SABADO',
  DOMINGO = 'DOMINGO'
}

export interface CrearRutinaRequest {
  nombre: string;
  descripcion: string;
  duracionSemanas: number;
  nivelDificultad: NivelDificultad;
  frecuenciaSemanal: number;
  etiquetaIds: number[];
}

export interface ActualizarRutinaRequest {
  nombre?: string;
  descripcion?: string;
  duracionSemanas?: number;
  nivelDificultad?: NivelDificultad;
  frecuenciaSemanal?: number;
  etiquetaIds?: number[];
  activo?: boolean;
}

export interface RutinaResponse {
  id: number;
  nombre: string;
  descripcion: string;
  duracionSemanas: number;
  nivelDificultad: NivelDificultad;
  frecuenciaSemanal: number;
  etiquetas: Array<{
    id: number;
    nombre: string;
    tipo: string;
  }>;
  activo: boolean;
  fechaCreacion: string;
  fechaActualizacion: string;
  numeroUsuariosActivos?: number;
}

export interface EjercicioRutinaRequest {
  ejercicioId: number;
  series: number;
  repeticiones: number;
  peso?: number;
  duracionMinutos?: number;
  tiempoDescanso?: number;
  diaSemana: DiaSemana;
  orden: number;
  notas?: string;
}

export interface ActualizarEjercicioRutinaRequest {
  series?: number;
  repeticiones?: number;
  peso?: number;
  duracionMinutos?: number;
  tiempoDescanso?: number;
  diaSemana?: DiaSemana;
  orden?: number;
  notas?: string;
}

export interface EjercicioRutinaResponse {
  id: number;
  ejercicioId: number;
  nombreEjercicio: string;
  descripcionEjercicio: string;
  series: number;
  repeticiones: number;
  peso?: number;
  duracionMinutos?: number;
  tiempoDescanso?: number;
  diaSemana: DiaSemana;
  orden: number;
  notas?: string;
}

export interface RutinaDetalleResponse extends RutinaResponse {
  ejercicios: EjercicioRutinaResponse[];
  ejerciciosPorDia: {
    [dia: string]: EjercicioRutinaResponse[];
  };
}
