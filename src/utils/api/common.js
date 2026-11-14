import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  process.env.REACT_APP_API_BASE_URL ||
  "https://localhost:3445/api"

const api = axios.create({
  // Default ke backend lokal, bisa dioverride via REACT_APP_API_BASE_URL
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  }
});

// Helper untuk membaca cookie
export const getCookie = (name) => {
  if (typeof document === "undefined" || !document.cookie) return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

// Variable untuk menyimpan in-flight fetch CSRF token agar tidak duplicate request
let csrfTokenPromise = null;

export const ensureCsrfToken = async () => {
  const existingCookie = getCookie("XSRF-TOKEN");
  if (existingCookie) return existingCookie;

  if (!csrfTokenPromise) {
    csrfTokenPromise = api
      .get("/auth/csrf-token")
      .then((res) => res.data?.csrfToken || getCookie("XSRF-TOKEN"))
      .catch((err) => {
        console.warn("Gagal mengambil CSRF token:", err?.message || err);
        return null;
      })
      .finally(() => {
        csrfTokenPromise = null;
      });
  }

  return csrfTokenPromise;
};

// Interceptor untuk menyisipkan Token JWT dan CSRF Token di setiap request
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      // Format standar Bearer Token
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Double submit CSRF protection: sertakan token di header jika mutasi (POST, PUT, DELETE, PATCH)
    const method = (config.method || "").toUpperCase();
    if (["POST", "PUT", "DELETE", "PATCH"].includes(method)) {
      let xsrfToken = getCookie("XSRF-TOKEN");
      if (!xsrfToken) {
        xsrfToken = await ensureCsrfToken();
      }
      if (xsrfToken) {
        config.headers["X-XSRF-TOKEN"] = xsrfToken;
        config.headers["x-xsrf-token"] = xsrfToken;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
