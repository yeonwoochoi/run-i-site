<template>
  <div>
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" @click="closeModal"></div>

    <transition name="modal-scale">
      <div v-if="isOpen" class="fixed inset-0 flex justify-center items-center" @click="closeModal">
        <div
          class="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-[90%] sm:w-[500px]
                 max-h-[80vh] md:max-h-none overflow-y-auto md:overflow-visible"
          @click.stop
        >
          <h2 class="text-2xl font-semibold text-gray-800 mb-6">{{ portfolio.title }}</h2>
          <p class="text-gray-600 text-lg mb-4">{{ portfolio.description }}</p>

          <!-- 주요 기능 -->
          <div v-if="portfolio.features?.length" class="mb-6">
            <h3 class="font-semibold text-xl text-gray-800 mb-2">주요 기능</h3>
            <ul class="list-disc ml-5 text-gray-700">
              <li v-for="(feature, index) in portfolio.features" :key="`feature-${index}`" class="mb-2">{{ feature }}</li>
            </ul>
          </div>

          <!-- 성과 -->
          <div v-if="portfolio.results" class="mb-6">
            <h3 class="font-semibold text-xl text-gray-800 mb-2">성과</h3>
            <p class="text-gray-700">{{ portfolio.results }}</p>
          </div>

          <!-- 기술 스택 -->
          <div v-if="portfolio.techStack?.length" class="mb-6">
            <h3 class="font-semibold text-xl text-gray-800 mb-2">기술 스택</h3>
            <ul class="list-disc ml-5 text-gray-700">
              <li v-for="(tech, index) in portfolio.techStack" :key="`tech-${index}`" class="mb-2">{{ tech }}</li>
            </ul>
          </div>

          <!-- 링크 및 버튼 -->
          <a :href="portfolio.link" target="_blank" class="text-blue-600 underline hover:text-blue-800 transition duration-200">더 알아보기</a>
          <button @click="closeModal" class="mt-6 w-full py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-800 transition duration-200">닫기</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { watch } from 'vue';

const props = defineProps({
  portfolio: Object,
  isOpen: Boolean,
});

const emit = defineEmits(["close"]);

// 모달 닫기
const closeModal = () => {
  emit("close");
};

// isOpen 변경 시 스크롤 상태 관리
watch(
  () => props.isOpen,
  (newVal) => {
    document.body.style.overflow = newVal ? "hidden" : "auto";
  }
);
</script>

<style scoped>
/* 배경 흐림 효과 */
.fixed {
  backdrop-filter: blur(10px);
}

/* 모달 애니메이션 */
.modal-scale-enter-active, .modal-scale-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-scale-enter-from, .modal-scale-leave-to {
  transform: scale(0.8);
  opacity: 0;
}
</style>
