<template>
	<div class="flex w-full items-center gap-4 justify-center">
		<div
			class="flex flex-col md:w-8/12 w-full sm:p-8 gap-8 p-4 items-center relative">
			<div class="flex w-11/12 flex-col justify-center box-styling">
				<h1 class="md:text-3xl text-xl font-bold">
					Are you a Registered Company or a Sole Trader ?
				</h1>
				<div class="flex gap-4 md:text-lg text-sm">
					<button
						id="registeredCompany"
						@click="isRegComp = true"
						class="flex-1 flex flex-col p-4 font-semibold gap-4 items-center text-center option-box-styling">
						<img
							src="~/public/enterprise.png"
							alt="Sole Trader"
							class="md:w-[100px] w-[70px]" />
						<p>I have a Registered Company</p>
					</button>
					<button
						id="soleTrader"
						@click="isRegComp = false"
						class="flex-1 flex flex-col p-4 font-semibold gap-4 items-center text-center option-box-styling">
						<img
							src="~/public/trader.png"
							alt="Sole Trader"
							class="md:w-[100px] w-[70px]" />
						<p>I am a Sole Trader</p>
					</button>
				</div>
			</div>
			<div
				v-if="isRegComp"
				class="flex w-11/12 flex-col justify-center box-styling">
				<h1 class="md:text-3xl text-xl font-bold">
					Please enter the name of your company
				</h1>
				<div class="flex gap-4 md:text-lg text-sm">
					<CompanyDropdown @selected-company="handleSelectedCompany" />
				</div>
			</div>
			<div
				v-if="company"
				class="flex w-11/12 flex-col justify-center box-styling">
				<h1 v-if="isMeterAddressSame" class="md:text-3xl text-xl font-bold">
					Is your meter address same as company address ?
				</h1>
				<h1 v-else class="md:text-3xl text-xl font-bold">Meter address</h1>
				<div class="flex gap-4 md:text-base text-sm">
					<div
						v-if="fetching"
						class="flex w-full px-4 py-2 justify-center self-center">
						<svg
							aria-hidden="true"
							class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
							viewBox="0 0 100 101"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
								fill="currentColor" />
							<path
								d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
								fill="currentFill" />
						</svg>
						<span class="sr-only">Loading...</span>
					</div>
					<div
						v-if="addressToggle && !fetching"
						class="w-full grid grid-auto-column gap-4">
						<div v-if="address.address_line_1">
							<span class="details-heading">Address line 1: </span>
							<p class="details-body">
								{{ address.address_line_1 }}
							</p>
						</div>
						<div v-if="address.address_line_2">
							<span class="details-heading">Address line 2: </span>
							<p class="details-body">
								{{ address.address_line_2 }}
							</p>
						</div>
						<div v-if="address.locality">
							<span class="details-heading">Locality: </span>
							<p class="details-body">
								{{ address.locality }}
							</p>
						</div>
						<div v-if="address.postal_code">
							<span class="details-heading">Postal code: </span>
							<p class="details-body">
								{{ address.postal_code }}
							</p>
						</div>
						<div v-if="address.country">
							<span class="details-heading">Country: </span>
							<p class="details-body">
								{{ address.country }}
							</p>
						</div>
					</div>
					<div v-if="addressToggle" class="flex-1 flex flex-col gap-4"></div>
					<div v-else class="flex-1 flex flex-col gap-4">
						<span class="font-semibold">Postal code: </span>
						<AddressDropdown @selected-address="handleSelectedAddress" />
					</div>
				</div>
				<div v-if="!fetching" class="flex gap-4 items-center sm:flex-row">
					<button
						v-if="isMeterAddressSame === true && addressToggle === true"
						class="button-style"
						@click="saveState()">
						<p>Yes</p>
					</button>
					<button
						v-if="isMeterAddressSame === true"
						class="button-style-gray"
						@click="isMeterAddressSame = addressToggle = false">
						<p>No, I want to change it</p>
					</button>
					<button
						v-if="isMeterAddressSame === false && addressToggle === false"
						class="button-style"
						@click="isMeterAddressSame = addressToggle = true">
						<p>Cancel</p>
					</button>
					<button
						v-if="isMeterAddressSame === false && addressToggle === true"
						class="button-style"
						@click="saveState()">
						<p>Next</p>
					</button>
					<button
						v-if="isMeterAddressSame === false && addressToggle === true"
						class="flex gap-2 font-semibold cursor-pointer option-box-styling"
						@click="isMeterAddressSame = addressToggle = false">
						<p>Change</p>
					</button>
				</div>
			</div>
			<button @click="saveState()" class="text-3xl absolute top-2/4 right-2">
				<i class="ri-arrow-right-circle-fill"></i>
			</button>
		</div>
	</div>
</template>

<script setup>
	const { getAddressByID } = useMyRealmApp();
	const isRegComp = ref(false);
	const company = ref(null);
	const isMeterAddressSame = ref(true);
	const addressToggle = ref(true);
	const address = ref();
	const fetching = ref(false);
	const collection = ref(null);

	onBeforeMount(() => {
		const temp = localStorage.getItem("collection");

		collection.value = JSON.parse(temp);
		if (collection.value === null) return;

		company.value = collection.value.selectedCompany;
		isRegComp.value = collection.value.isRegComp;
		isMeterAddressSame.value = collection.value.isMeterAddressSame;
		address.value = collection.value.address;
		addressToggle.value = collection.value.addressToggle;
	});

	watch(isRegComp, (newVal, oldVal) => {
		const element1 = document.getElementById("registeredCompany");
		const element2 = document.getElementById("soleTrader");
		if (newVal === true) {
			element1.classList.add("dark:bg-gray-800");
			element1.classList.add("bg-gray-900/20");
			element2.classList.remove("dark:bg-gray-800");
			element2.classList.remove("bg-gray-900/20");
			element1.classList.remove("hover:bg-gray-900/20");
			element1.classList.remove("hover:dark:bg-gray-600/80");
		} else {
			element2.classList.add("dark:bg-gray-800");
			element2.classList.add("bg-gray-900/20");
			element1.classList.remove("dark:bg-gray-800");
			element1.classList.remove("bg-gray-900/20");
		}
	});

	const handleSelectedCompany = (data) => {
		company.value = data;
		console.log(company.value);
		address.value = company.value.registered_office_address;
		addressToggle.value = true;
		isMeterAddressSame.value = true;
	};

	const handleSelectedAddress = async (data) => {
		fetching.value = true;
		addressToggle.value = true;
		const res = await getAddressByID(data.id);
		address.value.postal_code = res.postcode;
		address.value.address_line_1 = res.line_1;
		address.value.address_line_2 = res.line_2;
		address.value.locality = res.locality;
		address.value.country = res.country;
		console.log(res);
		fetching.value = false;
	};

	const saveState = () => {
		const temp = localStorage.getItem("collection");
		collection.value = JSON.parse(temp);

		if (collection.value === null) {
			collection.value = new Object();
		}

		if (isRegComp.value) collection.value.isRegComp = isRegComp.value;

		if (isMeterAddressSame.value)
			collection.value.isMeterAddressSame = isMeterAddressSame.value;

		if (address.value) collection.value.address = address.value;

		if (addressToggle.value)
			collection.value.addressToggle = addressToggle.value;

		const jsonObj = JSON.stringify(collection.value);
		localStorage.setItem("collection", jsonObj);

		navigateTo("/owners");
	};
</script>
