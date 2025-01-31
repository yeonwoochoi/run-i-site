import { ref, inject, onMounted } from 'vue'

export function useScrollToSection() {
  const emitter = inject('emitter')

  const sections = {
    aboutSection: ref(null),
    serviceSection: ref(null),
    contactSection: ref(null),
  }

  onMounted(() => {
    // 이벤트 받기
    emitter.on('about-section', (targetSection) => {
      if (targetSection) sections.aboutSection.value = targetSection
    })
    emitter.on('service-section', (targetSection) => {
      if (targetSection) sections.serviceSection.value = targetSection
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
        behavior: 'smooth'
      })
    }
    else if (section && section.value) {
      section.value.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return { scrollToSection, sections }
}
