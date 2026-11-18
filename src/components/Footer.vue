<script setup>
const anio = new Date().getFullYear()
</script>

<template>
  <footer class="mt-16 bg-black/50 px-6 pb-6 pt-10 text-amber-50">
    <div class="mx-auto max-w-5xl">

   
      <div class="flex items-center justify-between border-b border-[#c9a45c]/30 pb-6">
        <div>
          <p class="font-script text-4xl leading-none">Funky's</p>
          <p class="mt-1 font-serif text-[10px] uppercase tracking-[0.3em] text-[#c9a45c]">Art Gallery</p>
        </div>

        <div class="flex items-center gap-3">
          <a href="#" aria-label="Instagram"
             class="flex h-8 w-8 items-center justify-center rounded-full border border-[#c9a45c]/60 transition hover:bg-[#c9a45c]/20">
           
            <span class="text-xs">IG</span>
          </a>
          <a href="#" aria-label="Facebook"
             class="flex h-8 w-8 items-center justify-center rounded-full border border-[#c9a45c]/60 transition hover:bg-[#c9a45c]/20">
            <span class="text-xs">FB</span>
          </a>
        </div>
      </div>


      <div class="grid grid-cols-2 gap-x-6 gap-y-8 pt-8 md:grid-cols-3">


        <div class="col-span-2 md:col-span-1">
          <h3 class="font-serif text-sm font-bold uppercase tracking-widest text-[#c9a45c]">Contacto</h3>
          <div class="mt-4 space-y-3 font-serif text-sm text-amber-100/80">
            <p>
              <span class="block font-bold text-amber-50">Dirección:</span>
              Calle Ejemplo 123, Buenos Aires
            </p>
            <p>
              <span class="block font-bold text-amber-50">Teléfono:</span>
              +54 11 1234 5678
            </p>
            <p>
              <span class="block font-bold text-amber-50">Email:</span>
              hola@funkys.com
            </p>
          </div>
        </div>

   
        <div>
          <h3 class="font-serif text-sm font-bold uppercase tracking-widest text-[#c9a45c]">Menú</h3>
          <ul class="mt-4 space-y-2 font-serif text-sm text-amber-100/80">
            <li><RouterLink to="/" class="transition hover:text-[#e6c982]">Inicio</RouterLink></li>
            <li><RouterLink to="/museo" class="transition hover:text-[#e6c982]">Galería</RouterLink></li>
            <li><RouterLink to="/#buscador" class="transition hover:text-[#e6c982]">Buscador</RouterLink></li>
          </ul>
        </div>

      
        <div>
          <h3 class="font-serif text-sm font-bold uppercase tracking-widest text-[#c9a45c]">Tu espacio</h3>
          <ul class="mt-4 space-y-2 font-serif text-sm text-amber-100/80">
            <li><RouterLink to="/favorites" class="transition hover:text-[#e6c982]">Favoritos</RouterLink></li>
            <li><RouterLink to="/contact" class="transition hover:text-[#e6c982]">Contacto</RouterLink></li>
          </ul>
        </div>

      </div>

      <p class="mt-10 border-t border-[#c9a45c]/30 pt-5 text-center font-serif text-[11px] uppercase tracking-widest text-amber-100/50">
        © {{ anio }} Funky's Art Gallery
      </p>
    </div>
  </footer>
</template>