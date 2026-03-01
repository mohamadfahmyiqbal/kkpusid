import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../../../utils/helpers";
import { loginService } from "../services/loginService";

const DASHBOARD_PATH = `/${jwtEncode({ page: "dashboard" })}`;

export const useLoginForm = () => {
  const [emailHp, setEmailHp] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [emailHpInvalid, setEmailHpInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const navigate = useNavigate();

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
      setError("Email/Nomor Handphone dan Password wajib diisi.");
      return;
    }

    setLoading(true);
    try {
      const response = await loginService.accountLogin({
        emailHp: normalizedEmailHp,
        password: normalizedPassword,
      });

      if (response.status === 200 && response.data.success) {
        const { token, user } = response.data.data;
        localStorage.setItem("token", token);
        localStorage.setItem("userData", JSON.stringify(user));
        window.dispatchEvent(new Event("storage_sync"));
        navigate(DASHBOARD_PATH);
        return;
      }

      setError(response.data.message || "Login gagal. Silakan coba lagi.");
    } catch (apiError) {
      const errorMessage =
        apiError.response?.data?.message ||
        "Terjadi kesalahan saat menghubungi server.";
      setError(errorMessage);
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
  };
};

