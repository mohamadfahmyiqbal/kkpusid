import { gt as axios } from "./vendor-rpDlma0K.js";
//#region src/services/profileService.js
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
/**
* Profile Service untuk mengelola data profil anggota
*/
var profileService = {
	/**
	* Mendapatkan data profil anggota
	* @returns {Promise} Promise yang resolve dengan data profil
	*/
	getProfile: async () => {
		try {
			return (await apiClient.get("/anggota/profil")).data;
		} catch (error) {
			console.error("Error fetching profile:", error);
			if (error.response?.status === 404) throw new Error("Data anggota tidak ditemukan. Anda belum terdaftar sebagai anggota penuh atau data tidak ada.");
			if (error.response?.data?.message) throw new Error(error.response.data.message);
			throw new Error("Terjadi kesalahan saat memuat data profil.");
		}
	},
	/**
	* Update data profil anggota
	* @param {Object} profileData - Data profil yang akan diupdate
	* @param {string} profileData.full_name - Nama lengkap
	* @param {string} profileData.phone_number - Nomor telepon
	* @param {string} profileData.address - Alamat
	* @returns {Promise} Promise yang resolve dengan data yang diupdate
	*/
	updateProfile: async (profileData) => {
		try {
			return (await apiClient.put("/anggota/profil", profileData)).data;
		} catch (error) {
			console.error("Error updating profile:", error);
			if (error.response?.status === 400) {
				const errorMessage = error.response.data.message;
				if (errorMessage.includes("wajib diisi")) throw new Error("Semua field wajib diisi dengan benar");
				else if (errorMessage.includes("telepon")) throw new Error("Format nomor telepon tidak valid");
				else if (errorMessage.includes("digunakan oleh anggota lain")) throw new Error("Nomor telepon sudah digunakan oleh anggota lain");
				else throw new Error(errorMessage);
			} else if (error.response?.status === 404) throw new Error("Data anggota tidak ditemukan");
			else if (error.code === "ECONNABORTED") throw new Error("Timeout - Server tidak merespon");
			else throw new Error("Terjadi kesalahan saat memperbarui profil");
		}
	},
	/**
	* Mapping data dari backend ke frontend format
	* @param {Object} backendData - Data dari backend API
	* @returns {Object} Data dalam format frontend
	*/
	mapBackendToFrontend: (backendData) => {
		return {
			nama: backendData.full_name || "",
			email: backendData.email || "",
			telepon: backendData.phone_number || "",
			no_anggota: backendData.member_no || "",
			jabatan: backendData.member_type || "Anggota",
			alamat: backendData.address || "",
			nik_ktp: backendData.nik_ktp || "",
			province_id: backendData.province_id || "",
			city_id: backendData.city_id || "",
			district_id: backendData.district_id || "",
			subdistrict_id: backendData.subdistrict_id || "",
			rt: backendData.rt || "",
			rw: backendData.rw || "",
			foto: backendData.photo || "",
			status_id: backendData.status_id || 1,
			member_type: backendData.member_type || "Anggota Aktif",
			gender: backendData.gender || "-",
			join_date: backendData.join_date || "-",
			bank_account_no: backendData.bank_info?.bank_account_no || "-",
			bank_name: backendData.bank_info?.bank_name || "-",
			account_holder: backendData.bank_info?.account_holder || "-",
			bank_info: backendData.bank_info || null,
			occupation: backendData.employment_info?.occupation || "",
			employer_name: backendData.employment_info?.employer_name || "",
			employer_address: backendData.employment_info?.employer_address || "",
			employment_info: backendData.employment_info || null,
			contact_name: backendData.emergency_contact_info?.contact_name || "",
			phone_number_emergency: backendData.emergency_contact_info?.phone_number || "",
			relation: backendData.emergency_contact_info?.relation || "",
			emergency_contact_info: backendData.emergency_contact_info || null,
			updated_at: backendData.updated_at || "-"
		};
	},
	/**
	* Mapping data dari frontend ke backend format
	* @param {Object} frontendData - Data dari frontend form
	* @returns {Object} Data dalam format backend API
	*/
	mapFrontendToBackend: (frontendData) => {
		return {
			full_name: frontendData.nama?.trim() || "",
			phone_number: frontendData.telepon?.trim() || "",
			address: frontendData.alamat?.trim() || "",
			nik_ktp: frontendData.nik_ktp?.trim() || "",
			province_id: frontendData.province_id || null,
			city_id: frontendData.city_id || null,
			district_id: frontendData.district_id || null,
			subdistrict_id: frontendData.subdistrict_id || null,
			rt: frontendData.rt?.trim() || "",
			rw: frontendData.rw?.trim() || "",
			bank_name: frontendData.bank_name?.trim() || "",
			bank_account_no: frontendData.bank_account_no?.trim() || "",
			account_holder: frontendData.account_holder?.trim() || "",
			occupation: frontendData.occupation?.trim() || "",
			employer_name: frontendData.employer_name?.trim() || "",
			employer_address: frontendData.employer_address?.trim() || "",
			contact_name: frontendData.contact_name?.trim() || "",
			phone_number_emergency: frontendData.phone_number_emergency?.trim() || "",
			relation: frontendData.relation?.trim() || ""
		};
	}
};
//#endregion
export { profileService as t };
