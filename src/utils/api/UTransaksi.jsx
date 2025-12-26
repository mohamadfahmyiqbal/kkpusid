import http from "./common";

class UTransaksi {
  /**
   * Mengambil riwayat transaksi umum (semua jenis).
   * Endpoint Backend: GET /api/transaksi/riwayat
   * @param {Object} params - Filter (misal: { type: 'debit', status: 'settlement' })
   */
  getGeneralTransactionHistory(params) {
    // Karena baseURL sudah /api, kita sesuaikan path-nya
    return http.get("/transaksi/riwayat", { params });
  }

  /**
   * Mengambil detail transaksi berdasarkan ID.
   * Endpoint Backend: GET /api/transaksi/detail/:id
   * @param {number|string} id - ID unik transaksi
   */
  getTransactionDetail(id) {
    return http.get(`/transaksi/detail/${id}`);
  }

  /**
   * Memproses pembayaran tagihan atau transaksi lainnya secara umum.
   * Endpoint Backend: POST /api/transaksi/pembayaran/proses
   * @param {Object} data - Payload (misal: { invoiceId, paymentMethod })
   */
  processPayment(data) {
    return http.post("/transaksi/pembayaran/proses", data);
  }

  /**
   * Mengunduh struk atau bukti transaksi dalam format PDF (jika tersedia).
   * Endpoint Backend: GET /api/transaksi/receipt/:id
   */
  downloadReceipt(id) {
    return http.get(`/transaksi/receipt/${id}`, {
      responseType: 'blob' // Penting untuk menangani file download
    });
  }
}

export default new UTransaksi();