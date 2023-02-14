import axios from "axios";

const { app: realmApp } = useMyRealmApp();

export default async function graphqlOperation(graphql) {
	let resData = null;

	let requestOptions = {
		method: "post",
		maxBodyLength: Infinity,
		url: "https://eu-west-1.aws.realm.mongodb.com/api/client/v2.0/app/application-0-ksuyw/graphql",
		headers: {
			Authorization: `Bearer ${realmApp.currentUser._accessToken}`,
			"Content-Type": "application/json",
		},
		data: graphql,
	};
	await axios(requestOptions)
		.then((response) => response.data)
		.then((result) => {
			resData = result.data;
			// console.log(resData);
		})
		.catch((error) => {
			resData = null;
			console.log("error", error.response);
		});

	return resData;
}
