<template>
  <div class="menu-container fixed" ref="container">
    <!-- Menu Overlay -->
    <div class="menu-overlay" :class="{ 'menu-overlay-open': isMenuOpen }">
      <!-- Menu Close Icon -->
      <div class="menu-close-icon" @click="toggleMenu">
        <p>&#x2715;</p>
      </div>

      <!-- Menu Links -->
      <div class="menu-copy">
        <div class="menu-links">
          <div v-for="(item, index) in menuItem" :key="index" class="menu-link-item">
            <div class="menu-link-item-holder" @click="toggleMenu">
              <a class="menu-link cursor-pointer" @click.prevent='onClickNavigationButton(item.path)'>{{ item.name }}</a>
            </div>
          </div>
        </div>

        <!-- Menu Info -->
        <div class="menu-info">
          <div class="menu-info-col">
            <a class="hover:text-gray-200" href="https://github.com/yeonwoochoi/run-i-site" target="_blank">Github &#8599;</a>
            <a class="hover:text-gray-200" href="https://www.youtube.com/@old_kingdoms_in_korea" target="_blank">Youtube &#8599;</a>
            <a class="hover:text-gray-200" target="_blank">Instagram &#8599;</a>
            <a class="hover:text-gray-200" target="_blank">LinkedIn &#8599;</a>
            <a class="hover:text-gray-200" target="_blank">Dribbble &#8599;</a>
          </div>
          <div class="menu-info-col">
            <dd>
              <a class="hover:text-gray-200" :href="`mailto:${companyStore.companyEmail}`">{{ companyStore.companyEmail }}</a>
            </dd>
            <dd>
              <a class="hover:text-gray-200" @click.prevent="copyToClipboard(companyStore.companyPhone)">{{ companyStore.companyPhone }}</a>
            </dd>
          </div>
        </div>
      </div>

      <!-- Menu Preview -->
      <div class="menu-preview mr-4">
        <div @click="onClickCompanyLogo" class='-m-1.5 p-1.5 cursor-pointer'>
          <span class='sr-only'>Company Logo</span>
          <img class='h-8 w-auto' src="@/assets/images/logos/company-logo-no-bg-white.png" alt="Company Logo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, defineProps, defineEmits } from 'vue'
import { useRouter } from 'vue-router';
import { gsap } from 'gsap';
import { useScrollToSection } from '@/composables/useScrollToSection'
import { useCompanyStore } from "../../stores/useCompanyStore.ts";

const { scrollToSection } = useScrollToSection()
const companyStore = useCompanyStore()
const copyToClipboard = companyStore.copyToClipboard

const props = defineProps({
  isMenuOpen: {
    type: Boolean,
    required: true
  },
  menuItem: {
    type: Array,
    default: []
  }
})
const emit = defineEmits(['update:isMenuOpen', 'animationFinished']);
const toggleMenu = () => {
  emit('update:isMenuOpen', !props.isMenuOpen);
}

const router = useRouter();
const onClickCompanyLogo = () => {
  router.push('/')
  toggleMenu()
}

const onClickNavigationButton = (sectionName) => {
  if (window.location.pathname !== '/') {
    router.push('/');
  }
  else {
    scrollToSection(sectionName);
  }
}

// Timeline for GSAP animations
const timeline = ref(null);

// GSAP animation setup
onMounted(() => {
  gsap.set('.menu-link-item-holder', { y: 75 });  // 요소의 초기 위치를 y축 75px로 설정

  timeline.value = gsap.timeline({ paused: true })  // 애니메이션 타임라인을 생성, 시작 전에 일시 정지 상태로 설정
    .to('.menu-overlay', {
      duration: 0.5,  // 애니메이션 지속 시간 0.5초
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',  // 클립 경로 변경 (사각형 영역으로 애니메이션 효과)
      ease: 'power2.inOut',  // easing 함수: 애니메이션 시작과 끝을 부드럽게
    })
    .to('.menu-link-item-holder', {
      y: 0,  // 요소의 y 위치를 0으로 변경 (위로 이동)
      duration: 0.6,  // 애니메이션 지속 시간 0.6초
      stagger: 0.08,  // 애니메이션을 순차적으로 실행, 각 요소 간의 시간 간격 0.08초
      ease: 'power2.out',  // easing 함수: 애니메이션 끝에 부드럽게 마무리
      delay: -0.5,  // 이전 애니메이션에서 0.5초 전부터 시작 (0.5초 빠르게 시작)
    })
    .eventCallback('onComplete', () => {
      emit('animationFinished', true)
    })
    .eventCallback('onReverseComplete', () => {
      emit('animationFinished', false)
    })
});

// Watch for menu open state changes
watch(()=> props.isMenuOpen, (newVal) => {
  if (newVal) {
    timeline.value.play();
  } else {
    timeline.value.reverse();
  }
});
</script>

<style scoped>
.menu-container a,p {
  color: white;
}

.menu-bar,
.menu-overlay-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  padding: 2em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
}

.menu-bar a,
.menu-open p {
  color: black;
  cursor: pointer;
}

.menu-close p {
  color: white;
  cursor: pointer;
}

.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 2em;
  background: black;
  z-index: 2;
  display: flex;
  clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%);
  transition: clip-path 1.25s ease-in-out;
}

.menu-overlay.menu-overlay-open {
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
}

.menu-close-icon {
  flex: 2;
  display: flex;
  align-items: flex-end;
  cursor: pointer;
}

.menu-copy {
  flex: 4;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 2em;
}

.menu-preview {
  flex: 4;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}

.menu-close-icon p {
  font-size: 100px;
  line-height: 70%;
}

.menu-link-item {
  width: max-content;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
}

.menu-link-item-holder {
  position: relative;
}

.menu-link-item-holder a {
  color: white;
  font-size: 80px;
  font-weight: 400;
  letter-spacing: -0.02em;
  line-height: 85%;
}

.menu-info {
  display: flex;
}

.menu-info-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

@media (max-width: 900px) {
  .menu-preview {
    display: none;
  }

  .menu-close-icon {
    display: none;
  }

  .menu-copy {
    padding-top: 8em;
  }

  .menu-link-item-holder a {
    font-size: 60px;
  }
}
</style>
