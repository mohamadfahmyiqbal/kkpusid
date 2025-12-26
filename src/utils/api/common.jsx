import axios from "axios";

const api = axios.create({
  // URL dasar yang mencakup prefix /api dari backend
  baseURL: "https://api.kkpus.id/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  }
});

// Interceptor untuk menyisipkan Token JWT di setiap request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      // Format standar Bearer Token
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;