<script setup>
import { ref, onMounted } from 'vue';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import Recomendador from './components/Recomendador.vue';
import { searchArtworks } from './services/artic';

const obras = ref([]);

onMounted(async () => {
  const res = await searchArtworks("", {}, 1, 50);
  obras.value = res.data;
});
</script>

<template>
  <Navbar/>
  <main>
    <Recomendador :obras="obras"/>
    <RouterView />
  </main>
  <Footer></Footer>
</template>