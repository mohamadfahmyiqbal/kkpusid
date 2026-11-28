import { useCallback } from "react";
import { urlBase64ToUint8Array } from "../../../utils/helper/vapidHelper";
import authService from "../service/authService";
import { logger } from "../utils/logger";

/**
 * Hook untuk mengelola push subscription
 * @param {string} vapidPublicKey - Kunci VAPID publik
 * @returns {Function} - Fungsi untuk handle push subscription
 */
const usePushSubscription = (vapidPublicKey) => {
  const handlePushSubscription = useCallback(
    async (memberId) => {
      try {
        // PushManager hanya tersedia di browser modern & (khusus iOS) hanya pada
        // PWA yang dipasang di home screen dengan iOS 16.4+. Tanpa guard ini,
        // iPhone lama / tab biasa akan melempar error berulang di konsol.
        if (
          !("serviceWorker" in navigator) ||
          !("PushManager" in window) ||
          !vapidPublicKey
        ) {
          logger.warn(
            "Push tidak didukung (butuh iOS 16.4+ & PWA terpasang) atau VAPID key belum tersedia",
          );
          return;
        }

        // Menunggu Service Worker siap
        const registration = await navigator.serviceWorker.ready;

        // Mengambil atau membuat subscription baru
        let subscription = await registration.pushManager.getSubscription();

        // Check if existing subscription is still valid
        if (subscription) {
          try {
            // Verify subscription is still active by checking expiration
            if (
              subscription.expirationTime &&
              Date.now() > subscription.expirationTime
            ) {
              await subscription.unsubscribe();
              subscription = null;
            }
          } catch (err) {
            logger.warn(
              "Existing subscription invalid, creating new one:",
              err,
            );
            await subscription.unsubscribe();
            subscription = null;
          }
        }

        if (!subscription) {
          subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
          });
        }

        // Mengirim data subscription ke API backend
        await authService.subscribePush(subscription, memberId);
        logger.log(
          "✅ Sinkronisasi push notification berhasil untuk member:",
          memberId,
        );
      } catch (err) {
        logger.error("⚠️ Gagal sinkronisasi push:", err.message);
      }
    },
    [vapidPublicKey],
  );

  return handlePushSubscription;
};

export default usePushSubscription;
