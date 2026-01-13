<template>
  <div
    class="w-[350px] flex-shrink-0 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
    :class="{ 'ring-2 ring-black': isActive }"
    @click="handleCardClick"
  >
    <div class="flex flex-col h-full">
      <!-- Image Container with Hover Overlay -->
      <div class="relative group cursor-pointer overflow-hidden rounded-t-2xl" @click.stop="handleImageClick">
        <img
          :src="portfolio.image"
          :alt="portfolio.title"
          class="w-full h-[240px] object-cover object-center"
        />
        <!-- Hover Overlay -->
        <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
          <MagnifyingGlassIcon class="w-10 h-10 text-white" />
          <span class="text-white font-medium">자세히 보기</span>
        </div>
      </div>

      <!-- Content Area -->
      <div class="p-5 flex flex-col flex-1">
        <!-- Title -->
        <h3 class="font-bold text-lg mb-3 line-clamp-1">{{ portfolio.title }}</h3>

        <!-- Tech Stack Tags -->
        <div class="flex flex-wrap gap-1.5 mb-4">
          <span
            v-for="(tech, i) in portfolio.techStack"
            :key="`portfolio-techStack-${i}`"
            class="text-xs py-1 px-2.5 rounded-full border border-gray-300 text-gray-600 bg-gray-50"
          >
            {{ tech }}
          </span>
        </div>

        <!-- Description -->
        <p class="text-gray-600 text-sm leading-relaxed line-clamp-2 flex-1">
          {{ portfolio.description }}
        </p>

        <!-- Go Button -->
        <a
          :href="portfolio.link"
          target="_blank"
          class="mt-4 block w-full bg-black text-white text-center py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors duration-200"
          :class="currentIndex !== index ? 'pointer-events-none opacity-40' : ''"
          @click.stop
        >
          바로가기
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
  portfolio: Object,
  isActive: Boolean,
  index: Number,
  currentIndex: Number
});
const emit = defineEmits(['click', 'open-modal']);

const handleCardClick = () => {
  // 비활성 카드 클릭 시 해당 카드로 이동
  if (!props.isActive) {
    emit('click');
  }
};

const handleImageClick = () => {
  if (props.isActive) {
    // 활성 카드 이미지 클릭 시 모달 열기
    emit('open-modal', props.portfolio);
  } else {
    // 비활성 카드 이미지 클릭 시 해당 카드로 이동
    emit('click');
  }
};
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
