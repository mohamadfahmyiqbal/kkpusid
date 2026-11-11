import http from "./common";

class UAnggota {
  /**
   * Mengajukan pendaftaran anggota baru
   * @param {FormData} formData - data formulir pendaftar (name, email, foto_ktp, dll.)
   * @param {number} timeout - timeout khusus karena upload gambar (ms)
   * @returns Axios promise dengan result pendaftaran (memberId, status, dsb)
   */
  submitRegistration(formData, timeout = 30000) {
    return http.post("/anggota/pendaftaran", formData, { timeout });
  }

  /**
   * Mendapatkan status registrasi anggota
   * @returns Axios promise dengan status registrasi (pending, approved, rejected)
   */
  getRegistrationStatus() {
    return http.get("/anggota/getRegistrationStatus");
  }

  /**
   * Mengambil profil anggota lengkap
   * @returns Axios promise dengan data profil anggota
   */
  getProfile() {
    return http.get("/anggota/profil");
  }

  /**
   * Mendaftar daftar anggota dengan filter opsional
   * @param {Object} filter - filter pagination, status, kabupaten/kota, dll.
   * @returns Axios promise dengan array data anggota
   */
  daftarAnggota(filter = {}) {
    return http.get("/anggota/list", { params: filter });
  }
}

const uAnggota = new UAnggota();

export default uAnggota;
