export default defineNuxtRouteMiddleware((to, from) => {
	const { currentUser } = useMyRealmApp();
	console.log(currentUser);
	if (currentUser === null) {
		console.log("test");
		return abortNavigation();
	} else {
		navigateTo("/");
	}
});
