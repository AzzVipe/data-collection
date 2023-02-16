<template>
	<div>
		<div class="mt-14 p-4">
			<div class="mt-4">
				<div class="flex justify-between p-4 items-center">
					<h1
						v-if="!submitted"
						class="font-bold text-black dark:text-gray-300 uppercase">
						Last Changed at:
						<span
							v-if="lastUpdatedAt !== null"
							class="dark:text-white text-gray-500 capitalize font-semibold"
							>{{ new Date(lastUpdatedAt).toUTCString() }}</span
						>
					</h1>
					<h1
						v-else-if="submitted"
						class="font-bold text-black dark:text-gray-300 uppercase">
						Submitted at:
						<span
							class="dark:text-white text-gray-500 capitalize font-semibold"
							>{{ new Date(Date(submittedAt)).toUTCString() }}</span
						>
					</h1>
					<button
						v-if="!submitted"
						data-modal-target="submitModal"
						data-modal-toggle="submitModal"
						class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
						Submit
					</button>

					<div
						v-if="!submitted"
						id="submitModal"
						data-modal-backdrop="static"
						tabindex="-1"
						aria-hidden="true"
						class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
						<div class="relative w-full h-full max-w-2xl md:h-auto">
							<div
								class="relative bg-white rounded-lg shadow-md dark:bg-gray-700">
								<div
									class="flex items-start justify-between p-6 border-b rounded-t dark:border-gray-600">
									<h3
										class="text-xl font-semibold text-gray-900 dark:text-white">
										Are you sure, you want to submit ?
									</h3>
									<button
										type="button"
										class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
										data-modal-hide="submitModal">
										<svg
											class="w-5 h-5"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg">
											<path
												fill-rule="evenodd"
												d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
												clip-rule="evenodd"></path>
										</svg>
									</button>
								</div>
								<!-- Modal body -->
								<div class="p-6 space-y-6">
									<p
										class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
										You won't be able to change the records once you submit it.
										We request you to check all the records before submitting.
									</p>
								</div>
								<div
									class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
									<button
										@click="submitTable"
										data-modal-hide="submitModal"
										type="button"
										class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
										Submit
									</button>
									<button
										data-modal-hide="submitModal"
										type="button"
										class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
										Don't submit
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div
					class="md:flex items-center p-4 justify-between gap-4 text-black dark:text-white">
					<h1 class="text-2xl font-bold uppercase">Past / Continuing Stage</h1>
					<div class="xl:flex gap-4 uppercase font-bold dark:text-gray-300">
						<p>
							Total hours last 3 Months:
							<span class="dark:text-white text-gray-500 font-semibold"
								>{{ totalHourLevel1last }} Hours</span
							>
						</p>
						<p>
							Total hours next 3 Months:
							<span class="dark:text-white text-gray-500 font-semibold"
								>{{ totalHourLevel1next }} Hours</span
							>
						</p>
					</div>
				</div>

				<CustomTable
					v-if="level1 !== null"
					:key="componentKey"
					:config="graphqlConfig"
					:tableData="level1"
					:submitted="submitted"
					@re-render="reRender" />
			</div>

			<div>
				<div
					class="flex items-center p-4 justify-between gap-4 text-black dark:text-white">
					<h1 class="text-2xl font-bold uppercase">New / Planned Stage</h1>
					<div class="flex gap-4 uppercase font-semibold dark:text-gray-300">
						<p>
							Total hours next 3 Months:
							<span class="dark:text-white text-gray-500"
								>{{ totalHourLevel2next }} Hours</span
							>
						</p>
					</div>
				</div>
				<CustomTable
					v-if="level2 !== null"
					:key="componentKey"
					:tableData="level2"
					:config="graphqlConfig2"
					:submitted="submitted"
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
					:submitted="submitted"
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
	const lastUpdatedAt = ref(null);
	const level2 = ref(null);
	const level3 = ref(null);
	const submitted = ref();
	const submittedAt = ref(null);
	const { fetchlevel1, fetchlevel2, fetchlevel3, currentUser } =
		useMyRealmApp();

	if (currentUser.customData.form_status === "submitted") {
		submitted.value = true;
		console.log(currentUser.customData.submitted_at.$date.$numberLong);
		submittedAt.value = currentUser.customData.submitted_at.$date.$numberLong;
	} else submitted.value = false;

	await fetchlevel1().then((data) => {
		level1.value = data.level1s;
	});

	await fetchlevel2().then((data) => {
		level2.value = data.level2s;
	});

	await fetchlevel3().then((data) => {
		level3.value = data.level3s;
	});

	const submitTable = async () => {
		// @TODO: check if any table row or table column is empty
		await currentUser.callFunction("submit_table");
		currentUser.refreshCustomData();
		submitted.value = true;
		reRender();
	};

	const calculateLastUpdatedAt = (newData) => {
		if (newData) {
			console.log("calculating");
			newData.forEach((data) => {
				if (lastUpdatedAt.value === null) lastUpdatedAt.value = data.updated_at;
				else if (lastUpdatedAt.value < data.updated_at) {
					lastUpdatedAt.value = data.updated_at;
				}
			});
			console.log(new Date(lastUpdatedAt.value).toTimeString());
			return;
		}
		level1.value.forEach((data) => {
			if (lastUpdatedAt.value === null) lastUpdatedAt.value = data.updated_at;
			else if (lastUpdatedAt.value < data.updated_at) {
				lastUpdatedAt.value = data.updated_at;
			}
		});
		level2.value.forEach((data) => {
			if (lastUpdatedAt.value === null) lastUpdatedAt.value = data.updated_at;
			else if (lastUpdatedAt.value < data.updated_at) {
				lastUpdatedAt.value = data.updated_at;
			}
		});
		level3.value.forEach((data) => {
			if (lastUpdatedAt.value === null) lastUpdatedAt.value = data.updated_at;
			else if (lastUpdatedAt.value < data.updated_at) {
				lastUpdatedAt.value = data.updated_at;
			}
		});
	};

	level1.value.forEach((data) => {
		totalHourLevel1last.value += new Number(data.hours_last_3_months);
		totalHourLevel1next.value += new Number(data.hours_next_3_months);
	});

	level2.value.forEach((data) => {
		totalHourLevel2next.value += new Number(data.hours_next_3_months);
	});
	calculateLastUpdatedAt();

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
		calculateLastUpdatedAt(newVal);
	});

	watch(level2.value, (newVal, oldVal) => {
		totalHourLevel2next.value = 0;
		level2.value.forEach((data) => {
			totalHourLevel2next.value += new Number(data.hours_next_3_months);
		});
		calculateLastUpdatedAt(newVal);
	});
</script>

<style lang="scss" scoped></style>
