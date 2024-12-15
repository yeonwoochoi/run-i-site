<template>
  <div class='relative isolate overflow-hidden pt-14'>
    <img :src="imageSrc" alt='hero' class='absolute inset-0 -z-10 size-full object-cover' :style='{transform: `translateY(${offset}px)`}'/>
    <div class='absolute inset-x-0 -top-20 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-60' aria-hidden='true'>
      <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
    </div>
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl py-20 sm:py-32 lg:py-40">
        <div class='text-center'>
          <div v-if='!$slots.title'>
            <h3 class='text-balance text-4xl font-semibold tracking-wide text-white sm:text-7xl'>{{title}}</h3>
          </div>
          <div v-else>
            <slot name='title' />
          </div>
        </div>
      </div>
    </div>
    <slot name='footer' />
  </div>
</template>

<script setup>
import { useWindowScroll } from '@vueuse/core'
import { computed } from 'vue'
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  imageSrc: String
});

// Define Title
const router = useRouter();
const title = router.currentRoute.value.name;

// Define Offset for Parallax
const { y } = useWindowScroll();
const offset = computed(() => y.value * 0.5);
</script>
