import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app=createApp(App)// 创建实例
app.use(router)
app.use(store)
app.mount('#app')
