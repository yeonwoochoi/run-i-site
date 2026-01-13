<template>
  <Teleport to="body">
    <transition name="modal-fade">
      <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="closeModal" />

        <!-- Modal Content -->
        <transition name="modal-scale">
          <div
            v-if="isOpen"
            class="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
            @click.stop
          >
            <!-- Close Button -->
            <button
              @click="closeModal"
              class="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
            >
              <XMarkIcon class="w-5 h-5 text-white" />
            </button>

            <!-- Image -->
            <div class="relative h-[200px] sm:h-[280px] bg-gray-100">
              <img
                :src="portfolio?.image"
                :alt="portfolio?.title"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            <!-- Content -->
            <div class="p-6 sm:p-8 overflow-y-auto max-h-[calc(90vh-280px)]">
              <!-- Title -->
              <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                {{ portfolio?.title }}
              </h2>

              <!-- Tech Stack Tags -->
              <div v-if="portfolio?.techStack?.length" class="flex flex-wrap gap-2 mb-5">
                <span
                  v-for="(tech, index) in portfolio.techStack"
                  :key="`tech-${index}`"
                  class="text-sm py-1.5 px-3 rounded-full bg-gray-900 text-white"
                >
                  {{ tech }}
                </span>
              </div>

              <!-- Description -->
              <p class="text-gray-600 text-base leading-relaxed mb-6">
                {{ portfolio?.description }}
              </p>

              <!-- Features -->
              <div v-if="portfolio?.features?.length" class="mb-6">
                <h3 class="font-semibold text-lg text-gray-900 mb-3 flex items-center gap-2">
                  <span class="w-1 h-5 bg-black rounded-full"></span>
                  주요 기능
                </h3>
                <ul class="space-y-2">
                  <li
                    v-for="(feature, index) in portfolio.features"
                    :key="`feature-${index}`"
                    class="flex items-start gap-3 text-gray-700"
                  >
                    <CheckIcon class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{{ feature }}</span>
                  </li>
                </ul>
              </div>

              <!-- Results -->
              <div v-if="portfolio?.results" class="mb-6">
                <h3 class="font-semibold text-lg text-gray-900 mb-3 flex items-center gap-2">
                  <span class="w-1 h-5 bg-black rounded-full"></span>
                  성과
                </h3>
                <p class="text-gray-700 bg-gray-50 p-4 rounded-xl">
                  {{ portfolio.results }}
                </p>
              </div>

              <!-- Action Button -->
              <a
                :href="portfolio?.link"
                target="_blank"
                class="block w-full py-4 bg-black text-white text-center font-semibold rounded-xl hover:bg-gray-800 transition-colors"
              >
                프로젝트 바로가기
              </a>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { XMarkIcon, CheckIcon } from '@heroicons/vue/24/solid'

defineProps({
  portfolio: Object,
  isOpen: Boolean,
});

const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};
</script>

<style scoped>
/* Fade backdrop */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* Scale modal content */
.modal-scale-enter-active,
.modal-scale-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-scale-enter-from,
.modal-scale-leave-to {
  transform: scale(0.95) translateY(10px);
  opacity: 0;
}
</style>
