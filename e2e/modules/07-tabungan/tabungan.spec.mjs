/**
 * Module 07 — Tabungan Target
 * Flow 7: Tabungan → Ajukan Target → Detail → Setoran
 * 
 * Usage:
 *   npx playwright test e2e/modules/07-tabungan/tabungan.spec.mjs
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

test.describe("Flow 7 — Tabungan Target", () => {
  let authToken = null;
  
  test.beforeEach(async ({ page }) => {
    if (!authToken && TEST_EMAIL && TEST_PASSWORD) {
      const loginResult = await apiLogin(page, TEST_EMAIL, TEST_PASSWORD);
      if (loginResult?.success) {
        authToken = loginResult.token;
      }
    }
  });

  test("tabunganPage: daftar program tabungan", async ({ page }) => {
    
    
    await navigateWithAuth(page, "tabunganPage", {}, 2000, authToken);
    await takeScreenshot(page, "tabungan-main");
    
    // Verifikasi halaman (gunakan selector spesifik untuk menghindari strict mode violation)
    await expect(page.locator(".tabungan-page-container")).toBeVisible({ timeout: 5000 });
    
    // Cek program tabungan
    const programCard = page.locator("[class*='program'], [class*='card']");
    if (await programCard.first().isVisible({ timeout: 3000 }).catch(() => false)) {
      console.log(`[TABUNGAN] Program tabungan ditemukan`);
    }
    
    await assertPageLoaded(page, "Tabungan");
  });

  test("formPengajuanTabungan: ajukan target", async ({ page }) => {
    
    
    await navigateWithAuth(page, "formPengajuanTabungan", {}, 2000, authToken);
    await takeScreenshot(page, "tabungan-ajuan");
    
    // Form pengajuan
    const targetInput = page.locator("input[placeholder*='target' i], input[placeholder*='nominal' i]");
    if (await targetInput.isVisible({ timeout: 3000 }).catch(() => false)) {
      await targetInput.fill("10000000");
    }
    
    // Pilih tenor
    const tenorSelect = page.locator("select[name='tenor'], select[name='durasi']");
    if (await tenorSelect.isVisible({ timeout: 3000 }).catch(() => false)) {
      await tenorSelect.selectOption("12");
    }
    
    await takeScreenshot(page, "tabungan-ajuan-form");
  });

  test("detailTabungan: detail & progres", async ({ page }) => {
    
    
    await navigateWithAuth(page, "detailTabungan", { tabunganId: 1 }, 2000, authToken);
    await takeScreenshot(page, "tabungan-detail");
    
    // Cek progres bar
    const progressBar = page.locator("[class*='progress'], [class*='bar']");
    if (await progressBar.isVisible({ timeout: 3000 }).catch(() => false)) {
      console.log(`[TABUNGAN] Progress bar ditemukan`);
    }
  });

  test("setoranTabungan: bayar tagihan", async ({ page }) => {
    
    
    await navigateWithAuth(page, "setoranTabungan", { tabunganId: 1 }, 2000, authToken);
    await takeScreenshot(page, "tabungan-setor");
    
    // List tagihan
    const billList = page.locator("[class*='bill'], [class*='tagihan']");
    if (await billList.isVisible({ timeout: 3000 }).catch(() => false)) {
      console.log(`[TABUNGAN] Tagihan tabungan ditemukan`);
    }
  });

  test("penarikanTabunganPage: penarikan tabungan", async ({ page }) => {
    
    
    await navigateWithAuth(page, "penarikanTabunganPage", {}, 2000, authToken);
    await takeScreenshot(page, "tabungan-penarikan");
    
    await assertPageLoaded(page, "Penarikan Tabungan");
  });
});
