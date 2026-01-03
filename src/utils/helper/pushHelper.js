export const subscribeUser = async (memberId) => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.ready;

      // Minta izin ke browser
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: "MASUKKAN_VAPID_PUBLIC_KEY_ANDA", // Kita perlu generate ini
      });

      // Kirim ke API Backend kita
      await axios.post("/api/push/subscribe", {
        member_id: memberId,
        subscription: subscription,
        device_type: navigator.userAgent,
      });

      console.log("User subscribed to push!");
    } catch (error) {
      console.error("Gagal subscribe push:", error);
    }
  }
};
