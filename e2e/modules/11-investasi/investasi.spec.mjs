/**
 * Module 11 — Investasi
 * Flow 11: Investasi → Detail Produk → Order → Portofolio
 * 
 * Usage:
 *   npx playwright test e2e/modules/11-investasi/investasi.spec.mjs
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
  navigateWithAuth,
} from "../../helpers.mjs";

test.describe("Flow 11 — Investasi", () => {
  let authToken = null;
  
  test.beforeEach(async ({ page }) => {
    if (!authToken && TEST_EMAIL && TEST_PASSWORD) {
      const loginResult = await apiLogin(page, TEST_EMAIL, TEST_PASSWORD);
      if (loginResult?.success) {
        authToken = loginResult.token;
      }
    }
  });

  test("investasiPage: daftar produk investasi", async ({ page }) => {
    
    
    await navigateWithAuth(page, "investasiPage", {}, 2000, authToken);
    await takeScreenshot(page, "investasi-main");
    
    // Verifikasi halaman (gunakan selector spesifik untuk menghindari strict mode violation)
    await expect(page.locator(".investasi-page-container")).toBeVisible({ timeout: 5000 });
    
    // Cek produk investasi
    const productCard = page.locator("[class*='product'], [class*='card']");
    if (await productCard.first().isVisible({ timeout: 3000 }).catch(() => false)) {
      console.log(`[INVESTASI] Produk investasi ditemukan`);
    }
    
    await assertPageLoaded(page, "Investasi");
  });

  test("investasiHalal: produk halal", async ({ page }) => {
    
    
    await navigateWithAuth(page, "investasiHalal", {}, 2000, authToken);
    await takeScreenshot(page, "investasi-halal");
    
    // Verifikasi produk halal (gunakan selector spesifik untuk menghindari strict mode violation)
    await expect(page.locator(".investasi-halal-container")).toBeVisible({ timeout: 5000 });
    
    await assertPageLoaded(page, "Investasi Halal");
  });

  test("detailSukuk: detail sukuk", async ({ page }) => {
    
    
    await navigateWithAuth(page, "detailSukuk", { id: 1 }, 2000, authToken);
    await takeScreenshot(page, "investasi-sukuk");
    
    // Cek detail produk
    const detailContent = page.locator("[class*='detail'], [class*='info']");
    if (await detailContent.isVisible({ timeout: 3000 }).catch(() => false)) {
      console.log(`[INVESTASI] Detail sukuk ditemukan`);
    }
    
    await assertPageLoaded(page, "Detail Sukuk");
  });

  test("pendanaanSyariah: pendanaan syariah", async ({ page }) => {
    
    
    await navigateWithAuth(page, "pendanaanSyariah", {}, 2000, authToken);
    await takeScreenshot(page, "investasi-pendanaan");
    
    // Verifikasi produk pendanaan
    // Verifikasi produk pendanaan (gunakan selector spesifik untuk menghindari strict mode violation)
    await expect(page.locator(".investasi-wrapper")).toBeVisible({ timeout: 5000 });
    
    await assertPageLoaded(page, "Pendanaan Syariah");
  });

  test("formPendanaanSyariah: ajukan pendanaan", async ({ page }) => {
    
    
    await navigateWithAuth(page, "formPendanaanSyariah", {}, 2000, authToken);
    await takeScreenshot(page, "investasi-pendanaan-form");
    
    // Isi nominal
    const amountInput = page.locator("input[placeholder*='nominal' i], input[placeholder*='jumlah' i]");
    if (await amountInput.isVisible({ timeout: 3000 }).catch(() => false)) {
      await amountInput.fill("5000000");
    }
    
    // Pilih tenor
    const tenorSelect = page.locator("select[name='tenor'], select[name='durasi']");
    if (await tenorSelect.isVisible({ timeout: 3000 }).catch(() => false)) {
      await tenorSelect.selectOption("12");
    }
    
    await takeScreenshot(page, "investasi-pendanaan-form-filled");
  });
});
