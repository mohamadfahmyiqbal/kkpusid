import http from "./common";

class UGlobal {
  getFinancialSummary() {
    return http.get("/financial/summary"); // Pastikan financialRoute terdaftar di backend
  }

  getLandingArticles() {
    return http.get("/articles");
  }

  getLandingText() {
    return http.get("/landingtext");
  }

  // Helper untuk upload file/gambar
  postFormData(url, data) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));
    return http.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
  }
}

export default new UGlobal();