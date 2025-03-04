<template>
  <HeroSection :image-src="privacyPolicyImage">
    <template #title>
      <div class="relative overflow-visible">
        <h1 class="logo z-[100] font-bold text-white text-5xl sm:text-7xl pb-20">
          Privacy Policy
        </h1>
      </div>
    </template>
  </HeroSection>

  <div class="container mx-auto my-20 max-w-3xl">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">{{ selectedLanguage === 'en' ? 'Privacy Policy' : '개인정보처리방침' }}</h1>
      <select v-model="selectedLanguage" class="border rounded px-2 py-1">
        <option value="en">English</option>
        <option value="ko">한국어</option>
      </select>
    </div>

    <div class="space-y-6">
      <section v-for="(section, index) in filteredPolicySections" :key="index" class="bg-gray-100 p-4 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-2">{{ section.title }}</h2>
        <p v-for="(paragraph, pIndex) in section.content" :key="pIndex" class="text-gray-700 mb-2">{{ paragraph }}</p>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import HeroSection from "@/components/hero-section/HeroSection.vue";
import privacyPolicyImage from "@/assets/images/hero-sections/privacy-policy.jpg";

const selectedLanguage = ref('ko');

const policySections = {
  en: [
    {
      title: "Information Collection and Use",
      content: [
        "The Application collects information when you download and use it. This information may include your device's IP address, pages visited, and time spent on the Application.",
        "The Application does not gather precise location information.",
        "The Service Provider may use this information to contact you for important updates and marketing promotions."
      ]
    },
    {
      title: "Third Party Access",
      content: [
        "Only aggregated, anonymized data is periodically transmitted to external services to improve the Application.",
        "Third-party services, such as Google Play Services, may have their own Privacy Policy regarding data handling."
      ]
    },
    {
      title: "Opt-Out Rights",
      content: [
        "You can stop all data collection by uninstalling the Application.",
        "Uninstall using the standard process available on your mobile device or app marketplace."
      ]
    },
    {
      title: "Children",
      content: [
        "The Service Provider does not knowingly collect information from children under the age of 13.",
        "If such information is found, it will be deleted immediately."
      ]
    },
    {
      title: "Security",
      content: [
        "We provide safeguards to protect the confidentiality of your information."
      ]
    },
    {
      title: "Changes",
      content: [
        "This Privacy Policy may be updated, and you are advised to review it regularly."
      ]
    },
    {
      title: "Contact Us",
      content: [
        "If you have any questions, contact us at runi.studio.kr@gmail.com"
      ]
    }
  ],
  ko: [
    {
      title: "개인정보 수집 및 이용",
      content: [
        "애플리케이션은 다운로드 및 사용 시 정보를 수집할 수 있습니다. 이 정보에는 사용자의 IP 주소, 방문한 페이지, 애플리케이션 사용 시간이 포함될 수 있습니다.",
        "애플리케이션은 사용자의 정확한 위치 정보를 수집하지 않습니다.",
        "서비스 제공자는 중요한 업데이트 및 마케팅 홍보를 위해 이 정보를 사용할 수 있습니다."
      ]
    },
    {
      title: "제3자 접근",
      content: [
        "애플리케이션 개선을 위해 익명화된 데이터를 외부 서비스에 전송할 수 있습니다.",
        "Google Play Services와 같은 제3자 서비스는 자체 개인정보처리방침을 가지고 있을 수 있습니다."
      ]
    },
    {
      title: "옵트아웃 권한",
      content: [
        "애플리케이션을 제거하면 모든 데이터 수집을 중지할 수 있습니다.",
        "모바일 기기의 표준 제거 절차를 사용하여 애플리케이션을 제거하십시오."
      ]
    },
    {
      title: "아동 보호",
      content: [
        "서비스 제공자는 13세 미만 아동의 개인정보를 의도적으로 수집하지 않습니다.",
        "만약 해당 정보가 발견되면 즉시 삭제됩니다."
      ]
    },
    {
      title: "보안",
      content: [
        "당사는 사용자의 정보를 보호하기 위한 조치를 제공합니다."
      ]
    },
    {
      title: "변경사항",
      content: [
        "본 개인정보처리방침은 업데이트될 수 있으며, 정기적으로 검토할 것을 권장합니다."
      ]
    },
    {
      title: "문의하기",
      content: [
        "개인정보 관련 문의 사항은 runi.studio.kr@gmail.com 으로 연락해 주세요."
      ]
    }
  ]
};

const filteredPolicySections = computed(() => policySections[selectedLanguage.value]);
</script>

<style scoped>
.container {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
