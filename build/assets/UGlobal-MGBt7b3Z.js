import { t as api } from "./common-qX05v8MF.js";
//#region src/utils/api/UGlobal.jsx
var UGlobal = class {
	getFinancialSummary() {
		return api.get("/financial/summary");
	}
	getLandingArticles() {
		return api.get("/content/articles");
	}
	getLandingText() {
		return api.get("/content/landing-text");
	}
	getProvinces() {
		return api.get("/regions/provinces");
	}
	getRegencies(provinceId) {
		return api.get(`/regions/regencies/${provinceId}`);
	}
	getDistricts(regencyId) {
		return api.get(`/regions/districts/${regencyId}`);
	}
	getVillages(districtId) {
		return api.get(`/regions/villages/${districtId}`);
	}
	postFormData(url, data) {
		const formData = new FormData();
		Object.entries(data).forEach(([key, value]) => formData.append(key, value));
		return api.post(url, formData, { headers: { "Content-Type": "multipart/form-data" } });
	}
};
var uGlobal = new UGlobal();
//#endregion
export { uGlobal as t };
