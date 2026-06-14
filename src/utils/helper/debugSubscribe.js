// src/utils/debugSubscribe.js

export const debugPushSubscription = async () => {


  // 1. Cek Dukungan Browser
  if (!("serviceWorker" in navigator)) {
    console.error("❌ Browser: Tidak mendukung Service Worker.");
    return;
  }
  if (!("PushManager" in window)) {
    console.error("❌ Browser: Tidak mendukung Push Manager.");
    return;
  }


  try {
    // 2. Cek Status Service Worker
    const registration = await navigator.serviceWorker.getRegistration();
    if (!registration) {
      console.error(
        "❌ SW: Belum terdaftar. Pastikan sw.js sudah di-register."
      );
      return;
    }
    

    // 3. Cek Izin Notifikasi

    if (Notification.permission === "denied") {
      console.warn(
        "⚠️ Permission: Blokir manual terdeteksi. Reset izin di browser."
      );
    }

    // 4. Verifikasi VAPID Key dari .env
    const publicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;
     + "...)"
        : "NO (UNDEFINED)"
    );

    if (!publicKey) {
      console.error(
        "❌ ENV: REACT_APP_VAPID_PUBLIC_KEY tidak ditemukan. Cek file .env dan restart server."
      );
      return;
    }

    // 5. Cek Subscription yang Sudah Ada
    const existingSub = await registration.pushManager.getSubscription();
    if (existingSub) {
      
      );
      return existingSub;
    }

    // 6. Mencoba Subscribe Baru

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey),
    });







    return subscription;
  } catch (err) {
    console.error("❌ ERROR SAAT SUBSCRIBE:", err);
    if (err.name === "NotAllowedError") {
      console.error("👉 User menolak permintaan izin notifikasi.");
    } else if (err.name === "InvalidCharacterError") {
      console.error("👉 Format VAPID Public Key salah (Base64 tidak valid).");
    }
  }
};

// Helper internal (Salin dari pushHelper.js Anda)
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
