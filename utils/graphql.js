import axios from "axios";

// const { app: realmApp } = useMyRealmApp();

export default async function graphqlOperation(graphql, accessToken) {
	let resData = null;
	console.log(accessToken);

	let requestOptions = {
		method: "post",
		maxBodyLength: Infinity,
		url: "https://eu-west-1.aws.realm.mongodb.com/api/client/v2.0/app/application-0-ksuyw/graphql",
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"Content-Type": "application/json",
		},
		data: graphql,
	};
	await axios(requestOptions)
		.then((response) => response.data)
		.then((result) => {
			resData = result.data;
			// console.log(realmApp.currentUser);
			// console.log(resData);
		})
		.catch((error) => {
			resData = null;
			console.log("error", error.response);
		});

	return resData;
}
