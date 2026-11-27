/**
 * Module 05 — Tahap 2 (submit): Tombol "Kirim Sekarang" → Status Pendaftaran
 *
 * Memverifikasi perilaku NYATA tombol "Kirim Sekarang" di form 8-step:
 *   - Submit tidak auto-redirect.
 *   - Muncul SweetAlert "Berhasil" dengan tombol "Lihat Status Pendaftaran".
 *   - Tombol tersebut mengarah ke halaman `registrationPage` (Status Pendaftaran).
 *
 * CATATAN: Submit akan mengubah status akun (is_registration_done = true +
 * membuat member_registrations PENDING). Karena itu test memakai akun Calon
 * Anggota BARU (didaftarkan saat run) — BUKAN e2e.test@kkpus.id — agar Flow 5
 * (Dashboard Calon Anggota) tetap utuh.
 *
 * Form diisi lewat UI (input, react-select, kamera fake-device bawaan browser).
 * Tidak ada mock data.
 *
 * Usage:
 *   npx playwright test e2e/modules/05-dashboard/submit-redirect.spec.mjs
 */

import { test, expect } from "@playwright/test";
import { API_BASE_URL } from "../../../playwright.config.mjs";
import { navigateTo, takeScreenshot } from "../../helpers.mjs";

// PNG 1x1 valid untuk foto KTP/swafoto (base64 data URI) — kamera fake-device
// menghasilkan gambar valid; bila kosong, fallback ke PNG ini via form state.
const DATA_URI_PNG =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

