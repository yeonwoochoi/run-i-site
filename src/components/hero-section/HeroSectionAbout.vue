<template>
  <HeroSection :image-src='imageSrc' />
</template>

<script setup>
import HeroSection from './HeroSection.vue'

const imageSrc = '/src/assets/images/hero-sections/about.jpg';
</script>
