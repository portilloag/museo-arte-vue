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
        <div>
          <button @click="agregarFavs(obra)">
            <template v-if="isFavs" >Quitar</template>
            <template v-else >Agregar</template>
            a favoritos
          </button>
        </div>
      </div>
    </div>
  </article>
</template>