/**
 * Module 06 — Simpanan Wajib
 * Flow 6.2: Simpanan Wajib (Setoran & Penarikan)
 *
 * Usage:
 *   npx playwright test e2e/modules/06-simpanan/simpanan-wajib/simpanan-wajib.spec.mjs
 */

import { test, expect } from "@playwright/test";
import {
  BASE_URL,
  API_BASE_URL,
  SCREENSHOT_DIR,
  TEST_EMAIL,
  TEST_PASSWORD,
} from "../../../../playwright.config.mjs";
import {
  navigateTo,
  takeScreenshot,
  clearAuth,
  assertPageLoaded,
  apiLogin,
  navigateWithAuth,
} from "../../../helpers.mjs";

test.describe("Flow 6.2 — Simpanan Wajib", () => {
  let authToken = null;

  test.beforeEach(async ({ page }) => {
    if (!authToken && TEST_EMAIL && TEST_PASSWORD) {
      const loginResult = await apiLogin(page, TEST_EMAIL, TEST_PASSWORD);
      if (loginResult?.success) {
        authToken = loginResult.token;
      }
    }
  });

  test("simpanan-wajib: halaman simpanan utama", async ({ page }) => {
    await navigateWithAuth(page, "simpananPage", {}, 2000, authToken);
    await takeScreenshot(page, "simpanan-wajib-main");

    // Verifikasi halaman simpanan - gunakan tab container yang ada
    await expect(page.locator(".simpanan-tabs-container")).toBeVisible({ timeout: 5000 });

    await assertPageLoaded(page, "Simpanan Wajib");
  });

  test("simpanan-wajib: pilih produk simpanan wajib", async ({ page }) => {
    await navigateWithAuth(page, "simpananPage", {}, 2000, authToken);

    // Klik produk simpanan wajib
    const wajibBtn = page.locator("button:has-text('Wajib'), button:has-text('Simpanan Wajib')").first();
    if (await wajibBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await wajibBtn.click();
      await page.waitForTimeout(2000);
    }
    await takeScreenshot(page, "simpanan-wajib-detail");
  });

  test("simpanan-wajib: setoran simpanan wajib", async ({ page }) => {
    await navigateWithAuth(page, "simpananPage", {}, 2000, authToken);

    // Klik tab Wajib dulu
    const wajibTab = page.locator("button:has-text('Wajib')").first();
    if (await wajibTab.isVisible({ timeout: 3000 }).catch(() => false)) {
      await wajibTab.click();
      await page.waitForTimeout(1000);
    }

    // Klik tombol setor
    const setorBtn = page.locator("button:has-text('Setor'), button:has-text('Setoran')").first();
    if (await setorBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await setorBtn.click();
      await page.waitForTimeout(2000);

      // Form setoran
      const amountInput = page.locator("input[type='number'], input[placeholder*='jumlah' i]").first();
      if (await amountInput.isVisible({ timeout: 3000 }).catch(() => false)) {
        await amountInput.fill("100000");
      }
    }
    await takeScreenshot(page, "simpanan-wajib-setor-form");
  });

  test("simpanan-wajib: penarikan simpanan wajib", async ({ page }) => {
    await navigateWithAuth(page, "penarikanSimpananPage", {}, 2000, authToken);
    await takeScreenshot(page, "simpanan-wajib-penarikan-main");

    // Verifikasi halaman penarikan - gunakan heading yang ada
    await expect(page.getByText("Form Pengajuan Pencairan")).toBeVisible({ timeout: 5000 });

    await assertPageLoaded(page, "Penarikan Simpanan Wajib");
  });

  test("simpanan-wajib: isi form penarikan simpanan wajib", async ({ page }) => {
    await navigateWithAuth(page, "penarikanSimpananPage", {}, 2000, authToken);

    // Isi jumlah penarikan
    const amountInput = page.locator("input[type='number'], input[placeholder*='jumlah' i]").first();
    if (await amountInput.isVisible({ timeout: 3000 }).catch(() => false)) {
      await amountInput.fill("50000");
    }

    // Pilih metode
    const transferBtn = page.locator("input[value='transfer'], button:has-text('Transfer')").first();
    if (await transferBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await transferBtn.click();
    }

    await takeScreenshot(page, "simpanan-wajib-penarikan-form");
  });
});