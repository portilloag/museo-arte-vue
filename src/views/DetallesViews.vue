<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getArtwork, imageUrl } from '@/services/artic.js'
import { btnFavs, isFav } from '../favs.js'

const route = useRoute()
const artwork = ref(null)
const loading = ref(true)
const error = ref(false)
const saved = ref(false)

onMounted(async () => {
  try {
    const data = await getArtwork(route.params.id)
    artwork.value = data.data
    saved.value = isFav(artwork.value.id)
  } catch (err) {
    error.value = true
  } finally {
    loading.value = false
  }
})

const activoFavs = () => {
  btnFavs(artwork.value)
  saved.value = !saved.value
}
</script>