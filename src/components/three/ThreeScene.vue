<template>
  <div>
    <ThreeCanvas :x="rotation.x" :y="rotation.y" @mousemove="handleMouseMove" />
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import ThreeCanvas from './ThreeCanvas.vue'

let rotation = reactive({ x: 0, y: 0 });

const handleMouseMove = (event) => {
  rotation.x = (event.movementX / 500);
  rotation.y = (event.movementY / 500);
};
</script>
