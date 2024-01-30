import { createApp } from 'vue'
import './styles/style.css'
import App from './App.vue'
import * as VueRouter from 'vue-router'
import routes from './routes'

const app = createApp(App)
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})

app.use(router)
app.mount('#app')
