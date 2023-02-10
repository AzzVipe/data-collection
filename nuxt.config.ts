// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	css: [
		"@/assets/css/resets.css",
		"primevue/resources/themes/md-light-deeppurple/theme.css",
		"primevue/resources/primevue.css",
		"primeicons/primeicons.css",
		"primeflex/primeflex.css",
		"@/assets/css/styles.css",
	],
	build: {
		transpile: ["primevue"],
	},

	runtimeConfig: {
		public: {
			APP_ID: process.env.APP_ID_,
		},
	},

	// modules: ["@nuxtjs/tailwindcss"],
});
