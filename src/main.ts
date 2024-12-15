import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { MotionPlugin } from '@vueuse/motion'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(MotionPlugin)


import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {far} from '@fortawesome/free-regular-svg-icons'
import {fab} from '@fortawesome/free-brands-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

library.add(fas)
library.add(far)
library.add(fab)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
