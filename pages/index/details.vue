<template>
	<div class="flex w-full items-center gap-4 justify-center">
		<div
			class="flex flex-col md:w-8/12 w-full sm:p-8 gap-8 p-4 items-center relative">
			<button
				@click="navigateTo('/owners')"
				class="text-3xl absolute top-1/2 left-2">
				<i class="ri-arrow-left-circle-fill"></i>
			</button>
			<div class="flex w-11/12 flex-col justify-center box-styling">
				<h1 class="md:text-3xl text-xl font-bold">
					Please enter you Meter Number
					<span class="md:text-2xl text-lg">(MPAN)</span>:
				</h1>
				<div class="flex lg:flex-row flex-col gap-6">
					<h2>
						Here's an example of what your MPAN number on your meter or bill
						should look like:
					</h2>
					<img
						src="~/public/mpan-number.png"
						alt="MPAN Guide"
						class="md:w-80 w-48" />
				</div>
				<div class="w-fit flex flex-col gap-2">
					<div class="flex gap-2">
						<input
							@keyup="clickEvent($event, 'meter-time-switch-code')"
							id="profile-type"
							type="tel"
							pattern="[0-9]{2}"
							class="w-full font-medium md:text-base text-sm rounded p-3 focus:outline-none input-box-color text-center"
							size="1"
							maxlength="2"
							placeholder="##" />
						<input
							@keyup="clickEvent($event, 'line-loss-factor')"
							id="meter-time-switch-code"
							type="tel"
							pattern="[0-9]{3}"
							class="w-full font-medium md:text-base text-sm rounded p-3 focus:outline-none input-box-color text-center"
							size="2"
							maxlength="3"
							placeholder="###" />
						<input
							@keyup="clickEvent($event, 'distributor-id')"
							id="line-loss-factor"
							type="tel"
							pattern="[0-9]{3}"
							class="w-full font-medium md:text-base text-sm rounded p-3 focus:outline-none input-box-color text-center"
							size="2"
							maxlength="3"
							placeholder="###" />
					</div>
					<div class="flex gap-2">
						<input
							@keyup="clickEvent($event, 'unique-number-1')"
							id="distributor-id"
							type="tel"
							pattern="[0-9]{2}"
							class="w-full font-medium md:text-base text-sm rounded p-3 focus:outline-none input-box-color text-center"
							size="1"
							maxlength="2"
							placeholder="##" />
						<input
							type="tel"
							@keyup="clickEvent($event, 'unique-number-2')"
							id="unique-number-1"
							pattern="[0-9]{4}"
							class="w-full font-medium md:text-base text-sm rounded p-3 focus:outline-none input-box-color text-center"
							size="3"
							maxlength="4"
							placeholder="####" />
						<input
							type="tel"
							@keyup="clickEvent($event, 'check-digit')"
							id="unique-number-2"
							pattern="[0-9]{4}"
							class="w-full font-medium md:text-base text-sm rounded p-3 focus:outline-none input-box-color text-center"
							size="3"
							maxlength="4"
							placeholder="####" />
						<input
							id="check-digit"
							type="tel"
							pattern="[0-9]{3}"
							class="w-full font-medium md:text-base text-sm rounded p-3 focus:outline-none input-box-color text-center"
							size="2"
							maxlength="3"
							placeholder="###" />
					</div>
				</div>
			</div>
			<div class="flex w-11/12 flex-col justify-center box-styling">
				<h1 class="md:text-3xl text-xl font-bold">
					Who is your current supplier ?
				</h1>
				<div class="flex gap-4">
					<h1 class="font-medium text-lg">My current supplier is:</h1>
					<SearchDropdown :list="suppliers" :header="`Supplier`" />
				</div>
				<!-- <SearchDropdown :list="suppliers" :header="`Supplier`" /> -->
			</div>
			<div class="flex w-11/12 flex-col justify-center box-styling">
				<h1 class="md:text-3xl text-xl font-bold">
					What is your business type ?
				</h1>
				<div class="flex gap-4">
					<h1 class="font-medium text-lg">I have business of:</h1>
					<SearchDropdown :list="businessTypes" :header="`Business Type`" />
				</div>
				<!-- <SearchDropdown :list="businessTypes" :header="`Business Type`" /> -->
			</div>
			<!-- <div class="flex gap-4">
				<button
					@click="saveState()"
					class="flex gap-2 font-semibold cursor-pointer text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded text-lg px-5 py-2.5 text-center mr-2 mb-2">
					<p>Next</p>
				</button>
			</div> -->
			<button @click="saveState()" class="text-3xl absolute top-2/4 right-2">
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

	const clickEvent = (current, next) => {
		const elm = document.getElementById(current.originalTarget.id).value;
		// console.log(current.originalTarget.maxLength);
		if (elm.length === current.originalTarget.maxLength) {
			document.getElementById(next).focus();
		}
	};

	const saveState = () => {
		const temp = localStorage.getItem("collection");
		collection.value = JSON.parse(temp);

		if (collection.value === null) return;

		if (meterNumber.value) {
			collection.value.meterNumber = meterNumber.value;
		}

		const jsonObj = JSON.stringify(collection.value);
		localStorage.setItem("collection", jsonObj);
		navigateTo("/meter");
	};
</script>

<style scoped>
	/* input:invalid {
		border: red solid 3px;
	} */
</style>
