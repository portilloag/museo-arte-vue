<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const categorias = [
  { label: "Impresionismo", valor: "Impressionism" },
  { label: "Renacimiento", valor: "Renaissance" },
  { label: "Modernismo", valor: "Modernism" },
  { label: "Japonés", valor: "Japanese (culture or style)" },
];

const estiloActivo = computed(() => route.query.estilo ?? "");

function elegirEstilo(valor) {
  const query = {};
  if (estiloActivo.value !== valor) query.estilo = valor;

  router.push({ path: route.path, query });
}
</script>

<template>
  <section class="px-5 pb-16">
    <div class="mx-auto flex max-w-3xl flex-col items-center gap-6">

      <p class="font-serif text-lg italic text-amber-50 drop-shadow">
        O inspirate:
      </p>

      <div class="grid w-full grid-cols-2 gap-3 md:grid-cols-4">
        <button
          v-for="c in categorias"
          :key="c.valor"
          type="button"
          @click="elegirEstilo(c.valor)"
          :class="
            estiloActivo === c.valor
              ? 'border-amber-300 bg-amber-100/30'
              : 'border-white/25 bg-white/10 hover:bg-white/20'
          "
          class="flex cursor-pointer flex-col items-center gap-2 rounded-md border px-3 py-4 text-center shadow-lg backdrop-blur-md transition duration-300 hover:-translate-y-1"
        >
          <span class="font-serif text-xs font-bold uppercase tracking-widest text-amber-50">
            {{ c.label }}
          </span>
        </button>
      </div>

    </div>
  </section>
</template>