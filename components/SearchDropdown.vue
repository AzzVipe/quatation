<template>
	<div v-if="list">
		<button
			:id="`dropdownSearchButton-${header}`"
			:data-dropdown-toggle="`dropdownSearch-${header}`"
			data-dropdown-placement="bottom"
			class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold tracking-wide rounded text-lg px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			type="button">
			{{ selectedItem }}
			<svg
				class="w-4 h-4 ml-2"
				aria-hidden="true"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M19 9l-7 7-7-7"></path>
			</svg>
		</button>

		<!-- Dropdown menu -->
		<div
			:id="`dropdownSearch-${header}`"
			class="z-10 hidden bg-white rounded-lg shadow w-60 dark:bg-gray-700">
			<div class="p-3">
				<label for="input-group-search" class="sr-only">Search</label>
				<div class="relative">
					<div
						class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
						<svg
							class="w-5 h-5 text-gray-500 dark:text-gray-400"
							aria-hidden="true"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg">
							<path
								fill-rule="evenodd"
								d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
								clip-rule="evenodd"></path>
						</svg>
					</div>
					<input
						v-model="searchedItem"
						type="text"
						id="input-group-search"
						class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						:placeholder="`${header}`" />
				</div>
			</div>
			<ul
				class="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
				:aria-labelledby="`dropdownSearchButton-${header}`">
				<li
					v-for="(item, index) in getList()"
					:key="item.id"
					@click="saveState()">
					<div
						class="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
						<input
							:id="`item-${index}-${header}`"
							name="default-radio"
							type="radio"
							:value="`${item}`"
							v-model="selectedItem"
							class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
						<label
							:for="`item-${index}-${header}`"
							class="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
							>{{ item }}</label
						>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
	import { Dropdown } from "flowbite";
	const { list, header } = defineProps(["list", "header"]);
	const selectedItem = ref(null);
	const searchedItem = ref(null);
	const dropdown = ref(null);
	const collection = ref(null);
	const loading = ref(false);

	onBeforeMount(() => {
		loading.value = true;
		const temp = localStorage.getItem("collection");
		collection.value = JSON.parse(temp);
		selectedItem.value = collection.value[header];

		if (selectedItem.value === undefined) selectedItem.value = header;
		loading.value = false;
	});

	onMounted(() => {
		const $targetEl = document.getElementById(`dropdownSearch-${header}`);
		const $triggerEl = document.getElementById(
			`dropdownSearchButton-${header}`
		);
		const options = {
			placement: "bottom",
			triggerType: "click",
			offsetSkidding: 0,
			offsetDistance: 10,
			delay: 300,
		};
		dropdown.value = new Dropdown($targetEl, $triggerEl, options);
	});

	const getList = () => {
		if (searchedItem.value === null) {
			return list;
		}

		return list.filter((item) => {
			return item.toLowerCase().includes(searchedItem.value);
		});
	};

	watch(selectedItem, (newVal, oldVal) => {
		// console.log(oldVal, newVal);
		if (oldVal === null) return;
		const temp = localStorage.getItem("collection");
		collection.value = JSON.parse(temp);

		if (collection.value === null) {
			let temp = {};
			temp[header] = newVal;

			const jsonObj = JSON.stringify(temp);
			// console.log(temp[header]);
			localStorage.setItem("collection", jsonObj);
			return;
		}

		collection.value[header] = newVal;
		const jsonObj = JSON.stringify(collection.value);
		console.log(collection.value[header]);
		localStorage.setItem("collection", jsonObj);
	});

	const saveState = () => {
		dropdown.value.hide();
		// console.log(selectedItem.value);
	};
</script>

<style lang="scss" scoped></style>
