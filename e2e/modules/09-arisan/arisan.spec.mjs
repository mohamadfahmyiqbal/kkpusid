/**
 * Module 09 — Arisan
 * Flow 9: Arisan → Gabung → Konfirmasi → Pengajuan
 * 
 * Usage:
 *   npx playwright test e2e/modules/09-arisan/arisan.spec.mjs
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

test.describe("Flow 9 — Arisan", () => {
  let authToken = null;
  
  test.beforeEach(async ({ page }) => {
    if (!authToken && TEST_EMAIL && TEST_PASSWORD) {
      const loginResult = await apiLogin(page, TEST_EMAIL, TEST_PASSWORD);
      if (loginResult?.success) {
        authToken = loginResult.token;
      }
    }
  });

  test("arisanPage: daftar batch arisan", async ({ page }) => {
    
    
    await navigateWithAuth(page, "arisanPage", {}, 2000, authToken);
    await takeScreenshot(page, "arisan-main");
    
    // Verifikasi halaman (gunakan selector spesifik untuk menghindari strict mode violation)
    await expect(page.locator(".arisan-page-container")).toBeVisible({ timeout: 5000 });
    
    // Cek batch arisan
    const batchCard = page.locator("[class*='batch'], [class*='card']");
    if (await batchCard.first().isVisible({ timeout: 3000 }).catch(() => false)) {
      console.log(`[ARISAN] Batch arisan ditemukan`);
    }
    
    await assertPageLoaded(page, "Arisan");
  });

  test("arisanJoinPage: gabung batch", async ({ page }) => {
    
    
    await navigateWithAuth(page, "arisanJoinPage", {}, 2000, authToken);
    await takeScreenshot(page, "arisan-gabung");
    
    // Form gabung
    const batchSelect = page.locator("select[name='batch'], select[name='arisan']");
    if (await batchSelect.isVisible({ timeout: 3000 }).catch(() => false)) {
      await batchSelect.selectOption("1");
    }
    
    await takeScreenshot(page, "arisan-gabung-form");
  });

  test("arisanConfirmationPage: konfirmasi keikutsertaan", async ({ page }) => {
    

    // CATATAN (2026-11-26): Halaman ArisanConfirmationPage merender fallback
    // "Data grup arisan tidak ditemukan" bila token tidak membawa payload
    // `arisan` (butuh { arisan: { batch, kategori, targetNominal, ... } }).
    // Test ini sebelumnya navigasi tanpa payload → selector
    // `.arisan-confirmation-page-container` tidak pernah muncul.
    // Lihat e2e/reports/SKIPPED-TESTS.md.

    await navigateWithAuth(page, "arisanConfirmationPage", {}, 2000, authToken);
    await takeScreenshot(page, "arisan-konfirmasi");

    // Verifikasi halaman konfirmasi (gunakan selector spesifik untuk menghindari strict mode violation)
    await expect(page.locator(".arisan-confirmation-page-container")).toBeVisible({ timeout: 5000 });

    await assertPageLoaded(page, "Konfirmasi Arisan");
  });

  test("formPengajuanArisan: pengajuan arisan", async ({ page }) => {
    
    
    await navigateWithAuth(page, "formPengajuanArisan", { arisanId: 1 }, 2000, authToken);
    await takeScreenshot(page, "arisan-pengajuan");
    
    // Form pengajuan
    const formFields = page.locator("input, select, textarea");
    if (await formFields.first().isVisible({ timeout: 3000 }).catch(() => false)) {
      console.log(`[ARISAN] Form pengajuan ditemukan`);
    }
    
    await takeScreenshot(page, "arisan-pengajuan-form");
  });
});
