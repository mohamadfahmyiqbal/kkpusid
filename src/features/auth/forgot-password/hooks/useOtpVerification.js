import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../../../utils/helpers";
import forgotPasswordService from "../service/forgotPasswordService.js";
import { AUTH_CONSTANTS } from "../../constants/authConstants";
import { logger } from "../../utils/logger";

// OTP Constants
const OTP_CONSTANTS = {
  LENGTH: 6,
  EXPIRY_MINUTES: 10,
  MAX_ATTEMPTS: 3,
  COOLDOWN_SECONDS: 60,
  RESEND_DELAY: 1500,
};

// Error Types
const ERROR_TYPES = {
  EXPIRED_OTP: "OTP sudah kadaluarsa. Silakan kirim ulang.",
  INVALID_OTP: "Kode OTP tidak valid. Periksa kembali kode Anda.",
  MAX_ATTEMPTS: "Terlalu banyak percobaan. Silakan kirim ulang OTP.",
  SESSION_EXPIRED: "Session sudah kadaluarsa. Silakan mulai ulang proses.",
};

const RESET_PASSWORD_PATH = `/${jwtEncode({ page: "authResetPassword" })}`;
const LOGIN_PATH = `/${jwtEncode({ page: "authLogin" })}`;

// Countdown timer hook
const useCountdown = (initialTime, onExpire) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true);
      onExpire?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsExpired(true);
          onExpire?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onExpire]);

  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, []);

  const reset = useCallback((newTime) => {
    setTimeLeft(newTime);
    setIsExpired(false);
  }, []);

  return { timeLeft, formatTime, isExpired, reset };
};

