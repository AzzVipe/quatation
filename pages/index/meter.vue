<template>
	<div class="flex w-full items-center gap-4 justify-center">
		<div
			v-if="!isFetching"
			class="flex flex-col md:w-8/12 w-full sm:p-8 gap-8 p-4 items-center relative">
			<button
				@click="saveState('/details')"
				class="text-3xl absolute top-1/2 left-2">
				<i class="ri-arrow-left-circle-fill"></i>
			</button>
			<div
				v-if="!calcAnnualConsumption && !flag"
				class="flex w-11/12 flex-col justify-center box-styling">
				<h1 class="md:text-3xl text-xl font-bold">
					What is your Annual Consumption in Kwh ?
				</h1>
				<div class="relative">
					<div
						class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
						<i class="ri-book-read-fill"></i>
					</div>
					<input
						type="text"
						v-model="annualConsumption"
						class="w-full max-w-md font-medium md:text-base text-sm rounded block pl-10 p-3 focus:outline-none input-box-color"
						:class="{
							'!text-red-400 border': isNaN(annualConsumption),
						}"
						placeholder="Annual consumption (Kwh)" />
				</div>
				<p
					class="w-fit text-red-400 font-medium"
					v-if="isNaN(annualConsumption)">
					*Invalid
				</p>

				<p
					@click="initAddItem()"
					class="font-semibold underline underline-offset-2 hover:dark:text-gray-200 hover:text-gray-700 pl-2 cursor-pointer md:text-base text-sm">
					I don't know, would like to calculate
				</p>
				<button class="button-style w-fit" @click="saveState('/submit')">
					Done
				</button>
			</div>
			<div
				v-else-if="calcAnnualConsumption && !flag"
				class="flex w-11/12 flex-col justify-center box-styling">
				<h1 class="md:text-3xl text-xl font-bold">
					Calculate your Annual Consumption
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
											'!text-red-400 border': isNaN(item.startDateReading),
										}" />
									<p
										class="w-fit text-red-400 font-medium"
										v-if="isNaN(item.startDateReading)">
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
											'!text-red-400 border': isNaN(item.endDateReading),
										}" />
									<p
										class="w-fit text-red-400 font-medium"
										v-if="isNaN(item.endDateReading)">
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
					@click="calcAnnualConsumption = false"
					class="font-semibold underline underline-offset-2 hover:dark:text-gray-200 hover:text-gray-700 pl-2 cursor-pointer md:text-base text-sm w-fit">
					I know my annual consumption
				</p>
				<button
					v-if="!areReadingsEmpty()"
					class="button-style w-fit"
					@click="calculateQuote">
					Calculate
				</button>
			</div>
			<div
				v-else-if="!calcAnnualConsumption && flag"
				class="flex w-11/12 flex-col justify-center box-styling">
				<h1 class="md:text-3xl text-xl font-bold">
					Your average annual consumption:
				</h1>
				<div
					v-for="item in readings"
					:key="item.label"
					class="flex flex-col gap-2">
					<h2 class="font-bold text-xl dark:text-gray-400 text-gray-800">
						{{ item.label }}
					</h2>
					<div class="flex flex-col">
						<div class="flex text-lg gap-2">
							<p>
								Energy consumption on
								<span class="energy-consumption-details">{{
									item.startDate
								}}</span
								>:
							</p>
							<p class="energy-consumption-details">
								{{ item.startDateReading }} Kwh
							</p>
						</div>
						<div class="flex text-lg gap-2">
							<p>
								Energy consumption on
								<span class="energy-consumption-details"
									>{{ item.endDate }}:</span
								>
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
			<button
				@click="saveState('/submit')"
				class="text-3xl absolute top-2/4 right-2">
				<i class="ri-arrow-right-circle-fill"></i>
			</button>
		</div>
	</div>
</template>

<script setup>
	const annualConsumption = ref(null);
	const calcAnnualConsumption = ref(false);
	const collection = ref(null);
	const readings = ref(null);
	const flag = ref(false);
	const isFetching = ref(false);

	onBeforeMount(() => {
		const temp = localStorage.getItem("collection");

		isFetching.value = true;
		collection.value = JSON.parse(temp);
		if (collection.value === null) {
			navigateTo("/");
			return;
		}
		console.log(collection.value);
		if (
			collection.value.readings !== undefined ||
			collection.value.readings !== null
		) {
			console.log(collection.value.readings);
			readings.value = collection.value.readings;
		}

		if (
			collection.value.annualConsumption !== undefined &&
			collection.value.annualConsumption !== null
		) {
			annualConsumption.value = collection.value.annualConsumption;

			if (collection.value.flag !== undefined)
				flag.value = collection.value.flag;
			if (
				collection.value.calcAnnualConsumption !== undefined &&
				collection.value.calcAnnualConsumption !== null
			)
				calcAnnualConsumption.value = collection.value.calcAnnualConsumption;
		}

		isFetching.value = false;
	});

	const saveState = (path) => {
		const temp = localStorage.getItem("collection");
		collection.value = JSON.parse(temp);

		if (collection.value === null) return;

		if (annualConsumption.value)
			collection.value.annualConsumption = annualConsumption.value;

		if (readings.value) collection.value.readings = readings.value;

		collection.value.calcAnnualConsumption = calcAnnualConsumption.value;
		collection.value.flag = flag.value;

		const jsonObj = JSON.stringify(collection.value);
		localStorage.setItem("collection", jsonObj);

		if (path) navigateTo(path);
	};

	const initAddItem = () => {
		if (readings.value === null) {
			readings.value = new Array();
			addItem();
		}
		calcAnnualConsumption.value = true;
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
		saveState();
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

	const calculateQuote = () => {
		let avg = 0;
		for (let index = 0; index < readings.value.length; index++) {
			const element = readings.value[index];
			let date1 = new Date(element.startDate);
			let date2 = new Date(element.endDate);

			let diff_days = (date2.getTime() - date1.getTime()) / (1000 * 3600 * 24);
			avg += (element.endDateReading - element.startDateReading) / diff_days;
			console.log(date1, date2, diff_days);
		}
		console.log(avg);
		if (avg !== 0) {
			annualConsumption.value = avg * 365;
			calcAnnualConsumption.value = false;
			flag.value = true;
		}
		saveState();
	};
	// onMounted(() => {
	// 	const dateRangePickerEl = document.getElementById("datePickerId");
	// 	new Datepicker(dateRangePickerEl);
	// });
</script>

<style lang="scss" scoped></style>
