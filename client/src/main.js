import { createApp } from 'vue'
import router from './router/index'
import App from './App.vue'
import toastPlugin from './components/toastPlugin'

const app = createApp(App);
app.use(router)
app.use(toastPlugin); // 使用插件
app.mount('#app')
