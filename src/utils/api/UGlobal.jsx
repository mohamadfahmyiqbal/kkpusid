import http from "./common";

class UGlobal {
  getFinancialSummary() {
    return http.get("/financial/summary");
  }

  getLandingArticles() {
    return http.get("/articles");
  }

  getLandingText() {
    return http.get("/landingtext");
  }

  // --- API WILAYAH INDONESIA ---
  getProvinces() {
    return http.get("/regions/provinces");
  }

  getRegencies(provinceId) {
    return http.get(`/regions/regencies/${provinceId}`);
  }

  getDistricts(regencyId) {
    return http.get(`/regions/districts/${regencyId}`);
  }

  getVillages(districtId) {
    return http.get(`/regions/villages/${districtId}`);
  }

  // Helper untuk upload file/gambar
  postFormData(url, data) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));
    return http.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
}

export default new UGlobal();
