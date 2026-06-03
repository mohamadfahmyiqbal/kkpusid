class ForgotPasswordService {
  /**
   * Kirim OTP untuk forgot password
   * @param {Object} data - Data forgot password {emailHp}
   * @returns {Promise} Response dari API
   */
  async sendOtp(data) {
    // TODO: Implement API call untuk kirim OTP
    // return await http.post("/auth/forgot-password/send-otp", data);

    // Temporary simulation
    return new Promise((resolve) => {
      setTimeout(() => {
        if (data.emailHp.toLowerCase() === "error@test.com") {
          resolve({
            success: false,
            message: "Akun tidak ditemukan.",
          });
        } else {
          resolve({
            success: true,
            message: "OTP berhasil dikirim.",
            data: {
              sessionId: "session-token-123",
              expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
            },
          });
        }
      }, 2000);
    });
  }

  /**
   * Verifikasi OTP
   * @param {Object} data - Data verifikasi {otpCode, sessionId}
   * @returns {Promise} Response dari API
   */
  async verifyOtp(data) {
    // TODO: Implement API call untuk verifikasi OTP
    // return await http.post("/auth/forgot-password/verify-otp", data);

    // Temporary simulation
    return new Promise((resolve) => {
      setTimeout(() => {
        if (data.otpCode === "123456") {
          resolve({
            success: true,
            message: "OTP berhasil diverifikasi.",
            data: {
              resetToken: "reset-token-456",
              expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
            },
          });
        } else {
          resolve({
            success: false,
            message: "Kode OTP tidak valid atau sudah kadaluarsa.",
          });
        }
      }, 2000);
    });
  }

  /**
   * Reset password
   * @param {Object} data - Data reset password {resetToken, newPassword}
   * @returns {Promise} Response dari API
   */
  async resetPassword(data) {
    // TODO: Implement API call untuk reset password
    // return await http.post("/auth/forgot-password/reset", data);

    // Temporary simulation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "Password berhasil direset.",
        });
      }, 2000);
    });
  }

  /**
   * Kirim ulang OTP
   * @param {Object} data - Data resend OTP {sessionId}
   * @returns {Promise} Response dari API
   */
  async resendOtp(data) {
    // TODO: Implement API call untuk resend OTP
    // return await http.post("/auth/forgot-password/resend-otp", data);

    // Temporary simulation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "OTP berhasil dikirim ulang.",
        });
      }, 1500);
    });
  }
}

const forgotPasswordService = new ForgotPasswordService();

export default forgotPasswordService;
