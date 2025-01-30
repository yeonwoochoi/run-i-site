<template>
  <section class="relative w-screen flex justify-center items-center">
    <div class="my-12">
      <h6 class="font-bold">Potfolio</h6>
    </div>
    <div class="relative w-[350px] h-[570px] max-w-full flex justify-center mx-auto mt-20">
      <div v-for="(service, index) in services" :key="`service-card-${index}`" class="serviceCard">
        <div
          class="service-item-container transition-transform duration-300"
          :style="{ transform: `translateX(${100 * (index - currentIndex)}) scale(${currentIndex === index ? 1 : 0.9})` }"
        >
          <img :src="service.image" class="w-[334px] h-[300px] aspect-[334/300]" />
          <div class="p-2 px-4 box-border flex-1">
            <h3 class="font-bold">{{ service.title }}</h3>
            <div class="mt-1 mb-4 max-w-full flex flex-wrap">
              <div class="flex flex-row my-2">
                <div v-for="(tech, i) in service.tech" :key="`service-tech-${i}`" class="bg-black text-white text-xs py-1 px-2 mr-1 mb-1.5 rounded-xl flex items-center">
                  {{ tech }}
                </div>
              </div>
            </div>

            <span class="text-gray-500">{{ service.description }}</span>
          </div>
          <div class="mt-1 mb-4 max-w-full flex flex-wrap">
            <a :href="service.link" target="_blank" class="w-[334px] bg-black px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700">
              Go
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const services = [
  {
    title: 'Vada Partners',
    tech: ['Nuxt.js', 'Vuetify', 'SpringBoot'],
    description: '특허청과 연동된 기술 특허 가치 평가 기업의 웹사이트',
    link: '/',
    image: '/src/assets/images/hero-sections/about.jpg'
  },
  {
    title: 'Kunsan University AI Lab',
    tech: ['Nuxt.js', 'Vuetify', 'SpringBoot'],
    description: '군산대학교 AI 연구실 웹사이트',
    link: '/',
    image: '/src/assets/images/hero-sections/service.jpg'
  },
  {
    title: "Jopanda's 수학문제은행",
    tech: ['Unity'],
    description: '9만+ 개 중국 수학 문제를 랜덤 추출·커스텀할 수 있는 수학문제은행 앱',
    link: '/',
    image: '/src/assets/images/hero-sections/contact.jpg'
  }
]

const currentIndex = ref(0);
</script>

<style scoped>

</style>
