import { gt as axios } from "./vendor-rpDlma0K.js";
//#region src/utils/api.js
var apiClient = axios.create({
	baseURL: "https://api.kkpus.id/api",
	timeout: 1e4,
	headers: { "Content-Type": "application/json" }
});
apiClient.interceptors.request.use((config) => {
	const token = localStorage.getItem("authToken");
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
}, (error) => {
	return Promise.reject(error);
});
apiClient.interceptors.response.use((response) => {
	return response;
}, (error) => {
	if (error.response?.status === 401) {
		localStorage.removeItem("authToken");
		localStorage.removeItem("userData");
		window.location.href = "/landingPage";
	}
	if (error.response?.status === 403) console.error("Access forbidden - insufficient permissions");
	return Promise.reject(error);
});
//#endregion
export { apiClient as t };
