// src/utils/api/UTransaksi.jsx

import http from "./common";

class UTransaksi {
  /**
   * Mengambil riwayat transaksi umum (semua jenis).
   * Method: GET
   * Endpoint asumsi: /transaksi/riwayat
   * @param {Object} params - Filter untuk riwayat transaksi (tanggal, jenis)
   */
  getGeneralTransactionHistory(params) {
    return http.get("/api/transaksi/riwayat", { params });
  }

  /**
   * Mengambil detail transaksi berdasarkan ID.
   * Method: GET
   * Endpoint asumsi: /transaksi/detail/:id
   * @param {number} id - ID transaksi
   */
  getTransactionDetail(id) {
    return http.get(`/api/transaksi/detail/${id}`);
  }

  /**
   * Memproses pembayaran tagihan atau transaksi lainnya.
   * Method: POST
   * Endpoint asumsi: /transaksi/pembayaran/proses
   * @param {Object} data - Detail pembayaran (e.g., invoiceId, virtualAccountId)
   */
  processPayment(data) {
    return http.post("/api/transaksi/pembayaran/proses", data);
  }
}

export default new UTransaksi();
