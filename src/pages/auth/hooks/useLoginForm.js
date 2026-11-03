import { useState } from "react";
import UAuth from "../../../utils/api/UAuth";

export const useLoginForm = () => {
  const [emailHp, setEmailHp] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  // Token dan data pengguna disimpan in-memory state, bukan localStorage
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);

  const emailHpInvalid = emailHp.trim() === "" || (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailHp) && !/^\d+$/.test(emailHp));
  const passwordInvalid = password.trim() === "";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (emailHpInvalid || passwordInvalid) {
      setError("Silakan periksa input Anda.");
      return;
    }

    setLoading(true);
    try {
      const response = await UAuth.accountLogin({ emailHp: emailHp.trim(), password });
      // Simpan token dan data pengguna ke in-memory state (bukan localStorage)
      const authToken = response.data.data.token;
      const user = response.data.data.user;
      setToken(authToken);
      setUserData(user);

      setSuccess("Login berhasil! Mengalihkan ke dashboard...");
      // Trigger event untuk sync ProfileContext
      window.dispatchEvent(new Event("storage_sync"));
      // For now, do nothing else
    } catch (err) {
      setError(err.response?.data?.message || "Login gagal. Silakan coba lagi.");
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
    success,
    token,
    userData,
  };
};
