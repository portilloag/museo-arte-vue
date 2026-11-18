<script setup></script>
<template>
  <section class="relative h-[100vh]">
    <div class="pared-museo top-0 h-screen overflow-hidden pt-2">

      <!-- Cuadros, que tendrian que ser con la api idealmente -->
      <div class="hero-frame-r absolute -right-10 top-[4%] w-44 rotate-3 aspect-[4/3]
                  bg-[url('/marco-largo.png')] bg-[length:100%_100%] p-3 shadow-2xl">
        <img src="/hero-obra.jpg" alt="" class="h-full w-full object-cover" />
      </div>

      <div class="hero-frame-l absolute -left-12 top-[30%] w-40 -rotate-2 aspect-[3/4]
                  bg-[url('/marco-largo.png')] bg-[length:100%_100%] p-3 shadow-2xl">
        <img src="/hero-obra.jpg" alt="" class="h-full w-full object-cover" />
      </div>

      <div class="hero-frame-r absolute -right-14 top-[52%] w-52 aspect-[4/3]
                  bg-[url('/marco-largo.png')] bg-[length:100%_100%] p-4 shadow-2xl">
        <img src="/hero-obra.jpg" alt="" class="h-full w-full object-cover" />
      </div>

      <div class="hero-frame-l absolute -left-6 bottom-[-4%] w-44 rotate-2 aspect-[3/4]
                  bg-[url('/marco-largo.png')] bg-[length:100%_100%] p-3 shadow-2xl">
        <img src="/hero-obra.jpg" alt="" class="h-full w-full object-cover" />
      </div>

      <!-- Titulo-->
      <div class="pointer-events-none absolute inset-0 flex items-center justify-center px-4 sm:px-6">
        <div class="hero-title text-center">
          <h1 class=" mt-5 font-script text-5xl sm:text-6xl leading-none text-amber-50 drop-shadow-lg">
            Funky's
            <span class="block text-5xl sm:text-6xl not-italic">Art</span>
            Gallery
          </h1>
        </div>
      </div>

    

    </div>
  </section>
</template>

