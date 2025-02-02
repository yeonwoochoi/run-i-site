<template>
  <div class="flex flex-col justify-between min-h-screen">
    <TheHeader />
    <div class="flex-grow"> <!-- Main content area -->
      <TheView />
    </div>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import TheHeader from '@/layouts/TheHeader.vue'
import TheView from '@/layouts/TheView.vue'
import TheFooter from '@/layouts/TheFooter.vue'
</script>

<style scoped>
</style>
