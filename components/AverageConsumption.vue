<template>
	<div
		v-if="!calcAnnualConsumption && !isConsumptionCalculated"
		class="flex w-11/12 flex-col justify-center box-styling">
		<h1 class="md:text-3xl text-xl font-bold">
			What is your annual {{ field }} consumption in Kwh ?
		</h1>
		<div class="flex flex-col gap-2">
			<div class="relative">
				<div
					class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<i class="ri-book-read-fill"></i>
				</div>
				<input
					type="tel"
					maxlength="5"
					v-model="annualConsumption"
					class="w-full max-w-md font-medium md:text-base text-sm rounded block pl-10 p-3 focus:outline-none input-box-color"
					:class="{
						'error-style': isNaN(annualConsumption),
					}"
					placeholder="Annual consumption (Kwh)" />
			</div>
			<p class="error-msg-style" v-if="isNaN(annualConsumption)">
				*Invalid input, only numbers allowed
			</p>
		</div>

		<p
			@click="initAddItem()"
			class="font-semibold underline underline-offset-2 hover:dark:text-gray-200 hover:text-gray-700 pl-2 cursor-pointer md:text-base text-sm w-fit">
			I don't know, would like to calculate
		</p>
	</div>
	<div
		v-else-if="calcAnnualConsumption && !isConsumptionCalculated"
		class="flex w-11/12 flex-col justify-center box-styling">
		<h1 class="md:text-3xl text-xl font-bold">
			Calculate your annual Consumption
		</h1>
		<div
			v-for="(item, index) in readings"
			:key="item.label"
			class="flex flex-col gap-2">
			<h2 class="font-bold text-lg">{{ item.label }}</h2>
			<div class="flex gap-8">
				<div class="flex flex-col gap-2">
					<div class="flex justify-start gap-4">
						<div class="flex flex-col gap-2 font-medium">
							<label for="start-date">Start Date:</label>
							<input
								name="start-date"
								type="date"
								v-model="item.startDate"
								class="w-80 max-w-md font-medium md:text-base text-sm rounded block p-3 focus:outline-none input-box-color"
								placeholder="Select date" />
						</div>
						<div class="flex flex-col gap-2 font-medium">
							<label for="start-date-reading">Reading:</label>
							<input
								name="start-date-reading"
								type="text"
								v-model="item.startDateReading"
								class="w-80 max-w-md font-medium md:text-base text-sm rounded block p-3 focus:outline-none input-box-color"
								placeholder="Reading in Kwh"
								:class="{
									'error-style': isNaN(item.startDateReading),
								}" />
							<p class="error-msg-style" v-if="isNaN(item.startDateReading)">
								*Invalid
							</p>
						</div>
					</div>
					<div class="flex justify-start gap-4">
						<div class="flex flex-col gap-2 font-medium">
							<label for="end-date">End Date:</label>
							<input
								name="end-date"
								type="date"
								v-model="item.endDate"
								class="w-80 max-w-md font-medium md:text-base text-sm rounded block p-3 focus:outline-none input-box-color"
								placeholder="Select date" />
						</div>
						<div class="flex flex-col gap-2 font-medium">
							<label for="end-date-reading">Reading: </label>
							<input
								name="end-date-reading"
								type="text"
								v-model="item.endDateReading"
								class="w-80 max-w-md font-medium md:text-base text-sm rounded block p-3 focus:outline-none input-box-color"
								placeholder="Reading in Kwh"
								:class="{
									'error-style': isNaN(item.endDateReading),
								}" />
							<p class="error-msg-style" v-if="isNaN(item.endDateReading)">
								*Invalid
							</p>
						</div>
					</div>
				</div>
				<button
					type="button"
					@click="deleteItem(index)"
					class="flex text-2xl text-red-600 dark:text-red-500 hover:underline">
					<i class="ri-delete-bin-5-fill"></i>
				</button>
			</div>
		</div>
		<button
			@click="addItem"
			type="button"
			class="flex gap-2 items-center justify-center focus:outline-none text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-semibold rounded px-5 py-2.5 mr-2 mb-2 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800 w-fit">
			<i class="ri-add-line"></i>
			Add Item
		</button>
		<p
			@click="
				calcAnnualConsumption = false;
				saveState();
			"
			class="font-semibold underline underline-offset-2 hover:dark:text-gray-200 hover:text-gray-700 pl-2 cursor-pointer md:text-base text-sm w-fit">
			I know my annual consumption
		</p>
		<button
			v-if="!areReadingsEmpty()"
			class="button-style w-fit"
			@click="calculateAverage">
			Calculate
		</button>
	</div>
	<div
		v-else-if="!calcAnnualConsumption && isConsumptionCalculated"
		class="flex w-11/12 flex-col justify-center box-styling">
		<h1 class="md:text-3xl text-xl font-bold">
			Your average annual {{ field }} consumption:
		</h1>
		<div v-for="item in readings" :key="item.label" class="flex flex-col gap-2">
			<h2 class="font-bold text-xl dark:text-gray-400 text-gray-800">
				{{ item.label }}
			</h2>
			<div class="flex flex-col">
				<div class="flex text-lg gap-2">
					<p>
						Energy consumption on
						<span class="energy-consumption-details">{{ item.startDate }}</span
						>:
					</p>
					<p class="energy-consumption-details">
						{{ item.startDateReading }} Kwh
					</p>
				</div>
				<div class="flex text-lg gap-2">
					<p>
						Energy consumption on
						<span class="energy-consumption-details">{{ item.endDate }}:</span>
					</p>
					<p class="energy-consumption-details">
						{{ item.endDateReading }} Kwh
					</p>
				</div>
			</div>
		</div>
		<h2 class="font-bold text-xl dark:text-blue-500 text-blue-700">
			Average annual consumption: {{ annualConsumption.toFixed(2) }} Kwh
		</h2>
	</div>
