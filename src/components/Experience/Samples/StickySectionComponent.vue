<template>
  <div class="w-full min-h-screen relative overflow-hidden m-0 p-0 font-['TT_Hoves_Pro_Trial']">
    <section ref="stickySection" class="relative w-screen h-screen flex lg:flex-row flex-col py-[80px]">
      <div class="flex-1 flex flex-col justify-center items-center gap-8 lg:pt-0 pt-1/4">
        <div class="relative flex flex-col items-center">
          <div ref="indicator" class="absolute top-0 left-0 w-full h-[36px] md:h-[38px] bg-black -z-10"></div>
          <div v-for="(service, index) in services" :key="index"
               class="w-max h-[38px] transition-colors duration-300"
               :class="{ 'active': currentIndex === index }">
            <p class="uppercase font-['PP_NeueBit'] text-[25px] md:text-[30px] font-semibold leading-9"
               :class="currentIndex === index ? 'text-white' : 'text-gray-300'">
              {{ service }}
            </p>
          </div>
        </div>
      </div>
      <div class="flex-1 flex flex-col justify-center items-center px-10 min-h-0">
        <div class="relative lg:w-3/5 w-full h-[250px] overflow-hidden [clip-path:polygon(50%_0%,100%_0,100%_85%,90%_100%,50%_100%,0_100%,0_0)]">
          <div ref="serviceImg" class="w-full h-[2000px] transform will-change-transform">
            <div v-for="(path, index) in serviceImages" :key="index" class="w-full h-[250px] flex justify-center items-center">
              <img :src="path" alt="" class="w-auto h-auto max-w-full max-h-full object-cotain" />
            </div>
          </div>
        </div>
        <div class="lg:w-3/5 w-full mt-5">
          <p ref="serviceCopy" class="text-base md:text-lg font-normal leading-7"></p>
        </div>
      </div>

      <div class="absolute top-[calc(50%-40px)] left-1/2 -translate-x-1/2 -translate-y-1/2 lg:w-[2.5px] lg:h-[60%] sm:h-[550px] h-[350px] w-[2.5px] bg-gray-200 lg:rotate-0 -rotate-90">
        <div class="progress absolute top-0 left-0 w-full h-full bg-black origin-top scale-y-0 will-change-transform"></div>
      </div>

      <div class="absolute lg:bottom-[10%] lg:top-auto top-[10%] left-1/2 -translate-x-1/2 w-[60px] py-1 px-0.5 flex justify-between items-center bg-black text-white">
        <span ref="currentCount" class="font-['PP_NeueBit'] text-xl font-semibold w-3 flex justify-center items-center">1</span>
        <span class="relative -top-px w-5 h-0.5 bg-white"></span>
        <span class="font-['PP_NeueBit'] text-xl font-semibold w-3 flex justify-center items-center">{{ services.length }}</span>
      </div>
    </section>

    <section class="relative w-screen h-screen flex justify-center items-center bg-pink-500">
      <p class="uppercase font-['PP_NeueBit'] text-3xl font-semibold leading-[18px] py-1 px-0.5 bg-black text-white">
        Your next section goes here
      </p>
    </section>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

const services = [
  "웹 개발",
  "모바일 앱 개발",
  "데스크탑 애플리케이션 개발",
  "인공지능 솔루션",
  "데이터베이스 설계 및 관리"
]

const servicesContents = [
  ["최신 프론트엔드와 백엔드 기술을 활용하여 반응형 웹사이트와 웹 애플리케이션을 설계하고 개발합니다."],
  ["Flutter와 React Native를 기반으로 iOS와 Android 모두에서 원활하게 실행되는 크로스 플랫폼 애플리케이션을 제작합니다."],
  ["WinForm, WPF, Electron 등을 활용하여 다양한 플랫폼에서 안정적으로 실행되는 데스크탑 애플리케이션을 개발합니다."],
  ["LLM, 컴퓨터 비전 등 최신 AI 기술을 활용하여 맞춤형 솔루션을 제공하며, 데이터 기반 의사결정을 지원합니다."],
  ["MySQL, MongoDB 등 SQL 및 NoSQL 데이터베이스를 설계, 최적화, 유지보수하여 안정적인 데이터 운영을 보장합니다."],
];

const serviceImages = [
  "/src/assets/images/icons/icon_web.gif",
  "/src/assets/images/icons/icon_mobile.gif",
  "/src/assets/images/icons/icon_desktop.gif",
  "/src/assets/images/icons/icon_AI.gif",
  "/src/assets/images/icons/icon_database.gif"
]

const stickySection = ref(null)
const indicator = ref(null)
const serviceImg = ref(null)
const serviceCopy = ref(null)
const currentCount = ref(null)
const currentIndex = ref(0)
let scrollTrigger = null;

onMounted(() => {
  const lenis = new Lenis()
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)

  const stickyHeight = window.innerHeight * services.length
  const serviceHeight = 38
  const imgHeight = 250

  serviceCopy.value.textContent = servicesContents[0][0]
  let currentSplitText = new SplitType(serviceCopy.value, { types: 'lines' })

  // Measure service widths
  const measureContainer = document.createElement('div')
  measureContainer.style.cssText = `
    position: absolute;
    visibility: hidden;
    height: auto;
    width: auto;
    white-space: nowrap;
    font-family: "PP NeueBit";
    font-size: 60px;
    font-weight: 600;
    text-transform: uppercase;
  `
  document.body.appendChild(measureContainer)

  const serviceWidths = services.map((service) => {
    measureContainer.textContent = service
    return measureContainer.offsetWidth + services.length
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
          serviceCopy.value.textContent = servicesContents[index][0]
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
    trigger: stickySection.value,
    start: 'top top',
    end: `${stickyHeight}px`,
    pin: true,
    onUpdate: async (self) => {
      const progress = self.progress
      gsap.set('.progress', { scaleY: progress })

      const scrollPosition = Math.max(0, self.scroll() - window.innerHeight)
      const activeIndex = Math.floor(scrollPosition / window.innerHeight)

      if (activeIndex >= 0 && activeIndex < services.length && currentIndex.value !== activeIndex) {
        currentIndex.value = activeIndex

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
})

onUnmounted(() => {
  // 페이지 떠날 때 ScrollTrigger 상태 초기화
  scrollTrigger.kill();
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
</style>
