<template>
  <div
    class="w-[350px] flex-shrink-0"
    @click="$emit('click')"
    :class="{'shadow-lg': isActive, 'portfolio-card-container': isActive}"
  >
    <div class='flex flex-col h-full justify-center'>
      <img :src='portfolio.image' class='w-full h-[300px] aspect-[334/300]' />
      <div class='pt-4 px-4 box-border flex-1 justify-start'>
        <div class="flex">
          <h3 class='font-bold'>{{ portfolio.title }}</h3>
          <button @click='$emit("open-modal", portfolio)' class='ml-2 bg-gray-700 text-white px-2 py-1 rounded'>
            <MagnifyingGlassIcon class="w-3 h-3 text-white" />
          </button>
        </div>
        <div class='mt-1 mb-4 max-w-full flex flex-wrap'>
          <div class='flex flex-row my-2'>
            <div v-for='(tech, i) in portfolio.techStack' :key='`portfolio-techStack-${i}`'
                 class='bg-black text-white text-xs py-1 px-2 mr-1 mb-1.5 rounded-xl flex items-center'>
              {{ tech }}
            </div>
          </div>
        </div>
        <span class='text-gray-500 max-h-20 overflow-hidden text-ellipsis block text-md line-clamp-3'>{{ portfolio.description }}</span>
      </div>
      <div class='mt-1 w-full flex flex-wrap'>
        <a
          :href='portfolio.link'
          target='_blank'
          class='w-full bg-black px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700'
          :class="currentIndex !== index ? 'pointer-events-none opacity-50' : ''"
        >
          Go
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'

defineProps({ portfolio: Object, isActive: Boolean });
defineEmits(['click', 'open-modal']);
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 최대 3줄까지 표시 */
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.portfolio-card-container {
  overflow: visible;
}
</style>
