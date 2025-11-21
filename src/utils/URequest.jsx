import http from "./common";

class URequest {
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

  getRequestByNik(fields) {
    return this.postJSON("/getRequestByNik", fields);
  }
}

export default new URequest();