</template>

<script setup>
	const isFetching = ref(false);
	const collection = ref(null);
	const annualConsumption = ref(null);
	const calcAnnualConsumption = ref(false);
	const isConsumptionCalculated = ref(false);
	const readings = ref(null);
	const { field } = defineProps(["field"]);
	const emit = defineEmits(["reloadCollection"]);

	onBeforeMount(() => {
		const temp = localStorage.getItem("collection");

		isFetching.value = true;
		collection.value = JSON.parse(temp);
		if (collection.value === null) {
			navigateTo("/");
			return;
		}

		if (
			collection.value[`${field}Readings`] !== undefined &&
			collection.value[`${field}Readings`] !== null
		) {
			readings.value = collection.value[`${field}Readings`];
		}

		if (
			collection.value[`${field}AnnualConsumption`] !== undefined &&
			collection.value[`${field}AnnualConsumption`] !== null
		) {
			annualConsumption.value = collection.value[`${field}AnnualConsumption`];
		}
		if (
			collection.value[`is${field}ConsumptionCalculated`] !== undefined &&
			collection.value[`is${field}ConsumptionCalculated`] !== null
		)
			isConsumptionCalculated.value =
				collection.value[`is${field}ConsumptionCalculated`];
		if (
			collection.value[`calc${field}AnnualConsumption`] !== undefined &&
			collection.value[`calc${field}AnnualConsumption`] !== null
		)
			calcAnnualConsumption.value =
				collection.value[`calc${field}AnnualConsumption`];

		isFetching.value = false;
	});

	watch(annualConsumption, (newVal, oldVal) => {
		saveState();
	});

	const initAddItem = () => {
		if (readings.value === null) {
			readings.value = new Array();
			addItem();
		}
		annualConsumption.value = null;
		calcAnnualConsumption.value = true;
		saveState();
	};

	const addItem = () => {
		console.log("add");
		if (readings.value === null) {
			readings.value = new Array();
		}

		readings.value.push({
			label: `Item ${readings.value.length + 1}`,
			startDate: null,
			startDateReading: null,
			endDate: null,
			endDateReading: null,
		});
		console.log(readings.value);
	};

	const deleteItem = (index) => {
		readings.value.splice(index, 1);
		saveState();
	};

	const areReadingsEmpty = () => {
		if (readings.value === null || readings.value === undefined) return true;

		for (let index = 0; index < readings.value.length; index++) {
			const element = readings.value[index];
			if (
				element.startDate === null ||
				element.startDateReading === null ||
				element.endDate === null ||
				element.endDateReading === null
			)
				return true;
			else if (
				element.startDate === "" ||
				element.startDateReading === "" ||
				element.endDate === "" ||
				element.endDateReading === ""
			)
				return true;
		}

		return false;
	};

	const calculateAverage = () => {
		let avg = 0;
		for (let index = 0; index < readings.value.length; index++) {
			const element = readings.value[index];
			let date1 = new Date(element.startDate);
			let date2 = new Date(element.endDate);

			let diff_days = (date2.getTime() - date1.getTime()) / (1000 * 3600 * 24);
			avg += (element.endDateReading - element.startDateReading) / diff_days;
		}
		if (avg !== 0) {
			if (field === "electric") annualConsumption.value = avg * 365;
			else if (field === "gas") annualConsumption.value = avg * 365 * 11.135413;
			calcAnnualConsumption.value = false;
			isConsumptionCalculated.value = true;
		}
		saveState();
	};

	const saveState = (path) => {
		const temp = localStorage.getItem("collection");
		collection.value = JSON.parse(temp);

		if (collection.value === null) return;

		if (readings.value) collection.value[`${field}Readings`] = readings.value;

		collection.value[`${field}AnnualConsumption`] = annualConsumption.value;
		collection.value[`calc${field}AnnualConsumption`] =
			calcAnnualConsumption.value;
		collection.value[`is${field}ConsumptionCalculated`] =
			isConsumptionCalculated.value;

		emit("reloadCollection", collection.value);

		if (path) navigateTo(path);
	};
</script>
