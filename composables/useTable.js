import graphqlOperation from "@/utils/graphql";

export const useMyTableData = async () => {
	let td;
	let graphql = JSON.stringify({
		query: `query {
			tableConfig(query: {name: "level-1"}) {
				_id
				config {
					field
					header
					type
				}
			}
		}`,
		variables: {},
	});

	await graphqlOperation(graphql).then((data) => {
		td = data;
	});

	return { td };
};
