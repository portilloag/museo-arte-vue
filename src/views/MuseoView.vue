<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { getArtworks, searchArtworks } from "@/services/artic";
import { useRoute, useRouter } from "vue-router";
import Filtros from "@/components/Filtros.vue";
import Tarjeta from "@/components/Tarjeta.vue";
import Buscador from "@/components/Buscador.vue";
import Loader from '@/components/Loader.vue'

const route = useRoute();
const router = useRouter();

const obras = ref([]);
const current = ref(1);
const total = ref(1);
const cargando = ref(false);

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
  cargando.value = true;

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
    cargando.value = false;
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

  <Loader v-if="cargando"/>

  <section v-else class="container mx-auto px-2 py-2 ">
    <div class="container mx-auto px-2 py-2 columns-2 gap-x-5 px-3 sm:px-5 py-5 md:columns-3 lg:columns-4 overflow-visible">
      <Tarjeta v-for="obra in obras" :key="obra.id" :obra="obra" />
    </div>
  </section>

  <div v-if="total > 1" class="my-10 flex flex-wrap items-center justify-center gap-2 font-serif">

  <button v-show="current > 1" @click="cambiarPagina(current - 1)"
    class="cursor-pointer rounded-full border border-[#c9a45c]/60 px-4 py-2 text-xs uppercase  text-amber-50 transition hover:bg-[#c9a45c]/20 active:scale-95">
    Prev
  </button>

  <button v-for="p in paginas" :key="p" @click="cambiarPagina(p)" :class="current === p
    ? 'border-[#c9a45c] bg-[#c9a45c] font-bold text-[#3a0810]'
    : 'border-[#c9a45c]/60 text-amber-50 hover:bg-[#c9a45c]/20'
    " class="flex h-9 min-w-9 cursor-pointer items-center justify-center rounded-full border px-3 text-sm transition active:scale-95">
    {{ p }}
  </button>

  <button v-show="current < total" @click="cambiarPagina(current + 1)"
    class="cursor-pointer rounded-full border border-[#c9a45c]/60 px-4 py-2 text-xs uppercase  text-amber-50 transition hover:bg-[#c9a45c]/20 active:scale-95">
    Siguiente
  </button>
</div>
</template>
