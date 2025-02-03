<template>
  <div>
    <NotFoundHeroSection />
    <div class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div class="text-center">
        <h1 class="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">Page not found</h1>
        <p class="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">Sorry, we couldn’t find the page you’re looking for.</p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <button @click.prevent="goBackHome" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Go back home</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import NotFoundHeroSection from '@/components/hero-section/HeroSectionNotFound.vue'
import {useRouter} from "vue-router";

const router = useRouter()
const goBackHome = () => {
  router.push('/');
}
</script>

<style scoped>

</style>
