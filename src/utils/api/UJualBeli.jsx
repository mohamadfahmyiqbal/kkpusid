import http from "./common";

class UJualBeli {
  createJualBeli(data) {
    return http.post("/jualbeli/create", data);
  }

  getJualBeliHistory(params) {
    return http.get("/jualbeli/history", { params });
  }

  getJualBeliDetail(id) {
    return http.get(`/jualbeli/${id}`);
  }

  getJualBeliOptions() {
    return http.get("/jualbeli/options");
  }

  // Legacy methods untuk compatibility
  getGeneralJualBeliHistory(params) {
    return this.getJualBeliHistory(params);
  }

  getFinancingHistory(params) {
    return http.get("/financial/history", { params });
  }

  submitPengajuan(data) {
    return http.post("/financial/apply", data);
  }

  getFinancingDetail(id) {
    return http.get(`/financial/detail/${id}`);
  }

  getOptions() {
    return http.get("/financial/options");
  }

  getTerms() {
    return http.get("/financial/terms");
  }

  downloadReceipt(id) {
    return http.get(`/financial/receipt/${id}`, {
      responseType: "blob",
    });
  }
}

const uJualBeli = new UJualBeli();

export default uJualBeli;
