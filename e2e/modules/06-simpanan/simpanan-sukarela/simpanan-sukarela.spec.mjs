/**
 * Module 06 — Simpanan Sukarela
 * Flow 6.3: Simpanan Sukarela (Setoran & Penarikan)
 *
 * Usage:
 *   npx playwright test e2e/modules/06-simpanan/simpanan-sukarela/simpanan-sukarela.spec.mjs
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

test.describe("Flow 6.3 — Simpanan Sukarela", () => {
  let authToken = null;

  test.beforeEach(async ({ page }) => {
    if (!authToken && TEST_EMAIL && TEST_PASSWORD) {
      const loginResult = await apiLogin(page, TEST_EMAIL, TEST_PASSWORD);
      if (loginResult?.success) {
        authToken = loginResult.token;
      }
    }
  });

  test("simpanan-sukarela: halaman simpanan utama", async ({ page }) => {
    await navigateWithAuth(page, "simpananPage", {}, 2000, authToken);
    await takeScreenshot(page, "simpanan-sukarela-main");

    // Verifikasi halaman simpanan - gunakan tab container yang ada
    await expect(page.locator(".simpanan-tabs-container")).toBeVisible({ timeout: 5000 });

    await assertPageLoaded(page, "Simpanan Sukarela");
  });

  test("simpanan-sukarela: pilih produk simpanan sukarela", async ({ page }) => {
    await navigateWithAuth(page, "simpananPage", {}, 2000, authToken);

    // Klik produk simpanan sukarela
    const sukarelaBtn = page.locator("button:has-text('Sukarela'), button:has-text('Simpanan Sukarela')").first();
    if (await sukarelaBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await sukarelaBtn.click();
      await page.waitForTimeout(2000);
    }
    await takeScreenshot(page, "simpanan-sukarela-detail");
  });

  test("simpanan-sukarela: setoran simpanan sukarela", async ({ page }) => {
    await navigateWithAuth(page, "simpananPage", {}, 2000, authToken);

    // Klik tab Sukarela dulu
    const sukarelaTab = page.locator("button:has-text('Sukarela')").first();
    if (await sukarelaTab.isVisible({ timeout: 3000 }).catch(() => false)) {
      await sukarelaTab.click();
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
    await takeScreenshot(page, "simpanan-sukarela-setor-form");
  });

  test("simpanan-sukarela: penarikan simpanan sukarela", async ({ page }) => {
    await navigateWithAuth(page, "penarikanSimpananPage", {}, 2000, authToken);
    await takeScreenshot(page, "simpanan-sukarela-penarikan-main");

    // Verifikasi halaman penarikan - gunakan heading yang ada
    await expect(page.getByText("Form Pengajuan Pencairan")).toBeVisible({ timeout: 5000 });

    await assertPageLoaded(page, "Penarikan Simpanan Sukarela");
  });

  test("simpanan-sukarela: isi form penarikan simpanan sukarela", async ({ page }) => {
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

    await takeScreenshot(page, "simpanan-sukarela-penarikan-form");
  });
});