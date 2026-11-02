import { t as api } from "./common-qX05v8MF.js";
//#region src/utils/api/USimpanan.jsx
var USimpanan = class {
	/**
	* Mengambil detail rekening simpanan member berdasarkan kategori (product_code)
	* Digunakan untuk sinkronisasi saldo real-time di halaman penarikan.
	* @param {string|Object} params - Contoh: 'SS_SUKARELA' atau { category: 'SS_SUKARELA' }
	* @param {Object} [config] - Konfigurasi axios seperti signal
	*/
	getAccountDetail(params, config = {}) {
		const finalParams = typeof params === "string" ? { category: params } : params;
		return api.get("/simpanan/account-detail", {
			params: finalParams,
			...config
		});
	}
	/**
	* Mengambil riwayat pengajuan penarikan (Withdrawals)
	* Digunakan untuk list riwayat di bagian bawah PenarikanSimpananPage.
	* @param {Object} params - Contoh: { category: 'SS_SUKARELA' }
	* @param {Object} [config] - Konfigurasi axios seperti signal
	*/
	getWithdrawalHistory(params, config = {}) {
		return api.get("/simpanan/penarikan/history", {
			params,
			...config
		});
	}
	/**
	* Mengambil riwayat transaksi simpanan (General/Setoran)
	* @param {string|Object} params - { category: "Simpanan Pokok" } atau "SS_SUKARELA"
	* @param {Object} [config] - Konfigurasi axios seperti signal
	*/
	getSavingsHistory(params, config = {}) {
		const finalParams = typeof params === "string" ? { category: params } : params;
		return api.get("/simpanan/riwayat", {
			params: finalParams,
			...config
		});
	}
	/**
	* Mengambil daftar master produk simpanan yang tersedia
	*/
	getProducts() {
		return api.get("/simpanan/products");
	}
	/**
	* Request penarikan / pencairan dana (Transfer atau Tunai)
	* @param {Object} data - Payload berisi amount, method, dan detail tujuan
	*/
	requestWithdrawal(data) {
		return api.post("/simpanan/penarikan/request", data);
	}
	/**
	* Mengambil informasi detail rekening simpanan member secara umum
	*/
	getSavingsAccountInfo() {
		return api.get("/simpanan/rekening/info");
	}
	/**
	* ==========================
	* DETAIL PENARIKAN SIMPANAN
	* ==========================
	* Digunakan di TransactionDetailPage untuk melihat progres pencairan
	* @param {string|number} withdrawalId
	*/
	getWithdrawalDetail(withdrawalId) {
		return api.get(`/simpanan/penarikan/detail/${withdrawalId}`);
	}
};
var uSimpanan = new USimpanan();
//#endregion
export { uSimpanan as t };
