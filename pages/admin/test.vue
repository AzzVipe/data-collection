<template>
	<div>
		<div
			class="w-full max-w-md bg-white border-r border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700 p-4">
			<div class="flex items-center justify-between p-4">
				<h5
					class="text-xl font-bold leading-none text-gray-900 dark:text-white">
					Users
				</h5>
				<a
					href="#"
					class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
					20 Users
				</a>
			</div>
			<div class="flow-root overflow-y-scroll container-height-2">
				<ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
					<li
						v-for="n in 20"
						:key="n"
						class="py-3 sm:py-4 dark:hover:bg-slate-600 hover:bg-slate-100 p-4 rounded-lg cursor-pointer">
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
									Neil Sims
								</p>
								<p class="text-sm text-gray-500 truncate dark:text-gray-400">
									email@windster.com
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

	onMounted(() => {
		initDrawers();
		initDropdowns();
		initModals();
		initPopovers();
		initTooltips();
	});
</script>

<style lang="scss" scoped></style>
