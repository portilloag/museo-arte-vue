<script setup>
import { ref, nextTick, watch } from "vue";
import { useRecomendador } from "@/composable/useRecomendador";

const props = defineProps({
  obras: { type: Array, default: () => [] },
});

const { historial, cargando, error, enviar } = useRecomendador(
  () => props.obras,
);

const obras = ref([]);
const abierto = ref(false);
const texto = ref("");
const lista = ref(null);

async function onSubmit() {
  const mensaje = texto.value;
  texto.value = "";
  await enviar(mensaje);
}

watch(
  [() => historial.value.length, cargando],
  async () => {
    await nextTick();
    if (lista.value) lista.value.scrollTop = lista.value.scrollHeight;
  },
);
</script>

<template>
  <button
    v-if="!abierto"
    @click="abierto = true"
    class="fixed right-4 bottom-4 z-50 cursor-pointer rounded-full bg-amber-600 px-5 py-3 text-sm font-semibold text-white shadow-xl ring-1 ring-amber-200/30 transition hover:bg-amber-500 active:scale-95"
  >
    Recomendador
  </button>

  <div
    v-else
    class="fixed right-4 bottom-4 z-50 w-[calc(100vw-2rem)] max-w-80 rounded-2xl bg-stone-900/95 p-6 shadow-2xl ring-1 ring-amber-200/20 backdrop-blur"
  >
    <div class="mb-1 flex items-start justify-between">
      <h2 class="font-script text-2xl font-bold text-white">Recomendador</h2>
      <button
        @click="abierto = false"
        aria-label="Cerrar"
        class="cursor-pointer rounded-md px-2 text-xl leading-none text-amber-100/50 transition hover:bg-white/10 hover:text-white"
      >
        &times;
      </button>
    </div>
    <p class="mb-4 text-sm text-amber-100/60">
      Contame qué te gusta y te recomiendo obras de la exposición.
    </p>

    <div ref="lista" class="mb-4 flex max-h-72 flex-col gap-2 overflow-y-auto">
      <div
        v-for="(m, i) in historial"
        :key="i"
        :class="
          m.role === 'user'
            ? 'self-end bg-white/10 text-white'
            : 'self-start bg-amber-100/10 text-amber-100 ring-1 ring-amber-200/20'
        "
        class="max-w-[85%] rounded-xl p-3 text-sm leading-relaxed"
      >
        {{ m.content }}
      </div>

      <div
        v-if="cargando"
        class="self-start rounded-xl bg-amber-100/10 p-3 text-sm italic text-amber-100/60"
      >
        Pensando...
      </div>
      <p v-if="error" class="text-xs text-red-400">{{ error }}</p>
    </div>

    <form @submit.prevent="onSubmit" class="flex gap-2">
      <input
        v-model="texto"
        type="text"
        placeholder="Escribí tu consulta..."
        :disabled="cargando"
        class="min-w-0 flex-1 rounded-lg border border-amber-200/20 bg-black/40 px-3 py-2 text-sm text-white placeholder-white/40 transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 focus:outline-none disabled:opacity-60"
      />
      <button
        type="submit"
        :disabled="cargando || !texto.trim()"
        class="cursor-pointer rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Enviar
      </button>
    </form>
  </div>
</template>