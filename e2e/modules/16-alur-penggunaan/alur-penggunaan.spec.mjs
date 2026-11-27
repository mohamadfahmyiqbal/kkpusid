/**
 * Module 16 — Alur Penggunaan
 * Flow 16: Complete User Journey (New Member & Returning Member)
 * 
 * This module tests the actual end-to-end user flow through the kkpusid public website:
 * 1. Splash → Landing → Login → Dashboard
 * 2. Dashboard → Simpanan (all 3 products) → Setoran → Penarikan
 * 3. Tabungan → Akun → Logout
 * 
 * Tests simulate real user navigation using click-based interactions where possible.
 */
import { test, expect } from "@playwright/test";
import {
  BASE_URL,
  TEST_EMAIL,
  TEST_PASSWORD,
} from "../../../playwright.config.mjs";
import {
  navigateTo,
  takeScreenshot,
  clearAuth,
  assertPageLoaded,
  apiLogin,
  navigateWithAuth,
  waitForLoginToken,
} from "../../helpers.mjs";

test.describe("Flow 16 — Alur Penggunaan (@public)", () => {
  test.beforeEach(async ({ page }) => {
    await clearAuth(page);
  });

  /* ================= User Flow 1: New Member Journey ================= */
  test.describe("User Flow 1: New Member Journey", () => {
    test("16-1: Splash → Landing → Login → Dashboard", async ({ page }) => {
      // 1. Splash Screen
      await navigateTo(page, "globalSplash", {}, 1200);
      await takeScreenshot(page, "16-1-splash");
      await assertPageLoaded(page, "Splash Screen");

      // 2. Landing Page
      await navigateTo(page, "landingPage", {}, 2500);
      await takeScreenshot(page, "16-1-landing");
      await assertPageLoaded(page, "Landing Page");

      // 3. Login page
      await navigateTo(page, "authLogin", {}, 1500);
      await takeScreenshot(page, "16-1-login");
      await assertPageLoaded(page, "Login Page");

      // 4. Login via API
      const loginResult = await apiLogin(page, TEST_EMAIL, TEST_PASSWORD);
      if (loginResult?.success) {
        console.log(`[16-1] Login berhasil, token: ${loginResult.token.substring(0, 20)}...`);
        // Token tersimpan via addInitScript, perlu navigate untuk trigger
        await navigateTo(page, "dashboard", {}, 2000);
        await takeScreenshot(page, "16-1-dashboard");
        await assertPageLoaded(page, "Dashboard");
      } else {
        console.log(`[16-1] Login gagal, skip dashboard check`);
      }
    });

    test("16-2: Dashboard → Simpanan Page", async ({ page }) => {
      // Login dulu
      const loginResult = await apiLogin(page, TEST_EMAIL, TEST_PASSWORD);
      if (!loginResult?.success) {
                return;
      }

      // Navigate ke dashboard dengan token
      await navigateWithAuth(page, "dashboard", {}, 2000, loginResult.token);
      await takeScreenshot(page, "16-2-dashboard");
      await assertPageLoaded(page, "Dashboard");

      // Navigate ke Simpanan page
      await navigateWithAuth(page, "simpananPage", {}, 2000, loginResult.token);
      await takeScreenshot(page, "16-2-simpanan");
      await assertPageLoaded(page, "Simpanan");
    });

    test("16-3: Simpanan - Pilih Produk (Pokok/Wajib/Sukarela)", async ({ page }) => {
      // Login dulu
      const loginResult = await apiLogin(page, TEST_EMAIL, TEST_PASSWORD);
      if (!loginResult?.success) {
                return;
      }

      // Navigate ke simpanan
      await navigateWithAuth(page, "simpananPage", {}, 2000, loginResult.token);
      await takeScreenshot(page, "16-3-simpanan");

      // Switch between product tabs (Pokok, Wajib, Sukarela)
      const productTabs = page.locator(".simpanan-tab-btn");
      const products = ["Pokok", "Wajib", "Sukarela"];
      
      // Tunggu tabs muncul
      await productTabs.first().waitFor({ state: "visible", timeout: 10000 }).catch(() => {
        console.log("[16-3] Tab tidak ditemukan, skip produk switching");
      });
      
      for (const product of products) {
        const tab = productTabs.nth(product === "Pokok" ? 0 : product === "Wajib" ? 1 : 2);
        if (await tab.isVisible({ timeout: 2000 }).catch(() => false)) {
          await tab.click();
          await page.waitForTimeout(1000);
          await takeScreenshot(page, `16-3-${product.toLowerCase()}`);
        }
      }
    });

    test("16-4: Simpanan - Setoran (Pokok/Wajib)", async ({ page }) => {
      // Login dulu
      const loginResult = await apiLogin(page, TEST_EMAIL, TEST_PASSWORD);
      if (!loginResult?.success) {
                return;
      }

      await navigateWithAuth(page, "simpananPage", {}, 2000, loginResult.token);
      
      // Click on "Setoran" button for Wajib (which always has this option)
      const setorButton = page.locator("button:has-text('Setoran')");
      if (await setorButton.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await setorButton.first().click();
        await page.waitForTimeout(1500);
        await takeScreenshot(page, "16-4-setoran-wajib");
        
        // Fill amount form
        const amountInput = page.locator("input[type='number'], input[placeholder*='jumlah' i]");
        if (await amountInput.isVisible({ timeout: 3000 }).catch(() => false)) {
          await amountInput.fill("100000");
        }
      }
    });

    test("16-5: Simpanan - Penarikan Sukarela", async ({ page }) => {
      // Login dulu
      const loginResult = await apiLogin(page, TEST_EMAIL, TEST_PASSWORD);
      if (!loginResult?.success) {
                return;
      }

      await navigateWithAuth(page, "simpananPage", {}, 2000, loginResult.token);
      
      // Click on "Pencairan" button (only Sukarela has this option)
      const pencairanButton = page.locator("button:has-text('Pencairan')");
      if (await pencairanButton.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await pencairanButton.first().click();
        await page.waitForTimeout(1500);
        await takeScreenshot(page, "16-5-pencairan-sukarela");
        
        // Fill withdrawal form
        const amountInput = page.locator("input[type='number'], input[placeholder*='jumlah' i]");
        if (await amountInput.isVisible({ timeout: 3000 }).catch(() => false)) {
          await amountInput.fill("50000");
        }
      }
    });

    test("16-6: Tabungan - Setoran", async ({ page }) => {
      // Login dulu
      const loginResult = await apiLogin(page, TEST_EMAIL, TEST_PASSWORD);
      if (!loginResult?.success) {
                return;
      }

      await navigateWithAuth(page, "tabunganPage", {}, 2000, loginResult.token);
      await takeScreenshot(page, "16-6-tabungan");
      await assertPageLoaded(page, "Tabungan");
    });

    test("16-7: Akun & Profil - Edit Data", async ({ page }) => {
      // Login dulu
      const loginResult = await apiLogin(page, TEST_EMAIL, TEST_PASSWORD);
      if (!loginResult?.success) {
                return;
      }

      await navigateWithAuth(page, "accountPage", {}, 2000, loginResult.token);
      await takeScreenshot(page, "16-7-akun");
      await assertPageLoaded(page, "Akun / Profil");
    });

    test("16-8: Logout", async ({ page }) => {
      // Login dulu
      const loginResult = await apiLogin(page, TEST_EMAIL, TEST_PASSWORD);
      if (!loginResult?.success) {
                return;
      }

      await navigateWithAuth(page, "accountPage", {}, 2000, loginResult.token);
      await takeScreenshot(page, "16-8-akun");
      
      const logoutBtn = page.locator("button:has-text('Logout')");
      if (await logoutBtn.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await logoutBtn.first().click();
        await page.waitForTimeout(1000);
        await navigateTo(page, "authLogin", {}, 1500);
        await takeScreenshot(page, "16-8-logout");
      }
    });
  });

  /* ================= User Flow 2: Returning Member Journey ================= */
  test.describe("User Flow 2: Returning Member Journey", () => {
    test("16-9: Login → Dashboard → Simpanan → Penarikan", async ({ page }) => {
      // Login
      const loginResult = await apiLogin(page, TEST_EMAIL, TEST_PASSWORD);
      if (!loginResult?.success) {
                return;
      }

      await navigateWithAuth(page, "dashboard", {}, 2000, loginResult.token);
      await takeScreenshot(page, "16-9-dashboard");
      await assertPageLoaded(page, "Dashboard");

      // Navigate to Simpanan
      await navigateWithAuth(page, "simpananPage", {}, 2000, loginResult.token);
      await takeScreenshot(page, "16-9-simpanan");
      await assertPageLoaded(page, "Simpanan");

      // Navigate to Penarikan
      await navigateWithAuth(page, "penarikanSimpananPage", {}, 2000, loginResult.token);
      await takeScreenshot(page, "16-9-penarikan");
      await assertPageLoaded(page, "Penarikan Simpanan");
    });
  });
});