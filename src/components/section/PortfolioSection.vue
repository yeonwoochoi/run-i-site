<template>
  <section ref='portfolioSection' class='relative w-screen flex flex-col justify-center items-center pt-20 pb-40 bg-[#f1f1f1]'>
    <div class='my-12'>
      <p class='font-bold text-5xl'>프로젝트</p>
    </div>
    <div class='relative w-full max-w-full overflow-x-clip overflow-y-visible mx-auto my-10 py-4'>
      <div
        class='flex transition-transform duration-500 ease-out gap-6 px-[calc(50%-175px)]'
        :style='{ transform: `translateX(-${currentIndex * 374}px)` }'
      >
        <PortfolioCard
          v-for='(portfolio, index) in portfolios'
          :key='`portfolio-card-${index}`'
          :portfolio='portfolio'
          :isActive='currentIndex === index'
          :index="index"
          :currentIndex="currentIndex"
          @click='moveToSlider(index)'
          @open-modal='openModal(portfolio)'
          class="transition-all duration-300 cursor-pointer"
          :style="{
            transform: `scale(${currentIndex === index ? 1 : 0.92})`,
            opacity: currentIndex === index ? 1 : 0.5,
          }"
        />
      </div>
    </div>
    <PortfolioModal :portfolio='selectedPortfolio' :isOpen='isModalOpen' @close='closeModal' class="z-[100]"/>
    <div class='w-full flex flex-row justify-center items-center gap-6 mt-8'>
      <button
        @click='moveToPrevSlide'
        :disabled='currentIndex === 0'
        class='rounded-full w-12 h-12 bg-black text-white flex justify-center items-center transition-opacity duration-200'
        :class="currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-800'"
      >
        <ArrowLeftIcon class="w-5 h-5" />
      </button>

      <!-- Pagination Dots -->
      <div class="flex gap-2">
        <button
          v-for="(_, index) in portfolios"
          :key="`dot-${index}`"
          @click="moveToSlider(index)"
          class="w-2.5 h-2.5 rounded-full transition-all duration-300"
          :class="currentIndex === index ? 'bg-black w-6' : 'bg-gray-400 hover:bg-gray-600'"
        />
      </div>

      <button
        @click='moveToNextSlide'
        :disabled='currentIndex === portfolios.length - 1'
        class='rounded-full w-12 h-12 bg-black text-white flex justify-center items-center transition-opacity duration-200'
        :class="currentIndex === portfolios.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-800'"
      >
        <ArrowRightIcon class="w-5 h-5" />
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

import jobPrepRoadImage from '@/assets/images/portfolios/job_prep_road.png';
import vadaImage from '@/assets/images/portfolios/vada.png';
import vadaAdminImage from '@/assets/images/portfolios/vada_admin.png';
import kunsanImage from '@/assets/images/portfolios/kunsan_ai.png';
import jopandaImage from '@/assets/images/portfolios/joPanda.png';
import yisoImage from '@/assets/images/portfolios/yiso.png';
import PortfolioCard from "@/components/card/PortfolioCard.vue";
import PortfolioModal from "@/components/modal/PortfolioModal.vue";

const portfolios = [
  {
    title: "Jopanda's 수학문제은행",
    techStack: ["Unity", "C#", "MVP Architecture", "UniRx"],
    description: '8만+ 개 중국 수학 문제를 랜덤 추출·커스텀할 수 있는 수학문제은행 앱',
    link: 'https://apps.apple.com/us/app/jopandas-math-item-pool/id1487631125',
    image: jopandaImage,
    features: [
      '8만+ 개 수학 문제 제공',
      '랜덤 문제 추출 및 맞춤형 문제 세트 생성',
      '사용자 풀이 히스토리 및 분석 기능',
    ],
    results: '학생 맞춤형 문제 풀이로 학습 효율성 향상',
  },
  {
    title: "이소의 모험 - Ep.1",
    techStack: ['Unity', 'C#', 'Addressable Assets'],
    description: '확장 가능한 3-Tier 아키텍처 기반의 심리스(Seamless) 2D 오픈월드 RPG',
    link: 'https://play.google.com/store/apps/details?id=com.runi.game.yiso.android&pcampaignid=web_share',
    image: yisoImage,
    features: [
      '경계 없는 심리스(Seamless) 월드 탐험',
      '에피소드 형식의 깊이 있는 메인 시나리오',
      '컴포넌트 기반의 확장 가능한 캐릭터 및 AI 시스템',
    ],
    results: '향후 대규모 콘텐츠 업데이트를 안정적으로 지원할 수 있는 견고한 3-Tier 클라이언트 아키텍처 기반을 구축',
  },
  {
    title: 'Vada Partners',
    techStack: ["Nuxt.js", "Vuetify", "SpringBoot"],
    description: '특허 검색 및 특허 기술 가치 평가 전문 기관. 키프리스와 연동된 평가 시스템 제공',
    link: 'https://vada-web.run-i.com',
    image: vadaImage,
    features: [
      '특허 검색 기능 (키프리스 연동)',
      '특허 기술 가치 평가 기능',
      '대학 및 공공기관을 위한 특허 기술 평가 시스템',
    ],
    results: 'B2B 특허 기술 가치 평가 제공 및 자산 실사 지원',
  },
  {
    title: 'Vada Partners Admin',
    techStack: ["Nuxt.js", "Vuetify", "SpringBoot"],
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
    title: "취준로드",
    techStack: ["Next.js", "TailwindCSS", "Vercel"],
    description: 'AI를 활용해 목표 직무·업종별 맞춤형 취업 준비 로드맵을 자동 생성하는 웹 서비스',
    link: 'https://jobprep-road.vercel.app/',
    image: jobPrepRoadImage,
    features: [
      '목표 업종·직무 기반 채용 요구사항 자동 분석',
      'GPT-4를 활용한 맞춤형 취업 준비 로드맵 생성',
      '사용자 맞춤 커리큘럼 관리 및 학습 진행 추적',
    ],
    results: '개인별 최적화된 준비 전략 제공으로 취업 준비 효율성 향상',
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
