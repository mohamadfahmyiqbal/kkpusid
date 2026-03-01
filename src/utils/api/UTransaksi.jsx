import http from "./common";

class UTransaksi {
  getGeneralTransactionHistory(params) {
    return http.get("/financing/history", { params });
  }

  submitPengajuan(data) {
    return http.post("/financing/apply", data);
  }

  getFinancingDetail(id) {
    return http.get(`/financing/detail/${id}`);
  }

  getOptions() {
    return http.get("/financing/options");
  }

  getTerms() {
    return http.get("/financing/terms");
  }

  downloadReceipt(id) {
    return http.get(`/financing/receipt/${id}`, {
      responseType: "blob",
    });
  }
}

const uTransaksi = new UTransaksi();

export default uTransaksi;
