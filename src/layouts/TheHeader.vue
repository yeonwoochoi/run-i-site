<template>
  <div>
    <header :class="{'scrolled': isScrolled, [navClass]: true}" class='fixed inset-x-0 h-auto top-0 z-50 trasition-colors'>
      <div class='flex items-center justify-between p-6 lg:px-8' aria-label='Global'>
        <div class='flex lg:flex-1'>
          <div @click.prevent='onClickAppBarButton("homeSection")' class='cursor-pointer -m-1.5 p-1.5'>
            <span class='sr-only'>About</span>
            <img class='h-8 w-auto' :src="companyLogo" alt="Company Logo" />
          </div>
        </div>
<!--        <div class='fixed inset-x-0 top-7 flex items-center justify-center pointer-events-none'>-->
<!--          <p class='logo font-semibold text-black'>Run-I Studio</p>-->
<!--        </div>-->
        <div class='flex relative lg:hidden'>
          <button
            type='button'
            class='-m-2.5 inline-flex items-center justify-center rounded-md isolate z-[9000]'
            @click='toggleMenu'
          >
            <span class='sr-only'>Open main menu</span>
            <div class="relative flex items-center justify-center">
              <!-- Bars3Icon -->
              <transition name="fade" mode="out-in">
                <Bars3Icon
                  v-if="!mobileMenuOpen"
                  class="absolute w-6 h-6 transition-transform duration-300 transform"
                  :class="{ 'rotate-180 opacity-0': mobileMenuOpen, 'rotate-0 opacity-100': !mobileMenuOpen, 'text-white': !isScrolled || mobileMenuOpen, 'text-black': isScrolled && !mobileMenuOpen }"
                  aria-hidden="true"
                />
              </transition>
              <!-- XMarkIcon -->
              <transition name="fade" mode="out-in">
                <XMarkIcon
                  v-if="mobileMenuOpen"
                  class="absolute w-6 h-6 transition-transform duration-300 transform"
                  :class="{ 'rotate-0 opacity-100': mobileMenuOpen, 'rotate-180 opacity-0': !mobileMenuOpen, 'text-white' : !isScrolled || mobileMenuOpen, 'text-black': isScrolled && !mobileMenuOpen }"
                  aria-hidden="true"
                />
              </transition>
            </div>
          </button>
        </div>
        <div class='hidden lg:flex lg:gap-x-12'>
          <div
            v-for="item in navigation"
            :key="item.name"
            @click.prevent="onClickAppBarButton(item.path)"
            class="text-sm/6 font-semibold cursor-pointer"
          >
            <span>{{ item.name }}</span>
          </div>
        </div>

        <NavigationMenu v-model:isMenuOpen="mobileMenuOpen" :menuItem="navigation" />
      </div>
    </header>
  </div>
</template>

<script setup>
import { useWindowScroll } from '@vueuse/core'
import { computed, ref, inject } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
// import { onMounted, onUnmounted, watch } from 'vue'
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
import NavigationMenu from "@/components/menu/NavigationMenu.vue";
import { useScrollToSection } from '@/composables/useScrollToSection'
import { useRouter } from 'vue-router';

const router = useRouter()
const { scrollToSection } = useScrollToSection()

const navigation = [
  { name: 'Home', path: 'homeSection' },
  { name: 'About', path: 'aboutSection' },
  { name: 'Service', path: 'serviceSection' },
  { name: 'Contact', path: 'contactSection' }
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
import logoBlack from '@/assets/images/logos/company-logo-black.png';
import logoWhite from '@/assets/images/logos/company-logo-no-bg-white.png';

const companyLogo = computed(() => (isScrolled.value ? logoBlack : logoWhite));

const toggleMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const useTransition = inject('useTransition')
const onClickAppBarButton = (sectionName) => {
  useTransition(() => {
    if (window.location.pathname !== '/') {
      router.push('/');
    }
    else {
      scrollToSection(sectionName);
    }
  })
}

// const getAnimationSettings = () => {
//   if (window.innerWidth < 768) {
//     return { scale: 3, y: "40vh" };
//   } else if (window.innerWidth >= 768 && window.innerWidth < 1200) {
//     return { scale: 5, y: "37vh" };
//   } else {
//     return { scale: 6, y: "37vh" };
//   }
// };
//
// onMounted(() => {
//   ScrollTrigger.refresh();
//
//   // 애니메이션 설정
//   ScrollTrigger.create({
//     animation: gsap.from(".logo", {
//       ...getAnimationSettings(),
//       color: "white",
//     }),
//     trigger: ".hero-section",
//     endTrigger: ".hero-section",
//     start: "top top",
//     end: "bottom center",
//     scrub: true,
//     // markers: true, // 디버깅을 위한 marker 추가 (필요시 제거)
//   });
// });
//
// // 브레이크포인트에 따라 애니메이션 크기 및 위치 변경
// const updateAnimation = () => {
//   const animationSettings = getAnimationSettings();
//   gsap.set(".logo", animationSettings);
//   ScrollTrigger.refresh(); // 화면 크기 변경 시 ScrollTrigger 다시 갱신
// };
//
// // 브레이크포인트에 따라 애니메이션 업데이트
// window.addEventListener("resize", updateAnimation);
// updateAnimation();
//
// onUnmounted(() => {
//   // 페이지 떠날 때 ScrollTrigger 상태 초기화
//   ScrollTrigger.getAll().forEach(trigger => trigger.kill());
// });
</script>

<style scoped>
header {
  transition: background-color 0.3s ease, color 0.3s ease;
}

header.scrolled {
  border-bottom: 1px solid rgba(0, 0, 0, 0.3); /* cornflowerblue 색의 희미한 구분선 */
}

.header-bg-color {
  background-color: transparent;
  color: white;
}

.header-bg-color-invert {
  background-color: white;
  color: black;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
