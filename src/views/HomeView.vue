<template>
  <div>
    <HeroSectionHome/>
    <div class="content">
      <div class="w-full min-h-screen relative overflow-hidden m-0 p-0">
        <ServiceSection class="serviceSection" />
        <PortfolioSection class="portfolioSection" />
        <ContactSection class="contactSection" />
      </div>
    </div>
  </div>
</template>

<script setup>
import ServiceSection from "@/components/section/ServiceSection.vue";
import PortfolioSection from "@/components/section/PortfolioSection.vue";
import ContactSection from "@/components/section/ContactSection.vue";
import HeroSectionHome from '@/components/hero-section/HeroSectionHome.vue'
</script>

<style scoped>
</style>
