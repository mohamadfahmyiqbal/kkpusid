// src/utils/api/UAnggota.jsx

import http from "./common"; // Wajib: Import instance Axios terkonfigurasi (dengan token)

/**
 * Utility Class untuk mengelola API Anggota (Member).
 */
class UAnggota {
  /**
   * Mengirim data pendaftaran anggota baru.
   * Method: POST
   * Endpoint asumsi: /anggota/pendaftaran
   *
   * @param {Object} formData - Semua data form pendaftaran (tanpa field 'komitmen').
   * @returns {Promise<Object>} Respon dari API.
   */
  submitPendaftaran(formData) {
    // Diasumsikan endpoint pendaftaran adalah '/anggota/pendaftaran'
    return http.post("/anggota/pendaftaran", formData);
  }

  /**
   * Mengambil daftar anggota (placeholder/contoh endpoint lain).
   */
  daftarAnggota(filter = {}) {
    // Endpoint asumsi: /anggota/list
    return http.get("/anggota/list", { params: filter });
  }
}

export default new UAnggota();
