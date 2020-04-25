import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";
import user from "./modules/example";

export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path*",
        component: () => import("@/views/redirect/index")
      }
    ]
  },
  {
    path: "/",
    component: Layout,
    redirect: "/standard",
    meta: { title: "about", icon: "home" },
    children: [
      {
        path: "standard",
        name: "standard",
        component: () => import("@/views/standard/index"),
        meta: { title: "系统标准", icon: "standard" }
      },
      {
        path: "about",
        name: "about",
        component: () => import("@/views/about/index"),
        meta: { title: "about", icon: "dashboard" }
      },
    ]
  },
  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true
  },
  user,
  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true }
];
const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}
export default router;
