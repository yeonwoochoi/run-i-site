<template>
  <HeroSection :image-src='homeImage'>
    <template #title>
      <div class="relative overflow-visible">
        <h1 class="logo z-[100] font-bold text-white text-5xl sm:text-7xl">
          Run-I Studio
        </h1>
      </div>

      <!--      <h3 class="text-balance text-5xl font-semibold tracking-tight text-white sm:text-3xl animate-fade-in-up">Tailored Solutions </h3>-->
      <p class="text-pretty text-lg font-medium text-white sm:text-xl/8 mt-2 sm:mt-4">We Drive Your Vision Forward,</p>
      <p class="text-pretty text-lg font-medium text-white sm:text-xl/8">Whatever It Is—from Web to AI.</p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
<!--        <router-link to="/contact" class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-gray-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400">-->
<!--          Get started-->
<!--        </router-link>-->
<!--        <router-link to="/about" class="text-sm/6 font-semibold text-white">-->
<!--          About-->
<!--          <span aria-hidden="true">→</span>-->
<!--        </router-link>-->
      </div>
    </template>
    <template #footer>
      <div
        class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true">
        <div
          class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"/>
      </div>
    </template>
  </HeroSection>
</template>

<script setup>
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import HeroSection from "@/components/hero-section/HeroSection.vue";
import { computed, onMounted, onUnmounted } from 'vue'
import homeImage from "@/assets/images/hero-sections/home.jpg";

onMounted(() => {
  ScrollTrigger.refresh();

  // gsap.fromTo(".logo",
  //   { scale: 1, y: "0vh", color: "white" },
  //   {
  //     scale: 0.3,
  //     y: "5px",
  //     color: "black",
  //     scrollTrigger: {
  //       trigger: ".hero-section",
  //       start: "top top",
  //       end: () => `${window.innerHeight/2 - 65}`,
  //       pin: ".logo",  // 스크롤이 끝나면 요소를 고정
  //       pinSpacing: false,
  //       scrub: true,
  //       markers: false, // 디버깅용
  //     }
  //   }
  // );

  gsap.fromTo(".logo",
    { scale: 1, y: "0vh", color: "white" },
    {
      scale: 0.3,
      y: "5px", // 최종적으로 5px 아래로 이동
      color: "black",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top", // 화면 상단에서 시작
        end: "+=100%", // 전체 화면 높이만큼 스크롤
        pin: ".logo", // 스크롤 중간에 고정
        pinSpacing: false,
        scrub: true, // 부드러운 스크롤 애니메이션
        markers: false, // 디버깅용
        onUpdate: (self) => {
          const isSmallScreen = window.innerWidth <= 640;

          // 스크롤 중간에 로고를 화면 상단 중앙에 고정
          if (self.progress > 0.35) {
            gsap.set(".logo", {
              position: "fixed",
              top: isSmallScreen ? "15px" : "5px", // sm 기준에 따라 top 값 설정
              left: "50%",
              transform: "translateX(-50%) scale(0.3)", // 중앙 정렬 및 스케일 조정
            });
          } else {
            gsap.set(".logo", {
              position: "relative",
              top: "auto",
              left: "auto",
              transform: "translateX(0) scale(1)",
            });
          }
        },
      }
    }
  );
});

onUnmounted(() => {
  // 페이지 떠날 때 ScrollTrigger 상태 초기화
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
});
</script>

<style scoped>
</style>
