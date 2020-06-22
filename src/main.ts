import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import axios from "axios";
import "font-awesome/css/font-awesome.css";

Vue.prototype.$http = axios;

// 注册全局组件：element-tree-grid
// 注册后，就可以在任意的单文件组件中使用了
// Vue.component(ElTreeGrid.name, ElTreeGrid)

// 配置基础路径
axios.defaults.baseURL = "http://localhost:8888/api/private/v1/";

// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 在此处，统一处理 请求头，处理后，就不需要在每个请求中，单独的处理了
    config.headers.Authorization = sessionStorage.getItem("token");
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
