import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import component from './plugins/component'
import antd from './plugins/antd'

import 'tailwindcss/tailwind.css'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(component)
app.use(antd)

app.mount('#app')
