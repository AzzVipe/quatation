<template>
	<div class="flex w-full items-center gap-4 justify-center">
		<div
			class="flex flex-col 2xl:w-8/12 xl:w-10/12 w-full sm:p-8 gap-8 p-4 items-center relative">
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
							class="md:w-[80px] w-[60px]" />
						<p>I have a Registered Company</p>
					</button>
					<button
						id="soleTrader"
						@click="isRegComp = false"
						class="flex-1 flex flex-col p-4 font-semibold gap-4 items-center text-center option-box-styling">
						<img
							src="~/public/trader.png"
							alt="Sole Trader"
							class="md:w-[80px] w-[60px]" />
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
				v-if="selectedOwner === null && company && isRegComp"
				class="flex w-11/12 flex-col justify-center box-styling">
				<h1 class="md:text-3xl text-xl font-bold">Company owner</h1>
				<div
					v-if="selectOwnerToggle"
					class="flex flex-wrap gap-8 sm:text-base text-sm">
					<!-- <h1 class="font-medium text-lg">{{ companyOwners.items }}</h1> -->
					<div
						@click="clickedOwner(item)"
						v-for="(item, index) in companyOwners.items"
						:key="item.id"
						class="flex gap-2">
						<input
							:id="`item-${index}`"
							type="radio"
							:value="index"
							class="self-start rounded scale-105"
							name="owner" />
						<label
							:for="`item-${index}`"
							class="hover:bg-slate-200 hover:dark:bg-gray-400/10 rounded p-2">
							<div class="flex gap-2" v-if="item.name">
								<h1 class="details-heading">Fullname:</h1>
								<p class="details-body">
									{{ item.name }}
								</p>
							</div>
							<div v-if="item.address">
								<div class="flex gap-2" v-if="item.address.address_line_1">
									<span class="details-heading">Address line 1: </span>
									<p class="details-body">
										{{ item.address.address_line_1 }}
									</p>
								</div>
								<div class="flex gap-2" v-if="item.address.address_line_2">
									<span class="details-heading">Address line 2: </span>
									<p class="details-body">
										{{ item.address.address_line_2 }}
									</p>
								</div>
								<div class="flex gap-2" v-if="item.address.locality">
									<span class="details-heading">Locality: </span>
									<p class="details-body">
										{{ item.address.locality }}
									</p>
								</div>
								<div class="flex gap-2" v-if="item.address.region">
									<span class="details-heading">Region: </span>
									<p class="details-body">
										{{ item.address.region }}
									</p>
								</div>
								<div class="flex gap-2" v-if="item.address.postal_code">
									<span class="details-heading">Postal code: </span>
									<p class="details-body">
										{{ item.address.postal_code }}
									</p>
								</div>
								<div class="flex gap-2" v-if="item.address.country">
									<span class="details-heading">Country: </span>
									<p class="details-body">
										{{ item.address.country }}
									</p>
								</div>
							</div>
							<div class="flex gap-2" v-if="item.date_of_birth">
								<h1 class="details-heading">Date of birth:</h1>
								<p class="details-body">
									{{ item.date_of_birth.month }}/{{ item.date_of_birth.year }}
								</p>
							</div>
						</label>
					</div>
					<div @click="selectOwnerToggle = false" class="flex gap-2">
						<input
							id="item-others"
							type="radio"
							class="self-start rounded scale-105"
							name="owner" />
						<label
							for="item-others"
							class="hover:bg-slate-200 h-fit hover:dark:bg-gray-400/10 rounded p-2"
							>Others</label
						>
					</div>
				</div>
				<div v-else class="flex flex-col gap-4">
					<div class="w-full flex flex-wrap gap-4">
						<div class="w-full grid grid-auto-column gap-4">
							<div class="flex flex-col gap-2 font-medium">
								<label class="font-semibold" for="first-name"
									>First name:</label
								>
								<div class="relative">
									<div
										class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
										<i class="ri-input-method-fill"></i>
									</div>
									<input
										name="first-name"
										v-model="customOwner.firstName"
										type="text"
										class="w-full max-w-md font-medium md:text-base text-sm rounded block pl-10 p-3 focus:outline-none input-box-color"
										placeholder="First name" />
								</div>
							</div>
							<div class="flex flex-col gap-2 font-medium">
								<label class="font-semibold" for="last-name">Last name:</label>
								<div class="relative">
									<div
										class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
										<i class="ri-input-method-fill"></i>
									</div>
									<input
										v-model="customOwner.lastName"
										name="last-name"
										type="text"
										class="w-full max-w-md font-medium md:text-base text-sm rounded block pl-10 p-3 focus:outline-none input-box-color"
										placeholder="Last name" />
								</div>
							</div>
							<div class="flex flex-col gap-2 font-medium">
								<label class="font-semibold" for="start-date"
									>Date of birth:</label
								>
								<input
									v-model="customOwner.dob"
									name="start-date"
									type="date"
									class="w-full max-w-lg font-medium md:text-base text-sm rounded block p-3 focus:outline-none input-box-color"
									placeholder="DOB" />
							</div>
						</div>

						<div class="w-full flex flex-col gap-2 font-medium">
							<span class="font-semibold">Postal code: </span>
							<AddressDropdown @selected-address="handleOwnerSelectedAddress" />
						</div>
					</div>
					<div class="flex gap-4 pt-2">
						<button class="button-style" @click="addCustomOwner()">Done</button>
						<button class="button-style-gray" @click="selectOwnerToggle = true">
							Cancel
						</button>
					</div>
				</div>
			</div>
			<div
				v-else-if="company && isRegComp"
				class="flex w-11/12 flex-col justify-center box-styling">
				<h1 class="md:text-3xl text-xl font-bold">Company owner</h1>
				<div class="w-full grid grid-auto-column gap-4">
					<div v-if="selectedOwner.name">
						<span class="details-heading">Fullname</span>
						<p class="details-body">
							{{ selectedOwner.name }}
						</p>
					</div>
					<div v-if="selectedOwner.date_of_birth">
						<span class="details-heading">Date of Birth</span>
						<p class="details-body" v-if="selectedOwner.date_of_birth.month">
							{{ selectedOwner.date_of_birth.year }} /
							{{ selectedOwner.date_of_birth.month }}
						</p>
						<p v-else>{{ selectedOwner.date_of_birth }}</p>
					</div>
					<div v-if="selectedOwner.address.address_line_1">
						<span class="details-heading">Address line 1: </span>
						<p class="details-body">
							{{ selectedOwner.address.address_line_1 }}
						</p>
					</div>
					<div v-if="selectedOwner.address.address_line_2">
						<span class="details-heading">Address line 2: </span>
						<p class="details-body">
							{{ selectedOwner.address.address_line_2 }}
						</p>
					</div>
					<div v-if="selectedOwner.address.locality">
						<span class="details-heading">Locality: </span>
						<p class="details-body">
							{{ selectedOwner.address.locality }}
						</p>
					</div>
					<div v-if="selectedOwner.address.region">
						<span class="details-heading">Region: </span>
						<p class="details-body">
							{{ selectedOwner.address.region }}
						</p>
					</div>
					<div v-if="selectedOwner.address.postal_code">
						<span class="details-heading">Postal code: </span>
						<p class="details-body">
							{{ selectedOwner.address.postal_code }}
						</p>
					</div>
					<div v-if="selectedOwner.address.country">
						<span class="details-heading">Country: </span>
						<p class="details-body">
							{{ selectedOwner.address.country }}
						</p>
					</div>
					<!-- <div v-if="selectedOwner.address" class="flex flex-wrap gap-2"></div> -->
				</div>
				<button class="button-style-gray w-fit" @click="selectedOwner = null">
					Reset
				</button>
			</div>
			<button
				@click="saveState('/details')"
				class="text-3xl absolute top-2/4 right-2">
				<i class="ri-arrow-right-circle-fill"></i>
			</button>
		</div>
	</div>
