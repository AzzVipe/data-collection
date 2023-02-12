<template>
	<div class="table">
		<DataTable
			:value="data"
			editMode="cell"
			showGridlines
			responsiveLayout="scroll"
			class="editable-cells-table"
			@cell-edit-complete="emitEvent"
			v-if="data.length">
			<Column
				v-for="col of columns"
				:field="col.field"
				:header="col.header"
				:key="col.field"
				style="width: 250px">
				<template #editor="slotProps">
					<Dropdown
						v-if="col.type === 'dropdown'"
						v-model="slotProps.data[slotProps.field]"
						:options="findOptions(col.field)"
						optionLabel="name"
						placeholder="Select a Service" />
					<InputText
						v-else
						v-model="slotProps.data[slotProps.field]"
						style="border: 0px; padding: 0; width: 100%" />
				</template>
			</Column>
			<Column :exportable="false">
				<template #body="slotProps">
					<Button
						icon="pi pi-trash"
						class="p-button-rounded p-button-danger"
						@click="confirmDeleteProduct(slotProps.data)" />
				</template>
			</Column>
		</DataTable>
	</div>
</template>

<script setup>
	const { data, columns, tableTitle, options } = defineProps([
		"data",
		"columns",
		"tableTitle",
		"options",
	]);

	const emit = defineEmits(["cellEdit"]);
	const emitEvent = (event) => {
		let { data, newValue, field } = event;
		const col = columns.find((data) => data.field === field);
		let temp;

		if (col.type === "string") {
			temp = newValue;
		} else if (col.type === "dropdown") {
			temp = newValue.name;
		}

		if (temp.trim().length > 0) {
			data[field] = temp;
			console.log(data);
			emit("cellEdit", data);
		} else event.preventDefault();
	};

	const findOptions = (fieldName) => {
		return options.find((temp) => temp.field === fieldName).option;
	};
</script>

<style scoped></style>
