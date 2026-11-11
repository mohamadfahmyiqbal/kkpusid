import http from "./common";

class UGlobal {
  /**
   * Mengambil ringkasan keuangan global (total saldo, pinjaman aktif, dll.)
   * @returns Axios promise dengan data ringkasan finansial
   */
  getFinancialSummary() {
    return http.get("/financial/summary");
  }

  /**
   * Mengambil daftar artikel landing page
   * @returns Axios promise dengan list artikel
   */
  getLandingArticles() {
    return http.get("/content/articles");
  }

  /**
   * Mengambil teks landing page
   * @returns Axios promise dengan data teks landing
   */
  getLandingText() {
    return http.get("/content/landing-text");
  }

  // --- API WILAYAH INDONESIA ---
  /**
   * Mengambil daftar provinsi Indonesia
   * @returns Axios promise dengan list provinsi
   */
  getProvinces() {
    return http.get("/regions/provinces");
  }

  /**
   * Mengambil daftar kabupaten/kota berdasarkan provinsi
   * @param {string|number} provinceId - ID provinsi
   * @returns Axios promise dengan list regency
   */
  getRegencies(provinceId) {
    return http.get(`/regions/regencies/${provinceId}`);
  }

  /**
   * Mengambil daftar kecamatan berdasarkan kabupaten/kota
   * @param {string|number} regencyId - ID regency
   * @returns Axios promise dengan list district
   */
  getDistricts(regencyId) {
    return http.get(`/regions/districts/${regencyId}`);
  }

  /**
   * Mengambil daftar desa/kelurahan berdasarkan kecamatan
   * @param {string|number} districtId - ID district
   * @returns Axios promise dengan list village
   */
  getVillages(districtId) {
    return http.get(`/regions/villages/${districtId}`);
  }

  /**
   * Helper untuk upload file/gambar via FormData
   * @param {string} url - endpoint tujuan
   * @param {Object} data - data yang akan diappend ke FormData
   * @returns Axios promise dengan result upload
   */
  postFormData(url, data) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));
    return http.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
}

const uGlobal = new UGlobal();

export default uGlobal;
