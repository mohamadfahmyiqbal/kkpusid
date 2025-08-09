import http from "./common";

export default new (class UAnggota {
  logout(fields) {
    return http.post("/logout", fields, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  login(fields) {
    return http.post("/login", fields, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  forgot(fields) {
    return http.post("/forgot", fields, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  verifikasiOTP(fields) {
    return http.post("/verifikasiOTP", fields, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  resetPassword(fields) {
    return http.post("/resetPassword", fields, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  register(fields) {
    return http.post("/register", fields, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  findAnggotaByToken(fields) {
    return http.post("/findAnggotaByToken", fields, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  anggotaList(fields) {
    return http.post("/anggotaList", fields, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
})();
