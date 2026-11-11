// UInvestasi.jsx
import http from "./common";
class UInvestasi {
  /**
   * Mengambil ringkasan portofolio investasi pengguna saat ini
   * @returns Axios promise dengan data ringkasan portofolio
   */
  getPortofolioSummary() {
    return http.get("/investasi/portofolio/summary");
  }

  /**
   * Mengambil daftar produk investasi yang tersedia (sukuk, saham, reksa dana, dll.)
   * @returns Axios promise dengan daftar product ID, nama, harga, dll.
   */
  getAvailableProducts() {
    return http.get("/investasi/produk/list");
  }

  /**
   * Mengajukan order/sukuk/membeli produk investasi
   * @param {Object} data - data order: product_id, quantity, price, dan lain-lain
   * @returns Axios promise dengan result order submission (sn, reference, status)
   */
  submitOrder(data) {
    return http.post("/investasi/order/submit", data);
  }
}
export default new UInvestasi();