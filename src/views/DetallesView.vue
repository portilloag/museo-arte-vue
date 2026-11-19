<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { getArtwork } from '@/services/artic'
import { imageUrl } from '@/services/artic'
import { useFavs } from '@/composable/useFavorites'


const { cargarFavs, esFavs, agregarFavs } = useFavs()
cargarFavs()


const route = useRoute()
const obra = ref(null)
const loading = ref(true)

getArtwork(route.params.id)
  .then(res => {
    obra.value = res.data
  })
  .catch(err => {
    console.log(err)
  })
  .finally(() => {
    loading.value = false
  })
</script>

<template>

  <main class="min-h-svh px-5 pb-16 pt-24">
    <div v-if="!loading">

      <div v-if="obra" class="mx-auto max-w-6xl">

        <RouterLink
          to="/museo"
          class="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10
                 px-4 py-2 font-serif text-xs uppercase tracking-widest text-amber-50
                 backdrop-blur-md transition hover:bg-white/20"
        >
          ← Volver
        </RouterLink>

        <div class="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">

          <!-- Obra -->
          <div class="flex items-center justify-center lg:sticky lg:top-24">
            <div class="bg-[url('/marco-largo.png')] bg-[length:100%_100%] bg-no-repeat p-5 shadow-2xl sm:p-8">
              <img
                v-if="obra.image_id"
                :src="imageUrl(obra.image_id, 843)"
                :alt="obra.title"
                referrerpolicy="no-referrer"
                class="block max-h-[65vh] w-auto max-w-full object-contain shadow-inner"
              />
              <div v-else class="flex aspect-[3/4] w-64 items-center justify-center bg-stone-900 text-xs text-amber-200/50">
                Sin imagen
              </div>
            </div>
          </div>

          <!-- info -->
          <aside
            class="rounded-lg border border-white/25 bg-white/10 p-6 shadow-xl backdrop-blur-md
                   lg:max-h-[80vh] lg:overflow-y-auto"
          >
            <p class="font-serif text-[11px] uppercase tracking-[0.3em] text-[#c9a45c]">
              {{ obra.place_of_origin || 'Obra de la colección' }}
            </p>

            <h1 class="mt-2 font-serif text-2xl font-bold leading-tight text-amber-50 md:text-3xl">
              {{ obra.title }}
            </h1>

            <p v-if="obra.artist_title" class="mt-2 font-serif text-base italic text-amber-100">
              {{ obra.artist_title }}
            </p>
            <p v-if="obra.date_display" class="font-serif text-sm text-amber-100/70">
              {{ obra.date_display }}
            </p>

            <p v-if="obra.medium_display"
               class="mt-4 border-t border-[#c9a45c]/30 pt-4 font-serif text-xs uppercase tracking-widest text-amber-100/70">
              {{ obra.medium_display }}
            </p>

            <div
              v-if="obra.description"
              class="mt-4 space-y-3 font-serif text-sm leading-relaxed text-amber-50/90"
              v-html="obra.description"
            />
            <p v-else class="mt-4 font-serif text-sm italic text-amber-100/60">
              Esta obra no tiene descripción disponible.
            </p>

            <div class="mt-6 flex flex-wrap gap-3">
              <RouterLink
                to="/contact"
                class="rounded-full border border-white/70 bg-white px-6 py-2.5 font-serif text-xs
                       uppercase tracking-widest text-black transition duration-300
                       hover:bg-transparent hover:text-white"
              >
                Consultar impresión
              </RouterLink>
              <button
  type="button"
  class="flex items-center gap-2 rounded-full border border-white/70 px-6 py-2.5 font-serif text-xs
         uppercase tracking-widest text-white transition duration-300
         hover:bg-white hover:text-black"
  @click="agregarFavs(obra)"
>
  <svg
    class="h-4 w-4 transition duration-300"
    :class="esFavs(obra.id) ? 'fill-rose-500 stroke-rose-500' : 'fill-transparent stroke-current'"
    viewBox="0 0 24 24"
    stroke-width="2"
    stroke-linejoin="round"
  >
    <path d="M12 21s-7-4.6-9.3-9.1C1.1 8.7 3 5 6.5 5c2 0 3.5 1.1 5.5 3.2C14 6.1 15.5 5 17.5 5 21 5 22.9 8.7 21.3 11.9 19 16.4 12 21 12 21Z" />
  </svg>
  {{ esFavs(obra.id) ? 'Quitar de favoritos' : 'Agregar a favoritos' }}
</button>
            </div>
          </aside>

        </div>
      </div>

      <div v-else class="py-16 text-center font-serif text-amber-100">
        Error al traer la obra
      </div>

    </div>

    <!-- loading -->
    <div v-else class="flex justify-center py-16">
      <svg class="size-8 animate-spin text-amber-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  </main>

  
</template>