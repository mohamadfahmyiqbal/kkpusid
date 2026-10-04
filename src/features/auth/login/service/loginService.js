import authService from "../../service/authService";

class LoginService {
  /**
   * Login akun menggunakan authService
   * @param {Object} credentials - Data login {emailHp, password}
   * @returns {Promise} Response dari API
   */
  async login(credentials) {
    return await authService.login(credentials);
  }

  /**
   * Get profile user setelah login
   * @returns {Promise} Response dari API
   */
  async getProfile() {
    return await authService.getProfile();
  }

  /**
   * Logout user
   */
  logout() {
    return authService.logout();
  }
}

const loginService = new LoginService();

export default loginService;
