import { ref } from "vue"
const favs = ref([])

const cargarFavs = () => {
  favs.value = JSON.parse(localStorage.getItem('favs')) || []
}

const esFavs = (id) => {
  return favs.value.some(obra => obra.id == id)
}

const agregarFavs = (artwork) => {
  if (esFavs(artwork.id)) {
    favs.value = favs.value.filter((p) => p.id != artwork.id)
  } else {
    favs.value.push(artwork)
  }
  localStorage.setItem('favs', JSON.stringify(favs.value))
}

export function useFavs() {
  return {
    cargarFavs,
    favs,
    esFavs,
    agregarFavs
  }
}
