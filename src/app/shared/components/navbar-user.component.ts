import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar-user',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="navbar">
      <div class="navbar-container">
        <div class="navbar-brand">
          <span class="brand-icon">🥗</span>
          <span class="brand-text">NutriTrack</span>
        </div>

        <div class="navbar-menu">
          <a routerLink="/dashboard" class="nav-link" routerLinkActive="active">
            <span class="nav-icon">📊</span>
            Dashboard
          </a>
          <a routerLink="/catalogo" class="nav-link" routerLinkActive="active">
            <span class="nav-icon">📋</span>
            Catálogo
          </a>
          <a routerLink="/seguimiento" class="nav-link" routerLinkActive="active">
            <span class="nav-icon">📈</span>
            Seguimiento
          </a>
        </div>

        <div class="navbar-actions">
          <div class="user-info">
            <span class="user-icon">👤</span>
            <span class="user-name">{{ authService.currentUser()?.name }}</span>
          </div>
          <button class="logout-btn" (click)="logout()" title="Cerrar Sesión">
            <span class="logout-icon">🚪</span>
            Salir
          </button>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 64px;
      background: white;
      border-bottom: 1px solid #e5e7eb;
      z-index: 1000;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .navbar-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      padding: 0 2rem;
      max-width: 1920px;
      margin: 0 auto;
    }

    .navbar-brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1.5rem;
      font-weight: 700;
      color: #10b981;
      cursor: pointer;
    }

    .brand-icon {
      font-size: 2rem;
    }

    .navbar-menu {
      display: flex;
      gap: 1rem;
      flex: 1;
      justify-content: center;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.25rem;
      color: #6b7280;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 500;
      transition: all 0.2s;
    }

    .nav-link:hover {
      background: #f3f4f6;
      color: #10b981;
    }

    .nav-link.active {
      background: #dcfce7;
      color: #10b981;
    }

    .nav-icon {
      font-size: 1.25rem;
    }

    .navbar-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: #f9fafb;
      border-radius: 8px;
    }

    .user-icon {
      font-size: 1.5rem;
    }

    .user-name {
      font-weight: 600;
      color: #374151;
    }

    .logout-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.25rem;
      background: #fee2e2;
      color: #dc2626;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .logout-btn:hover {
      background: #fecaca;
      transform: translateY(-1px);
    }

    .logout-icon {
      font-size: 1.25rem;
    }

    @media (max-width: 768px) {
      .navbar {
        height: 60px;
      }

      .navbar-container {
        padding: 0 1rem;
      }

      .navbar-menu {
        display: none;
      }

      .user-name {
        display: none;
      }
    }
  `]
})
export class NavbarUserComponent {
  authService = inject(AuthService);
  private router = inject(Router);

  logout() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      this.authService.logout();
    }
  }
}