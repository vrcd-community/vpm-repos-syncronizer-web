import Aura from '@primeuix/themes/aura'
import { createHead } from '@unhead/vue/client'
import PrimeVue from 'primevue/config'
import Ripple from 'primevue/ripple'
import Tooltip from 'primevue/tooltip'
import { createApp } from 'vue'
import App from './app.vue'
import router from './router'
import './assets/css/tailwind.css'
import './assets/css/main.css'

const app = createApp(App)

app.use(router)
app.use(createHead())
app.use(PrimeVue, {
  ripple: true,
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.dark-mode',
      cssLayer: {
        name: 'primevue',
        order: 'theme, base, primevue',
      },
    },
  },
})
app.directive('ripple', Ripple)
app.directive('tooltip', Tooltip)

app.mount('#app')
