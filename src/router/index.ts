import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
Vue.use(VueRouter);
const routes: Array<RouteConfig> = [
  {
    path: "*",
    redirect: "/Home/Home"
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
  },
  {
    path: "/Profile/Profile",
    name: "Profile",
    component: () => import("@/views/Profile/Profile.vue")
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to: any, from: any, next: any) => {
  console.log(to);
  if (to.path === "/Login/Login") {
    return next();
  }
  const token = localStorage.getItem("token");
  if (token) {
    next();
  } else {
    next("/Login/Login");
  }
});

export default router;
