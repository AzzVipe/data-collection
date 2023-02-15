<template>
	<div class="flex flex-col justify-start p-4 gap-4">
		<div class="overflow-x-auto rounded-lg" v-if="tableData.length !== 0">
			<table
				class="w-full text-sm text-left text-gray-500 dark:text-gray-400 shadow-md">
				<thead
					class="text-sm font-bold text-gray-700 uppercase bg-slate-200 dark:bg-gray-700 dark:text-gray-200 tracking-wider">
					<tr>
						<th
							v-for="col in columns"
							:key="col.id"
							scope="col"
							class="px-6 py-3">
							{{ col.header }}
						</th>
						<th scope="col" class="px-6 py-3">Action</th>
					</tr>
				</thead>
				<tbody>
					<tr
						class="bg-white border-b dark:bg-gray-800 dark:border-white"
						v-for="(data, index) of tableData"
						:key="data">
						<td v-for="col in columns" :key="col.id" class="p-2">
							<p
								v-if="!isCurrentItem(data._id) || toggle === false"
								class="px-4 py-2 h-20 leading-6 overflow-y-hidden">
								{{ data[col.field] }}
							</p>
							<div v-else class="">
								<DropDown
									@dropdown-edit="dropEdit($event, index, col.field)"
									v-if="col.type === 'dropdown'"
									:field="col.field"
									:value="data[col.field]" />
								<input
									v-else-if="col.type === 'string' && col.field !== 'comments'"
									type="text"
									class="dark:bg-slate-400 bg-slate-300 text-slate-900 w-32 overflow-x-scroll px-4 py-2.5 rounded-lg"
									v-model="data[col.field]" />
								<input
									v-else
									type="text"
									class="dark:bg-slate-400 bg-slate-300 text-slate-900 px-4 py-2.5 rounded-lg"
									v-model="data[col.field]" />
							</div>
							<!-- <div class="h-20"></div> -->
						</td>
						<td class="px-6 py-4 text-right flex gap-4">
							<button
								v-if="isCurrentItem(data._id)"
								@click="updateRow(data)"
								href="#"
								class="text-2xl text-green-600 dark:text-green-500 hover:underline">
								<i class="ri-checkbox-circle-fill"></i>
							</button>
							<button
								v-if="isCurrentItem(data._id)"
								@click="cancelRowEdit(data)"
								href="#"
								class="text-2xl text-gray-600 dark:text-gray-500 hover:underline">
								<i class="ri-close-circle-fill"></i>
							</button>
							<button
								v-else
								@click="setCurrentItem(data)"
								href="#"
								class="text-2xl text-blue-700 dark:text-blue-500 hover:underline">
								<i class="ri-pencil-fill"></i>
							</button>
							<button
								:data-modal-target="`popup-modal-${index}-${config.tableName}`"
								:data-modal-toggle="`popup-modal-${index}-${config.tableName}`"
								type="button"
								v-if="!isCurrentItem(data._id)"
								href="#"
								class="text-2xl text-red-600 dark:text-red-500 hover:underline">
								<i class="ri-delete-bin-5-fill"></i>
							</button>
						</td>
						<div
							:id="`popup-modal-${index}-${config.tableName}`"
							tabindex="-1"
							class="fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
							<div class="relative w-full h-full max-w-md md:h-auto">
								<div
									class="relative bg-white rounded-lg shadow dark:bg-gray-700">
									<button
										type="button"
										class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
										:data-modal-hide="`popup-modal-${index}-${config.tableName}`">
										<svg
											aria-hidden="true"
											class="w-5 h-5"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg">
											<path
												fill-rule="evenodd"
												d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
												clip-rule="evenodd"></path>
										</svg>
										<span class="sr-only">Close modal</span>
									</button>
									<div class="p-6 text-center">
										<svg
											aria-hidden="true"
											class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
										</svg>
										<h3
											class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
											Are you sure you want to delete this product?
										</h3>
										<button
											:data-modal-hide="`popup-modal-${index}-${config.tableName}`"
											type="button"
											@click="deleteRow(data._id)"
											class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
											Yes, I'm sure
										</button>
										<button
											:data-modal-hide="`popup-modal-${index}-${config.tableName}`"
											type="button"
											class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
											No, cancel
										</button>
									</div>
								</div>
							</div>
						</div>
					</tr>
				</tbody>
			</table>
		</div>
		<button
			v-if="tableData.length === 0"
			@click="addRow"
			type="button"
			class="text-white self-start bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
			Create new table
		</button>
		<button
			v-else
			@click="addRow"
			type="button"
			class="text-white self-start bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
			Add Row
		</button>
	</div>
