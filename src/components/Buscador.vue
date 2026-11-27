<script setup>
import { ref, watch, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const texto = ref(route.query.q ?? "");

let timer;

function buscar() {
  clearTimeout(timer);

  const nuevo = texto.value.trim();

  if (nuevo === (route.query.q ?? "")) return;

  const query = {};
  if (nuevo) query.q = nuevo;

  router.push({ path: route.path, query });
}

watch(texto, () => {
  clearTimeout(timer);
  timer = setTimeout(buscar, 500);
});

watch(
  () => route.query.q,
  (q) => {
    texto.value = q ?? "";
  }
);

onBeforeUnmount(() => {
  clearTimeout(timer);
});
</script>

<template>
  <section id="buscador" class="scroll-mt-20 px-5 pt-16 pb-8">
    <div class="mx-auto flex max-w-3xl flex-col items-center">

      <form
        class="relative w-full max-w-md rotate-[-1deg] bg-[#f6ecd9] px-7 py-10 text-center shadow-2xl outline outline-1 -outline-offset-8 outline-[#b8924a]/60"
        @submit.prevent="buscar"
      >
        <p class="font-script text-4xl text-[#5a1226]">
          ¿Qué obra buscás?
        </p>

        <p class="mt-1 font-serif text-xs italic text-stone-500">
          Cultivate de cultura
        </p>

        <input
          v-model="texto"
          name="texto"
          type="text"
          placeholder="una obra o un artista"
          class="mt-6 w-full border-b border-[#5a1226]/40 bg-transparent pb-1 text-center font-serif text-base italic text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-[#5a1226]"
        />

        <button
          type="submit"
          class="mx-auto mt-8 flex h-16 w-16 items-center justify-center rounded-full bg-[#7a1a36] font-script text-lg text-amber-100 shadow-lg ring-2 ring-[#5a1226]/60 transition duration-300 hover:scale-110 hover:rotate-6"
        >
          Buscar
        </button>
      </form>

    </div>
  </section>
</template>