
import { createApp } from 'vue'
import App from './App.vue'

import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


import { BootstrapVue3 } from 'bootstrap-vue-3'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import PrimeVue from 'primevue/config';



const app = createApp(App)

app.use(BootstrapVue3)
app.use(PrimeVue);
app.mount('#app')
createApp(App).use(autoAnimatePlugin).mount('#app')