<template>
	<div>
		<div class="mt-14 md:p-4 p-2 flex flex-col">
			<div v-if="isFetching" role="status" class="p-4 self-center">
				<svg
					aria-hidden="true"
					class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
					viewBox="0 0 100 101"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
						fill="currentColor" />
					<path
						d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
						fill="currentFill" />
				</svg>
				<span class="sr-only">Loading...</span>
			</div>
			<div
				v-if="!isFetching"
				class="flex justify-between p-4 items-start gap-2 flex-col sm:flex-row sm:items-center">
				<h1
					v-if="submitted === false"
					class="font-bold text-black dark:text-gray-300">
					Last Changed at:
					<span
						v-if="lastUpdatedAt !== null"
						class="dark:text-white text-gray-500 capitalize font-semibold"
						>{{ new Date(lastUpdatedAt).toUTCString() }}</span
					>
				</h1>
				<h1 v-else class="font-bold text-black dark:text-gray-300">
					Submitted at:
					<span
						v-if="submittedAt !== null"
						class="dark:text-white text-gray-500 capitalize font-semibold"
						>{{ new Date(submittedAt).toUTCString() }}</span
					>
				</h1>
			</div>
			<div v-if="!isFetching">
				<div
					class="flex p-4 items-start justify-between gap-2 text-black dark:text-white flex-col md:flex-row">
					<h1 class="text-2xl font-bold">Past / Continuing Stage</h1>
					<div
						class="flex xl:gap-2 font-bold md:items-end dark:text-gray-300 flex-col xl:flex-row">
						<p class="capitalize">
							Total hours last 3 Months:
							<span class="dark:text-white text-gray-500 ml-auto"
								>{{ totalHourLevel1last }} Hours</span
							>
						</p>
						<p class="capitalize">
							Total hours next 3 Months:
							<span class="dark:text-white text-gray-500"
								>{{ totalHourLevel1next }} Hours</span
							>
						</p>
					</div>
				</div>

				<CustomTable
					v-if="level1 !== null"
					:key="componentKey"
					:config="graphqlConfig"
					:columns="level1Config"
					:tableData="level1"
					:submitted="submitted"
					@updated-data="updatedCallback"
					@deleted="deletedCallback"
					@re-render="reRender" />
			</div>
			<div v-if="!isFetching">
				<div
					class="flex p-4 items-start justify-between gap-2 text-black dark:text-white flex-col md:flex-row">
					<h1 class="text-2xl font-bold">New / Planned Stage</h1>
				</div>
				<CustomTable
					v-if="level2 !== null"
					:key="componentKey"
					:columns="level2Config"
					:tableData="level2"
					:config="graphqlConfig2"
					:submitted="submitted"
					@updated-data="updatedCallback"
					@deleted="deletedCallback"
					@re-render="reRender" />
			</div>

			<div v-if="!isFetching">
				<h1 class="text-black dark:text-white text-2xl p-4 font-bold">
					New / Desired Stage
				</h1>
				<CustomTable
					v-if="level3 !== null"
					:tableData="level3"
					:columns="level3Config"
					:key="componentKey"
					:submitted="submitted"
					@updated-data="updatedCallback"
					@deleted="deletedCallback"
					:config="graphqlConfig3"
					@re-render="reRender" />
			</div>
			<div v-if="!isFetching" class="p-4 self-center">
				<button
					type="button"
					v-if="!submitted && isTableNotEmpty() === false"
					data-modal-target="submitModal"
					data-modal-toggle="submitModal"
					disabled
					class="text-white bg-gradient-to-r from-green-600/80 via-green-700/80 to-green-800/70 font-semibold rounded-lg text-2xl px-5 py-2.5 text-center !cursor-not-allowed">
					Submit
				</button>
				<button
					data-modal-target="submitModal"
					data-modal-toggle="submitModal"
					@click="submitModal.show()"
					v-if="!submitted && isTableNotEmpty() !== false"
					class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-semibold rounded-lg text-2xl px-5 py-2.5 text-center">
					Submit
				</button>
				<div
					id="submitModal"
					tabindex="-1"
					aria-hidden="true"
					class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
					<div class="relative w-full h-full max-w-2xl md:h-auto">
						<div
							class="relative bg-white rounded-lg shadow-md dark:bg-gray-700">
							<div
								class="flex items-start justify-between p-6 border-b rounded-t dark:border-gray-600">
								<h3 class="text-xl font-semibold text-gray-900 dark:text-white">
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
							<div class="p-6 space-y-6">
								<p
									class="text-base leading-relaxed text-gray-500 dark:text-gray-300">
									You won't be able to change the records once you submit it. We
									request you to check all the records before submitting.
								</p>
							</div>
							<div
								class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
								<button
									@click="submitTable"
									data-modal-hide="submitModal"
									type="button"
									class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
									Yes, submit
								</button>
								<button
									data-modal-hide="submitModal"
									type="button"
									class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-900 dark:focus:ring-gray-600">
									Don't submit
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { initDropdowns, Modal } from "flowbite";

	const componentKey = ref(1);
	const totalHourLevel1last = ref(0);
	const totalHourLevel1next = ref(0);
	const totalHourLevel2next = ref(0);
	const lastUpdatedAt = ref(null);
	const level1 = ref(null);
	const level2 = ref(null);
	const level3 = ref(null);
	const level1Config = ref(null);
	const level2Config = ref(null);
	const level3Config = ref(null);
	const submitted = ref(false);
	const submittedAt = ref(null);
	const isFetching = ref(true);
	const submitModal = ref();

	const {
		fetchlevel1,
		fetchlevel2,
		fetchlevel3,
		currentUser,
		fetchTableConfig,
	} = useMyRealmApp();

	const graphqlConfig = ref({
		tableName: "level-1",
		query: "level1s",
		insert: "insertOneLevel1",
		replace: "replaceOneLevel1",
		delete: "deleteOneLevel1",
	});
	const graphqlConfig2 = ref({
		tableName: "level-2",
		query: "level2s",
		insert: "insertOneLevel2",
		replace: "replaceOneLevel2",
		delete: "deleteOneLevel2",
	});

	const graphqlConfig3 = ref({
		tableName: "level-3",
		query: "level3s",
		insert: "insertOneLevel3",
		replace: "replaceOneLevel3",
		delete: "deleteOneLevel3",
	});

	onBeforeMount(async () => {
		isFetching.value = true;
		await fetchTableConfig(graphqlConfig.value.tableName).then((data) => {
			level1Config.value = data.tableConfig.config;
		});

		await fetchTableConfig(graphqlConfig2.value.tableName).then((data) => {
			level2Config.value = data.tableConfig.config;
		});

		await fetchTableConfig(graphqlConfig3.value.tableName).then((data) => {
			level3Config.value = data.tableConfig.config;
		});

		await fetchlevel1().then((data) => {
			level1.value = data.level1s;
			level1.value.forEach((data) => {
				totalHourLevel1last.value += new Number(data.hours_last_3_months);
				totalHourLevel1next.value += new Number(data.hours_next_3_months);
			});
		});

		await fetchlevel2().then((data) => {
			level2.value = data.level2s;

			level2.value.forEach((data) => {
				totalHourLevel1next.value += new Number(data.hours_next_3_months);
			});
		});

		await fetchlevel3().then((data) => {
			level3.value = data.level3s;
		});

		calculateLastUpdatedAt();
		if (currentUser.customData.form_status === "submitted") {
			submitted.value = true;
			// console.log(currentUser.customData.submitted_at.$date.$numberLong);
			submittedAt.value = Number(
				currentUser.customData.submitted_at.$date.$numberLong
			);
		} else submitted.value = false;
		// console.log(level3.value, level3Config.value);
		isFetching.value = false;
		console.log(level1.value);
	});

	const updatedCallback = (newData) => {
		totalHourLevel1last.value = 0;
		totalHourLevel1next.value = 0;
		level1.value.forEach((data) => {
			totalHourLevel1last.value += new Number(data.hours_last_3_months);
			totalHourLevel1next.value += new Number(data.hours_next_3_months);
		});
		totalHourLevel2next.value = 0;
		level2.value.forEach((data) => {
			totalHourLevel1next.value += new Number(data.hours_next_3_months);
		});
		calculateLastUpdatedAt(newData);
		reRender();
	};

	const deletedCallback = () => {
		totalHourLevel1last.value = 0;
		totalHourLevel1next.value = 0;
		level1.value.forEach((data) => {
			totalHourLevel1last.value += new Number(data.hours_last_3_months);
			totalHourLevel1next.value += new Number(data.hours_next_3_months);
		});
		totalHourLevel2next.value = 0;
		level2.value.forEach((data) => {
			totalHourLevel1next.value += new Number(data.hours_next_3_months);
		});
		lastUpdatedAt.value = null;
		calculateLastUpdatedAt();
		reRender();
	};

	const isTableNotEmpty = () => {
		if (level1.value === null || level2.value === null || level3.value === null)
			return false;
		if (
			level1.value.length === 0 ||
			level2.value.length === 0 ||
			level3.value.length === 0
		)
			return false;
		for (let i = 0; i < level1.value.length; i++) {
			for (let j = 0; j < level1Config.value.length; j++) {
				if (level1Config.value[j].field === "comments") continue;
				if (
					level1.value[i][level1Config.value[j].field] === " " ||
					level1.value[i][level1Config.value[j].field] === null
				)
					return false;
			}
		}

		for (let i = 0; i < level2.value.length; i++) {
			for (let j = 0; j < level2Config.value.length; j++) {
				if (level2Config.value[j].field === "comments") continue;
				if (
					level2.value[i][level2Config.value[j].field] === " " ||
					level2.value[i][level2Config.value[j].field] === null
				)
					return false;
			}
		}

		for (let i = 0; i < level3.value.length; i++) {
			for (let j = 0; j < level3Config.value.length; j++) {
				if (level3Config.value[j].field === "comments") continue;
				if (
					level3.value[i][level3Config.value[j].field] === " " ||
					level3.value[i][level3Config.value[j].field] === null
				)
					return false;
			}
		}
		createModal();

		return true;
	};

	const submitTable = async () => {
		if (isTableNotEmpty() === false) {
			console.log("can't submit empty data");
			return;
		}
		await currentUser.callFunction("submit_table");
		currentUser.refreshCustomData();
		submitted.value = true;
		reRender();
	};

	const calculateLastUpdatedAt = (newData) => {
		if (newData) {
			lastUpdatedAt.value = newData.updated_at;
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

	const reRender = () => {
		componentKey.value++;
	};

	const createModal = () => {
		const $targetEl = document.getElementById("submitModal");
		const options = {
			placement: "bottom-right",
			backdrop: "static",
			closable: true,
		};
		submitModal.value = new Modal($targetEl, options);
	};

	onMounted(() => {
		initDropdowns();
	});
</script>

<style lang="scss" scoped></style>
