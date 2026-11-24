const PROXY = "https://artic-proxy-museo.bold-meadow-f35c.workers.dev";
const API = import.meta.env.DEV ? "/api-artic/artworks" : `${PROXY}/artworks`;
const IIIF = import.meta.env.DEV ? "/iiif" : `${PROXY}/iiif`;
const FIELDS = "id,title,image_id,artist_title,department_title,date_display,date_start,date_end,artwork_type_title,style_titles";
const FILTRO_PINTURAS = {
  term: {
    "artwork_type_title.keyword": "Painting",
  },
};

async function request(url) {
  const res = await fetch(url, {
    headers: {
      "AIC-User-Agent": "MuseoDeArteVue (estudiante@davinci.edu.ar)",
    },
  });
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return res.json();
};

export function imageUrl(imageId, width = 400) {
  if (!imageId) return null;
  return `${IIIF}/${imageId}/full/${width},/0/default.jpg`;
};

export function getArtworks(page = 1, limit = 12) {
  const params = {
    page,
    limit,
    fields: FIELDS,
    query: FILTRO_PINTURAS,
  };

  return request(
    `${API}/search?params=${encodeURIComponent(JSON.stringify(params))}`
  );
};

export function getArtwork(id) {
  const fields = FIELDS + ",description,medium_display,place_of_origin";

  return request(`${API}/${id}?fields=${fields}`);
};

export function searchArtworks(query = "", filtros = {}, page = 1, limit = 12) {
  const must = [];
  const filter = [FILTRO_PINTURAS];

  if (query.trim()) {
    must.push({
      multi_match: { query: query.trim(), fields: ["title^2", "artist_title"] },
    });
  }

  if (filtros.estilo) {
    filter.push({ term: { "style_titles.keyword": filtros.estilo } });
  }

  const params = {
    page,
    limit,
    fields: FIELDS,
    query: { bool: { must, filter } },
  };

  return request(`${API}/search?params=${encodeURIComponent(JSON.stringify(params))}`);
}

export function exposicionActual(page = 1, limit = 12) {
  const params = {
    page,
    limit,
    fields: FIELDS,
    query: {
      bool: {
        filter: [
          FILTRO_PINTURAS,
          {
            term: {
              "style_titles.keyword": "Renaissance",
            },
          },
        ],
      },
    },
  };

  return request(
    `${API}/search?params=${encodeURIComponent(JSON.stringify(params))}`
  );
};