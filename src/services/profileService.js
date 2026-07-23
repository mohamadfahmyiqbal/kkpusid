// 📁 services/profileService.js

import axios from "axios";

// Base URL untuk API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || process.env.REACT_APP_API_BASE_URL || "https://localhost:3445/api";

// Create axios instance dengan default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor untuk menambahkan token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken") || localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor untuk handle error
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired atau invalid, redirect ke login
      localStorage.removeItem("authToken");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

/**
 * Profile Service untuk mengelola data profil anggota
 */
export const profileService = {
  /**
   * Mendapatkan data profil anggota
   * @returns {Promise} Promise yang resolve dengan data profil
   */
  getProfile: async () => {
    try {
      const response = await apiClient.get("/anggota/profil");
      return response.data;
    } catch (error) {
      console.error("Error fetching profile:", error);
      if (error.response?.status === 404) {
        throw new Error("Data anggota tidak ditemukan. Anda belum terdaftar sebagai anggota penuh atau data tidak ada.");
      }
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error("Terjadi kesalahan saat memuat data profil.");
    }
  },

  /**
   * Update data profil anggota
   * @param {Object} profileData - Data profil yang akan diupdate
   * @param {string} profileData.full_name - Nama lengkap
   * @param {string} profileData.phone_number - Nomor telepon
   * @param {string} profileData.address - Alamat
   * @returns {Promise} Promise yang resolve dengan data yang diupdate
   */
  updateProfile: async (profileData) => {
    try {
      const response = await apiClient.put("/anggota/profil", profileData);
      return response.data;
    } catch (error) {
      console.error("Error updating profile:", error);
      
      // Handle specific error cases
      if (error.response?.status === 400) {
        const errorMessage = error.response.data.message;
        if (errorMessage.includes("wajib diisi")) {
          throw new Error("Semua field wajib diisi dengan benar");
        } else if (errorMessage.includes("telepon")) {
          throw new Error("Format nomor telepon tidak valid");
        } else if (errorMessage.includes("digunakan oleh anggota lain")) {
          throw new Error("Nomor telepon sudah digunakan oleh anggota lain");
        } else {
          throw new Error(errorMessage);
        }
      } else if (error.response?.status === 404) {
        throw new Error("Data anggota tidak ditemukan");
      } else if (error.code === "ECONNABORTED") {
        throw new Error("Timeout - Server tidak merespon");
      } else {
        throw new Error("Terjadi kesalahan saat memperbarui profil");
      }
    }
  },

  /**
   * Mapping data dari backend ke frontend format
   * @param {Object} backendData - Data dari backend API
   * @returns {Object} Data dalam format frontend
   */
  mapBackendToFrontend: (backendData) => {
    return {
      nama: backendData.full_name || "",
      email: backendData.email || "",
      telepon: backendData.phone_number || "",
      no_anggota: backendData.member_no || "",
      jabatan: backendData.member_type || "Anggota",
      alamat: backendData.address || "",
      foto: backendData.photo || "",
      status_id: backendData.status_id || 1,
      member_type: backendData.member_type || "Anggota Aktif",
      gender: backendData.gender || "-",
      join_date: backendData.join_date || "-",
      bank_account_no: backendData.bank_info?.bank_account_no || "-",
      bank_name: backendData.bank_info?.bank_name || "-",
      account_holder: backendData.bank_info?.account_holder || "-",
      updated_at: backendData.updated_at || "-",
    };
  },

  /**
   * Mapping data dari frontend ke backend format
   * @param {Object} frontendData - Data dari frontend form
   * @returns {Object} Data dalam format backend API
   */
  mapFrontendToBackend: (frontendData) => {
    return {
      full_name: frontendData.nama?.trim() || "",
      phone_number: frontendData.telepon?.trim() || "",
      address: frontendData.alamat?.trim() || "",
    };
  },
};

export default profileService;
