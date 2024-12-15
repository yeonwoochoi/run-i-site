<template>
  <div
    v-if='showScrollTopButton'
    @click='scrollToTop'
    class='fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg cursor-pointer'
  >
    <font-awesome-icon icon="chevron-up" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const { y } = useWindowScroll()
const showScrollTopButton = ref(false)
const limit = 50

watch(y, (scrollY) => {
  showScrollTopButton.value = scrollY > limit
})

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
