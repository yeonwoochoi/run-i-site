<template>
  <div class="w-full h-screen relative overflow-hidden m-0 p-0">
    <canvas id="experience"></canvas>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import Experience from "./Experience.js";

onMounted(() => {
  const experience = new Experience(document.getElementById("experience"))
})
</script>

<style scoped>

</style>
