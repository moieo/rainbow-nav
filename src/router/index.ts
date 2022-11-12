import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    meta: {
      title: "彩虹导航",
    },
    component: Home,
  },
  {
    path: "/about",
    name: "about",
    meta: {
      title: "关于",
    },
    component: import("@/views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.title && to.name === "home") {
    document.title = to.meta.title;
  } else if (to.meta.title) {
    document.title = `${to.meta.title} - 彩虹导航`;
  }
  next();
});
export default router;
