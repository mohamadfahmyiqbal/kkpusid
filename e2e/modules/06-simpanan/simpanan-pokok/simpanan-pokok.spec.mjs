/**
 * Module 06 — Simpanan Pokok
 * Flow 6.1: Simpanan Pokok (Setoran & Penarikan)
 *
 * Usage:
 *   npx playwright test e2e/modules/06-simpanan/simpanan-pokok/simpanan-pokok.spec.mjs
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

test.describe("Flow 6.1 — Simpanan Pokok", () => {
  let authToken = null;

  test.beforeEach(async ({ page }) => {
    if (!authToken && TEST_EMAIL && TEST_PASSWORD) {
      const loginResult = await apiLogin(page, TEST_EMAIL, TEST_PASSWORD);
      if (loginResult?.success) {
        authToken = loginResult.token;
      }
    }
  });

  test("simpanan-pokok: halaman simpanan utama", async ({ page }) => {
    await navigateWithAuth(page, "simpananPage", {}, 2000, authToken);
    await takeScreenshot(page, "simpanan-pokok-main");

    // Verifikasi halaman simpanan - gunakan tab container yang ada
    await expect(page.locator(".simpanan-tabs-container")).toBeVisible({ timeout: 5000 });

    await assertPageLoaded(page, "Simpanan Pokok");
  });

  test("simpanan-pokok: pilih produk simpanan pokok", async ({ page }) => {
    await navigateWithAuth(page, "simpananPage", {}, 2000, authToken);

    // Klik produk simpanan pokok
    const pokokBtn = page.locator("button:has-text('Pokok'), button:has-text('Simpanan Pokok')");
    if (await pokokBtn.first().isVisible({ timeout: 3000 }).catch(() => false)) {
      await pokokBtn.first().click();
      await page.waitForTimeout(2000);
    }
    await takeScreenshot(page, "simpanan-pokok-detail");
  });

  test("simpanan-pokok: setoran simpanan pokok", async ({ page }) => {
    await navigateWithAuth(page, "simpananPage", {}, 2000, authToken);

    // Klik tab Pokok dulu
    const pokokTab = page.locator("button:has-text('Pokok')").first();
    if (await pokokTab.isVisible({ timeout: 3000 }).catch(() => false)) {
      await pokokTab.click();
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
    await takeScreenshot(page, "simpanan-pokok-setor-form");
  });

  test("simpanan-pokok: penarikan simpanan pokok", async ({ page }) => {
    await navigateWithAuth(page, "penarikanSimpananPage", {}, 2000, authToken);
    await takeScreenshot(page, "simpanan-pokok-penarikan-main");

    // Verifikasi halaman penarikan - gunakan heading yang ada
    await expect(page.getByText("Form Pengajuan Pencairan")).toBeVisible({ timeout: 5000 });

    await assertPageLoaded(page, "Penarikan Simpanan Pokok");
  });

  test("simpanan-pokok: isi form penarikan simpanan pokok", async ({ page }) => {
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

    await takeScreenshot(page, "simpanan-pokok-penarikan-form");
  });
});