import http from "./common";

class USavings {
  createSavingsApplication(data) {
    return http.post("/savings/apply", data);
  }

  getSavingsHistory(params) {
    return http.get("/savings/history", { params });
  }

  getSavingsDetail(id) {
    return http.get(`/savings/${id}`);
  }

  getSavingsOptions() {
    return http.get("/savings/options");
  }

  getSavingsSummary() {
    return http.get("/savings/summary");
  }
}

const uSavings = new USavings();

export default uSavings;
