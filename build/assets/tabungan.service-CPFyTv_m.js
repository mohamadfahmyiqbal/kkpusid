import { r as __exportAll } from "./rolldown-runtime-Cf1989ZW.js";
import { gt as axios } from "./vendor-rpDlma0K.js";
//#region src/services/tabungan.service.js
var tabungan_service_exports = /* @__PURE__ */ __exportAll({
	TabunganService: () => TabunganService,
	default: () => TabunganService
});
var apiClient = axios.create({
	baseURL: "https://api.kkpus.id/api",
	timeout: 1e4,
	headers: { "Content-Type": "application/json" }
});
apiClient.interceptors.request.use((config) => {
	const token = localStorage.getItem("authToken") || localStorage.getItem("token");
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
}, (error) => {
	return Promise.reject(error);
});
apiClient.interceptors.response.use((response) => response, (error) => {
	if (error.response?.status === 401) {
		localStorage.removeItem("authToken");
		localStorage.removeItem("token");
		window.location.href = "/login";
	}
	return Promise.reject(error);
});
var TabunganService = {
	/**
	* Mengambil daftar master program tabungan yang aktif
	*/
	getAvailablePrograms: async () => {
		try {
			return (await apiClient.get("/tabungan/programs")).data;
		} catch (error) {
			console.error("Error fetching programs:", error);
			throw error;
		}
	},
	/**
	* Apply for a new savings target (Tabungan Haji, Umrah, dll)
	* @param {Object} data - Payload containing productType, nominalTarget, tenor, setoranAwal
	* @returns {Promise} Promise resolving to the created target and initial deposit transaction
	*/
	submitApplication: async (data) => {
		try {
			return (await apiClient.post("/tabungan/pengajuan", data)).data;
		} catch (error) {
			console.error("Error submitting savings application:", error);
			throw error;
		}
	},
	/**
	* Check if the member has an active or pending saving target for a specific master program
	* @param {string|number} savingTargetId - ID of the master program
	*/
	checkAccountStatus: async (savingTargetId) => {
		try {
			return (await apiClient.get(`/tabungan/pengajuan/check?saving_target_id=${savingTargetId}`)).data;
		} catch (error) {
			console.error(`Error checking account status for ${savingTargetId}:`, error);
			throw error;
		}
	},
	/**
	* Fetch bills generated for a specific savings target
	* @param {number} memberSavingTargetId - The ID of the savings target account
	*/
	getTabunganBills: async (memberSavingTargetId) => {
		try {
			return (await apiClient.get(`/tabungan/pengajuan/${memberSavingTargetId}/tagihan`)).data;
		} catch (error) {
			console.error(`Error fetching bills for tabungan ${memberSavingTargetId}:`, error);
			throw error;
		}
	},
	/**
	* Mengambil detail pengajuan target tabungan
	* @param {string|number} tabunganId
	*/
	getTabunganDetail: async (tabunganId) => {
		try {
			return await apiClient.get(`/tabungan/pengajuan/detail/${tabunganId}`);
		} catch (error) {
			console.error("Error fetching tabungan detail:", error);
			throw error;
		}
	},
	/**
	* Process payment for a tabungan bill
	* @param {Object} data - Payment data (e.g. amount, bill_item_id)
	*/
	processPayment: async (data) => {
		try {
			return (await apiClient.post("/billing/process-payment", data)).data;
		} catch (error) {
			console.error("Error processing tabungan payment:", error);
			throw error;
		}
	}
};
//#endregion
export { tabungan_service_exports as n, TabunganService as t };
