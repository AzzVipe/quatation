<template>
	<div class="min-h-screen dark-gradient text-styling flex flex-col">
		<button
			id="theme-toggle"
			type="button"
			class="text-gray-500 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-full w-8 h-8">
			<i
				id="theme-toggle-dark-icon"
				class="hidden ri-moon-fill text-xl"
				fill="currentColor"></i>
			<i
				id="theme-toggle-light-icon"
				class="ri-moon-line hidden text-xl"
				fill="currentColor"></i>
		</button>
		<NuxtPage />
	</div>
</template>

<script setup>
	const { app, Realm, currentUser } = useMyRealmApp();

	onBeforeMount(async () => {
		if (currentUser === null) {
			console.log(loginAnonymous());
		} else console.log("Already logged in");
	});

	async function loginAnonymous() {
		const credentials = Realm.Credentials.anonymous();
		try {
			const user = await app.logIn(credentials);
			console.log(user);

			return user;
		} catch (err) {
			console.error("Failed to log in", err);
		}
	}

	onMounted(async () => {
		toggleDarkMode();
	});

	const toggleDarkMode = () => {
		let themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
		let themeToggleLightIcon = document.getElementById(
			"theme-toggle-light-icon"
		);

		if (
			localStorage.getItem("color-theme") === "dark" ||
			(!("color-theme" in localStorage) &&
				window.matchMedia("(prefers-color-scheme: dark)").matches)
		) {
			themeToggleLightIcon.classList.remove("hidden");
		} else {
			themeToggleDarkIcon.classList.remove("hidden");
		}

		let themeToggleBtn = document.getElementById("theme-toggle");

		themeToggleBtn.addEventListener("click", function () {
			themeToggleDarkIcon.classList.toggle("hidden");
			themeToggleLightIcon.classList.toggle("hidden");

			if (localStorage.getItem("color-theme")) {
				if (localStorage.getItem("color-theme") === "light") {
					document.documentElement.classList.add("dark");
					localStorage.setItem("color-theme", "dark");
				} else {
					document.documentElement.classList.remove("dark");
					localStorage.setItem("color-theme", "light");
				}
			} else {
				if (document.documentElement.classList.contains("dark")) {
					document.documentElement.classList.remove("dark");
					localStorage.setItem("color-theme", "light");
				} else {
					document.documentElement.classList.add("dark");
					localStorage.setItem("color-theme", "dark");
				}
			}
		});
	};
</script>
