<template>
  <section ref='serviceSection' class='relative w-screen h-screen flex lg:flex-row flex-col items-center py-[80px]'>
    <div class="flex-1 flex flex-col justify-center items-center gap-8 pt-0 lg:block hidden">
      <div class="relative flex flex-col items-center">
        <div ref="indicator" class="absolute top-0 left-0 w-full h-[36px] md:h-[38px] bg-black -z-10"></div>
        <div v-for="(title, index) in serviceTitles" :key='`service-scroll-desktop-${index}`'
             class="w-max h-[38px] transition-colors duration-300"
             :class="{ 'active': currentIndex === index }">
          <p class="uppercase text-[25px] md:text-[30px] font-semibold leading-9"
             :class="currentIndex === index ? 'text-white' : 'text-gray-300'">
            {{ title }}
          </p>
        </div>
      </div>
    </div>

    <div class='flex flex-1 justify-center items-center gap-8 w-full max-w-[80%] max-h-[150px] pt-[100px] overflow-hidden lg:hidden block'>
      <div ref='serviceMobileTab' class='flex space-x-4 overflow-x-auto scroll-smooth scrollbar-hide'>
        <div
          v-for='(title, index) in serviceTitles'
          :key='`service-scroll-mobile-${index}`'
          class='uppercase text-[25px] md:text-[30px] font-semibold leading-9 whitespace-nowrap'
          :class="currentIndex === index ? 'bg-black text-white' : 'bg-white text-black'"
        >
          {{ title }}
        </div>
      </div>
    </div>

    <div class="flex-1 flex flex-col justify-center items-center lg:px-0 px-10">
      <div class="relative lg:w-3/5 w-full h-[250px] overflow-hidden [clip-path:polygon(50%_0%,100%_0,100%_85%,90%_100%,50%_100%,0_100%,0_0)]">
        <div ref="serviceImg" class="w-full transform will-change-transform">
          <div v-for="(path, index) in serviceImages" :key="index" class="w-full h-[250px] flex justify-center items-center">
            <img :src="path" alt="" class="w-auto h-auto max-w-full max-h-full object-contain" />
          </div>
        </div>
      </div>
      <div class="lg:w-3/5 w-full mt-5">
        <p ref="serviceCopy" class="text-base md:text-lg font-normal leading-7"></p>
      </div>
    </div>

    <div class="absolute top-[calc(50%-40px)] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2.5px] h-[60%] bg-gray-200 lg:block hidden">
      <div class="progress1 absolute top-0 left-0 w-full h-full bg-black origin-top scale-y-0 will-change-transform"></div>
    </div>

    <div class="absolute top-[calc(81px)] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[2.5px] bg-gray-200 lg:hidden block">
      <div class="progress2 absolute top-0 left-0 w-full h-full bg-black origin-left scale-x-0 will-change-transform"></div>
    </div>

    <div class="absolute lg:bottom-[10%] lg:top-auto top-[90%] left-1/2 -translate-x-1/2 w-[60px] py-1 px-0.5 flex justify-between items-center bg-black text-white">
      <span ref="currentCount" class="text-xl font-semibold w-3 flex justify-center items-center">1</span>
      <span class="relative -top-px w-5 h-0.5 bg-white"></span>
      <span class="text-xl font-semibold w-3 flex justify-center items-center">{{ serviceTitles.length }}</span>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref, inject } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

const serviceTitles = [
  "웹 개발",
  "모바일 앱 개발",
  "데스크탑 애플리케이션 개발",
  "인공지능 솔루션",
  "데이터베이스 설계 및 관리",
  "유니티 2D 앱/게임 개발"
]

const serviceContents = [
  ["최신 프론트엔드와 백엔드 기술을 활용하여 반응형 웹사이트와 웹 애플리케이션을 설계하고 개발합니다."],
  ["Flutter와 React Native를 기반으로 iOS와 Android 모두에서 원활하게 실행되는 크로스 플랫폼 애플리케이션을 제작합니다."],
  ["WinForm, WPF, Electron 등을 활용하여 다양한 플랫폼에서 안정적으로 실행되는 데스크탑 애플리케이션을 개발합니다."],
  ["LLM, 컴퓨터 비전 등 최신 AI 기술을 활용하여 맞춤형 솔루션을 제공하며, 데이터 기반 의사결정을 지원합니다."],
  ["MySQL, MongoDB 등 SQL 및 NoSQL 데이터베이스를 설계, 최적화, 유지보수하여 안정적인 데이터 운영을 보장합니다."],
  ["Unity 엔진을 활용하여 앱 및 2D 게임을 개발하고, 다양한 플랫폼에 최적화된 게임을 제공합니다."]
];

import iconWeb from '@/assets/images/icons/icon_web.gif';
import iconMobile from '@/assets/images/icons/icon_mobile.gif';
import iconDesktop from '@/assets/images/icons/icon_desktop.gif';
import iconAI from '@/assets/images/icons/icon_AI.gif';
import iconDatabase from '@/assets/images/icons/icon_database.gif';
import iconGame from '@/assets/images/icons/icon_game.gif';

