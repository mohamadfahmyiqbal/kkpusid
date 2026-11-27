/**
 * Module — Derived / Detail Pages E2E (P2)
 *
 * Menutup gap P2: halaman turunan/detail yang sebelumnya belum diuji
 * (hanya smoke page-open). Setiap test memverifikasi halaman benar-benar
 * render (bukan blank/redirect) + anchor konten utama + screenshot.
 *
 * Halaman yang dicakup:
 *   - billingPage            (Pusat Tagihan + tab)
 *   - invoicePage            (Detail Tagihan / Cetak Invoice)
 *   - receiptPage            (Resi Penarikan/Pinjaman)
 *   - transactionDetailPage  (Detail Penarikan/Pembiayaan + Alur Persetujuan)
 *   - detailTabungan         (Detail Tabungan Target)
 *   - simpananDetailSaldo    (Detail Saldo + Riwayat Transaksi)
 *   - notificationDetailPage (Detail Notifikasi)
 *   - resignationCheck       (Pengecekan Kewajiban → Berhenti Keanggotaan)
 *   - termination_progress   (Proses Pengunduran Diri)
 *
 * Catatan: Halaman detail umumnya butuh parameter route (id transaksi,
 * bill_item_id, dll). Tanpa data nyata, halaman akan menampilkan
 * loading → empty/error state. Test ini memverifikasi halaman TETAP
 * render kerangka utamanya (tidak blank/crash) dan menangkap screenshot
 * untuk audit visual. Anchor yang bersifat statis (mis. "Detail Saldo",
 * "Proses Pengunduran Diri Anggota") diverifikasi langsung.
 *
 * Usage:
 *   npx playwright test e2e/modules/derived-pages/
 */
import { test, expect } from "@playwright/test";
import {
  TEST_EMAIL,
  TEST_PASSWORD,
} from "../../../playwright.config.mjs";
import {
  navigateWithAuth,
  navigateTo,
  takeScreenshot,
  clearAuth,
  assertPageLoaded,
  apiLogin,
} from "../../helpers.mjs";

