<script setup>
	import optData from "@/options.json";

	const columns = ref([]);
	const columns2 = ref([]);
	const tableData = ref([null]);
	const tableData2 = ref([null]);
	const options = optData.options;
	const isFetching = ref(true);
	const { app: realmApp, Realm } = useMyRealmApp();

	onBeforeMount(async () => {
		const mongodb = realmApp.currentUser.mongoClient("mongodb-atlas");
		const collection = mongodb.db("level-1").collection("table");
		const tableConfig = mongodb.db("level-1").collection("table-config");
		const collection2 = mongodb.db("level-2").collection("table");
		const tableConfig2 = mongodb.db("level-2").collection("table-config");

		await tableConfig.find().then((data) => {
			columns.value = data;
		});

		await collection.find().then((data) => {
			tableData.value = data;
		});

		await tableConfig2.find().then((data) => {
			columns2.value = data;
		});

		await collection2.find().then((data) => {
			tableData2.value = data;
		});

		isFetching.value = false;
	});

	const logout = () => {
		realmApp.currentUser.logOut();
		navigateTo("/");
	};

	const addRow = async () => {
		const mongodb = realmApp.currentUser.mongoClient("mongodb-atlas");
		const collection = mongodb.db("level-1").collection("table");

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
		const collection = mongodb.db("level-1").collection("table");
		collection.updateOne({ _id: data._id }, data);
	};

	const onCellEdit2 = async (data) => {
		const mongodb = realmApp.currentUser.mongoClient("mongodb-atlas");
		const collection = mongodb.db("level-2").collection("table");
		collection.updateOne({ _id: data._id }, data);
	};

	const totalHoursLastThreeMonth = () => {
		let total = 0;
		tableData.value.forEach((item) => {
			total += new Number(item.hours_last_3_months);
		});
		console.log(total);
		return total;
	};
</script>

<template>
	<section class="table-section" v-if="!isFetching">
		<div class="table-heading">
			<h1>Past / Continuing Stage</h1>
			<div class="table-heading-data">
				<div class="table-heading-data-items">
					<h1 class="table-heading-data-items-key">
						Total hours worked last three month:
					</h1>
					<h1>{{ totalHoursLastThreeMonth() }} Hours</h1>
				</div>
				<!-- <div class="table-heading-data-items">
					<h1>Total hours worked last three month:</h1>
					<h1>Total hours worked last three month:</h1>
				</div> -->
			</div>
			<Button label="Log Out" @click="logout" />
		</div>
		<DataTableWrapper
			@cell-edit="onCellEdit"
			:data="tableData"
			:columns="columns"
			:options="options" />
		<div class="buttons">
			<Button label="Add Row" icon="pi pi-plus" @click="addRow()" />
		</div>
		<div class="table-heading">
			<h1>New / Planned Stage</h1>
		</div>
		<DataTableWrapper
			@cell-edit="onCellEdit2"
			:data="tableData2"
			:columns="columns2"
			:options="options" />
		<div class="buttons">
			<Button label="Previous Stage" disabled icon="pi pi-angle-double-left" />
			<!-- <Button label="Create Table" icon="pi pi-plus" @click="addRow()" /> -->
			<Button label="Add Row" icon="pi pi-plus" @click="addRow()" />
			<Button
				label="Next Stage"
				@click="navigateTo('/user/stage3')"
				iconPos="right"
				icon="pi pi-angle-double-right"></Button>
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
</style>
