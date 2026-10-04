// UInvestasi.jsx
import http from "./common";
class UInvestasi {
  getPortofolioSummary() { return http.get("/investasi/portofolio/summary"); }
  getAvailableProducts() { return http.get("/investasi/produk/list"); }
  submitOrder(data) { return http.post("/investasi/order/submit", data); }
}
export default new UInvestasi();