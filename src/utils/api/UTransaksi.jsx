import http from "./common";

class UTransaksi {
  /**
   * Mengambil riwayat pengajuan pembiayaan (transaksi pembelian).
   * Menuju ke: controllers/financing/getFinancingHistory.js
   * Endpoint Backend: GET /api/financing/history
   */
  getGeneralTransactionHistory(params) {
    // Diubah dari /transaksi/riwayat menjadi /financing/history
    return http.get("/financing/history", { params });
  }

  /**
   * Mengirim form pengajuan pembelian baru.
   * Menuju ke: controllers/financing/createFinancingApplication.js
   * Endpoint Backend: POST /api/financing/apply
   */
  submitPengajuan(data) {
    return http.post("/financing/apply", data);
  }

  /**
   * Mengambil detail transaksi berdasarkan ID.
   * Tetap dipertahankan jika Anda memiliki endpoint detail di modul transaksi umum.
   */
  getFinancingDetail(id) {
    return http.get(`/financing/detail/${id}`);
    // Pastikan path /financing/detail/${id} sesuai dengan route di Express/Backend Anda
  }

  /**
   * Mengunduh struk atau bukti transaksi.
   */
  downloadReceipt(id) {
    return http.get(`/transaksi/receipt/${id}`, {
      responseType: "blob",
    });
  }
}

export default new UTransaksi();
