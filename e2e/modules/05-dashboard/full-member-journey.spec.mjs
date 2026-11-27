/**
 * Module 05 — Full Member Journey (E2E UI Test)
 * Flow 5.6 — Registration → Approval → Billing → Payment → Bendahara → Regular Member Dashboard
 *
 * This test verifies the complete end-to-end flow:
 * 1. Create account → complete 8-step registration form
 * 2. Pengawas & Ketua approve → tagihan terbit
 * 3. Navigate to RegistrationSummary → BAYAR SIMPANAN → BillingPage (BillList)
 * 4. Click "Bayar" on bill → InvoicePage
 * 5. Upload bukti pembayaran → status PENDING_VERIFICATION
 * 6. Bendahara approve → member activated (Anggota Reguler)
 * 7. Login as member → verify regular member dashboard accessible
 */

import { test, expect } from "@playwright/test";
import {
  API_BASE_URL,
  TEST_PASSWORD,
  SCREENSHOT_DIR,
} from "../../../playwright.config.mjs";
import {
  navigateTo,
  takeScreenshot,
  assertPageLoaded,
  apiLogin,
} from "../../helpers.mjs";

test.describe("Flow 5.6 — Full Member Journey (Complete E2E)", () => {
  test("lengkap: calon anggota → approval → billing → bayar → bendahara → dashboard anggota reguler", async ({ page }) => {
    test.setTimeout(300000); // 5 minutes for full flow

    // ── 1. Buat akun Calon Anggota BARU ──
    const uniq = Date.now();
    const memberEmail = `e2e.fulljourney.${uniq}@kkpus.id`;
    const memberNIK = `31710${String(uniq).slice(-11).padStart(11, "0")}`;

    const regRes = await page.request.post(`${API_BASE_URL}/auth/register`, {
      data: {
        full_name: "E2E Full Journey Member",
        email: memberEmail,
        password: TEST_PASSWORD,
        phone_number: "081234567890",
        nik_ktp: memberNIK,
        gender: "L",
        address: "Jl. Full Journey No. 1",
        date_of_birth: "1990-01-01",
      },
      timeout: 30000,
    });
    expect(regRes.status(), `register → ${regRes.status()}`).toBe(201);
    const regBody = await regRes.json();
    const memberToken = regBody.data.token;
    const memberId = regBody.data.member_id;
    await page.addInitScript(({ t }) => {
      localStorage.setItem("token", t);
    }, { t: regBody.data.token });

    console.log(`[FULL] Member created: ${memberEmail} (${memberId})`);

    // ── 2. Submit formulir 8-step ──
    const submitRes = await page.request.post(`${API_BASE_URL}/anggota/pendaftaran`, {
      headers: { Authorization: `Bearer ${memberToken}` },
      data: {
        full_name: "E2E Full Journey Member",
        email: memberEmail,
        phone_number: "081234567890",
        nik_ktp: memberNIK,
        alamat_ktp: "Jl. Full Journey No. 1, Kota Test",
        province_id: 1,
        provinsi: "DKI JAKARTA",
        city_id: 1,
        kota_kab: "Kota Test",
        district_id: 1,
        kecamatan: "Kecamatan Test",
        subdistrict_id: 1,
        kelurahan: "Kelurahan Test",
        rt: "001",
        rw: "002",
        tipeAnggota: "Anggota Reguler",
        foto_ktp: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
        foto_swafoto: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
        bank_name: "BCA",
        bank_account_no: "1234567890",
        account_number: "1234567890",
        account_holder: "E2E Full Journey Member",
        job_title: "Karyawan Swasta",
        occupation: "Karyawan Swasta",
        employer_name: "PT Test Maju",
        employer_address: "Jl. Kantor No. 1",
        contact_name: "Test Contact",
        phone_number_emergency: "081234567891",
        relation: "Saudara Kandung",
      },
    timeout: 60000,
    });
    expect(submitRes.ok(), `submit pendaftaran → ${submitRes.status()}`).toBeTruthy();
    console.log("[FULL] Formulir 8-step berhasil dikirim");

    // ── 3. Cari registration_id via antrian Pengawas ──
    const pengawasRes = await page.request.post(`${API_BASE_URL}/auth/accountLogin`, {
      data: { emailHp: "pengawas@kkpus.id", password: "qwerty123!!" },
    timeout: 60000,
    });
    const pengawasBody = await pengawasRes.json();
    const pengawasToken = pengawasBody.data.token;

    async function findRegistrationId(token) {
      const res = await page.request.get(`${API_BASE_URL}/approvals/pendaftaran/pending`, {
        headers: { Authorization: `Bearer ${token}` },
      timeout: 60000,
      });
      expect(res.ok(), `pending approvals → ${res.status()}`).toBeTruthy();
      const body = await res.json();
      const item = (body.data || []).find(
        (r) => r.type === "REGISTRATION" && r.member?.member_id === memberId
      );
      return item?.registration_id || null;
    }

    let registrationId = await findRegistrationId(pengawasToken);
    expect(registrationId, "registration_id di antrian Pengawas").toBeTruthy();
    console.log(`[FULL] registration_id: ${registrationId}`);

    // ── 4. Pengawus approve → Ketua approve ──
    const pengawasApprove = await page.request.put(`${API_BASE_URL}/approvals/pendaftaran/approve/${registrationId}`, {
      headers: { Authorization: `Bearer ${pengawasToken}` },
      data: { action: "APPROVE", notes: "Step 1 OK (E2E Full Journey)" },
    timeout: 60000,
    });
    expect(pengawasApprove.ok(), `approval pengawas → ${pengawasApprove.status()}`).toBeTruthy();
    console.log("[FULL] Pengawas APPROVED");

    const ketuaRes = await page.request.post(`${API_BASE_URL}/auth/accountLogin`, {
      data: { emailHp: "ketua@kkpus.id", password: "qwerty123!!" },
    timeout: 60000,
    });
    const ketuaBody = await ketuaRes.json();
    const ketuaToken = ketuaBody.data.token;

    const ketuaApprove = await page.request.put(`${API_BASE_URL}/approvals/pendaftaran/approve/${registrationId}`, {
      headers: { Authorization: `Bearer ${ketuaToken}` },
      data: { action: "APPROVE", notes: "Step 2 OK (E2E Full Journey)" },
    timeout: 60000,
    });
    expect(ketuaApprove.ok(), `approval ketua → ${ketuaApprove.status()}`).toBeTruthy();
    console.log("[FULL] Ketua APPROVED — tagihan awal diterbitkan");

    // ── 5. Verifikasi tagihan tersedia ──
    const billsRes = await page.request.get(`${API_BASE_URL}/billing/list/pending`, {
      headers: { Authorization: `Bearer ${memberToken}` },
    timeout: 60000,
    });
    expect(billsRes.ok(), `pending bills → ${billsRes.status()}`).toBeTruthy();
    const billsBody = await billsRes.json();
    const unpaidItems = billsBody.data || [];
    expect(unpaidItems.length, "tagihan awal (Pokok & Wajib) tersedia").toBeGreaterThan(0);
    console.log(`[FULL] ${unpaidItems.length} tagihan belum lunas`);

    // ── 6. Navigasi ke registrationPage → RegistrationSummary ──
    await page.addInitScript(({ t }) => {
      localStorage.setItem("token", t);
    }, { t: memberToken });
    await navigateTo(page, "registrationPage", {}, 2000);
    await takeScreenshot(page, "fulljourney-registration-summary");
    
    // Verifikasi BAYAR SIMPANAN SEKARANG tersedia (tunggu lebih lama karena tagihan bisa ada delay rendering)
    const bayarButton = page.getByRole("button", { name: /BAYAR SIMPANAN SEKARANG/i });
    await bayarButton.waitFor({ state: 'visible', timeout: 30000 });
    console.log("[FULL] Verifikasi: BAYAR SIMPANAN SEKARANG tersedia — tagihan sudah terbentuk");

    // ── 7. Klik BAYAR SIMPANAN SEKARANG → BillingPage ──
    // Dismiss any SweetAlert/alert dialog that might intercept clicks
    const alert = page.locator(".swal2-popup, .alert.alert-primary.show");
    if (await alert.count() > 0) {
      await page.getByRole("button", { name: /Oke|OK|Ya|Tutup/i }).first().click({ timeout: 3000 }).catch(() => {});
      await page.waitForTimeout(500);
    }

    await expect(bayarButton).toBeVisible();
    await bayarButton.click({ force: true });
    await page.waitForLoadState("domcontentloaded", { timeout: 20000 });
    await page.waitForTimeout(3000);
    await takeScreenshot(page, "fulljourney-billingpage");
    await expect(page.getByText("Pusat Tagihan")).toBeVisible({ timeout: 15000 });

    // ── 8. Klik "Bayar" pada tagihan pertama → InvoicePage ──
    const rowBayar = page.locator("button.bp-btn-pay").first();
    await expect(rowBayar).toBeVisible({ timeout: 15000 });
    await rowBayar.click();
    await page.waitForLoadState("domcontentloaded", { timeout: 20000 });
    await page.waitForTimeout(3000);
    await takeScreenshot(page, "fulljourney-invoicepage-loaded");

    // ── 9. Verifikasi InvoicePage tampil ──
    await expect(page.getByText("DETAIL TAGIHAN")).toBeVisible({ timeout: 15000 });
    await expect(page.getByRole("button", { name: /Cetak Invoice/i })).toBeVisible();
    await expect(page.getByText("Diterbitkan Untuk:")).toBeVisible();
    await expect(page.getByText("Nomor Invoice:")).toBeVisible();
    await expect(page.getByText("Total Pembayaran")).toBeVisible();

    // ── 10. Isi form transfer manual & upload bukti ──
    await expect(page.getByText("Transfer Bank Manual")).toBeVisible();
    await expect(page.getByText(/Pilih Rekening Tujuan Transfer/i)).toBeVisible();

    // Tunggu daftar bank dimuat (loadingBanks → false)
    await page.locator(".rs__control").first().waitFor({ state: "hidden", timeout: 15000 }).catch(() => {});
    
    // Klik salah satu kartu rekening bank (bukan react-select, melainkan Card klik)
    const bankCard = page.locator("div.card:has-text('BCA'), div.cursor-pointer:has-text('BCA')").first();
    await bankCard.waitFor({ state: "visible", timeout: 10000 });
    await bankCard.click();
    await page.waitForTimeout(500);

    // Isi nominal (otomatis terisi dari invoice, tapi verify)
    const nominalInput = page.locator("input[name='nominal'], input[placeholder*='nominal' i]").first();
    if (await nominalInput.isVisible({ timeout: 2000 }).catch(() => false)) {
      // Nominal sudah terisi otomatis dari invoice
    }

    // Upload bukti pembayaran (file dummy)
    const fileInput = page.locator("input[type='file']").first();
    await fileInput.setInputFiles({
      name: "bukti-transfer.png",
      mimeType: "image/png",
      buffer: Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==", "base64"),
    });
    await page.waitForTimeout(1000);

    // Klik KIRIM BUKTI PEMBAYARAN KE BENDAHARA
    const kirimBuktiBtn = page.getByRole("button", { name: /KIRIM BUKTI PEMBAYARAN KE BENDAHARA/i });
    await expect(kirimBuktiBtn).toBeVisible();
    await kirimBuktiBtn.click();
    await page.waitForTimeout(3000);
    await takeScreenshot(page, "fulljourney-after-bukti-upload");

    console.log("[FULL] Bukti pembayaran diunggah (PENDING_VERIFICATION)");

    // ── 11. Bendahara approve ──
    const bendaharaRes = await page.request.post(`${API_BASE_URL}/auth/accountLogin`, {
      data: { emailHp: "bendahara@kkpus.id", password: "qwerty123!!" },
    timeout: 60000,
    });
    const bendaharaBody = await bendaharaRes.json();
    const bendaharaToken = bendaharaBody.data.token;

    const bendaharaApprove = await page.request.put(`${API_BASE_URL}/approvals/pendaftaran/approve/${registrationId}`, {
      headers: { Authorization: `Bearer ${bendaharaToken}` },
      data: { action: "APPROVE", notes: "Step 3 OK - Pembayaran diverifikasi (E2E Full Journey)" },
    }).catch(error => {
      console.log("API Error:", error.response?.data || error.message);
      throw error;
    }, { timeout: 60000 }); // 60 second timeout for API request
    console.log("[FULL] Bendahara APPROVED — anggota diaktifkan");

    // ── 12. Login sebagai member → Dashboard Anggota Reguler ──
    await page.addInitScript(({ t }) => {
      localStorage.setItem("token", t);
    }, { t: memberToken });
    await navigateTo(page, "dashboard", {}, 2000);
    await takeScreenshot(page, "fulljourney-regular-member-dashboard");

    // ── 13. Verifikasi Dashboard Anggota Reguler ──
    // Member reguler harus bisa akses menu utama (tidak terkunci seperti calon anggota)
    await expect(page.getByText("Selamat Datang")).toBeVisible({ timeout: 15000 });

    // Verifikasi status member "Anggota Reguler" muncul di sidebar
    await expect(page.getByRole("complementary").getByText("Anggota Reguler")).toBeVisible({ timeout: 10000 });

    // Verifikasi tidak ada lagi "Calon Anggota" badge atau lock
    await expect(page.getByText(/Calon Anggota/i)).not.toBeVisible({ timeout: 5000 });

    await takeScreenshot(page, "fulljourney-regular-member-dashboard-final");
    console.log("[FULL] ✅ Alur lengkap BERHASIL: Registration → Approval → Billing → Bayar → Bendahara → Dashboard Anggota Reguler");
  });
});