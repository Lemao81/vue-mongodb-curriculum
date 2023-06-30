import './assets/main.css'
import ToastPlugin, { ToastProps } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

library.add(fas)

const vuetify = createVuetify({
  components,
  directives
})

const app = createApp(App).component('fai', FontAwesomeIcon).component('VueDatePicker', VueDatePicker)
app.config.errorHandler = (error) => console.error(`Global: ${JSON.stringify(error)}`)

app.use(createPinia())
app.use(router)
app.use(vuetify)

const toastOptions: ToastProps = {
  position: 'top-right'
}
// noinspection TypeScriptValidateTypes
app.use(ToastPlugin, toastOptions)

app.mount('#app')
