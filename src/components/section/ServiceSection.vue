<template>
  <section ref='serviceSection' class='relative w-screen flex flex-col justify-center items-center pt-20 pb-40 bg-[#f1f1f1]'>
    <div class='my-12'>
      <p class='font-bold text-5xl'>포트폴리오</p>
    </div>
    <div class='relative w-full h-[570px] max-w-full flex flex-row justify-center overflow-hidden mx-auto mt-20'>
      <div
        class='flex transition-transform duration-500 w-[350px] service-container gap-4'
        :style='{ transform: `translateX(-${currentIndex * 105}%)` }'
      >
        <div
          v-for='(service, index) in services'
          :key='`service-card-${index}`'
          class='w-[350px] flex-shrink-0'
          :class='`${currentIndex !== index ? "inactive-slider-content" : ""}`'
          :style="{
            transform: `scale(${currentIndex === index ? 1 : 0.9})`,
            transition: 'transform 0.3s ease',
            opacity: currentIndex === index ? 1 : 0.7,
            filter: currentIndex === index ? 'none' : 'grayscale(0.5)'
          }"
          @click='moveToSlider(index)'
        >
          <div class='flex flex-col h-full justify-center'>
            <img :src='service.image' class='w-full h-[300px] aspect-[334/300]' />
            <div class='pt-2 px-1 box-border flex-1 justify-start'>
              <h3 class='font-bold'>{{ service.title }}</h3>
              <div class='mt-1 mb-4 max-w-full flex flex-wrap'>
                <div class='flex flex-row my-2'>
                  <div v-for='(tech, i) in service.tech' :key='`service-tech-${i}`'
                       class='bg-black text-white text-xs py-1 px-2 mr-1 mb-1.5 rounded-xl flex items-center'>
                    {{ tech }}
                  </div>
                </div>
              </div>

              <span
                class='text-gray-500 max-h-20 overflow-hidden text-ellipsis block text-md line-clamp-3'>{{ service.description }}</span>
            </div>
            <div class='mt-1 mb-4 max-w-full flex flex-wrap'>
              <a
                :href='service.link'
                target='_blank'
                class='w-[334px] bg-black px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700'
                :class="currentIndex !== index ? 'pointer-events-none opacity-50' : ''"
              >
              Go
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class='w-full flex flex-row justify-center items-center gap-12 pt-12'>
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
const serviceSection = ref(null)
onMounted(() => {
  emitter.emit('service-section', serviceSection.value);
})

import aboutImage from '@/assets/images/hero-sections/about.jpg';
import serviceImage from '@/assets/images/hero-sections/service.jpg';
import contactImage from '@/assets/images/hero-sections/contact.jpg';

const services = [
  {
    title: 'Vada Partners',
    tech: ['Nuxt.js', 'Vuetify', 'SpringBoot'],
    description: '특허청과 연동된 기술 특허 가치 평가 기업의 웹사이트',
    link: '/',
    image: aboutImage
  },
  {
    title: 'Kunsan University AI Lab',
    tech: ['Nuxt.js', 'Vuetify', 'SpringBoot'],
    description: '군산대학교 AI 연구실 웹사이트',
    link: '/',
    image: serviceImage
  },
  {
    title: "Jopanda's 수학문제은행",
    tech: ['Unity'],
    description: '9만+ 개 중국 수학 문제를 랜덤 추출·커스텀할 수 있는 수학문제은행 앱',
    link: '/',
    image: contactImage
  }
];


const currentIndex = ref(0)

const moveToSlider = (index) => {
  currentIndex.value = index
}

const moveToPrevSlide = () => {
  if (currentIndex.value === 0) return
  currentIndex.value--
}

const moveToNextSlide = () => {
  if (currentIndex.value + 1 >= services.length) return
  currentIndex.value++
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 최대 3줄까지 표시 */
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
