<template>
	<nav
		class="fixed shadow dark:shadow-slate-700 top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gradient dark:border-gray-700">
		<div class="px-3 py-3 lg:px-5 lg:pl-3">
			<div class="flex items-center justify-between">
				<div class="flex items-center justify-start">
					<NuxtLink to="/user" class="flex ml-2 cursor-pointer md:mr-24">
						<span
							class="self-center text-medium font-extrabold sm:text-2xl whitespace-nowrap dark:text-white tracking-wider"
							>HR Data Collection App</span
						>
					</NuxtLink>
				</div>
				<div class="flex items-center">
					<div class="flex items-center justify-center ml-3 gap-2 sm:gap-4">
						<button
							id="theme-toggle"
							type="button"
							class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-full w-8 h-8">
							<i
								id="theme-toggle-dark-icon"
								class="hidden ri-moon-fill text-xl"
								fill="currentColor"></i>
							<i
								id="theme-toggle-light-icon"
								class="ri-moon-line hidden text-xl"
								fill="currentColor"></i>
						</button>
						<div>
							<button
								v-if="userData !== null"
								type="button"
								class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
								aria-expanded="false"
								data-dropdown-toggle="dropdown-user">
								<span class="sr-only">Open user menu</span>
								<img
									referrerPolicy="no-referrer"
									class="w-8 h-8 rounded-full"
									:src="userData.image_url"
									alt="user photo" />
								<!-- <div
									class="w-8 h-8 rounded-full text-white flex justify-center items-center">
									<p class="font-bold">
										{{ userData.first_name[0] }} {{ userData.last_name[0] }}
									</p>
								</div> -->
							</button>
						</div>
						<div
							v-if="userData !== null"
							class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
							id="dropdown-user">
							<div class="px-4 py-3" role="none">
								<p class="text-sm text-gray-900 dark:text-white" role="none">
									{{ userData.full_name }}
								</p>
								<p
									class="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
									role="none">
									{{ userData.primary_email }}
								</p>
							</div>
							<ul class="py-1" role="none">
								<li>
									<NuxtLink
										to="/user"
										class="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
										role="menuitem">
										<p class="text-left">Dashboard</p>
									</NuxtLink>
								</li>
								<li>
									<button
										@click="emit('signOut')"
										class="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
										role="menuitem">
										<p class="text-left">Sign out</p>
									</button>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</nav>
</template>

<script setup>
	import {
		initDrawers,
		initDropdowns,
		initModals,
		initPopovers,
		initTooltips,
	} from "flowbite";

	const emit = defineEmits(["signOut"]);

	const { currentUser } = useMyRealmApp();
	const userData = ref(null);

	onBeforeMount(() => {
		userData.value = currentUser.customData;
	});

	onMounted(() => {
		initDrawers();
		initDropdowns();
		initModals();
		initPopovers();
		initTooltips();
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
