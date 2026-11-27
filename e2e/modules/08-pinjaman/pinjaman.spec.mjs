/**
 * Module 08 — Pinjaman / Pembiayaan
 * Flow 8: Program → Ajukan Pinjaman
 * 
 * Usage:
 *   npx playwright test e2e/modules/08-pinjaman/pinjaman.spec.mjs
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

test.describe("Flow 8 — Pinjaman / Pembiayaan", () => {
  let authToken = null;
  
  test.beforeEach(async ({ page }) => {
    if (!authToken && TEST_EMAIL && TEST_PASSWORD) {
      const loginResult = await apiLogin(page, TEST_EMAIL, TEST_PASSWORD);
      if (loginResult?.success) {
        authToken = loginResult.token;
      }
    }
  });

  test("programPage: daftar produk pinjaman", async ({ page }) => {
    
    
    await navigateWithAuth(page, "programPage", {}, 2000, authToken);
    await takeScreenshot(page, "pinjaman-main");
    
    // Verifikasi halaman (gunakan selector spesifik untuk menghindari strict mode violation)
    await expect(page.locator(".program-page-container")).toBeVisible({ timeout: 5000 });
    
    // Cek produk pinjaman
    const productCard = page.locator("[class*='product'], [class*='card']");
    if (await productCard.first().isVisible({ timeout: 3000 }).catch(() => false)) {
      console.log(`[PINJAMAN] Produk pinjaman ditemukan`);
    }
    
    await assertPageLoaded(page, "Program / Pinjaman");
  });

  test("programPage: pilih produk pinjaman", async ({ page }) => {
    
    
    await navigateWithAuth(page, "programPage", {}, 2000, authToken);
    
    // Klik produk pinjaman
    const productBtn = page.locator("button:has-text('Ajukan'), button:has-text('Pilih')");
    if (await productBtn.first().isVisible({ timeout: 3000 }).catch(() => false)) {
      await productBtn.first().click();
      await page.waitForTimeout(2000);
      await takeScreenshot(page, "pinjaman-detail");
    }
  });

  test("formPengajuanPinjaman: ajukan pinjaman", async ({ page }) => {
    
    
    await navigateWithAuth(page, "formPengajuanPinjaman", {}, 2000, authToken);
    await takeScreenshot(page, "pinjaman-form");
    
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
    
    // Isi keperluan
    const purposeInput = page.locator("textarea[name='keperluan'], input[placeholder*='keperluan' i]");
    if (await purposeInput.isVisible({ timeout: 3000 }).catch(() => false)) {
      await purposeInput.fill("Modal usaha");
    }
    
    await takeScreenshot(page, "pinjaman-form-filled");
  });
});
