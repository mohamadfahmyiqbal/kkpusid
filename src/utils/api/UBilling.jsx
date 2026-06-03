// 📁 src/utils/api/UBilling.js
import http from "./common";

class UBilling {
  /**
   * Mengambil daftar tagihan yang belum dibayar (Pokok/Wajib)
   */
  getPendingBills(filter = {}) {
    return http.get("/billing/list/pending", { params: filter });
  }

  /**
   * Mengambil riwayat transaksi yang sudah selesai/diproses
   */
  getBillingHistory(filter = {}) {
    return http.get("/billing/list/history", { params: filter });
  }

  /**
   * Mengambil detail invoice berdasarkan array ID item tagihan atau billId
   */
  getInvoiceDetail(billItemIds, billId) {
    return http.post("/billing/invoice/details", {
      bill_item_ids: billItemIds,
      bill_id: billId,
    });
  }

  /**
   * KHUSUS SUKARELA:
   * Membuat item tagihan (bill_item) baru berdasarkan nominal input user.
   * Digunakan sebelum redirect ke halaman invoice.
   */
  createVoluntaryBill(payload) {
    // payload: { category: "SIMPANAN_SUKARELA", amount: 50000 }
    return http.post("/billing/create-voluntary-bill", payload);
  }

  /**
   * Membuat transaksi Midtrans (Mendapatkan Snap Token)
   * Data payload: { bill_item_ids: [1, 2], tx_category: "SIMPANAN" }
   */
  createMidtransTransaction(data) {
    return http.post("/billing/process-payment", data);
  }

  /**
   * Method tambahan jika Anda memiliki alur deposit langsung
   */
  createDepositSukarela(payload) {
    return http.post("/billing/create-deposit", payload);
  }

  /**
   * Method tambahan untuk pemrosesan simpanan internal
   */
  processSavingsPayment(payload) {
    return http.post("/billing/process-savings", payload);
  }
}

const uBilling = new UBilling();

export default uBilling;
