import http from "./common";

class UTransaction {
  createTransaction(data) {
    return http.post("/transaction/create", data);
  }

  getTransactionHistory(params) {
    return http.get("/transaction/history", { params });
  }

  getTransactionDetail(id) {
    return http.get(`/transaction/${id}`);
  }

  getTransactionOptions() {
    return http.get("/transaction/options");
  }

  // Legacy methods untuk compatibility
  getGeneralTransactionHistory(params) {
    return this.getTransactionHistory(params);
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

const uTransaction = new UTransaction();

export default uTransaction;
