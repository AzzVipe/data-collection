<template>
	<div>
		<button
			:id="`dropdownRadioHelperButton${field}-${tableName}`"
			:data-dropdown-toggle="`dropdownRadioHelper${field}-${tableName}`"
			class="text-white bg-blue-600 w-full hover:bg-blue-800 h-10 justify-between focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-700 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			type="button">
			<p class="truncate w-20">{{ optValue }}</p>

			<svg
				class="w-4 h-4 ml-2"
				aria-hidden="true"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M19 9l-7 7-7-7"></path>
			</svg>
		</button>

		<div
			:id="`dropdownRadioHelper${field}-${tableName}`"
			class="z-10 hidden w-96 max-h-[500px] overflow-y-scroll bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
			<ul
				class="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200"
				aria-labelledby="dropdownRadioButton">
				<li v-for="(opt, index) in option" :key="opt.id">
					<div
						v-if="specialCheck(opt.name)"
						class="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
						<div class="flex items-center h-5">
							<input
								@click="dropdown.hide()"
								:id="`default-radio-1-${field}-${index}`"
								name="default-radio"
								type="radio"
								:value="opt.name"
								v-model="optValue"
								class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
						</div>
						<div class="ml-2 text-sm w-full">
							<label
								@click="dropdown.hide()"
								:for="`default-radio-1-${field}-${index}`"
								class="font-medium text-gray-900 dark:text-gray-300">
								<div>{{ opt.name }}</div>
								<p
									id="helper-radio-text-4"
									class="text-xs font-normal text-gray-500 dark:text-gray-300">
									{{ opt.description }}
								</p>
							</label>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
	import { Dropdown } from "flowbite";
	import optData from "@/options.json";

	const emit = defineEmits(["dropdownEdit"]);

	const { field, value, tableName } = defineProps([
		"field",
		"value",
		"tableName",
	]);
	const options = ref();
	const option = ref();
	const optValue = ref(null);
	const dropdown = ref(null);
	options.value = optData.options;

	watch(optValue, (newVal, oldVal) => {
		if (oldVal !== newVal) emit("dropdownEdit", newVal);
	});

	onBeforeMount(() => {
		for (let index = 0; index < options.value.length; index++) {
			if (options.value[index].field === field) {
				option.value = options.value[index].option;
				break;
			}
		}
	});

	const specialCheck = (fieldName) => {
		if (tableName === "level-1" || tableName === "level-2") return true;
		else if (
			tableName === "level-3" &&
			fieldName === "Dislike this service; would prefer not to do it"
		)
			return false;

		return true;
	};

	const findOptions = (fieldName) => {
		const temp = options.value.find((temp) => temp.field === fieldName);
		return temp;
	};

	const checkValue = (name) => {
		return name === value;
	};

	onMounted(() => {
		const $targetEl = document.getElementById(
			`dropdownRadioHelper${field}-${tableName}`
		);
		const $triggerEl = document.getElementById(
			`dropdownRadioHelperButton${field}-${tableName}`
		);
		const options = {
			placement: "bottom",
			triggerType: "click",
			offsetSkidding: 0,
			offsetDistance: 10,
			delay: 300,
		};
		dropdown.value = new Dropdown($targetEl, $triggerEl, options);
		optValue.value = value;
	});
</script>

<style lang="scss" scoped></style>
