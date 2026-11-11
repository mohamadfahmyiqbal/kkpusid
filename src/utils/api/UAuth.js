// src/utils/api/UAuth.jsx
import http from "./common"; 

class UAuth {
  /**
   * Melakukan pendaftaran akun baru
   * @param {Object} data - data pendaftaran: username, email, password, dll.
   * @returns Axios promise dengan result: userId, token, dll.
   */
  accountRegister(data) {
    return http.post("/auth/register", data);
  }

  /**
   * Melakukan login akun
   * @param {Object} data - data login: username/password, device info, dll.
   * @returns Axios promise dengan result: token, userData, dll.
   */
  accountLogin(data) {
    // Memanggil https://api.kkpus.id/api/auth/accountLogin
    return http.post("/auth/accountLogin", data);
  }

  /**
   * Mendapatkan profil pengguna yang sedang login
   * @returns Axios promise dengan data profil
   */
  getProfile() {
    return http.get("/anggota/profil");
  }

  /**
   * Proses logout: hapus token dan userData dari localStorage, redirect ke login
   */
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    window.location.href = "/";
  }
}

const uAuth = new UAuth();

export default uAuth;
