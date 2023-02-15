<template>
	<div>
		<div class="mt-14 p-4">
			<div class="mt-4">
				<div
					class="md:flex items-center p-4 justify-between gap-4 text-black dark:text-white">
					<h1 class="text-2xl font-bold uppercase">Past / Continuing Stage</h1>
					<div class="xl:flex gap-4 uppercase">
						<p>Total hours last 3 Months: {{ totalHourLevel1last }} Hours</p>
						<p>Total hours next 3 Months: {{ totalHourLevel1next }} Hours</p>
					</div>
				</div>

				<CustomTable
					v-if="level1 !== null"
					:key="componentKey"
					:config="graphqlConfig"
					:tableData="level1"
					@re-render="reRender" />
			</div>

			<div>
				<div
					class="flex items-center p-4 justify-between gap-4 text-black dark:text-white">
					<h1 class="text-2xl font-bold uppercase">New / Planned Stage</h1>
					<div class="flex gap-4 uppercase">
						<p>Total hours next 3 Months: {{ totalHourLevel2next }} Hours</p>
					</div>
				</div>
				<CustomTable
					v-if="level2 !== null"
					:key="componentKey"
					:tableData="level2"
					:config="graphqlConfig2"
					@re-render="reRender" />
			</div>
			<div>
				<h1 class="text-black dark:text-white text-2xl p-4 font-bold uppercase">
					New / Desired Stage
				</h1>
				<CustomTable
					v-if="level3 !== null"
					:tableData="level3"
					:key="componentKey"
					:config="graphqlConfig3"
					@re-render="reRender" />
			</div>
		</div>
	</div>
</template>

<script setup>
	import { initDropdowns } from "flowbite";
	const componentKey = ref(1);
	const level1 = ref(null);
	const totalHourLevel1last = ref(0);
	const totalHourLevel1next = ref(0);
	const totalHourLevel2next = ref(0);
	const level2 = ref(null);
	const level3 = ref(null);
	const { fetchlevel1, fetchlevel2, fetchlevel3 } = useMyRealmApp();

	await fetchlevel1().then((data) => {
		level1.value = data.level1s;
	});

	await fetchlevel2().then((data) => {
		level2.value = data.level2s;
	});

	await fetchlevel3().then((data) => {
		level3.value = data.level3s;
	});

	level1.value.forEach((data) => {
		totalHourLevel1last.value += new Number(data.hours_last_3_months);
		totalHourLevel1next.value += new Number(data.hours_next_3_months);
	});

	level2.value.forEach((data) => {
		totalHourLevel2next.value += new Number(data.hours_next_3_months);
	});

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

	watch(level1.value, (newVal, oldVal) => {
		totalHourLevel1last.value = 0;
		totalHourLevel1next.value = 0;
		level1.value.forEach((data) => {
			totalHourLevel1last.value += new Number(data.hours_last_3_months);
			totalHourLevel1next.value += new Number(data.hours_next_3_months);
		});
	});

	watch(level2.value, (newVal, oldVal) => {
		totalHourLevel2next.value = 0;
		level2.value.forEach((data) => {
			totalHourLevel2next.value += new Number(data.hours_next_3_months);
		});
	});
</script>

<style lang="scss" scoped></style>
