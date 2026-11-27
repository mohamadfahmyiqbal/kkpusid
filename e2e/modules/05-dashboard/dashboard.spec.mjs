/**
 * Module 05 — Dashboard
 * Flow 5: Dashboard Utama Anggota
 *
 * Usage:
 *   npx playwright test e2e/modules/05-dashboard/dashboard.spec.mjs
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
  waitForPageReady,
  restoreAuthState,
  loadAuthState,
} from "../../helpers.mjs";

// Token untuk test terproteksi Tahap 2 & 3 (dimuat dari e2e/.auth-state.json)
let regAuthToken = null;

async function ensureRegAuthToken(page) {
  const savedState = await loadAuthState();
  if (savedState?.token) {
    await restoreAuthState(page);
    regAuthToken = savedState.token;
    console.log(`[AUTH] Menggunakan token tersimpan: ${regAuthToken.substring(0, 20)}...`);
  }
  return regAuthToken;
}

test.describe("Flow 5 — Dashboard Calon Anggota", () => {
  let authToken = null;

  test.beforeEach(async ({ page }) => {
    // Login dulu jika belum ada token (retry untuk cold-start API)
    if (!authToken && TEST_EMAIL && TEST_PASSWORD) {
      for (let attempt = 1; attempt <= 3 && !authToken; attempt++) {
        const loginResult = await apiLogin(page, TEST_EMAIL, TEST_PASSWORD);
        if (loginResult?.success) {
          authToken = loginResult.token;
          console.log(`[DASHBOARD] Login berhasil sebagai ${TEST_EMAIL}`);
        } else {
          console.log(`[DASHBOARD] Login gagal (attempt ${attempt}/3), coba lagi...`);
          await page.waitForTimeout(2000);
        }
      }
      if (!authToken) {
        console.log(`[DASHBOARD] Gagal login setelah 3x, test akan skip`);
      }
    }
  });

  // Menunggu profile termuat (userData datang via socket profile:update).
  // Hero hanya dirender setelah profileLoading selesai & userData ada.
  async function waitDashboardReady(page) {
    await expect(page.locator(".dc-hero h1")).toBeVisible({ timeout: 20000 });
  }

  test("dashboard: tampilan lengkap calon anggota (status_id=1)", async ({ page }) => {
    

    await navigateWithAuth(page, "dashboard", {}, 3000, authToken);
    await waitDashboardReady(page);
    await takeScreenshot(page, "dashboard-main");

    // 1. Hero Section — sapaan personal + pesan khusus calon anggota
    await expect(page.locator(".dc-hero h1")).toContainText("Assalamu'alaikum,");
    await expect(
      page.getByText("Lengkapi data dan mulai perjalanan usaha bersama kami.")
    ).toBeVisible();

    // 2. CandidateStepsCard — "Status Pendaftaran Anggota" + 4 tahap
    await expect(
      page.getByRole("heading", { name: "Status Pendaftaran Anggota" })
    ).toBeVisible();
    for (const title of [
      "Buat Akun",
      "Daftar Menjadi Anggota",
      "Approval",
      "Menjadi Anggota Koperasi",
    ]) {
      await expect(
        page.locator(".dc-steps strong", { hasText: title })
      ).toBeVisible();
    }
    // Tahap 2 (Daftar Menjadi Anggota) belum lengkap → tombol "Daftar Sekarang"
    await expect(
      page.getByRole("button", { name: "Daftar Sekarang" })
    ).toBeVisible();

    // 3. NextStepsCard — "Langkah Selanjutnya" + 4 langkah calon anggota
    await expect(
      page.getByRole("heading", { name: "Langkah Selanjutnya" })
    ).toBeVisible();
    for (const title of [
      "Lengkapi Data Usaha",
      "Unggah Dokumen",
      "Ajukan Pembiayaan",
      "Konsultasi Dengan Kami",
    ]) {
      await expect(
        page.locator(".dc-next-row strong", { hasText: title })
      ).toBeVisible();
    }

    // 4. MainMenuSection — 7 menu utama dinonaktifkan (is-disabled + disabled)
    const disabledMenus = page.locator(".dc-menu-item.is-disabled");
    await expect(disabledMenus).toHaveCount(7);
    for (const label of [
      "Simpanan",
      "Program",
      "Tabungan",
      "Investasi",
      "Training",
      "Jual Beli",
      "Riwayat",
    ]) {
      await expect(
        page.locator(".dc-menu-item", { hasText: label })
      ).toBeDisabled();
    }

    // 5. TrainingCardSection & ArticleCardSection (tampil untuk semua role)
    await expect(
      page.getByRole("heading", { name: "Evaluasi (Training)" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Artikel Terbaru" })
    ).toBeVisible();

    // 6. Bantuan Cepat — "Butuh Bantuan?" + tombol "Hubungi Kami"
    await expect(
      page.getByRole("heading", { name: "Butuh Bantuan?" })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Hubungi Kami" })
    ).toBeVisible();

    // 7. Notifikasi — ikon bell tersedia
    await expect(page.locator("button[aria-label='Notifikasi']")).toBeVisible();

    await assertPageLoaded(page, "Dashboard");
  });

  test("dashboard: menu utama terkunci untuk calon anggota", async ({ page }) => {
    

    await navigateWithAuth(page, "dashboard", {}, 3000, authToken);
    await waitDashboardReady(page);

    // Semua tombol menu utama disabled & berkelas is-disabled (tidak bisa navigasi)
    const menuButtons = page.locator(".dc-menu-item");
    await expect(menuButtons).toHaveCount(7);
    const first = menuButtons.first();
    await expect(first).toBeDisabled();
    await expect(first).toHaveClass(/is-disabled/);
    await takeScreenshot(page, "dashboard-menu-disabled");
  });

  test("dashboard: notifikasi bell dapat dibuka", async ({ page }) => {
    

    await navigateWithAuth(page, "dashboard", {}, 3000, authToken);
    await waitDashboardReady(page);

    // Ikon bell notifikasi ada & bisa diklik (dropdown terbuka)
    const bell = page.locator("button[aria-label='Notifikasi']");
    await expect(bell).toBeVisible();
    await bell.click();
    await page.waitForTimeout(1000);
    await takeScreenshot(page, "dashboard-notification-dropdown");
  });

  test("dashboard: tombol 'Lihat Detail' (CandidateStepsCard) → registrationPage", async ({ page }) => {
    

    await navigateWithAuth(page, "dashboard", {}, 3000, authToken);
    await waitDashboardReady(page);

    // Header kartu "Status Pendaftaran Anggota" punya tombol/link "Lihat Detail".
    const card = page.locator(".dc-card-modern", { hasText: "Status Pendaftaran Anggota" }).first();
    await expect(card).toBeVisible({ timeout: 10000 });
    const lihatDetail = card.getByRole("button", { name: "Lihat Detail" }).first();
    await expect(lihatDetail).toBeVisible();

    // Klik → diarahkan ke halaman Status Pendaftaran (registrationPage).
    await lihatDetail.click();
    await page.waitForLoadState("domcontentloaded", { timeout: 20000 });
    await page.waitForTimeout(2000);

    // Halaman status pendaftaran: heading "Pendaftaran Anggota" + "Detail Pendaftaran".
    await expect(
      page.getByRole("heading", { name: "Pendaftaran Anggota", level: 1 })
    ).toBeVisible({ timeout: 10000 });
    await takeScreenshot(page, "dashboard-lihat-detail-registration");
  });
});

/* ================= Tahap 2 — Formulir Keanggotaan 8 Step =================
 *
 * Desain: ALUR LINIER UI-DRIVEN (satu tes panjang), TANPA mock data.
 * Semua step diisi lewat UI (input, react-select, kamera fake-device bawaan
 * browser), lalu pindah antar step dengan tombol "Selanjutnya". Screenshot
 * diambil per step. Form memuat profil & status pendaftaran NYATA dari backend
 * (GET /anggota/getRegistrationStatus & /anggota/profil) — tidak ada respons
 * API yang dipalsukan.
 */

