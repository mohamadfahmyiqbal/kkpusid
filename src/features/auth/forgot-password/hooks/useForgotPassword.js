import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../../../utils/helpers";
import forgotPasswordService from "../service/forgotPasswordService";
import { AUTH_CONSTANTS } from "../../constants/authConstants";
import { logger } from "../../utils/logger";

const FORGOT_OTP_PATH = `/${jwtEncode({ page: "authForgotOtp" })}`;

export const useForgotPassword = () => {
  const [emailHp, setEmailHp] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /**
   * Validasi format email
   */
  const validateEmail = (value) => {
    if (!value || value.trim() === "") return false;

    const trimmedValue = value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(trimmedValue);
  };

  /**
   * Get specific error message based on error type
   */
  const getErrorMessage = (error) => {
    if (!error) return null;

    // Network errors
    if (error.code === "NETWORK_ERROR" || error.message === "Network Error") {
      return "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.";
    }

    // Timeout errors
    if (error.code === "ECONNABORTED" || error.message?.includes("timeout")) {
      return "Server terlalu lama merespons. Silakan coba lagi.";
    }

    // Server response errors
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message;

      switch (status) {
        case 400:
          return message || "Data yang dimasukkan tidak valid.";
        case 404:
          return "Email tidak terdaftar dalam sistem.";
        case 429:
          return "Terlalu banyak percobaan. Silakan tunggu beberapa saat.";
        case 500:
          return "Server sedang bermasalah. Silakan coba lagi nanti.";
        default:
          return message || AUTH_CONSTANTS.ERROR_MESSAGES.SERVER_ERROR;
      }
    }

    // Default error
    return error.message || AUTH_CONSTANTS.ERROR_MESSAGES.SERVER_ERROR;
  };

  /**
   * Reset form fields
   */
  const resetForm = () => {
    setEmailHp("");
    setError(null);
  };

  /**
   * Handler untuk kirim OTP
   */
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const normalizedEmailHp = emailHp.trim();

    if (!normalizedEmailHp) {
      setError("Email wajib diisi.");
      setLoading(false);
      return;
    }

    // Validasi format email
    if (!validateEmail(normalizedEmailHp)) {
      setError("Format email tidak valid.");
      setLoading(false);
      return;
    }

    try {
      const response = await forgotPasswordService.sendOtp({
        emailHp: normalizedEmailHp,
      });

      if (response.success) {
        // Simpan session data untuk halaman OTP
        localStorage.setItem(
          "forgotPasswordSession",
          JSON.stringify({
            emailHp: normalizedEmailHp,
            sessionId: response.data?.sessionId,
            expiresAt: response.data?.expiresAt,
          }),
        );

        // Reset form dan navigasi ke halaman OTP
        resetForm();
        navigate(FORGOT_OTP_PATH, { replace: true });
      } else {
        setError(
          response.message || AUTH_CONSTANTS.ERROR_MESSAGES.SERVER_ERROR,
        );
      }
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      logger.error("Send OTP error:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    emailHp,
    error,
    loading,
    setEmailHp,
    handleSendOtp,
    resetForm,
    validateEmail,
  };
};
