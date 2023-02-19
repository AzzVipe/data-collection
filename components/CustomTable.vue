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
							class="px-4 py-2">
							<p
								v-if="col.type === 'dropdown'"
								class="max-w-[160px] inline-flex gap-2">
								<span>{{ col.header }}</span>
								<i
									class="ri-question-fill"
									:data-modal-target="`table-head-modal-${col.header}`"
									:data-modal-toggle="`table-head-modal-${col.header}`" />
							</p>
							<p
								v-else-if="col.type === 'string' && col.field !== 'comments'"
								class="max-w-[120px] inline-flex gap-2">
								<span>{{ col.header }}</span>
								<i
									class="ri-question-fill"
									:data-modal-target="`table-head-modal-${col.header}`"
									:data-modal-toggle="`table-head-modal-${col.header}`" />
							</p>
							<p v-else class="inline-flex gap-2">
								<span>{{ col.header }}</span>
								<i
									class="ri-question-fill"
									:data-modal-target="`table-head-modal-${col.header}`"
									:data-modal-toggle="`table-head-modal-${col.header}`" />
							</p>
							<div
								:id="`table-head-modal-${col.header}`"
								data-modal-backdrop="static"
								tabindex="-1"
								aria-hidden="true"
								class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
								<div class="relative w-full h-full max-w-2xl md:h-auto">
									<div
										class="relative bg-white rounded-lg shadow dark:bg-gray-700">
										<div
											class="flex items-start justify-between p-6 border-b rounded-t dark:border-gray-600">
											<h3
												class="text-xl font-semibold text-gray-900 dark:text-white">
												{{ col.header }}
											</h3>
											<button
												type="button"
												class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
												:data-modal-hide="`table-head-modal-${col.header}`">
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
												{{ col.description }}
											</p>
										</div>
										<!-- Modal footer -->
										<div
											class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
											<button
												:data-modal-hide="`table-head-modal-${col.header}`"
												type="button"
												class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
												I understand
											</button>
										</div>
									</div>
								</div>
							</div>
						</th>
						<th v-if="!submitted" scope="col" class="px-4 py-3">Action</th>
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
								class="px-2 py-2 h-20 leading-6 overflow-y-hidden">
								{{ data[col.field] }}
							</p>
							<div v-else>
								<DropDown
									@dropdown-edit="dropEdit($event, index, col.field)"
									v-if="col.type === 'dropdown'"
									:field="col.field"
									:value="data[col.field]" />
								<input
									v-else-if="col.type === 'string' && col.field !== 'comments'"
									type="text"
									class="dark:bg-slate-400 bg-slate-300 max-w-[120px] text-slate-900 overflow-x-scroll px-4 py-2.5 rounded-lg"
									v-model="data[col.field]" />
								<input
									v-else
									type="text"
									class="dark:bg-slate-400 bg-slate-300 text-slate-900 max-w-[200px] px-4 py-2.5 rounded-lg"
									v-model="data[col.field]" />
							</div>
							<!-- <div class="h-20"></div> -->
						</td>
						<td class="px-6 py-4 text-right flex gap-4" v-if="!submitted">
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
							v-if="!submitted"
							tabindex="-1"
							:id="`popup-modal-${index}-${config.tableName}`"
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
											Are you sure you want to delete this record?
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
		<div v-if="!submitted">
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
	</div>
</template>

<script setup>
	import { initModals } from "flowbite";

	const { config, tableData, submitted, columns } = defineProps([
		"config",
		"tableData",
		"submitted",
		"columns",
	]);
	const toggle = ref(false);
	const tableDocCopy = ref();
	const currentItem = ref(null);
	const { app: realmApp, currentUser, graphqlOperation } = useMyRealmApp();

	const emit = defineEmits(["reRender", "updatedData"]);
	toRefs(tableData);

	onMounted(async () => {
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
		jsonObj["created_at"] = new Date();

		columns.forEach((element) => {
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
		});
		tableData.push(jsonObj);
		emit("reRender");
	};

	const updateRow = async (data) => {
		if (isDocSame(data)) {
			console.log("not updated");
			currentItem.value = 0;
			tableDocCopy.value = null;
			emit("reRender");
			return;
		}
		let jsonObj = {};
		columns.forEach((element) => {
			jsonObj[element.field] = data[element.field];
		});
		jsonObj["user_id"] = data.user_id;
		jsonObj["updated_at"] = new Date();
		const jsonText = JSON.stringify(jsonObj);
		const unquotedText = jsonText.replace(/"([^"]+)":/g, "$1:");
		// console.log(unquotedText);
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
		emit("updatedData", jsonObj);
	};

	const dropEdit = (updatedVal, index, field) => {
		tableData[index][field] = updatedVal;
	};

	const cancelRowEdit = async (data) => {
		if (isDocSame(data)) {
			console.log("not updated");
			currentItem.value = 0;
			tableDocCopy.value = null;
			emit("reRender");
			return;
		}

		let index;
		for (index = 0; index < tableData.length; index++) {
			if (tableData[index]._id === data._id) break;
		}
		if (index <= tableData.length) {
			columns.forEach((col) => {
				tableData[index][col.field] = tableDocCopy.value[col.field];
				console.log(col);
			});

			// tableData[index] = tableDocCopy.value;
		}
		console.log(tableDocCopy.value, tableData[index]);
		currentItem.value = 0;
		tableDocCopy.value = null;
		emit("reRender");
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
