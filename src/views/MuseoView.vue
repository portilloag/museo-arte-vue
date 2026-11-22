<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { getArtworks } from "@/services/artic";
import { useRoute } from "vue-router";
import Tarjeta from "@/components/Tarjeta.vue";
import Buscador from "@/components/Buscador.vue";
import Recomendador from "@/components/Recomendador.vue";

const route = useRoute();
const obras = ref([]);
const current = ref(1);
const total = ref(1);

const fetchApi = (page = 1) => {
  getArtworks(page, 12)
    .then((data) => {
      obras.value = data.data;
      current.value = data.pagination.current_page;
      total.value = Math.min(data.pagination.total_pages, 83);
      window.scrollTo({ top: 0, behavior: "smooth" });
    })
    .catch((err) => console.log(err));
};

const paginas = computed(() =>
  [current.value, current.value + 1, current.value + 2].filter(
    (p) => p <= total.value,
  ),
);

onMounted(() => {
  fetchApi();
});

watch(() => route.query, fetchApi);
</script>

<template>
  <h1 class="font-script my-6 text-center text-3xl font-bold text-white md:text-4xl">
    Galería del Museo
  </h1>
  <Buscador/>
  <Recomendador :obras="obras" />

  <section class="columns-2 gap-x-5 px-3 py-5 sm:px-5 md:columns-3 lg:columns-4">
    <Tarjeta v-for="obra in obras" :key="obra.id" :obra="obra" />
  </section>

  <div class="my-6 flex justify-center space-x-1">
    <button v-show="current > 1" @click="fetchApi(current - 1)"
      class="cursor-pointer rounded-md border border-amber-200/20 bg-stone-900/80 px-3 py-2 text-center text-sm text-white transition-all hover:bg-stone-800">
      Prev
    </button>

    <button v-for="p in paginas" :key="p" @click="fetchApi(p)" :class="p === current
        ? 'border-amber-500 bg-amber-600 text-white'
        : 'border-amber-200/20 bg-stone-900/80 text-white hover:bg-stone-800'
      " class="min-w-9 cursor-pointer rounded-md border px-3 py-2 text-center text-sm transition-all">
      {{ p }}
    </button>

    <button v-show="current < total" @click="fetchApi(current + 1)"
      class="cursor-pointer rounded-md border border-amber-200/20 bg-stone-900/80 px-3 py-2 text-center text-sm text-white transition-all hover:bg-stone-800">
      Next
    </button>
  </div>
</template>