<template>
	<div>
		<NavBar @sign-out="signOut" />
		<div
			class="min-[2000]:ml-56 mt-14 min-container-height bg-gray-50 dark:bg-gradient2">
			<NuxtPage />
		</div>
	</div>
</template>

<script setup>
	const { app: realmApp } = useMyRealmApp();
	// const router = useRouter();

	// if (realmApp.currentUser === null) router.back();

	const signOut = () => {
		realmApp.currentUser.logOut();
		localStorage.clear();
		navigateTo("/");
	};
</script>

<style scoped></style>
