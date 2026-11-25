<script setup>
import { signInWithPopup, signOut } from "firebase/auth"
import { auth, googleProvider, gitProvider } from "../services/firebase.js"
import { Instagram, Mail, Github } from 'lucide-vue-next'
const anio = new Date().getFullYear()

async function loginGoogle(){
  const result = await signInWithPopup(auth, googleProvider)
  console.log(result)
}

async function loginGithub(){
  const result = await signInWithPopup(auth, gitProvider)
  console.log(result)
}
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
  <a href="https://www.instagram.com/mcachicago/" aria-label="Instagram"
     class="flex h-9 w-9 items-center justify-center rounded-full border border-pink-400/60 text-pink-400 transition hover:bg-pink-400/20 active:scale-95">
    <Instagram class="h-4 w-4" />
  </a>

  <a href="mailto:museo.info@funkystudio.com" aria-label="Email"
     class="flex h-9 w-9 items-center justify-center rounded-full border border-green-400/60 text-green-400 transition hover:bg-green-400/20 active:scale-95">
    <Mail class="h-4 w-4" />
  </a>

  <button @click="loginGithub" aria-label="Ingresar con GitHub"
     class="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-sky-400/60 text-sky-400 transition hover:bg-sky-400/20 active:scale-95">
    <Github class="h-4 w-4" />
  </button>

  <button @click="loginGoogle" aria-label="Ingresar con Google"
     class="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-yellow-400/60 text-yellow-400 transition hover:bg-yellow-400/20 active:scale-95">
    <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
    </svg>
  </button>
</div>
      </div>


      <div class="grid grid-cols-2 gap-x-6 gap-y-8 pt-8 md:grid-cols-3">


        <div class="col-span-2 md:col-span-1">
          <h3 class="font-serif text-sm font-bold uppercase tracking-widest text-[#c9a45c]">Contacto</h3>
          <div class="mt-4 space-y-3 font-serif text-sm text-amber-100/80">
            <p>
              <span class="block font-bold text-amber-50">Dirección:</span>
              Av Caseros 435, Buenos Aires
            </p>
            <p>
              <span class="block font-bold text-amber-50">Teléfono:</span>
              +54 11 1234 5678
            </p>
            <p>
              <span class="block font-bold text-amber-50">Email:</span>
              museo.info@funkystudio.com
            </p>
          </div>
        </div>

   
        <div>
          <h3 class="font-serif text-sm font-bold uppercase tracking-widest text-[#c9a45c]">Menú</h3>
          <ul class="mt-4 space-y-2 font-serif text-sm text-amber-100/80">
            <li><RouterLink to="/" class="transition hover:text-[#e6c982]">Inicio</RouterLink></li>
            <li><RouterLink to="/museo" class="transition hover:text-[#e6c982]">Galería</RouterLink></li>
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