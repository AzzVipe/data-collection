<template>
	<div>
		<section class="bg-gray-50 dark:bg-gray-900">
			<div
				class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
				<div
					class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1
							class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-8">
							Sign in to your account
						</h1>
						<form class="space-y-4 md:space-y-6" @submit.prevent="signIn">
							<div>
								<label
									for="email"
									class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>Your email</label
								>
								<input
									@click="errMsg = null"
									v-model="email"
									type="email"
									name="email"
									id="email"
									class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="name@company.com"
									required="" />
							</div>
							<div>
								<label
									for="password"
									class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>Password</label
								>
								<input
									@click="errMsg = null"
									v-model="password"
									type="password"
									name="password"
									id="password"
									placeholder="••••••••"
									class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-6"
									required="" />
							</div>
							<p v-if="errMsg" class="text-red-500 mb-4">{{ errMsg }}</p>
							<button
								type="submit"
								class="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
								Sign in
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup>
	const email = ref(null);
	const password = ref(null);
	const errMsg = ref(null);
	const { app: realmApp, Realm } = useMyRealmApp();

	const signIn = async () => {
		if (email.value === null || password.value === null) {
			errMsg.value = "All fields are required";

			return;
		}

		const credentials = Realm.Credentials.emailPassword(
			email.value,
			password.value
		);

		await realmApp
			.logIn(credentials)
			.then((user) => {
				console.log(user);
				user.refreshCustomData();
				user.callFunction("is_admin").then((data) => {
					if (data === true) {
						localStorage.setItem("isAdmin", true);
						navigateTo("/admin");
					} else {
						localStorage.setItem("isAdmin", false);
						navigateTo("/user");
					}
				});
				// localStorage.setItem("isLoggedIn", true);
			})
			.catch((err) => {
				errMsg.value = "* Invalid username/password";
				console.log(err);
			});
	};

	// onBeforeMount(() => {
	// 	realmApp = new Realm.App({ id: config.APP_ID });
	// 	console.log(realmApp);
	// });
</script>

<style scoped></style>
