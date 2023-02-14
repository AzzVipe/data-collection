<template>
	<div>
		<NavBar @sign-out="signOut" />
		<SideBar />

		<div
			class="sm:ml-56 mt-14 min-container-height bg-gray-50 dark:bg-gradient2">
			<NuxtPage />
		</div>
	</div>
</template>

<script setup>
	import {
		initDrawers,
		initDropdowns,
		initModals,
		initPopovers,
		initTooltips,
	} from "flowbite";

	// definePageMeta({ middleware: ["auth"] });

	const { currentUser, app: realmApp, fetchUsers } = useMyRealmApp();
	const users = ref();

	onMounted(() => {
		fetchUsers().then((data) => {
			users.value = data;
			console.log(data);
		});
		initDrawers();
		initDropdowns();
		initModals();
		initPopovers();
		initTooltips();
	});

	const signOut = () => {
		realmApp.currentUser.logOut();
		localStorage.clear();
		navigateTo("");
	};
</script>

<style scoped></style>
