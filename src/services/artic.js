// En desarrollo se usa el proxy de vite.config.js (funciona con las imágenes de ARTIC).
// En producción (Firebase) se usa el Worker de Cloudflare, porque ARTIC bloquea CORS y las peticiones desde Supabase.
const PROXY = 'https://artic-proxy-museo.bold-meadow-f35c.workers.dev'
const API = import.meta.env.DEV ? '/api-artic/artworks' : `${PROXY}/artworks`
const IIIF = import.meta.env.DEV ? '/iiif' : `${PROXY}/iiif`
const FIELDS = 'id,title,image_id,artist_title,department_title,date_display'

export function imageUrl(imageId, width = 400) {
  if (!imageId) return null
  return `${IIIF}/${imageId}/full/${width},/0/default.jpg`
}

async function request(url) {
  const res = await fetch(url, {
    headers: {
      'AIC-User-Agent': 'MuseoDeArteVue (estudiante@davinci.edu.ar)'
    }
  })
  if (!res.ok) throw new Error(`Error ${res.status}`)
  return res.json()
}

// Listado para el inicio (paginado)
export function getArtworks(page = 1, limit = 12) {
  return request(`${API}?page=${page}&limit=${limit}&fields=${FIELDS}`)
}

// Búsqueda por nombre
export function searchArtworks(query, page = 1, limit = 12) {
  return request(
    `${API}/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}&fields=${FIELDS}`
  )
}

// Detalle (/detalle/:id)
export function getArtwork(id) {
  const fields = FIELDS + ',description,medium_display,place_of_origin'
  return request(`${API}/${id}?fields=${fields}`)
}