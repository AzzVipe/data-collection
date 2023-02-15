<template>
	<div>
		<div class="mt-14 p-4">
			<h1
				class="text-black dark:text-white text-2xl p-4 font-bold uppercase mt-4">
				Past / Continuing Stage
			</h1>
			<CustomTable
				:key="componentKey"
				:config="graphqlConfig"
				@re-render="reRender" />
			<h1 class="text-black dark:text-white text-2xl p-4 font-bold uppercase">
				New / Planned Stage
			</h1>
			<CustomTable
				:key="componentKey"
				:config="graphqlConfig2"
				@re-render="reRender" />
			<!-- <h1 class="text-black dark:text-white text-2xl p-4 font-bold uppercase">
				New / Planned Stage
			</h1>
			<CustomTable
				:key="componentKey"
				:config="graphqlConfig3"
				@re-render="reRender" /> -->
		</div>
	</div>
</template>

<script setup>
	import { initDropdowns } from "flowbite";
	const componentKey = ref(1);
	const { app: realmApp } = useMyRealmApp();

	const graphqlConfig = ref({
		tableName: "level-1",
		query: "level1s",
		insert: "insertOneLevel1",
		replace: "replaceOneLevel1",
		delete: "deleteOneLevel1",
		graphql: "",
	});
	const graphqlConfig2 = ref({
		tableName: "level-2",
		query: "level2s",
		insert: "insertOneLevel2",
		replace: "replaceOneLevel2",
		delete: "deleteOneLevel2",
		graphql: "",
	});

	const graphqlConfig3 = ref({
		tableName: "level-3",
		query: "level3s",
		insert: "insertOneLevel3",
		replace: "replaceOneLevel3",
		delete: "deleteOneLevel3",
		graphql: "",
	});

	const graphql = JSON.stringify({
		query: `query {
				${graphqlConfig.value.query} {
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
				}
			}`,
		variables: {},
	});

	const graphql2 = JSON.stringify({
		query: `query {
				${graphqlConfig2.value.query} {
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
				}
			}`,
		variables: {},
	});

	const graphql3 = JSON.stringify({
		query: `query {
				${graphqlConfig3.value.query} {
					_id
					user_id
					comments
					my_capability
					my_interest
					service 
				}
			}`,
		variables: {},
	});

	onBeforeMount(() => {
		graphqlConfig.value.graphql = graphql;
		graphqlConfig2.value.graphql = graphql2;
		graphqlConfig3.value.graphql = graphql3;
	});

	const reRender = () => {
		componentKey.value++;
	};

	onMounted(() => {
		initDropdowns();
	});
</script>

<style lang="scss" scoped></style>
