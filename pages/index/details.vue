<template>
	<div class="flex w-full items-center gap-4 justify-center">
		<div
			class="flex flex-col 2xl:w-8/12 xl:w-10/12 w-full sm:p-8 gap-8 p-4 items-center relative">
			<button
				@click="saveState('/test')"
				class="text-3xl absolute top-1/2 left-2">
				<i class="ri-arrow-left-circle-fill"></i>
			</button>
			<div class="flex w-11/12 flex-col justify-center box-styling">
				<h1 class="md:text-3xl text-xl font-bold">Details</h1>
				<div class="flex flex-col gap-4">
					<div class="grid md:grid-cols-2 gap-4">
						<div class="w-full flex flex-col gap-2">
							<h1 class="font-semibold">Choose your current supplier:</h1>
							<SearchDropdown :list="suppliers" :header="`Supplier`" />
						</div>
						<div class="w-full flex flex-col gap-2">
							<h1 class="font-semibold">Choose your business type:</h1>
							<SearchDropdown :list="businessTypes" :header="`Business Type`" />
						</div>
						<div class="w-full flex flex-col gap-2 font-medium">
							<label for="email" class="font-semibold">Email:</label>
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
						<div class="w-full flex flex-col gap-2 font-medium">
							<label for="email" class="font-semibold">Phone:</label>
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
			<button
				@click="saveState('/meter')"
				class="text-3xl absolute top-2/4 right-2">
				<i class="ri-arrow-right-circle-fill"></i>
			</button>
		</div>
	</div>
</template>

<script setup>
	const meterNumber = ref(null);
	const collection = ref(null);
	const suppliers = ref([
		"Airtricty",
		"Avanti Gas",
		"Axis",
		"BES Utilities",
		"BG Lite",
		"BGB Upfront",
		"British Gas",
		"CNG",
		"Corona Energy",
		"Crown Gas and Power",
		"Drax",
		"Dyce Energy",
		"E.on",
		"E.on Next",
		"Ecotricity",
		"EDF",
		"Engie",
		"Extra Energy",
		"Gazprom",
		"Good Energy",
		"NPower",
		"NPower White",
		"Opus Energy",
		"Orsted",
		"Ovo Energy",
		"Pozitive Energy",
		"Regent Gas",
		"Scottish Power",
		"Shell Energy",
		"Smartest Energy",
		"Smartest Energy OLD",
		"SSE",
		"Total Energies",
		"Water",
		"Wingas",
		"Yorkshire Gas and Power",
		"YU Energy",
		"YuEnergy Offering",
		"Others",
	]);

	const businessTypes = ref([
		"Agricultre",
		"Catering and Accomodation",
		"Public House (Free House)",
		"Public House (Tenant)",
		"Fast Food / Takeaway",
		"Construction",
		"IT Services",
		"Manufacturing",
		"Media and Creative Services",
		"Personal Services",
		"Professional and Business",
		"Retail; Hire and Repair",
		"Transport and Distribution",
		"Wholesale",
		"Church",
		"Charity",
		"Others",
	]);

	onBeforeMount(() => {
		const temp = localStorage.getItem("collection");

		collection.value = JSON.parse(temp);
		if (collection.value === null) {
			navigateTo("/");
			return;
		}
		meterNumber.value = collection.value.meterNumber;
	});

	const saveState = (path) => {
		const temp = localStorage.getItem("collection");
		collection.value = JSON.parse(temp);

		if (collection.value === null) return;

		if (meterNumber.value) {
			collection.value.meterNumber = meterNumber.value;
		}

		const jsonObj = JSON.stringify(collection.value);
		localStorage.setItem("collection", jsonObj);

		if (path) navigateTo(path);
	};
</script>

<style scoped>
	/* input:invalid {
		border: red solid 3px;
	} */
</style>
