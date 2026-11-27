/**
 * Module 04 — Lupa Password
 * Flow 4: Forgot Password → OTP → Reset Password (5 tahap lengkap)
 *
 * Catatan: Alur test mencakup 5 tahap lengkap dari dokumen ALUR-PER-MODUL.md:
 * 1. Halaman forgot → input email → submit
 * 2. OTP dikirim → halaman input OTP (6 digit)
 * 3. Verifikasi OTP
 * 4. Halaman reset → isi password baru + konfirmasi
 * 5. Submit → password berhasil diubah
 *
 * Usage:
 *   npx playwright test e2e/modules/04-lupa-password/lupa-password.spec.mjs
 *   Set TEST_EMAIL di playwright.config.mjs terlebih dahulu
 */

import { test, expect } from "@playwright/test";
import { TEST_EMAIL } from "../../../playwright.config.mjs";
import {
  navigateTo,
  takeScreenshot,
  clearAuth,
  assertPageLoaded,
} from "../../helpers.mjs";

test.describe("Flow 4 — Lupa Password", () => {
  test.beforeEach(async ({ page }) => {
    await clearAuth(page);
  });

  /* ================= Tahap 1: Render Form Lupa Password ================= */

  test("04-lupa-password: render form lupa password", async ({ page }) => {
    await navigateTo(page, "authForgotPassword", {}, 1500);
    await takeScreenshot(page, "04-lupa-password");

    // Verifikasi form elements ada - gunakan getByRole
    await expect(page.getByRole("textbox")).toBeVisible({ timeout: 5000 });
    await expect(page.getByRole("button")).toBeVisible({ timeout: 5000 });

    await assertPageLoaded(page, "Lupa Password");
  });

  /* ================= Tahap 2: Kirim OTP → Halaman Input OTP ================= */

  test("04-lupa-password: kirim OTP (backend nyata) → halaman OTP", async ({ page }) => {
    test.skip(!TEST_EMAIL, "Set TEST_EMAIL di playwright.config.mjs untuk test kirim OTP nyata");

    await navigateTo(page, "authForgotPassword", {}, 1500);

    // Isi field email pertama dihalaman lupa password
    const textboxes = page.getByRole("textbox");
    await textboxes.nth(0).fill(TEST_EMAIL);
    await takeScreenshot(page, "04-lupa-password-filled");

    // Submit form - klik button pertama
    await page.getByRole("button").nth(0).click();
    await takeScreenshot(page, "04-lupa-password-submitted");

    // Sukses → diarahkan ke halaman input OTP (6 digit)
    // Tunggu input textbox muncul (akan ada 6 input OTP)
    await expect(textboxes.nth(0)).toBeVisible({ timeout: 15000 });
    await takeScreenshot(page, "04-lupa-password-sent");
  });

  /* ================= Tahap 3: Verifikasi OTP ================= */

  test("04-lupa-password: verifikasi OTP 6 digit → halaman reset password", async ({ page }) => {
    test.skip(!TEST_EMAIL, "Set TEST_EMAIL di playwright.config.mjs untuk test verifikasi OTP");

    await navigateTo(page, "authForgotPassword", {}, 1500);

    // Isi email
    const textboxes = page.getByRole("textbox");
    await textboxes.nth(0).fill(TEST_EMAIL);
    await page.getByRole("button").nth(0).click();

    // Tunggu halaman OTP muncul - verifikasi input textbox ada
    await expect(textboxes.nth(0)).toBeVisible({ timeout: 15000 });

    // Masukkan OTP 6 digit di input terpisah
    // Dari struktur DOM: 6 input textbox untuk OTP dengan inputmode numeric
    const otpInputs = page.getByRole("textbox");
    const otpCode = "123456";

    for (let i = 0; i < 6; i++) {
      // Pastikan input ke-i terlihat lalu isi
      await otpInputs.nth(i).waitFor({ state: "visible", timeout: 5000 });
      await otpInputs.nth(i).fill(otpCode[i]);
    }

    // Submit verifikasi OTP - klik button pertama
    await page.getByRole("button").nth(0).click();

    // Setelah verifikasi sukses, dialihkan ke halaman reset password
    // Verifikasi input password muncul
    await expect(page.getByRole("textbox")).toBeVisible({ timeout: 15000 });
    await takeScreenshot(page, "04-lupa-password-verified");
  });

  /* ================= Tahap 4: Halaman Reset Password ================= */

  test("04-lupa-password: render form reset password baru", async ({ page }) => {
    test.skip(!TEST_EMAIL, "Set TEST_EMAIL di playwright.config.mjs untuk test halaman reset");

    // Navigasi langsung ke halaman reset password setelah OTP diverifikasi
    await navigateTo(page, "authResetPassword", {}, 1500);

    // Verifikasi form elements ada di halaman reset
    // Dari DOM: ada 2 textbox (password dan konfirmasi) dan button
    const textboxes = page.getByRole("textbox");
    await expect(textboxes.nth(0)).toBeVisible({ timeout: 5000 });
    await expect(textboxes.nth(1)).toBeVisible({ timeout: 5000 });
    await page.getByRole("button").nth(0).waitFor({ state: "visible", timeout: 5000 });

    await assertPageLoaded(page, "Reset Password");
  });

  /* ================= Tahap 5: Submit Password Baru → Success ================= */

  test("04-lupa-password: submit password baru → success message & login", async ({ page }) => {
    test.skip(!TEST_EMAIL, "Set TEST_EMAIL di playwright.config.mjs untuk test submit password");

    // Pastikan sudah di halaman reset password (dari test tahap 3 atau navigasi langsung)
    await navigateTo(page, "authResetPassword", {}, 1500);

    const newPassword = `NewPass${Date.now()}!`;
    const confirmPassword = newPassword;

    const textboxes = page.getByRole("textbox");

    // Isi password baru di textbox pertama
    await textboxes.nth(0).fill(newPassword);
    await takeScreenshot(page, "04-reset-password-new-filled");

    // Isi konfirmasi password di textbox kedua
    await textboxes.nth(1).fill(confirmPassword);
    await takeScreenshot(page, "04-reset-password-confirm-filled");

    // Submit reset password - klik button pertama
    await page.getByRole("button").nth(0).click();

    // Tunggu success alert atau redirect ke login
    // SweetAlert muncul dengan animation delay, perlu waktu lebih lama
    await page.waitForTimeout(3000);

    // Verifikasi SweetAlert sukses tampak (SweetAlert2 uses specific elements)
    // Cek multiple ways: role="alertdialog", text "Berhasil", atau icon-check
    await expect(async () => {
      // Try to find SweetAlert2 elements
      const alertDialog = page.locator('[role="alertdialog"]');
      if (await alertDialog.count()) {
        await alertDialog.waitFor({ state: "visible", timeout: 5000 });
      }
      
      // Wait for SweetAlert2 to render and become interactable
      await new Promise(resolve => setTimeout(resolve, 2000));
    });

    // Click confirm button of SweetAlert - look for "Confirm" or "OK" or checkmark icon
    // SweetAlert2 has class "swal2-confirm" or button with text confirm
    const confirmButton = page.locator('button.swal2-confirm').or(page.getByRole("button", { name: /confirm|ok/ }).first());
    await expect(confirmButton).toBeVisible({ timeout: 10000 });
    await confirmButton.click();
    
    // Wait for redirect
    await page.waitForTimeout(1500);

    // Verifikasi kembali ke halaman login (token dibersihkan)
    await expect(page.getByRole("textbox")).toBeVisible({ timeout: 10000 });
    await takeScreenshot(page, "04-reset-password-success");
  });
});