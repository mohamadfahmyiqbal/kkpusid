/**
 * Module 05 — Tahap 3 (E2E UI): RegistrationSummary → "BAYAR SIMPANAN SEKARANG" → BillingPage
 *
 * Alur nyata end-to-end melalui UI (tidak hanya API):
 *
 *   1. Buat akun Calon Anggota BARU (POST /auth/register)
 *   2. Submit formulir 8-step (POST /anggota/pendaftaran) → final_status=PENDING
 *   3. Pengawus approve → antrian ke Ketua
 *   4. Ketua approve → createInitialBills (Simpanan Pokok & Wajib) → bill_id terbit
 *   5. Login sebagai anggota via API → UI token
 *   6. Navigasi ke registrationPage (Status Pendaftaran) via UI
 *   7. RegistrationSummary menampilkan data + stepper approval
 *   8. Klik tombol "BAYAR SIMPANAN SEKARANG" (handleNavigateToInvoice)
 *   9. Navigasi via JWT token ke BillingPage (BillList) → daftar tagihan muncul
 *   10. Screenshot setiap tahap
 *
 * Catatan: Test bersifat stateful & destruktif terhadap akun BARU yang dibuat saat run
 * (bukan akun e2e.test). Email/NIK dibuat unik per run agar dapat diulang.
 *
 * Usage:
 *   npx playwright test e2e/modules/05-dashboard/billing-flow.spec.mjs
 */

import { test, expect } from "@playwright/test";
import { API_BASE_URL } from "../../../playwright.config.mjs";
import {
  BASE_URL,
  TEST_PASSWORD,
  SCREENSHOT_DIR,
} from "../../../playwright.config.mjs";
import {
  navigateTo,
  takeScreenshot,
  clearAuth,
  assertPageLoaded,
  apiLogin,
  navigateWithAuth,
} from "../../helpers.mjs";

// ── Akun peran approval (maker-checker) ──
const ROLE_ACCOUNTS = {
  pengawas: { email: "pengawas@kkpus.id", password: "qwerty123!!" },
  ketua: { email: "ketua@kkpus.id", password: "qwerty123!!" },
  bendahara: { email: "bendahara@kkpus.id", password: "qwerty123!!" },
};

// PNG 1x1 valid (dipakai untuk foto KTP/swafoto base64 & bukti transfer).
const PNG_1x1_BASE64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
const DATA_URI_PNG = `data:image/png;base64,${PNG_1x1_BASE64}`;

async function loginAPI(request, email, password) {
  const res = await request.post(`${API_BASE_URL}/auth/accountLogin`, {
    data: { emailHp: email, password },
  });
  expect(res.ok(), `login ${email} → ${res.status()}`).toBeTruthy();
  const body = await res.json();
  return body.data.token;
}

const auth = (token) => ({ Authorization: `Bearer ${token}` });

