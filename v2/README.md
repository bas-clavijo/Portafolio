# Portafolio v2

Portafolio personal en Angular 22 con NgModules, TypeScript, SCSS, Tailwind CSS y GSAP.

## Comandos

```powershell
npm install
npm run dev       # ng serve → http://localhost:4200
npm run build     # build de producción
npm run preview   # ng serve con configuración de producción
npm test          # Vitest en modo watch
```

Para ejecutar las pruebas una sola vez:

```powershell
npm test -- --watch=false
```

## Rutas

| Ruta | Descripción |
| --- | --- |
| `/` | Hero, experiencia laboral y acerca de |
| `/scramble-demo` | Demo del componente `ScrambleText` |

## Estructura

```
src/app/
├── app.module.ts
├── app-routing.module.ts
├── app.component.*
├── core/services/theme.service.*
├── shared/
│   ├── shared.module.ts
│   ├── header/
│   ├── footer/
│   ├── section-container/
│   ├── theme-toggle/
│   ├── badge/
│   ├── social-pill/
│   ├── link-inline/
│   └── scramble-text/
└── features/
    ├── home/
    └── scramble-demo/
```

Cada componente se divide en `.component.ts`, `.component.html`, `.component.scss` y `.component.spec.ts`.

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