const serviceImages = [iconWeb, iconMobile, iconDesktop, iconAI, iconDatabase, iconGame];

const emitter = inject('emitter')
const serviceSection = ref(null)
const indicator = ref(null)
const serviceImg = ref(null)
const serviceCopy = ref(null)
const currentCount = ref(null)
const currentIndex = ref(0)
const serviceMobileTab = ref(null);
const scrollPosition = ref(0);

let scrollTrigger = null;

const scrollMobileTabItemToCenter = (index) => {
  const container = serviceMobileTab.value;

  if (!container) {
    return;
  }

  currentIndex.value = index;

  const tab = container.children[index];
  const containerWidth = container.offsetWidth;
  const tabWidth = tab.offsetWidth;
  const scrollLeft = tab.offsetLeft - containerWidth / 2 + tabWidth / 2;

  container.scrollTo({ left: scrollLeft, behavior: "smooth" })
};

// 스크롤 위치를 추적하는 함수
const trackScrollPosition = () => {
  scrollPosition.value = window.scrollY;
};

onMounted(() => {
  emitter.emit('service-section', serviceSection.value);

  const lenis = new Lenis()
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)

  const stickyHeight = window.innerHeight * serviceTitles.length
  const serviceHeight = 38
  const imgHeight = 250

  serviceCopy.value.textContent = serviceContents[0][0]
  let currentSplitText = new SplitType(serviceCopy.value, { types: 'lines' })

  // Measure service widths
  const measureContainer = document.createElement('div')
  measureContainer.style.cssText = `
    position: absolute;
    visibility: hidden;
    height: auto;
    width: auto;
    max-width: 500px;
    white-space: nowrap;
    font-size: 60px;
    font-weight: 600;
    text-transform: uppercase;
  `
  document.body.appendChild(measureContainer)

  const serviceWidths = serviceTitles.map((service) => {
    measureContainer.textContent = service
    return measureContainer.offsetWidth + serviceTitles.length
  })

  document.body.removeChild(measureContainer)

  gsap.set(indicator.value, {
    width: serviceWidths[0],
    xPercent: -50,
    left: '50%'
  })

  const animateTextChange = (index) => {
    return new Promise((resolve) => {
      gsap.to(currentSplitText.lines, {
        opacity: 0,
        y: -20,
        duration: 0.25,
        stagger: 0.025,
        ease: 'power3.inOut',
        onComplete: () => {
          currentSplitText.revert()
          serviceCopy.value.textContent = serviceContents[index][0]
          currentSplitText = new SplitType(serviceCopy.value, { types: 'lines' })

          gsap.set(currentSplitText.lines, {
            opacity: 0,
            y: 20
          })

          gsap.to(currentSplitText.lines, {
            opacity: 1,
            y: 0,
            duration: 0.25,
            stagger: 0.025,
            ease: 'power3.out',
            onComplete: resolve
          })
        }
      })
    })
  }

  scrollTrigger = ScrollTrigger.create({
    trigger: serviceSection.value,
    start: 'top top',
    end: `${stickyHeight}px`,
    pin: true,
    onUpdate: async (self) => {
      const progress = self.progress
      gsap.set('.progress1', { scaleY: progress })
      gsap.set('.progress2', { scaleX: progress })

      const scrollPosition = Math.max(0, self.scroll() - window.innerHeight)
      const activeIndex = Math.floor(scrollPosition / window.innerHeight)

      if (activeIndex >= 0 && activeIndex < serviceTitles.length && currentIndex.value !== activeIndex) {
        scrollMobileTabItemToCenter(activeIndex);

        await Promise.all([
          gsap.to(indicator.value, {
            y: activeIndex * serviceHeight,
            width: serviceWidths[activeIndex],
            duration: 0.3,
            ease: 'power3.inOut',
            overwrite: true
          }),

          gsap.to(serviceImg.value, {
            y: -(activeIndex * imgHeight),
            duration: 0.3,
            ease: 'power3.inOut',
            overwrite: true
          }),

          gsap.to(currentCount.value, {
            innerText: activeIndex + 1,
            snap: { innerText: 1 },
            duration: 0.3,
            ease: 'power3.out'
          }),

          animateTextChange(activeIndex)
        ])
      }
    }
  })

  scrollMobileTabItemToCenter(0)
  window.addEventListener('scroll', trackScrollPosition);
})

onUnmounted(() => {
  // 페이지 떠날 때 ScrollTrigger 상태 초기화
  scrollTrigger.kill();
  window.removeEventListener('scroll', trackScrollPosition);
});
</script>

<style>
.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}

.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}

.lenis.lenis-stopped {
  overflow: hidden;
}

.lenis.lenis-smooth iframe {
  pointer-events: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