test.describe("Flow 5.4 — RegistrationSummary → BAYAR SIMPANAN → BillingPage (UI E2E)", () => {
  test("lengkap: calon anggota → RegistrationSummary → BAYAR → BillList", async ({
    page,
    request,
  }) => {
    test.setTimeout(180000);

    // ── 1. Buat akun Calon Anggota BARU ──
    const uniq = Date.now();
    const memberEmail = `e2e.billing.${uniq}@kkpus.id`;
    const memberNIK = `31710${String(uniq).slice(-11).padStart(11, "0")}`;

    const regRes = await request.post(`${API_BASE_URL}/auth/register`, {
      data: {
        full_name: "E2E Billing Candidate",
        email: memberEmail,
        password: TEST_PASSWORD,
        phone_number: "081234567890",
        nik_ktp: memberNIK,
        gender: "L",
        address: "Jl. Billing No. 1",
        date_of_birth: "1990-01-01",
      },
    });
    expect(regRes.status(), `register → ${regRes.status()}`).toBe(201);
    const regBody = await regRes.json();
    const memberToken = regBody.data.token;
    const memberId = regBody.data.member_id;
    console.log(`[BAYAR] Akun calon anggota: ${memberEmail} (${memberId})`);

    // ── 2. Submit formulir 8-step ──
    const submitRes = await request.post(`${API_BASE_URL}/anggota/pendaftaran`, {
      headers: auth(memberToken),
      data: {
        full_name: "E2E Billing Candidate",
        email: memberEmail,
        phone_number: "081234567890",
        nik_ktp: memberNIK,
        alamat_ktp: "Jl. Billing No. 1, Kota Test",
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
        foto_ktp: DATA_URI_PNG,
        foto_swafoto: DATA_URI_PNG,
        bank_name: "BCA",
        bank_account_no: "1234567890",
        account_number: "1234567890",
        account_holder: "E2E Billing Candidate",
        job_title: "Karyawan Swasta",
        occupation: "Karyawan Swasta",
        employer_name: "PT Test Maju",
        employer_address: "Jl. Kantor No. 1",
        contact_name: "Test Contact",
        phone_number_emergency: "081234567891",
        relation: "Saudara Kandung",
      },
    });
    expect(submitRes.ok(), `submit pendaftaran → ${submitRes.status()}`).toBeTruthy();
    console.log("[BAYAR] Formulir 8-step berhasil dikirim");

    // ── 3. Cari registration_id via antrian Pengawas ──
    const pengawasToken = await loginAPI(request, ROLE_ACCOUNTS.pengawas.email, ROLE_ACCOUNTS.pengawas.password);
    async function findRegistrationId(token) {
      const res = await request.get(`${API_BASE_URL}/approvals/pendaftaran/pending`, {
        headers: auth(token),
      });
      expect(res.ok(), `pending approvals → ${res.status()}`).toBeTruthy();
      const body = await res.json();
      const item = (body.data || []).find(
        (r) => r.type === "REGISTRATION" && r.member?.member_id === memberId
      );
      return item?.registration_id || null;
    }
    let registrationId = await findRegistrationId(pengawasToken);
    expect(registrationId, "registration_id di antrian Pengawus").toBeTruthy();
    console.log(`[BAYAR] registration_id: ${registrationId}`);

    // ── 4. Pengawus approve ──
    const appr1 = await request.put(
      `${API_BASE_URL}/approvals/pendaftaran/approve/${registrationId}`,
      { headers: auth(pengawasToken), data: { action: "APPROVE", notes: "Step 1 OK (E2E Billing)" } }
    );
    expect(appr1.ok(), `approval pengawas → ${appr1.status()}`).toBeTruthy();
    console.log("[BAYAR] Pengawus APPROVED");

    // ── 5. Ketua approve → tagihan diterbitkan ──
    const ketuaToken = await loginAPI(request, ROLE_ACCOUNTS.ketua.email, ROLE_ACCOUNTS.ketua.password);
    const appr2 = await request.put(
      `${API_BASE_URL}/approvals/pendaftaran/approve/${registrationId}`,
      { headers: auth(ketuaToken), data: { action: "APPROVE", notes: "Step 2 OK (E2E Billing)" } }
    );
    expect(appr2.ok(), `approval ketua → ${appr2.status()}`).toBeTruthy();
    console.log("[BAYAR] Ketua APPROVED — tagihan awal diterbitkan");

    // ── 6. Verifikasi bill_id tersedia ──
    const billsRes = await request.get(`${API_BASE_URL}/billing/list/pending`, {
      headers: auth(memberToken),
    });
    expect(billsRes.ok(), `pending bills → ${billsRes.status()}`).toBeTruthy();
    const billsBody = await billsRes.json();
    const unpaidItems = billsBody.data || [];
    expect(unpaidItems.length, "tagihan awal (Pokok & Wajib) tersedia").toBeGreaterThan(0);
    console.log(`[BAYAR] ${unpaidItems.length} tagihan belum lunas`);

    // ── 7. Login sebagai anggota via API → UI token ──
    // Catatan: loginAPI() mengembalikan token STRING langsung (body.data.token),
    // bukan objek. Sebelumnya di sini dipakai `loginResult.token` sehingga
    // token yang di-inject = undefined → UI menampilkan "Sesi Anda telah berakhir".
    const memberTokenUI = await loginAPI(request, memberEmail, TEST_PASSWORD);
    await page.addInitScript(({ t }) => {
      localStorage.setItem("token", t);
    }, { t: memberTokenUI });

    // ── 8. Navigasi ke registrationPage (Status Pendaftaran) via UI ──
    await navigateTo(page, "registrationPage", {}, 2000);
    await takeScreenshot(page, "billingflow-registration-status");

    // ── 9. Verifikasi RegistrationSummary menampilkan data lengkap ──
    await expect(
      page.getByRole("heading", { name: "Detail Pendaftaran" })
    ).toBeVisible({ timeout: 15000 });
    await expect(page.getByText("Status Persetujuan", { exact: true })).toBeVisible({ timeout: 15000 });
    await expect(page.getByText(/PENGAWAS|Pengawas/i)).toBeVisible();
    await expect(page.getByText(/KETUA|Ketua/i)).toBeVisible();
    await expect(page.getByText(/POSISI BERKAS/i)).toBeVisible();
    await takeScreenshot(page, "billingflow-registration-summary");

    // ── 10. Klik "BAYAR SIMPANAN SEKARANG" ──
    const bayarButton = page.getByRole("button", {
      name: /BAYAR SIMPANAN SEKARANG/i,
    });
    await expect(bayarButton).toBeVisible();
    await bayarButton.click();
    await page.waitForLoadState("domcontentloaded", { timeout: 20000 });
    await page.waitForTimeout(3000);
    await takeScreenshot(page, "billingflow-after-bayar-click");

    // ── 11. Verifikasi berada di BillingPage via JWT token route ──
    // Hero halaman: "Pusat Tagihan"; badge tab: "Belum Dibayar" + count.
    const billingHeading = page.getByText("Pusat Tagihan");
    await expect(billingHeading).toBeVisible({ timeout: 20000 });
    await expect(page.getByText(/Belum Dibayar/).first()).toBeVisible();
    await takeScreenshot(page, "billingflow-billingpage");

    // ── 12. BillList tampil ──
    const billList = page.locator(
      "[class*='bp-table'], [class*='bill'], [class*='tagihan'], [class*='Bill'], [class*='BillList'], table"
    );
    await expect(billList.first()).toBeVisible({ timeout: 20000 });
    await takeScreenshot(page, "billingflow-billlist");

    await assertPageLoaded(page, "Billing / Tagihan");
    console.log(
      "[BAYAR] ✅ Alur lengkap UI: RegistrationSummary → BAYAR SIMPANAN SEKARANG → BillingPage (BillList) BERHASIL"
    );
  });
});
