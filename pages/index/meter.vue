<template>
	<div class="flex w-full items-center gap-4 justify-center">
		<div
			v-if="collection"
			class="flex flex-col md:w-8/12 w-full sm:p-8 gap-8 p-4 items-center justify-center relative">
			<button
				@click="saveState('/details')"
				class="text-3xl absolute top-1/2 left-2">
				<i class="ri-arrow-left-circle-fill"></i>
			</button>
			<div class="flex w-11/12 flex-col justify-center box-styling">
				<h1 class="md:text-3xl text-xl font-bold">Details</h1>
				<div class="flex flex-col gap-4">
					<div class="grid md:grid-cols-2 gap-4">
						<div
							v-if="quoteType === 'electric' || quoteType === 'both'"
							class="w-full flex flex-col gap-2">
							<h1 class="font-semibold">
								Choose your current electricity supplier:
							</h1>
							<SearchDropdown
								@reload-collection="reloadCollection"
								:list="suppliers"
								:header="`Supplier`"
								:field="`electricSupplier`" />
						</div>
						<div
							v-if="quoteType === 'gas' || quoteType === 'both'"
							class="w-full flex flex-col gap-2">
							<h1 class="font-semibold">Choose your current gas supplier:</h1>
							<SearchDropdown
								@reload-collection="reloadCollection"
								:list="suppliers"
								:header="`Supplier`"
								:field="`gasSupplier`" />
						</div>
						<div class="w-full flex flex-col gap-2">
							<h1 class="font-semibold">Choose your business type:</h1>
							<SearchDropdown
								@reload-collection="reloadCollection"
								:list="businessTypes"
								:header="`Business Type`"
								:field="`businessType`" />
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
							<p
								class="error-msg-style"
								v-if="error.code === ERROR_INVALID_EMAIL">
								{{ error.msg }}
							</p>
						</div>
						<div class="w-full flex flex-col gap-2 font-medium">
							<label for="email" class="font-semibold">Phone:</label>
							<div class="relative">
								<div
									class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
									:class="{
										'error-text-style': isNaN(phone),
									}">
									<i class="ri-phone-fill"></i>
								</div>
								<input
									name="phone"
									type="tel"
									maxlength="10"
									v-model="phone"
									class="w-full max-w-md font-medium md:text-base text-sm rounded block pl-10 p-3 focus:outline-none input-box-color"
									:class="{
										'error-style': isNaN(phone),
									}"
									placeholder="1234567890" />
							</div>
							<p
								class="error-msg-style"
								v-if="error.code === ERROR_INVALID_PHONE || isNaN(phone)">
								*Invalid phone number
							</p>
						</div>
					</div>
				</div>
			</div>
			<AverageConsumption
				@reload-collection="reloadCollection"
				v-if="quoteType === 'electric' || quoteType === 'both'"
				:field="`electric`" />
			<AverageConsumption
				@reload-collection="reloadCollection"
				v-if="quoteType === 'gas' || quoteType === 'both'"
				:field="`gas`" />
			<button
				@click="submitForm()"
				v-if="isCollectionSet()"
				class="button-style text-xl">
				Submit
			</button>
			<button v-else class="button-style text-xl !cursor-not-allowed" disabled>
				Submit
			</button>
		</div>
	</div>
</template>