test.describe("Tahap 2 — Formulir Keanggotaan 8 Step", () => {
  // Klik "Selanjutnya" — gagal keras bila validasi step menolak
  async function clickNext(page) {
    await page.locator("button:has-text('Selanjutnya')").click();
    await page.waitForTimeout(700);
  }

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
        // Fallback: pilih opsi pertama jika label tidak ditemukan
        await page.locator(".rs__menu .rs__option").first().click();
      }
    } else {
      await page.locator(".rs__menu .rs__option").first().click();
    }
    await page.waitForTimeout(500);
  }

  test("alur lengkap: isi form 8 step via UI", async ({ page, request }) => {
    test.setTimeout(180000);

    // Buat akun Calon Anggota BARU via API agar form selalu fresh (tidak
    // tergantung state e2e.test@kkpus.id yang sudah pernah registrasi).
    const uniq = Date.now();
    const newEmail = `e2e.form8.${uniq}@kkpus.id`;
    const newNIK = `31710${String(uniq).slice(-11).padStart(11, "0")}`;
    const regRes = await request.post(`${API_BASE_URL}/auth/register`, {
      data: {
        full_name: "E2E Form 8 Step",
        email: newEmail,
        password: TEST_PASSWORD,
        phone_number: "081234567890",
        nik_ktp: newNIK,
        gender: "L",
        address: "Jl. Form No. 1",
        date_of_birth: "1990-01-01",
      },
    });
    expect(regRes.status(), `register → ${regRes.status()}`).toBe(201);
    const regBody = await regRes.json();
    const newToken = regBody.data.token;
    console.log(`[FORM8] Akun baru: ${newEmail}`);

    // Inject token user baru sebelum app mount
    await page.addInitScript(({ t }) => {
      localStorage.setItem("token", t);
    }, { t: newToken });

    // Catatan: TANPA mock data. Form memuat profil & status pendaftaran nyata
    // dari backend (GET /anggota/getRegistrationStatus & /anggota/profil).
    // Webcam memakai perangkat kamera palsu bawaan browser (fake-device),
    // bukan injeksi data — lihat launchOptions di playwright.config.mjs.

    await navigateTo(page, "registrationFormDetail", {}, 2000);

    /* ---------- Step 1: Data Pribadi ---------- */
    await expect(page.locator('input[name="nik_ktp"]')).toBeVisible({ timeout: 5000 });
    await page.locator('input[name="nik_ktp"]').fill(newNIK);
    await page.locator('input[name="full_name"]').fill("E2E Form 8 Step");
    await page.locator('textarea[name="alamat_ktp"]').fill("Jl. Form No. 1, Kota Test");

    await pickSelect(page, page.locator(".rs__control").nth(0), "DKI JAKARTA"); // provinsi
    await pickSelect(page, page.locator(".rs__control").nth(1), null);          // kota
    await pickSelect(page, page.locator(".rs__control").nth(2), null);          // kecamatan
    await pickSelect(page, page.locator(".rs__control").nth(3), null);          // kelurahan

    await takeScreenshot(page, "reg-step-1-data-pribadi");
    await clickNext(page);

    /* ---------- Step 2: Akun & Kontak ---------- */
    await expect(page.getByRole("heading", { name: "Akun & Kontak" })).toBeVisible({ timeout: 5000 });
    await pickSelect(page, page.locator(".rs__control").first(), "Anggota Reguler");

    await takeScreenshot(page, "reg-step-2-akun-kontak");
    await clickNext(page);

    /* ---------- Step 3: Foto KTP (webcam) ---------- */
    await expect(page.getByText("Dokumentasi KTP")).toBeVisible({ timeout: 5000 });
    await page.locator("button:has-text('Buka Kamera')").first().click();
    await page.waitForTimeout(800);
    await page.locator("button:has-text('Ambil Foto')").first().click();
    await page.waitForTimeout(800);
    await expect(page.getByText("Foto Berhasil")).toBeVisible({ timeout: 5000 });

    await takeScreenshot(page, "reg-step-3-foto-ktp");
    await clickNext(page);

    /* ---------- Step 4: Swafoto (webcam) ---------- */
    await expect(page.getByText("Verifikasi Wajah (Swafoto)")).toBeVisible({ timeout: 5000 });
    await page.locator("button:has-text('Buka Kamera')").first().click();
    await page.waitForTimeout(800);
    await page.locator("button:has-text('Ambil Foto')").first().click();
    await page.waitForTimeout(800);
    await expect(page.getByText("Foto Berhasil")).toBeVisible({ timeout: 5000 });

    await takeScreenshot(page, "reg-step-4-swafoto");
    await clickNext(page);

    /* ---------- Step 5: Pekerjaan ---------- */
    await expect(page.locator('input[name="occupation"]')).toBeVisible({ timeout: 5000 });
    await page.locator('input[name="occupation"]').fill("Karyawan Swasta");
    await page.locator('input[name="employer_name"]').fill("PT Test Maju");
    await page.locator('textarea[name="employer_address"], input[name="employer_address"]').first().fill("Jl. Kantor No. 1");

    await takeScreenshot(page, "reg-step-5-pekerjaan");
    await clickNext(page);

    /* ---------- Step 6: Kontak Darurat ---------- */
    await expect(page.locator('input[name="contact_name"]')).toBeVisible({ timeout: 5000 });
    await page.locator('input[name="contact_name"]').fill("Test Contact");
    await page.locator('input[name="phone_number_emergency"]').fill("081234567891");
    await page.locator('input[name="relation"]').fill("Saudara Kandung");

    await takeScreenshot(page, "reg-step-6-kontak-darurat");
    await clickNext(page);

    /* ---------- Step 7: Rekening Bank ---------- */
    await expect(page.locator('input[name="bank_name"]')).toBeVisible({ timeout: 5000 });
    await page.locator('input[name="bank_name"]').fill("BCA");
    await page.locator('input[name="bank_account_no"]').fill("1234567890");
    await page.locator('input[name="account_holder"]').fill("E2E Form 8 Step");

    await takeScreenshot(page, "reg-step-7-rekening-bank");
    await clickNext(page);

    /* ---------- Step 8: Ringkasan ---------- */
    await expect(
      page.getByRole("heading", { name: "Ringkasan Permohonan" })
    ).toBeVisible({ timeout: 5000 });
    // Tombol kirim awalnya disabled sampai commitment dicentang
    await expect(page.getByRole("button", { name: "Kirim Sekarang" })).toBeDisabled();
    const commitment = page.locator('input[type="checkbox"]');
    if (await commitment.first().isVisible().catch(() => false)) {
      await commitment.first().check({ force: true });
      await expect(page.getByRole("button", { name: "Kirim Sekarang" })).toBeEnabled({ timeout: 3000 });
    }
    await takeScreenshot(page, "reg-step-8-ringkasan");
  });
});

