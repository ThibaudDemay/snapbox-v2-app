// import "./plugins/axios";
import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueNativeSock from "vue-native-websocket-vue3";
import { createPinia } from "pinia";

createApp(App)
  .use(createPinia())
  .use(store)
  .use(router)
  .use(VueNativeSock, "ws://127.0.0.1:12700/ws/server", {
    store: store,
  })
  .mount("#app");
