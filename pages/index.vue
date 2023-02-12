<template>
	<main class="container">
		<div>
			<Card>
				<template #title>
					<h1 class="table-heading">Sign in</h1>
				</template>
				<template #content>
					<span class="p-float-label">
						<InputText
							id="email"
							type="email"
							v-model="email"
							placeholder="Email" />
						<label for="email">Email</label>
					</span>
					<span class="p-float-label">
						<InputText
							id="password"
							type="password"
							v-model="password"
							placeholder="Password" />
						<label for="password">Password</label>
					</span>
					<p class="error-msg" v-if="errMsg">{{ errMsg }}</p>
				</template>
				<template #footer>
					<Button @click="signIn" label="Sign In" class="w-full" />
				</template>
			</Card>
		</div>
	</main>
</template>

<script setup>
	const email = ref(null);
	const password = ref(null);
	const errMsg = ref(null);
	const config = useRuntimeConfig();
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
				realmApp.currentUser.refreshCustomData();
				navigateTo("/user/");
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
