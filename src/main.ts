import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "bootstrap/scss/bootstrap.scss";
import "bootstrap/dist/js/bootstrap.min.js";
import "font-awesome/scss/font-awesome.scss";
import router from "./router";

createApp(App).use(router).mount("#app");
