import { ref, inject, onMounted } from 'vue'

export function useScrollToSection() {
  const emitter = inject('emitter')

  const sections = {
    serviceSection: ref(null),
    portfolioSection: ref(null),
    contactSection: ref(null),
  }

  onMounted(() => {
    // 이벤트 받기
    emitter.on('service-section', (targetSection) => {
      if (targetSection) sections.serviceSection.value = targetSection
    })
    emitter.on('portfolios-section', (targetSection) => {
      if (targetSection) sections.portfolioSection.value = targetSection
    })
    emitter.on('contact-section', (targetSection) => {
      if (targetSection) sections.contactSection.value = targetSection
    })
  })

  const scrollToSection = (sectionKey) => {
    const section = sections[sectionKey];

    if (sectionKey === 'homeSection') {
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      })
    }
    else if (section && section.value) {
      section.value.scrollIntoView({ behavior: 'instant' });
    }
  };


  return { scrollToSection, sections }
}
