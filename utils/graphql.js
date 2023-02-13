const { app: realmApp } = useMyRealmApp();

export default async function graphqlOperation(graphql) {
	let myHeaders = new Headers();
	let resData;

	myHeaders.append(
		"Authorization",
		`Bearer ${realmApp.currentUser._accessToken}`
	);
	myHeaders.append("Content-Type", "application/json");

	let requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: graphql,
		redirect: "follow",
	};

	await fetch(
		"https://eu-west-1.aws.realm.mongodb.com/api/client/v2.0/app/application-0-ksuyw/graphql",
		requestOptions
	)
		.then((response) => response.json())
		.then((result) => {
			resData = result.data;
			console.log(resData);
		})
		.catch((error) => console.log("error", error));

	return resData;
}
