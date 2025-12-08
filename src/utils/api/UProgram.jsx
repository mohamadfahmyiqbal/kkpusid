// src/utils/api/UProgram.jsx

import http from "./common";

class UProgram {
  /**
   * Mengambil daftar program pinjaman yang tersedia.
   * Method: GET
   * Endpoint asumsi: /program/pinjaman/produk
   */
  getLoanProducts() {
    return http.get("/api/program/pinjaman/produk");
  }

  /**
   * Mengajukan permohonan pinjaman baru.
   * Method: POST
   * Endpoint asumsi: /program/pinjaman/apply
   * @param {Object} data - Detail aplikasi pinjaman
   */
  applyLoan(data) {
    return http.post("/api/program/pinjaman/apply", data);
  }

  /**
   * Mengambil detail program arisan.
   * Method: GET
   * Endpoint asumsi: /program/arisan/detail/:id
   * @param {number} id - ID program arisan
   */
  getArisanDetail(id) {
    return http.get(`/api/program/arisan/detail/${id}`);
  }

  /**
   * Bergabung dengan program arisan tertentu.
   * Method: POST
   * Endpoint asumsi: /program/arisan/join
   * @param {Object} data - Detail partisipasi
   */
  joinArisan(data) {
    return http.post("/api/program/arisan/join", data);
  }
}

export default new UProgram();
