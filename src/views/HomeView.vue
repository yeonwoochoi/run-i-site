<template>
  <div>
    <HeroSectionHome/>
    <div class="content">
      <div class="w-full min-h-screen relative overflow-hidden m-0 p-0 font-['TT_Hoves_Pro_Trial']">
        <AboutSection class="aboutSection" />
        <ServiceSection class="serviceSection" />
        <ContactSection class="contactSection" />
      </div>
    </div>
  </div>
</template>

<script setup>
import AboutSection from "@/components/section/AboutSection.vue";
import ServiceSection from "@/components/section/ServiceSection.vue";
import ContactSection from "@/components/section/ContactSection.vue";
import HeroSectionHome from '@/components/hero-section/HeroSectionHome.vue'
</script>

<style scoped>
</style>