</template>

<script setup>
	import { initModals } from "flowbite";

	const { config, tableData } = defineProps(["config", "tableData"]);
	const toggle = ref(false);
	const columns = ref();
	const tableDocCopy = ref();
	const currentItem = ref(null);
	const { app: realmApp, currentUser, graphqlOperation } = useMyRealmApp();

	const emit = defineEmits(["reRender"]);
	toRefs(tableData);

	onMounted(async () => {
		let graphql = JSON.stringify({
			query: `query {
				tableConfig(query: {name: "${config.tableName}"}) {
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
			columns.value = data.tableConfig.config;
		});

		initModals();
	});

	const isCurrentItem = (id) => {
		toggle.value = true;
		return currentItem.value === id;
	};

	const setCurrentItem = async (data) => {
		if (currentItem.value !== 0 && currentItem.value !== null) {
			await updateRow(
				tableData.find((temp) => temp._id === tableDocCopy.value._id)
			);
		}
		currentItem.value = data._id;
		tableDocCopy.value = JSON.parse(JSON.stringify(data));
	};

	const isDocSame = (data) => {
		for (const key in data) {
			if (data[key] === tableDocCopy.value[key]) continue;
			else return false;
		}

		return true;
	};

	const addRow = async () => {
		let jsonObj = {};
		jsonObj["user_id"] = realmApp.currentUser.id;
		columns.value.forEach((element) => {
			jsonObj[element.field] = " ";
		});
		const jsonText = JSON.stringify(jsonObj);
		const unquotedText = jsonText.replace(/"([^"]+)":/g, "$1:");
		const graphql = JSON.stringify({
			query: `mutation {
	      ${config.insert} ( data: ${unquotedText}) {
	        _id
	      }
	    }`,
			variables: {},
		});
		await graphqlOperation(graphql).then((data) => {
			jsonObj["_id"] = data[config.insert]._id;
			console.log(jsonObj["_id"]);
			// console.log(data[config.insert]);
		});
		tableData.push(jsonObj);
		emit("reRender");
	};

	const updateRow = async (data) => {
		if (isDocSame(data)) {
			console.log("not updated");
			currentItem.value = 0;
			tableDocCopy.value = null;
			return;
		}
		let jsonObj = {};
		columns.value.forEach((element) => {
			jsonObj[element.field] = data[element.field];
		});
		jsonObj["user_id"] = data.user_id;
		const jsonText = JSON.stringify(jsonObj);
		const unquotedText = jsonText.replace(/"([^"]+)":/g, "$1:");
		console.log(unquotedText);
		const graphql = JSON.stringify({
			query: `mutation {
	      ${config.replace} (
	        query: { _id: "${data._id}"}
	        data: ${unquotedText}) {
	        _id
	        comments
	      }
	    }`,
			variables: {},
		});
		await graphqlOperation(graphql).then((data) => {
			console.log(data);
		});
		console.log("updated");
		currentItem.value = 0;
		tableDocCopy.value = null;
		// emit("reRender");
	};

	const dropEdit = (updatedVal, index, field) => {
		tableData[index][field] = updatedVal;
	};

	const cancelRowEdit = async (data) => {
		if (isDocSame(data)) {
			console.log("not updated");
			currentItem.value = 0;
			tableDocCopy.value = null;
			return;
		}

		let index;
		for (index = 0; index < tableData.length; index++) {
			if (tableData[index]._id === data._id) break;
		}
		if (index <= tableData.length) tableData[index] = tableDocCopy.value;
		console.log(data);
		currentItem.value = 0;
		tableDocCopy.value = null;
	};

	const deleteRow = async (id) => {
		const graphql = JSON.stringify({
			query: `mutation {
	      ${config.delete} (query: { _id: "${id}"}) {
	        _id
	      }
	    }`,
			variables: {},
		});
		await graphqlOperation(graphql).then((data) => {
			console.log(data);
		});

		let index;

		for (index = 0; index < tableData.length; index++) {
			if (tableData[index]._id === id) break;
		}

		if (index <= tableData.length) {
			if (tableData.length > 1) tableData.splice(index, index);
			else tableData.pop();
		}
	};
</script>

<style scoped></style>
