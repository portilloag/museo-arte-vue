<script setup>
import { ref, onMounted, watch } from "vue";
import { exposicionActual, searchArtworks } from "../services/artic.js";
import { useRoute } from "vue-router";
import Hero from "@/components/Hero.vue";
import Recomendador from "../components/Recomendador.vue";
import ExposicionActual from "@/components/ExposicionActual.vue";

const obras = ref([]);
const cargando = ref(true);
const error = ref(null);
const titulo = ref("Exposición Actual")

async function cargar() {
  cargando.value = true;
  error.value = null;

  try {
    const res = hayFiltros
      ? await searchArtworks(q ?? "", { estilo })
      : await exposicionActual();

    obras.value = res.data;
    titulo.value = hayFiltros ? "Resultados" : "Exposición Actual";
  } catch (e) {
    console.error("Fallo al cargar obras:", e);
    error.value = `No se pudieron cargar las obras (${e.message})`;
  } finally {
    cargando.value = false;
  }
}

onMounted(cargar);

</script>

<template>
  <Hero />
  <Recomendador />
  <p v-if="cargando" class="text-center py-8 text-white">Cargando...</p>

  <div v-else-if="error" class="text-center py-8">
    <p class="text-red-600 mb-2">{{ error }}</p>
    <button @click="cargar" class="px-4 py-2 bg-blue-600 text-white rounded">
      Reintentar
    </button>
  </div>
  <div v-else class="container mx-auto px-2 py-2">
    <h2 class="font-script text-3xl text-center md:text-4xl font-bold text-white mt-6 mb-6">
      {{ titulo }}
    </h2>
    <section class="columns-2 gap-x-5 px-3 sm:px-5 py-5 md:columns-3 lg:columns-4 overflow-visible">
      <ExposicionActual v-for="obra in obras" :key="obra.id" :obra="obra" />
    </section>
  </div>
</template>
