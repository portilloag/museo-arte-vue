<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from  '@/components/Footer.vue';
</script>

<template>
 
  <main>
    <Navbar/>
    <RouterView />
    <Footer/>
  </main>
</template>