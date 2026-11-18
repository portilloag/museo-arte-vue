<script setup>
import Navbar from '../components/Navbar.vue';

</script>
<template>
  <main class="mx-auto flex min-h-svh max-w-xl flex-col items-center px-5 pb-16 pt-24">

    <h1 class="font-script text-5xl text-amber-50 drop-shadow-lg">Contacto</h1>
    <p class="mt-2 text-center font-serif text-sm italic text-amber-100/90">
      ¿Te gustó mucho obra? Consultanos por su impresión.
    </p>

    <form
      class="mt-8 flex w-full flex-col gap-5 rounded-lg border border-white/25 bg-white/10 p-6
             shadow-xl backdrop-blur-md"
      @submit.prevent
    >
 
      <label class="flex flex-col gap-1">
        <span class="font-serif text-xs uppercase  text-amber-100">Nombre</span>
        <input
          type="text"
          placeholder="Tu nombre"
          class="rounded-md border border-white/25 bg-white/90 px-3 py-2 font-serif text-base
                 text-stone-800 outline-none placeholder:text-stone-500 focus:border-amber-200"
        />
      </label>

      
      <label class="flex flex-col gap-1">
        <span class="font-serif text-xs uppercase text-amber-100">Email</span>
        <input
          type="email"
          placeholder="tu@email.com"
          class="rounded-md border border-white/25 bg-white/90 px-3 py-2 font-serif text-base
                 text-stone-800 outline-none placeholder:text-stone-500 focus:border-amber-200"
        />
      </label>

     
      <label class="flex flex-col gap-1">
        <span class="font-serif text-xs uppercase  text-amber-100">Obra de interés</span>
        <input
          type="text"
          placeholder="Título de la obra"
          class="rounded-md border border-white/25 bg-white/90 px-3 py-2 font-serif text-base
                 text-stone-800 outline-none placeholder:text-stone-500 focus:border-amber-200"
        />
      </label>

     
      <div class="grid grid-cols-2 gap-3">
        <label class="flex flex-col gap-1">
          <span class="font-serif text-xs uppercase text-amber-100">Tamaño</span>
          <select
            class="rounded-md border border-white/25 bg-white/90 px-3 py-2 font-serif text-base
                   text-stone-800 outline-none focus:border-amber-200"
          >
            <option>A4</option>
            <option>A3</option>
            <option>A2</option>
          </select>
        </label>

        <label class="flex flex-col gap-1">
          <span class="font-serif text-xs uppercase  text-amber-100">Papel</span>
          <select
            class="rounded-md border border-white/25 bg-white/90 px-3 py-2 font-serif text-base
                   text-stone-800 outline-none focus:border-amber-200"
          >
            <option>Mate</option>
            <option>Brillante</option>
            <option>Algodón</option>
          </select>
        </label>
      </div>

     
      <label class="flex flex-col gap-1">
        <span class="font-serif text-xs uppercase  text-amber-100">Mensaje</span>
        <textarea
          rows="4"
          placeholder="Contanos qué necesitás..."
          class="resize-none rounded-md border border-white/25 bg-white/90 px-3 py-2 font-serif
                 text-base text-stone-800 outline-none placeholder:text-stone-500 focus:border-amber-200"
        ></textarea>
      </label>

     
      <button
        type="submit"
        class="mt-2 cursor-pointer rounded-full border border-white/70 bg-white px-8 py-2.5
               font-serif text-xs uppercase text-black transition duration-300
               hover:bg-transparent hover:text-white"
      >
        Enviar consulta
      </button>
    </form>

  </main>
</template>