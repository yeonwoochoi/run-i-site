<template>
  <div class="w-full min-h-screen relative overflow-hidden m-0 p-0 font-['TT_Hoves_Pro_Trial']">
    <section ref='stickySection' class='relative w-screen h-screen flex lg:flex-row flex-col items-center py-[80px]'>
      <div class="flex-1 flex flex-col justify-center items-center gap-8 pt-0 lg:block hidden">
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

      <div class='flex flex-1 justify-center items-center gap-8 w-full max-w-[80%] max-h-[150px] pt-[100px] overflow-hidden lg:hidden block'>
        <div ref='serviceMobileTab' class='flex space-x-4 overflow-x-auto scroll-smooth scrollbar-hide'>
          <div
            v-for='(service, index) in services'
            :key='`service-scroll-${index}`'
            class='uppercase font-[`PP_NeueBit`] text-[25px] md:text-[30px] font-semibold leading-9 whitespace-nowrap'
            :class="currentIndex === index ? 'bg-black text-white' : 'bg-white text-black'"
          >
            {{ service }}
          </div>
        </div>
      </div>

      <div class="flex-1 flex flex-col justify-center items-center lg:px-0 px-10">
        <div class="relative lg:w-3/5 w-full h-[250px] overflow-hidden [clip-path:polygon(50%_0%,100%_0,100%_85%,90%_100%,50%_100%,0_100%,0_0)]">
          <div ref="serviceImg" class="w-full transform will-change-transform">
            <div v-for="(path, index) in serviceImages" :key="index" class="w-full h-[250px] flex justify-center items-center">
              <img :src="path" alt="" class="w-auto h-auto max-w-full max-h-full object-cotain" />
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
        <span ref="currentCount" class="font-['PP_NeueBit'] text-xl font-semibold w-3 flex justify-center items-center">1</span>
        <span class="relative -top-px w-5 h-0.5 bg-white"></span>
        <span class="font-['PP_NeueBit'] text-xl font-semibold w-3 flex justify-center items-center">{{ services.length }}</span>
      </div>
    </section>

    <section class="relative w-screen flex justify-center items-center">
      <div class="relative isolate bg-white w-full">
        <div class="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
          <div class="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-24">
            <div class="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
              <div class="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2">
                <svg class="absolute inset-0 size-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" aria-hidden="true">
                  <defs>
                    <pattern id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527" width="200" height="200" x="100%" y="-1" patternUnits="userSpaceOnUse">
                      <path d="M130 200V.5M.5 .5H200" fill="none" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" stroke-width="0" fill="white" />
                  <svg x="100%" y="-1" class="overflow-visible fill-gray-50">
                    <path d="M-470.5 0h201v201h-201Z" stroke-width="0" />
                  </svg>
                  <rect width="100%" height="100%" stroke-width="0" fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" />
                </svg>
              </div>
              <h2 class="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Get in touch</h2>
              <p class="mt-6 text-lg/8 text-gray-600">Have a project in mind? Let us know your requirements, and we’ll help bring your vision to life. Reach out to discuss your next big idea or outsourcing needs today!</p>
              <dl class="mt-10 space-y-4 text-base/7 text-gray-600">
                <div class="flex gap-x-4">
                  <dt class="flex-none">
                    <span class="sr-only">Address</span>
                    <BuildingOffice2Icon class="h-7 w-6 text-gray-400" aria-hidden="true" />
                  </dt>
                  <dd>전북특별자치도 전주시 완산구<br />서신천변2길 3-3</dd>
                </div>
                <div class="flex gap-x-4">
                  <dt class="flex-none">
                    <span class="sr-only">Telephone</span>
                    <PhoneIcon class="h-7 w-6 text-gray-400" aria-hidden="true" />
                  </dt>
                  <dd><a class="hover:text-gray-900" href="tel:+82 010-8560-3465">+82 010-8560-3465</a></dd>
                </div>
                <div class="flex gap-x-4">
                  <dt class="flex-none">
                    <span class="sr-only">Email</span>
                    <EnvelopeIcon class="h-7 w-6 text-gray-400" aria-hidden="true" />
                  </dt>
                  <dd><a class="hover:text-gray-900" href="mailto:runi.studio.kr@google.com">runi.studio.kr@google.com</a></dd>
                </div>
              </dl>
            </div>
          </div>
          <form action="#" method="POST" class="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-24">
            <div class="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
              <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <label for="first-name" class="block text-sm/6 font-semibold text-gray-900">First name</label>
                  <div class="mt-2.5">
                    <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-black" />
                  </div>
                </div>
                <div>
                  <label for="last-name" class="block text-sm/6 font-semibold text-gray-900">Last name</label>
                  <div class="mt-2.5">
                    <input type="text" name="last-name" id="last-name" autocomplete="family-name" class="block w-full bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-black" />
                  </div>
                </div>
                <div class="sm:col-span-2">
                  <label for="email" class="block text-sm/6 font-semibold text-gray-900">Email</label>
                  <div class="mt-2.5">
                    <input type="email" name="email" id="email" autocomplete="email" class="block w-full bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-black" />
                  </div>
                </div>
                <div class="sm:col-span-2">
                  <label for="phone-number" class="block text-sm/6 font-semibold text-gray-900">Phone number</label>
                  <div class="mt-2.5">
                    <input type="tel" name="phone-number" id="phone-number" autocomplete="tel" class="block w-full bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-black" />
                  </div>
                </div>
                <div class="sm:col-span-2">
                  <label for="message" class="block text-sm/6 font-semibold text-gray-900">Message</label>
                  <div class="mt-2.5">
                    <textarea name="message" id="message" rows="4" class="block w-full bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-black" />
                  </div>
                </div>
              </div>
              <div class="mt-8 flex justify-end">
                <button type="submit" class="bg-black px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700">Send message</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import SplitType from 'split-type'
