import { createApp } from 'vue'
import App from './App.vue'
import less from 'less'
import '@/assets/style.css'

// import {getDetail} from '@/api'
// getDetail(1856722728);

const app = createApp(App)
app.use(less)
app.mount('#app')



