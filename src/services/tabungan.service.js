import axios from "axios";

// Base URL untuk API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.REACT_APP_API_BASE_URL || "https://localhost:3445/api";

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

export const TabunganService = {
  /**
   * Mengambil daftar master program tabungan yang aktif
   */
  getAvailablePrograms: async () => {
    try {
      const response = await apiClient.get("/tabungan/programs");
      return response.data;
    } catch (error) {
      console.error("Error fetching programs:", error);
      throw error;
    }
  },
  /**
   * Apply for a new savings target (Tabungan Haji, Umrah, dll)
   * @param {Object} data - Payload containing productType, nominalTarget, tenor, setoranAwal
   * @returns {Promise} Promise resolving to the created target and initial deposit transaction
   */
  submitApplication: async (data) => {
    try {
      const response = await apiClient.post("/tabungan/pengajuan", data);
      return response.data;
    } catch (error) {
      console.error("Error submitting savings application:", error);
      throw error;
    }
  },

  /**
   * Check if the member has an active or pending saving target for a specific master program
   * @param {string|number} savingTargetId - ID of the master program
   */
  checkAccountStatus: async (savingTargetId) => {
    try {
      const response = await apiClient.get(`/tabungan/pengajuan/check?saving_target_id=${savingTargetId}`);
      return response.data;
    } catch (error) {
      console.error(`Error checking account status for ${savingTargetId}:`, error);
      throw error;
    }
  },

  /**
   * Fetch bills generated for a specific savings target
   * @param {number} memberSavingTargetId - The ID of the savings target account
   */
  getTabunganBills: async (memberSavingTargetId) => {
    try {
      const response = await apiClient.get(`/tabungan/pengajuan/${memberSavingTargetId}/tagihan`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching bills for tabungan ${memberSavingTargetId}:`, error);
      throw error;
    }
  },

  /**
   * Mengambil detail pengajuan target tabungan
   * @param {string|number} tabunganId
   */
  getTabunganDetail: async (tabunganId) => {
    try {
      const response = await apiClient.get(`/tabungan/pengajuan/detail/${tabunganId}`);
      return response;
    } catch (error) {
      console.error("Error fetching tabungan detail:", error);
      throw error;
    }
  },

  /**
   * Process payment for a tabungan bill
   * @param {Object} data - Payment data (e.g. amount, bill_item_id)
   */
  processPayment: async (data) => {
    try {
      // Endpoint ini mengarah ke billing API (midtrans)
      const response = await apiClient.post("/billing/process-payment", data);
      return response.data;
    } catch (error) {
      console.error("Error processing tabungan payment:", error);
      throw error;
    }
  },
};

export default TabunganService;
