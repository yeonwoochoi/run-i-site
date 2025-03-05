<template>
  <div
    id="transition-container"
    :class="isTransitioning ? 'hideTopTransition' : 'showTopTransition'"
  >
    <!-- Top Wave -->
    <svg id="transition-wave-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <defs>
        <path fill="#000000" id="transition-wave-path" d="M0,128L21.8,138.7C43.6,149,87,171,131,154.7C174.5,139,218,85,262,69.3C305.5,53,349,75,393,101.3C436.4,128,480,160,524,186.7C567.3,213,611,235,655,213.3C698.2,192,742,128,785,122.7C829.1,117,873,171,916,186.7C960,203,1004,181,1047,160C1090.9,139,1135,117,1178,96C1221.8,75,1265,53,1309,53.3C1352.7,53,1396,75,1418,85.3L1440,96L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"></path>
      </defs>
      <use href="#transition-wave-path"></use>
    </svg>

    <!-- Center Fill -->
    <div id="transition-push" class="w-full h-full bg-[#000000]"></div>

    <!-- Bottom Wave -->
    <svg id="transition-wave-svg-bottom" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <use href="#transition-wave-path" transform="scale(1, -1) translate(0, -320)"></use>
    </svg>
  </div>
</template>

<script setup>
import { ref, defineExpose } from 'vue';

// 상태 변수
const isTransitioning = ref(false);

// 애니메이션 시작 함수
const startTransition = (callback) => {
  isTransitioning.value = true; // 1. Transition 시작

  // 애니메이션 시간
  setTimeout(() => {
    callback?.()
    setTimeout(() => {
      isTransitioning.value = false;
    }, 250); // 3. Fade out 시간
  }, 500); // 2. 애니메이션 시작 후 0.5초후 콜백 시작
};

defineExpose({ startTransition });
</script>

<style scoped>
svg {
  display: block; /* 인라인 블록 기본값을 없애서 여백 제거 */
  width: 100%;
}
#transition-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 200%;
  z-index: 9999;
  overflow: hidden;
}

.hideTopTransition {
  animation: hideTopTransition ease-in 0.5s;
  animation-fill-mode: forwards;
}

.showTopTransition {
  animation: showTopTransition ease-in 0.5s;
  animation-fill-mode: forwards;
}


@keyframes hideTopTransition {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(-50%);
  }
}

@keyframes showTopTransition {
  0% {
    transform: translateY(-50%);
  }
  100% {
    transform: translateY(100%);
  }
}
</style>
