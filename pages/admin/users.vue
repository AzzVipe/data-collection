<template>
	<div class="bg-gray-50 dark:bg-gray-900">
		<div
			class="w-full max-w-md bg-white border-r border-gray-200 shadow dark:shadow-gray-600 dark:bg-gradient dark:border-gray-700 p-4">
			<div class="flex items-center justify-between p-4">
				<h5
					class="text-xl font-bold leading-none text-gray-900 dark:text-white">
					Users
				</h5>
				<p
					class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
					{{ users.length }}
				</p>
			</div>
			<div class="flow-root overflow-y-scroll container-height-2">
				<ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
					<li
						v-for="user in users"
						:key="user._id"
						class="py-3 sm:py-4 dark:hover:bg-slate-700 hover:shadow-sm hover:bg-slate-100 p-4 rounded-lg cursor-pointer">
						<div class="flex items-center space-x-4">
							<div class="flex-shrink-0">
								<img
									class="w-8 h-8 rounded-full"
									src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
									alt="Neil image" />
							</div>
							<div class="flex-1 min-w-0">
								<p
									class="text-sm font-medium text-gray-900 truncate dark:text-white">
									{{ user.full_name }}
								</p>
								<p class="text-sm text-gray-500 truncate dark:text-gray-400">
									{{ user.primary_email }}
								</p>
							</div>
							<!-- <div
								class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
								$320
							</div> -->
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script setup>
	import {
		initDrawers,
		initDropdowns,
		initModals,
		initPopovers,
		initTooltips,
	} from "flowbite";

	const { fetchUsers } = useMyRealmApp();
	const users = ref([]);

	onBeforeMount(() => {
		fetchUsers().then((data) => {
			users.value = data;
			console.log(data);
		});
	});

	onMounted(async () => {
		initDrawers();
		initDropdowns();
		initModals();
		initPopovers();
		initTooltips();
	});
</script>

<style lang="scss" scoped></style>
