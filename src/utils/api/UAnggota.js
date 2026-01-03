import http from "./common";

class UAnggota {
  submitRegistration(formData) {
    return http.post("/anggota/pendaftaran", formData);
  }

  getRegistrationStatus() {
    return http.get("/anggota/getRegistrationStatus");
  }

  getProfile() {
    return http.get("/anggota/profil");
  }

  daftarAnggota(filter = {}) {
    return http.get("/anggota/list", { params: filter });
  }
}

export default new UAnggota();