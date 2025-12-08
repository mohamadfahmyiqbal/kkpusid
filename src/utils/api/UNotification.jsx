import http from "./common"; // Wajib: Import instance Axios terkonfigurasi (dengan token)

/**
 * Utility Class untuk mengelola API Notifikasi Anggota.
 * (Asumsi: Endpoint sudah dikonfigurasi di sisi backend)
 */
class UNotification {
  /**
   * Mengambil daftar notifikasi berdasarkan kriteria filter (e.g., status: 1).
   * Method: GET
   * Endpoint asumsi: /api/notifikasi/list
   *
   * @param {Object} filter - Kriteria filter, e.g., { status: [1], nik: '12345' }
   * @returns {Promise<Object>} Respon dari API
   */
  getNotificationById(filter = {}) {
    // http.get akan secara otomatis menangani parameter 'filter' sebagai query string
    return http.get("/notifikasi/list", { params: filter });
  }

  /**
   * Mengambil detail notifikasi tunggal.
   * Method: GET
   * Endpoint asumsi: /api/notifikasi/detail/:id
   *
   * @param {number} idNotifikasi - ID notifikasi tunggal.
   * @returns {Promise<Object>} Respon dari API
   */
  getNotificationDetail(idNotifikasi) {
    if (!idNotifikasi) {
      return Promise.reject(new Error("ID Notifikasi wajib diisi."));
    }
    return http.get(`/api/notifikasi/detail/${idNotifikasi}`);
  }

  /**
   * Mengubah status notifikasi menjadi sudah dibaca (Read).
   * Method: POST
   * Endpoint asumsi: /api/notifikasi/update-status
   *
   * @param {number|number[]} idNotifikasi - ID notifikasi tunggal atau array ID.
   * @returns {Promise<Object>} Respon dari API
   */
  markAsRead(idNotifikasi) {
    // Status 2 adalah status asumsi untuk "sudah dibaca"
    const READ_STATUS = 2;

    // Pastikan input adalah array, lalu siapkan payload
    const payload = {
      id: Array.isArray(idNotifikasi) ? idNotifikasi : [idNotifikasi],
      status: READ_STATUS,
    };

    // Menggunakan http.post untuk mengirim payload perubahan status
    return http.post("/api/notifikasi/update-status", payload);
  }
}

// Ekspor instance tunggal dari class UNotification
export default new UNotification();
