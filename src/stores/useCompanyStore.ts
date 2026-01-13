import {defineStore} from 'pinia'

export const useCompanyStore = defineStore('company', {
  state: () => ({
    companyName: { kr: '러니 스튜디오', en: 'Run-i Studio' },
    companyNumber: '511-71-00586',
    companyPhone: '+82 010-8560-3465',
    companyEmail: 'studioruni@gmail.com',
    companyAddress: '전북특별자치도 전주시 완산구 서신천변2길 3-3'
  }),
  actions: {
    async copyToClipboard(text: string) {
      try {
        await navigator.clipboard.writeText(text)
        alert(`텍스트가 복사되었습니다: ${text}`)
      }
      catch (e) {
        alert("복사 실패: " + e);
      }
    }
  }
})
