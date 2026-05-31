import { defineAsyncComponent } from "vue";
import PageLoading from "@/components/PageLoading.vue";

const pageComponent = (loader: () => Promise<unknown>) => defineAsyncComponent({
  loader: loader as () => Promise<any>,
  loadingComponent: PageLoading,
  delay: 120,
  suspensible: false,
});

export const routes = [
  {
    path: "/",
    name: "home",
    component: pageComponent(() => import("../views/HomeView.vue")),
    meta: {
      keepAlive: true,
      showPageHead: true,
    },
  },
  {
    path: "/archive",
    name: "archive",
    meta: {
      showPageHead: true,
      keepAlive: true,
    },
    component: pageComponent(() => import("../views/ArchiveView.vue")),
  },
  {
    path: "/media",
    name: "media",
    meta: {
      showPageHead: true,
    },
    component: pageComponent(() => import("../views/MediaView.vue")),
  },
  {
    path: "/about",
    name: "AboutView",
    meta: {
      showPageHead: true,
    },
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: pageComponent(() => import("../views/AboutView.vue")),
  },
  {
    path: "/post/:slug",
    name: "PostView",
    component: pageComponent(() => import("../views/PostView.vue")),
    props: true,
    // meta: {
    //   keepAlive: true,
    // }
  },
  {
    path: "/resume",
    name: "resume",
    component: pageComponent(() => import("../views/Resume.vue")),
  },
];
