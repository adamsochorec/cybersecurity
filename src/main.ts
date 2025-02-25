import { createApp } from 'vue'
import './assets/style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import PrimeVueTheme from '@primeuix/themes/aura'
import { definePreset } from '@primeuix/themes'
import 'primeicons/primeicons.css'
import router from './router'

const app = createApp(App)

const slavicmedia = definePreset(PrimeVueTheme, {
  semantic: {
    primary: {
      50: '{slate.50}',
      100: '{slate.100}',
      200: '{slate.200}',
      300: '{slate.300}',
      400: '{slate.400}',
      500: '{slate.500}',
      600: '{slate.600}',
      700: '{slate.700}',
      800: '{slate.800}',
      900: '{slate.900}',
      950: '{slate.950}',
    },
  },
})

app.use(PrimeVue, {
  theme: {
    preset: slavicmedia,
  },
  options: {
    darkModeSelector: false || 'none',
  },
})

app.use(router)
app.mount('#app')
