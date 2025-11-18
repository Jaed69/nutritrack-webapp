import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NavbarUserComponent } from '../components/navbar-user.component';
import { NavbarAdminComponent } from '../components/navbar-admin.component';
import { SidebarComponent } from '../components/sidebar.component';
import { AdminSidebarComponent } from '../components/admin-sidebar.component';
import { FooterComponent } from '../components/footer.component';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    NavbarUserComponent, 
    NavbarAdminComponent, 
    SidebarComponent, 
    AdminSidebarComponent,
    FooterComponent
  ],
  template: `
    <div class="auth-layout" [class.admin-layout]="isAdminRoute()">
      @if (isAdminRoute()) {
        <!-- Admin Layout: Solo sidebar, sin navbar superior -->
        <app-admin-sidebar />
        <div class="admin-content-wrapper">
          <main class="admin-main">
            <router-outlet />
          </main>
        </div>
      } @else {
        <!-- User Layout: Navbar superior + sidebar lateral -->
        @if (isAdmin()) {
          <app-navbar-admin />
        } @else {
          <app-navbar-user />
        }

        <app-sidebar />

        <div class="content-wrapper" [class.sidebar-open]="true">
          <main class="auth-main">
            <router-outlet />
          </main>

          <app-footer />
        </div>
      }
    </div>
  `,
  styles: [`
    .auth-layout {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    /* Admin Layout - Sin navbar superior */
    .auth-layout.admin-layout {
      display: flex;
      flex-direction: row;
      height: 100vh;
      overflow: hidden;
    }

    .admin-content-wrapper {
      flex: 1;
      margin-left: 260px;
      overflow-y: auto;
      background: #f5f6fa;
    }

    .admin-main {
      min-height: 100vh;
    }

    /* User Layout - Con navbar superior */
    .content-wrapper {
      display: flex;
      flex-direction: column;
      min-height: calc(100vh - 64px);
      margin-top: 64px;
      margin-left: 0;
      transition: margin-left 0.3s ease;
    }

    .content-wrapper.sidebar-open {
      margin-left: 260px;
    }

    .auth-main {
      flex: 1;
      padding: 2rem;
      background: #f8f9fa;
      min-height: calc(100vh - 64px - 60px);
    }

    @media (max-width: 768px) {
      .admin-content-wrapper {
        margin-left: 0;
      }

      .content-wrapper {
        margin-top: 60px;
        min-height: calc(100vh - 60px);
      }

      .content-wrapper.sidebar-open {
        margin-left: 0;
      }

      .auth-main {
        min-height: calc(100vh - 60px - 60px);
      }
    }
  `]
})
export class AuthLayoutComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  // id_rol = 2 es Admin
  isAdmin = computed(() => this.authService.currentUser()?.id_rol === 2);

  // Detecta si estamos en rutas de administración
  isAdminRoute(): boolean {
    return this.router.url.startsWith('/admin');
  }
}