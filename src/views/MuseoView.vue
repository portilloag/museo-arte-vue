<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { getArtworks, searchArtworks } from "@/services/artic";
import { useRoute, useRouter } from "vue-router";
import Filtros from "@/components/Filtros.vue";
import Tarjeta from "@/components/Tarjeta.vue";
import Buscador from "@/components/Buscador.vue";

const route = useRoute();
const router = useRouter();

const obras = ref([]);
const current = ref(1);
const total = ref(1);
const loading = ref(false);

const paginas = computed(() => {
  const maxPaginas = 4;
  const mitad = Math.floor(maxPaginas / 2);

  let inicio = Math.max(1, current.value - mitad);
  let fin = Math.min(total.value, inicio + maxPaginas - 1);

  inicio = Math.max(1, fin - maxPaginas + 1);

  return Array.from(
    { length: fin - inicio + 1 },
    (_, i) => inicio + i
  );
});

async function cargarObras() {
  loading.value = true;

  try {
    const page = Number(route.query.page) || 1;
    const q = route.query.q || "";
    const estilo = route.query.estilo || "";

    let data;

    if (q || estilo) {
      data = await searchArtworks(
        q,
        { estilo },
        page,
        12
      );
    } else {
      data = await getArtworks(page, 12);
    }

    obras.value = data.data;
    current.value = data.pagination.current_page;
    total.value = data.pagination.total_pages;

  } catch (error) {
    console.error("Error al cargar las obras:", error);
    obras.value = [];
  } finally {
    loading.value = false;
  }
}

function cambiarPagina(pagina) {
  if (pagina < 1 || pagina > total.value) return;

  router.push({
    path: route.path,
    query: {
      ...route.query,
      page: pagina === 1 ? undefined : pagina
    }
  });
}

onMounted(() => {
  cargarObras();
});

watch(
  () => route.query,
  () => {
    cargarObras();
  }
);
</script>

<template>
  <h1 class="font-script my-6 text-center text-3xl font-bold text-white md:text-4xl">
    Galería del Museo
  </h1>

  <Buscador />
  <Filtros />

  <section v-if="loading" class="py-10 text-center text-white">
    Cargando obras...
  </section>

  <section v-else class="columns-2 gap-x-5 px-3 py-5 sm:px-5 md:columns-3 lg:columns-4">
    <Tarjeta v-for="obra in obras" :key="obra.id" :obra="obra" />
  </section>

  <div v-if="total > 1" class="my-6 flex flex-wrap justify-center gap-1">
    
    <button v-show="current > 1" @click="cambiarPagina(current - 1)"
      class="cursor-pointer rounded-md border border-amber-200/20 bg-stone-900/80 px-3 py-2 text-sm text-white transition hover:bg-stone-800">
      Prev
    </button>

    <button v-for="p in paginas" :key="p" @click="cambiarPagina(p)" :class="current === p
      ? 'border-amber-500 bg-amber-600 text-white'
      : 'border-amber-200/20 bg-stone-900/80 text-white hover:bg-stone-800'
      " class="min-w-9 cursor-pointer rounded-md border px-3 py-2 text-sm transition">
      {{ p }}
    </button>

    <button v-show="current < total" @click="cambiarPagina(current + 1)"
      class="cursor-pointer rounded-md border border-amber-200/20 bg-stone-900/80 px-3 py-2 text-sm text-white transition hover:bg-stone-800">
      Next
    </button>
  </div>
</template>
