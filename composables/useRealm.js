import * as Realm from "realm-web";
import axios from "axios";

export const useMyRealmApp = () => {
	const appId = useRuntimeConfig().public.APP_ID;

	const app = new Realm.App({
		id: appId,
	});

	const currentUser = app.currentUser;

	const getAddressSuggestions = async (postalCode) => {
		let data;
		const config = {
			method: "get",
			maxBodyLength: Infinity,
			url: `https://api.getAddress.io/autocomplete/${postalCode}?api-key=_pbjVCRqHkqsuZi0F-SucQ38173`,
		};

		await axios(config)
			.then(function (response) {
				data = response.data;
			})
			.catch(function (error) {
				console.log(error);
			});

		return data;
	};

	const getAddressByID = async (addressID) => {
		let data;
		const config = {
			method: "get",
			maxBodyLength: Infinity,
			url: `https://api.getAddress.io/get/${addressID}?api-key=_pbjVCRqHkqsuZi0F-SucQ38173`,
		};

		await axios(config)
			.then(function (response) {
				data = response.data;
			})
			.catch(function (error) {
				console.log(error);
			});

		return data;
	};

	return {
		app,
		Realm,
		currentUser,
		getAddressSuggestions,
		getAddressByID,
	};
};
