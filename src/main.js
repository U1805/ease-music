import { createApp } from "vue";
import App from "./App.vue";
import less from "less";
import "@/assets/style.css";
import Vue3DraggableResizable from 'vue3-draggable-resizable'
//需引入默认样式
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'

const app = createApp(App);
app.use(less);
app.use(Vue3DraggableResizable)
app.mount("#app");

window.oncontextmenu=function(e){
    //取消默认的浏览器自带右键 很重要！！
    e.preventDefault();
}