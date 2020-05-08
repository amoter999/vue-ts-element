import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
Vue.use(VueRouter);
const routes: Array<RouteConfig> = [
  {
    path: "*",
    redirect: "/Login/Login"
  },
  {
    path: "/Home/Home",
    name: "Home",
    component: () => import("@/views/Home/Home.vue")
  },
  {
    path: "/Login/Login",
    name: "Login",
    component: () => import("@/views/Login/Login.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
