import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RutinaService } from '../../services/rutina.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { RutinaResponse } from '../../../../shared/models';

/**
 * Lista de Rutinas de Ejercicio (Admin)
 * US-11: Ver todas las rutinas
 */
@Component({
  selector: 'app-lista-rutinas',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="rutinas-container">
      <div class="header">
        <h1>Gestión de Rutinas de Ejercicio</h1>
        <button class="btn-primary" routerLink="/admin/rutinas/crear">
          <i class="icon">+</i> Crear Rutina
        </button>
      </div>

      <div class="filters">
        <div class="search-box">
          <input
            type="text"
            [(ngModel)]="filtroNombre"
            (ngModelChange)="filtrarRutinas()"
            placeholder="Buscar por nombre..."
          />
        </div>
        <label class="checkbox-label">
          <input
            type="checkbox"
            [(ngModel)]="mostrarInactivas"
            (ngModelChange)="cargarRutinas()"
          />
          Mostrar rutinas inactivas
        </label>
      </div>

      @if (loading()) {
        <div class="loading">Cargando rutinas...</div>
      }

      @if (!loading() && rutinasFiltradas().length === 0) {
        <div class="empty-state">
          <p>No hay rutinas registradas</p>
          <button class="btn-primary" routerLink="/admin/rutinas/crear">
            Crear la primera rutina
          </button>
        </div>
      }

      @if (!loading() && rutinasFiltradas().length > 0) {
        <div class="rutinas-grid">
          @for (rutina of rutinasFiltradas(); track rutina.id) {
            <div class="rutina-card" [class.inactiva]="!rutina.activo">
              <div class="rutina-header">
                <h3>{{ rutina.nombre }}</h3>
                <span class="badge" [class.badge-inactive]="!rutina.activo">
                  {{ rutina.activo ? 'Activa' : 'Inactiva' }}
                </span>
              </div>

              <p class="rutina-description">{{ rutina.descripcion }}</p>

              <div class="rutina-stats">
                <div class="stat">
                  <span class="stat-label">Duración:</span>
                  <span class="stat-value">{{ rutina.duracionSemanas }} semanas</span>
                </div>
                <div class="stat">
                  <span class="stat-label">Nivel:</span>
                  <span class="stat-value">{{ formatearNivel(rutina.nivelDificultad) }}</span>
                </div>
                <div class="stat">
                  <span class="stat-label">Frecuencia:</span>
                  <span class="stat-value">{{ rutina.frecuenciaSemanal }}x semana</span>
                </div>
                @if (rutina.numeroUsuariosActivos !== undefined && rutina.numeroUsuariosActivos > 0) {
                  <div class="stat usuarios-activos">
                    <span class="stat-label">Usuarios activos:</span>
                    <span class="stat-value">{{ rutina.numeroUsuariosActivos }}</span>
                  </div>
                }
              </div>

              <div class="rutina-etiquetas">
                @for (etiqueta of rutina.etiquetas; track etiqueta.id) {
                  <span class="etiqueta">{{ etiqueta.nombre }}</span>
                }
              </div>

              <div class="rutina-actions">
                <button class="btn-secondary" [routerLink]="['/admin/rutinas', rutina.id, 'editar']">
                  Editar
                </button>
                <button class="btn-secondary" [routerLink]="['/admin/rutinas', rutina.id, 'ejercicios']">
                  Gestionar Ejercicios
                </button>
                <button
                  class="btn-danger"
                  (click)="confirmarEliminar(rutina)"
                  [disabled]="rutina.numeroUsuariosActivos && rutina.numeroUsuariosActivos > 0"
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
    .rutinas-container {
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

    .rutinas-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 1.5rem;
    }

    .rutina-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .rutina-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    }

    .rutina-card.inactiva {
      opacity: 0.7;
      background: #f7fafc;
    }

    .rutina-header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 1rem;
    }

    .rutina-header h3 {
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

    .rutina-description {
      color: #718096;
      margin-bottom: 1rem;
      line-height: 1.5;
    }

    .rutina-stats {
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

    .rutina-etiquetas {
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

    .rutina-actions {
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
export class ListaRutinasComponent implements OnInit {
  loading = signal(false);
  mostrarInactivas = signal(false);
  filtroNombre = signal('');
  rutinasFiltradas = signal<RutinaResponse[]>([]);

  constructor(
    private rutinaService: RutinaService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarRutinas();
  }

  cargarRutinas(): void {
    this.loading.set(true);
    this.rutinaService.obtenerRutinas(this.mostrarInactivas()).subscribe({
      next: (response) => {
        this.loading.set(false);
        if (response.success) {
          this.rutinasFiltradas.set(response.data || []);
        }
      },
      error: () => {
        this.loading.set(false);
        this.notificationService.showError('Error al cargar rutinas');
      }
    });
  }

  filtrarRutinas(): void {
    const rutinas = this.rutinaService.rutinas();
    const filtro = this.filtroNombre().toLowerCase();
    
    if (!filtro) {
      this.rutinasFiltradas.set(rutinas);
      return;
    }

    const filtradas = rutinas.filter(rutina =>
      rutina.nombre.toLowerCase().includes(filtro) ||
      rutina.descripcion.toLowerCase().includes(filtro)
    );
    this.rutinasFiltradas.set(filtradas);
  }

  confirmarEliminar(rutina: RutinaResponse): void {
    if (rutina.numeroUsuariosActivos && rutina.numeroUsuariosActivos > 0) {
      this.notificationService.showError(
        `No puedes eliminar esta rutina porque ${rutina.numeroUsuariosActivos} usuario(s) la tienen activa (RN14)`
      );
      return;
    }

    const confirmado = confirm(
      `¿Estás seguro de eliminar la rutina "${rutina.nombre}"?\n\nEsta acción no se puede deshacer.`
    );

    if (confirmado) {
      this.rutinaService.eliminarRutina(rutina.id).subscribe({
        next: (response) => {
          if (response.success) {
            this.notificationService.showSuccess('Rutina eliminada exitosamente');
            this.cargarRutinas();
          }
        },
        error: (error) => {
          if (error.status === 409) {
            this.notificationService.showError(error.error.message || 'La rutina tiene usuarios activos');
          } else {
            this.notificationService.showError('Error al eliminar rutina');
          }
        }
      });
    }
  }

  formatearNivel(nivel: string): string {
    const niveles: Record<string, string> = {
      'PRINCIPIANTE': 'Principiante',
      'INTERMEDIO': 'Intermedio',
      'AVANZADO': 'Avanzado'
    };
    return niveles[nivel] || nivel;
  }
}
