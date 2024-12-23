<template>
  <div>
    <HeroSection image-src="src/assets/images/hero-sections/about.jpg">
      <template #title>

      </template>
      <template #footer>
        <section class="flex justify-center items-end text-center">
          <p>Scroll Down</p>
        </section>
      </template>
    </HeroSection>

    <div class="logo-container">
      <h1 class="logo">Run-I Studio</h1>
    </div>
    <div class="content">
      <ExperienceSample3/>
    </div>
  </div>
</template>

<script setup>
import ExperienceSample3 from "@/components/Experience/Samples/ExperienceSample3.vue";
import HeroSection from '../components/hero-section/HeroSection.vue'
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { onMounted } from "vue";

onMounted(() => {
  // 애니메이션 설정
  ScrollTrigger.create({
    animation: gsap.from(".logo", {
      y: "50vh",
      scale: 6,
      yPercent: -50,
      color: "cornflowerblue"
    }),
    scrub: true,
    trigger: ".content",
    start: "top bottom",
    endTrigger: ".content",
    end: "top center",
  });
});
</script>

<style scoped>

.logo {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  font-family: "Cosi Times";
  color: white;
  padding: 1em;
  z-index: 1000;
}

.container {
  width: 100%;
  height: 100vh;
  background: #fff;
}
</style>
