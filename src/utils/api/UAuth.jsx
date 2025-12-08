// src/utils/api/UAuth.jsx

import http from "./common";

class UAuth {
  accountRegister(data) {
    return http.post("/register", data);
  }

  accountLogin(data) {
    return http.post("/accountLogin", data);
  }

  getProfile() {
    return http.get("/anggota/profil");
  }
}

export default new UAuth();
