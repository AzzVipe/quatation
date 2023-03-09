export default defineNuxtConfig({
	css: ["@/assets/css/resets.css", "@/assets/css/input.css"],
	runtimeConfig: {
		public: {
			APP_ID: "application-0-jpzal",
		},
	},
	app: {
		head: {
			script: [
				{
					src: "https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.3/datepicker.min.js",
				},
			],
			meta: [
				{ name: "viewport", content: "width=device-width, initial-scale=1" },
			],
			title: "Test",
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
	debug: true,
	modules: ["@nuxtjs/tailwindcss"],
});
