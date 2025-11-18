/**
 * Componente de ejemplo que demuestra el uso de Angular Material
 * Este archivo sirve como referencia para implementar componentes con Material Design
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatCheckboxModule,
  MatIconModule,
  MatChipsModule,
  MatTabsModule,
  MatDividerModule
} from '../material.modules';

interface Example {
  id: number;
  title: string;
  description: string;
  category: string;
}

@Component({
  selector: 'app-material-example',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
    MatChipsModule,
    MatTabsModule,
    MatDividerModule
  ],
  template: `
    <div class="container mt-4">
      <!-- Header -->
      <div class="mb-4">
        <h1 class="text-3xl font-bold text-primary mb-2">
          Ejemplos de Angular Material
        </h1>
        <p class="text-muted">
          Componentes Material Design en NuTriTrack
        </p>
      </div>

      <!-- Tabs principales -->
      <mat-tab-group>
        <!-- Tab: Formularios -->
        <mat-tab label="Formularios">
          <div class="p-4">
            <mat-card>
              <mat-card-header>
                <mat-card-title>Formulario de Ejemplo</mat-card-title>
                <mat-card-subtitle>
                  Demostración de campos de formulario con Material
                </mat-card-subtitle>
              </mat-card-header>

              <mat-card-content>
                <form [formGroup]="exampleForm" class="mt-3">
                  <!-- Nombre -->
                  <mat-form-field appearance="outline" class="w-full">
                    <mat-label>Nombre Completo</mat-label>
                    <input 
                      matInput 
                      formControlName="nombre" 
                      placeholder="Ej: Juan Pérez"
                    >
                    <mat-icon matPrefix>person</mat-icon>
                    <mat-hint>Ingrese su nombre completo</mat-hint>
                    <mat-error *ngIf="exampleForm.get('nombre')?.hasError('required')">
                      El nombre es requerido
                    </mat-error>
                  </mat-form-field>

                  <!-- Email -->
                  <mat-form-field appearance="outline" class="w-full">
                    <mat-label>Correo Electrónico</mat-label>
                    <input 
                      matInput 
                      type="email"
                      formControlName="email" 
                      placeholder="ejemplo@correo.com"
                    >
                    <mat-icon matPrefix>email</mat-icon>
                    <mat-error *ngIf="exampleForm.get('email')?.hasError('required')">
                      El email es requerido
                    </mat-error>
                    <mat-error *ngIf="exampleForm.get('email')?.hasError('email')">
                      Formato de email inválido
                    </mat-error>
                  </mat-form-field>

                  <!-- Categoría -->
                  <mat-form-field appearance="outline" class="w-full">
                    <mat-label>Categoría</mat-label>
                    <mat-select formControlName="categoria">
                      <mat-option value="nutricional">Nutricional</mat-option>
                      <mat-option value="ejercicio">Ejercicio</mat-option>
                      <mat-option value="seguimiento">Seguimiento</mat-option>
                    </mat-select>
                    <mat-icon matPrefix>category</mat-icon>
                  </mat-form-field>

                  <!-- Descripción -->
                  <mat-form-field appearance="outline" class="w-full">
                    <mat-label>Descripción</mat-label>
                    <textarea 
                      matInput 
                      formControlName="descripcion"
                      rows="4"
                      placeholder="Ingrese una descripción detallada..."
                    ></textarea>
                    <mat-hint align="end">
                      {{exampleForm.get('descripcion')?.value?.length || 0}}/200
                    </mat-hint>
                  </mat-form-field>

                  <!-- Checkbox -->
                  <div class="mb-3">
                    <mat-checkbox formControlName="activo">
                      Elemento activo
                    </mat-checkbox>
                  </div>
                </form>
              </mat-card-content>

              <mat-card-actions align="end">
                <button mat-button (click)="resetForm()">
                  <mat-icon>clear</mat-icon>
                  Limpiar
                </button>
                <button 
                  mat-raised-button 
                  color="primary" 
                  (click)="submitForm()"
                  [disabled]="!exampleForm.valid"
                >
                  <mat-icon>save</mat-icon>
                  Guardar
                </button>
              </mat-card-actions>
            </mat-card>
          </div>
        </mat-tab>

        <!-- Tab: Botones -->
        <mat-tab label="Botones">
          <div class="p-4">
            <mat-card>
              <mat-card-header>
                <mat-card-title>Tipos de Botones</mat-card-title>
              </mat-card-header>

              <mat-card-content>
                <div class="d-flex flex-column gap-3 mt-3">
                  <!-- Botones básicos -->
                  <div>
                    <h3 class="mb-2">Botones Básicos</h3>
                    <div class="d-flex gap-2 flex-wrap">
                      <button mat-button>Básico</button>
                      <button mat-button color="primary">Primario</button>
                      <button mat-button color="accent">Acento</button>
                      <button mat-button color="warn">Peligro</button>
                    </div>
                  </div>

                  <mat-divider></mat-divider>

                  <!-- Botones elevados -->
                  <div>
                    <h3 class="mb-2">Botones Elevados</h3>
                    <div class="d-flex gap-2 flex-wrap">
                      <button mat-raised-button>Básico</button>
                      <button mat-raised-button color="primary">Primario</button>
                      <button mat-raised-button color="accent">Acento</button>
                      <button mat-raised-button color="warn">Peligro</button>
                    </div>
                  </div>

                  <mat-divider></mat-divider>

                  <!-- Botones planos -->
                  <div>
                    <h3 class="mb-2">Botones Planos</h3>
                    <div class="d-flex gap-2 flex-wrap">
                      <button mat-flat-button>Básico</button>
                      <button mat-flat-button color="primary">Primario</button>
                      <button mat-flat-button color="accent">Acento</button>
                      <button mat-flat-button color="warn">Peligro</button>
                    </div>
                  </div>

                  <mat-divider></mat-divider>

                  <!-- Botones con borde -->
                  <div>
                    <h3 class="mb-2">Botones con Borde</h3>
                    <div class="d-flex gap-2 flex-wrap">
                      <button mat-stroked-button>Básico</button>
                      <button mat-stroked-button color="primary">Primario</button>
                      <button mat-stroked-button color="accent">Acento</button>
                      <button mat-stroked-button color="warn">Peligro</button>
                    </div>
                  </div>

                  <mat-divider></mat-divider>

                  <!-- Botones con íconos -->
                  <div>
                    <h3 class="mb-2">Botones con Íconos</h3>
                    <div class="d-flex gap-2 flex-wrap">
                      <button mat-icon-button>
                        <mat-icon>home</mat-icon>
                      </button>
                      <button mat-icon-button color="primary">
                        <mat-icon>favorite</mat-icon>
                      </button>
                      <button mat-icon-button color="accent">
                        <mat-icon>settings</mat-icon>
                      </button>
                      <button mat-icon-button color="warn">
                        <mat-icon>delete</mat-icon>
                      </button>
                    </div>
                  </div>

                  <mat-divider></mat-divider>

                  <!-- FAB -->
                  <div>
                    <h3 class="mb-2">Floating Action Buttons</h3>
                    <div class="d-flex gap-2 flex-wrap align-center">
                      <button mat-fab color="primary">
                        <mat-icon>add</mat-icon>
                      </button>
                      <button mat-mini-fab color="accent">
                        <mat-icon>edit</mat-icon>
                      </button>
                      <button mat-mini-fab color="warn">
                        <mat-icon>delete</mat-icon>
                      </button>
                    </div>
                  </div>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <!-- Tab: Cards -->
        <mat-tab label="Cards">
          <div class="p-4">
            <div class="d-flex gap-3 flex-wrap">
              <!-- Card básico -->
              <mat-card class="flex-1" style="min-width: 300px;">
                <mat-card-header>
                  <mat-card-title>Card Básico</mat-card-title>
                  <mat-card-subtitle>Subtítulo del card</mat-card-subtitle>
                </mat-card-header>
                <mat-card-content>
                  <p>Este es un ejemplo de card básico con contenido simple.</p>
                  <mat-chip-listbox>
                    <mat-chip-option>Tag 1</mat-chip-option>
                    <mat-chip-option>Tag 2</mat-chip-option>
                    <mat-chip-option>Tag 3</mat-chip-option>
                  </mat-chip-listbox>
                </mat-card-content>
                <mat-card-actions align="end">
                  <button mat-button>VER MÁS</button>
                  <button mat-raised-button color="primary">ACCIÓN</button>
                </mat-card-actions>
              </mat-card>

              <!-- Card con ícono -->
              <mat-card class="flex-1" style="min-width: 300px;">
                <mat-card-header>
                  <div mat-card-avatar>
                    <mat-icon class="text-primary">restaurant</mat-icon>
                  </div>
                  <mat-card-title>Plan Nutricional</mat-card-title>
                  <mat-card-subtitle>Actualizado hoy</mat-card-subtitle>
                </mat-card-header>
                <mat-card-content>
                  <p>Plan personalizado con 1800 kcal diarias.</p>
                  <div class="d-flex gap-2 mt-2">
                    <mat-chip-option>1800 kcal</mat-chip-option>
                    <mat-chip-option>5 comidas</mat-chip-option>
                  </div>
                </mat-card-content>
                <mat-card-actions align="end">
                  <button mat-icon-button color="primary">
                    <mat-icon>share</mat-icon>
                  </button>
                  <button mat-icon-button color="accent">
                    <mat-icon>edit</mat-icon>
                  </button>
                </mat-card-actions>
              </mat-card>

              <!-- Card de estadísticas -->
              <mat-card class="flex-1" style="min-width: 300px;">
                <mat-card-content>
                  <div class="d-flex align-center gap-3">
                    <mat-icon class="text-primary" style="font-size: 48px; width: 48px; height: 48px;">
                      trending_up
                    </mat-icon>
                    <div>
                      <h3 class="m-0">1,234</h3>
                      <p class="m-0 text-muted">Calorías hoy</p>
                    </div>
                  </div>
                </mat-card-content>
              </mat-card>
            </div>
          </div>
        </mat-tab>

        <!-- Tab: Chips y Tags -->
        <mat-tab label="Chips">
          <div class="p-4">
            <mat-card>
              <mat-card-header>
                <mat-card-title>Chips y Tags</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="d-flex flex-column gap-3 mt-3">
                  <div>
                    <h3 class="mb-2">Chips Básicos</h3>
                    <mat-chip-listbox>
                      <mat-chip-option>Chip 1</mat-chip-option>
                      <mat-chip-option>Chip 2</mat-chip-option>
                      <mat-chip-option>Chip 3</mat-chip-option>
                    </mat-chip-listbox>
                  </div>

                  <mat-divider></mat-divider>

                  <div>
                    <h3 class="mb-2">Chips con Íconos</h3>
                    <mat-chip-listbox>
                      <mat-chip-option>
                        <mat-icon matChipAvatar>face</mat-icon>
                        Usuario
                      </mat-chip-option>
                      <mat-chip-option>
                        <mat-icon matChipAvatar>restaurant</mat-icon>
                        Comida
                      </mat-chip-option>
                      <mat-chip-option>
                        <mat-icon matChipAvatar>fitness_center</mat-icon>
                        Ejercicio
                      </mat-chip-option>
                    </mat-chip-listbox>
                  </div>

                  <mat-divider></mat-divider>

                  <div>
                    <h3 class="mb-2">Etiquetas de Estado</h3>
                    <div class="d-flex gap-2 flex-wrap">
                      <span class="badge badge-success">Activo</span>
                      <span class="badge badge-warning">Pendiente</span>
                      <span class="badge badge-danger">Inactivo</span>
                      <span class="badge badge-info">En Proceso</span>
                    </div>
                  </div>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background-color: var(--color-background);
    }

    mat-form-field {
      margin-bottom: 1rem;
    }

    mat-card {
      margin-bottom: 1rem;
    }

    h3 {
      color: var(--color-text-primary);
      font-weight: 600;
    }
  `]
})
export class MaterialExampleComponent {
  exampleForm: FormGroup;

  examples: Example[] = [
    { id: 1, title: 'Ejemplo 1', description: 'Descripción 1', category: 'nutricional' },
    { id: 2, title: 'Ejemplo 2', description: 'Descripción 2', category: 'ejercicio' },
    { id: 3, title: 'Ejemplo 3', description: 'Descripción 3', category: 'seguimiento' },
  ];

  constructor(private fb: FormBuilder) {
    this.exampleForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      categoria: ['', Validators.required],
      descripcion: ['', [Validators.maxLength(200)]],
      activo: [true]
    });
  }

  submitForm(): void {
    if (this.exampleForm.valid) {
      console.log('Formulario válido:', this.exampleForm.value);
      // Aquí iría la lógica de envío
    }
  }

  resetForm(): void {
    this.exampleForm.reset({
      activo: true
    });
  }
}
