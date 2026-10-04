import http from "./common";

class UAnggota {
  submitRegistration(formData) {
    // Gunakan timeout lebih lama khusus untuk pendaftaran karena ada upload gambar
    return http.post("/anggota/pendaftaran", formData, {
      timeout: 30000,
    });
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

const uAnggota = new UAnggota();

export default uAnggota;