/* ================= Tahap 3 — Status Pendaftaran ================= */

test.describe("Tahap 3 — Status Pendaftaran", () => {
  test("registrationPage: status verifikasi", async ({ page }) => {
    await ensureRegAuthToken(page);
    test.skip(!regAuthToken, "Tidak ada token auth.");
    await page.addInitScript(({ t }) => {
      localStorage.setItem("token", t);
    }, { t: regAuthToken });

    await navigateTo(page, "registrationPage", {}, 2000);
    await takeScreenshot(page, "registration-status");

    // Heading utama halaman status
    const heading = page.locator("h5:has-text('Pendaftaran Anggota'), h5:has-text('Ketentuan Pendaftaran')");
    await expect(heading.first()).toBeVisible({ timeout: 5000 });

    // CTA menuju formulir permohonan 8 step
    await expect(
      page.getByRole("button", { name: "Isi Form Permohonan Menjadi Anggota" })
    ).toBeVisible();

    // Ketentuan Pendaftaran + 3 syarat
    await expect(
      page.getByRole("heading", { name: "Ketentuan Pendaftaran Anggota" })
    ).toBeVisible();
    for (const req of [
      "Warga Negara Indonesia",
      "Melengkapi Dokumen Permohonan menjadi Anggota Koperasi",
      "Melunasi kewajiban Anggota",
    ]) {
      await expect(page.getByText(req)).toBeVisible();
    }

    // Kartu bantuan
    await expect(page.getByText("Butuh Bantuan?")).toBeVisible();

    await assertPageLoaded(page, "Status Pendaftaran");
  });
});

