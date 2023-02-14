import graphqlOperation from "@/utils/graphql";

export const useMyTableData = async () => {
	let tempData = ref();
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
		tempData.value = data.tableConfig.config;
	});

	console.log(tempData.value);
	return tempData.value;
};
