<template>
  <div class='relative isolate overflow-hidden pt-8'> <!-- pt-14 -> pt-8로 변경 -->
    <img src="https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2102&q=80" alt="" class="absolute inset-0 -z-10 size-full object-cover" />
    <div class="absolute inset-x-0 -top-20 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-60" aria-hidden="true"> <!-- -top-40 -> -top-20로 변경 -->
      <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
    </div>
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl py-20 sm:py-32 lg:py-40"> <!-- py-32 -> py-20, sm:py-48 -> sm:py-32 -->
        <div class="text-center">
          <h3 class="text-balance text-4xl font-semibold tracking-tight text-white sm:text-3xl">Tailored Solutions</h3> <!-- text-5xl -> text-4xl -->
          <h1 class="text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl">Run-I Studio</h1> <!-- text-5xl -> text-4xl -->
          <p class="mt-6 text-pretty text-lg font-medium text-gray-400 sm:text-xl/8">We Drive Your Vision Forward,</p> <!-- mt-8 -> mt-6 -->
          <p class="text-pretty text-lg font-medium text-gray-400 sm:text-xl/8">Whatever It Is—from Web to AI.</p>
          <div class="mt-8 flex items-center justify-center gap-x-6"> <!-- mt-10 -> mt-8 -->
            <router-link to="/contact" class="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400">Get started</router-link>
            <router-link to="/about" class="text-sm/6 font-semibold text-white">About <span aria-hidden="true">→</span></router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="absolute inset-x-0 top-[calc(100%-10rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-25rem)]" aria-hidden="true"> <!-- top-[calc(100%-13rem)] -> top-[calc(100%-10rem)] -->
      <div class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
    </div>
  </div>

</template>

<script setup>
</script>
