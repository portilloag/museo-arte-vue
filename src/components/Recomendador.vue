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
    class="fixed right-4 bottom-4 z-50 cursor-pointer rounded-full border border-white/60 bg-white/80 px-5 py-3 text-xs font-semibold  text-[#5a0c18] uppercase shadow-xl shadow-black/30 backdrop-blur-xl transition hover:bg-white/95 active:scale-95"
  >
    Recomendador
  </button>

  <div
    v-else
    class="fixed right-4 bottom-4 z-50 w-[calc(100vw-2rem)] max-w-80 rounded-2xl border border-white/60 bg-white/80 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl"
  >
    <div class="mb-1 flex items-start justify-between">
      <h2 class="font-script text-3xl text-[#5a0c18]">Recomendador</h2>
      <button
        @click="abierto = false"
        aria-label="Cerrar"
        class="cursor-pointer rounded-full px-2 text-xl leading-none text-stone-500 transition hover:bg-black/5 hover:text-[#5a0c18]"
      >
        &times;
      </button>
    </div>
    <p class="mb-4 text-sm text-stone-600">
      Contame qué te gusta y te recomiendo obras de la exposición.
    </p>

    <div ref="lista" class="mb-4 flex max-h-72 flex-col gap-2 overflow-y-auto pr-1">
      <div
        v-for="(m, i) in historial"
        :key="i"
        :class="
          m.role === 'user'
            ? 'self-end bg-[#5a0c18]/90 text-white'
            : 'self-start bg-white/70 text-stone-800 ring-1 ring-black/5'
        "
        class="max-w-[85%] rounded-xl p-3 text-sm leading-relaxed"
      >
        {{ m.content }}
      </div>

      <div
        v-if="cargando"
        class="self-start rounded-xl bg-white/70 p-3 text-sm italic text-stone-500 ring-1 ring-black/5"
      >
        Pensando...
      </div>
      <p v-if="error" class="text-xs text-red-600">{{ error }}</p>
    </div>

    <form @submit.prevent="onSubmit" class="flex gap-2">
      <input
        v-model="texto"
        type="text"
        placeholder="Escribí tu consulta..."
        :disabled="cargando"
        class="min-w-0 flex-1 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm text-stone-800 placeholder-stone-400 transition focus:border-[#5a0c18]/50 focus:ring-2 focus:ring-[#5a0c18]/20 focus:outline-none disabled:opacity-60"
      />
      <button
        type="submit"
        :disabled="cargando || !texto.trim()"
        class="cursor-pointer rounded-full bg-[#5a0c18] px-4 py-2 text-xs font-semibold  text-white uppercase transition hover:bg-[#6b2230] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Enviar
      </button>
    </form>
  </div>
</template>