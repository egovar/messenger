import Vue from "vue";
import VueRouter from "vue-router";
import Messenger from "@/views/Messenger";

Vue.use(VueRouter);

const routes = [
  {
    path: "/:dialogId?",
    name: "Messenger",
    component: Messenger,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
