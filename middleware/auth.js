import * as Realm from "realm-web";

export default defineNuxtRouteMiddleware((to, from) => {
	const config = useRuntimeConfig();
	const realmApp = Realm.getApp(config.APP_ID);

	if (realmApp.currentUser === null) {
		// alert("Login First");
		abortNavigation();
	}
});
