# Guía de Angular Material - NuTriTrack

## 📋 Índice
1. [Introducción](#introducción)
2. [Configuración](#configuración)
3. [Tema Personalizado](#tema-personalizado)
4. [Importación de Componentes](#importación-de-componentes)
5. [Componentes Principales](#componentes-principales)
6. [Mejores Prácticas](#mejores-prácticas)
7. [Ejemplos de Uso](#ejemplos-de-uso)

---

## Introducción

Angular Material es la biblioteca oficial de componentes UI de Angular que implementa Material Design de Google. Proporciona una guía de estilo uniforme y profesional para toda la aplicación.

### ✅ Beneficios
- **Consistencia**: Diseño uniforme en toda la aplicación
- **Accesibilidad**: Componentes optimizados para WCAG
- **Responsive**: Diseño adaptable a todos los dispositivos
- **Theming**: Sistema de temas personalizable
- **Mantenimiento**: Actualizaciones y soporte oficial de Google

---

## Configuración

### Instalación
Los paquetes ya están instalados:
```bash
@angular/material
@angular/cdk
@angular/animations
```

### Configuración en app.config.ts
```typescript
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(), // ✅ Necesario para Material
    // ... otros providers
  ]
};
```

---

## Tema Personalizado

### Paleta de Colores
El tema está configurado en `src/theme.scss` con los colores de NuTriTrack:

- **Primary**: `#003D7A` (Azul corporativo)
- **Accent**: `#00A859` (Verde NuTriTrack)
- **Warn**: `#dc3545` (Rojo para alertas)

### Uso en Componentes
```typescript
// En HTML
<button mat-raised-button color="primary">Primario</button>
<button mat-raised-button color="accent">Acento</button>
<button mat-raised-button color="warn">Peligro</button>
```

---

## Importación de Componentes

### Método 1: Importación Individual
```typescript
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  // ...
})
export class ExampleComponent {}
```

### Método 2: Usando el Barrel File (Recomendado)
```typescript
import { Component } from '@angular/core';
import { 
  MatButtonModule, 
  MatCardModule,
  MatFormFieldModule,
  MatInputModule 
} from '../shared/material.modules';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [
    MatButtonModule, 
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  // ...
})
export class ExampleComponent {}
```

---

## Componentes Principales

### 1. Botones

#### Tipos de Botones
```html
<!-- Botón básico -->
<button mat-button>Básico</button>

<!-- Botón con elevación -->
<button mat-raised-button color="primary">Elevado</button>

<!-- Botón plano con color -->
<button mat-flat-button color="accent">Plano</button>

<!-- Botón con borde -->
<button mat-stroked-button>Con Borde</button>

<!-- Botón con ícono -->
<button mat-icon-button>
  <mat-icon>favorite</mat-icon>
</button>

<!-- Botón FAB (Floating Action Button) -->
<button mat-fab color="primary">
  <mat-icon>add</mat-icon>
</button>

<!-- Mini FAB -->
<button mat-mini-fab color="accent">
  <mat-icon>edit</mat-icon>
</button>
```

### 2. Formularios

#### Campo de Texto
```html
<mat-form-field appearance="outline">
  <mat-label>Nombre</mat-label>
  <input matInput placeholder="Ingrese su nombre" [(ngModel)]="nombre">
  <mat-hint>Ingrese su nombre completo</mat-hint>
  <mat-error *ngIf="nombreInvalido">El nombre es requerido</mat-error>
</mat-form-field>
```

#### Select
```html
<mat-form-field appearance="outline">
  <mat-label>País</mat-label>
  <mat-select [(ngModel)]="paisSeleccionado">
    <mat-option *ngFor="let pais of paises" [value]="pais.codigo">
      {{pais.nombre}}
    </mat-option>
  </mat-select>
</mat-form-field>
```

#### Checkbox y Radio
```html
<!-- Checkbox -->
<mat-checkbox [(ngModel)]="aceptoTerminos">
  Acepto términos y condiciones
</mat-checkbox>

<!-- Radio Group -->
<mat-radio-group [(ngModel)]="genero">
  <mat-radio-button value="M">Masculino</mat-radio-button>
  <mat-radio-button value="F">Femenino</mat-radio-button>
  <mat-radio-button value="O">Otro</mat-radio-button>
</mat-radio-group>
```

#### DatePicker
```html
<mat-form-field appearance="outline">
  <mat-label>Fecha de Nacimiento</mat-label>
  <input matInput [matDatepicker]="picker" [(ngModel)]="fechaNacimiento">
  <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
  <mat-datepicker #picker></mat-datepicker>
</mat-form-field>
```

### 3. Cards

```html
<mat-card>
  <mat-card-header>
    <mat-card-title>Título del Card</mat-card-title>
    <mat-card-subtitle>Subtítulo</mat-card-subtitle>
  </mat-card-header>
  
  <mat-card-content>
    <p>Contenido del card...</p>
  </mat-card-content>
  
  <mat-card-actions align="end">
    <button mat-button>CANCELAR</button>
    <button mat-raised-button color="primary">GUARDAR</button>
  </mat-card-actions>
</mat-card>
```

### 4. Diálogos

#### Componente que abre el diálogo
```typescript
import { MatDialog } from '@angular/material/dialog';
import { MiDialogoComponent } from './mi-dialogo.component';

export class MiComponente {
  constructor(private dialog: MatDialog) {}
  
  abrirDialogo(): void {
    const dialogRef = this.dialog.open(MiDialogoComponent, {
      width: '500px',
      data: { nombre: 'Usuario', edad: 25 }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('Diálogo cerrado:', result);
    });
  }
}
```

#### Componente del diálogo
```typescript
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  template: `
    <h2 mat-dialog-title>Confirmar Acción</h2>
    <mat-dialog-content>
      <p>¿Está seguro de realizar esta acción?</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-raised-button color="primary" [mat-dialog-close]="true">
        Confirmar
      </button>
    </mat-dialog-actions>
  `
})
export class MiDialogoComponent {
  constructor(
    public dialogRef: MatDialogRef<MiDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
```

### 5. Snackbars (Notificaciones)

```typescript
import { MatSnackBar } from '@angular/material/snack-bar';

export class MiComponente {
  constructor(private snackBar: MatSnackBar) {}
  
  mostrarNotificacion(): void {
    this.snackBar.open('Operación exitosa', 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }
}
```

### 6. Tablas

```html
<table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
  <!-- Columna ID -->
  <ng-container matColumnDef="id">
    <th mat-header-cell *matHeaderCellDef>ID</th>
    <td mat-cell *matCellDef="let elemento">{{elemento.id}}</td>
  </ng-container>
  
  <!-- Columna Nombre -->
  <ng-container matColumnDef="nombre">
    <th mat-header-cell *matHeaderCellDef>Nombre</th>
    <td mat-cell *matCellDef="let elemento">{{elemento.nombre}}</td>
  </ng-container>
  
  <!-- Columna Acciones -->
  <ng-container matColumnDef="acciones">
    <th mat-header-cell *matHeaderCellDef>Acciones</th>
    <td mat-cell *matCellDef="let elemento">
      <button mat-icon-button color="primary">
        <mat-icon>edit</mat-icon>
      </button>
      <button mat-icon-button color="warn">
        <mat-icon>delete</mat-icon>
      </button>
    </td>
  </ng-container>
  
  <tr mat-header-row *matHeaderRowDef="columnasDisplayadas"></tr>
  <tr mat-row *matRowDef="let row; columns: columnasDisplayadas;"></tr>
</table>

<!-- Paginador -->
<mat-paginator 
  [length]="100"
  [pageSize]="10"
  [pageSizeOptions]="[5, 10, 25, 100]">
</mat-paginator>
```

### 7. Menús

```html
<button mat-icon-button [matMenuTriggerFor]="menu">
  <mat-icon>more_vert</mat-icon>
</button>

<mat-menu #menu="matMenu">
  <button mat-menu-item>
    <mat-icon>edit</mat-icon>
    <span>Editar</span>
  </button>
  <button mat-menu-item>
    <mat-icon>share</mat-icon>
    <span>Compartir</span>
  </button>
  <mat-divider></mat-divider>
  <button mat-menu-item>
    <mat-icon>delete</mat-icon>
    <span>Eliminar</span>
  </button>
</mat-menu>
```

### 8. Tabs

```html
<mat-tab-group>
  <mat-tab label="General">
    <div class="p-3">
      <p>Contenido de la pestaña General</p>
    </div>
  </mat-tab>
  
  <mat-tab label="Perfil">
    <div class="p-3">
      <p>Contenido de la pestaña Perfil</p>
    </div>
  </mat-tab>
  
  <mat-tab label="Configuración">
    <div class="p-3">
      <p>Contenido de la pestaña Configuración</p>
    </div>
  </mat-tab>
</mat-tab-group>
```

### 9. Stepper

```html
<mat-stepper>
  <mat-step label="Paso 1">
    <p>Contenido del paso 1</p>
    <div>
      <button mat-button matStepperNext>Siguiente</button>
    </div>
  </mat-step>
  
  <mat-step label="Paso 2">
    <p>Contenido del paso 2</p>
    <div>
      <button mat-button matStepperPrevious>Atrás</button>
      <button mat-button matStepperNext>Siguiente</button>
    </div>
  </mat-step>
  
  <mat-step label="Paso 3">
    <p>Contenido del paso 3</p>
    <div>
      <button mat-button matStepperPrevious>Atrás</button>
      <button mat-raised-button color="primary">Finalizar</button>
    </div>
  </mat-step>
</mat-stepper>
```

### 10. Progress Indicators

```html
<!-- Spinner -->
<mat-spinner></mat-spinner>
<mat-spinner diameter="30"></mat-spinner>

<!-- Progress Bar -->
<mat-progress-bar mode="determinate" [value]="progreso"></mat-progress-bar>
<mat-progress-bar mode="indeterminate"></mat-progress-bar>
```

---

## Mejores Prácticas

### 1. Apariencia de Form Fields
Usar consistentemente `appearance="outline"` para form fields:
```html
<mat-form-field appearance="outline">
  <!-- Contenido -->
</mat-form-field>
```

### 2. Colores Semánticos
```html
<!-- Usar colores según el contexto -->
<button mat-raised-button color="primary">Acción Principal</button>
<button mat-raised-button color="accent">Acción Secundaria</button>
<button mat-raised-button color="warn">Eliminar</button>
```

### 3. Iconos
Usar Material Icons:
```typescript
// En app.config.ts o en index.html
// Agregar: <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

```html
<mat-icon>home</mat-icon>
<mat-icon>favorite</mat-icon>
<mat-icon>delete</mat-icon>
```

### 4. Responsive
```html
<!-- Usar clases de utilidad con breakpoints -->
<div class="d-none d-md-block">Solo visible en desktop</div>
<div class="d-md-none">Solo visible en móvil</div>
```

### 5. Accesibilidad
```html
<!-- Siempre usar labels en formularios -->
<mat-form-field>
  <mat-label>Email</mat-label>
  <input matInput type="email" placeholder="email@ejemplo.com">
</mat-form-field>

<!-- Usar aria-label en iconos -->
<button mat-icon-button aria-label="Eliminar">
  <mat-icon>delete</mat-icon>
</button>
```

---

## Ejemplos de Uso

### Formulario Completo
```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { 
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatCheckboxModule
} from '../shared/material.modules';

@Component({
  selector: 'app-registro-usuario',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="p-4">
      <h2>Registro de Usuario</h2>
      
      <mat-form-field appearance="outline" class="w-full">
        <mat-label>Nombre</mat-label>
        <input matInput formControlName="nombre" placeholder="Ingrese su nombre">
        <mat-error *ngIf="form.get('nombre')?.hasError('required')">
          El nombre es requerido
        </mat-error>
      </mat-form-field>
      
      <mat-form-field appearance="outline" class="w-full">
        <mat-label>Email</mat-label>
        <input matInput type="email" formControlName="email" placeholder="email@ejemplo.com">
        <mat-error *ngIf="form.get('email')?.hasError('required')">
          El email es requerido
        </mat-error>
        <mat-error *ngIf="form.get('email')?.hasError('email')">
          Email inválido
        </mat-error>
      </mat-form-field>
      
      <mat-form-field appearance="outline" class="w-full">
        <mat-label>País</mat-label>
        <mat-select formControlName="pais">
          <mat-option value="AR">Argentina</mat-option>
          <mat-option value="CL">Chile</mat-option>
          <mat-option value="UY">Uruguay</mat-option>
        </mat-select>
      </mat-form-field>
      
      <mat-checkbox formControlName="aceptoTerminos" class="mb-3">
        Acepto términos y condiciones
      </mat-checkbox>
      
      <div class="d-flex justify-end gap-2">
        <button mat-button type="button">Cancelar</button>
        <button mat-raised-button color="primary" type="submit" [disabled]="!form.valid">
          Registrar
        </button>
      </div>
    </form>
  `
})
export class RegistroUsuarioComponent {
  form: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pais: ['', Validators.required],
      aceptoTerminos: [false, Validators.requiredTrue]
    });
  }
  
  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
```

### Card con Acciones
```typescript
@Component({
  template: `
    <mat-card>
      <mat-card-header>
        <div mat-card-avatar class="example-header-image"></div>
        <mat-card-title>Plan Nutricional</mat-card-title>
        <mat-card-subtitle>Actualizado: {{fechaActualizacion | date}}</mat-card-subtitle>
      </mat-card-header>
      
      <img mat-card-image src="assets/plan-ejemplo.jpg" alt="Plan">
      
      <mat-card-content>
        <p>Este es un plan nutricional personalizado para alcanzar tus objetivos.</p>
        <mat-chip-listbox>
          <mat-chip-option>1800 kcal</mat-chip-option>
          <mat-chip-option>5 comidas</mat-chip-option>
          <mat-chip-option>Alta proteína</mat-chip-option>
        </mat-chip-listbox>
      </mat-card-content>
      
      <mat-card-actions align="end">
        <button mat-button>
          <mat-icon>share</mat-icon>
          COMPARTIR
        </button>
        <button mat-raised-button color="primary">
          <mat-icon>visibility</mat-icon>
          VER DETALLE
        </button>
      </mat-card-actions>
    </mat-card>
  `
})
export class PlanCardComponent {}
```

---

## 🔗 Referencias

- [Documentación Oficial de Angular Material](https://material.angular.io/)
- [Material Design Guidelines](https://material.io/design)
- [Angular Material GitHub](https://github.com/angular/components)
- [Material Icons](https://fonts.google.com/icons)

---

## 📝 Notas Importantes

1. **Siempre importar los módulos necesarios** en cada componente standalone
2. **Usar el tema personalizado** definido en `theme.scss`
3. **Mantener consistencia** en el uso de appearance en form fields
4. **Aprovechar las utilidades CSS** existentes combinadas con Material
5. **Considerar accesibilidad** en todos los componentes

---

**Última actualización**: Noviembre 2025
