<script setup>
import { ref } from "vue";
import { RouterLink, RouterView } from 'vue-router';


const abierto = ref(false);
</script>

<template>
  <header
    class="sticky top-0 z-50 flex items-center justify-between px-4 py-3 sm:px-6 backdrop-blur-md text-white"
  >
    <a href="#" class="font-script text-2xl">Funky's</a>

    <button type="button" @click="abierto = !abierto" class="text-2xl">
      ☰
    </button>
  </header>

  <nav
    v-if="abierto"
    class="sticky top-[56px] z-40 flex flex-col gap-2 px-4 py-3 backdrop-blur-md text-white sm:px-6"
  >
  <ul>
  <li><RouterLink to="/">Inicio</RouterLink></li>
  <li><RouterLink to="/museo">Galería</RouterLink></li>
  <li><RouterLink to="/#buscador">Buscador</RouterLink></li>
  <li><RouterLink to="/favorites">Favoritos</RouterLink></li>
  <li><RouterLink to="/contact">Contacto</RouterLink></li>
</ul>
  </nav>
</template>
