import * as Realm from "realm-web";

export const useMyRealmApp = () => {
	const appId = import.meta.env.VITE_REALM_APP_ID;

	const app = new Realm.App({
		id: appId,
	});

	const logout = () => {
		app.currentUser.logOut();
	};
	// const printHello = "hey";
	// const printHello = () => {
	// 	console.log("hello world");
	// };

	// return { app, appId, printHello };
	return { app, Realm, logout };
};
