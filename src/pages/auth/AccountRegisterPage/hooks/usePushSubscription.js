import { useCallback } from "react";
import { urlBase64ToUint8Array } from "../../../../utils/helper/vapidHelper";
import UNotification from "../../../../utils/api/UNotification";

/**
 * Hook untuk mengelola push subscription
 * @param {string} vapidPublicKey - Kunci VAPID publik
 * @returns {Function} - Fungsi untuk handle push subscription
 */
const usePushSubscription = (vapidPublicKey) => {
  const handlePushSubscription = useCallback(
    async (memberId) => {
      try {
        if (!("serviceWorker" in navigator) || !vapidPublicKey) {
          console.warn(
            "Service Worker tidak didukung atau VAPID key belum tersedia",
          );
          return;
        }

        // Menunggu Service Worker siap
        const registration = await navigator.serviceWorker.ready;

        // Mengambil atau membuat subscription baru
        let subscription = await registration.pushManager.getSubscription();

        // Unsubscribe existing subscription to force new one with updated VAPID key
        if (subscription) {
          await subscription.unsubscribe();
          subscription = null;
        }

        if (!subscription) {
          subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
          });
        }

        // Mengirim data subscription ke API backend
        await UNotification.subscribePush(subscription, memberId);
        console.log(
          "✅ Sinkronisasi push notification berhasil untuk member:",
          memberId,
        );
      } catch (err) {
        console.error("⚠️ Gagal sinkronisasi push:", err.message);
      }
    },
    [vapidPublicKey],
  );

  return handlePushSubscription;
};

export default usePushSubscription;
