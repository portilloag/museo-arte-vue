<script setup>
import { ref } from "vue";
import { RouterLink } from 'vue-router';

const abierto = ref(false);
</script>


<template>
  <header
    class="sticky top-0 z-50 border-b border-[#c9a45c]/30 bg-black/50 text-amber-50 shadow-lg shadow-black/30 backdrop-blur-md"
  >
    <div class="flex items-center justify-between px-4 py-3 sm:px-6">
      
     
     <RouterLink to="/" class="flex items-center">
  <img
    src="/f-museum-logo.png"
    alt="Funky's Art Gallery"
    class="h-10 w-auto sm:h-12"
  />
</RouterLink>

      <!-- burger -->
      <button 
        type="button" 
        @click="abierto = !abierto" 
        class="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#c9a45c]/60 text-lg text-amber-50 transition hover:bg-[#c9a45c]/20 focus:outline-none md:hidden"
      >
        {{ abierto ? '✕' : '☰' }}
      </button>

      <!-- Menú de ESCRITORIO -->
      <nav class="hidden md:flex">
        <ul class="flex gap-8 font-serif text-sm uppercase ">
          <li>
            <RouterLink to="/" class="text-amber-100/80 transition hover:text-[#e6c982]">Inicio</RouterLink>
          </li>
          <li>
            <RouterLink to="/museo" class="text-amber-100/80 transition hover:text-[#e6c982]">Galería</RouterLink>
          </li>
          <li>
            <RouterLink to="/favorites" class="text-amber-100/80 transition hover:text-[#e6c982]">Favoritos</RouterLink>
          </li>
          <li>
            <RouterLink to="/contact" class="text-amber-100/80 transition hover:text-[#e6c982]">Contacto</RouterLink>
          </li>
        </ul>
      </nav>

    </div>

    <!-- Menú MOBILE -->
    <nav
      v-if="abierto"
      class="border-t border-[#c9a45c]/30 bg-black/60 px-4 py-4 backdrop-blur-md md:hidden"
    >
      <ul class="flex flex-col gap-3 font-serif text-sm uppercase ">
        <li>
          <RouterLink to="/" @click="abierto = false" class="block py-1 text-amber-100/80 transition hover:text-[#e6c982]">Inicio</RouterLink>
        </li>
        <li>
          <RouterLink to="/museo" @click="abierto = false" class="block py-1 text-amber-100/80 transition hover:text-[#e6c982]">Galería</RouterLink>
        </li>
        <li>
          <RouterLink to="/favorites" @click="abierto = false" class="block py-1 text-amber-100/80 transition hover:text-[#e6c982]">Favoritos</RouterLink>
        </li>
        <li>
          <RouterLink to="/contact" @click="abierto = false" class="block py-1 text-amber-100/80 transition hover:text-[#e6c982]">Contacto</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
