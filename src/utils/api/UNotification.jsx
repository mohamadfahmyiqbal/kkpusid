import http from "./common";

class UNotification {
  /**
   * Mengambil list notifikasi
   * Mengarah ke: GET /notifikasi/list (via notificationRoute.js)
   */
  getNotifications(filter = {}) {
    // Backend Anda menggunakan getNotificationList.js
    return http.get("/notifikasi/list", { params: filter });
  }

  /**
   * Update status baca (SENT -> READ)
   * Mengarah ke: POST /notifikasi/update-status
   */
  markAsRead(idNotifikasi) {
    const payload = {
      // Mengirim array ID agar cocok dengan controller updateNotificationStatus.js
      id: Array.isArray(idNotifikasi) ? idNotifikasi : [idNotifikasi],
    };
    return http.post("/notifikasi/update-status", payload);
  }

  /**
   * Mengambil kunci VAPID publik dari backend
   */
  getVapidPublicKey() {
    return http.get("/push/vapid-public-key");
  }

  /**
   * Registrasi Web-Push (Opsional jika controller tersedia)
   */
  async subscribePush(subscription, memberId) {
    const payload = {
      member_id: memberId,
      subscription: {
        endpoint: subscription.endpoint,
        keys: {
          p256dh: btoa(
            String.fromCharCode.apply(
              null,
              new Uint8Array(subscription.getKey("p256dh")),
            ),
          ),
          auth: btoa(
            String.fromCharCode.apply(
              null,
              new Uint8Array(subscription.getKey("auth")),
            ),
          ),
        },
      },
    };
    return http.post("/push/subscribe", payload);
  }
}

const uNotification = new UNotification();

export default uNotification;
