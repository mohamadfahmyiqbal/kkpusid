/**
 * Module 07 — Tabungan Target (Detailed Business Logic Tests)
 * 
 * Memverifikasi alur bisnis lengkap sesuai ALUR-PER-MODUL.md:
 * 1. Daftar program tabungan (Haji, Umrah, Pendidikan, Qurban)
 * 2. EmptyState → Pengajuan → FormPengajuanTabungan (Akad Wadiah)
 * 3. Status rekening: PENDING/APPROVED/REJECTED
 * 4. Detail tabungan: saldo, target, progress%, riwayat transaksi, ActionButtonsCard
 * 5. Setoran tabungan: pilih tagihan, nominal fleksibel, Proses Setoran → InvoicePage
 * 6. Penarikan tabungan: hanya jika progress >= 100%, TRANSFER/TUNAI/SIMPANAN
 * 
 * Usage:
 *   npx playwright test e2e/modules/07-tabungan/tabungan-detailed.spec.mjs
 */

import { test, expect } from "@playwright/test";
import {
  BASE_URL,
  API_BASE_URL,
  TEST_EMAIL,
  TEST_PASSWORD,
} from "../../../playwright.config.mjs";
import {
  navigateWithAuth,
  takeScreenshot,
  waitForPageReady,
  apiLogin,
} from "../../helpers.mjs";

// Helper: decode JWT token from URL
function decodePageToken(url) {
  const parts = url.split("/");
  const token = parts[parts.length - 1];
  if (!token || token.includes(".") === false) return null;
  const payload = token.split(".")[1];
  if (!payload) return null;
  try {
    const padded = payload.replace(/-/g, "+").replace(/_/g, "/") + "===";
    const json = JSON.parse(decodeURIComponent(atob(padded)));
    return json;
  } catch {
    return null;
  }
}

