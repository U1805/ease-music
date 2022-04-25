import { createApp } from "vue";
import App from "./App.vue";
import less from "less";
import "@/assets/style.css";

const app = createApp(App);
app.use(less);
app.mount("#app");

window.oncontextmenu=function(e){
    //取消默认的浏览器自带右键 很重要！！
    e.preventDefault();
}