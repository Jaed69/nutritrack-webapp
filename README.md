# 🥗 NutriTrack WebApp

Sistema integral de gestión nutricional y fitness construido con Angular 20.x y Angular Material.

[![Angular](https://img.shields.io/badge/Angular-20.3-red.svg)](https://angular.io/)
[![Angular Material](https://img.shields.io/badge/Material-20.2-blue.svg)](https://material.angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)

## 📋 Descripción

NutriTrack es una aplicación web moderna para la gestión de planes nutricionales, rutinas de ejercicio y seguimiento de progreso personal. Ofrece dos roles diferenciados:

- **Administrador**: Gestión completa de contenido (planes, rutinas, comidas, ingredientes, ejercicios)
- **Usuario**: Exploración de catálogo, activación de planes, seguimiento diario y visualización de progreso

## ✨ Características Principales

- 🔐 **Autenticación segura** con JWT
- 🎨 **Diseño consistente** con Angular Material
- 📱 **Responsive design** adaptable a todos los dispositivos
- ♿ **Accesibilidad** siguiendo estándares WCAG
- 🎯 **Validaciones robustas** en formularios
- 📊 **Seguimiento de progreso** con gráficos interactivos
- 🌐 **Soporte multi-idioma** (preparado para i18n)
- 🔄 **Gestión de estado** con Angular Signals

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## 🎨 Angular Material

El proyecto utiliza Angular Material para mantener una guía de estilo uniforme y profesional.

### Documentación
- 📖 [Guía completa de Angular Material](./docs/ANGULAR_MATERIAL_GUIDE.md)
- 🔄 [Guía de migración](./docs/MIGRATION_TO_MATERIAL.md)
- 💡 [Componente de ejemplo](./src/app/shared/components/material-example.component.ts)

### Características
- ✅ Tema personalizado con colores corporativos
- ✅ Más de 40 componentes disponibles
- ✅ Sistema de theming configurado
- ✅ Diseño responsive out-of-the-box
- ✅ Accesibilidad integrada

## 📂 Estructura del Proyecto

```
src/app/
├── core/              # Servicios, guards, interceptors
├── shared/            # Componentes, pipes, directivas compartidos
├── features/          # Módulos funcionales
│   ├── auth/         # Autenticación
│   ├── perfil/       # Perfil de usuario
│   ├── admin/        # Panel de administración
│   ├── catalogo/     # Catálogo de planes y rutinas
│   └── seguimiento/  # Seguimiento diario
└── environments/      # Configuración de entornos
```

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js 18+ 
- npm 9+
- Angular CLI 20+

### Instalación

```bash
# Clonar repositorio
git clone https://github.com/leonelalz/nutritrack-webapp.git
cd nutritrack-webapp

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

La aplicación estará disponible en `http://localhost:4200/`

### Variables de Entorno

El proyecto usa dos archivos de configuración:

**Desarrollo** (`src/environments/environment.ts`):
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api/v1'
};
```

**Producción** (`src/environments/environment.prod.ts`):
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://nutritrack-api-wt8b.onrender.com/api/v1'
};
```

## 📚 Documentación

- 📖 [Guía Frontend Completa](./docs/FRONTEND_GUIDE.MD)
- 📖 [Guía de Angular Material](./docs/ANGULAR_MATERIAL_GUIDE.md)
- 🔄 [Guía de Migración a Material](./docs/MIGRATION_TO_MATERIAL.md)
- 📊 [Estado de Implementación](./IMPLEMENTACION_STATUS.md)

## 🛠️ Stack Tecnológico

- **Framework**: Angular 20.3
- **UI Library**: Angular Material 20.2
- **Lenguaje**: TypeScript 5.9
- **Estado**: Angular Signals
- **HTTP**: HttpClient con Interceptors
- **Routing**: Angular Router con Guards
- **Forms**: Reactive Forms
- **Estilo**: CSS Variables + SCSS

## 🧪 Testing

```bash
# Tests unitarios
npm test

# Tests con coverage
npm run test:coverage
```

## 🏗️ Build

```bash
# Build de desarrollo
npm run build

# Build de producción
npm run build:prod
```

## 📝 Comandos Útiles

```bash
# Generar componente
ng generate component features/nombre-modulo/pages/nombre-componente

# Generar servicio
ng generate service features/nombre-modulo/services/nombre-servicio

# Generar guard
ng generate guard core/guards/nombre-guard

# Generar pipe
ng generate pipe shared/pipes/nombre-pipe

# Análisis de bundle
npm run build -- --stats-json
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: amazing feature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Convenciones de Commits

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bugs
- `docs:` Cambios en documentación
- `style:` Cambios de formato/estilo
- `refactor:` Refactorización de código
- `test:` Añadir o modificar tests
- `chore:` Tareas de mantenimiento

## 📄 Licencia

Este proyecto es privado y confidencial.

## 👥 Equipo

- **Módulo 1**: Auth + Perfil ✅
- **Módulo 2**: Admin Contenido 🚧
- **Módulo 3**: Admin Planes/Rutinas 🚧
- **Módulo 4**: Catálogo Usuario 🚧
- **Módulo 5**: Seguimiento Usuario 🚧

## 📞 Soporte

Para preguntas o soporte, consulta la [documentación completa](./docs/FRONTEND_GUIDE.MD) o contacta al equipo de desarrollo.

## 🔗 Enlaces Útiles

- [Angular Documentation](https://angular.io/docs)
- [Angular Material Components](https://material.angular.io/components)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [RxJS Documentation](https://rxjs.dev/)

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

---

**Última actualización**: Noviembre 2025  
**Versión**: 1.0.0  
**Estado**: En desarrollo activo 🚀
