import Vue from "vue";

import Cookies from "js-cookie";

import "normalize.css/normalize.css"; // CSS重置的替代方法

import Element from "element-ui";
import "./styles/element-variables.scss";
import "./styles/response.scss";

import "@/styles/index.scss"; // 全局 css

import App from "./App";
import store from "./store/index";
import router from "./router";

import "./icons"; // icon
// import "./permission"; // 权限控制
import * as filters from "./filters";

Vue.use(Element, {
  size: Cookies.get("size") || "medium" // 设置 element-ui 默认大小
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
