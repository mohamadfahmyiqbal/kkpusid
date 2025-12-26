import http from "./common";

class USimpanan {
  getSavingsHistory(params) {
    return http.get("/simpanan/riwayat", { params });
  }

  requestWithdrawal(data) {
    return http.post("/simpanan/penarikan/request", data);
  }

  getSavingsAccountInfo() {
    return http.get("/simpanan/rekening/info");
  }
}

export default new USimpanan();