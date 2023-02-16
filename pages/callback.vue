<template>
	<div>
		<h1>Please Wait</h1>
	</div>
</template>
<script setup>
	const { Realm } = useMyRealmApp();

	onMounted(() => {
		Realm.handleAuthRedirect();
	});
</script>
