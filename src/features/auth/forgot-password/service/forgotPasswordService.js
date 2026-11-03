import { apiClient } from "../../../../utils/api";

class ForgotPasswordService {
  /**
   * Kirim OTP untuk forgot password
   * @param {Object} data - Data forgot password {emailHp}
   * @returns {Promise} Response dari API
   */
  async sendOtp(data) {
    const response = await apiClient.post("/auth/forgot-password/send-otp", data);
    return response.data;
  }

  /**
   * Verifikasi OTP
   * @param {Object} data - Data verifikasi {otpCode, sessionId}
   * @returns {Promise} Response dari API
   */
  async verifyOtp(data) {
    const response = await apiClient.post("/auth/forgot-password/verify-otp", data);
    return response.data;
  }

  /**
   * Reset password
   * @param {Object} data - Data reset password {resetToken, newPassword}
   * @returns {Promise} Response dari API
   */
  async resetPassword(data) {
    const response = await apiClient.post("/auth/forgot-password/reset", data);
    return response.data;
  }

  /**
   * Kirim ulang OTP
   * @param {Object} data - Data resend OTP {sessionId}
   * @returns {Promise} Response dari API
   */
  async resendOtp(data) {
    const response = await apiClient.post("/auth/forgot-password/resend-otp", data);
    return response.data;
  }
}

const forgotPasswordService = new ForgotPasswordService();

export default forgotPasswordService;