import { BuildingOffice2Icon, EnvelopeIcon, PhoneIcon } from '@heroicons/vue/24/outline'

gsap.registerPlugin(ScrollTrigger)

const services = [
  "웹 개발",
  "모바일 앱 개발",
  "데스크탑 애플리케이션 개발",
  "인공지능 솔루션",
  "데이터베이스 설계 및 관리",
  "유니티 게임 개발"
]

const servicesContents = [
  ["최신 프론트엔드와 백엔드 기술을 활용하여 반응형 웹사이트와 웹 애플리케이션을 설계하고 개발합니다."],
  ["Flutter와 React Native를 기반으로 iOS와 Android 모두에서 원활하게 실행되는 크로스 플랫폼 애플리케이션을 제작합니다."],
  ["WinForm, WPF, Electron 등을 활용하여 다양한 플랫폼에서 안정적으로 실행되는 데스크탑 애플리케이션을 개발합니다."],
  ["LLM, 컴퓨터 비전 등 최신 AI 기술을 활용하여 맞춤형 솔루션을 제공하며, 데이터 기반 의사결정을 지원합니다."],
  ["MySQL, MongoDB 등 SQL 및 NoSQL 데이터베이스를 설계, 최적화, 유지보수하여 안정적인 데이터 운영을 보장합니다."],
  ["Unity 엔진을 활용하여 2D 및 3D 게임을 개발하고, 다양한 플랫폼에 최적화된 게임을 제공합니다."]
];

const serviceImages = [
  "/src/assets/images/icons/icon_web.gif",
  "/src/assets/images/icons/icon_mobile.gif",
  "/src/assets/images/icons/icon_desktop.gif",
  "/src/assets/images/icons/icon_AI.gif",
  "/src/assets/images/icons/icon_database.gif",
  "/src/assets/images/icons/icon_game.gif"
]

const stickySection = ref(null)
const indicator = ref(null)
const serviceImg = ref(null)
const serviceCopy = ref(null)
const currentCount = ref(null)
const currentIndex = ref(0)
const serviceMobileTab = ref(null);
const scrollPosition = ref(0);

// Input
const message = ref("");

let scrollTrigger = null;

const scrollMobileTabItemToCenter = (index) => {
  currentIndex.value = index;
  const container = serviceMobileTab.value;

  if (!container) {
    return;
  }

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
    max-width: 500px;
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
      gsap.set('.progress1', { scaleY: progress })
      gsap.set('.progress2', { scaleX: progress })

      const scrollPosition = Math.max(0, self.scroll() - window.innerHeight)
      const activeIndex = Math.floor(scrollPosition / window.innerHeight)

      if (activeIndex >= 0 && activeIndex < services.length && currentIndex.value !== activeIndex) {
        currentIndex.value = activeIndex
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
