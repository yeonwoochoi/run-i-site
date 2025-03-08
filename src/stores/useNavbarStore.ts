import { defineStore } from 'pinia';

interface NavbarState {
  isOpen: boolean;
}

export const useNavbarStore = defineStore('navbar', {
  state: (): NavbarState => ({
    isOpen: false,
  }),
  actions: {
    toggleNavbar() {
      this.isOpen = !this.isOpen;
    },
    openNavbar() {
      this.isOpen = true;
    },
    closeNavbar() {
      this.isOpen = false;
    },
  },
});
