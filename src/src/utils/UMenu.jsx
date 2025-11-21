import http from "./common";

class UMenu {
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

  getMenuUtama(fields) {
    return this.postJSON("/getMenuUtama", fields);
  }
  manageNotification(fields) {
    return this.postJSON("/manageNotification", fields);
  }
  getAllTagihanByUser(fields) {
    return this.postJSON("/getAllTagihanByUser", fields);
  }
  getAllTagihanDetail(fields) {
    return this.postJSON("/getAllTagihanDetail", fields);
  }
}

export default new UMenu();
