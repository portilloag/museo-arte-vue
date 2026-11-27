# Museo de Arte — Vue 3

Aplicación web de un museo virtual hecha con Vue 3 y Vite. Permite explorar pinturas de la colección del Art Institute of Chicago, buscar y filtrar por estilo, ver el detalle de cada obra, guardar favoritos, iniciar sesión con Google o GitHub y pedirle recomendaciones a un asistente de IA.

## Integrantes

- Naiara Tymkiw
- Andrea Portillo

## Tema y API elegida

- **Tema:** museo de arte.
- **API:** [Art Institute of Chicago API](https://api.artic.edu/) (`https://api.artic.edu/api/v1`). Es pública y no requiere API key.

Se consumen los endpoints `/artworks/search` y `/artworks/{id}`, filtrando solo obras de tipo *Painting*. Las imágenes se piden al servidor IIIF del museo (`https://www.artic.edu/iiif/2`).

## Tecnologías

- Vue 3 (`<script setup>`) + Vue Router 5
- Vite
- Tailwind CSS 4
- Firebase (Authentication y Hosting)
- lucide-vue-next (íconos)
- OpenRouter (IA)

## URL pública (Firebase Hosting)

El proyecto está desplegado en Firebase Hosting (proyecto `museoarte`):

**https://museoarte.web.app**


## Instalación y ejecución

### Requisitos

- [Node.js](https://nodejs.org/) 20.19 o superior (requisito de Vite 8)
- npm
- Git

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/portilloag/museo-arte-vue.git
cd museo-arte-vue

# 2. Instalar dependencias
npm install

# 3. Configurar la API key de OpenRouter (ver sección "Configuración")

# 4. Levantar el servidor de desarrollo
npm run dev
```

La app queda disponible en `http://localhost:5173`.

### Otros comandos

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo con recarga en caliente |
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run preview` | Sirve localmente la carpeta `dist/` para probarla |

### Despliegue en Firebase

```bash
npm install -g firebase-tools
firebase login
npm run build
firebase deploy --only hosting
```

`firebase.json` publica la carpeta `dist` y redirige todas las rutas a `index.html`, necesario para que funcione Vue Router.

## Configuración y variables de entorno

### API del museo (Art Institute of Chicago)

No necesita credenciales. Lo único que cambia es cómo se llega a la API según el entorno:

- **Desarrollo (`npm run dev`):** Vite usa un proxy configurado en `vite.config.js` (`/api-artic` y `/iiif`) que reenvía las peticiones a la API y agrega el header `AIC-User-Agent`.
- **Producción:** como en Firebase Hosting no existe ese proxy, las peticiones pasan por un proxy en Cloudflare Workers (definido en `src/services/artic.js`, constante `PROXY`) que resuelve el CORS y el header requerido por la API.

El cambio entre ambos modos es automático mediante `import.meta.env.DEV`.

### Firebase

La configuración del proyecto (`apiKey`, `authDomain`, `projectId`, etc.) está en `src/services/firebase.js`. Las claves de configuración web de Firebase son públicas por diseño; la seguridad se controla desde la consola de Firebase (dominios autorizados y reglas). Si se quisiera usar otro proyecto de Firebase, hay que reemplazar ese objeto `firebaseConfig` con los datos propios y habilitar en *Authentication → Sign-in method* los proveedores **Google** y **GitHub**.

### OpenRouter (IA)

Ver la sección siguiente.

## Opción de IA elegida: OpenRouter

Para el **Recomendador** se eligió **[OpenRouter](https://openrouter.ai/)**, un servicio que da acceso a distintos modelos de IA con una sola API. El modelo usado es un modelo gratuito:

```
nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free
```

El recomendador recibe la lista de obras cargadas en pantalla y responde recomendaciones en texto plano, de hasta 80 caracteres, usando únicamente esa información (la lógica está en `src/composable/useRecomendador.js` y la interfaz en `src/components/Recomendador.vue`).

### Cómo generar y configurar la API key

**Para que el recomendador funcione, cada persona que corra el proyecto tiene que generar su propia API key de OpenRouter y agregarla en el código.**

1. Crear una cuenta en [openrouter.ai](https://openrouter.ai/).
2. Ir a **Keys** ([openrouter.ai/keys](https://openrouter.ai/keys)) y hacer clic en **Create Key**.
3. Copiar la clave generada (empieza con `sk-or-v1-...`). Solo se muestra una vez.
4. Abrir el archivo **`src/composable/useRecomendador.js`**.
5. Buscar el header `Authorization` dentro del `fetch` y reemplazar la clave por la propia:

   ```js
   headers: {
     Authorization: `Bearer TU_API_KEY_DE_OPENROUTER`,
     "Content-Type": "application/json",
   },
   ```

6. Guardar el archivo y reiniciar `npm run dev` si estaba corriendo.

> ⚠️ **No subir la API key a un repositorio público.** Si se sube a GitHub, cualquiera puede usarla y OpenRouter puede deshabilitarla. Antes de hacer `git commit`, verificar que no quede una clave real en el archivo, y si alguna vez se subió, revocarla desde el panel de OpenRouter y crear una nueva.

## Por qué usamos `v-html`

En la vista de detalle de cada obra (`src/views/DetallesView.vue`) mostramos la descripción con la directiva `v-html`:

```vue
<div v-html="obra.description"></div>
```

**El motivo:** el campo `description` que devuelve la API del Art Institute of Chicago no es texto plano, sino texto con **etiquetas HTML semánticas**, por ejemplo `<p>` para los párrafos, `<em>` para énfasis o títulos de obras y `<a>` para enlaces a otras obras o artistas.

Si se usara la interpolación común de Vue (`{{ obra.description }}`), Vue escaparía el contenido por seguridad y en pantalla se verían las etiquetas literales (`<p>Esta obra...</p>`) en lugar del texto formateado. Con `v-html`, el navegador interpreta esas etiquetas y la descripción se muestra tal como la redactó el museo: con sus párrafos, cursivas y enlaces. Además, los estilos de Tailwind (`[&_p]:inline`, `[&_a]:underline`) se aplican a esas etiquetas internas para integrarlas con el diseño.

**Consideración de seguridad:** `v-html` inserta HTML sin sanitizar, por lo que solo debe usarse con contenido en el que se confía. Acá el contenido proviene de la API oficial del museo y no de lo que escriben los usuarios, lo que reduce el riesgo de ataques XSS. Nunca usamos `v-html` con texto ingresado por el usuario (por ejemplo, el chat del recomendador usa interpolación `{{ }}` común).

## Estructura del proyecto

```
src/
├── components/     # Navbar, Footer, Hero, Buscador, Filtros, Tarjeta, Recomendador, Loader...
├── composable/     # useFavorites, useRecomendador, useAlerta
├── routes/         # Configuración de Vue Router
├── services/       # artic.js (API del museo) y firebase.js (autenticación)
├── views/          # Home, Museo, Detalles, Favoritos, Contacto, 404
├── App.vue
├── main.js
└── styles.css
```

## Rutas

| Ruta | Vista |
| --- | --- |
| `/` | Inicio |
| `/museo` | Colección con búsqueda y filtros |
| `/detalle/:id` | Detalle de una obra |
| `/favorites` | Obras favoritas (guardadas en `localStorage`) |
| `/contact` | Contacto |
| `/*` | Página 404 |