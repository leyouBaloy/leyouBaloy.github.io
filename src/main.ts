import { ViteSSG } from "vite-ssg";
import { createPinia } from "pinia";
// import naive from "naive-ui";

import App from "./App.vue";
import { routes } from "./router";

export const createApp = ViteSSG(
  App,
  {
    routes,
    scrollBehavior(_to, _from, savedPosition) {
      if (savedPosition) {
        return new Promise((resolve) => {
          requestAnimationFrame(() => {
            resolve(savedPosition);
          });
        });
      }

      return { top: 0 };
    },
  },
  ({ app, router, routes, isClient, initialState }) => {
    if (isClient && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    app.use(createPinia())
  }
);
