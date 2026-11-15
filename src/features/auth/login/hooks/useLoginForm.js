import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../../../utils/helpers";
import loginService from "../service/loginService";
import { AUTH_CONSTANTS } from "../../constants/authConstants";
import { logger } from "../../utils/logger";

const DASHBOARD_PATH = `/${jwtEncode({ page: "dashboard" })}`;
const { ERROR_MESSAGES } = AUTH_CONSTANTS;

export const useLoginForm = () => {
  const [emailHp, setEmailHp] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [emailHpInvalid, setEmailHpInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const navigate = useNavigate();

  /**
   * Validasi format email/phone
   */
  const validateEmailPhone = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10,13}$/;

    return emailRegex.test(value) || phoneRegex.test(value.replace(/\D/g, ""));
  };

  /**
   * Reset form fields
   */
  const resetForm = () => {
    setEmailHp("");
    setPassword("");
    setShowPassword(false);
    setError(null);
    setEmailHpInvalid(false);
    setPasswordInvalid(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setEmailHpInvalid(false);
    setPasswordInvalid(false);

    const normalizedEmailHp = emailHp.trim();
    const normalizedPassword = password.trim();

    if (!normalizedEmailHp || !normalizedPassword) {
      if (!normalizedEmailHp) setEmailHpInvalid(true);
      if (!normalizedPassword) setPasswordInvalid(true);
      setError(ERROR_MESSAGES.EMAIL_OR_PHONE_REQUIRED);
      return;
    }

    // Validasi format email/phone
    if (!validateEmailPhone(normalizedEmailHp)) {
      setEmailHpInvalid(true);
      setError(ERROR_MESSAGES.EMAIL_OR_PHONE_INVALID);
      return;
    }

    setLoading(true);
    try {
      const response = await loginService.login({
        emailHp: normalizedEmailHp,
        password: normalizedPassword,
      });

      if (response.status === 200 && response.data.success) {
        const { token, user } = response.data.data;
        localStorage.setItem("token", token);
        localStorage.setItem("userData", JSON.stringify(user));
        window.dispatchEvent(new Event("storage_sync"));

        // Reset form setelah sukses
        resetForm();

        navigate(DASHBOARD_PATH);
        return;
      }

      setError(response.data.message || ERROR_MESSAGES.LOGIN_FAILED);
    } catch (apiError) {
      const errorMessage =
        apiError.response?.data?.message || ERROR_MESSAGES.SERVER_ERROR;
      setError(errorMessage);
      logger.error("Login error:", apiError);
    } finally {
      setLoading(false);
    }
  };

  return {
    emailHp,
    password,
    showPassword,
    error,
    loading,
    emailHpInvalid,
    passwordInvalid,
    setEmailHp,
    setPassword,
    setShowPassword,
    handleLogin,
    resetForm,
  };
};
