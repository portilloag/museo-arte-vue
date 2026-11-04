<script setup>
import { ref, onMounted } from 'vue'
import { getFavs, btnFavs } from '@/utils/favorites.js'
import Tarjeta from '@/components/Tarjeta.vue'
import { btnFavs } from '../favs'

const favorites = ref([])

onMounted(() => {
  favorites.value = getFavs()
})

const quitarFav = (artwork) => {
  favorites.value = btnFavs(artwork)
</script>
<template>
  <Tarjeta/>
</template>