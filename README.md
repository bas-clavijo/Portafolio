# Portafolio

Portafolio personal de Bastián Clavijo Llantén, organizado en dos versiones independientes.

```
.
├── v1/   # Versión original en Astro (congelada como referencia)
└── v2/   # Versión activa en Angular 22 + TypeScript
```

## Tecnologías

| Versión | Stack |
| --- | --- |
| `v1` | Astro + Tailwind CSS |
| `v2` | Angular 22 + TypeScript + NgModules + SCSS + Tailwind CSS + GSAP |

## Requisitos

- Node.js `^22.22.3` o `^24.15.0` (requerido por Angular 22)
- npm

## Instalación

```powershell
npm run install:v2
npm run install:v1
```

O dentro de cada carpeta:

```powershell
cd v2
npm install

cd ../v1
npm install
```

## Desarrollo

Desde la raíz:

```powershell
npm run dev       # inicia v2 (versión activa) en http://localhost:4200
npm run dev:v1    # inicia v1 en http://localhost:4321
npm run dev:v2    # alias de npm run dev
```

También puedes entrar a cada carpeta:

```powershell
cd v2
npm run dev
```

Para levantar ambas versiones al mismo tiempo, inicia v1 en otro puerto:

```powershell
npm --prefix ./v1 run dev -- --port 4322
```

## Build

```powershell
npm run build       # build de producción de v2
npm run build:v1
npm run build:v2
```

La salida de Angular queda en `v2/dist/portafolio-v2/browser/` y la de Astro en `v1/dist/`.

## Pruebas

```powershell
npm test
```

O directamente en v2, sin modo watch:

```powershell
npm --prefix ./v2 run test:ci
```

Las pruebas usan Vitest + jsdom.

## Rutas de v2

| Ruta | Descripción |
| --- | --- |
| `/` | Portafolio: hero, experiencia y acerca de |
| `/scramble-demo` | Demo del componente de texto animado (`MORLOC IS BACK`) |

## Arquitectura de v2

```
v2/src/app/
├── app.module.ts
├── app-routing.module.ts
├── app.component.{ts,html,scss,spec.ts}
├── core/
│   └── services/
│       ├── theme.service.{ts,spec.ts}
│       └── fragment-scroll.service.{ts,spec.ts}
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
    │   ├── home.component.{ts,html,scss,spec.ts}
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
        ├── scramble-demo.component.{ts,html,scss,spec.ts}
        └── data/
```

Cada componente usa la convención `*.component.ts`, `*.component.html`, `*.component.scss` y, cuando aporta cobertura, `*.component.spec.ts`.

- `AppModule` arranca la aplicación e importa `LayoutModule`.
- `LayoutModule` agrupa header, footer y selector de tema; se importa una sola vez.
- `SharedModule` contiene iconos, encabezados, contenedores e interfaz reutilizable.
- `HomeModule` y `ScrambleDemoModule` encapsulan cada ruta y se cargan de forma lazy.
- `ThemeService` centraliza la preferencia `light`/`dark`/`system` y persiste en `localStorage`.
- `FragmentScrollService` asegura el scroll a las secciones aunque el módulo lazy se renderice después de la navegación.
- Los alias `@core/*`, `@layout/*`, `@shared/*` y `@features/*` evitan imports relativos profundos.
- TypeScript y las plantillas compilan en modo estricto, y todos los componentes usan `OnPush`.

## Componente ScrambleText

Se aplica como atributo sobre cualquier etiqueta semántica:

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

| Input | Tipo | Default | Descripción |
| --- | --- | --- | --- |
| `text` | `string` | — | Texto final (requerido) |
| `speed` | `number` | `1.2` | Duración en segundos |
| `delay` | `number` | `0` | Retardo en segundos |
| `characters` | `string` | alfabeto Matrix | Glifos del caos |
| `playOnView` | `boolean` | `false` | Anima al entrar al viewport |
| `respectReducedMotion` | `boolean` | `true` | Respeta `prefers-reduced-motion` |

Repetir todas las instancias:

```ts
@ViewChildren(ScrambleTextComponent)
private readonly scrambleTexts!: QueryList<ScrambleTextComponent>;

replayAll(): void {
  this.scrambleTexts.forEach((item) => item.play());
}
```

También se puede disparar desde el DOM:

```ts
element.dispatchEvent(new CustomEvent('scramble:play'));
```

El componente emite `scramble:start` y `scramble:end`.

## Notas

- **v1** se conserva como referencia del diseño original; evita modificarla.
- **v2** es la versión activa donde se aplican los cambios.
- `node_modules`, `dist` y la caché de Angular están ignorados por Git.
