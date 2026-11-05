import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtEncode } from "../../../../utils/helpers";
import forgotPasswordService from "../service/forgotPasswordService";
import { AUTH_CONSTANTS } from "../../constants/authConstants";
import { logger } from "../../utils/logger";

const LOGIN_PATH = `/${jwtEncode({ page: "authLogin" })}`;

export const useResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [resetToken, setResetToken] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Load reset token dari location.state (dihantarkan dari halaman verifikasi OTP)
  useEffect(() => {
    const resetTokenFromLocation = location.state?.resetToken;
    if (resetTokenFromLocation) {
      // Check if token expired
      if (new Date() > new Date(location.state?.resetTokenExpiresAt)) {
        navigate(LOGIN_PATH, { replace: true });
        return;
      }
      setResetToken(resetTokenFromLocation);
    } else {
      // No token found, redirect to login
      navigate(LOGIN_PATH, { replace: true });
    }
  }, [location.state, navigate]);

  /**
   * Validasi password strength
   */
  const validatePassword = (password) => {
    const minLength = password.length >= AUTH_CONSTANTS.PASSWORD_MIN_LENGTH;
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>_\-~+=/\\[\]]/.test(password);

    return minLength && hasLowercase && hasUppercase && hasNumber && hasSpecial;
  };

  /**
   * Reset form fields
   */
  const resetForm = () => {
    setNewPassword("");
    setConfirmPassword("");
    setError(null);
    setSuccess(false);
  };

  /**
   * Handler untuk reset password
   */
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!newPassword || !confirmPassword) {
      setError(AUTH_CONSTANTS.ERROR_MESSAGES.PASSWORD_REQUIRED);
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(AUTH_CONSTANTS.ERROR_MESSAGES.PASSWORD_MISMATCH);
      setLoading(false);
      return;
    }

    if (!validatePassword(newPassword)) {
      setError(AUTH_CONSTANTS.ERROR_MESSAGES.PASSWORD_STRENGTH);
      setLoading(false);
      return;
    }

    try {
      const response = await forgotPasswordService.resetPassword({
        resetToken: resetToken,
        newPassword: newPassword.trim(),
      });

      if (response.success) {
        // Reset token hanya transient di router state, tidak perlu clear localStorage
        setSuccess(true);

        // Reset form dan navigasi ke login setelah delay
        setTimeout(() => {
          resetForm();
          navigate(LOGIN_PATH, { replace: true });
        }, AUTH_CONSTANTS.REDIRECT_DELAY_MS);
      } else {
        setError(
          response.message || AUTH_CONSTANTS.ERROR_MESSAGES.SERVER_ERROR,
        );
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        AUTH_CONSTANTS.ERROR_MESSAGES.SERVER_ERROR;
      setError(errorMessage);
      logger.error("Reset password error:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    newPassword,
    confirmPassword,
    loading,
    error,
    success,
    setNewPassword,
    setConfirmPassword,
    handleResetPassword,
    resetForm,
    validatePassword,
  };
};
