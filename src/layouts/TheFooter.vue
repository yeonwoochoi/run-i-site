<template>
  <footer class="bg-gray-900">
    <div class="mx-auto max-w-7xl overflow-hidden px-6 pb-16 pt-16 lg:px-8 lg:pt-14 lg:pb-14">

      <!-- Logo and Social Links -->
      <div class="flex items-center justify-between pb-4 mb-4 lg:mb-8 lg:pb-8" style="box-shadow: white 0px 0.1px 0px;">
        <div>
          <img class="h-8 w-auto" :src="companyLogo" alt="Company Logo" />
        </div>
        <div class="hidden lg:flex gap-x-10">
          <a v-for="item in navigation.social" :key="item.name" :href="item.path" target="_blank"
             class="text-gray-400 hover:text-gray-300">
            <span class="sr-only">{{ item.name }}</span>
            <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
          </a>
        </div>
      </div>

      <!-- Footer Navigation -->
      <nav class="flex flex-wrap gap-x-6 gap-y-3 font-medium mb-8">
        <div
          v-for="item in navigation.main"
          :key="'footer-navigation-main-' + item.name"
          @click.prevent="goToPage(item.path)"
          class="cursor-pointer text-gray-200 hover:text-white">
          {{ item.name }}
        </div>
      </nav>

      <!-- Company Info (Address, Phone, Email) -->
      <div>
        <dl class="mt-4 space-y-2 text-sm/4">
          <div class="flex gap-x-4">
            <dt class="flex-none">
              <span class="sr-only">사업자 등록번호</span>
              <BuildingOffice2Icon class="h-4 w-4 text-gray-600 hover:text-gray-500" aria-hidden="true" />
            </dt>
            <dd @click.prevent="copyToClipboard(companyNumber)" class="cursor-pointer text-gray-600 hover:text-gray-500">
              {{ `사업자 등록번호: ${companyNumber}` }}</dd>
          </div>
          <div class="flex gap-x-4">
            <dt class="flex-none">
              <span class="sr-only">주소</span>
              <MapIcon class="h-4 w-4 text-gray-600 hover:text-gray-500" aria-hidden="true" />
            </dt>
            <dd @click.prevent="copyToClipboard(companyAddress)" class="cursor-pointer text-gray-600 hover:text-gray-500">
              {{ `주소: ${companyAddress}` }}</dd>
          </div>
          <div class="flex gap-x-4">
            <dt class="flex-none">
              <span class="sr-only">전화번호</span>
              <PhoneIcon class="h-4 w-4 text-gray-600 hover:text-gray-500" aria-hidden="true" />
            </dt>
            <dd><a href="#" @click.prevent="copyToClipboard(companyPhone)" class="text-gray-600 hover:text-gray-500">{{ `연락처: ${companyPhone}` }}</a></dd>
          </div>
          <div class="flex gap-x-4">
            <dt class="flex-none">
              <span class="sr-only">이메일</span>
              <EnvelopeIcon class="h-4 w-4 text-gray-600 hover:text-gray-500" aria-hidden="true" />
            </dt>
            <dd><a :href="`mailto:${companyEmail}`" class="text-gray-600 hover:text-gray-500">{{ `이메일: ${companyEmail}` }}</a></dd>
          </div>
        </dl>
      </div>

      <!-- Copyright -->
      <div class="mt-6">
        <p class="text-sm text-gray-600">&copy; {{ year }} Run-i Studio, Inc. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { MapIcon, BuildingOffice2Icon, EnvelopeIcon, PhoneIcon } from '@heroicons/vue/24/outline';
import { useScrollToSection } from '@/composables/useScrollToSection'
import { useRouter } from 'vue-router';
import { defineComponent, inject, h, computed } from 'vue'
import { useCompanyStore } from "../stores/useCompanyStore.ts";

const year = computed(() => new Date().getFullYear())
const router = useRouter()
const { companyNumber, companyEmail, companyAddress, companyPhone, copyToClipboard } = useCompanyStore();

import logoWhite from '@/assets/images/logos/company-logo-no-bg-white.png';
const companyLogo = logoWhite;

const navigation = {
  main: [
    { name: 'Home', path: '/' },
    { name: 'Terms of Service', path: 'terms-of-service' },
    { name: 'Privacy Policy', path: 'privacy-policy' }
  ],
  social: [
    {
      name: 'YouTube',
      path: 'https://www.youtube.com/@old_kingdoms_in_korea',
      icon: defineComponent({
        render: () =>
          h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
            h('path', {
              'fill-rule': 'evenodd',
              d: 'M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z',
              'clip-rule': 'evenodd',
            }),
          ]),
      }),
    }
  ]
}
const useTransition = inject('useTransition')
const { scrollToSection } = useScrollToSection()

const onClickFooterButton = (sectionName) => {
  useTransition(() => {
    if (window.location.pathname !== '/') {
      router.push('/');
    }
    else {
      scrollToSection(sectionName);
    }
  })
}
const goToPage = (path) => {
  useTransition(() => {
    router.push(path);
  })
}
</script>
