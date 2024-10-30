export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@unocss/nuxt", "@pinia/nuxt", "@nuxtjs/i18n"],
  css: ["@unocss/reset/tailwind.css", "@/assets/styles/sidebar.css"],
  pages: true,
  components: true,
  unocss: {
    rules: [
      ["w-acalc(100%-0px)", { width: "calc(100% - 0px)" }],
      ["w-acalc(100%-222px)", { width: "calc(100% - 222px)" }],
    ],
    theme: {
      screens: {
        xl2: "1000px",
        xl3: "1600px",
      },
    },
  },
  i18n: {
    defaultLocale: "en",

    vueI18n: "./i18n.config.ts",
  },
  imports: {
    dirs: ["stores"],
  },
});
