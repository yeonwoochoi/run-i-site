<template>
  <section ref='contactSection' class="relative w-screen flex justify-center items-center">
    <div class="relative isolate bg-white w-full md:pt-40 pb-40">
      <div class="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div class="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-24">
          <div class="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <div class="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2">
              <svg class="absolute inset-0 size-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" aria-hidden="true">
                <defs>
                  <pattern id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527" width="200" height="200" x="100%" y="-1" patternUnits="userSpaceOnUse">
                    <path d="M130 200V.5M.5 .5H200" fill="none" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" stroke-width="0" fill="white" />
                <svg x="100%" y="-1" class="overflow-visible fill-gray-50">
                  <path d="M-470.5 0h201v201h-201Z" stroke-width="0" />
                </svg>
                <rect width="100%" height="100%" stroke-width="0" fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" />
              </svg>
            </div>
            <div class='mb-16 md:mb-0'>
              <h2 class="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">외주개발문의</h2>
              <p class="mt-6 text-lg/8 text-gray-600">궁금하신 부분에 대해 최선을 다해 답변 드릴 수 있도록 하겠습니다.<br/>간단한 정보를 남겨주시면 담당자에게 보다 자세한 상담을 받을 수 있습니다.</p>
              <dl class="mt-10 space-y-4 text-base/7 text-gray-600">
                <div class="flex gap-x-4">
                  <dt class="flex-none">
                    <span class="sr-only">사업자 등록번호</span>
                    <BuildingOffice2Icon class="h-7 w-6 text-gray-400" aria-hidden="true" />
                  </dt>
                  <dd @click.prevent="copyToClipboard(companyNumber)" class="cursor-pointer hover:text-gray-900">
                    {{ companyNumber }}</dd>
                </div>
                <div class="flex gap-x-4">
                  <dt class="flex-none">
                    <span class="sr-only">주소</span>
                    <MapIcon class="h-7 w-6 text-gray-400" aria-hidden="true" />
                  </dt>
                  <dd @click.prevent="copyToClipboard(companyAddress)" class="cursor-pointer hover:text-gray-900">
                    {{ companyAddress }}</dd>
                </div>
                <div class="flex gap-x-4">
                  <dt class="flex-none">
                    <span class="sr-only">전화번호</span>
                    <PhoneIcon class="h-7 w-6 text-gray-400" aria-hidden="true" />
                  </dt>
                  <dd><a class="hover:text-gray-900" href="#" @click.prevent="copyToClipboard(companyPhone)">{{ companyPhone }}</a></dd>
                </div>
                <div class="flex gap-x-4">
                  <dt class="flex-none">
                    <span class="sr-only">이메일</span>
                    <EnvelopeIcon class="h-7 w-6 text-gray-400" aria-hidden="true" />
                  </dt>
                  <dd><a class="hover:text-gray-900" :href="`mailto:${companyEmail}`">{{ companyEmail }}</a></dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
        <form action="#" method="POST" class="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-24">
          <div class="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
            <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label for="first-name" class="block text-sm/6 font-semibold text-gray-900">이름</label>
                <div class="mt-2.5">
                  <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-black" />
                </div>
              </div>
              <div>
                <label for="last-name" class="block text-sm/6 font-semibold text-gray-900">성</label>
                <div class="mt-2.5">
                  <input type="text" name="last-name" id="last-name" autocomplete="family-name" class="block w-full bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-black" />
                </div>
              </div>
              <div class="sm:col-span-2">
                <label for="email" class="block text-sm/6 font-semibold text-gray-900">이메일</label>
                <div class="mt-2.5">
                  <input type="email" name="email" id="email" autocomplete="email" class="block w-full bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-black" />
                </div>
              </div>
              <div class="sm:col-span-2">
                <label for="phone-number" class="block text-sm/6 font-semibold text-gray-900">전화번호</label>
                <div class="mt-2.5">
                  <input type="tel" name="phone-number" id="phone-number" autocomplete="tel" class="block w-full bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-black" />
                </div>
              </div>
              <div class="sm:col-span-2">
                <label for="message" class="block text-sm/6 font-semibold text-gray-900">문의사항</label>
                <div class="mt-2.5">
                  <textarea name="message" id="message" rows="4" class="block w-full bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-black" />
                </div>
              </div>
            </div>
            <div class="mt-8 flex justify-end">
              <button type="submit" class="bg-black px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700">보내기</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { MapIcon, BuildingOffice2Icon, EnvelopeIcon, PhoneIcon } from '@heroicons/vue/24/outline'
import { onMounted, inject, ref } from 'vue'
import { useCompanyStore } from "../../stores/useCompanyStore.ts";

const emitter = inject('emitter')
const contactSection = ref(null)
onMounted(() => {
  emitter.emit('contact-section', contactSection.value);
})

const { companyNumber, companyAddress, companyPhone, companyEmail, copyToClipboard } = useCompanyStore()
</script>

<style scoped>

</style>
