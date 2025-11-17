import { Routes } from '@angular/router';

export const USUARIO_ROUTES: Routes = [
  {
  path: '',
    loadComponent: () => 
      import('./pages/usuarios-list.component').then(m => m.UsuariosListComponent),
    data: { title: 'Gestión de Etiquetas' }
  }
];
