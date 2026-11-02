import { t as api } from "./common-qX05v8MF.js";
//#region src/utils/api/UJualBeli.jsx
var UJualBeli = class {
	createJualBeli(data) {
		return api.post("/jualbeli/create", data);
	}
	getJualBeliHistory(params) {
		return api.get("/jualbeli/history", { params });
	}
	getJualBeliDetail(id) {
		return api.get(`/jualbeli/${id}`);
	}
	getJualBeliOptions() {
		return api.get("/jualbeli/options");
	}
	getGeneralJualBeliHistory(params) {
		return this.getJualBeliHistory(params);
	}
	getFinancingHistory(params) {
		return api.get("/financial/history", { params });
	}
	submitPengajuan(data) {
		return api.post("/financial/apply", data);
	}
	getFinancingDetail(id) {
		return api.get(`/financial/detail/${id}`);
	}
	getPelunasanBillItems(financingId) {
		return api.get(`/financial/pelunasan-items/${financingId}`);
	}
	getOptions() {
		return api.get("/financial/options");
	}
	getTerms() {
		return api.get("/financial/terms");
	}
	downloadReceipt(id) {
		return api.get(`/financial/receipt/${id}`, { responseType: "blob" });
	}
};
var uJualBeli = new UJualBeli();
//#endregion
export { uJualBeli as t };
