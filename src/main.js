import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'

import 'primeicons/primeicons.css'

import Nora from '@primevue/themes/nora'
import './assets/main.css'

const app = createApp(App)

// Configurar el tema de primevue
app.use(PrimeVue, {
  theme: {
    preset: Nora,
    options: {
      cssLayer: { name: 'primevue', order: 'primevue, tailwind-base, tailwind-utilities' }
    }
  }
})
app.use(router)
app.mount('#app')
