// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	css: [
		"@/assets/css/resets.css",
		"primevue/resources/themes/md-light-deeppurple/theme.css",
		"primevue/resources/primevue.css",
		"primeicons/primeicons.css",
		"@/assets/css/styles.css",
		"@/assets/css/input.css",
	],
	build: {
		transpile: ["primevue"],
	},

	runtimeConfig: {
		public: {
			APP_ID: "application-0-ksuyw",
		},
	},

	app: {
		head: {
			meta: [
				{ name: "viewport", content: "width=device-width, initial-scale=1" },
			],
			title: "Data Collection",
			link: [
				{
					href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap",
					rel: "stylesheet",
				},
				{
					href: "https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css",
					rel: "stylesheet",
				},
			],
		},
	},

	modules: ["@nuxtjs/tailwindcss"],
});
