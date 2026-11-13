# Museo de Arte Vue: cómo funciona y cómo levantarlo

## Qué hace la app

Galería de obras del Art Institute of Chicago (API de ARTIC). Muestra listado, búsqueda, detalle y favoritos.

## Requisitos para instalar

- **Node.js** 20 o superior (incluye `npm`).
- **Git** (opcional, para clonar el repo).
- **Firebase CLI**: `npm install -g firebase-tools`
- **Cuenta de Cloudflare** (solo para desplegar el proxy del Worker).
- **Cuenta de Google con acceso al proyecto de Firebase** `dwm3ap-2026-2`.

## Instalación

```
npm install
```

## Desarrollo local

```
npm run dev
```

Abre la URL que muestra Vite (por ejemplo `http://localhost:5174`).

En desarrollo, `src/services/artic.js` usa las rutas `/api-artic` e `/iiif`. Estas pasan por el proxy de `vite.config.js`, que pide los datos a ARTIC con los headers `User-Agent` y `AIC-User-Agent`. Por eso las imágenes se ven en local.

## Producción (Firebase Hosting)

En producción no existe el proxy de Vite, así que `artic.js` usa el Worker de Cloudflare:

- URL: `https://artic-proxy-museo.bold-meadow-f35c.workers.dev`
- Código: `cloudflare-worker/src/index.js`
- Reenvía `/artworks...` a `https://api.artic.edu/api/v1` y `/iiif/...` a `https://www.artic.edu/iiif/2`.
- Agrega los headers CORS y el `AIC-User-Agent`.

### Publicar

```
npm run build
firebase login
firebase deploy --only hosting
```

`.firebaserc` apunta al proyecto `dwm3ap-2026-2`. URL pública: https://dwm3ap-2026-2.web.app

Para una preview temporal:

```
firebase hosting:channel:deploy preview
```

### Publicar el Worker (solo si cambia el código)

```
cd cloudflare-worker
npx wrangler@latest login
npx wrangler@latest deploy src/index.js --name artic-proxy-museo --compatibility-date 2025-01-01
```

Si Wrangler pide registrar un subdominio `workers.dev`, hazlo desde el panel de Cloudflare (Workers & Pages).

## Problemas conocidos

- **Las imágenes no cargan desde Supabase:** ARTIC devuelve 403 a los servidores de Supabase. No usar ese proxy.
- **Las imágenes no cargan en el navegador sin proxy:** ARTIC bloquea CORS y necesita el header `AIC-User-Agent`.
- **Si una imagen falla:** `src/components/Tarjeta.vue` muestra el título de la obra como respaldo.

## Archivos clave

- `src/services/artic.js`: elige la URL de la API según el entorno.
- `vite.config.js`: proxy de desarrollo para ARTIC.
- `cloudflare-worker/src/index.js`: proxy de producción.
- `firebase.json` y `.firebaserc`: configuración de Firebase Hosting.
- `src/components/Navbar.vue`: incluye `Buscador`.

## Limpieza pendiente

- En Supabase, la Edge Function `artic` (proyecto `dnqgioqkolurocndhvsh`) ya no se usa. Se puede borrar desde el panel.
- En Cloudflare pueden quedar Workers de prueba (`silent-fire-8d7e`, `museo-artic-proxy`). Se pueden borrar desde el panel.
