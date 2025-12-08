// src/utils/api/UBilling.jsx

import http from "./common"; // Wajib: Import instance Axios terkonfigurasi (dengan token)

/**
 * Utility Class untuk mengelola API Tagihan (Billing).
 */
class UBilling {
  /**
   * Mengambil daftar tagihan yang tertunda (pending) atau belum dibayar.
   * Method: GET
   * Endpoint asumsi: /api/tagihan/list/pending
   *
   * @param {Object} filter - Kriteria filter, e.g., { no_anggota: 'PUS-007', limit: 3 }
   * @returns {Promise<Object>} Respon dari API (misalnya: { data: { total_count: 5, list: [...] } })
   */
  getPendingBills(filter = {}) {
    // Diasumsikan backend menggunakan query string untuk filter
    return http.get("/tagihan/list/pending", { params: filter });
  }

  // Tambahkan fungsi lain (misalnya: markAsPaid, getDetailBill, dll) di sini.
}

export default new UBilling();
