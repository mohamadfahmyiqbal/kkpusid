// src/utils/api/USimpanan.jsx

import http from "./common";

class USimpanan {
  /**
   * Mengambil informasi rekening simpanan anggota.
   * Method: GET
   * Endpoint asumsi: /simpanan/rekening/info
   */
  getSavingsAccountInfo() {
    return http.get("/api/simpanan/rekening/info");
  }

  /**
   * Mengambil riwayat transaksi simpanan.
   * Method: GET
   * Endpoint asumsi: /simpanan/riwayat
   * @param {Object} params - Filter untuk riwayat transaksi
   */
  getSavingsHistory(params) {
    return http.get("/api/simpanan/riwayat", { params });
  }

  /**
   * Mengajukan penarikan dana simpanan.
   * Method: POST
   * Endpoint asumsi: /simpanan/penarikan/request
   * @param {Object} data - Detail penarikan (e.g., jumlah, rekening tujuan)
   */
  requestWithdrawal(data) {
    return http.post("/api/simpanan/penarikan/request", data);
  }
}

export default new USimpanan();
