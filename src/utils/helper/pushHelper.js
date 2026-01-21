// src/utils/pushHelper.js

function urlBase64ToUint8Array(base64String) {
  if (!base64String || typeof base64String !== "string") {
    throw new Error(
      "VAPID_PUBLIC_KEY is missing or invalid. Check .env and RESTART your dev server."
    );
  }

  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export const subscribeUser = async (memberId) => {
  try {
    const registration = await navigator.serviceWorker.ready;
    const publicKey = process.env.REACT_APP_VAPID_PUBLIC_KEY;

    console.log("🛠 Debug VAPID Key:", publicKey); // Pastikan ini muncul di console browser

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey),
    });

    // ... kirim ke backend ...
  } catch (error) {
    console.error("❌ Gagal Subscribe:", error.message);
  }
};
