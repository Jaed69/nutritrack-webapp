import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-lista-etiquetas',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  template: `
    <div class="page-container">
      <div class="page-header">
        <div class="header-content">
          <h1 class="page-title">
            <mat-icon>label</mat-icon>
            Gestión de Etiquetas
          </h1>
          <p class="page-subtitle">Administra las etiquetas para categorizar contenido</p>
        </div>
        <button mat-raised-button color="primary" routerLink="/admin/etiquetas/crear">
          <mat-icon>add</mat-icon>
          Nueva Etiqueta
        </button>
      </div>

      <mat-card>
        <mat-card-content>
          <div class="empty-state">
            <mat-icon class="empty-icon">local_offer</mat-icon>
            <h3>No hay etiquetas registradas</h3>
            <p>Comienza creando tu primera etiqueta para el sistema</p>
            <button mat-raised-button color="primary" routerLink="/admin/etiquetas/crear">
              <mat-icon>add</mat-icon>
              Crear Primera Etiqueta
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
export class ListaEtiquetasComponent {
  // TODO: Conectar con servicio de backend
}
