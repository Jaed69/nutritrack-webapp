/**
 * Barrel file para importar y exportar módulos de Angular Material
 * Facilita la importación de componentes Material en toda la aplicación
 */

// Importaciones
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTreeModule } from '@angular/material/tree';

// Re-exportaciones para facilitar imports
export { MatInputModule } from '@angular/material/input';
export { MatFormFieldModule } from '@angular/material/form-field';
export { MatSelectModule } from '@angular/material/select';
export { MatAutocompleteModule } from '@angular/material/autocomplete';
export { MatCheckboxModule } from '@angular/material/checkbox';
export { MatRadioModule } from '@angular/material/radio';
export { MatSlideToggleModule } from '@angular/material/slide-toggle';
export { MatSliderModule } from '@angular/material/slider';
export { MatDatepickerModule } from '@angular/material/datepicker';
export { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
export { MatToolbarModule } from '@angular/material/toolbar';
export { MatSidenavModule } from '@angular/material/sidenav';
export { MatMenuModule } from '@angular/material/menu';
export { MatTabsModule } from '@angular/material/tabs';
export { MatCardModule } from '@angular/material/card';
export { MatDividerModule } from '@angular/material/divider';
export { MatExpansionModule } from '@angular/material/expansion';
export { MatGridListModule } from '@angular/material/grid-list';
export { MatListModule } from '@angular/material/list';
export { MatStepperModule } from '@angular/material/stepper';
export { MatButtonModule } from '@angular/material/button';
export { MatButtonToggleModule } from '@angular/material/button-toggle';
export { MatBadgeModule } from '@angular/material/badge';
export { MatChipsModule } from '@angular/material/chips';
export { MatIconModule } from '@angular/material/icon';
export { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
export { MatProgressBarModule } from '@angular/material/progress-bar';
export { MatBottomSheetModule } from '@angular/material/bottom-sheet';
export { MatDialogModule } from '@angular/material/dialog';
export { MatSnackBarModule } from '@angular/material/snack-bar';
export { MatTooltipModule } from '@angular/material/tooltip';
export { MatTableModule } from '@angular/material/table';
export { MatSortModule } from '@angular/material/sort';
export { MatPaginatorModule } from '@angular/material/paginator';
export { MatTreeModule } from '@angular/material/tree';

/**
 * Array de todos los módulos de Material para importación masiva
 * Útil cuando se necesitan todos los componentes en un módulo
 */
export const MATERIAL_MODULES = [
  // Formularios y entrada
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatRadioModule,
  MatSlideToggleModule,
  MatSliderModule,
  MatDatepickerModule,
  MatNativeDateModule,
  
  // Navegación
  MatToolbarModule,
  MatSidenavModule,
  MatMenuModule,
  MatTabsModule,
  
  // Layout
  MatCardModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatListModule,
  MatStepperModule,
  
  // Botones e indicadores
  MatButtonModule,
  MatButtonToggleModule,
  MatBadgeModule,
  MatChipsModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatRippleModule,
  
  // Popups y modales
  MatBottomSheetModule,
  MatDialogModule,
  MatSnackBarModule,
  MatTooltipModule,
  
  // Tablas y datos
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  
  // Otros
  MatTreeModule,
];
