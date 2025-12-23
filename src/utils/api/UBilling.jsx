// 📁 src/utils/api/UBilling.jsx
import http from "./common";

class UBilling {
  /**
   * Mengambil daftar tagihan yang belum dibayar
   */
  getPendingBills(filter = {}) {
    return http.get("/list/pending", { params: filter });
  }

  /**
   * Mengambil riwayat transaksi yang sudah lunas
   */
  getBillingHistory(filter = {}) {
    return http.get("/list/history", { params: filter });
  }

  /**
   * Mengambil detail lengkap satu invoice berdasarkan bill_id
   */
  getInvoiceDetail(billId) {
    return http.get(`/${billId}`);
  }

  /**
   * [BARU] Membuat Tagihan Simpanan Sekaligus Mendapatkan Snap Token
   * Digunakan oleh BillingPage untuk alur "Satu Kali Klik"
   * Payload: { amount: 500000, category: "Simpanan Sukarela" }
   */
  processSavingsPayment(payload) {
    // Endpoint ini akan memanggil fungsi yang kita satukan dengan createInitialBills di backend
    return http.post("/midtrans/process-savings", payload);
  }

  /**
   * Inisialisasi transaksi Midtrans untuk Bill ID yang SUDAH ADA di database
   * (Misal untuk membayar tagihan yang tertunda dari menu riwayat)
   */
  createMidtransTransaction(data) {
    return http.post("/midtrans/create-transaction", data);
  }

  /**
   * Mengecek status pembayaran terbaru ke backend
   */
  checkPaymentStatus(orderId) {
    return http.get(`/status/${orderId}`);
  }
}

export default new UBilling();