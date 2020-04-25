import Vue from "vue";

import Cookies from "js-cookie";

import "normalize.css/normalize.css"; // a modern alternative to CSS resets

import Element from "element-ui";
import "./styles/element-variables.scss";
import "./styles/response.scss";

import "@/styles/index.scss"; // global css

import App from "./App";
import store from "./store/index";
import router from "./router";

import "./icons"; // icon
// import "./permission"; // permission control
import * as filters from "./filters";

Vue.use(Element, {
  size: Cookies.get("size") || "medium" // set element-ui default size
});
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
