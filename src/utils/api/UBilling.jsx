import http from "./common";

class UBilling {
  getPendingBills(filter = {}) {
    return http.get("/billing/list/pending", { params: filter });
  }

  getBillingHistory(filter = {}) {
    return http.get("/billing/list/history", { params: filter });
  }

  getInvoiceDetail(billId) {
    return http.get(`/billing/${billId}`);
  }

  processSavingsPayment(payload) {
    return http.post("/billing/midtrans/process-savings", payload);
  }

  createMidtransTransaction(data) {
    return http.post("/billing/midtrans/create-transaction", data);
  }
}

export default new UBilling();