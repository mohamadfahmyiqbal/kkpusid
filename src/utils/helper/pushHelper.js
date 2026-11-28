// src/utils/pushHelper.js

import api from "../api/common";
import { urlBase64ToUint8Array } from "./vapidHelper";

// Menyimpan VAPID key yang dipakai saat subscription terakhir dibuat.
// Dipakai untuk mendeteksi rotasi VAPID (TASK-010) agar subscription lama
// yang tidak berlaku di-unsubscribe & dibuat ulang otomatis.
const VAPID_USED_KEY = "push_vapid_used";

const getVapidPublicKey = async () => {
  try {
    const res = await api.get("/push/vapid-public-key");
    if (res.data?.success) {
      return res.data.vapid_public_key;
    } else {
      throw new Error("Failed to fetch VAPID key");
    }
  } catch (error) {
    console.error("Error fetching VAPID key:", error);
    throw error;
  }
};

export const subscribeUser = async (memberId) => {
  // PushManager tidak tersedia di semua browser (mis. iOS Safari <16.4 atau tab
  // biasa yang bukan PWA terpasang). Berhenti lebih awal agar tidak melempar
  // error berulang; caller lain (NotificationPrompt) ikut terlindungi.
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    return;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    let subscription = await registration.pushManager.getSubscription();

    // Ambil VAPID key terkini dari server (selalu fresh — tanpa cache 24 jam)
    const currentVapid = await getVapidPublicKey();
    const usedVapid = localStorage.getItem(VAPID_USED_KEY);

    // Subscription sudah valid & dibuat dengan VAPID key yang sama → tidak perlu
    // subscribe ulang (cegah churn).
    if (subscription && usedVapid === currentVapid) {
      return;
    }

    // Subscription ada tapi VAPID berubah (rotasi) atau berasal dari sebelum
    // tracking key ini (legacy) → unsubscribe & buat ulang.
    if (subscription) {
      await subscription.unsubscribe();
      subscription = null;
    }

    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(currentVapid),
    });

    // Kirim subscription ke backend
    const dataToSend = {
      subscription,
      member_id: memberId,
      device_type: "Web Browser",
    };
    await api.post("/push/subscribe", dataToSend);

    localStorage.setItem(VAPID_USED_KEY, currentVapid);
    console.log("✅ Push subscription tersinkronisasi.");
  } catch (error) {
    console.error("❌ Gagal Subscribe:", error.message);
  }
};