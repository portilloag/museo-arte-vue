// Proxy para la API y las imagenes de ARTIC, con CORS
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'content-type, aic-user-agent',
  'Access-Control-Max-Age': '86400',
}

const AIC_UA = 'MuseoDeArteVue (estudiante@davinci.edu.ar)'
const BROWSER_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS })
    }
    if (request.method !== 'GET') {
      return new Response('Method not allowed', { status: 405, headers: CORS })
    }

    const url = new URL(request.url)
    let target
    if (url.pathname.startsWith('/iiif/')) {
      target = 'https://www.artic.edu/iiif/2' + url.pathname.replace(/^\/iiif/, '') + url.search
    } else {
      target = 'https://api.artic.edu/api/v1' + url.pathname + url.search
    }

    const upstream = await fetch(target, {
      headers: { 'User-Agent': BROWSER_UA, 'AIC-User-Agent': AIC_UA },
    })

    const headers = new Headers(CORS)
    const ct = upstream.headers.get('content-type')
    if (ct) headers.set('content-type', ct)
    headers.set('cache-control', 'public, max-age=86400')
    return new Response(upstream.body, { status: upstream.status, headers })
  },
}
