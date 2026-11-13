# Portafolio v2

Portafolio personal en Angular 22 con NgModules, TypeScript, SCSS, Tailwind CSS y GSAP.

## Comandos

```powershell
npm install
npm run dev       # ng serve → http://localhost:4200
npm run build     # build de producción
npm run preview   # ng serve con configuración de producción
npm test          # Vitest en modo watch
npm run test:ci   # Vitest una sola vez
```

## Rutas

| Ruta | Descripción |
| --- | --- |
| `/` | Hero, experiencia laboral y acerca de |
| `/scramble-demo` | Demo del componente `ScrambleText` |

La navegación interna usa `routerLink` con fragmentos (`/#experiencia`) y
`anchorScrolling`, por lo que no recarga la aplicación al moverse entre secciones.

## Arquitectura

El código se organiza por capas para separar el shell, los servicios
singleton, la interfaz reutilizable y las funcionalidades de cada ruta.

```
src/app/
├── app.module.ts
├── app-routing.module.ts
├── app.component.*
├── core/
│   └── services/
│       ├── theme.service.*
│       └── fragment-scroll.service.*
├── layout/
│   ├── layout.module.ts
│   ├── header/
│   ├── footer/
│   └── theme-toggle/
├── shared/
│   ├── shared.module.ts
│   ├── icon/
│   ├── section-heading/
│   ├── section-container/
│   ├── badge/
│   ├── social-pill/
│   ├── link-inline/
│   └── scramble-text/
└── features/
    ├── home/
    │   ├── home.module.ts
    │   ├── home-routing.module.ts
    │   ├── home.component.*
    │   ├── data/
    │   ├── models/
    │   └── components/
    │       ├── hero/
    │       ├── experience/
    │       ├── experience-item/
    │       └── about/
    └── scramble-demo/
        ├── scramble-demo.module.ts
        ├── scramble-demo-routing.module.ts
        ├── scramble-demo.component.*
        └── data/
```

### Responsabilidades

- `AppModule` arranca la aplicación e importa el shell.
- `LayoutModule` agrupa header, footer y selector de tema; se importa una sola vez.
- `SharedModule` declara y exporta los componentes reutilizables, además de `CommonModule`.
- `HomeModule` y `ScrambleDemoModule` son módulos lazy: cada ruta carga solo su código.
- `core/services` contiene servicios singleton con `providedIn: 'root'` (`ThemeService` y `FragmentScrollService`); no necesita un `CoreModule`.
- Cada sección del home es dueña de su `SectionContainer` y su `SectionHeading`, por lo que `HomeComponent` solo compone.

### Alias de importación

| Alias | Ruta |
| --- | --- |
| `@core/*` | `src/app/core/*` |
| `@layout/*` | `src/app/layout/*` |
| `@shared/*` | `src/app/shared/*` |
| `@features/*` | `src/app/features/*` |

### Convenciones

- Cada componente se divide en `.component.ts`, `.component.html`, `.component.scss` y, cuando aporta cobertura, `.component.spec.ts`.
- Todos los componentes usan `ChangeDetectionStrategy.OnPush`.
- TypeScript y las plantillas se compilan en modo estricto (`strict` y `strictTemplates`).
- Los iconos se centralizan en `IconComponent`; los encabezados de sección en `SectionHeadingComponent`.

## ScrambleText

Componente con selector de atributo para conservar etiquetas semánticas:

```html
<h1
  appScrambleText
  text="MORLOC IS BACK"
  [speed]="1.8"
  [delay]="0"
  characters="01<>[]{}#$%&*+-=/"
  class="text-5xl font-mono"
></h1>
```

### Inputs

| Input | Tipo | Default |
| --- | --- | --- |
| `text` | `string` | — (requerido) |
| `speed` | `number` | `1.2` |
| `delay` | `number` | `0` |
| `characters` | `string` | Alfabeto Matrix |
| `playOnView` | `boolean` | `false` |
| `respectReducedMotion` | `boolean` | `true` |

### Repetir la animación

```ts
@ViewChildren(ScrambleTextComponent)
private readonly scrambleTexts!: QueryList<ScrambleTextComponent>;

replayAll(): void {
  this.scrambleTexts.forEach((item) => item.play());
}
```

O mediante el evento declarativo:

```ts
element.dispatchEvent(new CustomEvent('scramble:play'));
```

El componente emite `scramble:start` y `scramble:end`, y desactiva la animación cuando el sistema tiene activado `prefers-reduced-motion`.

## Tema

`ThemeService` administra las preferencias `light`, `dark` y `system`, aplica la clase `dark` al documento y guarda la elección en `localStorage`. El `index.html` incluye un script mínimo para aplicar el tema antes de arrancar Angular y evitar destellos.
