import { t as apiClient } from "./api-BfASpAPH.js";
//#region src/features/auth/forgot-password/service/forgotPasswordService.js
var ForgotPasswordService = class {
	/**
	* Kirim OTP untuk forgot password
	* @param {Object} data - Data forgot password {emailHp}
	* @returns {Promise} Response dari API
	*/
	async sendOtp(data) {
		try {
			return (await apiClient.post("/auth/forgot-password/send-otp", data)).data;
		} catch (error) {
			throw error;
		}
	}
	/**
	* Verifikasi OTP
	* @param {Object} data - Data verifikasi {otpCode, sessionId}
	* @returns {Promise} Response dari API
	*/
	async verifyOtp(data) {
		try {
			return (await apiClient.post("/auth/forgot-password/verify-otp", data)).data;
		} catch (error) {
			throw error;
		}
	}
	/**
	* Reset password
	* @param {Object} data - Data reset password {resetToken, newPassword}
	* @returns {Promise} Response dari API
	*/
	async resetPassword(data) {
		try {
			return (await apiClient.post("/auth/forgot-password/reset", data)).data;
		} catch (error) {
			throw error;
		}
	}
	/**
	* Kirim ulang OTP
	* @param {Object} data - Data resend OTP {sessionId}
	* @returns {Promise} Response dari API
	*/
	async resendOtp(data) {
		try {
			return (await apiClient.post("/auth/forgot-password/resend-otp", data)).data;
		} catch (error) {
			throw error;
		}
	}
};
var forgotPasswordService = new ForgotPasswordService();
//#endregion
export { forgotPasswordService as t };
