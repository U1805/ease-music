import { createApp } from "vue";
import App from "./App.vue";
import less from "less";
import "@/assets/style.css";

const app = createApp(App);
app.use(less);
app.mount("#app");
