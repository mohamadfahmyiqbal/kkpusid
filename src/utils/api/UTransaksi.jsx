import http from "./common";

class UTransaksi {
  getGeneralTransactionHistory(params) {
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

const uTransaksi = new UTransaksi();

export default uTransaksi;