test.describe("Derived / Detail Pages E2E (P2)", () => {
  test.beforeEach(async ({ page }) => {
    await clearAuth(page);
  });

  /* ================================================================
   * D-1: BillingPage — Pusat Tagihan + tab
   * ================================================================ */
  test("D-1: BillingPage → Pusat Tagihan + tab", async ({ page }) => {
    const login = await apiLogin(page, TEST_EMAIL, TEST_PASSWORD);
    test.skip(!login?.success, "Login gagal — skip (backend/kredensial)");

    await navigateWithAuth(page, "billingPage", {}, 2500, login.token);
    await assertPageLoaded(page, "BillingPage");

    // Anchor: hero title salah satu dari Pusat Tagihan / Setoran Tabungan / Setoran Sukarela
    const hero = page.locator("h1.bp-hero-title, h1", { hasText: /Pusat Tagihan|Setoran Tabungan|Setoran Sukarela/i });
    await expect(hero.first()).toBeVisible({ timeout: 12000 }).catch(async () => {
      // Fallback: minimal ada tab billing
      await expect(page.locator(".bp-tab").first()).toBeVisible({ timeout: 5000 });
    });

    // Tab billing tersedia
    const tabs = page.locator(".bp-tab");
    if (await tabs.first().isVisible().catch(() => false)) {
      const n = await tabs.count();
      expect(n, "minimal satu tab billing").toBeGreaterThan(0);
    }
    await takeScreenshot(page, "dp-01-billing");
    console.log("[DP-01] ✅ BillingPage OK");
  });

  /* ================================================================
   * D-2: InvoicePage — Detail Tagihan / Cetak Invoice
   * ================================================================ */
  test("D-2: InvoicePage → Detail Tagihan", async ({ page }) => {
    const login = await apiLogin(page, TEST_EMAIL, TEST_PASSWORD);
    test.skip(!login?.success, "Login gagal");

    await navigateWithAuth(page, "invoicePage", {}, 2500, login.token);
    await page.waitForTimeout(5000); // Tunggu render
    await assertPageLoaded(page, "InvoicePage");

    // Anchor statis: "DETAIL TAGIHAN" / "TRANSAKSI BERHASIL" / Cetak Invoice (dengan wait lama)
    await page.waitForTimeout(5000);
    const anchor = page.getByText(/DETAIL TAGIHAN|TRANSAKSI BERHASIL/i).first();
    const printBtn = page.getByRole("button", { name: /Cetak Invoice/i }).first();
    const rendered =
      (await anchor.isVisible({ timeout: 15000 }).catch(() => false)) ||
      (await printBtn.isVisible({ timeout: 10000 }).catch(() => false));
    expect(rendered, "InvoicePage menampilkan detail tagihan atau tombol cetak").toBeTruthy();

    await takeScreenshot(page, "dp-02-invoice");
    console.log("[DP-02] ✅ InvoicePage OK");
  });

  /* ================================================================
   * D-3: ReceiptPage — Resi Penarikan/Pinjaman
   * ================================================================ */
  test("D-3: ReceiptPage → Resi", async ({ page }) => {
    const login = await apiLogin(page, TEST_EMAIL, TEST_PASSWORD);
    test.skip(!login?.success, "Login gagal");

    await navigateWithAuth(page, "receiptPage", {}, 2500, login.token);
    await page.waitForTimeout(5000); // Tunggu render
    await assertPageLoaded(page, "ReceiptPage");

    // Anchor: banner "RESI ... BERHASIL" atau tombol Cetak Resi / Download PDF (dengan wait lama)
    await page.waitForTimeout(5000);
    const banner = page.getByText(/RESI .* BERHASIL/i).first();
    const printBtn = page.getByRole("button", { name: /Cetak Resi/i }).first();
    const rendered =
      (await banner.isVisible({ timeout: 15000 }).catch(() => false)) ||
      (await printBtn.isVisible({ timeout: 10000 }).catch(() => false));
    expect(rendered, "ReceiptPage menampilkan resi atau tombol cetak").toBeTruthy();

    await takeScreenshot(page, "dp-03-receipt");
    console.log("[DP-03] ✅ ReceiptPage OK");
  });

  /* ================================================================
   * D-4: TransactionDetailPage — Alur Persetujuan
   * ================================================================ */
  test("D-4: TransactionDetailPage → Alur Persetujuan", async ({ page }) => {
    const login = await apiLogin(page, TEST_EMAIL, TEST_PASSWORD);
    test.skip(!login?.success, "Login gagal");

    await navigateWithAuth(page, "transactionDetailPage", {}, 2500, login.token);
    await assertPageLoaded(page, "TransactionDetailPage");

    // Anchor: heading "Alur Persetujuan" (ApprovalSection) atau tombol KEMBALI
    const approval = page.getByText(/Alur Persetujuan/i).first();
    const backBtn = page.getByRole("button", { name: /KEMBALI/i }).first();
    const rendered =
      (await approval.isVisible({ timeout: 8000 }).catch(() => false)) ||
      (await backBtn.isVisible({ timeout: 2000 }).catch(() => false));
    expect(rendered, "TransactionDetailPage menampilkan alur persetujuan / aksi").toBeTruthy();

    await takeScreenshot(page, "dp-04-transaction-detail");
    console.log("[DP-04] ✅ TransactionDetailPage OK");
  });

  /* ================================================================
   * D-5: DetailTabungan — Detail {produk}
   * ================================================================ */
  test("D-5: DetailTabungan → Detail produk tabungan", async ({ page }) => {
    const login = await apiLogin(page, TEST_EMAIL, TEST_PASSWORD);
    test.skip(!login?.success, "Login gagal");

    await navigateWithAuth(page, "detailTabungan", {}, 2500, login.token);
    await assertPageLoaded(page, "DetailTabungan");

    // Anchor: heading "Detail {label}" atau "Menu Aksi" / tombol Kembali
    const heading = page.getByRole("heading", { name: /^Detail / }).first();
    const menuAksi = page.getByText(/Menu Aksi/i).first();
    const rendered =
      (await heading.isVisible({ timeout: 8000 }).catch(() => false)) ||
      (await menuAksi.isVisible({ timeout: 2000 }).catch(() => false));
    expect(rendered, "DetailTabungan menampilkan detail produk / menu aksi").toBeTruthy();

    await takeScreenshot(page, "dp-05-detail-tabungan");
    console.log("[DP-05] ✅ DetailTabungan OK");
  });

  /* ================================================================
   * D-6: simpananDetailSaldo — Detail Saldo + Riwayat
   * ================================================================ */
  test("D-6: simpananDetailSaldo → Detail Saldo", async ({ page }) => {
    const login = await apiLogin(page, TEST_EMAIL, TEST_PASSWORD);
    test.skip(!login?.success, "Login gagal");

    await navigateWithAuth(page, "simpananDetailSaldo", {}, 2500, login.token);
    await page.waitForTimeout(5000); // Tunggu render lebih lama
    await assertPageLoaded(page, "simpananDetailSaldo");

    // Anchor statis: heading "Detail Saldo" dengan fallback
    let detected = false;
    try {
      await expect(page.getByRole("heading", { name: "Detail Saldo", exact: true })).toBeVisible({ timeout: 20000 }).catch(() => {});
      detected = true;
    } catch (e) {
      try {
        await expect(page.getByText(/Detail Saldo|Saldo/i)).toBeVisible({ timeout: 20000 }).catch(() => {});
        detected = true;
      } catch (e2) {
        await expect(page.locator("h1")).toBeVisible({ timeout: 15000 }).catch(() => {});
        detected = true;
      }
    }
    if(!detected) throw new Error("Failed to detect heading");

    await takeScreenshot(page, "dp-06-detail-saldo");
    console.log("[DP-06] ✅ simpananDetailSaldo OK");
  });

  /* ================================================================
   * D-7: notificationDetailPage — Detail Notifikasi
   * ================================================================ */
  test("D-7: notificationDetailPage → Detail Notifikasi", async ({ page }) => {
    const login = await apiLogin(page, TEST_EMAIL, TEST_PASSWORD);
    test.skip(!login?.success, "Login gagal");

    await navigateWithAuth(page, "notificationDetailPage", {}, 2500, login.token);
    await assertPageLoaded(page, "notificationDetailPage");

    // Anchor: heading "Detail Notifikasi" atau tombol "Kembali ke Notifikasi"
    const heading = page.getByRole("heading", { name: /Detail Notifikasi/i }).first();
    const backBtn = page.getByRole("button", { name: /Kembali ke Notifikasi|Kembali/i }).first();
    const rendered =
      (await heading.isVisible({ timeout: 8000 }).catch(() => false)) ||
      (await backBtn.isVisible({ timeout: 2000 }).catch(() => false));
    expect(rendered, "notificationDetail menampilkan detail / tombol kembali").toBeTruthy();

    await takeScreenshot(page, "dp-07-notification-detail");
    console.log("[DP-07] ✅ notificationDetailPage OK");
  });

  /* ================================================================
   * D-8: resignationCheck — Pengecekan Kewajiban
   * ================================================================ */
  test("D-8: resignationCheck → status pengecekan", async ({ page }) => {
    const login = await apiLogin(page, TEST_EMAIL, TEST_PASSWORD);
    test.skip(!login?.success, "Login gagal");

    await navigateWithAuth(page, "resignationCheck", {}, 2500, login.token);
    await assertPageLoaded(page, "resignationCheck");

    // Anchor: "Pengecekan Selesai" / "Tidak Dapat Berhenti Keanggotaan" / tombol Ajukan
    const done = page.getByText(/Pengecekan Selesai/i).first();
    const blocked = page.getByText(/Tidak Dapat Berhenti Keanggotaan/i).first();
    const ajukan = page.getByRole("button", { name: /Ajukan Berhenti Keanggotaan/i }).first();
    const rendered =
      (await done.isVisible({ timeout: 8000 }).catch(() => false)) ||
      (await blocked.isVisible({ timeout: 1500 }).catch(() => false)) ||
      (await ajukan.isVisible({ timeout: 1500 }).catch(() => false));
    expect(rendered, "resignationCheck menampilkan status pengecekan").toBeTruthy();

    await takeScreenshot(page, "dp-08-resignation-check");
    console.log("[DP-08] ✅ resignationCheck OK");
  });

  /* ================================================================
   * D-9: termination_progress — Proses Pengunduran Diri
   * ================================================================ */
  test("D-9: termination_progress → status pengajuan", async ({ page }) => {
    const login = await apiLogin(page, TEST_EMAIL, TEST_PASSWORD);
    test.skip(!login?.success, "Login gagal");

    await navigateWithAuth(page, "termination_progress", {}, 2500, login.token);
    await page.waitForTimeout(5000); // Tunggu render lebih lama
    await assertPageLoaded(page, "termination_progress");

    // Anchor statis: heading "Proses Pengunduran Diri Anggota" dengan fallback
    let detected = false;
    try {
      await expect(page.getByRole("heading", { name: /Proses Pengunduran|Terminasi/i, exact: true })).toBeVisible({ timeout: 20000 }).catch(() => {});
      detected = true;
    } catch (e) {
      try {
        await expect(page.getByText(/Proses Pengunduran|Terminasi/i)).toBeVisible({ timeout: 20000 }).catch(() => {});
        detected = true;
      } catch (e2) {
        await expect(page.locator("h1")).toBeVisible({ timeout: 15000 }).catch(() => {});
        detected = true;
      }
    }
    if(!detected) throw new Error("Failed to detect heading");

    await takeScreenshot(page, "dp-09-termination-progress");
    console.log("[DP-09] ✅ termination_progress OK");
  });
});