<script setup>
	import optData from "@/options.json";
	const columns = ref([]);
	const tableData = ref([]);
	const options = optData.options;
	const { app: realmApp, Realm } = useMyRealmApp();
	const isFetching = ref(true);

	onBeforeMount(async () => {
		const mongodb = realmApp.currentUser.mongoClient("mongodb-atlas");
		const collection = mongodb.db("level-3").collection("table");
		const tableConfig = mongodb.db("level-3").collection("table-config");

		await tableConfig.find().then((data) => {
			columns.value = data;
			console.log(columns.value);
		});

		await collection.find().then((data) => {
			tableData.value = data;
		});

		isFetching.value = false;
	});

	const addRow = async () => {
		const mongodb = realmApp.currentUser.mongoClient("mongodb-atlas");
		const collection = mongodb.db("level-3").collection("table");

		let temp = {};
		for (var i = 0; i < columns.value.length; i++) {
			temp[columns.value[i].field] = "";
		}
		temp.user_id = realmApp.currentUser.id;

		await collection.insertOne(temp).then((res) => {
			console.log(res.insertedId);
			temp._id = res.insertedId;
		});
		console.log(temp);
		tableData.value.push(temp);
	};

	const onCellEdit = async (data) => {
		const mongodb = realmApp.currentUser.mongoClient("mongodb-atlas");
		const collection = mongodb.db("level-3").collection("table");
		collection.updateOne({ _id: data._id }, data);
	};
</script>

<template>
	<section class="table-section" v-if="!isFetching">
		<div class="table-heading table-heading-space-between">
			<h1>New / Desired Stage</h1>
			<Button label="Log Out" @click="logout" />
		</div>
		<DataTableWrapper
			@cell-edit="onCellEdit"
			:data="tableData"
			:columns="columns"
			:options="options" />
		<div class="buttons">
			<Button
				label="Previous Stage"
				icon="pi pi-angle-double-left"
				@click="navigateTo('/user/')"></Button>
			<Button
				v-if="tableData.length === 0"
				label="Create Table"
				icon="pi pi-plus"
				@click="addRow()" />
			<Button v-else label="Add Row" icon="pi pi-plus" @click="addRow()" />
			<Button
				label="Next Stage"
				disabled
				iconPos="right"
				icon="pi pi-angle-double-right" />
		</div>
	</section>
</template>

<style scoped>
	section {
		display: flex;
		flex-direction: column;
	}

	.p-editable-column {
		min-width: 400px;
	}

	.editable-cells-table td.p-cell-editing {
		padding-top: 0;
		padding-bottom: 0;
	}

	.p-dialog .p-dialog-content .card-content {
		display: flex;
		padding-top: 1rem;
		gap: 1rem;
	}

	.p-dialog .p-dialog-content .card-content .head {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.p-dialog .p-dialog-content .card-content .head h2 {
		font-weight: 600;
	}

	.p-editable-column .p-inputtext:enabled:focus {
		box-shadow: none;
	}

	.table {
		display: flex;
		gap: 1rem;
	}
</style>
