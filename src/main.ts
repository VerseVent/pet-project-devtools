import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import {apiReqInterceptor} from './api/interceptor'

const app = createApp(App)

apiReqInterceptor()

app.use(createPinia())
app.use(router)

app.mount('#app')
