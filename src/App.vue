<script setup>
import Navbar from './components/Navbar.vue';
import HomeView from './views/HomeView.vue';
</script>

<template>
  <Navbar></Navbar>
  <main>
    <RouterView />
  </main>
</template>