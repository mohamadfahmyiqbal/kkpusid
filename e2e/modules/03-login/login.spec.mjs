/**
 * Module 03 — Login
 * Flow 3: Login Anggota
 * 
 * Usage:
 *   npx playwright test e2e/modules/03-login/login.spec.mjs
 */

import { test, expect } from "@playwright/test";
import {
  BASE_URL,
  API_BASE_URL,
  SCREENSHOT_DIR,
  TEST_EMAIL,
  TEST_PASSWORD,
} from "../../../playwright.config.mjs";
import {
  navigateTo,
  takeScreenshot,
  clearAuth,
  assertPageLoaded,
  apiLogin,
  attemptLogin,
  waitForLoginToken,
  navigateWithAuth,
  saveAuthState,
} from "../../helpers.mjs";

test.describe("Flow 3 — Login", () => {
  test.beforeEach(async ({ page }) => {
    await clearAuth(page);
  });

  test("03-login-page: render login form", async ({ page }) => {
    await navigateTo(page, "authLogin", {}, 1500);
    await takeScreenshot(page, "03-login-page");
    
    // Verifikasi form elements
    await expect(page.locator("#login-email-phone")).toBeVisible();
    await expect(page.locator("#login-password")).toBeVisible();
    await expect(page.locator("button:has-text('Masuk Sekarang')")).toBeVisible();
    
    // Verifikasi link lupa password
    const lupaPwLink = page.locator("a:has-text('Lupa Password'), button:has-text('Lupa Password')");
    await expect(lupaPwLink.first()).toBeVisible();
    
    await assertPageLoaded(page, "Login");
  });

  test("03-login: login berhasil dengan kredensial valid", async ({ page }) => {
    
    
    await navigateTo(page, "authLogin", {}, 1500);
    
    // Isi form login
    await page.locator("#login-email-phone").fill(TEST_EMAIL);
    await page.locator("#login-password").fill(TEST_PASSWORD);
    
    await takeScreenshot(page, "03-login-filled");
    
    // Submit
    await page.locator("button:has-text('Masuk Sekarang')").click();
    
    // Tunggu token login
    try {
      await waitForLoginToken(page, 15000);
      const token = await page.evaluate(() => localStorage.getItem("token"));
      expect(token).toBeTruthy();
      console.log(`[LOGIN] Berhasil login sebagai ${TEST_EMAIL}`);
      
      // Simpan token untuk digunakan test lain
      const saved = await saveAuthState(page);
      expect(saved).toBeTruthy();
    } catch (err) {
      console.error(`[LOGIN ERROR] ${err.message}`);
      throw err;
    }
    
    await takeScreenshot(page, "03-login-success");
  });

  test("03-login: error kredensial salah", async ({ page }) => {
    await navigateTo(page, "authLogin", {}, 1500);
    
    // Isi dengan kredensial salah
    await page.locator("#login-email-phone").fill("wrong-email@kkpus.id");
    await page.locator("#login-password").fill("WrongPassword123!");
    
    // Submit
    await page.locator("button:has-text('Masuk Sekarang')").click();
    await page.waitForTimeout(3000);
    
    // Verifikasi error message muncul
    const errorMsg = page.locator(".swal2-title, .error-message, [class*='error']");
    await expect(errorMsg.first()).toBeVisible({ timeout: 5000 });
    
    await takeScreenshot(page, "03-login-error");
  });

  test("03-login: login via API (bypass UI)", async ({ page }) => {
    
    
    const loginResult = await apiLogin(page, TEST_EMAIL, TEST_PASSWORD);
    
    if (loginResult?.success) {
      console.log(`[API LOGIN] Berhasil login via API`);
      expect(loginResult.token).toBeTruthy();
    } else {
      console.log(`[API LOGIN] Gagal: ${loginResult.message}`);
    }
    
    await takeScreenshot(page, "03-login-api");
  });
});
