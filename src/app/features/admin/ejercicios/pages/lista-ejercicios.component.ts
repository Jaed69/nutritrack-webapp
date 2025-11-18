import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-lista-ejercicios',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule
  ],
  template: `
    <div class="page-container">
      <div class="page-header">
        <div class="header-content">
          <h1 class="page-title">
            <mat-icon>directions_run</mat-icon>
            Gestión de Ejercicios
          </h1>
          <p class="page-subtitle">Administra los ejercicios disponibles en el sistema</p>
        </div>
        <button mat-raised-button color="primary" routerLink="/admin/ejercicios/crear">
          <mat-icon>add</mat-icon>
          Nuevo Ejercicio
        </button>
      </div>

      <mat-card>
        <mat-card-content>
          <div class="empty-state">
            <mat-icon class="empty-icon">fitness_center</mat-icon>
            <h3>No hay ejercicios registrados</h3>
            <p>Comienza creando tu primer ejercicio para el sistema</p>
            <button mat-raised-button color="primary" routerLink="/admin/ejercicios/crear">
              <mat-icon>add</mat-icon>
              Crear Primer Ejercicio
            </button>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .page-container {
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 2rem;
      gap: 2rem;
    }

    .header-content {
      flex: 1;
    }

    .page-title {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 2rem;
      font-weight: 700;
      color: #1a1a1a;
      margin: 0 0 0.5rem 0;
    }

    .page-title mat-icon {
      font-size: 2rem;
      width: 2rem;
      height: 2rem;
      color: #00A859;
    }

    .page-subtitle {
      font-size: 1rem;
      color: #666;
      margin: 0;
    }

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
    }

    .empty-icon {
      font-size: 4rem;
      width: 4rem;
      height: 4rem;
      color: #ccc;
      margin-bottom: 1rem;
    }

    .empty-state h3 {
      font-size: 1.5rem;
      font-weight: 600;
      color: #333;
      margin: 0 0 0.5rem 0;
    }

    .empty-state p {
      font-size: 1rem;
      color: #666;
      margin: 0 0 2rem 0;
    }
  `]
})
export class ListaEjerciciosComponent {
  // TODO: Conectar con servicio de backend
}
