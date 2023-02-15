export default defineNuxtRouteMiddleware((to, from) => {
	const { app: realmApp } = useMyRealmApp();

	console.log(realmApp.currentUser);
	if (!realmApp.currentUser) {
		return abortNavigation();
	}
});
