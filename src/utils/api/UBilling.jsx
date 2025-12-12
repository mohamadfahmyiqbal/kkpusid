// src/utils/api/UBilling.jsx

import http from "./common";

class UBilling {
  getPendingBills(filter = {}) {
    // Jalur SINKRON: /list/pending (Prefix /api/tagihan ditangani oleh instance http/main server)
    return http.get("/list/pending", { params: filter }); 
  }

  getInvoiceDetail(billId) {
    // Jalur SINKRON: /:billId
    return http.get(`/${billId}`); // Hapus '/tagihan'
  }

  createMidtransTransaction(billId) {
    // Jalur SINKRON: /midtrans/create-transaction
    return http.post("/midtrans/create-transaction", { bill_id: billId }); // Hapus '/tagihan'
  }
}

export default new UBilling();