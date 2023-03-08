export default defineNuxtConfig({
	css: [
		"@/assets/css/resets.css",
		"@/assets/css/styles.css",
		"@/assets/css/input.css",
	],

	runtimeConfig: {
		public: {
			APP_ID: process.env.VITE_REALM_APP_ID,
			APP_NAME: process.env.VITE_APP_NAME,
			INSTRUCTION_VIDEO_URL: process.env.VITE_INSTRUCTION_VIDEO_URL,
		},
	},

	debug: true,

	app: {
		head: {
			meta: [
				{ name: "viewport", content: "width=device-width, initial-scale=1" },
			],
			title: "RADAR 2023",
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

	modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
	// plugins: ["realm"]
});
