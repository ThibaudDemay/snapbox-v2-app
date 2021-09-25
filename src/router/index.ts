import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import UploadView from "@/views/Upload.vue";
import FluxView from "@/views/Flux.vue";
import ConfigView from "@/views/Config.vue";
import HomeAppView from "@/views/app/HomeApp.vue";
import CountdownView from "@/views/app/Countdown.vue";
import SnapView from "@/views/app/Snap.vue";
import PictureView from "@/views/app/Picture.vue";
import ConfView from "@/views/app/Conf.vue";

// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
// component: () =>
// import(/* webpackChunkName: "about" */ "../views/Conf.vue")

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    alias: ["/upload"],
    name: "UploadView",
    component: UploadView,
  },
  {
    path: "/flux",
    name: "FluxView",
    component: FluxView,
  },
  {
    path: "/config",
    name: "ConfigView",
    component: ConfigView,
  },
  {
    path: "/app",
    alias: ["/app/home"],
    name: "HomeAppView",
    meta: { layout: "app" },
    component: HomeAppView,
  },
  {
    path: "/app/countdown",
    name: "CountdownView",
    meta: { layout: "app" },
    component: CountdownView,
  },
  {
    path: "/app/snap",
    name: "SnapView",
    meta: { layout: "app" },
    component: SnapView,
  },
  {
    path: "/app/picture/:id",
    name: "PictureView",
    meta: { layout: "app" },
    component: PictureView,
  },
  {
    path: "/app/conf",
    name: "ConfView",
    meta: { layout: "app" },
    component: ConfView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
