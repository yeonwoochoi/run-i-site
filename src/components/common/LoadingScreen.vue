<template>
  <!-- 초기 로딩 화면 -->
  <div class="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
    <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-white"></div>
  </div>
</template>

<style scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
