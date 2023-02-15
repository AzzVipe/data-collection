export default defineNuxtRouteMiddleware((to, from) => {
	const { app: realmApp } = useMyRealmApp();
	let flag = false;

	if (realmApp.currentUser === null) {
		return abortNavigation();
	}

	realmApp.currentUser.callFunction("is_admin").then((data) => {
		flag = data;
	});

	if (!flag) return abortNavigation();

	navigateTo("");
});
