<template>
	<div class="flex flex-col w-full items-center gap-4 justify-center">
		<div
			class="flex flex-col xl:w-8/12 w-full sm:p-8 gap-8 p-4 items-center relative">
			<button
				@click="saveState('/meter')"
				class="text-3xl absolute top-1/2 left-2">
				<i class="ri-arrow-left-circle-fill"></i>
			</button>
			<div class="flex w-11/12 flex-col justify-center box-styling">
				<h1 class="md:text-3xl text-xl font-bold">
					Just need some more details
				</h1>
				<div class="flex flex-wrap gap-4">
					<div class="w-full flex flex-wrap gap-4">
						<div class="flex flex-col gap-2 font-medium">
							<label for="email">Email:</label>
							<div class="relative">
								<div
									class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
									<i class="ri-mail-fill"></i>
								</div>
								<input
									name="email"
									type="email"
									v-model="email"
									class="w-full max-w-md font-medium md:text-base text-sm rounded block pl-10 p-3 focus:outline-none input-box-color"
									placeholder="example@domain.com" />
							</div>
						</div>
						<div class="flex flex-col gap-2 font-medium">
							<label for="email">Phone:</label>
							<div class="relative">
								<div
									class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
									<i class="ri-phone-fill"></i>
								</div>
								<input
									name="phone"
									type="phone"
									v-model="phone"
									class="w-full max-w-md font-medium md:text-base text-sm rounded block pl-10 p-3 focus:outline-none input-box-color"
									placeholder="1234567890" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<button
			@click="submitForm()"
			v-if="isEverythingSet"
			class="button-style text-xl">
			Submit
		</button>
		<button v-else class="button-style text-xl !cursor-not-allowed" disabled>
			Submit
		</button>
	</div>
</template>

<script setup>
	const email = ref(null);
	const phone = ref(null);
	const collection = ref(null);

	onBeforeMount(() => {
		const temp = localStorage.getItem("collection");

		collection.value = JSON.parse(temp);
		if (collection.value === null) {
			navigateTo("/");
			return;
		}
		if (collection.value.email !== undefined && collection.value.email !== null)
			email.value = collection.value.email;

		if (collection.value.phone !== undefined && collection.value.phone !== null)
			phone.value = collection.value.phone;
	});

	const isEverythingSet = () => {
		if (email.value === null || phone.value === null) return false;

		return true;
	};

	const saveState = (path) => {
		const temp = localStorage.getItem("collection");
		collection.value = JSON.parse(temp);

		if (collection.value === null) return;

		if (email.value !== null) {
			collection.value.email = email.value;
		}
		if (phone.value !== null) {
			collection.value.phone = phone.value;
		}

		const jsonObj = JSON.stringify(collection.value);
		localStorage.setItem("collection", jsonObj);

		if (path) navigateTo(path);
	};

	const submitForm = () => {
		// @TODO: submit form
	};
</script>

<style scoped>
	/* input:invalid {
		border: red solid 3px;
	} */
</style>