</template>

<script setup>
	const { getAddressByID } = useMyRealmApp();
	const collection = ref(null);

	const isRegComp = ref(false);
	const selectOwnerToggle = ref(true);
	const company = ref(null);
	const companyOwners = ref(null);
	const selectedOwner = ref(null);
	const customOwner = ref({ name: "", address: {}, dob: "" });

	onBeforeMount(() => {
		const temp = localStorage.getItem("collection");

		collection.value = JSON.parse(temp);
		if (collection.value === null) return;

		company.value = collection.value.selectedCompany;
		isRegComp.value = collection.value.isRegComp;

		if (collection.value.companyOwners !== undefined) {
			companyOwners.value = collection.value.companyOwners;
		}

		if (collection.value.selectedOwner !== undefined) {
			selectedOwner.value = collection.value.selectedOwner;
			console.log(selectedOwner.value);
		}
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

	const handleSelectedCompany = (data, owners) => {
		company.value = data;
		companyOwners.value = owners;
		// console.log(company.value);
		saveState();
	};

	const handleOwnerSelectedAddress = async (data) => {
		const res = await getAddressByID(data.id);
		customOwner.value.address.postal_code = res.postcode;
		customOwner.value.address.address_line_1 = res.line_1;
		customOwner.value.address.address_line_2 = res.line_2;
		customOwner.value.address.locality = res.locality;
		customOwner.value.address.country = res.country;
		// customOwner.value.address = data;
	};

	const clickedOwner = (item) => {
		if (selectedOwner.value === null || selectedOwner.value === undefined) {
			selectedOwner.value = new Object();
		}
		selectedOwner.value.name = item.name;
		selectedOwner.value.address = item.address;
		selectedOwner.value.date_of_birth = item.date_of_birth;

		saveState();
	};

	const addCustomOwner = () => {
		// @TODO: check if fields are empty
		if (selectedOwner.value === null || selectedOwner.value === undefined) {
			selectedOwner.value = new Object();
		}
		selectedOwner.value.name =
			customOwner.value.firstName + " " + customOwner.value.lastName;
		selectedOwner.value.address = customOwner.value.address;
		selectedOwner.value.date_of_birth = customOwner.value.dob;
		saveState();
		// console.log(customOwner.value.address, selectedOwner.value.address);
	};

	const saveState = (path) => {
		const temp = localStorage.getItem("collection");
		collection.value = JSON.parse(temp);

		if (collection.value === null) {
			collection.value = new Object();
		}

		if (company.value === null) return;

		collection.value.isRegComp = isRegComp.value;
		collection.value.selectedOwner = selectedOwner.value;

		const jsonObj = JSON.stringify(collection.value);
		localStorage.setItem("collection", jsonObj);

		if (path) navigateTo(path);
	};
</script>
