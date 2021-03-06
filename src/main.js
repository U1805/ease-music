import { createApp } from "vue";
import App from "./App.vue";
import less from "less";
import "@/assets/style.less";
import Vue3DraggableResizable from "vue3-draggable-resizable";
import "vue3-draggable-resizable/dist/Vue3DraggableResizable.css";
import { createStore } from "vuex";

// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      info: { song: "Stay Light", singer: "Niha", id: 29392941, picUrl: "http://p1.music.126.net/inLyNRNb8tdNYV8Fhn9UQA==/109951165777935908.jpg" },
    };
  },
  mutations: {
    showInfo(state, data) {
      state.info = data;
    },
  },
});

const app = createApp(App);
app.use(less);
app.use(Vue3DraggableResizable);
app.use(store);
app.mount("#app");

window.oncontextmenu =()=>false 
window.ondragstart=()=>false 
window.onselectstart =()=>false 
window.onselect=()=>false 
window.oncopy=()=>false 
window.onbeforecopy=()=>false 
window.onmouseup=()=>false 