<script setup>
	const { currentUser } = useMyRealmApp();
	const ERROR_INVALID_EMAIL = ref(101);
	const ERROR_INVALID_PHONE = ref(102);
	const collection = ref(null);
	const quoteType = ref(null);
	const email = ref(null);
	const error = ref({ code: "", msg: "" });
	const phone = ref(null);
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

		if (
			collection.value.quoteType !== undefined &&
			collection.value.quoteType !== null
		)
			quoteType.value = collection.value.quoteType;
		else {
			navigateTo("/details");
		}

		if (collection.value.email !== undefined && collection.value.email !== null)
			email.value = collection.value.email;

		if (collection.value.phone !== undefined && collection.value.phone !== null)
			phone.value = collection.value.phone;
	});

	const saveState = (path) => {
		const temp = localStorage.getItem("collection");
		collection.value = JSON.parse(temp);

		if (collection.value === null) return;

		if (email.value) {
			if (!validateEmail(email.value)) {
				error.value.code = ERROR_INVALID_EMAIL.value;
				error.value.msg = "*Invalid email";

				return;
			}
			collection.value.email = email.value;
		}

		if (phone.value) {
			if (!validatePhone(phone.value)) {
				error.value.code = ERROR_INVALID_PHONE.value;
				error.value.msg = "Invalid phone number";
				console.log("error");
				return;
			}
			collection.value.phone = phone.value;
		}

		error.value.code = null;
		error.value.msg = null;

		const jsonObj = JSON.stringify(collection.value);
		localStorage.setItem("collection", jsonObj);

		if (path) navigateTo(path);
	};

	const validateEmail = (inputText) => {
		if (inputText === null) return;
		const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (inputText.match(mailFormat)) {
			return true;
		} else {
			return false;
		}
	};

	const validatePhone = (inputNumber) => {
		if (inputNumber === null) return;
		const numberFormat =
			/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
		if (inputNumber.match(numberFormat)) {
			return true;
		} else {
			return false;
		}
	};

	const isCollectionSet = () => {
		let flag = true;

		if (collection.value === null) return false;
		else if (
			email.value === null ||
			email.value === undefined ||
			email.value === ""
		)
			flag = false;
		else if (
			phone.value === null ||
			phone.value === undefined ||
			phone.value === ""
		)
			flag = false;
		else if (
			collection.value.businessType === null ||
			collection.value.businessType === undefined ||
			collection.value.businessType === ""
		)
			flag = false;
		else {
			switch (quoteType.value) {
				case "electric":
					if (!isElectricFieldsSet()) flag = false;
					break;
				case "gas":
					if (!isGasFieldsSet()) flag = false;
					break;
				case "both":
					if (!isElectricFieldsSet()) flag = false;
					else if (!isGasFieldsSet()) flag = false;
			}
		}

		// if (flag === true) {
		// 	error.value.code = null;
		// 	error.value.msg = null;
		// }

		return flag;
	};

	const isElectricFieldsSet = () => {
		let flag = true;

		if (collection.value.mpan === null || collection.value.mpan === undefined)
			flag = false;
		else if (
			collection.value.electricSupplier === null ||
			collection.value.electricSupplier === undefined
		)
			flag = false;
		else if (
			collection.value.electricAnnualConsumption === null ||
			collection.value.electricAnnualConsumption === undefined ||
			collection.value.electricAnnualConsumption === "" ||
			Number(collection.value.electricAnnualConsumption) === 0 ||
			isNaN(collection.value.electricAnnualConsumption)
		) {
			flag = false;
		}

		return flag;
	};

	const isGasFieldsSet = () => {
		let flag = true;

		if (
			collection.value.mprn === null ||
			collection.value.mprn === undefined ||
			Number(collection.value.mprn) === 0 ||
			collection.value.mprn === "" ||
			isNaN(collection.value.mprn)
		)
			flag = false;
		else if (
			collection.value.gasSupplier === null ||
			collection.value.gasSupplier === undefined
		)
			flag = false;
		else if (
			collection.value.gasAnnualConsumption === null ||
			collection.value.gasAnnualConsumption === undefined ||
			Number(collection.value.gasAnnualConsumption) === 0 ||
			collection.value.gasAnnualConsumption === "" ||
			isNaN(collection.value.gasAnnualConsumption)
		) {
			console.log("OK");
			flag = false;
		}

		return flag;
	};

	const reloadCollection = (data) => {
		collection.value = data;
		const jsonObj = JSON.stringify(collection.value);
		localStorage.setItem("collection", jsonObj);
		// saveState();
	};

	const submitForm = () => {
		// @TODO: check if all the values are set
		if (!validateEmail(email.value)) {
			error.value.code = ERROR_INVALID_EMAIL.value;
			error.value.msg = "*Invalid email";
			return;
		} else if (!validatePhone(phone.value)) {
			error.value.code = ERROR_INVALID_PHONE.value;
			error.value.msg = "Invalid phone number";
			return;
		}
		console.log("ERROR");

		const mongo = currentUser.mongoClient("mongodb-atlas");
		const recordsCollection = mongo.db("db1").collection("records");

		let temp = {};

		temp.is_registered_company = collection.value.isRegComp;
		temp.company = collection.value.selectedCompany;
		temp.owner = collection.value.selectedOwner;
		temp.quote_type = collection.value.quoteType;
		temp.installation_address = collection.value.installationAddress;
		temp.business_type = collection.value.businessType;
		temp.email = email.value;
		temp.phone = phone.value;

		switch (collection.value.quoteType) {
			case "electric":
				temp.mpan = collection.value.mpan;
				temp.electric_annual_consumption =
					collection.value.electricAnnualConsumption;
				temp.electric_supplier = collection.value.electricSupplier;
				break;
			case "gas":
				temp.mprn = collection.value.mprn;
				temp.gas_annual_consumption = collection.value.gasAnnualConsumption;
				temp.gas_supplier = collection.value.gasSupplier;
				break;
			case "both":
				temp.mpan = collection.value.mpan;
				temp.mprn = collection.value.mprn;
				temp.electric_annual_consumption =
					collection.value.electricAnnualConsumption;
				temp.gas_annual_consumption = collection.value.gasAnnualConsumption;
				temp.electric_supplier = collection.value.electricSupplier;
				temp.gas_supplier = collection.value.gasSupplier;
		}
		console.log(temp);
		recordsCollection.insertOne(temp).then((res) => {
			console.log(res);
			localStorage.removeItem("collection");
			navigateTo("/submitted");
		});
	};
</script>

<style lang="scss" scoped></style>
