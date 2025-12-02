import http from "./common";

class UGlobal {
  // Helper: kirim request dengan JSON
  postJSON(url, data) {
    return http.post(url, data, {
      headers: { "Content-Type": "application/json" },
    });
  }

  // Helper: kirim request dengan FormData
  postFormData(url, data) {
    const formData = new FormData();
    Object.entries(data || {}).forEach(([key, value]) => {
      formData.append(key, value);
    });

    return http.post(url, formData, {
      // Biarkan axios set boundary untuk multipart
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  /**
   * Mengambil daftar artikel publik untuk Landing Page.
   * Endpoint: /public/articles
   */
  getLandingArticles(fields) {
    return http.get("/public/articles", fields);
  }

  /**
   * Mengambil teks/konten statis untuk Hero Section atau bagian lain.
   * Endpoint: /public/text (Asumsi endpoint)
   */
  getLandingText() {
    return http.get("/public/text");
  }
}

export default new UGlobal();
