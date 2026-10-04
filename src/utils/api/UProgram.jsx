// UProgram.jsx
import http from "./common";
class UProgram {
  getLoanProducts() { return http.get("/program/pinjaman/produk"); }
  applyLoan(data) { return http.post("/program/pinjaman/apply", data); }
  getArisanDetail(id) { return http.get(`/program/arisan/detail/${id}`); }
}
export default new UProgram();