import http from "./common"; // Mengikuti struktur UGlobal.jsx: http = instance Axios yang telah dikonfigurasi

class UNotification {
  /**
   * Mengambil daftar notifikasi berdasarkan kriteria filter (e.g., status: 1).
   * Endpoint asumsi: /notifikasi/list
   *
   * @param {Object} filter - Kriteria filter, e.g., { status: [1], nik: '12345' }
   * @returns {Promise<Object>} Respon dari API
   */
  getNotificationByNik(filter = {}) {
    // http.get akan secara otomatis menangani parameter 'filter' sebagai query string
    return http.get("/notifikasi/list", { params: filter });
  }

  /**
   * Mengubah status notifikasi menjadi dibaca.
   * Endpoint asumsi: /notifikasi/update-status
   *
   * @param {number|number[]} idNotifikasi - ID notifikasi tunggal atau array ID.
   * @returns {Promise<Object>} Respon dari API
   */
  markAsRead(idNotifikasi) {
    // 2 adalah status asumsi untuk "sudah dibaca"
    const payload = {
      id: Array.isArray(idNotifikasi) ? idNotifikasi : [idNotifikasi],
      status: 2,
    };

    // Menggunakan http.post untuk mengirim payload perubahan status
    return http.post("/notifikasi/update-status", payload);
  }

  /**
   * Mengambil notifikasi tunggal (misalnya saat modal dibuka)
   * Endpoint asumsi: /notifikasi/detail/:id
   * @param {number} id - ID notifikasi.
   * @returns {Promise<Object>} Respon dari API
   */
  getNotificationDetail(id) {
    return http.get(`/notifikasi/detail/${id}`);
  }
}

// Mengekspor instance Class, sama seperti yang dilakukan UGlobal.jsx
export default new UNotification();
