import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store/index'

import { Button, Menu } from 'ant-design-vue'
import Pie from './components/charts/Pie.vue'

const app = createApp(App)

app.use(store, key)
app.use(router)

app.use(Button)
app.use(Menu)

app.component('x-pie', Pie)

app.mount('#app')
