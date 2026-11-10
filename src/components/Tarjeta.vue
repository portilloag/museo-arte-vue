<script setup>
import { imageUrl } from '@/services/artic'
import { ref, onMounted, computed } from 'vue'
import { useFavs } from "@/composable/useFavorites"
const props = defineProps(['obra'])

const { cargarFavs, favs, esFavs, agregarFavs } = useFavs()

onMounted(() => {
  cargarFavs()
})

const isFavs = computed( () => {
  return esFavs(props.obra.id)
} )
</script>

<template>
  <article
    class=" cursor-lupa group relative mb-2 break-inside-avoid overflow-visible transition-all duration-500 ease-out
           hover:z-40 hover:scale-110"
  >
    <!-- Marco y pintura-->
    <div
      class="bg-[url('/marco-largo.png')] bg-[length:100%_100%] bg-no-repeat p-4 sm:p-6
              duration-500 "
    >
      <div class="relative">
        <img
          v-if="obra.image_id"
          :src="imageUrl(obra.image_id, 400)"
          :alt="obra.title"
          loading="lazy"
          referrerpolicy="no-referrer"
          class="block h-auto w-full shadow-inner"
        />
        <div v-else class="flex aspect-[3/4] w-full items-center justify-center bg-stone-900 text-xs text-amber-200/50">
          Sin imagen
        </div>

        <!-- texto-->
        <div
          class="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/70 p-3
                 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          <h3 class="line-clamp-3  text-sm font-bold text-white drop-shadow">
            {{ obra.title }}
          </h3>
          <p v-if="obra.artist_title" class="line-clamp-2  text-xs italic text-amber-100">
            {{ obra.artist_title }}
          </p>
        </div>
      </div>
    </div> 
  
<button
  type="button"
  :aria-label="isFavs ? 'Quitar de favoritos' : 'Agregar a favoritos'"
  class="absolute right-2 top-2 z-10 flex h-9 w-9 cursor-pointer items-center justify-center
         rounded-full bg-black/40 backdrop-blur-sm transition duration-300
         hover:scale-110 hover:bg-black/60
         [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100"
  @click="agregarFavs(obra)"
>
  <svg
    class="h-5 w-5 transition duration-300"
    :class="isFavs ? 'fill-rose-500 stroke-rose-500 scale-110' : 'fill-transparent stroke-white'"
    viewBox="0 0 24 24"
    stroke-width="2"
    stroke-linejoin="round"
  >
    <path d="M12 21s-7-4.6-9.3-9.1C1.1 8.7 3 5 6.5 5c2 0 3.5 1.1 5.5 3.2C14 6.1 15.500 5 17.500 5 21 5 22.900 8.700 21.300 11.900 19 16.400 12 21 12 21Z" />
  </svg>
</button>
  </article>
</template>
       