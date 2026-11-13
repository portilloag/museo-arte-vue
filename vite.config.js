import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api-artic': {
        target: 'https://api.artic.edu/api/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-artic/, ''),
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'AIC-User-Agent': 'MuseoDeArteVue (estudiante@davinci.edu.ar)'
        }
      },
      '/iiif': {
        target: 'https://www.artic.edu/iiif/2',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/iiif/, ''),
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'AIC-User-Agent': 'MuseoDeArteVue (estudiante@davinci.edu.ar)'
        }
      }
    }
  }
})
