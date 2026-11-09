<script setup>
import { ref } from 'vue'
const emit = defineEmits(['actualizarFiltros'])
const busqueda = ref('')
const deptoSeleccionado = ref('')

const manejarCambio = () => {
  emit('actualizarFiltros', {
    q:busqueda.value,
    depto: deptoSeleccionado.value
  })
}
</script>

<template>
  <section id="buscador" class="scroll-mt-20 px-5 py-16">
    <div class="mx-auto flex max-w-3xl flex-col items-center gap-6">
      <!-- buscador -->
      <form
        class="relative w-full max-w-md rotate-[-1deg] bg-[#f6ecd9] px-7 py-10 text-center shadow-2xl outline outline-1 -outline-offset-8 outline-[#b8924a]/60"
        @submit.prevent
      >
        <p class="font-script text-4xl text-[#5a1226]">¿Qué obra buscás?</p>
        <p class="mt-1 font-serif text-xs italic text-stone-500">
          Cultivate de cultura
        </p>

        <input
          type="text"
          placeholder="una obra o un artista"
          class="mt-6 w-full border-b border-[#5a1226]/40 bg-transparent pb-1 text-center font-serif text-base italic text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-[#5a1226]"
        />

        <div class="mt-5 grid grid-cols-3 gap-3">
          <select
            class="border-b border-[#5a1226]/40 bg-transparent pb-1 font-serif text-base italic text-stone-700 outline-none focus:border-[#5a1226]"
          >
            <option>Artista</option>
          </select>
          <select
            class="border-b border-[#5a1226]/40 bg-transparent pb-1 font-serif text-base italic text-stone-700 outline-none focus:border-[#5a1226]"
          >
            <option>Año/s</option>
          </select>
          <select
            class="border-b border-[#5a1226]/40 bg-transparent pb-1 font-serif text-base italic text-stone-700 outline-none focus:border-[#5a1226]"
          >
            <option>Categoría</option>
          </select>
        </div>

        <button
          type="button"
          class="mx-auto mt-8 flex h-16 w-16 items-center justify-center rounded-full bg-[#7a1a36] font-script text-lg text-amber-100 shadow-lg ring-2 ring-[#5a1226]/60 transition duration-300 hover:scale-110 hover:rotate-6"
        >
          Buscar
        </button>
      </form>
      <!-- categorias -->
      <p class="font-serif text-lg italic text-amber-50 drop-shadow">
        O inspirate:
      </p>

      <div class="grid w-full grid-cols-2 gap-3 md:grid-cols-4">
        <a
          href="#"
          class="flex flex-col items-center gap-2 rounded-md border border-white/25 bg-white/10 px-3 py-4 text-center shadow-lg backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white/20"
        >
          <img src="" alt="" class="h-8 w-8 object-contain" />
          <span
            class="font-serif text-xs font-bold uppercase tracking-widest text-amber-50"
            >Cat 1</span
          >
        </a>
        <a
          href="#"
          class="flex flex-col items-center gap-2 rounded-md border border-white/25 bg-white/10 px-3 py-4 text-center shadow-lg backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white/20"
        >
          <img src="" alt="" class="h-8 w-8 object-contain" />
          <span
            class="font-serif text-xs font-bold uppercase tracking-widest text-amber-50"
            >Cat 2</span
          >
        </a>
        <a
          href="#"
          class="flex flex-col items-center gap-2 rounded-md border border-white/25 bg-white/10 px-3 py-4 text-center shadow-lg backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white/20"
        >
          <img src="" alt="" class="h-8 w-8 object-contain" />
          <span
            class="font-serif text-xs font-bold uppercase tracking-widest text-amber-50"
            >Cat 3</span
          >
        </a>
        <a
          href="#"
          class="flex flex-col items-center gap-2 rounded-md border border-white/25 bg-white/10 px-3 py-4 text-center shadow-lg backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white/20"
        >
          <img src="" alt="" class="h-8 w-8 object-contain" />
          <span
            class="font-serif text-xs font-bold uppercase tracking-widest text-amber-50"
            >Cat 4</span
          >
        </a>
      </div>
    </div>
  </section>
</template>