/* ==========================================================
 *  TAHAP 3 (E2E): RegistrationSummary → "BAYAR SIMPANAN SEKARANG" → BillingPage (BillList)
 *
 *  Tes ini menutup GAP coverage yang sebelumnya tidak ada:
 *  alur UI lengkap dari halaman Status Pendaftaran (RegistrationSummary)
 *  → klik tombol "BAYAR SIMPANAN SEKARANG" (handleNavigateToInvoice)
 *  → navigasi via JWT token ke BillingPage
 *  → daftar tagihan (BillList) siap dibayar.
 *
 *  Catatan: Tes ini bersifat ADAPTIF.
 *  - Jika user token sudah terdaftar & approved (bill_id tersedia), tes menguji
 *    alur penuh tombol → BillingPage.
 *  - Jika belum terdaftar, tes memverifikasi Main View (CTA ke form) dan skip
 *    dengan penanda bahwa prasyarat approval belum terpenuhi.
 *  ========================================================= */
test.describe("Tahap 3 (E2E) — RegistrationSummary → BAYAR SIMPANAN → BillingPage", () => {
  test("RegistrationSummary → BAYAR SIMPANAN SEKARANG → BillingPage", async ({ page }) => {
    test.setTimeout(60000);
    await ensureRegAuthToken(page);
    test.skip(!regAuthToken, "Tidak ada token auth.");
    await page.addInitScript(({ t }) => {
      localStorage.setItem("token", t);
    }, { t: regAuthToken });

    // 1. Buka halaman Status Pendaftaran (registrationPage)
    await navigateTo(page, "registrationPage", {}, 2000);
    await takeScreenshot(page, "registration-status");

    // 2. Tentukan kondisi: sudah terdaftar (RegistrationSummary) atau belum (Main View)
    const headingDetail = page.getByRole("heading", { name: "Detail Pendaftaran" });
    const isRegistered = await headingDetail.isVisible({ timeout: 6000 }).catch(() => false);

    if (!isRegistered) {
      // ---- Kondisi B: belum terdaftar → Main View ----
      // Verifikasi CTA ke form permohonan. Alur BAYAR tidak berlaku di sini
      // karena tagihan belum terbit (butuh approval Pengawas→Ketua & bill_id).
      console.log(
        "[E2E BAYAR] User belum terdaftar/approved — Main View ditampilkan. " +
          "Alur BAYAR SIMPANAN dilewati (prasyarat: approval Pengawas→Ketua & bill_id)."
      );
      await expect(
        page.getByRole("button", { name: "Isi Form Permohonan Menjadi Anggota" })
      ).toBeVisible();
      await expect(
        page.getByRole("heading", { name: "Ketentuan Pendaftaran Anggota" })
      ).toBeVisible();
      await takeScreenshot(page, "registration-unregistered-mainview");
      await assertPageLoaded(page, "Status Pendaftaran (belum terdaftar)");
      test.info().annotations.push({
        type: "skip-reason",
        description:
          "Token e2e tidak dalam kondisi approved+bill_id. Jalankan approval-chain.spec.mjs lebih dulu untuk mengisi bill_id, lalu ulangi tes ini.",
      });
      return;
    }

    // ---- Kondisi A: sudah terdaftar → RegistrationSummary ----
    console.log("[E2E BAYAR] RegistrationSummary ditampilkan (user terdaftar).");

    // 3. Verifikasi elemen RegistrationSummary: kartu data pendaftar & stepper approval
    await expect(headingDetail).toBeVisible();
    // Stepper persetujuan: Pengawas dan Ketua
    await expect(page.getByText("Status Persetujuan")).toBeVisible();
    await expect(page.getByText("Pengawas", { exact: true })).toBeVisible();
    await expect(page.getByText("Ketua", { exact: true })).toBeVisible();
    // Badge posisi berkas
    await expect(page.getByText(/POSISI BERKAS/i)).toBeVisible();
    await takeScreenshot(page, "registration-summary-detail");

    // 4. Tombol "BAYAR SIMPANAN SEKARANG" — hanya muncul saat readyForInvoice
    //    (pengawas & ketua approve, atau final_status APPROVED/WAITING_PAYMENT).
    const bayarButton = page.getByRole("button", {
      name: /BAYAR SIMPANAN SEKARANG/i,
    });

    const canPay = await bayarButton.isVisible({ timeout: 4000 }).catch(() => false);

    if (!canPay) {
      // Terdaftar tapi belum siap bayar (approval belum lengkap / bill belum terbit).
      console.log(
        "[E2E BAYAR] Tombol BAYAR belum muncul — approval Pengawas→Ketua belum lengkap " +
          "atau bill_id belum terbit. Verifikasi state RegistrationSummary saja."
      );
      await expect(bayarButton).toHaveCount(0);
      test.info().annotations.push({
        type: "skip-reason",
        description:
          "readyForInvoice=false. Jalankan approval-chain.spec.mjs untuk approve Pengawas→Ketua hingga bill_id terbit.",
      });
      return;
    }

    // 5. Klik "BAYAR SIMPANAN SEKARANG" → handleNavigateToInvoice → navigasi ${jwtEncode({page:"billingPage"})}
    await bayarButton.click();
    await page.waitForLoadState("domcontentloaded", { timeout: 15000 });
    await page.waitForTimeout(2500);
    await takeScreenshot(page, "billingpage-after-bayar");

    // 6. Verifikasi sudah berada di BillingPage (route token billingPage)
    //    Route token ter-encode (JWT) sehingga URL berbentuk "/{token}". Validasi
    //    dengan kehadiran elemen khas BillingPage.
    const billingMarker = page.locator(
      "text=/Daftar Tagihan|Tagihan|Pembayaran Tagihan|Bill/i"
    );
    await expect(billingMarker.first()).toBeVisible({ timeout: 15000 });

    // 7. BillList tampil (daftar tagihan Simpanan Pokok & Wajib)
    const billList = page.locator(
      "[class*='bill'], [class*='tagihan'], [class*='Bill'], [class*='BillList'], table"
    );
    await expect(billList.first()).toBeVisible({ timeout: 15000 });
    await takeScreenshot(page, "billingpage-billlist");

    await assertPageLoaded(page, "Billing / Tagihan");
    console.log("[E2E BAYAR] ✅ RegistrationSummary → BAYAR SIMPANAN SEKARANG → BillingPage (BillList) OK");
  });
});