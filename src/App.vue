<script setup>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import Recomendador from './components/Recomendador.vue'
import { useAlerta } from '@/composable/useAlerta'

const { mostrarAlerta, mensajeAlerta, tipoAlerta } = useAlerta()

const estilosAlerta = {
  success: {
    bg: 'bg-green-100 border-green-300 text-green-800',
    icono: '✓',
    colorIcono: 'text-green-600'
  },
  warning: {
    bg: 'bg-yellow-100 border-yellow-300 text-yellow-800',
    icono: '⚠️',
    colorIcono: 'text-yellow-600'
  },
  error: {
    bg: 'bg-rose-100 border-rose-300 text-rose-800',
    icono: '✕',
    colorIcono: 'text-rose-600'
  }
}
</script>

<template>
  <Navbar />
  <main>
    <RouterView />
    <Recomendador :obras="obras"/>
    <Transition enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-4 scale-95" enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition-all duration-200 ease-in" leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-4 scale-95">
      <div v-if="mostrarAlerta" :class="[
        'fixed bottom-[8%] right-5 z-50 flex items-center gap-3 rounded-xl border px-4 py-3 font-serif text-sm shadow-2xl backdrop-blur-sm',
        estilosAlerta[tipoAlerta]?.bg
      ]">
        <span :class="['text-base font-bold', estilosAlerta[tipoAlerta]?.colorIcono]">
          {{ estilosAlerta[tipoAlerta]?.icono }}
        </span>
        <p>{{ mensajeAlerta }}</p>
      </div>
    </Transition>
  </main>
  <Footer></Footer>

</template>