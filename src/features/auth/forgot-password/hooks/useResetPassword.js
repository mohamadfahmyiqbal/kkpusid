import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

  // Load reset token dari localStorage
  useEffect(() => {
    try {
      const tokenData = localStorage.getItem("resetPasswordToken");
      if (tokenData) {
        const parsedToken = JSON.parse(tokenData);

        // Check if token expired
        if (new Date() > new Date(parsedToken.expiresAt)) {
          localStorage.removeItem("resetPasswordToken");
          navigate(LOGIN_PATH, { replace: true });
          return;
        }

        setResetToken(parsedToken.resetToken);
      } else {
        // No token found, redirect to login
        navigate(LOGIN_PATH, { replace: true });
      }
    } catch (err) {
      logger.error("Token loading error:", err);
      navigate(LOGIN_PATH, { replace: true });
    }
  }, [navigate]);

  /**
   * Validasi password strength
   */
  const validatePassword = (password) => {
    const minLength = password.length >= AUTH_CONSTANTS.PASSWORD_MIN_LENGTH;
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);

    return minLength && hasLowercase && hasUppercase && hasNumber;
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
        // Clear reset token
        localStorage.removeItem("resetPasswordToken");

        // Set success state
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
