<script setup></script>
<template>
  <section class="relative h-[100vh]">
    <div class="pared-museo top-0 h-screen overflow-hidden pt-2">
      <div
        class="hero-frame-r absolute -right-10 top-[4%] w-44 rotate-3 aspect-[4/3] md:-right-8 md:top-[6%] md:w-64 lg:right-[6%] lg:top-[8%] lg:w-80 xl:w-96 bg-[url('/marco-largo.png')] bg-[length:100%_100%] p-3 shadow-2xl lg:p-5"
      >
        <img src="/monet-hero.jpg" alt="" class="h-full w-full object-cover" />
      </div>

      <div
        class="hero-frame-l absolute -left-12 top-[30%] w-40 -rotate-2 aspect-[3/4] md:-left-10 md:top-[22%] md:w-56 lg:left-[6%] lg:top-[14%] lg:w-64 xl:w-72 bg-[url('/marco-largo.png')] bg-[length:100%_100%] p-3 shadow-2xl lg:p-5"
      >
        <img src="/klimt-hero.jpg" alt="" class="h-full w-full object-cover" />
      </div>

      <div
        class="hero-frame-r absolute -right-14 top-[52%] w-52 aspect-[4/3] md:-right-10 md:top-[55%] md:w-72 lg:right-[3%] lg:top-[52%] lg:w-96 xl:w-[28rem] bg-[url('/marco-largo.png')] bg-[length:100%_100%] p-4 shadow-2xl lg:p-6"
      >
        <img src="/picasso-hero.jpg" alt="" class="h-full w-full object-cover" />
      </div>

      <div
        class="hero-frame-l absolute -left-6 bottom-[-4%] w-44 rotate-2 aspect-[3/4] md:-left-4 md:w-60 lg:left-[10%] lg:w-72 xl:w-80 bg-[url('/marco-largo.png')] bg-[length:100%_100%] p-3 shadow-2xl lg:p-5"
      >
        <img src="/hero-obra.jpg" alt="" class="h-full w-full object-cover" />
      </div>

      <div
        class="pointer-events-none absolute inset-0 flex items-center justify-center px-4 sm:px-6"
      >
        <div class="hero-title text-center">
          <h1
            class="mt-5 font-script text-5xl leading-none text-amber-50 drop-shadow-lg sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
          >
            Funky's
            <span class="block not-italic">Art</span>
            Gallery
          </h1>
        </div>
      </div>
    </div>
  </section>
</template>