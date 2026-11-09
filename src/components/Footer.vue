<template>
  <footer class="mt-12 border-t border-amber-100/20 px-5 py-10 text-amber-50">
    <div class="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">

      <div>
        <p class="font-script text-4xl leading-none">Funky's</p>
        <p class="mt-1 font-serif text-xs italic text-amber-100/70">
          Cultivate de cultura
        </p>
      </div>

      <nav class="flex flex-wrap justify-center gap-x-6 gap-y-2 font-serif text-sm">
        <a href="#" class="transition hover:text-amber-300">Inicio</a>
        <a href="#buscador" class="transition hover:text-amber-300">Buscador</a>
        <a href="#" class="transition hover:text-amber-300">Galería</a>
        <a href="#" class="transition hover:text-amber-300">Contacto</a>
      </nav>

    </div>

    <p class="mt-8 text-center font-serif text-[11px] uppercase tracking-widest text-amber-100/50">
      © {{ anio }} Funky's Art Gallery
    </p>
  </footer>
</template>

<script setup>
const anio = new Date().getFullYear()
</script>
