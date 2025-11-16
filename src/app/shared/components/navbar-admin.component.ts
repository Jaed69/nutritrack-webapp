import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar-admin',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="navbar admin">
      <div class="navbar-container">
        <div class="navbar-brand">
          <span class="brand-icon">👨‍💼</span>
          <span class="brand-text">Admin Panel</span>
        </div>

        <div class="navbar-menu">
          <a routerLink="/admin/dashboard" class="nav-link" routerLinkActive="active">
            <span class="nav-icon">🏠</span>
            Dashboard
          </a>
          <a routerLink="/admin/planes" class="nav-link" routerLinkActive="active">
            <span class="nav-icon">🥗</span>
            Planes
          </a>
          <a routerLink="/admin/rutinas" class="nav-link" routerLinkActive="active">
            <span class="nav-icon">💪</span>
            Rutinas
          </a>
        </div>

        <div class="navbar-actions">
          <div class="user-info">
            <span class="user-icon">👨‍💼</span>
            <span class="user-name">{{ authService.currentUser()?.name }}</span>
            <span class="admin-badge">ADMIN</span>
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
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      z-index: 1000;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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
      color: white;
      cursor: pointer;
    }

    .brand-icon {
      font-size: 2rem;
    }

    .navbar-menu {
      display: flex;
      gap: 0.5rem;
      flex: 1;
      justify-content: center;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.25rem;
      color: rgba(255, 255, 255, 0.9);
      text-decoration: none;
      border-radius: 8px;
      font-weight: 500;
      transition: all 0.2s;
    }

    .nav-link:hover {
      background: rgba(255, 255, 255, 0.15);
      color: white;
    }

    .nav-link.active {
      background: rgba(255, 255, 255, 0.25);
      color: white;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
      gap: 0.75rem;
      padding: 0.5rem 1rem;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      backdrop-filter: blur(10px);
    }

    .user-icon {
      font-size: 1.5rem;
    }

    .user-name {
      font-weight: 600;
      color: white;
    }

    .admin-badge {
      padding: 0.25rem 0.75rem;
      background: rgba(34, 197, 94, 0.9);
      color: white;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.5px;
    }

    .logout-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.25rem;
      background: rgba(239, 68, 68, 0.9);
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .logout-btn:hover {
      background: rgba(220, 38, 38, 1);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
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

      .user-name, .admin-badge {
        display: none;
      }
    }
  `]
})
export class NavbarAdminComponent {
  authService = inject(AuthService);
  private router = inject(Router);

  logout() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      this.authService.logout();
    }
  }
}