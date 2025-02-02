<template>
  <HeroSection :image-src='imageSrc' />
</template>

<script setup>
import HeroSection from "@/components/hero-section/HeroSection.vue";

const imageSrc = '/src/assets/images/hero-sections/contact.jpg';
</script>
