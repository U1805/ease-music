import { createApp } from 'vue'
import App from './App.vue'
import less from 'less'
import '@/assets/style.css'

import {getList} from '@/api'
getList(6722704953);

const app = createApp(App)
app.use(less)
app.mount('#app')



