import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PlanService } from '../../services/plan.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { PlanResponse } from '../../../../shared/models';

/**
 * Lista de Planes Nutricionales (Admin)
 * US-11: Ver todos los planes con filtros
 * RN14: Muestra número de usuarios activos
 */
@Component({
  selector: 'app-lista-planes',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="planes-container">
      <div class="header">
        <h1>Gestión de Planes Nutricionales</h1>
        <button class="btn-primary" routerLink="/admin/planes/crear">
          <i class="icon">+</i> Crear Plan
        </button>
      </div>

      <div class="filters">
        <div class="search-box">
          <input
            type="text"
            [(ngModel)]="filtroNombre"
            (ngModelChange)="filtrarPlanes()"
            placeholder="Buscar por nombre..."
          />
        </div>
        <label class="checkbox-label">
          <input
            type="checkbox"
            [(ngModel)]="mostrarInactivos"
            (ngModelChange)="cargarPlanes()"
          />
          Mostrar planes inactivos
        </label>
      </div>

      @if (loading()) {
        <div class="loading">Cargando planes...</div>
      }

      @if (!loading() && planesFiltrados().length === 0) {
        <div class="empty-state">
          <p>No hay planes registrados</p>
          <button class="btn-primary" routerLink="/admin/planes/crear">
            Crear el primer plan
          </button>
        </div>
      }

      @if (!loading() && planesFiltrados().length > 0) {
        <div class="planes-grid">
          @for (plan of planesFiltrados(); track plan.id) {
            <div class="plan-card" [class.inactivo]="!plan.activo">
              <div class="plan-header">
                <h3>{{ plan.nombre }}</h3>
                <span class="badge" [class.badge-inactive]="!plan.activo">
                  {{ plan.activo ? 'Activo' : 'Inactivo' }}
                </span>
              </div>

              <p class="plan-description">{{ plan.descripcion }}</p>

              <div class="plan-stats">
                <div class="stat">
                  <span class="stat-label">Duración:</span>
                  <span class="stat-value">{{ plan.duracionDias }} días</span>
                </div>
                <div class="stat">
                  <span class="stat-label">Objetivo:</span>
                  <span class="stat-value">{{ formatearObjetivo(plan.objetivo.tipoObjetivo) }}</span>
                </div>
                <div class="stat">
                  <span class="stat-label">Calorías:</span>
                  <span class="stat-value">{{ plan.objetivo.caloriasObjetivo }} kcal</span>
                </div>
                @if (plan.numeroUsuariosActivos !== undefined && plan.numeroUsuariosActivos > 0) {
                  <div class="stat usuarios-activos">
                    <span class="stat-label">Usuarios activos:</span>
                    <span class="stat-value">{{ plan.numeroUsuariosActivos }}</span>
                  </div>
                }
              </div>

              <div class="plan-etiquetas">
                @for (etiqueta of plan.etiquetas; track etiqueta.id) {
                  <span class="etiqueta">{{ etiqueta.nombre }}</span>
                }
              </div>

              <div class="plan-actions">
                <button class="btn-secondary" [routerLink]="['/admin/planes', plan.id, 'editar']">
                  Editar
                </button>
                <button class="btn-secondary" [routerLink]="['/admin/planes', plan.id, 'dias']">
                  Configurar Días
                </button>
                <button
                  class="btn-danger"
                  (click)="confirmarEliminar(plan)"
                  [disabled]="plan.numeroUsuariosActivos && plan.numeroUsuariosActivos > 0"
                >
                  Eliminar
                </button>
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .planes-container {
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    h1 {
      font-size: 2rem;
      color: #2d3748;
      margin: 0;
    }

    .filters {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
      align-items: center;
    }

    .search-box {
      flex: 1;
      max-width: 400px;
    }

    .search-box input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      font-size: 1rem;
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
    }

    .planes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 1.5rem;
    }

    .plan-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .plan-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    }

    .plan-card.inactivo {
      opacity: 0.7;
      background: #f7fafc;
    }

    .plan-header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 1rem;
    }

    .plan-header h3 {
      margin: 0;
      font-size: 1.25rem;
      color: #2d3748;
      flex: 1;
    }

    .badge {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.875rem;
      font-weight: 600;
      background: #48bb78;
      color: white;
    }

    .badge-inactive {
      background: #cbd5e0;
      color: #4a5568;
    }

    .plan-description {
      color: #718096;
      margin-bottom: 1rem;
      line-height: 1.5;
    }

    .plan-stats {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.75rem;
      margin-bottom: 1rem;
      padding: 1rem;
      background: #f7fafc;
      border-radius: 8px;
    }

    .stat {
      display: flex;
      flex-direction: column;
    }

    .stat-label {
      font-size: 0.875rem;
      color: #718096;
      margin-bottom: 0.25rem;
    }

    .stat-value {
      font-size: 1rem;
      font-weight: 600;
      color: #2d3748;
    }

    .usuarios-activos {
      grid-column: 1 / -1;
      background: #fed7d7;
      padding: 0.5rem;
      border-radius: 6px;
    }

    .usuarios-activos .stat-value {
      color: #c53030;
    }

    .plan-etiquetas {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .etiqueta {
      padding: 0.25rem 0.75rem;
      background: #edf2f7;
      color: #4a5568;
      border-radius: 20px;
      font-size: 0.875rem;
    }

    .plan-actions {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .btn-primary, .btn-secondary, .btn-danger {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 0.875rem;
    }

    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    .btn-secondary {
      background: #edf2f7;
      color: #4a5568;
      flex: 1;
    }

    .btn-secondary:hover {
      background: #e2e8f0;
    }

    .btn-danger {
      background: #fc8181;
      color: white;
    }

    .btn-danger:hover:not(:disabled) {
      background: #f56565;
    }

    .btn-danger:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .loading, .empty-state {
      text-align: center;
      padding: 3rem;
      color: #718096;
    }

    .empty-state p {
      font-size: 1.125rem;
      margin-bottom: 1rem;
    }

    .icon {
      font-size: 1.25rem;
      margin-right: 0.25rem;
    }
  `]
})
export class ListaPlanesComponent implements OnInit {
  loading = signal(false);
  mostrarInactivos = signal(false);
  filtroNombre = signal('');
  planesFiltrados = signal<PlanResponse[]>([]);

  constructor(
    private planService: PlanService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarPlanes();
  }

  cargarPlanes(): void {
    this.loading.set(true);
    this.planService.obtenerPlanes(this.mostrarInactivos()).subscribe({
      next: (response) => {
        this.loading.set(false);
        if (response.success) {
          this.planesFiltrados.set(response.data || []);
        }
      },
      error: () => {
        this.loading.set(false);
        this.notificationService.showError('Error al cargar planes');
      }
    });
  }

  filtrarPlanes(): void {
    const planes = this.planService.planes();
    const filtro = this.filtroNombre().toLowerCase();
    
    if (!filtro) {
      this.planesFiltrados.set(planes);
      return;
    }

    const filtrados = planes.filter(plan =>
      plan.nombre.toLowerCase().includes(filtro) ||
      plan.descripcion.toLowerCase().includes(filtro)
    );
    this.planesFiltrados.set(filtrados);
  }

  confirmarEliminar(plan: PlanResponse): void {
    if (plan.numeroUsuariosActivos && plan.numeroUsuariosActivos > 0) {
      this.notificationService.showError(
        `No puedes eliminar este plan porque ${plan.numeroUsuariosActivos} usuario(s) lo tienen activo (RN14)`
      );
      return;
    }

    const confirmado = confirm(
      `¿Estás seguro de eliminar el plan "${plan.nombre}"?\n\nEsta acción no se puede deshacer.`
    );

    if (confirmado) {
      this.planService.eliminarPlan(plan.id).subscribe({
        next: (response) => {
          if (response.success) {
            this.notificationService.showSuccess('Plan eliminado exitosamente');
            this.cargarPlanes();
          }
        },
        error: (error) => {
          if (error.status === 409) {
            this.notificationService.showError(error.error.message || 'El plan tiene usuarios activos');
          } else {
            this.notificationService.showError('Error al eliminar plan');
          }
        }
      });
    }
  }

  formatearObjetivo(tipo: string): string {
    const objetivos: Record<string, string> = {
      'PERDIDA_PESO': 'Pérdida de Peso',
      'GANANCIA_MUSCULAR': 'Ganancia Muscular',
      'MANTENIMIENTO': 'Mantenimiento',
      'DEFINICION': 'Definición',
      'SALUD_GENERAL': 'Salud General'
    };
    return objetivos[tipo] || tipo;
  }
}
