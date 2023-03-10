<template>
	<div class="flex w-full items-center gap-4 justify-center">
		<div
			class="flex flex-col 2xl:w-8/12 xl:w-10/12 w-full sm:p-8 gap-8 p-4 items-center relative">
			<button @click="saveState('/')" class="text-3xl absolute top-1/2 left-2">
				<i class="ri-arrow-left-circle-fill"></i>
			</button>
			<div class="flex w-11/12 flex-col justify-center box-styling">
				<h1 class="md:text-3xl text-xl font-bold">
					What quotation are you looking for ?
				</h1>
				<div class="flex gap-4 md:text-lg text-sm">
					<button
						id="electric"
						@click="quoteType = 'electric'"
						class="flex-1 flex flex-col p-4 font-semibold gap-4 items-center text-center option-box-styling">
						<img
							src="~/public/electric-meter.png"
							alt="Electric meter"
							class="md:w-[80px] w-[60px] aspect-square" />
						<p>Electric</p>
					</button>
					<button
						id="gas"
						@click="quoteType = 'gas'"
						class="flex-1 flex flex-col p-4 font-semibold gap-4 items-center text-center option-box-styling">
						<img
							src="~/public/gas-station.png"
							alt="Gas station"
							class="md:w-[80px] w-[60px] aspect-square" />
						<p>Gas</p>
					</button>
					<button
						id="both"
						@click="quoteType = 'both'"
						class="flex-1 flex flex-col p-4 font-semibold gap-4 items-center text-center option-box-styling">
						<img
							src="~/public/trader.png"
							alt="Sole Trader"
							class="md:w-[80px] w-[60px] aspect-square" />
						<p>Both</p>
					</button>
				</div>
			</div>
			<div
				v-if="quoteType === 'electric'"
				class="flex w-11/12 flex-col justify-center box-styling">
				<h1 class="md:text-3xl text-xl font-bold">
					Please enter your MPAN
					<span class="md:text-2xl text-lg"
						>(Meter Point Administration Number)</span
					>:
				</h1>
				<div class="flex lg:flex-row flex-col gap-4">
					<div class="flex basis-7/12 gap-4 items-center">
						<h1 class="md:text-5xl text-4xl font-bold">S</h1>
						<div class="flex w-full flex-col gap-2">
							<div class="flex gap-2">
								<input
									@keyup="clickEvent(null, $event, 'meter-time-switch-code')"
									id="profile-type"
									v-model="mpan.profileType"
									type="tel"
									pattern="[0-9]{2}"
									class="w-full font-medium md:text-base text-sm rounded p-3 focus:outline-none input-box-color text-center"
									size="1"
									maxlength="2"
									placeholder="##" />
								<input
									@keyup="
										clickEvent('profile-type', $event, 'line-loss-factor')
									"
									id="meter-time-switch-code"
									v-model="mpan.meterTimeSwitchCode"
									type="tel"
									pattern="[0-9]{3}"
									class="w-full font-medium md:text-base text-sm rounded p-3 focus:outline-none input-box-color text-center"
									size="2"
									maxlength="3"
									placeholder="###" />
								<input
									@keyup="
										clickEvent(
											'meter-time-switch-code',
											$event,
											'distributor-id'
										)
									"
									id="line-loss-factor"
									v-model="mpan.lineLossFactor"
									type="tel"
									pattern="[0-9]{3}"
									class="w-full font-medium md:text-base text-sm rounded p-3 focus:outline-none input-box-color text-center"
									size="2"
									maxlength="3"
									placeholder="###" />
							</div>
							<div class="flex gap-2">
								<input
									@keyup="
										clickEvent('line-loss-factor', $event, 'unique-number-1')
									"
									id="distributor-id"
									v-model="mpan.distributorId"
									type="tel"
									pattern="[0-9]{2}"
									class="w-full font-medium md:text-base text-sm rounded p-3 focus:outline-none input-box-color text-center"
									size="1"
									maxlength="2"
									placeholder="##" />
								<input
									type="tel"
									@keyup="
										clickEvent('distributor-id', $event, 'unique-number-2')
									"
									id="unique-number-1"
									v-model="mpan.uniqueNumber1"
									pattern="[0-9]{4}"
									class="w-full font-medium md:text-base text-sm rounded p-3 focus:outline-none input-box-color text-center"
									size="3"
									maxlength="4"
									placeholder="####" />
								<input
									type="tel"
									@keyup="clickEvent('unique-number-1', $event, 'check-digit')"
									id="unique-number-2"
									v-model="mpan.uniqueNumber2"
									pattern="[0-9]{4}"
									class="w-full font-medium md:text-base text-sm rounded p-3 focus:outline-none input-box-color text-center"
									size="3"
									maxlength="4"
									placeholder="####" />
								<input
									type="tel"
									@keyup="clickEvent('unique-number-2', $event)"
									id="check-digit"
									v-model="mpan.checkDigit"
									pattern="[0-9]{3}"
									class="w-full font-medium md:text-base text-sm rounded p-3 focus:outline-none input-box-color text-center"
									size="2"
									maxlength="3"
									placeholder="###" />
							</div>
						</div>
					</div>

					<div class="flex basis-5/12 flex-col gap-4 justify-center">
						<h2>
							Here's an example of what your MPAN number on your meter or bill
							should look like:
						</h2>
						<img
							src="~/public/mpan-number.png"
							alt="MPAN Guide"
							class="md:w-64 w-48" />
					</div>
				</div>
			</div>
			<div
				v-if="quoteType === 'gas'"
				class="flex w-11/12 flex-col justify-center box-styling">
				<h1 class="md:text-3xl text-xl font-bold">
					Please enter your MPRN
					<span class="md:text-2xl text-lg"
						>(Meter Point Reference Number)</span
					>
				</h1>
				<div class="relative">
					<div
						class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
						<i class="ri-book-read-fill"></i>
					</div>
					<input
						type="tel"
						v-model="mprn"
						minlength="6"
						maxlength="10"
						class="w-full max-w-md font-medium md:text-base text-sm rounded block pl-10 p-3 focus:outline-none input-box-color"
						:class="{
							'!text-red-400 border': isNaN(mprn),
						}"
						placeholder="MPR number" />
				</div>
				<p class="w-fit text-red-400 font-medium" v-if="isNaN(mprn)">
					*Invalid
				</p>
			</div>
			<div
				v-if="company && quoteType"
				class="flex w-11/12 flex-col justify-center box-styling">
				<h1
					v-if="installationAddressToggle && quoteType === 'electric'"
					class="md:text-3xl text-xl font-bold">
					Is your meter address same as company address ?
				</h1>
				<h1
					v-else-if="installationAddressToggle && quoteType === 'gas'"
					class="md:text-3xl text-xl font-bold">
					Is your gas address same as company address ?
				</h1>
				<h1
					v-if="!installationAddressToggle && quoteType === 'electric'"
					class="md:text-3xl text-xl font-bold">
					Meter address
				</h1>
				<h1
					v-if="!installationAddressToggle && quoteType === 'gas'"
					class="md:text-3xl text-xl font-bold">
					Gas address
				</h1>
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
						<div v-if="installationAddress.address_line_1">
							<span class="details-heading">Address line 1: </span>
							<p class="details-body">
								{{ installationAddress.address_line_1 }}
							</p>
						</div>
						<div v-if="installationAddress.address_line_2">
							<span class="details-heading">Address line 2: </span>
							<p class="details-body">
								{{ installationAddress.address_line_2 }}
							</p>
						</div>
						<div v-if="installationAddress.locality">
							<span class="details-heading">Locality: </span>
							<p class="details-body">
								{{ installationAddress.locality }}
							</p>
						</div>
						<div v-if="installationAddress.postal_code">
							<span class="details-heading">Postal code: </span>
							<p class="details-body">
								{{ installationAddress.postal_code }}
							</p>
						</div>
						<div v-if="installationAddress.country">
							<span class="details-heading">Country: </span>
							<p class="details-body">
								{{ installationAddress.country }}
							</p>
						</div>
					</div>
					<div v-else class="flex-1 flex flex-col gap-4">
						<span class="font-semibold">Postal code: </span>
						<AddressDropdown @selected-address="handleSelectedAddress" />
					</div>
				</div>
				<div v-if="!fetching" class="flex gap-4 items-center sm:flex-row">
					<button
						v-if="installationAddressToggle === true"
						class="button-style"
						@click="saveState('/meter')">
						<p>Yes</p>
					</button>
					<button
						v-if="installationAddressToggle === true"
						class="button-style-gray"
						@click="installationAddressToggle = addressToggle = false">
						<p>No, I want to change it</p>
					</button>
					<button
						v-if="
							installationAddressToggle === false && addressToggle === false
						"
						class="button-style-gray"
						@click="addressToggle = true">
						<p>Cancel</p>
					</button>
					<button
						v-if="installationAddressToggle === false && addressToggle === true"
						class="button-style-gray"
						@click="installationAddressToggle = addressToggle = false">
						<p>Change</p>
					</button>
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
	const { getAddressByID } = useMyRealmApp();
	const fetching = ref(false);
	const installationAddressToggle = ref(true);
	const addressToggle = ref(true);

	const collection = ref(null);
	const quoteType = ref(null);
	const company = ref(null);
	const installationAddress = ref(null);
	const mprn = ref(null);
	const mpan = ref({
		profileType: null,
		meterTimeSwitchCode: null,
		lineLossFactor: null,
		distributorId: null,
		uniqueNumber1: null,
		uniqueNumber2: null,
		checkDigit: null,
	});

	onBeforeMount(() => {
		const temp = localStorage.getItem("collection");

		collection.value = JSON.parse(temp);
		if (collection.value === null) {
			navigateTo("/");
			return;
		}

		if (
			collection.value.selectedCompany !== undefined &&
			collection.value.selectedCompany !== null
		)
			company.value = collection.value.selectedCompany;
		else navigateTo("/");

		if (
			collection.value.quoteType !== undefined &&
			collection.value.quoteType !== null
		)
			quoteType.value = collection.value.quoteType;

		if (collection.value.mpan !== undefined && collection.value.mpan !== null)
			mpan.value = collection.value.mpan;

		if (collection.value.mprn !== undefined && collection.value.mprn !== null)
			mprn.value = collection.value.mprn;

		if (
			collection.value.installationAddress !== undefined &&
			collection.value.installationAddress !== null
		) {
			installationAddress.value = collection.value.installationAddress;
			installationAddressToggle.value = false;
		} else {
			installationAddress.value = company.value.registered_office_address;
			installationAddressToggle.value = true;
		}
	});

	const handleSelectedAddress = async (data) => {
		fetching.value = true;
		addressToggle.value = true;
		const res = await getAddressByID(data.id);
		installationAddress.value.postal_code = res.postcode;
		installationAddress.value.address_line_1 = res.line_1;
		installationAddress.value.address_line_2 = res.line_2;
		installationAddress.value.locality = res.locality;
		installationAddress.value.country = res.country;
		console.log(res);
		fetching.value = false;
		saveState();
	};

	const saveState = (path) => {
		const temp = localStorage.getItem("collection");
		collection.value = JSON.parse(temp);

		if (collection.value === null) return;

		if (quoteType.value) {
			collection.value.quoteType = quoteType.value;
		}

		if (mpan.value) {
			collection.value.mpan = mpan.value;
		}

		if (mprn.value) {
			collection.value.mprn = mprn.value;
		}

		if (installationAddress.value) {
			collection.value.installationAddress = installationAddress.value;
		}

		const jsonObj = JSON.stringify(collection.value);
		localStorage.setItem("collection", jsonObj);

		if (path) navigateTo(path);
	};

	const clickEvent = (previous, current, next) => {
		const elm = current.target.value;
		console.log(current.key);
		if (
			elm.length === current.target.maxLength &&
			current.key !== "ArrowLeft" &&
			current.key !== "Backspace" &&
			next
		) {
			document.getElementById(next).focus();
		}

		if (elm.length === 0 && previous && current.key === "Backspace") {
			console.log(current);
			document.getElementById(previous).focus();
		}
	};

	watch(quoteType, (newVal, oldVal) => {
		const electric = document.getElementById("electric");
		const gas = document.getElementById("gas");
		const both = document.getElementById("both");

		if (newVal === "electric") {
			electric.classList.add("dark:bg-gray-700/50");
			electric.classList.add("bg-gray-900/20");

			gas.classList.remove("dark:bg-gray-700/50");
			gas.classList.remove("bg-gray-900/20");

			both.classList.remove("dark:bg-gray-700/50");
			both.classList.remove("bg-gray-900/20");
		} else if (newVal === "gas") {
			gas.classList.add("dark:bg-gray-700/50");
			gas.classList.add("bg-gray-900/20");

			electric.classList.remove("dark:bg-gray-700/50");
			electric.classList.remove("bg-gray-900/20");

			both.classList.remove("dark:bg-gray-700/50");
			both.classList.remove("bg-gray-900/20");
		} else if (newVal === "both") {
			both.classList.add("dark:bg-gray-700/50");
			both.classList.add("bg-gray-900/20");

			electric.classList.remove("dark:bg-gray-700/50");
			electric.classList.remove("bg-gray-900/20");

			gas.classList.remove("dark:bg-gray-700/50");
			gas.classList.remove("bg-gray-900/20");
		}

		saveState();
	});
</script>

<style lang="scss" scoped></style>
