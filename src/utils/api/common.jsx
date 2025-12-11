import axios from "axios";

// Buat instance axios
const api = axios.create({
  // baseURL: "https://api.kkpus.id",
  // baseURL: "https://pik1com074.local.ikoito.co.id:3001",
  baseURL: "https://localhost:3001",
  withCredentials: true,
});

// Tambahkan interceptor untuk menyisipkan token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
