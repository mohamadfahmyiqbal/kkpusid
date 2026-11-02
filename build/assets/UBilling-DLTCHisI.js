import { t as api } from "./common-qX05v8MF.js";
//#region src/utils/api/UBilling.jsx
var UBilling = class {
	/**
	* Mengambil daftar tagihan yang belum dibayar (Pokok/Wajib)
	*/
	getPendingBills(filter = {}) {
		return api.get("/billing/list/pending", { params: filter });
	}
	/**
	* Mengambil riwayat transaksi yang sudah selesai/diproses
	*/
	getBillingHistory(filter = {}) {
		return api.get("/billing/list/history", { params: filter });
	}
	/**
	* Mengambil detail invoice berdasarkan array ID item tagihan atau billId
	*/
	getInvoiceDetail(billItemIds, billId) {
		return api.post("/billing/invoice/details", {
			bill_item_ids: billItemIds,
			bill_id: billId
		});
	}
	/**
	* KHUSUS SUKARELA:
	* Membuat item tagihan (bill_item) baru berdasarkan nominal input user.
	* Digunakan sebelum redirect ke halaman invoice.
	*/
	createVoluntaryBill(payload) {
		return api.post("/billing/create-voluntary-bill", payload);
	}
	/**
	* Membuat transaksi Midtrans (Mendapatkan Snap Token)
	* Data payload: { bill_item_ids: [1, 2], tx_category: "SIMPANAN" }
	*/
	createMidtransTransaction(data) {
		return api.post("/billing/process-payment", data);
	}
	/**
	* Mengambil daftar rekening resmi Koperasi untuk pembayaran transfer manual
	*/
	getCooperativeBanks() {
		return api.get("/billing/cooperative-banks");
	}
	/**
	* Submit bukti transfer pembayaran manual
	*/
	submitManualPayment(formData) {
		return api.post("/billing/manual-payment", formData, { headers: { "Content-Type": "multipart/form-data" } });
	}
	/**
	* Method tambahan jika Anda memiliki alur deposit langsung
	*/
	createDepositSukarela(payload) {
		return api.post("/billing/create-deposit", payload);
	}
	/**
	* Method tambahan untuk pemrosesan simpanan internal
	*/
	processSavingsPayment(payload) {
		return api.post("/billing/process-savings", payload);
	}
	/**
	* Menarik paksa status transaksi dari Midtrans (berguna di localhost / webhook gagal)
	*/
	syncMidtransStatus(orderId) {
		return api.post("/billing/sync-status", { order_id: orderId });
	}
	/**
	* Memicu sinkronisasi ringkasan finansial dan laporan jual beli secara manual (berguna di localhost)
	*/
	manualSyncSummary() {
		return api.post("/billing/manual-sync-summary");
	}
	/**
	* Mengambil konfigurasi biaya admin pembayaran
	*/
	getPaymentFeeConfigs() {
		return api.get("/billing/payment-fees");
	}
};
var uBilling = new UBilling();
//#endregion
export { uBilling as t };
