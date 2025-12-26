// src/utils/api/UAuth.jsx
import http from "./common"; 

class UAuth {
  accountRegister(data) {
    return http.post("/auth/register", data);
  }

  accountLogin(data) {
    // Memanggil https://api.kkpus.id/api/auth/accountLogin
    return http.post("/auth/accountLogin", data);
  }

  getProfile() {
    return http.get("/anggota/profil");
  }

  logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    window.location.href = "/";
  }
}

export default new UAuth();