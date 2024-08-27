import { ViteSSG } from "vite-ssg";
import { createPinia } from "pinia";
// import naive from "naive-ui";

import App from "./App.vue";
import { routes } from "./router";

export const createApp = ViteSSG(
  App,
  { routes },
  ({ app, router, routes, isClient, initialState }) => {
    app.use(createPinia())
  }
);
