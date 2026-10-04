import UAuth from "../../../utils/api/UAuth";
import UNotification from "../../../utils/api/UNotification";

class AuthService {
  /**
   * Registrasi akun baru
   * @param {Object} userData - Data registrasi user
   * @returns {Promise} Response dari API
   */
  async register(userData) {
    return await UAuth.accountRegister(userData);
  }

  /**
   * Login akun
   * @param {Object} credentials - Data login
   * @returns {Promise} Response dari API
   */
  async login(credentials) {
    return await UAuth.accountLogin(credentials);
  }

  /**
   * Get profile user
   * @returns {Promise} Response dari API
   */
  async getProfile() {
    return await UAuth.getProfile();
  }

  /**
   * Logout user
   */
  logout() {
    return UAuth.logout();
  }

  /**
   * Ambil VAPID public key untuk push notification
   * @returns {Promise} VAPID public key
   */
  async getVapidPublicKey() {
    return await UNotification.getVapidPublicKey();
  }

  /**
   * Subscribe push notification
   * @param {Object} subscription - Push subscription object
   * @param {string} memberId - Member ID
   * @returns {Promise} Response dari API
   */
  async subscribePush(subscription, memberId) {
    return await UNotification.subscribePush(subscription, memberId);
  }
}

const authService = new AuthService();

export default authService;
