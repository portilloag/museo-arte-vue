
<script setup>
import { ref } from 'vue'

const abierto = ref(false)
</script>

<template>
  <header class="sticky top-0 z-50 flex items-center justify-between px-4 py-3 sm:px-6  backdrop-blur-md text-white">
    <a href="#" class="font-script text-2xl">Funky's</a>

    <button type="button" @click="abierto = !abierto" class="text-2xl">☰</button>
  </header>

  <nav v-if="abierto" class="sticky top-[56px] z-40 flex flex-col gap-2 px-4 py-3 backdrop-blur-md text-white sm:px-6">
    <a href="#" class="py-1">Inicio</a>
    <a href="#" class="py-1">Galería</a>
    <a href="#" class="py-1">Buscador</a>
    <a href="#" class="py-1">Favoritos</a>
  </nav>
</template>