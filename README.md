# Portafolio

Portafolio web personal en Astro + Tailwind CSS, organizado en dos versiones independientes.

## Estructura

```
.
├── v1/   # Versión 1: copia congelada del diseño original
└── v2/   # Versión 2: misma base que v1, aquí se harán los cambios
```

Cada carpeta es un proyecto Astro completo y autónomo (tiene su propio `package.json`, `src/`, `public/` y configuración).

## Requisitos

- Node.js 18.17.1+, 20+ o 22 LTS (recomendado: Node 22 LTS)
- npm

## Instalación

```powershell
npm run install:v1
npm run install:v2
```

O dentro de cada carpeta:

```powershell
cd v1
npm install

cd ../v2
npm install
```

## Desarrollo

Desde la raíz:

```powershell
npm run dev       # inicia v2 (versión de trabajo)
npm run dev:v1    # inicia v1
npm run dev:v2    # inicia v2
```

O entrando a cada carpeta:

```powershell
cd v2
npm run dev
```

El servidor queda disponible normalmente en **http://localhost:4321**.

> Si quieres levantar ambas versiones al mismo tiempo, ejecuta la segunda en otro puerto:
>
> ```powershell
> npm --prefix ./v1 run dev -- --port 4322
> ```

## Build y preview

```powershell
npm run build:v1
npm run build:v2

npm run preview:v1
npm run preview:v2
```

Cada build queda en `v1/dist/` o `v2/dist/` según corresponda.

## Notas

- **v1** se conserva como referencia del diseño original; evita modificarla.
- **v2** es la versión activa donde se irán aplicando los cambios.
- Los `node_modules`, `dist` y `.astro` de cada versión están ignorados por Git.
