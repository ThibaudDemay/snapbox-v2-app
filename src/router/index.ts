import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/views/Home.vue";
import CountdownView from "@/views/Countdown.vue";
import SnapView from "@/views/Snap.vue";
import PictureView from "@/views/Picture.vue";
import ConfView from "@/views/Conf.vue";

// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
// component: () =>
// import(/* webpackChunkName: "about" */ "../views/Conf.vue")

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "HomeView",
    component: HomeView,
  },
  {
    path: "/countdown",
    name: "CountdownView",
    component: CountdownView,
  },
  {
    path: "/snap",
    name: "SnapView",
    component: SnapView,
  },
  {
    path: "/picture/:id",
    name: "PictureView",
    component: PictureView,
  },
  {
    path: "/conf",
    name: "ConfView",
    component: ConfView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
