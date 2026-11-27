/**
 * Module 02 — Registrasi Akun
 * Flow 2: Tahap 1 — Buat Akun Login
 *
 * Catatan: Tahap 2 (Formulir Keanggotaan 8 Step) & Tahap 3 (Status
 * Pendaftaran) adalah bagian dari Modul 05 — Dashboard Calon Anggota,
 * lihat e2e/modules/05-dashboard/dashboard.spec.mjs.
 *
 * Usage:
 *   npx playwright test e2e/modules/02-registrasi/registrasi.spec.mjs
 */

import { test, expect } from "@playwright/test";
import {
  navigateTo,
  takeScreenshot,
  clearAuth,
  assertPageLoaded,
} from "../../helpers.mjs";

test.describe("Flow 2 — Registrasi Akun", () => {
  test.beforeEach(async ({ page }) => {
    // User baru — belum login, tanpa token.
    await clearAuth(page);
  });

  /* ================= Tahap 1 — Buat Akun Login ================= */

  test.describe("Tahap 1 — Buat Akun Login", () => {
    test("04-register-page: form registrasi", async ({ page }) => {
      await navigateTo(page, "accountRegisterPage", {}, 1500);
      await takeScreenshot(page, "04-register-page");

      await expect(page.locator('input[name="nama"]')).toBeVisible();
      await expect(page.locator('input[name="email"]')).toBeVisible();
      await expect(page.locator('input[name="password"]')).toBeVisible();
      await expect(page.locator('input[name="confirmPassword"]')).toBeVisible();
      await expect(page.locator("button.pbs-submit-v2")).toBeVisible();

      await assertPageLoaded(page, "Registrasi Akun");
    });

    test("04-register: daftar akun baru", async ({ page }) => {
      await navigateTo(page, "accountRegisterPage", {}, 1500);

      const registeredEmail = `e2e.reg.${Date.now()}@kkpus.id`;
      const registeredPassword = process.env.TEST_PASSWORD || "P@ssw0rd123!";

      await page.locator('input[name="nama"]').fill("E2E Test Anggota");
      await page.locator('input[name="email"]').fill(registeredEmail);
      await page.locator('input[name="password"]').fill(registeredPassword);
      await page.locator('input[name="confirmPassword"]').fill(registeredPassword);

      await takeScreenshot(page, "04-register-filled");

      // Submit → SweetAlert konfirmasi muncul
      await page.locator("button.pbs-submit-v2").click();

      const swalConfirm = page.locator(
        ".swal2-container .swal2-confirm, .swal2-container button:has-text('Ke Halaman Login')"
      );
      await expect(swalConfirm.first()).toBeVisible({ timeout: 15000 });
      await takeScreenshot(page, "04-register-swalert");

      // Klik "Ke Halaman Login" → diarahkan ke halaman login
      await swalConfirm.first().click();
      await page.waitForTimeout(1500);
      await expect(page.locator("#login-email-phone")).toBeVisible({ timeout: 10000 });

      // Akun dibuat berstatus pending — belum login, token belum ada.
      // Token baru didapat setelah pengguna login di halaman login (Modul 03).
      const token = await page.evaluate(() => localStorage.getItem("token"));
      expect(token).toBeNull();

      console.log(`[REG] Akun dibuat (pending): ${registeredEmail}`);
      await takeScreenshot(page, "04-register-success");
    });
  });
});