import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
Vue.use(VueRouter);
const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    redirect: "/users"
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/Home/Home.vue"),
    children: [
      {
        path: "/homemain",
        name: "homemain",
        component: () => import("@/views/Home/HomeMain.vue")
      },
      {
        path: "/users",
        name: "users",
        component: () => import("@/views/User/User.vue")
      },

      {
        path: "/roles",
        name: "roles",
        component: () => import("@/views/Rights/Role.vue")
      },
      {
        path: "/rights",
        name: "rights",
        component: () => import("@/views/Rights/Rights.vue")
      },
      {
        path: "/goods",
        name: "goods",
        component: () => import("@/views/Goods/Goods.vue")
      },
      {
        path: "/categories",
        name: "categories",
        component: () => import("@/views/Goods/GoodsCate.vue")
      },
      {
        path: "/params",
        name: "params",
        component: () => import("@/views/Goods/Categary.vue")
      },
      {
        path: "/orders",
        name: "orders",
        component: () => import("@/views/Order/Order.vue")
      },
      {
        path: "/reports",
        name: "reports",
        component: () => import("@/views/Data/Data.vue")
      },
      {
        path: "/profile",
        name: "profile",
        component: () => import("@/views/Profile/Profile.vue")
      },
      {
        path: "/error404",
        name: "error404",
        component: () => import("@/views/Error404/Error404.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login/Login.vue")
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to: any, from: any, next: any) => {
  console.log(to);
  if (to.path === "/login") {
    return next();
  }
  const token = localStorage.getItem("token");
  if (token) {
    next();
  } else {
    next("/login");
  }
});

export default router;
