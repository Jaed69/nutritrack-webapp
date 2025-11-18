# Guía de Migración a Angular Material

## 📋 Tabla de Contenidos
1. [Introducción](#introducción)
2. [Estrategia de Migración](#estrategia-de-migración)
3. [Tabla de Conversión](#tabla-de-conversión)
4. [Ejemplos de Migración](#ejemplos-de-migración)
5. [Checklist de Migración](#checklist-de-migración)

---

## Introducción

Este documento proporciona una guía paso a paso para migrar componentes existentes a Angular Material, manteniendo la funcionalidad actual mientras se mejora la consistencia y apariencia visual.

---

## Estrategia de Migración

### Fases de Implementación

#### Fase 1: Componentes Base (Prioritario)
- ✅ Navbar y Sidebar
- ✅ Formularios de autenticación (login, registro)
- ✅ Toast/Notificaciones
- ✅ Componentes reutilizables (shared)

#### Fase 2: Módulos Principales
- 📋 Dashboard
- 📋 Perfil de usuario
- 📋 Seguimiento

#### Fase 3: Módulos Admin
- 📋 Gestión de planes
- 📋 Gestión de rutinas
- 📋 Gestión de ingredientes
- 📋 Gestión de comidas

### Principios de Migración

1. **Incremental**: Migrar componente por componente
2. **No Breaking**: Mantener funcionalidad existente
3. **Testing**: Probar cada componente migrado
4. **Documentación**: Documentar cambios importantes

---

## Tabla de Conversión

### Formularios

| Antes (HTML/CSS) | Después (Material) |
|------------------|-------------------|
| `<input class="input-base">` | `<mat-form-field appearance="outline"><input matInput></mat-form-field>` |
| `<select class="input-base">` | `<mat-form-field appearance="outline"><mat-select></mat-select></mat-form-field>` |
| `<input type="checkbox">` | `<mat-checkbox></mat-checkbox>` |
| `<input type="radio">` | `<mat-radio-button></mat-radio-button>` |
| `<textarea class="input-base">` | `<mat-form-field appearance="outline"><textarea matInput></textarea></mat-form-field>` |
| `<input type="date">` | `<mat-form-field appearance="outline"><input matInput [matDatepicker]="picker"></mat-form-field>` |

### Botones

| Antes (HTML/CSS) | Después (Material) |
|------------------|-------------------|
| `<button class="btn btn-primary">` | `<button mat-raised-button color="primary">` |
| `<button class="btn btn-secondary">` | `<button mat-raised-button color="accent">` |
| `<button class="btn btn-danger">` | `<button mat-raised-button color="warn">` |
| `<button class="btn btn-outline">` | `<button mat-stroked-button color="primary">` |
| `<button class="btn">` | `<button mat-button>` |

### Cards y Contenedores

| Antes (HTML/CSS) | Después (Material) |
|------------------|-------------------|
| `<div class="card">` | `<mat-card></mat-card>` |
| `<div class="card-hover">` | `<mat-card class="hover-effect"></mat-card>` |

### Notificaciones

| Antes | Después |
|-------|---------|
| Custom Toast Component | `MatSnackBar` service |

### Navegación

| Antes (HTML/CSS) | Después (Material) |
|------------------|-------------------|
| Custom Tabs | `<mat-tab-group><mat-tab></mat-tab></mat-tab-group>` |
| Custom Menu | `<mat-menu></mat-menu>` |

---

## Ejemplos de Migración

### Ejemplo 1: Formulario de Login

#### Antes:
```html
<form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
  <div class="form-group">
    <label>Email</label>
    <input 
      type="email" 
      class="input-base" 
      formControlName="email"
      placeholder="Ingrese su email"
    >
    <span class="error-message" *ngIf="loginForm.get('email')?.invalid">
      Email inválido
    </span>
  </div>

  <div class="form-group">
    <label>Contraseña</label>
    <input 
      type="password" 
      class="input-base" 
      formControlName="password"
      placeholder="Ingrese su contraseña"
    >
    <span class="error-message" *ngIf="loginForm.get('password')?.invalid">
      Contraseña requerida
    </span>
  </div>

  <button type="submit" class="btn btn-primary w-full">
    Iniciar Sesión
  </button>
</form>
```

#### Después:
```html
<form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
  <mat-form-field appearance="outline" class="w-full">
    <mat-label>Email</mat-label>
    <input 
      matInput 
      type="email" 
      formControlName="email"
      placeholder="ejemplo@correo.com"
    >
    <mat-icon matPrefix>email</mat-icon>
    <mat-error *ngIf="loginForm.get('email')?.hasError('required')">
      El email es requerido
    </mat-error>
    <mat-error *ngIf="loginForm.get('email')?.hasError('email')">
      Email inválido
    </mat-error>
  </mat-form-field>

  <mat-form-field appearance="outline" class="w-full">
    <mat-label>Contraseña</mat-label>
    <input 
      matInput 
      type="password" 
      formControlName="password"
      placeholder="••••••••"
    >
    <mat-icon matPrefix>lock</mat-icon>
    <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
      La contraseña es requerida
    </mat-error>
  </mat-form-field>

  <button 
    mat-raised-button 
    color="primary" 
    type="submit" 
    class="w-full"
    [disabled]="!loginForm.valid"
  >
    <mat-icon>login</mat-icon>
    Iniciar Sesión
  </button>
</form>
```

#### Imports necesarios:
```typescript
import { 
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule
} from '../shared/material.modules';

@Component({
  // ...
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ]
})
```

---

### Ejemplo 2: Card de Plan Nutricional

#### Antes:
```html
<div class="card card-hover">
  <h3>Plan Nutricional</h3>
  <p class="text-muted">Actualizado: {{fecha | date}}</p>
  
  <div class="mt-3">
    <p>{{plan.descripcion}}</p>
    <div class="d-flex gap-2">
      <span class="badge badge-primary">{{plan.calorias}} kcal</span>
      <span class="badge badge-success">{{plan.comidas}} comidas</span>
    </div>
  </div>
  
  <div class="d-flex justify-end gap-2 mt-3">
    <button class="btn btn-outline">Ver</button>
    <button class="btn btn-primary">Editar</button>
  </div>
</div>
```

#### Después:
```html
<mat-card>
  <mat-card-header>
    <div mat-card-avatar>
      <mat-icon class="text-primary">restaurant_menu</mat-icon>
    </div>
    <mat-card-title>Plan Nutricional</mat-card-title>
    <mat-card-subtitle>Actualizado: {{fecha | date}}</mat-card-subtitle>
  </mat-card-header>
  
  <mat-card-content>
    <p>{{plan.descripcion}}</p>
    <mat-chip-listbox>
      <mat-chip-option>{{plan.calorias}} kcal</mat-chip-option>
      <mat-chip-option>{{plan.comidas}} comidas</mat-chip-option>
    </mat-chip-listbox>
  </mat-card-content>
  
  <mat-card-actions align="end">
    <button mat-stroked-button color="primary">
      <mat-icon>visibility</mat-icon>
      Ver
    </button>
    <button mat-raised-button color="primary">
      <mat-icon>edit</mat-icon>
      Editar
    </button>
  </mat-card-actions>
</mat-card>
```

---

### Ejemplo 3: Notificaciones Toast

#### Antes:
```typescript
// toast.component.ts (custom)
export class ToastComponent {
  show(message: string, type: string): void {
    // Lógica custom de toast
  }
}

// En el componente
this.toastService.show('Operación exitosa', 'success');
```

#### Después:
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
  
  mostrarError(): void {
    this.snackBar.open('Error en la operación', 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }
}
```

#### Estilos para snackbar (en styles.css):
```css
.success-snackbar {
  background-color: var(--color-success) !important;
  color: white !important;
}

.error-snackbar {
  background-color: var(--color-danger) !important;
  color: white !important;
}

.warning-snackbar {
  background-color: var(--color-warning) !important;
  color: var(--color-text-primary) !important;
}
```

---

### Ejemplo 4: Tabla de Datos

#### Antes:
```html
<table class="w-full">
  <thead>
    <tr>
      <th>Nombre</th>
      <th>Email</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let usuario of usuarios">
      <td>{{usuario.nombre}}</td>
      <td>{{usuario.email}}</td>
      <td>
        <button class="btn btn-primary">Editar</button>
        <button class="btn btn-danger">Eliminar</button>
      </td>
    </tr>
  </tbody>
</table>
```

#### Después:
```html
<table mat-table [dataSource]="usuarios" class="mat-elevation-z2">
  <!-- Columna Nombre -->
  <ng-container matColumnDef="nombre">
    <th mat-header-cell *matHeaderCellDef>Nombre</th>
    <td mat-cell *matCellDef="let usuario">{{usuario.nombre}}</td>
  </ng-container>

  <!-- Columna Email -->
  <ng-container matColumnDef="email">
    <th mat-header-cell *matHeaderCellDef>Email</th>
    <td mat-cell *matCellDef="let usuario">{{usuario.email}}</td>
  </ng-container>

  <!-- Columna Acciones -->
  <ng-container matColumnDef="acciones">
    <th mat-header-cell *matHeaderCellDef>Acciones</th>
    <td mat-cell *matCellDef="let usuario">
      <button mat-icon-button color="primary" (click)="editar(usuario)">
        <mat-icon>edit</mat-icon>
      </button>
      <button mat-icon-button color="warn" (click)="eliminar(usuario)">
        <mat-icon>delete</mat-icon>
      </button>
    </td>
  </ng-container>

  <tr mat-header-row *matHeaderRowDef="columnasDisplayadas"></tr>
  <tr mat-row *matRowDef="let row; columns: columnasDisplayadas;"></tr>
</table>

<mat-paginator 
  [length]="totalUsuarios"
  [pageSize]="10"
  [pageSizeOptions]="[5, 10, 25, 50]">
</mat-paginator>
```

```typescript
export class UsuariosComponent {
  columnasDisplayadas: string[] = ['nombre', 'email', 'acciones'];
  usuarios: Usuario[] = [];
  totalUsuarios = 0;
  
  // ... métodos
}
```

---

## Checklist de Migración

### Por Componente

- [ ] **Analizar componente actual**
  - [ ] Identificar elementos UI usados
  - [ ] Documentar funcionalidad existente
  - [ ] Identificar dependencias

- [ ] **Preparar migración**
  - [ ] Crear rama de feature
  - [ ] Backup del componente original
  - [ ] Identificar componentes Material necesarios

- [ ] **Implementar cambios**
  - [ ] Importar módulos de Material
  - [ ] Reemplazar elementos HTML
  - [ ] Actualizar estilos CSS
  - [ ] Adaptar lógica TypeScript

- [ ] **Testing**
  - [ ] Verificar funcionalidad
  - [ ] Probar responsive
  - [ ] Verificar accesibilidad
  - [ ] Probar en diferentes navegadores

- [ ] **Documentación**
  - [ ] Actualizar comentarios en código
  - [ ] Documentar cambios significativos
  - [ ] Actualizar README si es necesario

---

## Pasos para Migrar un Componente

### 1. Preparación
```bash
# Crear rama de feature
git checkout -b feature/migrate-component-name

# Backup del componente (opcional)
cp src/app/features/module/component.ts src/app/features/module/component.ts.backup
```

### 2. Actualizar Imports
```typescript
// Agregar imports de Material
import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule
} from '../../shared/material.modules';

@Component({
  // ...
  imports: [
    // Imports existentes
    CommonModule,
    ReactiveFormsModule,
    // Nuevos imports de Material
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ]
})
```

### 3. Migrar Template
- Reemplazar elementos uno por uno
- Mantener la estructura lógica
- Usar clases de utilidad existentes cuando sea posible

### 4. Ajustar Estilos
```scss
// Eliminar estilos que ahora provee Material
// Mantener estilos específicos del componente
// Agregar personalizaciones si es necesario

:host {
  display: block;
}

// Personalización de Material
mat-form-field {
  margin-bottom: 1rem;
}
```

### 5. Testing
```typescript
// Ejecutar tests
npm test

// Verificar en navegador
ng serve
```

### 6. Commit y PR
```bash
git add .
git commit -m "feat: migrate component-name to Angular Material"
git push origin feature/migrate-component-name
```

---

## Recursos Adicionales

- [Guía de Angular Material](./ANGULAR_MATERIAL_GUIDE.md)
- [Documentación Oficial](https://material.angular.io/)
- [Material Design Guidelines](https://material.io/design)
- [Componente de Ejemplo](../src/app/shared/components/material-example.component.ts)

---

## Notas Importantes

1. **No migrar todo a la vez**: Hacerlo incrementalmente
2. **Mantener funcionalidad**: No romper features existentes
3. **Testing continuo**: Probar después de cada cambio
4. **Usar appearance="outline"**: Para consistencia en form fields
5. **Aprovechar las variables CSS**: Mantener los colores del tema
6. **Documentar cambios**: Para futura referencia

---

**Última actualización**: Noviembre 2025
