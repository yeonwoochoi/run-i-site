<template>
  <div class="w-full min-h-screen relative overflow-hidden m-0 p-0 font-['TT_Hoves_Pro_Trial']">
    <section class="relative w-screen h-screen flex justify-center items-end pb-16 bg-gray-300 bg-[url('./src/assets/images/sample1/hero.jpg')] bg-center bg-cover text-white">
      <p>Scroll Down</p>
    </section>

    <section ref="stickySection" class="relative w-screen h-screen flex md:flex-row flex-col">
      <div class="flex-1 flex flex-col justify-center items-center gap-8 md:pt-0 pt-1/4">
        <div class="relative flex flex-col items-center">
          <div ref="indicator" class="absolute top-0 left-0 w-full h-[38px] bg-black -z-10"></div>
          <div v-for="(service, index) in services" :key="index"
               class="w-max h-[38px] transition-colors duration-300"
               :class="{ 'active': currentIndex === index }">
            <p class="uppercase font-['PP_NeueBit'] text-[40px] font-semibold leading-9"
               :class="currentIndex === index ? 'text-white' : 'text-gray-300'">
              {{ service }}
            </p>
          </div>
        </div>
      </div>

      <div class="flex-1 flex md:flex-col flex-row justify-center items-center gap-8">
        <div class="relative md:w-3/5 w-1/4 h-[250px] overflow-hidden [clip-path:polygon(50%_0%,100%_0,100%_85%,90%_100%,50%_100%,0_100%,0_0)]">
          <div ref="serviceImg" class="w-full h-[2000px] transform will-change-transform">
            <div v-for="(path, index) in serviceImages" :key="index" class="w-full h-[250px]">
              <img :src="path" alt="" class="w-full h-full object-cover" />
            </div>
          </div>
        </div>
        <div class="md:w-3/5 w-full">
          <p ref="serviceCopy" class="text-lg font-normal leading-7"></p>
        </div>
      </div>

      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[2.5px] md:h-[60%] w-1/2 h-[2.5px] bg-gray-200 md:rotate-0 -rotate-90">
        <div class="progress absolute top-0 left-0 w-full h-full bg-black origin-top scale-y-0 will-change-transform"></div>
      </div>

      <div class="absolute md:bottom-[10%] md:top-auto top-[5%] left-1/2 -translate-x-1/2 w-[60px] py-1 px-0.5 flex justify-between items-center bg-black text-white">
        <span ref="currentCount" class="font-['PP_NeueBit'] text-xl font-semibold w-3 flex justify-center items-center">1</span>
        <span class="relative -top-px w-5 h-0.5 bg-pink-500"></span>
        <span class="font-['PP_NeueBit'] text-xl font-semibold w-3 flex justify-center items-center">8</span>
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
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

const services = [
  'Deliverables',
  'Brand & Event Design',
  'Video & Fotographie',
  'Motion Design',
  '3D Graphics',
  'Print & Drukwork',
  'Digital Antwerp (UI/UX)',
  'Web Development'
]

const servicesContents = [
  [
    "We transform your ideas into tangible results. Our deliverables are meticulously crafted to exceed expectations, ensuring every project milestone is met with precision and excellence. From concept to completion.",
  ],
  [
    "Our brand and event design services create compelling visual identities that leave lasting impressions. We craft cohesive brand experiences and design engaging event spaces that tell your story, connect with your audience, and elevate your brand.",
  ],
  [
    "Through expert videography and photography, we capture the essence of your brand. Our visual storytelling combines technical excellence with creative vision, delivering powerful imagery that resonates with your target audience.",
  ],
  [
    "Our motion design expertise brings static concepts to life. We create dynamic visual experiences through animation, kinetic typography, and fluid transitions, ensuring your message not only reaches but captivates your audience in today's fast-paced landscape.",
  ],
  [
    "We push creative boundaries with cutting-edge 3D graphics. Our team creates immersive visual experiences, from product visualization to architectural rendering, bringing depth and dimension to your projects with state-of-the-art modeling.",
  ],
  [
    "Our print and drukwerk solutions combine traditional craftsmanship with modern innovation. We deliver premium quality printed materials that make a tangible impact, from business collateral to large-format displays, using sustainable materials.",
  ],
  [
    "Through intuitive UI/UX design, we create digital experiences that delight users. Our approach combines aesthetic excellence with functional efficiency, ensuring every interaction is meaningful, accessible, and aligned with your business objectives.",
  ],
  [
    "Our web development solutions leverage cutting-edge technologies to build robust, scalable digital platforms. We create responsive, performance-optimized websites and applications that provide seamless user experiences across all devices.",
  ],
];

const serviceImages = [
  "/src/assets/images/sample1/img1.jpg",
  "/src/assets/images/sample1/img2.jpg",
  "/src/assets/images/sample1/img3.jpg",
  "/src/assets/images/sample1/img4.jpg",
  "/src/assets/images/sample1/img5.jpg",
  "/src/assets/images/sample1/img6.jpg",
  "/src/assets/images/sample1/img7.jpg",
  "/src/assets/images/sample1/img8.jpg"
]

const stickySection = ref(null)
const indicator = ref(null)
const serviceImg = ref(null)
const serviceCopy = ref(null)
const currentCount = ref(null)
const currentIndex = ref(0)

onMounted(() => {
  const lenis = new Lenis()
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)

  const stickyHeight = window.innerHeight * 8
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
    return measureContainer.offsetWidth + 8
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

  ScrollTrigger.create({
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
