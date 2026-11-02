import { gt as axios } from "./vendor-rpDlma0K.js";
//#region src/utils/api/common.js
var api = axios.create({
	baseURL: "https://api.kkpus.id/api",
	withCredentials: true,
	headers: { "Content-Type": "application/json" }
});
api.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
}, (error) => Promise.reject(error));
//#endregion
export { api as t };
