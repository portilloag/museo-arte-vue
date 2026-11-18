<script setup>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <Navbar></Navbar>
  <main>
    <RouterView />
  </main>
  <Footer></Footer>
</template>