// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/apollo"],
  apollo: {
    clients: { default: { httpEndpoint: "https://linkdung-service-nolepdev.koyeb.app/query" } },
  },
  app: {
    head: {
      title: "LinkDung",
      link: [{ rel: "icon", type: "image/png", href: "/img/NolepDev.png" }],
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width,initial-scale=1" },
        { hid: "description", name: "description", content: "" },
        { name: "format-detection", content: "telephone=no" },
      ],
    },
  },
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
