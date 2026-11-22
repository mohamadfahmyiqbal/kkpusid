import axios from 'axios';
import { toast } from 'react-toastify';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    // SCR-024: Blokir aksi transaksi (mutasi) saat offline dengan penjelasan.
    const method = (config.method || 'get').toUpperCase();
    const isMutation = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method);
    if (isMutation && typeof navigator !== 'undefined' && navigator.onLine === false) {
      const message = 'Tidak ada koneksi internet. Transaksi tidak dapat diproses saat offline.';
      try {
        toast.error(message);
      } catch {
        // toast belum siap — abaikan, error tetap dilempar ke pemanggil
      }
      return Promise.reject({
        isOffline: true,
        message,
        config,
        request: {},
      });
    }
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      window.location.href = '/landingPage';
    }
    
    // Handle 403 forbidden
    if (error.response?.status === 403) {
      console.error('Access forbidden - insufficient permissions');
    }
    
    return Promise.reject(error);
  }
);

export { apiClient };
