import * as Realm from "realm-web";
import axios from "axios";
// import graphqlOperation from "@/utils/graphql";

export const useMyRealmApp = () => {
	const appId = "application-0-ksuyw";

	let app = new Realm.App({
		id: appId,
	});

	const getApp = () => {
		return Realm.getApp(appId);
	};

	const getCurrentUser = () => {
		return new Promise((resolve, reject) => {
			const app = getApp();
			resolve(app.currentUser);
		});
	};

	async function graphqlOperation(graphql) {
		let resData = null;

		let requestOptions = {
			method: "post",
			maxBodyLength: Infinity,
			url: "https://eu-west-1.aws.realm.mongodb.com/api/client/v2.0/app/application-0-ksuyw/graphql",
			headers: {
				Authorization: `Bearer ${app.currentUser._accessToken}`,
				"Content-Type": "application/json",
			},
			data: graphql,
		};

		await axios(requestOptions)
			.then((response) => response.data)
			.then((result) => {
				resData = result.data;
				console.log(resData);
			})
			.catch((error) => {
				resData = null;
				console.log("error", error.response);
			});

		return resData;
	}

	async function fetchUsers() {
		let temp;
		const graphql = JSON.stringify({
			query: `query {
				users {
					_id
					created_at
					dob
					first_name
					form_status
					full_name
					image_url
					job_title
					last_name
					modified_at
					primary_email
					primary_phone
					role
					user_id
					website
				}
			}`,
			variables: {},
		});

		await graphqlOperation(graphql).then((data) => {
			temp = data.users;
			console.log(temp);
		});

		return temp;
	}

	return { app, Realm, fetchUsers, getApp, getCurrentUser };
};
