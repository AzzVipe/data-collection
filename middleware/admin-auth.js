export default defineNuxtRouteMiddleware((to, from) => {
	const { currentUser } = useMyRealmApp();

	if (currentUser === null) {
		// alert("Login First");
		return abortNavigation();
	}
	currentUser.callFunction("is_admin").then((data) => {
		if (data === false) abortNavigation();
	});

	navigateTo("");
});
