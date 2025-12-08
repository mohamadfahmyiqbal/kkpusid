// src/utils/api/UInvestasi.jsx

import http from "./common";

class UInvestasi {
  /**
   * Mengambil ringkasan portofolio investasi anggota.
   * Method: GET
   * Endpoint asumsi: /investasi/portofolio/summary
   */
  getPortofolioSummary() {
    return http.get("/api/investasi/portofolio/summary");
  }

  /**
   * Mengambil daftar produk investasi yang tersedia.
   * Method: GET
   * Endpoint asumsi: /investasi/produk/list
   */
  getAvailableProducts() {
    return http.get("/api/investasi/produk/list");
  }

  /**
   * Mengajukan order pembelian sukuk/pendanaan.
   * Method: POST
   * Endpoint asumsi: /investasi/order/submit
   * @param {Object} data - Detail order (e.g., produkId, jumlah, tenor)
   */
  submitOrder(data) {
    return http.post("/api/investasi/order/submit", data);
  }
}

export default new UInvestasi();
