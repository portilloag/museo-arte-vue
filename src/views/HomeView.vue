<script setup>

import { ref, onMounted } from 'vue'
import { getArtworks } from '@/services/artic'
import Tarjeta from '@/components/Tarjeta.vue'

const obras = ref([])
const cargando = ref(true)
const error = ref(null)

async function cargar() {
  cargando.value = true
  error.value = null
  try {
    const res = await getArtworks()
    obras.value = res.data
  } catch (e) {
    console.error('Fallo al cargar obras:', e)
    error.value = `No se pudieron cargar las obras (${e.message})`
  } finally {
    cargando.value = false
  }
}

onMounted(cargar)
</script>

<template>
<p v-if="cargando">Cargando...</p>

  <div v-else-if="error">
    <p>{{ error }}</p>
    <button @click="cargar">Reintentar</button>
  </div>

  <div v-else class="grid grid-cols-2 gap-4 md:grid-cols-4">
    <Tarjeta v-for="obra in obras" :key="obra.id" :obra="obra" />
  </div>
</template>