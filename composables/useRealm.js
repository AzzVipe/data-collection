import * as Realm from "realm-web";

export const useMyRealmApp = () => {
	const appId = import.meta.env.VITE_REALM_APP_ID;

	const app = new Realm.App({
		id: appId,
	});

	const currentUser = app.currentUser;

	return { app, Realm, currentUser };
};
