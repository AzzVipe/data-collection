<script setup>
	import optData from "@/options.json";
	const columns = ref([]);
	const tableData = ref([]);
	const options = optData.options;
	const { app: realmApp, Realm } = useMyRealmApp();

	onBeforeMount(() => {
		const mongodb = realmApp.currentUser.mongoClient("mongodb-atlas");
		const collection = mongodb.db("level-2").collection("table");
		const tableConfig = mongodb.db("level-2").collection("table-config");

		tableConfig.find().then((data) => {
			columns.value = data;
			console.log(columns.value);
		});
		console.log(realmApp.currentUser.id);
		console.log(options);

		collection.find().then((data) => {
			tableData.value = data;
		});
	});

	const addRow = async () => {
		const mongodb = realmApp.currentUser.mongoClient("mongodb-atlas");
		const collection = mongodb.db("level-2").collection("table");

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

	const onCellEditComplete = async (event) => {
		let { data, newValue, field } = event;
		const mongodb = realmApp.currentUser.mongoClient("mongodb-atlas");
		const collection = mongodb.db("level-2").collection("table");
		const col = columns.value.find((data) => data.field === field);
		let temp;

		if (col.type === "string") {
			temp = newValue;
		} else if (col.type === "dropdown") {
			temp = newValue.name;
		}

		if (temp.trim().length > 0) {
			data[field] = temp;
			console.log(data);
			collection.updateOne({ _id: data._id }, data);
		} else event.preventDefault();
	};

	const findOptions = (fieldName) => {
		return options.find((temp) => temp.field === fieldName).option;
	};
</script>

<template>
	<section class="container">
		<div class="table-heading">
			<h1>New / Planned Stage</h1>
			<Button label="Log Out" @click="logout" />
		</div>
		<DataTableWrapper :data="tableData" :columns="columns" />
		<div class="buttons">
			<Button
				label="Previous Stage"
				@click="navigateTo('/user/')"
				icon="pi pi-angle-double-left"></Button>
			<Button
				v-if="tableData.length === 0"
				label="Create Table"
				icon="pi pi-plus"
				@click="addRow()" />
			<Button v-else label="Add Row" icon="pi pi-plus" @click="addRow()" />
			<Button
				label="Next Stage"
				@click="navigateTo('/user/stage3')"
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
