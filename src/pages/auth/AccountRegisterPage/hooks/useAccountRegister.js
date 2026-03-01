import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtEncode } from "../../../../utils/helpers";
import UAuth from "../../../../utils/api/UAuth";
import useNotificationPermission from "./useNotificationPermission";
import usePushSubscription from "./usePushSubscription";

const LOGIN_PATH = `/${jwtEncode({ page: "authLogin" })}`;

/**
 * Hook untuk mengelola logika registrasi akun
 * @returns {Object} - { formData, loading, notifPermission, handleInputChange, handleRegister }
 */
const useAccountRegister = () => {
  const navigate = useNavigate();

  // State Form Lengkap
  const [formData, setFormData] = useState({
    email: "",
    nama: "",
    nomorTelepon: "",
    password: "",
    nikKtp: "",
  });

  const [loading, setLoading] = useState(false);

  // Gunakan hooks notifikasi dan push subscription
  const { notifPermission, vapidPublicKey } = useNotificationPermission();
  const handlePushSubscription = usePushSubscription(vapidPublicKey);

  /**
   * Handler Perubahan Input
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Handler Registrasi Utama
   */
  const handleRegister = async (e) => {
    e.preventDefault();

    // Meminta izin notifikasi tepat saat tombol daftar ditekan
    let permission = "default";
    if ("Notification" in window) {
      permission = await Notification.requestPermission();
    }

    setLoading(true);

    try {
      // 1. Eksekusi Registrasi ke API
      const res = await UAuth.accountRegister({
        email: formData.email.trim().toLowerCase(),
        full_name: formData.nama.trim(),
        phone_number: formData.nomorTelepon,
        password: formData.password,
        nik_ktp: formData.nikKtp,
      });

      if (res.data?.success) {
        toast.success("🚀 Registrasi berhasil!");

        setLoading(false); // Set loading false setelah sukses

        // 2. Ambil member_id dari respon sukses
        const memberId = res.data?.data?.member_id;

        // 3. Jalankan Push Subscription jika izin diberikan (tanpa await agar tidak blokir UI)
        if (memberId && permission === "granted") {
          handlePushSubscription(memberId).catch((err) =>
            console.error("Push subscription gagal:", err)
          );
        }

        // 4. Redirect ke halaman login setelah jeda
        setTimeout(() => navigate(LOGIN_PATH), 2000);
      }
    } catch (err) {
      const msg =
        err.response?.data?.message || "Registrasi gagal, silakan coba lagi.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    notifPermission,
    handleInputChange,
    handleRegister,
  };
};

export default useAccountRegister;