test.describe("Tahap 2 — Submit 'Kirim Sekarang' → Status Pendaftaran", () => {
  // React-select: buka menu, pilih opsi dengan teks (atau opsi pertama)
  async function pickSelect(page, control, label) {
    await control.first().click();
    // Tunggu menu dropdown muncul
    await page.locator(".rs__menu").first().waitFor({ state: "visible", timeout: 5000 });
    if (label) {
      const labeledOption = page.locator(".rs__menu .rs__option", { hasText: label });
      if (await labeledOption.first().isVisible({ timeout: 2000 }).catch(() => false)) {
        await labeledOption.first().click();
      } else {
        await page.locator(".rs__menu .rs__option").first().click();
      }
    } else {
      await page.locator(".rs__menu .rs__option").first().click();
    }
    await page.waitForTimeout(500);
  }

  async function clickNext(page) {
    await page.locator("button:has-text('Selanjutnya')").click();
    await page.waitForTimeout(700);
  }

  test("klik Kirim Sekarang → SweetAlert → registrationPage", async ({ page, request }) => {
    test.setTimeout(180000);

    // 1. Daftarkan akun Calon Anggota BARU via API (tidak menyentuh e2e.test).
    const uniq = Date.now();
    const email = `e2e.submit.${uniq}@kkpus.id`;
    const password = "P@ssw0rd123!";
    const regRes = await request.post(`${API_BASE_URL}/auth/register`, {
      data: {
        full_name: "E2E Submit Redirect",
        email,
        password,
        phone_number: "081234567890",
        nik_ktp: `31710${String(uniq).slice(-11).padStart(11, "0")}`,
        gender: "L",
        address: "Jl. Submit No. 1",
        date_of_birth: "1990-01-01",
      },
    });
    const regBody = await regRes.json();
    expect(regRes.status(), `register → ${regRes.status()} ${JSON.stringify(regBody)}`).toBe(201);
    const token = regBody.data.token;
    console.log(`[SUBMIT] Akun baru: ${email}`);

    // 2. Inject token sebelum app mount, lalu buka form 8-step.
    await page.addInitScript(({ t }) => {
      localStorage.setItem("token", t);
    }, { t: token });

    await navigateTo(page, "registrationFormDetail", {}, 2000);

    /* ---------- Step 1: Data Pribadi ---------- */
    await expect(page.locator('input[name="nik_ktp"]')).toBeVisible({ timeout: 5000 });
    await page.locator('input[name="nik_ktp"]').fill(`31710${String(uniq).slice(-11).padStart(11, "0")}`);
    await page.locator('input[name="full_name"]').fill("E2E Submit Redirect");
    await page.locator('textarea[name="alamat_ktp"]').fill("Jl. Submit No. 1, Kota Test");
    await pickSelect(page, page.locator(".rs__control").nth(0), "DKI JAKARTA");
    await pickSelect(page, page.locator(".rs__control").nth(1), null);
    await pickSelect(page, page.locator(".rs__control").nth(2), null);
    await pickSelect(page, page.locator(".rs__control").nth(3), null);
    await clickNext(page);

    /* ---------- Step 2: Akun & Kontak ---------- */
    await expect(page.getByRole("heading", { name: "Akun & Kontak" })).toBeVisible({ timeout: 5000 });
    await pickSelect(page, page.locator(".rs__control").first(), "Anggota Reguler");
    await clickNext(page);

    /* ---------- Step 3: Foto KTP (webcam fake-device) ---------- */
    await expect(page.getByText("Dokumentasi KTP")).toBeVisible({ timeout: 5000 });
    await page.locator("button:has-text('Buka Kamera')").first().click();
    await page.waitForTimeout(800);
    await page.locator("button:has-text('Ambil Foto')").first().click();
    await page.waitForTimeout(800);
    await expect(page.getByText("Foto Berhasil")).toBeVisible({ timeout: 5000 });
    await clickNext(page);

    /* ---------- Step 4: Swafoto (webcam fake-device) ---------- */
    await expect(page.getByText("Verifikasi Wajah (Swafoto)")).toBeVisible({ timeout: 5000 });
    await page.locator("button:has-text('Buka Kamera')").first().click();
    await page.waitForTimeout(800);
    await page.locator("button:has-text('Ambil Foto')").first().click();
    await page.waitForTimeout(800);
    await expect(page.getByText("Foto Berhasil")).toBeVisible({ timeout: 5000 });
    await clickNext(page);

    /* ---------- Step 5: Pekerjaan ---------- */
    await expect(page.locator('input[name="occupation"]')).toBeVisible({ timeout: 5000 });
    await page.locator('input[name="occupation"]').fill("Karyawan Swasta");
    await page.locator('input[name="employer_name"]').fill("PT Test Maju");
    await page.locator('textarea[name="employer_address"], input[name="employer_address"]').first().fill("Jl. Kantor No. 1");
    await clickNext(page);

    /* ---------- Step 6: Kontak Darurat ---------- */
    await expect(page.locator('input[name="contact_name"]')).toBeVisible({ timeout: 5000 });
    await page.locator('input[name="contact_name"]').fill("Test Contact");
    await page.locator('input[name="phone_number_emergency"]').fill("081234567891");
    await page.locator('input[name="relation"]').fill("Saudara Kandung");
    await clickNext(page);

    /* ---------- Step 7: Rekening Bank ---------- */
    await expect(page.locator('input[name="bank_name"]')).toBeVisible({ timeout: 5000 });
    await page.locator('input[name="bank_name"]').fill("BCA");
    await page.locator('input[name="bank_account_no"]').fill("1234567890");
    await page.locator('input[name="account_holder"]').fill("E2E Submit Redirect");
    await clickNext(page);

    /* ---------- Step 8: Ringkasan → centang commitment → Kirim Sekarang ---------- */
    await expect(
      page.getByRole("heading", { name: "Ringkasan Permohonan" })
    ).toBeVisible({ timeout: 5000 });

    const submitBtn = page.getByRole("button", { name: "Kirim Sekarang" });
    await expect(submitBtn).toBeDisabled();
    const commitment = page.locator('input[type="checkbox"]');
    if (await commitment.first().isVisible().catch(() => false)) {
      await commitment.first().check({ force: true });
    }
    await expect(submitBtn).toBeEnabled({ timeout: 3000 });
    await takeScreenshot(page, "submit-step-8-ringkasan");

    // 3. Klik "Kirim Sekarang" → submit nyata ke backend.
    await submitBtn.click();

    // 4. SweetAlert "Berhasil" muncul dengan tombol "Lihat Status Pendaftaran".
    const successPopup = page.locator(".swal2-popup");
    await expect(successPopup).toBeVisible({ timeout: 15000 });
    await expect(successPopup.getByRole("heading", { name: "Berhasil" })).toBeVisible();
    const statusLink = successPopup.getByRole("link", { name: "Lihat Status Pendaftaran" });
    await expect(statusLink).toBeVisible();

    // Href = route token menuju registrationPage.
    const href = await statusLink.getAttribute("href");
    expect(href, "href menuju registrationPage").toBeTruthy();
    await takeScreenshot(page, "submit-sweetalert-lihat-status");

    // 5. Klik tombol → diarahkan ke halaman Status Pendaftaran (registrationPage).
    //    Catatan: submit memicu notifikasi socket real-time ("Status Pendaftaran
    //    Diperbarui") yang bisa muncul sebagai dialog modal menutupi link. Tutup
    //    dialog bila ada, lalu navigasi ke href (route token) secara langsung.
    const tutupBtn = page.getByRole("button", { name: "Tutup" });
    if (await tutupBtn.isVisible().catch(() => false)) {
      await tutupBtn.click().catch(() => {});
      await page.waitForTimeout(300);
    }
    expect(href.startsWith("/"), "href adalah path route token").toBeTruthy();
    await page.goto(href, { waitUntil: "domcontentloaded", timeout: 20000 });
    await page.waitForTimeout(2000);

    // Halaman status pendaftaran pasca-submit menampilkan "Detail Pendaftaran"
    // + status persetujuan (Pengawas/Ketua PENDING) — bukti submit berhasil.
    await expect(
      page.getByRole("heading", { name: "Pendaftaran Anggota", level: 1 })
    ).toBeVisible({ timeout: 10000 });
    await expect(
      page.getByRole("heading", { name: "Detail Pendaftaran" })
    ).toBeVisible({ timeout: 5000 });
    await expect(
      page.getByRole("heading", { name: "Status Persetujuan" })
    ).toBeVisible({ timeout: 5000 });
    await expect(
      page.locator("button", { hasText: "Pengawas" }).first()
    ).toBeVisible({ timeout: 5000 });

    await takeScreenshot(page, "submit-redirect-registration-status");
    console.log("[SUBMIT] ✅ Kirim Sekarang → SweetAlert → registrationPage OK");
  });
});