import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

/**
 * Dashboard principal de administración
 * Punto de entrada para módulos 2 y 3
 */
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="dashboard-container">
      <div class="welcome-section">
        <div class="welcome-content">
          <div class="welcome-text">
            <h1>🎯 Panel de Administración</h1>
            <p class="subtitle">Gestiona todo el contenido de NutriTrack desde aquí</p>
            <div class="stats-mini">
              <div class="stat-item">
                <span class="stat-icon">📊</span>
                <span class="stat-label">Centro de Control</span>
              </div>
              <div class="stat-item">
                <span class="stat-icon">⚡</span>
                <span class="stat-label">Gestión Rápida</span>
              </div>
            </div>
          </div>
          <div class="welcome-illustration">
            <div class="illustration-circle">
              <span class="illustration-emoji">👨‍💼</span>
            </div>
          </div>
        </div>
      </div>

      <div class="sections-grid">
        <!-- Módulo 2: Gestión de Contenido Base -->
        <div class="section-card content-card">
          <div class="card-header">
            <div class="card-icon">📋</div>
            <div class="card-title-area">
              <h2>Contenido Base</h2>
              <span class="badge badge-info">Módulo 2 - En desarrollo</span>
            </div>
          </div>
          <p class="card-description">Administra etiquetas, ingredientes, ejercicios y comidas</p>
          <div class="card-stats">
            <div class="stat">
              <span class="stat-number">0</span>
              <span class="stat-text">Etiquetas</span>
            </div>
            <div class="stat">
              <span class="stat-number">0</span>
              <span class="stat-text">Ingredientes</span>
            </div>
          </div>
          <div class="card-links disabled-links">
            <button class="link disabled" disabled>Etiquetas</button>
            <button class="link disabled" disabled>Ingredientes</button>
            <button class="link disabled" disabled>Ejercicios</button>
            <button class="link disabled" disabled>Comidas</button>
          </div>
          <div class="coming-soon-badge">Próximamente</div>
        </div>

        <!-- Módulo 3: Planes y Rutinas -->
        <div class="section-card highlight">
          <div class="card-header">
            <div class="card-icon-highlight">🎯</div>
            <div class="card-title-area">
              <h2>Planes y Rutinas</h2>
              <span class="badge badge-success">✓ Módulo 3 Activo</span>
            </div>
          </div>
          <p class="card-description">Crea y gestiona planes nutricionales y rutinas de ejercicio personalizadas</p>
          <div class="card-stats highlight-stats">
            <div class="stat">
              <span class="stat-icon">🥗</span>
              <span class="stat-text">Planes Disponibles</span>
            </div>
            <div class="stat">
              <span class="stat-icon">💪</span>
              <span class="stat-text">Rutinas de Ejercicio</span>
            </div>
          </div>
          <div class="card-links">
            <a routerLink="/admin/planes" class="link-primary">
              <div class="link-icon">🥗</div>
              <div class="link-content">
                <strong>Planes Nutricionales</strong>
                <small>Crear y configurar planes alimenticios</small>
              </div>
              <div class="link-arrow">→</div>
            </a>
            <a routerLink="/admin/rutinas" class="link-primary">
              <div class="link-icon">💪</div>
              <div class="link-content">
                <strong>Rutinas de Ejercicio</strong>
                <small>Diseñar rutinas de entrenamiento</small>
              </div>
              <div class="link-arrow">→</div>
            </a>
          </div>
        </div>
      </div>

      <!-- Guía rápida -->
      <div class="quick-guide">
        <h3>🚀 Guía Rápida</h3>
        <div class="steps">
          <div class="step">
            <span class="step-number">1</span>
            <div class="step-content">
              <strong>Configura el contenido base</strong>
              <p>Crea etiquetas, ingredientes, ejercicios y comidas primero</p>
            </div>
          </div>
          <div class="step">
            <span class="step-number">2</span>
            <div class="step-content">
              <strong>Diseña planes nutricionales</strong>
              <p>Crea planes y asigna comidas para cada día</p>
            </div>
          </div>
          <div class="step">
            <span class="step-number">3</span>
            <div class="step-content">
              <strong>Crea rutinas de ejercicio</strong>
              <p>Diseña rutinas y agrega ejercicios por día</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Reglas de negocio importantes -->
      <div class="business-rules">
        <h3>⚠️ Reglas de Negocio Importantes</h3>
        <ul>
          <li><strong>RN11:</strong> Los nombres de planes y rutinas deben ser únicos</li>
          <li><strong>RN13:</strong> Series y repeticiones deben ser valores positivos</li>
          <li><strong>RN14:</strong> No se pueden eliminar planes/rutinas con usuarios activos</li>
          <li><strong>RN28:</strong> Las eliminaciones son soft delete (marca como inactivo)</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
      min-height: 100vh;
      background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%);
    }

    .welcome-section {
      margin-bottom: 3rem;
      background: white;
      border-radius: 24px;
      padding: 3rem;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
    }

    .welcome-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 3rem;
    }

    .welcome-text {
      flex: 1;
    }

    .welcome-section h1 {
      font-size: 2.5rem;
      color: #2d3748;
      margin-bottom: 0.75rem;
      font-weight: 800;
    }

    .subtitle {
      font-size: 1.25rem;
      color: #64748b;
      margin-bottom: 1.5rem;
    }

    .stats-mini {
      display: flex;
      gap: 2rem;
      margin-top: 1.5rem;
    }

    .stat-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.25rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 12px;
      font-weight: 600;
    }

    .stat-icon {
      font-size: 1.5rem;
    }

    .welcome-illustration {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .illustration-circle {
      width: 180px;
      height: 180px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 20px 60px rgba(102, 126, 234, 0.4);
      animation: float 3s ease-in-out infinite;
    }

    .illustration-emoji {
      font-size: 5rem;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }

    .sections-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
      gap: 2.5rem;
      margin-bottom: 3rem;
    }

    .section-card {
      background: white;
      border-radius: 24px;
      padding: 2.5rem;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }

    .section-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 5px;
      background: linear-gradient(90deg, #94a3b8, #cbd5e1);
    }

    .section-card.content-card::before {
      background: linear-gradient(90deg, #94a3b8, #cbd5e1);
    }

    .section-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
    }

    .section-card.highlight {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .section-card.highlight::before {
      background: rgba(255, 255, 255, 0.3);
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .card-icon, .card-icon-highlight {
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      border-radius: 16px;
      background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    }

    .card-icon-highlight {
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
    }

    .card-title-area {
      flex: 1;
    }

    .card-title-area h2 {
      font-size: 1.75rem;
      margin: 0 0 0.5rem 0;
      font-weight: 700;
    }

    .section-card.highlight h2,
    .section-card.highlight .card-description {
      color: white;
    }

    .badge {
      display: inline-block;
      padding: 0.375rem 1rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .badge-info {
      background: #dbeafe;
      color: #1e40af;
    }

    .badge-success {
      background: rgba(255, 255, 255, 0.95);
      color: #059669;
    }

    .coming-soon-badge {
      position: absolute;
      top: 20px;
      right: 20px;
      padding: 0.5rem 1rem;
      background: #fbbf24;
      color: #78350f;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
    }

    .card-description {
      color: #64748b;
      margin-bottom: 2rem;
      line-height: 1.7;
      font-size: 1.05rem;
    }

    .section-card.highlight .card-description {
      color: rgba(255, 255, 255, 0.9);
    }

    .card-stats {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: #f8fafc;
      border-radius: 16px;
    }

    .highlight-stats {
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
    }

    .stat {
      text-align: center;
    }

    .stat-number {
      display: block;
      font-size: 2rem;
      font-weight: 800;
      color: #667eea;
      margin-bottom: 0.25rem;
    }

    .stat-text {
      display: block;
      font-size: 0.875rem;
      color: #64748b;
      font-weight: 600;
    }

    .highlight-stats .stat-icon {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    .highlight-stats .stat-text {
      color: rgba(255, 255, 255, 0.9);
    }

    .card-links {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .disabled-links {
      opacity: 0.5;
      pointer-events: none;
    }

    .link, .link-primary {
      padding: 1rem 1.5rem;
      background: #f8fafc;
      color: #475569;
      border: 2px solid transparent;
      border-radius: 16px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    .link:hover:not(.disabled) {
      background: #e2e8f0;
      transform: translateX(8px);
      border-color: #cbd5e1;
    }

    .link.disabled {
      cursor: not-allowed;
      background: #f1f5f9;
    }

    .link-primary {
      background: rgba(255, 255, 255, 0.95);
      color: #667eea;
      justify-content: space-between;
      gap: 1rem;
    }

    .link-primary:hover {
      background: white;
      transform: translateX(8px);
      box-shadow: 0 8px 24px rgba(102, 126, 234, 0.2);
    }

    .link-icon {
      font-size: 1.75rem;
      flex-shrink: 0;
    }

    .link-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .link-content strong {
      font-size: 1.1rem;
      color: #1e293b;
    }

    .link-content small {
      font-weight: 400;
      font-size: 0.875rem;
      color: #64748b;
    }

    .link-arrow {
      font-size: 1.5rem;
      color: #667eea;
      flex-shrink: 0;
      transition: transform 0.3s;
    }

    .link-primary:hover .link-arrow {
      transform: translateX(4px);
    }

    .quick-guide, .business-rules {
      background: white;
      border-radius: 16px;
      padding: 2rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      margin-bottom: 2rem;
    }

    .quick-guide h3, .business-rules h3 {
      font-size: 1.25rem;
      color: #2d3748;
      margin-bottom: 1.5rem;
    }

    .steps {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .step {
      display: flex;
      gap: 1rem;
      align-items: start;
    }

    .step-number {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      flex-shrink: 0;
    }

    .step-content {
      flex: 1;
    }

    .step-content strong {
      display: block;
      color: #2d3748;
      margin-bottom: 0.25rem;
    }

    .step-content p {
      color: #718096;
      margin: 0;
    }

    .business-rules ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .business-rules li {
      padding: 0.75rem;
      background: #fff5f5;
      border-left: 4px solid #fc8181;
      margin-bottom: 0.75rem;
      border-radius: 4px;
      color: #2d3748;
    }

    .business-rules li strong {
      color: #c53030;
    }
  `]
})
export class AdminDashboardComponent {}
