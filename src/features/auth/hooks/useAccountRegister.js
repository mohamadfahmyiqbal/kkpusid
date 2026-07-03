import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { jwtEncode } from "../../../utils/helpers";
import authService from "../service/authService";
import useNotificationPermission from "./useNotificationPermission";
import usePushSubscription from "./usePushSubscription";
import { AUTH_CONSTANTS } from "../constants/authConstants";
import { logger } from "../utils/logger";

const LOGIN_PATH = `/${jwtEncode({ page: "authLogin" })}`;
const {
  PASSWORD_MIN_LENGTH,
  NAME_MIN_LENGTH,
  REDIRECT_DELAY_MS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} = AUTH_CONSTANTS;

/**
 * Hook untuk mengelola logika registrasi akun
 * @returns {Object} - { formData, loading, notifPermission, handleInputChange, handleRegister, setFormData, errors, setErrors }
 */
const useAccountRegister = () => {
  const navigate = useNavigate();

  // State Form Sederhana: Hanya Nama, Email, Password, Konfirmasi Password
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: true, // Default true karena checkbox disembunyikan atau diasumsikan setuju
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Gunakan hooks notifikasi dan push subscription
  const { notifPermission, vapidPublicKey } = useNotificationPermission();
  const handlePushSubscription = usePushSubscription(vapidPublicKey);

  /**
   * Reset form data
   */
  const resetForm = () => {
    setFormData({
      nama: "",
      email: "",
      password: "",
      confirmPassword: "",
      agree: true,
    });
    setErrors({});
  };

  /**
   * Handler Perubahan Input
   */
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let inputValue = type === "checkbox" ? checked : value;
    
    // Sanitasi nama agar hanya berisi huruf dan spasi
    if (name === "nama" && typeof value === "string") {
      inputValue = value.replace(/[^a-zA-Z\s]/g, "");
    }
    
    setFormData((prev) => ({ ...prev, [name]: inputValue }));

    // Clear error when user starts typing/changing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  /**
   * Validasi form sederhana
   */
  const validateForm = () => {
    const newErrors = {};

    // 1. Nama
    const namaVal = (formData.nama || "").trim();
    if (!namaVal) {
      newErrors.nama = ERROR_MESSAGES.NAME_REQUIRED || "Nama lengkap wajib diisi.";
    } else if (namaVal.length < NAME_MIN_LENGTH) {
      newErrors.nama = ERROR_MESSAGES.NAME_MIN_LENGTH || `Nama minimal ${NAME_MIN_LENGTH} karakter.`;
    }

    // 2. Email
    const emailVal = (formData.email || "").trim();
    if (!emailVal) {
      newErrors.email = ERROR_MESSAGES.EMAIL_REQUIRED || "Email wajib diisi.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      newErrors.email = ERROR_MESSAGES.EMAIL_INVALID || "Format email tidak valid.";
    }

    // 3. Password
    const passwordVal = formData.password || "";
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    if (!passwordVal) {
      newErrors.password = ERROR_MESSAGES.PASSWORD_REQUIRED || "Password wajib diisi.";
    } else if (passwordVal.length < PASSWORD_MIN_LENGTH) {
      newErrors.password = ERROR_MESSAGES.PASSWORD_MIN_LENGTH || `Password minimal ${PASSWORD_MIN_LENGTH} karakter.`;
    } else if (!passwordRegex.test(passwordVal)) {
      newErrors.password = ERROR_MESSAGES.PASSWORD_STRENGTH || "Password harus mengandung huruf besar, kecil, dan angka.";
    }

    // 4. Konfirmasi Password
    const confirmPasswordVal = formData.confirmPassword || "";
    if (!confirmPasswordVal) {
      newErrors.confirmPassword = "Konfirmasi password wajib diisi.";
    } else if (passwordVal !== confirmPasswordVal) {
      newErrors.confirmPassword = "Konfirmasi password tidak cocok.";
    }

    setErrors(newErrors);
    return {
      isValid: Object.keys(newErrors).length === 0,
      errors: newErrors,
    };
  };

  /**
   * Handler Registrasi Utama
   */
  const handleRegister = async (e) => {
    if (e) e.preventDefault();

    // Validasi form
    const { isValid, errors: valErrors } = validateForm();
    if (!isValid) {
      const firstError = Object.values(valErrors).find(Boolean);
      Swal.fire({
        title: firstError || "Silakan lengkapi semua data dengan benar.",
        icon: "error",
        toast: true,
        position: "top-end",
        timer: 3000,
        showConfirmButton: false
      });
      return;
    }

    setLoading(true);

    try {
      // Eksekusi Registrasi ke API dengan payload minimal
      const res = await authService.register({
        full_name: formData.nama.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      if (res.data?.success) {
        Swal.fire({
          title: SUCCESS_MESSAGES.REGISTER || "Registrasi berhasil!",
          icon: "success",
          toast: true,
          position: "top-end",
          timer: 3000,
          showConfirmButton: false
        });
        resetForm();
        setTimeout(() => navigate(LOGIN_PATH), REDIRECT_DELAY_MS);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Registrasi gagal, silakan coba lagi.";
      Swal.fire({
        title: msg,
        icon: "error",
        toast: true,
        position: "top-end",
        timer: 3000,
        showConfirmButton: false
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    notifPermission,
    errors,
    setErrors,
    handleInputChange,
    handleRegister,
    resetForm,
    setFormData,
  };
};

export default useAccountRegister;