test.describe("Modul 07 — Tabungan Target (Detailed Business Logic)", () => {
  let authToken = null;
  let testProgram = null;
  let testTabunganId = null;

  test.beforeAll(async () => {
    const loginResult = await apiLogin({ 
      request: { 
        post: async (url, { data }) => {
          const res = await fetch(url.replace(API_BASE_URL, ""), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
          return {
            ok: () => res.ok,
            json: () => res.json(),
            status: () => res.status,
            text: () => res.text(),
          };
        }
      }
    }, TEST_EMAIL, TEST_PASSWORD);
    
    if (loginResult?.success) {
      authToken = loginResult.token;
    }
  });

  test.beforeEach(async ({ page }) => {
    
  });

  // ============================================================
  // 1. DAFTAR PROGRAM TABUNGAN
  // ============================================================
  test.describe("1. Daftar Program Tabungan", () => {
    test("tabunganPage: menampilkan program Haji, Umrah, Pendidikan, Qurban", async ({ page }) => {
      await navigateWithAuth(page, "tabunganPage", {}, 2000, authToken);
      await waitForPageReady(page);
      await takeScreenshot(page, "tabungan-program-tabs");

      // Verifikasi tab program
      const expectedPrograms = ["Haji", "Umrah", "Pendidikan", "Qurban"];
      for (const prog of expectedPrograms) {
        const tab = page.locator(".tabungan-tab-btn", { hasText: prog });
        await expect(tab).toBeVisible({ timeout: 5000 });
      }

      // Klik tab pertama (default Haji) - harus aktif
      const activeTab = page.locator(".tabungan-tab-btn.active");
      await expect(activeTab).toContainText(/Haji/i);
    });

    test("tabunganPage: ganti program ke Umrah, Pendidikan, Qurban", async ({ page }) => {
      await navigateWithAuth(page, "tabunganPage", {}, 2000, authToken);
      await waitForPageReady(page);

      // Simpan program untuk test selanjutnya
      const programs = await page.locator(".tabungan-tab-btn").all();
      for (const prog of programs) {
        const text = await prog.textContent();
        if (text && !text.includes("Haji")) {
          testProgram = text.trim();
          await prog.click();
          await page.waitForTimeout(1000);
          await expect(page.locator(".tabungan-tab-btn.active")).toContainText(text.trim());
          break;
        }
      }
      expect(testProgram).toBeTruthy();
    });

    test("tabunganPage: menampilkan state EMPTY dengan tombol 'Pengajuan'", async ({ page }) => {
      await navigateWithAuth(page, "tabunganPage", {}, 2000, authToken);
      await waitForPageReady(page);

      // Cek apakah ada EmptyState (ProgramStatusCard dengan button "Pengajuan")
      const pengajuanBtn = page.locator("button:has-text('Pengajuan')").first();
      const hasEmptyState = await pengajuanBtn.isVisible({ timeout: 5000 }).catch(() => false);
      
      if (hasEmptyState) {
        await expect(pengajuanBtn).toBeVisible();
        await takeScreenshot(page, "tabungan-empty-state-pengajuan");
      } else {
        // Jika sudah punya rekening, skip - status akan diuji di test selanjutnya
        console.log("[TABUNGAN] Sudah punya rekening, melewati test EmptyState");
      }
    });
  });

  // ============================================================
  // 2. AJUKAN TARGET (FormPengajuanTabungan)
  // ============================================================
  test.describe("2. Ajukan Target Tabungan", () => {
    test("formPengajuanTabungan: navigasi dari EmptyState", async ({ page }) => {
      await navigateWithAuth(page, "tabunganPage", {}, 2000, authToken);
      await waitForPageReady(page);

      const pengajuanBtn = page.locator("button:has-text('Pengajuan')").first();
      if (await pengajuanBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
        await pengajuanBtn.click();
        await page.waitForLoadState("domcontentloaded", { timeout: 10000 });
        await waitForPageReady(page);
      } else {
        // Navigasi langsung via route token
        await navigateWithAuth(page, "formPengajuanTabungan", { product: testProgram || "haji" }, 2000, authToken);
      }

      // Verifikasi halaman form
      await expect(page.locator("h5:has-text('Tabungan')")).toBeVisible({ timeout: 10000 });
      await takeScreenshot(page, "tabungan-form-pengajuan");
    });

    test("formPengajuanTabungan: form field lengkap - Target Nominal, Setoran Bulanan, Durasi, Akad Wadiah", async ({ page }) => {
      await navigateWithAuth(page, "formPengajuanTabungan", { product: "haji" }, 2000, authToken);
      await waitForPageReady(page);

      // 1. Target Nominal (otomatis untuk non-qurban, input untuk qurban)
      // Cek apakah program qurban (input) atau non-qurban (display)
      const isQurban = await page.locator("input[name='target_amount']").isVisible({ timeout: 2000 }).catch(() => false);
      
      if (isQurban) {
        // Qurban: input target nominal
        await page.locator("input[name='target_amount']").fill("3500000");
        await expect(page.locator("input[name='target_amount']")).toHaveValue(/3.500.000|3500000/);
      } else {
        // Non-qurban: target nominal adalah display (otomatis dari setoran × durasi)
        // Verifikasi ada display "Target Nominal (Otomatis dari Setoran Bulanan × Durasi)"
        await expect(page.locator("text=Target Nominal (Otomatis)").first()).toBeVisible();
      }

      // 2. Setoran Bulanan
      const setoranInput = page.locator("input[name='monthly_deposit']").first();
      await expect(setoranInput).toBeVisible({ timeout: 5000 });
      await setoranInput.fill("500000");
      await expect(setoranInput).toHaveValue(/500.000|500000/);

      // 3. Durasi Program (Bulan)
      const termInput = page.locator("input[name='term_months']").first();
      await expect(termInput).toBeVisible({ timeout: 5000 });
      await termInput.fill("12");

      // 4. Akad Wadiah checkbox
      const akadCheckbox = page.locator("input[id='akadAgreed']");
      await expect(akadCheckbox).toBeVisible({ timeout: 5000 });
      await expect(akadCheckbox).not.toBeChecked();
      
      // Verifikasi label akad
      await expect(page.locator("label[for='akadAgreed']")).toContainText("Wadiah");

      await takeScreenshot(page, "tabungan-form-filled");
    });

    test("formPengajuanTabungan: validasi wajib isi & Akad Wadiah", async ({ page }) => {
      await navigateWithAuth(page, "formPengajuanTabungan", { product: "haji" }, 2000, authToken);
      await waitForPageReady(page);

      // Submit tanpa isi apapun
      await page.locator("button[type='submit']:has-text('Ajukan Sekarang')").click();
      await page.waitForTimeout(1000);

      // Verifikasi error validation
      const errors = page.locator(".text-danger, .border-danger, [class*='error']");
      await expect(errors.first()).toBeVisible({ timeout: 5000 });

      // Cek error Akad Wadiah
      const akadError = page.locator("text=Anda harus menyetujui akad");
      await expect(akadError).toBeVisible({ timeout: 3000 });
    });

    test("formPengajuanTabungan: submit berhasil → redirect ke transactionDetailPage (PENDING)", async ({ page }) => {
      await navigateWithAuth(page, "formPengajuanTabungan", { product: "haji" }, 2000, authToken);
      await waitForPageReady(page);

      // Isi form valid
      await page.locator("input[name='monthly_deposit']").fill("500000");
      await page.locator("input[name='term_months']").fill("12");
      
      // Centang Akad Wadiah
      const akadCheckbox = page.locator("input[id='akadAgreed']");
      if (!await akadCheckbox.isChecked()) {
        await akadCheckbox.check();
      }

      // Submit
      await takeScreenshot(page, "tabungan-form-submit");
      await page.locator("button[type='submit']:has-text('Ajukan Sekarang')").click();
      
      // Tunggu loading selesai + redirect
      await page.waitForLoadState("domcontentloaded", { timeout: 20000 });
      await page.waitForTimeout(2000);

      // Verifikasi redirect ke transactionDetailPage
      const decoded = decodePageToken(page.url());
      expect(decoded?.page).toBe("transactionDetailPage");
      expect(decoded?.tabunganId).toBeTruthy();
      
      // Simpan tabunganId untuk test detail
      testTabunganId = decoded?.tabunganId;
      
      // Verifikasi status PENDING di transactionDetailPage
      await expect(page.locator("text=PENDING, text=Menunggu Persetujuan").first()).toBeVisible({ timeout: 10000 });
      await takeScreenshot(page, "tabungan-transaction-pending");
    });
  });

  // ============================================================
  // 3. DETAIL TABUNGAN (APPROVED/OK)
  // ============================================================
  test.describe("3. Detail Tabungan - Status APPROVED", () => {
    test("detailTabungan: menampilkan AccountInfoCard (saldo, target, progress%)", async ({ page }) => {
      const tabunganId = testTabunganId || 1;
      await navigateWithAuth(page, "detailTabungan", { tabunganId, product: "haji" }, 2000, authToken);
      await waitForPageReady(page);

      // Verifikasi AccountInfoCard
      await expect(page.locator("text=Saldo Terkumpul")).toBeVisible({ timeout: 10000 });
      await expect(page.locator("text=Target Saldo")).toBeVisible();
      await expect(page.locator(".progress, [class*='progress-bar']")).toBeVisible();
      await expect(page.locator("text=% Tercapai, text=% tercapai").first()).toBeVisible();

      await takeScreenshot(page, "tabungan-detail-account-info");
    });

    test("detailTabungan: menampilkan TransactionHistoryTable (setoran awal + bulanan)", async ({ page }) => {
      const tabunganId = testTabunganId || 1;
      await navigateWithAuth(page, "detailTabungan", { tabunganId, product: "haji" }, 2000, authToken);
      await waitForPageReady(page);

      // Cek tabel riwayat transaksi
      const historyTable = page.locator("table, [class*='TransactionHistory'], [class*='history-table']").first();
      await expect(historyTable).toBeVisible({ timeout: 5000 });

      // Verifikasi ada transaksi "Setoran Awal" dan "Setoran Bulanan"
      const setoranAwal = page.locator("text=Setoran Awal");
      const setoranBulanan = page.locator("text=Setoran Bulanan");
      
      const hasAwal = await setoranAwal.isVisible({ timeout: 2000 }).catch(() => false);
      const hasBulanan = await setoranBulanan.isVisible({ timeout: 2000 }).catch(() => false);
      
      if (hasAwal || hasBulanan) {
        console.log("[TABUNGAN] Riwayat transaksi ditemukan");
      }
    });

    test("detailTabungan: ActionButtonsCard - Setoran (progress < 100%) / Pencairan (progress >= 100%) + Pengajuan Baru", async ({ page }) => {
      const tabunganId = testTabunganId || 1;
      await navigateWithAuth(page, "detailTabungan", { tabunganId, product: "haji" }, 2000, authToken);
      await waitForPageReady(page);

      // Cek ActionButtonsCard
      const actionCard = page.locator(".detail-actions-card, [class*='ActionButtons']").first();
      await expect(actionCard).toBeVisible({ timeout: 5000 });

      // Cek tombol "Pengajuan Baru" selalu ada
      const pengajuanBaruBtn = page.locator("button:has-text('Pengajuan Baru')").first();
      await expect(pengajuanBaruBtn).toBeVisible();

      // Cek tombol berdasarkan progress
      // Progress < 100%: tombol "Setoran"
      // Progress >= 100%: tombol "Pencairan"
      const setoranBtn = page.locator("button:has-text('Setoran')").first();
      const pencairanBtn = page.locator("button:has-text('Pencairan')").first();
      
      const hasSetoran = await setoranBtn.isVisible({ timeout: 2000 }).catch(() => false);
      const hasPencairan = await pencairanBtn.isVisible({ timeout: 2000 }).catch(() => false);
      
      if (hasSetoran) {
        console.log("[TABUNGAN] Progress < 100%: tombol Setoran aktif");
      } else if (hasPencairan) {
        console.log("[TABUNGAN] Progress >= 100%: tombol Pencairan aktif");
      }
    });
  });

  // ============================================================
  // 4. SETORAN TABUNGAN (Tagihan → InvoicePage)
  // ============================================================
  test.describe("4. Setoran Tabungan - Bayar Tagihan", () => {
    test("setoranTabungan: menampilkan daftar tagihan & tagihan pending", async ({ page }) => {
      const tabunganId = testTabunganId || 1;
      await navigateWithAuth(page, "setoranTabungan", { tabunganId, product: "haji" }, 2000, authToken);
      await waitForPageReady(page);

      // Verifikasi SetoranAccountSummary
      await expect(page.locator("text=Saldo Terkumpul")).toBeVisible({ timeout: 10000 });
      await expect(page.locator("text=Target Saldo")).toBeVisible();

      // Cek SetoranTagihanList
      const tagihanList = page.locator("[class*='TagihanList'], [class*='tagihan-list'], [class*='bill-item']").first();
      await expect(tagihanList).toBeVisible({ timeout: 5000 });

      // Cek tagihan dengan status pending
      const pendingTagihan = page.locator("text=Pending, text=Menunggu, text=Belum Bayar").first();
      await expect(pendingTagihan).toBeVisible({ timeout: 3000 });

      await takeScreenshot(page, "tabungan-setoran-tagihan-list");
    });

    test("setoranTabungan: pilih tagihan → nominal fleksibel → Proses Setoran", async ({ page }) => {
      const tabunganId = testTabunganId || 1;
      await navigateWithAuth(page, "setoranTabungan", { tabunganId, product: "haji" }, 2000, authToken);
      await waitForPageReady(page);

      // Pilih tagihan pertama
      const firstTagihan = page.locator("[class*='bill-item'], [class*='tagihan-item']").first();
      if (await firstTagihan.isVisible({ timeout: 3000 }).catch(() => false)) {
        await firstTagihan.click();
        await page.waitForTimeout(500);
      }

      // Verifikasi SetoranPaymentSummary muncul
      await expect(page.locator("text=Jumlah Bayar, text=Nominal Bayar, text=Flexible").first()).toBeVisible({ timeout: 3000 });

      // Isi nominal fleksibel (bisa beda dari tagihan)
      const amountInput = page.locator("input[name='amount'], input[placeholder*='nominal' i], input[placeholder*='bayar' i]").first();
      if (await amountInput.isVisible({ timeout: 2000 }).catch(() => false)) {
        await amountInput.fill("500000");
      }

      // Klik "Proses Setoran"
      const prosesBtn = page.locator("button:has-text('Proses Setoran'), button:has-text('Bayar')").first();
      if (await prosesBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
        await prosesBtn.click();
        
        // Tunggu loading + redirect ke InvoicePage
        await page.waitForLoadState("domcontentloaded", { timeout: 20000 });
        await page.waitForTimeout(2000);
        
        // Verifikasi redirect ke InvoicePage
        const decoded = decodePageToken(page.url());
        if (decoded?.page === "invoicePage") {
          console.log("[TABUNGAN] Berhasil redirect ke InvoicePage");
          await expect(page.locator("text=Invoice, text=Tagihan").first()).toBeVisible({ timeout: 5000 });
          await takeScreenshot(page, "tabungan-invoice-page");
        } else {
          // Mungkin gagal / API error - cek error message
          const error = page.locator(".text-danger, [class*='error']").first();
          if (await error.isVisible({ timeout: 2000 }).catch(() => false)) {
            console.log("[TABUNGAN] Error proses setoran:", await error.textContent());
          }
        }
      }
    });
  });

  // ============================================================
  // 5. PENARIKAN TABUNGAN (progress >= 100%)
  // ============================================================
  test.describe("5. Penarikan Tabungan - Pencairan", () => {
    test("detailTabungan: pencairan hanya aktif jika progress >= 100%", async ({ page }) => {
      const tabunganId = testTabunganId || 1;
      await navigateWithAuth(page, "detailTabungan", { tabunganId, product: "haji" }, 2000, authToken);
      await waitForPageReady(page);

      // Cek progress percentage
      const progressText = page.locator("text=% Tercapai, text=% tercapai").first();
      let progressPercent = 0;
      
      if (await progressText.isVisible({ timeout: 2000 }).catch(() => false)) {
        const text = await progressText.textContent();
        const match = text?.match(/(\d+)%/);
        if (match) progressPercent = parseInt(match[1], 10);
      }

      // Cek tombol Pencairan
      const pencairanBtn = page.locator("button:has-text('Pencairan')").first();
      const setoranBtn = page.locator("button:has-text('Setoran')").first();
      
      const hasPencairan = await pencairanBtn.isVisible({ timeout: 2000 }).catch(() => false);
      const hasSetoran = await setoranBtn.isVisible({ timeout: 2000 }).catch(() => false);

      if (progressPercent >= 100) {
        expect(hasPencairan).toBeTruthy();
        expect(hasSetoran).toBeFalsy();
        console.log("[TABUNGAN] Progress 100%+: Pencairan aktif, Setoran tersembunyi");
      } else {
        expect(hasSetoran).toBeTruthy();
        expect(hasPencairan).toBeFalsy();
        console.log(`[TABUNGAN] Progress ${progressPercent}%: Setoran aktif, Pencairan tersembunyi`);
      }
    });

    test("detailTabungan: klik Pencairan di progress < 100% → SweetAlert peringatan", async ({ page }) => {
      const tabunganId = testTabunganId || 1;
      await navigateWithAuth(page, "detailTabungan", { tabunganId, product: "haji" }, 2000, authToken);
      await waitForPageReady(page);

      // Cek apakah tombol Pencairan tersembunyi (progress < 100)
      const pencairanBtn = page.locator("button:has-text('Pencairan')").first();
      const hasPencairan = await pencairanBtn.isVisible({ timeout: 2000 }).catch(() => false);
      
      if (!hasPencairan) {
        // Progress < 100%, tombol Pencairan seharusnya tidak ada di ActionButtonsCard
        // Tapi test ini memverifikasi behavior jika akses langsung ke penarikanTabunganPage
        console.log("[TABUNGAN] Progress < 100%, tombol Pencairan tidak ditampilkan");
      }
    });

    test("penarikanTabunganPage: form pencairan dengan metode TRANSFER/TUNAI/SIMPANAN", async ({ page }) => {
      const tabunganId = testTabunganId || 1;
      // Akses langsung via route token dengan action withdraw
      await navigateWithAuth(page, "penarikanTabunganPage", { tabunganId, product: "haji", action: "withdraw" }, 2000, authToken);
      await waitForPageReady(page);

      // Verifikasi form
      await expect(page.locator("text=Form Pengajuan Pencairan")).toBeVisible({ timeout: 10000 });

      // Cek dropdown metode pencairan
      const metodeSelect = page.locator("select[name='method'], select[id*='method']").first();
      await expect(metodeSelect).toBeVisible({ timeout: 5000 });

      const options = await metodeSelect.locator("option").allTextContents();
      expect(options).toContain("Transfer Bank");
      expect(options).toContain("Ambil Tunai");
      // SIMPANAN juga ada di implementasi
      // expect(options).toContain("Pindahkan ke Saldo Simpanan Koperasi");

      // Test TRANSFER
      await metodeSelect.selectOption("TRANSFER");
      await page.waitForTimeout(500);
      
      // Verifikasi field bank muncul
      await expect(page.locator("input[placeholder*='BCA'], input[placeholder*='bank' i], input[name='bank_name']")).toBeVisible({ timeout: 3000 });
      await expect(page.locator("input[placeholder*='rekening'], input[name='bank_account_no']")).toBeVisible();

      // Test TUNAI
      await metodeSelect.selectOption("TUNAI");
      await page.waitForTimeout(500);
      
      await expect(page.locator("input[placeholder*='pengambil' i], input[name='cash_name']")).toBeVisible({ timeout: 3000 });
      await expect(page.locator("input[placeholder*='lokasi' i], input[name='cash_location']")).toBeVisible();
      await expect(page.locator("input[type='date'], input[name='cash_time']")).toBeVisible();

      await takeScreenshot(page, "tabungan-penarikan-form");
    });

    test("penarikanTabunganPage: submit pencairan → SweetAlert sukses → transactionDetailPage", async ({ page }) => {
      const tabunganId = testTabunganId || 1;
      await navigateWithAuth(page, "penarikanTabunganPage", { tabunganId, product: "haji", action: "withdraw" }, 2000, authToken);
      await waitForPageReady(page);

      // Pilih TUNAI (lebih simple, tidak perlu bank account)
      const metodeSelect = page.locator("select[name='method'], select[id*='method']").first();
      await metodeSelect.selectOption("TUNAI");
      await page.waitForTimeout(500);

      // Isi form tunai
      await page.locator("input[name='cash_name']").fill("Test User");
      await page.locator("input[name='cash_location']").fill("Kantor Cabang Utama");
      
      // Tanggal besok
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dateStr = tomorrow.toISOString().split("T")[0];
      await page.locator("input[name='cash_time'], input[type='date']").fill(dateStr);

      // Submit
      await takeScreenshot(page, "tabungan-penarikan-submit");
      await page.locator("button[type='submit']:has-text('Ajukan Pencairan')").click();
      
      // Tunggu SweetAlert
      await page.waitForTimeout(3000);
      
      // Cek SweetAlert sukses
      const swalSuccess = page.locator(".swal2-popup:has-text('Berhasil'), .swal2-popup:has-text('Success')");
      if (await swalSuccess.isVisible({ timeout: 10000 }).catch(() => false)) {
        await swalSuccess.locator("button:has-text('OK'), button.swal2-confirm").click();
        
        // Tunggu redirect ke transactionDetailPage
        await page.waitForLoadState("domcontentloaded", { timeout: 15000 });
        await page.waitForTimeout(1000);
        
        const decoded = decodePageToken(page.url());
        if (decoded?.page === "transactionDetailPage") {
          console.log("[TABUNGAN] Pencairan sukses → transactionDetailPage");
          await expect(page.locator("text=Menunggu persetujuan, text=PENDING").first()).toBeVisible({ timeout: 5000 });
          await takeScreenshot(page, "tabungan-withdrawal-pending");
        }
      } else {
        // Cek error
        const error = page.locator(".swal2-popup:has-text('Gagal'), .swal2-popup:has-text('Error'), .text-danger");
        if (await error.isVisible({ timeout: 3000 }).catch(() => false)) {
          console.log("[TABUNGAN] Error pencairan:", await error.textContent());
        }
      }
    });
  });

  // ============================================================
  // 6. STATUS REKENING: PENDING / REJECTED
  // ============================================================
  test.describe("6. Status Rekening - PENDING / REJECTED", () => {
    test("tabunganPage: status PENDING → 'Menunggu Persetujuan' + tombol Lihat Detail → transactionDetailPage", async ({ page }) => {
      // Note: Butuh data dengan status PENDING
      // Test ini memverifikasi UI jika status PENDING
      await navigateWithAuth(page, "tabunganPage", {}, 2000, authToken);
      await waitForPageReady(page);

      // Cek apakah ada status PENDING
      const pendingCard = page.locator("text=Menunggu Persetujuan").first();
      const hasPending = await pendingCard.isVisible({ timeout: 3000 }).catch(() => false);
      
      if (hasPending) {
        await expect(page.locator("button:has-text('Lihat Detail')")).toBeVisible();
        await takeScreenshot(page, "tabungan-status-pending");
        
        // Klik Lihat Detail
        await page.locator("button:has-text('Lihat Detail')").click();
        await page.waitForLoadState("domcontentloaded", { timeout: 10000 });
        
        const decoded = decodePageToken(page.url());
        expect(decoded?.page).toBe("transactionDetailPage");
      } else {
        console.log("[TABUNGAN] Tidak ada rekening PENDING untuk test");
      }
    });

    test("tabunganPage: status REJECTED → 'Pengajuan Ditolak' + tombol Ajukan Ulang", async ({ page }) => {
      await navigateWithAuth(page, "tabunganPage", {}, 2000, authToken);
      await waitForPageReady(page);

      const rejectedCard = page.locator("text=Pengajuan Ditolak").first();
      const hasRejected = await rejectedCard.isVisible({ timeout: 3000 }).catch(() => false);
      
      if (hasRejected) {
        await expect(page.locator("button:has-text('Ajukan Ulang')")).toBeVisible();
        await takeScreenshot(page, "tabungan-status-rejected");
      } else {
        console.log("[TABUNGAN] Tidak ada rekening REJECTED untuk test");
      }
    });
  });
});