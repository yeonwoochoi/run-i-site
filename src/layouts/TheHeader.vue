<template>
  <div>
    <header :class="{'scrolled': isScrolled, [navClass]: true}" class='fixed inset-x-0 h-auto top-0 z-50 trasition-colors'>
      <nav class='flex items-center justify-between p-6 lg:px-8' aria-label='Global'>
        <div class='flex lg:flex-1'>
          <router-link to="/" class='-m-1.5 p-1.5'>
            <span class='sr-only'>About</span>
            <img class='h-8 w-auto' :src="companyLogo" alt="Company Logo" />
          </router-link>
        </div>
        <div class='flex lg:hidden'>
          <button type='button' class='-m-2.5 inline-flex items-center justify-center rounded-md =-2.5' @click='mobileMenuOpen = true'>
            <span class='sr-only'>Open main menu</span>
            <Bars3Icon class='size-6' aria-hidden='true' />
          </button>
        </div>
        <div class='hidden lg:flex lg:gap-x-12'>
          <router-link v-for='item in navigation' :key='item.name' :to='item.href' class='text-sm/6 font-semibold'>
            <span>{{ item.name }}</span>
          </router-link>
        </div>
        <div class='hidden lg:flex lg:flex-1 lg:justify-end'>
          <router-link to='/login' class='text-sm/6 font-semibold'>
            Log in
            <span aria-hidden='true'>
            &rarr;
          </span>
          </router-link>
        </div>
      </nav>
    </header>
  </div>
</template>

<script setup>
import { useWindowScroll } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Service', href: '/service' },
  { name: 'Contact', href: '/contact' },
]

const mobileMenuOpen = ref(false)

const { y } = useWindowScroll();

// 스크롤이 일정 위치를 넘었는지 여부를 계산하는 변수
const isScrolled = computed(() => y.value > 50);

// 네비게이션 배경 및 텍스트 색상 클래스 계산
const navClass = computed(() => {
  return isScrolled.value
    ? 'header-bg-color-invert'
    : 'header-bg-color'
})

// 회사 로고 이미지 경로 설정
const companyLogo = computed(() => {
  return isScrolled.value
    ? new URL('@/assets/images/logos/company-logo-no-bg.png', import.meta.url).href
    : new URL('@/assets/images/logos/company-logo-no-bg-white.png', import.meta.url).href;
})
</script>

<style scoped>
header {
  transition: background-color 0.3s ease, color 0.3s ease;
}

header.scrolled {
  border-bottom: 1px solid rgba(100, 149, 237, 0.3); /* cornflowerblue 색의 희미한 구분선 */
}

.header-bg-color {
  background-color: transparent;
  color: white;
}

.header-bg-color-invert {
  background-color: white;
  color: cornflowerblue;
}
</style>
