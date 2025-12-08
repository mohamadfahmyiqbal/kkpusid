import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import UAuth from "../utils/api/UAuth"; // Import utility API

// 1. Buat Context
const ProfileContext = createContext({
  userData: null,
  loading: true,
  error: null,
  logout: () => {},
  refetchProfile: () => {},
});

// 2. Buat Custom Hook untuk Konsumsi
export const useProfile = () => useContext(ProfileContext);

// 3. Buat Provider Component
export const ProfileProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fungsi untuk membersihkan token dan state
  const logout = useCallback(() => {
    localStorage.removeItem("authToken"); // ✅ Jika Anda menggunakan 'authToken', hapus juga
    setUserData(null);
    setError(null);
    // 💡 Opsional: Redirect ke halaman login setelah logout (bisa dilakukan di sini atau di komponen yang memanggil logout)
    // window.location.href = "/";
  }, []);

  const fetchProfile = useCallback(async () => {
    // Gunakan 'token' atau 'authToken' sesuai yang Anda gunakan saat login
    if (!localStorage.getItem("authToken")) {
      setUserData(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // Mengambil data profil dari API (GET /anggota/profil)
      const response = await UAuth.getProfile();

      // Asumsi: response.data.user berisi objek profil (sesuai respons dari accountLogin.js)
      setUserData(response.data.data);
    } catch (err) {
      console.error("Gagal memuat profil:", err);
      // Jika error 401/403 (Unauthorized/Forbidden), mungkin token expired
      if (
        err.response &&
        (err.response.status === 401 || err.response.status === 403)
      ) {
        logout(); // Logout otomatis jika otorisasi gagal
      }
      setError("Gagal memuat data profil. Silakan coba login ulang.");
    } finally {
      setLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    fetchProfile(); // Muat profil saat komponen pertama kali dirender
  }, [fetchProfile]);

  const value = {
    userData,
    loading,
    error,
    logout, // Sediakan fungsi logout di context
    refetchProfile: fetchProfile, // Sediakan fungsi untuk muat ulang
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};
