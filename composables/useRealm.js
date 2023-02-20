import * as Realm from "realm-web";
import axios from "axios";

export const useMyRealmApp = () => {
	const appId = useRuntimeConfig().public.APP_ID;

	const app = new Realm.App({
		id: appId,
	});

	const currentUser = app.currentUser;

	async function graphqlOperation(graphql) {
		let resData = null;
		const appId = useRuntimeConfig().public.APP_ID;

		const temp = Realm.getApp(appId);

		let requestOptions = {
			method: "post",
			maxBodyLength: Infinity,
			url: "https://eu-west-1.aws.realm.mongodb.com/api/client/v2.0/app/application-0-ksuyw/graphql",
			headers: {
				Authorization: `Bearer ${currentUser._accessToken}`,
				"Content-Type": "application/json",
			},
			data: graphql,
		};

		await axios(requestOptions)
			.then((response) => response.data)
			.then((result) => {
				resData = result.data;
			})
			.catch((error) => {
				resData = null;
				console.log("error", error.response);
				if (error.response.status === 401) navigateTo("/");
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

	async function fetchlevel3() {
		let temp;
		const graphql = JSON.stringify({
			query: `query {
				level3s {
					_id
					comments
					my_capability
					my_interest
					service
					created_at
					updated_at
					user_id
				}
			}`,
			variables: {},
		});

		await graphqlOperation(graphql).then((data) => {
			temp = data;
		});

		return temp;
	}

	async function fetchlevel2() {
		let temp;
		const graphql = JSON.stringify({
			query: `query {
				level2s {
					_id
					comments
					customer
					hours_next_3_months
					impact
					my_capability
					my_interest
					service
					service_quality
					skills
	        user_id
					created_at
					updated_at
				}
			}`,
			variables: {},
		});

		await graphqlOperation(graphql).then((data) => {
			temp = data;
		});

		return temp;
	}

	async function fetchlevel1() {
		let temp;
		const graphql = JSON.stringify({
			query: `query {
				level1s {
					_id
					comments
					customer
					hours_last_3_months
					hours_next_3_months
					impact
					my_capability
					my_interest
					service
					service_quality
					skills
	        user_id
					created_at
					updated_at
				}
			}`,
			variables: {},
		});

		await graphqlOperation(graphql).then((data) => {
			temp = data;
		});

		return temp;
	}

	async function fetchTableConfig(tableName) {
		let temp;
		let graphql = JSON.stringify({
			query: `query {
				tableConfig(query: {name: "${tableName}"}) {
					_id
					config {
						field
						header
						type
						description
					}
				}
			}`,
			variables: {},
		});

		await graphqlOperation(graphql).then((data) => {
			temp = data;
		});

		return temp;
	}

	return {
		app,
		Realm,
		fetchUsers,
		fetchlevel1,
		fetchlevel2,
		fetchlevel3,
		fetchTableConfig,
		currentUser,
		graphqlOperation,
	};
};
