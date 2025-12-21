// src/utils/api/UBilling.jsx

import http from "./common";

/**
 * Service class untuk menangani semua API terkait Billing/Tagihan
 */
class UBilling {
  /**
   * Mengambil daftar tagihan yang belum dibayar (Pending)
   * @param {Object} filter - Objek filter, contoh: { category: "Simpanan Wajib" }
   */
  getPendingBills(filter = {}) {
    // Menghasilkan request: GET /list/pending?category=Simpanan+Wajib
    // Prefix /api/tagihan (atau sesuai config) sudah diatur di instance http
    return http.get("/list/pending", { params: filter });
  }

  /**
   * Mengambil riwayat transaksi yang sudah dibayar (Settled/Paid)
   * @param {Object} filter - Objek filter untuk riwayat
   */
  getBillingHistory(filter = {}) {
    // Menghasilkan request: GET /list/history
    return http.get("/list/history", { params: filter });
  }

  /**
   * Mengambil detail lengkap satu invoice berdasarkan ID
   * @param {string|number} billId - ID unik tagihan
   */
  getInvoiceDetail(billId) {
    // Menghasilkan request: GET /101
    return http.get(`/${billId}`);
  }

  /**
   * Membuat transaksi baru dan mendapatkan Snap Token dari Midtrans
   * @param {Object} data - Payload yang berisi bill_id atau array ids dan metode pembayaran
   */
  createMidtransTransaction(data) {
    // Menghasilkan request: POST /midtrans/create-transaction
    // Data biasanya berisi { bill_ids: [101, 102], payment_type: "midtrans" }
    return http.post("/midtrans/create-transaction", data);
  }

  /**
   * Mengecek status pembayaran terbaru ke backend
   * @param {string} orderId - Order ID dari Midtrans/Sistem
   */
  checkPaymentStatus(orderId) {
    return http.get(`/status/${orderId}`);
  }

  createDepositSukarela(payload) {
    // Menghasilkan request: POST /create-deposit
    // Backend akan membuat record bill baru dan mengembalikan bill_id
    return http.post("/create-deposit", payload);
  }
}

// Export sebagai instance agar bisa langsung digunakan: UBilling.getPendingBills()
export default new UBilling();
