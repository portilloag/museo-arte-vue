<script setup>
import { onMounted } from 'vue'
import { useFavs } from '@/composable/useFavorites'
import Tarjeta from '@/components/Tarjeta.vue'


const { cargarFavs, favs } = useFavs()

onMounted(() => {
  cargarFavs()
})
</script>

<template>

  <main class="px-3 pb-14 pt-24 sm:px-5">
    <h1 class="mb-8 text-center font-script text-4xl font-bold text-white md:text-5xl">
      Mis favoritos
    </h1>

    <p v-if="!favs.length" class="py-8 text-center font-serif italic text-amber-100/90">
      Todavía no tenés favoritos. Tocá el corazón en una obra para guardarla.
    </p>

    <section
      v-else
      class="columns-2 gap-x-5 overflow-visible md:columns-3 lg:columns-4"
    >
      <Tarjeta v-for="obra in favs" :key="obra.id" :obra="obra" />
    </section>
  </main>
</template>