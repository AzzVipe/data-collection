<template>
	<div
		class="h-screen p-4 flex justify-center items-center bg-white dark:bg-gray-900">
		<section class="rounded shadow dark:bg-slate-800">
			<div class="md:p-8 p-4 mx-auto max-w-screen-xl">
				<div
					class="max-w-screen-md flex flex-col gap-4 font-light text-gray-700 sm:text-xl dark:text-gray-300">
					<h2
						class="mb-4 md:text-4xl text-2xl tracking-wide leading-normal font-extrabold text-gray-900 dark:text-white">
						Role Alignment & Development Ambition Record (RADAR) 2023.
					</h2>
					<p>
						The purpose of this activity is to take inventory of the work you
						have been doing, plan to do and want to do and then capture the
						value of this work to you and to the Organization. We will use this
						information to generate insights on how to evolve our organizational
						design and develop our people.
					</p>
					<p>
						<span class="font-semibold">Instructions:</span> There are 3
						sections and 2 steps within each section. Start with the first
						section and complete the following steps and then go to the next
						section:
					</p>
					<ol class="flex flex-col gap-2 list-decimal pl-4">
						<li>
							Think about the work that you have been doing (pull out your job
							description; look at your calendar for the past few months) and
							group it into 5-10 big buckets of recurring work or projects that
							represent at least 16 hours and not more than 100 hours of time
							spent in a 90 day period. Less than 16 hours? Combine it with
							other work. More than 100 hours? break it into smaller chunks.
						</li>
						<li>
							Complete the attributes for each row of work. Click on the “?” in
							each column to be sure you understand the definition of each item.
							Review each section and the total number of hours relative to each
							part. Adjust as needed and when satisfied, click Submit.
						</li>
					</ol>
					<div
						class="flex pt-4 flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
						<button
							@click="navigateTo('/user')"
							class="inline-flex items-center justify-center px-4 py-2.5 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
							Get started
						</button>
						<a
							:href="url"
							target="_blank"
							class="inline-flex items-center justify-center px-4 py-2.5 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
							<svg
								class="mr-2 -ml-1 w-5 h-5"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
							</svg>
							View more
						</a>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup>
	const url = ref(useRuntimeConfig().public.INSTRUCTION_VIDEO_URL);
</script>
