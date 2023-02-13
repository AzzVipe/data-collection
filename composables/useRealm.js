import * as Realm from "realm-web";

export const useMyRealmApp = () => {
	const config = useRuntimeConfig();
	const appId = config.public.APP_ID;

	const app = new Realm.App({
		id: appId,
	});

	const currentUser = app.currentUser;

	return { app, Realm, currentUser };
};
