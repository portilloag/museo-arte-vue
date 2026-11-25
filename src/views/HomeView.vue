<script setup>
import { ref, onMounted } from "vue";
import { exposicionActual } from "../services/artic.js";
import Hero from "@/components/Hero.vue";
import ExposicionActual from "@/components/ExposicionActual.vue";
import Loader from '@/components/Loader.vue';

const obras = ref([]);
const cargando = ref(true);
const error = ref(null);

async function cargar() {
  cargando.value = true;
  error.value = null;

  try {
    const res = await exposicionActual();
    obras.value = res.data;
  } catch (e) {
    console.error("Fallo al cargar obras:", e);
    error.value = `No se pudieron cargar las obras`;
  } finally {
    cargando.value = false;
  }
}

onMounted(cargar);
</script>

<template>
  <Hero />
  <Loader v-if="cargando" />

  <div v-else-if="error" class="text-center py-8">
    <p class="text-amber-100 mb-2">{{ error }}</p>
    <button @click="cargar" class="cursor-pointer rounded-md bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-500 active:scale-95">
      Reintentar
    </button>
  </div>
  <div v-else class="container mx-auto px-2 py-2">
    <h2 class="font-script text-3xl text-center md:text-4xl font-bold text-white mt-6 mb-6">
      Exposición Actual
    </h2>
    <section class="columns-2 gap-x-5 px-3 sm:px-5 py-5 md:columns-3 lg:columns-4 overflow-visible">
      <ExposicionActual v-for="obra in obras" :key="obra.id" :obra="obra" />
    </section>
  </div>
</template>
