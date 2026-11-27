<script setup>
</script>

<template>
  <section class="flex min-h-svh flex-col items-center justify-center px-6 pb-10 pt-24 text-center">
    <p class="font-serif text-xs uppercase tracking-[0.3em] text-[#c9a45c]">Error 404</p>

    <h1 class="mt-3 font-script text-6xl leading-none text-amber-50 drop-shadow-lg md:text-8xl">
      Obra no encontrada
    </h1>

    <p class="mt-5 max-w-sm font-serif text-sm italic text-amber-100/80">
      Parece que esta sala está vacía. La página que buscás no existe o fue movida a otra colección.
    </p>

    <div class="mt-8 flex flex-wrap justify-center gap-3">
      <RouterLink
        to="/"
        class="rounded-full border border-white/70 bg-white px-7 py-2.5 font-serif text-xs
               uppercase  text-black transition duration-300
               hover:bg-transparent hover:text-white"
      >
        Volver al inicio
      </RouterLink>
      <RouterLink
        to="/museo"
        class="rounded-full border border-white/70 px-7 py-2.5 font-serif text-xs
               uppercase  text-white transition duration-300
               hover:bg-white hover:text-black"
      >
        Ver la galería
      </RouterLink>
    </div>

   
    <img
      src="../../public/404.png"
      alt="Oreja"
      class="mt-10 h-auto w-48 object-contain drop-shadow-2xl md:w-64"
    />
  </section>


</template>