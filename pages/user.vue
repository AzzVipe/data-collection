<template>
	<div>
		<NavBar @sign-out="signOut" />
		<SideBar />

		<div
			class="min-[2000]:ml-56 mt-14 min-container-height bg-gray-50 dark:bg-gradient2">
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

	definePageMeta({
		validate: async (route) => {
			const { getCurrentUser } = useMyRealmApp();
			let flag;

			await getCurrentUser().then((currentUser) => {
				console.log(currentUser);
				if (currentUser === null) flag = false;
				else flag = true;
				console.log(flag);
			});
			console.log(flag);

			return flag;
		},
	});

	const { fetchUsers, app: realmApp } = useMyRealmApp();
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
