import { t as api } from "./common-qX05v8MF.js";
import { t as uNotification } from "./UNotification-BqEfIC9t.js";
//#region src/utils/api/UAuth.js
var UAuth = class {
	accountRegister(data) {
		return api.post("/auth/register", data);
	}
	accountLogin(data) {
		return api.post("/auth/accountLogin", data);
	}
	getProfile() {
		return api.get("/anggota/profil");
	}
	logout() {
		localStorage.removeItem("token");
		localStorage.removeItem("userData");
		window.location.href = "/";
	}
};
var uAuth = new UAuth();
//#endregion
//#region src/features/auth/service/authService.js
var AuthService = class {
	/**
	* Registrasi akun baru
	* @param {Object} userData - Data registrasi user
	* @returns {Promise} Response dari API
	*/
	async register(userData) {
		return await uAuth.accountRegister(userData);
	}
	/**
	* Login akun
	* @param {Object} credentials - Data login
	* @returns {Promise} Response dari API
	*/
	async login(credentials) {
		return await uAuth.accountLogin(credentials);
	}
	/**
	* Get profile user
	* @returns {Promise} Response dari API
	*/
	async getProfile() {
		return await uAuth.getProfile();
	}
	/**
	* Logout user
	*/
	logout() {
		return uAuth.logout();
	}
	/**
	* Ambil VAPID public key untuk push notification
	* @returns {Promise} VAPID public key
	*/
	async getVapidPublicKey() {
		return await uNotification.getVapidPublicKey();
	}
	/**
	* Subscribe push notification
	* @param {Object} subscription - Push subscription object
	* @param {string} memberId - Member ID
	* @returns {Promise} Response dari API
	*/
	async subscribePush(subscription, memberId) {
		return await uNotification.subscribePush(subscription, memberId);
	}
};
var authService = new AuthService();
//#endregion
export { authService as t };
