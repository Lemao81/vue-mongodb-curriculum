import './assets/main.css'
import ToastPlugin from 'vue-toast-notification'
import type { ToastProps } from 'vue-toast-notification'
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
import { userApiService } from '@/services/apis/user-api-service'
import { authApiService } from '@/services/apis/auth-api-service'
import { curriculumApiService } from '@/services/apis/curriculum-api-service'
import axios from 'axios'
import { API_BASE_URL } from '@/consts/base-url-consts'
import appendRequestAuthorization from '@/interceptors/request-authorization-interceptor'
import { stringifyError } from '@/helpers/helper'

library.add(fas)

axios.defaults.baseURL = API_BASE_URL
axios.interceptors.request.use(appendRequestAuthorization, null, { runWhen: (request) => request.url?.startsWith(API_BASE_URL) || false })

const vuetify = createVuetify({ components, directives })

const app = createApp(App).component('fai', FontAwesomeIcon).component('VueDatePicker', VueDatePicker)
app.config.errorHandler = (error) => console.error(`ErrorHandler: ${stringifyError(error)}`)

app.use(createPinia())
app.use(router)
app.use(vuetify)

const toastOptions: ToastProps = {
  position: 'top-right'
}
// noinspection TypeScriptValidateTypes
app.use(ToastPlugin, toastOptions)

app.config.globalProperties.$userApi = userApiService
app.config.globalProperties.$authApi = authApiService
app.config.globalProperties.$curriculumApi = curriculumApiService

app.mount('#app')
