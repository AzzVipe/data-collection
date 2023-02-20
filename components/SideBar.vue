<template>
	<aside
		id="logo-sidebar"
		class="fixed shadow dark:shadow-slate-700 top-0 left-0 z-40 w-56 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 min-[2000]:translate-x-0 dark:bg-gradient dark:border-gray-600"
		aria-label="Sidebar">
		<div class="h-full px-3 pb-4 overflow-y-auto">
			<ul class="space-y-2">
				<li v-if="isAdmin === 'true'">
					<NuxtLink
						to="/admin/"
						class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
						<i
							class="ri-dashboard-fill text-xl w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
						<span class="ml-3">Dashboard</span>
					</NuxtLink>
				</li>

				<li v-else>
					<NuxtLink
						to="/user/"
						class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
						<i
							class="ri-dashboard-fill text-xl w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
						<span class="ml-3">Dashboard</span>
					</NuxtLink>
				</li>

				<li>
					<NuxtLink
						class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
						<i
							class="ri-mail-fill text-xl w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>

						<span class="flex-1 ml-3 whitespace-nowrap">Inbox</span>
						<span
							class="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300"
							>3</span
						>
					</NuxtLink>
				</li>
				<li v-if="isAdmin === 'true'">
					<NuxtLink
						to="/admin/users"
						class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
						<i
							class="ri-user-3-fill text-xl w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
						<span class="flex-1 ml-3 whitespace-nowrap">Users</span>
					</NuxtLink>
				</li>
				<li v-if="isAdmin === 'true'">
					<NuxtLink
						to="/admin/addUser"
						class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
						<i
							class="ri-user-add-fill text-xl w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
						<span class="flex-1 ml-3 whitespace-nowrap">Add User</span>
					</NuxtLink>
				</li>
			</ul>
		</div>
	</aside>
</template>

<script setup>
	const isAdmin = ref(null);
	onMounted(() => {
		isAdmin.value = localStorage.getItem("isAdmin");
	});
</script>

<style lang="scss" scoped></style>
