<template>
	<div class="w-full">
		<input
			@click="calcDropdownWidth"
			id="dropdownDefaultButton"
			type="text"
			v-model="companyName"
			class="w-full max-w-lg font-medium md:text-base text-sm rounded block p-3 focus:outline-none input-box-color"
			placeholder="Company name" />
		<!-- <div class="flex flex-col justify-center w-full items-center h-full">
		</div> -->

		<div
			id="dropdown"
			class="z-10 hidden overflow-y-scroll bg-gray-200 divide-y divide-gray-100 rounded shadow-sm max-h-[300px] dark:bg-gray-800">
			<ul
				v-if="(topHit !== null || fetching === true) && companyName.length >= 2"
				class="py-2 text-sm text-gray-700 dark:text-gray-200"
				aria-labelledby="dropdownDefaultButton">
				<li v-if="fetching" class="flex px-4 py-2 justify-center">
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
				</li>
				<div v-if="!fetching">
					<li
						v-for="comp in companyArray"
						:key="comp.id"
						@click="dropdownSelect($event, comp)">
						<p
							class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
							{{ comp.company_name }}
						</p>
					</li>
				</div>
			</ul>
		</div>
	</div>
</template>

<script setup>
	import { Dropdown } from "flowbite";

	const { companyName, selectedCompany, companyArray, topHit } = UseMyState();
	const dropdown = ref();
	const fetching = ref(false);
	const emit = defineEmits(["selectedCompany"]);
	const { currentUser } = useMyRealmApp();
	const collection = ref(null);
	const companyOwners = ref(null);

	onBeforeMount(async () => {
		const temp = localStorage.getItem("collection");

		collection.value = JSON.parse(temp);
		if (collection.value === null) return;
		companyName.value = collection.value.companyName;
		selectedCompany.value = collection.value.selectedCompany;
		companyArray.value = collection.value.companyArray;
		topHit.value = collection.value.topHit;
		companyOwners.value = collection.value.companyOwners;
	});

	onMounted(async () => {
		const $targetEl = document.getElementById("dropdown");
		const $triggerEl = document.getElementById("dropdownDefaultButton");

		const options = {
			placement: "bottom",
			triggerType: "click",
			offsetSkidding: 0,
			offsetDistance: 10,
			delay: 300,
		};

		dropdown.value = new Dropdown($targetEl, $triggerEl, options);
	});

	const calcDropdownWidth = () => {
		let button = document.getElementById("dropdownDefaultButton");
		let dropdownElement = document.getElementById("dropdown");
		dropdownElement.style.width = `${button.offsetWidth}px`;
		console.log(dropdownElement.style.width);
	};

	watch(companyName, async (newVal, oldVal) => {
		if (selectedCompany.value && newVal === selectedCompany.value.company_name)
			return;
		else if (newVal === "") {
			dropdown.value.hide();
			return;
		} else if (newVal.length >= 2) {
			fetching.value = true;
			let result = await currentUser.callFunction("getCompany", newVal);
			if (result === null) return;
			result = JSON.parse(result);
			topHit.value = result.top_hit;
			companyArray.value = result.items;
			console.log(result);
			fetching.value = false;
			dropdown.value.show();
		}
	});

	const saveState = () => {
		const temp = localStorage.getItem("collection");
		collection.value = JSON.parse(temp);

		if (collection.value === null) {
			let temp = {};
			temp.companyName = companyName.value;
			temp.selectedCompany = selectedCompany.value;
			temp.companyArray = companyArray.value;
			temp.companyOwners = companyOwners.value;

			const jsonObj = JSON.stringify(temp);
			localStorage.setItem("collection", jsonObj);
			return;
		}

		collection.value.companyName = companyName.value;
		collection.value.selectedCompany = selectedCompany.value;
		collection.value.companyArray = companyArray.value;
		collection.value.companyOwners = companyOwners.value;

		const jsonObj = JSON.stringify(collection.value);
		localStorage.setItem("collection", jsonObj);
	};

	const dropdownSelect = async (event, data) => {
		companyName.value = data.company_name;
		dropdown.value.hide();
		selectedCompany.value = data;
		let temp = await currentUser.callFunction(
			"getCompanyOwner",
			data.company_number
		);
		companyOwners.value = JSON.parse(temp);
		console.log(companyOwners.value);
		saveState();
		emit("selectedCompany", data, companyOwners.value);
	};
</script>

<style lang="scss" scoped></style>
