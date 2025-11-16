/**
 * Modelos para Planes Nutricionales (Módulo 3)
 * Backend: /api/v1/admin/planes
 */

export enum TipoObjetivo {
  PERDIDA_PESO = 'PERDIDA_PESO',
  GANANCIA_MUSCULAR = 'GANANCIA_MUSCULAR',
  MANTENIMIENTO = 'MANTENIMIENTO',
  DEFINICION = 'DEFINICION',
  SALUD_GENERAL = 'SALUD_GENERAL'
}

export enum TipoComida {
  DESAYUNO = 'DESAYUNO',
  ALMUERZO = 'ALMUERZO',
  CENA = 'CENA',
  SNACK = 'SNACK',
  MERIENDA = 'MERIENDA'
}

export interface ObjetivoPlan {
  caloriasObjetivo: number;
  proteinasObjetivo: number;
  carbohidratosObjetivo: number;
  grasasObjetivo: number;
  tipoObjetivo: TipoObjetivo;
}

export interface CrearPlanRequest {
  nombre: string;
  descripcion: string;
  duracionDias: number;
  objetivo: ObjetivoPlan;
  etiquetaIds: number[];
}

export interface ActualizarPlanRequest {
  nombre?: string;
  descripcion?: string;
  duracionDias?: number;
  objetivo?: ObjetivoPlan;
  etiquetaIds?: number[];
  activo?: boolean;
}

export interface PlanResponse {
  id: number;
  nombre: string;
  descripcion: string;
  duracionDias: number;
  objetivo: ObjetivoPlan;
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

export interface DiaPlanRequest {
  numeroDia: number;
  comidaId: number;
  tipoComida: TipoComida;
  porcionesRecomendadas: number;
  orden: number;
}

export interface DiaPlanResponse {
  id: number;
  numeroDia: number;
  comidaId: number;
  nombreComida: string;
  tipoComida: TipoComida;
  porcionesRecomendadas: number;
  orden: number;
  calorias: number;
  proteinas: number;
  carbohidratos: number;
  grasas: number;
}

export interface PlanDetalleResponse extends PlanResponse {
  dias: DiaPlanResponse[];
  totalesPorDia: {
    [dia: number]: {
      calorias: number;
      proteinas: number;
      carbohidratos: number;
      grasas: number;
    };
  };
}
