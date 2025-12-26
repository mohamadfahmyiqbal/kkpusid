import http from "./common";

class UNotification {
  getNotifications(filter = {}) {
    return http.get("/notifikasi/list", { params: filter });
  }

  markAsRead(idNotifikasi) {
    // Memastikan payload dikirim sebagai array 'id' agar cocok dengan backend
    const payload = {
      id: Array.isArray(idNotifikasi) ? idNotifikasi : [idNotifikasi]
    };
    return http.post("/notifikasi/update-status", payload);
  }

  getNotificationDetail(idNotifikasi) {
    return http.get(`/notifikasi/detail/${idNotifikasi}`);
  }
}

export default new UNotification();