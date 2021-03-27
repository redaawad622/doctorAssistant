require("./bootstrap");
import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./styles/_variables.scss";
import { addToVueProto } from "./helpers/addToVue";
Vue.config.productionTip = false;
addToVueProto(Vue);
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
