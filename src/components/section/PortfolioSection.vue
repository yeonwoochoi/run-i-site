<template>
  <section ref='portfolioSection' class='relative w-screen flex flex-col justify-center items-center pt-20 pb-40 bg-[#f1f1f1]'>
    <div class='my-12'>
      <p class='font-bold text-5xl'>포트폴리오</p>
    </div>
    <div class='relative w-full h-[540px] max-w-full flex flex-row justify-center overflow-visible mx-auto my-20'>
      <div
        class='flex transition-transform duration-500 w-[350px] portfolio-container gap-4'
        :style='{ transform: `translateX(-${currentIndex * 105}%)` }'
      >
        <PortfolioCard
          v-for='(portfolio, index) in portfolios'
          :key='`portfolio-card-${index}`'
          :portfolio='portfolio'
          :isActive='currentIndex === index'
          @click='moveToSlider(index)'
          @open-modal='openModal(portfolio)'
          :class='`${currentIndex !== index ? "inactive-slider-content" : ""}`'
          :style="{
            transform: `scale(${currentIndex === index ? 1 : 0.9})`,
            transition: 'transform 0.3s ease',
            opacity: currentIndex === index ? 1 : 0.7,
            filter: currentIndex === index ? 'none' : 'grayscale(0.5)',
          }"
        />
      </div>
    </div>
    <PortfolioModal :portfolio='selectedPortfolio' :isOpen='isModalOpen' @close='closeModal' class="z-[100]"/>
    <div class='w-full flex flex-row justify-center items-center gap-12'>
      <button @click='moveToPrevSlide' class='rounded-[50%] w-[54px] h-[54px] bg-black text-white flex justify-center items-center'>
        <ArrowLeftIcon class="w-6 h-6" style="stroke-width: 4;" />
      </button>

      <button @click='moveToNextSlide' class='rounded-[50%] w-[54px] h-[54px] bg-black text-white flex justify-center items-center'>
        <ArrowRightIcon class="w-6 h-6" style="stroke-width: 4;" />
      </button>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, inject } from 'vue'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/vue/24/solid'

const emitter = inject('emitter')
const portfolioSection = ref(null)
onMounted(() => {
  emitter.emit('portfolios-section', portfolioSection.value);
})

import vadaImage from '@/assets/images/portfolios/vada.png';
import vadaAdminImage from '@/assets/images/portfolios/vada_admin.png';
import kunsanImage from '@/assets/images/portfolios/kunsan_ai.png';
import jopandaImage from '@/assets/images/portfolios/joPanda.png';
import PortfolioCard from "@/components/card/PortfolioCard.vue";
import PortfolioModal from "@/components/modal/PortfolioModal.vue";

const portfolios = [
  {
    title: 'Vada Partners',
    techStack: ['Nuxt.js', 'Vuetify', 'SpringBoot'],
    description: '특허 검색 및 특허 기술 가치 평가 전문 기관. 키프리스와 연동된 평가 시스템 제공',
    link: 'https://vada-web.run-i.com',
    image: vadaImage,
    features: [
      '특허 검색 기능 (키프리스 연동)',
      '특허 기술 가치 평가 기능',
      '대학 및 공공기관을 위한 특허 기술 평가 시스템',
    ],
    results: '실시간 특허 기술 가치 평가 제공 및 자산 실사 지원',
  },
  {
    title: 'Vada Partners Admin',
    techStack: ['Nuxt.js', 'Vuetify', 'SpringBoot'],
    description: '특허청과 연동된 기술 특허 가치 평가 기업의 관리자 웹사이트. 특허기술 가치 평가 시스템을 관리하는 플랫폼',
    link: 'https://vada-admin.run-i.com/',
    image: vadaAdminImage,
    features: [
      '회원 관리 시스템',
      '결제 서비스 관리',
      '고객 서비스 관리',
      '데이터 관리 및 업데이트',
    ],
    results: '특허 기술 가치 평가 관리 및 분석 자동화',
  },
  {
    title: 'Kunsan University AI Lab',
    techStack: ['Nuxt.js', 'Vuetify', 'SpringBoot'], // tech -> techStack로 수정
    description: '군산대학교 AI 연구실 웹사이트',
    link: 'https://ailab.run-i.com/',
    image: kunsanImage,
    features: [
      '연구실 프로젝트 관리',
      'AI 연구 데이터 시각화',
      '연구자 간 협업 시스템',
    ],
    results: '연구 데이터의 효율적 관리 및 분석 기능 제공',
  },
  {
    title: "Jopanda's 수학문제은행",
    techStack: ['Unity'], // tech -> techStack로 수정
    description: '9만+ 개 중국 수학 문제를 랜덤 추출·커스텀할 수 있는 수학문제은행 앱',
    link: 'https://apps.apple.com/us/app/jopandas-math-item-pool/id1487631125',
    image: jopandaImage,
    features: [
      '9만+ 개 수학 문제 제공',
      '랜덤 문제 추출 및 맞춤형 문제 세트 생성',
      '사용자 풀이 히스토리 및 분석 기능',
    ],
    results: '학생 맞춤형 문제 풀이로 학습 효율성 향상',
  },
];


const currentIndex = ref(0)
const isModalOpen = ref(false);
const selectedPortfolio = ref(null);

const moveToSlider = (index) => { currentIndex.value = index; };
const moveToPrevSlide = () => { if (currentIndex.value > 0) currentIndex.value--; };
const moveToNextSlide = () => { if (currentIndex.value + 1 < portfolios.length) currentIndex.value++; };

const openModal = (portfolio) => {
  selectedPortfolio.value = portfolio;
  isModalOpen.value = true;
};
const closeModal = () => {
  isModalOpen.value = false;
  selectedPortfolio.value = null;
};
</script>

<style scoped>
</style>
