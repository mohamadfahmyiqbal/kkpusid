/**
 * Module 10 — Jual Beli
 * Flow 10: Jual Beli → Ajukan Transaksi → Pelunasan → Nota
 * 
 * Usage:
 *   npx playwright test e2e/modules/10-jual-beli/jual-beli.spec.mjs
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

test.describe("Flow 10 — Jual Beli", () => {
  let authToken = null;
  
  test.beforeEach(async ({ page }) => {
    if (!authToken && TEST_EMAIL && TEST_PASSWORD) {
      const loginResult = await apiLogin(page, TEST_EMAIL, TEST_PASSWORD);
      if (loginResult?.success) {
        authToken = loginResult.token;
      }
    }
  });

  test("jualBeliPage: opsi transaksi", async ({ page }) => {
    
    
    await navigateWithAuth(page, "jualBeliPage", {}, 2000, authToken);
    await takeScreenshot(page, "jual-beli-main");
    
    // Verifikasi halaman (gunakan selector spesifik untuk menghindari strict mode violation)
    await expect(page.locator(".trans-page-container")).toBeVisible({ timeout: 5000 });
    
    // Cek opsi transaksi
    const optionCard = page.locator("[class*='option'], [class*='card']");
    if (await optionCard.first().isVisible({ timeout: 3000 }).catch(() => false)) {
      console.log(`[JUAL BELI] Opsi transaksi ditemukan`);
    }
    
    await assertPageLoaded(page, "Jual Beli");
  });

  test("formPengajuanTransaksi: ajukan jual beli", async ({ page }) => {
    
    
    await navigateWithAuth(page, "formPengajuanTransaksi", {}, 2000, authToken);
    await takeScreenshot(page, "jual-beli-form");
    
    // Isi barang
    const itemInput = page.locator("input[placeholder*='barang' i], input[name='item']");
    if (await itemInput.isVisible({ timeout: 3000 }).catch(() => false)) {
      await itemInput.fill("Laptop");
    }
    
    // Isi harga
    const priceInput = page.locator("input[placeholder*='harga' i], input[placeholder*='nominal' i]");
    if (await priceInput.isVisible({ timeout: 3000 }).catch(() => false)) {
      await priceInput.fill("10000000");
    }
    
    // Pilih metode bayar
    const methodSelect = page.locator("select[name='payment_method'], select[name='metode']");
    if (await methodSelect.isVisible({ timeout: 3000 }).catch(() => false)) {
      await methodSelect.selectOption("transfer");
    }
    
    await takeScreenshot(page, "jual-beli-form-filled");
  });

  test("pelunasanPage: pelunasan tagihan", async ({ page }) => {
    
    
    await navigateWithAuth(page, "pelunasanPage", { financingId: 1 }, 2000, authToken);
    await takeScreenshot(page, "jual-beli-pelunasan");
    
    // List tagihan
    const billList = page.locator("[class*='bill'], [class*='tagihan']");
    if (await billList.isVisible({ timeout: 3000 }).catch(() => false)) {
      console.log(`[JUAL BELI] Tagihan pelunasan ditemukan`);
    }
    
    await assertPageLoaded(page, "Pelunasan");
  });

  test("receiptPage: nota pembayaran", async ({ page }) => {
    
    
    await navigateWithAuth(page, "receiptPage", { billId: 1 }, 2000, authToken);
    await takeScreenshot(page, "jual-beli-nota");
    
    // Verifikasi nota
    const receiptContent = page.locator("[class*='receipt'], [class*='nota']");
    if (await receiptContent.isVisible({ timeout: 3000 }).catch(() => false)) {
      console.log(`[JUAL BELI] Nota ditemukan`);
    }
    
    await assertPageLoaded(page, "Nota / Receipt");
  });
});
