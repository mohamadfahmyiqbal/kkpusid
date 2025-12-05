import http from "./common"; 

class UAuth {
  
  /**
   * Mendaftarkan akun anggota baru.
   * Method: POST
   * Endpoint: /auth/register (URL relatif, prefix base URL diasumsikan diurus oleh 'http')
   * * @param {object} data - { email, name, phone_number, password }
   */
  accountRegister(data) {
    return http.post("/register", data);
  }
  accountLogin(data) {
    return http.post("/accountLogin", data);
  }

  // [TODO: Tambahkan method otentikasi lainnya di sini]
  // Contoh:
  // accountLogin(data) {
  //   return http.post("/auth/login", data);
  // }
  
  // getProfile() {
  //   return http.get("/auth/profile");
  // }
}

// Export instance dari class UAuth agar method dapat dipanggil langsung (misalnya UAuth.accountRegister())
export default new UAuth();