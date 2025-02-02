import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { MotionPlugin } from '@vueuse/motion'

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// 플러그인으로 추가
const gsapPlugin = {
  install(app: any) {
    app.config.globalProperties.$gsap = gsap;
    app.config.globalProperties.$scrollTrigger = ScrollTrigger;
  }
};
const app = createApp(App);

// Add mitt
import mitt from "mitt";
const emitter = mitt();
app.config.globalProperties.emitter = emitter;
app.provide("emitter", emitter);

app.use(createPinia());
app.use(router);
app.use(MotionPlugin);
app.use(gsapPlugin); // GSAP 플러그인 등록

library.add(fas, far, fab);
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
