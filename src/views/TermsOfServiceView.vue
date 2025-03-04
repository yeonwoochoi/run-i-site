<template>
  <HeroSection :image-src="termsOfServiceImage">
    <template #title>
      <div class="relative overflow-visible">
        <h1 class="logo z-[100] font-bold text-white text-5xl sm:text-7xl pb-20">
          Terms Of Service
        </h1>
      </div>
    </template>
  </HeroSection>

  <div class="container mx-auto my-20 max-w-3xl">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">{{ selectedLanguage === 'en' ? 'Terms of Service' : '이용 약관' }}</h1>
      <select v-model="selectedLanguage" class="border rounded px-2 py-1">
        <option value="en">English</option>
        <option value="ko">한국어</option>
      </select>
    </div>

    <div class="space-y-6">
      <section v-for="(section, index) in filteredTermsSections" :key="index" class="bg-gray-100 p-4 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-2">{{ section.title }}</h2>
        <p v-for="(paragraph, pIndex) in section.content" :key="pIndex" class="text-gray-700 mb-2">{{ paragraph }}</p>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import HeroSection from "@/components/hero-section/HeroSection.vue";
import termsOfServiceImage from "@/assets/images/hero-sections/terms-of-service.jpg";


const selectedLanguage = ref('ko');

const termsSections = {
  en: [
    {
      title: "Introduction",
      content: [
        "These Terms of Service govern your use of our Application. By using the Application, you agree to these terms.",
        "If you do not agree to these terms, please do not use the Application."
      ]
    },
    {
      title: "User Responsibilities",
      content: [
        "Users must comply with all applicable laws and regulations.",
        "You are responsible for maintaining the security of your account and any actions taken under your account."
      ]
    },
    {
      title: "Termination",
      content: [
        "We may suspend or terminate your access to the Application if you violate these Terms of Service."
      ]
    },
    {
      title: "Changes to Terms",
      content: [
        "We reserve the right to update these Terms of Service at any time.",
        "Continued use of the Application after changes constitutes acceptance of the new terms."
      ]
    },
    {
      title: "Contact Us",
      content: [
        "If you have any questions about these Terms of Service, please contact us at runi.studio.kr@gmail.com"
      ]
    }
  ],
  ko: [
    {
      title: "소개",
      content: [
        "본 이용 약관은 애플리케이션 사용에 대한 규정을 포함하고 있습니다. 애플리케이션을 사용함으로써 본 약관에 동의하는 것으로 간주됩니다.",
        "약관에 동의하지 않는 경우 애플리케이션을 사용하지 마십시오."
      ]
    },
    {
      title: "사용자의 책임",
      content: [
        "사용자는 모든 관련 법률 및 규정을 준수해야 합니다.",
        "사용자는 계정 보안 유지 및 계정 내 활동에 대한 책임이 있습니다."
      ]
    },
    {
      title: "서비스 해지",
      content: [
        "본 이용 약관을 위반할 경우, 회사는 사용자에 대한 서비스 이용을 중지하거나 계정을 해지할 수 있습니다."
      ]
    },
    {
      title: "약관 변경",
      content: [
        "본 이용 약관은 언제든지 변경될 수 있습니다.",
        "변경 이후에도 애플리케이션을 계속 사용할 경우, 변경된 약관에 동의한 것으로 간주됩니다."
      ]
    },
    {
      title: "문의하기",
      content: [
        "본 이용 약관에 대한 문의 사항은 runi.studio.kr@gmail.com 으로 연락해 주세요."
      ]
    }
  ]
};

const filteredTermsSections = computed(() => termsSections[selectedLanguage.value]);
</script>

<style scoped>
.container {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
