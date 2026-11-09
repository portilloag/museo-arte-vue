<script setup>
import { onMounted } from "vue"
import { useFavs } from "@/composable/useFavorites"
import Tarjeta from "@/components/Tarjeta.vue"

const { cargarFavs, favs } = useFavs()

onMounted( () => {
  cargarFavs()
} )

</script>
<template>
<h1>Listado de favoritos</h1>
<Tarjeta :obra="favs"></Tarjeta>
</template>