export const useOtpVerification = () => {
  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sessionData, setSessionData] = useState(null);
  const [resendLoading, setResendLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimeLeft, setBlockTimeLeft] = useState(0);
  const navigate = useNavigate();

  // Initialize countdown from session expiry
  const {
    timeLeft,
    formatTime,
    reset: resetCountdown,
  } = useCountdown(
    sessionData
      ? Math.max(
          0,
          Math.floor((new Date(sessionData.expiresAt) - new Date()) / 1000),
        )
      : OTP_CONSTANTS.EXPIRY_MINUTES * 60,
    () => {
      localStorage.removeItem("forgotPasswordSession");
      navigate(LOGIN_PATH, { replace: true });
    },
  );

  // Block countdown
  const { timeLeft: blockTime, formatTime: formatBlockTime } = useCountdown(
    blockTimeLeft,
    () => {
      setIsBlocked(false);
      setBlockTimeLeft(0);
      setAttempts(0);
    },
  );

  // Haptic feedback utility
  const triggerHaptic = useCallback(() => {
    if ("vibrate" in navigator) {
      navigator.vibrate(50);
    }
  }, []);

  // Analytics tracking
  const trackOtpAttempt = useCallback(
    (result) => {
      // Send to analytics (implement as needed)
      if (typeof window !== "undefined" && window.analytics) {
        window.analytics.track("otp_verification_attempt", {
          success: result.success,
          error_type: result.errorType,
          session_id: sessionData?.sessionId,
          attempts: attempts + 1,
        });
      }
    },
    [sessionData, attempts],
  );

  // Handler untuk verifikasi OTP
  const handleVerifyOtp = useCallback(
    async (e) => {
      e.preventDefault();

      if (isBlocked) {
        setError(ERROR_TYPES.MAX_ATTEMPTS);
        return;
      }

      setError(null);
      setLoading(true);

      if (!otpCode.trim()) {
        setError(AUTH_CONSTANTS.ERROR_MESSAGES.OTP_REQUIRED);
        setLoading(false);
        trackOtpAttempt({ success: false, errorType: "empty_otp" });
        return;
      }

      if (!validateOtp(otpCode)) {
        setError(AUTH_CONSTANTS.ERROR_MESSAGES.OTP_INVALID);
        setLoading(false);
        trackOtpAttempt({ success: false, errorType: "invalid_format" });
        return;
      }

      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      try {
        const response = await forgotPasswordService.verifyOtp({
          otpCode: otpCode.trim(),
          sessionId: sessionData?.sessionId,
        });

        if (response.success) {
          setIsSuccess(true);
          trackOtpAttempt({ success: true });

          // Simpan reset token untuk halaman reset password
          localStorage.setItem(
            "resetPasswordToken",
            JSON.stringify({
              resetToken: response.data?.resetToken,
              expiresAt: response.data?.expiresAt,
            }),
          );

          // Clear forgot password session
          localStorage.removeItem("forgotPasswordSession");

          // Clear sensitive data
          setOtpCode("");
          setError(null);

          // Navigasi ke halaman reset password dengan delay untuk animation
          setTimeout(() => {
            navigate(RESET_PASSWORD_PATH, { replace: true });
          }, 1000);
        } else {
          const errorType = response.message?.includes("kadaluarsa")
            ? "expired_otp"
            : "invalid_otp";
          setError(
            response.message || AUTH_CONSTANTS.ERROR_MESSAGES.OTP_INVALID,
          );
          trackOtpAttempt({ success: false, errorType });

          // Check if max attempts reached
          if (newAttempts >= OTP_CONSTANTS.MAX_ATTEMPTS) {
            setIsBlocked(true);
            setBlockTimeLeft(OTP_CONSTANTS.COOLDOWN_SECONDS);
          }
        }
      } catch (err) {
        const errorMessage =
          err.response?.data?.message ||
          AUTH_CONSTANTS.ERROR_MESSAGES.SERVER_ERROR;
        setError(errorMessage);
        trackOtpAttempt({ success: false, errorType: "network_error" });
        logger.error("OTP verification error:", err);

        // Check if max attempts reached
        if (newAttempts >= OTP_CONSTANTS.MAX_ATTEMPTS) {
          setIsBlocked(true);
          setBlockTimeLeft(OTP_CONSTANTS.COOLDOWN_SECONDS);
        }
      } finally {
        setLoading(false);
      }
    },
    [isBlocked, otpCode, attempts, sessionData, trackOtpAttempt, navigate],
  );

  // Auto-submit when 6 digits entered
  useEffect(() => {
    if (otpCode.length === OTP_CONSTANTS.LENGTH && !loading && !isBlocked) {
      const timer = setTimeout(() => {
        if (validateOtp(otpCode)) {
          // Trigger form submission
          const formEvent = new Event("submit", { cancelable: true });
          handleVerifyOtp(formEvent);
        }
      }, 500); // Small delay for better UX

      return () => clearTimeout(timer);
    }
  }, [otpCode, loading, isBlocked, handleVerifyOtp]);

  // Load session data dari localStorage
  useEffect(() => {
    try {
      const session = localStorage.getItem("forgotPasswordSession");
      if (session) {
        const parsedSession = JSON.parse(session);

        // Check if session expired
        if (new Date() > new Date(parsedSession.expiresAt)) {
          localStorage.removeItem("forgotPasswordSession");
          navigate(LOGIN_PATH, { replace: true });
          return;
        }

        setSessionData(parsedSession);
      } else {
        // No session found, redirect to login
        navigate(LOGIN_PATH, { replace: true });
      }
    } catch (err) {
      logger.error("Session loading error:", err);
      navigate(LOGIN_PATH, { replace: true });
    }
  }, [navigate]);

  /**
   * Validasi OTP format
   */
  const validateOtp = (value) => {
    return new RegExp(`^\\d{${OTP_CONSTANTS.LENGTH}}$`).test(value);
  };

  /**
   * Handle OTP input change with haptic feedback
   */
  const handleOtpChange = useCallback(
    (value) => {
      if (isBlocked || loading) return;

      const numericValue = value
        .replace(/\D/g, "")
        .slice(0, OTP_CONSTANTS.LENGTH);
      setOtpCode(numericValue);
      setError(null);
      triggerHaptic();
    },
    [isBlocked, loading, triggerHaptic],
  );

  /**
   * Handle paste for OTP
   */
  const handlePaste = useCallback(
    (e) => {
      e.preventDefault();
      const pastedData = e.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, OTP_CONSTANTS.LENGTH);
      handleOtpChange(pastedData);
    },
    [handleOtpChange],
  );

  /**
   * Reset form fields
   */
  const resetForm = () => {
    setOtpCode("");
    setError(null);
  };

  /**
   * Handler untuk kirim ulang OTP
   */
  const handleResendOtp = async () => {
    if (!sessionData || resendLoading) return;

    setResendLoading(true);
    try {
      const response = await forgotPasswordService.resendOtp({
        sessionId: sessionData.sessionId,
      });

      if (response.success) {
        // Update session dengan expiry baru
        const updatedSession = {
          ...sessionData,
          expiresAt: new Date(
            Date.now() + OTP_CONSTANTS.EXPIRY_MINUTES * 60 * 1000,
          ),
        };
        localStorage.setItem(
          "forgotPasswordSession",
          JSON.stringify(updatedSession),
        );
        setSessionData(updatedSession);

        // Reset countdown
        resetCountdown(OTP_CONSTANTS.EXPIRY_MINUTES * 60);

        // Reset form state
        setError(null);
        setOtpCode("");
        setAttempts(0);
        setIsBlocked(false);
        setBlockTimeLeft(0);

        // Track resend event
        trackOtpAttempt({ success: true, errorType: "resend_success" });
      } else {
        setError(
          response.message || AUTH_CONSTANTS.ERROR_MESSAGES.SERVER_ERROR,
        );
        trackOtpAttempt({ success: false, errorType: "resend_failed" });
      }
    } catch (err) {
      if (err.response?.status === 404) {
        localStorage.removeItem("forgotPasswordSession");
        navigate(LOGIN_PATH, { replace: true });
        return;
      }
      
      const errorMessage =
        err.response?.data?.message ||
        AUTH_CONSTANTS.ERROR_MESSAGES.SERVER_ERROR;
      setError(errorMessage);
      trackOtpAttempt({ success: false, errorType: "resend_error" });
      logger.error("Resend OTP error:", err);
    } finally {
      setResendLoading(false);
    }
  };

  return {
    otpCode,
    loading,
    error,
    sessionData,
    resendLoading,
    attempts,
    isSuccess,
    isBlocked,
    timeLeft,
    blockTime,
    formatTime,
    formatBlockTime,
    setOtpCode: handleOtpChange,
    handleVerifyOtp,
    handleResendOtp,
    handlePaste,
    resetForm,
  };
};
