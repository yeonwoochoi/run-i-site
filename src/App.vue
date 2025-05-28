<template>
  <LoadingScreen v-show='loading' />
  <div class='flex flex-col justify-between min-h-screen'>
    <TheHeader />
    <div class='flex-grow'> <!-- Main content area -->
      <TheView />
    </div>
    <TheFooter />
  </div>
  <FadeTransition ref="fadeTransitionRef" />
</template>

<script setup>
import TheHeader from '@/layouts/TheHeader.vue'
import TheView from '@/layouts/TheView.vue'
import TheFooter from '@/layouts/TheFooter.vue'
import LoadingScreen from './components/common/LoadingScreen.vue'
import FadeTransition from '@/components/common/FadeTransition.vue'
import { nextTick, onBeforeUnmount, onMounted, provide, ref } from 'vue'

const loading = ref(true)
const fadeTransitionRef = ref(null)

let loadTimeout = null
let hasHandled = false // 중복 실행 방지 플래그

const handleLoaded = () => {
  if (hasHandled) return
  hasHandled = true

  // 최소 1초 표시 보장
  const minDisplayTime = 1000
  const startTime = Date.now()

  nextTick(() => {
    fadeTransitionRef.value?.startTransition(() => {
      const elapsed = Date.now() - startTime
      const remainingTime = Math.max(0, minDisplayTime - elapsed)

      if (remainingTime > 0) {
        setTimeout(() => {
          loading.value = false
        }, remainingTime)
      } else {
        loading.value = false
      }
    })
  })
}

onMounted(() => {
  if (document.readyState === 'complete') {
    handleLoaded()
  } else {
    window.addEventListener('load', handleLoaded)
    // 5초 타임아웃 설정
    loadTimeout = setTimeout(handleLoaded, 5000)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('load', handleLoaded)
  if (loadTimeout) clearTimeout(loadTimeout)
})

provide('useTransition', (callback) => {
  fadeTransitionRef.value?.startTransition(callback)
})
</script>
