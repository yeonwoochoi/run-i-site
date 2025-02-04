<template>
  <LoadingScreen v-show='loading' />
  <div class='flex flex-col justify-between min-h-screen'>
    <TheHeader />
    <div class='flex-grow'> <!-- Main content area -->
      <TheView />
    </div>
    <TheFooter />
  </div>
  <FadeTransition ref="fadeTransitionRef" />
</template>

<script setup>
import TheHeader from '@/layouts/TheHeader.vue';
import TheView from '@/layouts/TheView.vue';
import TheFooter from '@/layouts/TheFooter.vue';
import LoadingScreen from './components/common/LoadingScreen.vue';
import FadeTransition from '@/components/common/FadeTransition.vue';
import { ref, onMounted, provide, nextTick } from 'vue'

const loading = ref(true);
const fadeTransitionRef = ref(null);

onMounted(() => {
  nextTick(() => {
    fadeTransitionRef.value?.startTransition(() => {
      loading.value = false;
    });
  })
});

provide('useTransition', (callback) => {
  fadeTransitionRef.value?.startTransition(callback);
});
</script>
