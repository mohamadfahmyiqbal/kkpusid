/**
 * Module — User Workflow E2E (Consolidated)
 *
 * Mengganti struktur per-modul (01..16) menjadi satu E2E workflow pengguna.
 * Mengikuti @kkpusid/e2e/ALUR-PER-MODUL.md:
 *   Flow 1: New Member Journey
 *   Flow 2: Returning Member Journey
 *
 * Usage:
 *   npx playwright test e2e/modules/user-workflow/user-workflow.spec.mjs
 */
import { test, expect } from "@playwright/test";
import {
  API_BASE_URL,
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
} from "../../helpers.mjs";

// ── Akun peran approval (maker-checker) ──
const ROLE_ACCOUNTS = {
  pengawas: { email: "pengawas@kkpus.id", password: "qwerty123!!" },
  ketua: { email: "ketua@kkpus.id", password: "qwerty123!!" },
  bendahara: { email: "bendahara@kkpus.id", password: "qwerty123!!" },
};

// PNG 1x1 valid (dipakai untuk foto KTP/swafoto & bukti transfer base64)
const PNG_1x1_BASE64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
const DATA_URI_PNG = `data:image/png;base64,${PNG_1x1_BASE64}`;
const PNG_1x1_BUFFER = Buffer.from(PNG_1x1_BASE64, "base64");

// Helper: login API, kembalikan token string langsung
async function loginAPI(request, email, password) {
  const res = await request.post(`${API_BASE_URL}/auth/accountLogin`, {
    data: { emailHp: email, password },
  });
  expect(res.ok(), `login ${email} → ${res.status()}`).toBeTruthy();
  const body = await res.json();
  expect(body?.data?.token, `token ${email}`).toBeTruthy();
  return body.data.token;
}

const auth = (token) => ({ Authorization: `Bearer ${token}` });

test.describe("User Workflow E2E (New & Returning Member)", () => {
  test.beforeEach(async ({ page }) => {
    await clearAuth(page);
  });

  /* ================================================================
   * FLOW 1: NEW MEMBER JOURNEY
   * Splash → Landing → Register → Login → Dashboard Calon Anggota →
   * Form 8-Step → RegistrationSummary → Approval (Pengawas→Ketua→Bayar→Bendahara)
   * → Dashboard Anggota Reguler → Logout
   * ================================================================ */
  test.describe("Flow 1 — New Member Journey", () => {
    test("1-1: Splash → Landing → Register → Login → Dashboard", async ({ page, request }) => {
      // ── 1. Splash Screen ──
      await navigateTo(page, "globalSplash", {}, 1200);
      await takeScreenshot(page, "wf-01-splash");
      await assertPageLoaded(page, "Splash Screen");

      // ── 2. Landing Page ──
      await navigateTo(page, "landingPage", {}, 2500);
      await takeScreenshot(page, "wf-01-landing");
      await assertPageLoaded(page, "Landing Page");

      // ── 3. Register Akun Baru via API ──
      const uniq = Date.now();
      const memberEmail = `e2e.workflow.${uniq}@kkpus.id`;
      const memberPassword = TEST_PASSWORD;
      const memberNIK = `31710${String(uniq).slice(-11).padStart(11, "0")}`;

      const regRes = await request.post(`${API_BASE_URL}/auth/register`, {
        data: {
          full_name: "E2E Workflow Member",
          email: memberEmail,
          password: memberPassword,
          phone_number: "081234567890",
          nik_ktp: memberNIK,
          gender: "L",
          address: "Jl. Workflow No. 1",
          date_of_birth: "1990-01-01",
        },
      });
      expect(regRes.status(), `register → ${regRes.status()}`).toBe(201);
      const regBody = await regRes.json();
      const memberToken = regBody.data.token;
      const memberId = regBody.data.member_id;
      console.log(`[WF-01] Akun baru: ${memberEmail} (${memberId})`);

      // ── 4. Login via API ──
      await page.addInitScript(({ t }) => {
        localStorage.setItem("token", t);
      }, { t: memberToken });

      // ── 5. Dashboard Calon Anggota (status_id=1) ──
      await navigateTo(page, "dashboard", {}, 2000);
      await takeScreenshot(page, "wf-01-dashboard-candidate");
      await assertPageLoaded(page, "Dashboard Calon Anggota");

      // Verifikasi menu utama terkunci untuk calon anggota
      const disabledMenus = page.locator(".dc-menu-item.is-disabled");
      await expect(disabledMenus).toHaveCount(7);
      for (const label of ["Simpanan", "Program", "Tabungan", "Investasi", "Training", "Jual Beli", "Riwayat"]) {
        await expect(page.locator(".dc-menu-item", { hasText: label })).toBeDisabled();
      }
    });

    test("1-2: Form 8-Step → Kirim → SweetAlert → RegistrationPage", async ({ page, request }) => {
      test.setTimeout(180000);

      // ── 1. Buat akun Calon Anggota BARU ──
      const uniq = Date.now();
      const memberEmail = `e2e.wf-submit.${uniq}@kkpus.id`;
      const memberNIK = `31710${String(uniq).slice(-11).padStart(11, "0")}`;

      const regRes = await request.post(`${API_BASE_URL}/auth/register`, {
        data: {
          full_name: "E2E WF Submit",
          email: memberEmail,
          password: TEST_PASSWORD,
          phone_number: "081234567890",
          nik_ktp: memberNIK,
          gender: "L",
          address: "Jl. Submit No. 1",
          date_of_birth: "1990-01-01",
        },
      });
      expect(regRes.status(), `register → ${regRes.status()}`).toBe(201);
      const regBody = await regRes.json();
      const token = regBody.data.token;
      console.log(`[WF-02] Akun baru: ${memberEmail}`);

      // ── 2. Inject token → buka form 8-step ──
      await page.addInitScript(({ t }) => {
        localStorage.setItem("token", t);
      }, { t: token });
      await navigateTo(page, "registrationFormDetail", {}, 2000);

      // Helper react-select
      async function pickSelect(control, label) {
        await control.first().click();
        await page.waitForTimeout(300);
        const option = label
          ? page.locator(".rs__menu .rs__option", { hasText: label })
          : page.locator(".rs__menu .rs__option");
        await option.first().click();
        await page.waitForTimeout(500);
      }
      async function clickNext() {
        await page.locator("button:has-text('Selanjutnya')").click();
        await page.waitForTimeout(700);
      }

      /* ---------- Step 1: Data Pribadi ---------- */
      await expect(page.locator('input[name="nik_ktp"]')).toBeVisible({ timeout: 5000 });
      await page.locator('input[name="nik_ktp"]').fill(memberNIK);
      await page.locator('input[name="full_name"]').fill("E2E WF Submit");
      await page.locator('textarea[name="alamat_ktp"]').fill("Jl. Submit No. 1, Kota Test");
      await pickSelect(page.locator(".rs__control").nth(0), "DKI JAKARTA");
      await pickSelect(page.locator(".rs__control").nth(1), null);
      await pickSelect(page.locator(".rs__control").nth(2), null);
      await pickSelect(page.locator(".rs__control").nth(3), null);
      await takeScreenshot(page, "wf-02-step-1-data-pribadi");
      await clickNext();

      /* ---------- Step 2: Akun & Kontak ---------- */
      await expect(page.getByRole("heading", { name: "Akun & Kontak" })).toBeVisible({ timeout: 5000 });
      await pickSelect(page.locator(".rs__control").first(), "Anggota Reguler");
      await takeScreenshot(page, "wf-02-step-2-akun-kontak");
      await clickNext();

      /* ---------- Step 3: Foto KTP (webcam fake-device) ---------- */
      await expect(page.getByText("Dokumentasi KTP")).toBeVisible({ timeout: 5000 });
      await page.locator("button:has-text('Buka Kamera')").first().click();
      await page.waitForTimeout(800);
      await page.locator("button:has-text('Ambil Foto')").first().click();
      await page.waitForTimeout(800);
      await expect(page.getByText("Foto Berhasil")).toBeVisible({ timeout: 5000 });
      await takeScreenshot(page, "wf-02-step-3-foto-ktp");
      await clickNext();

      /* ---------- Step 4: Swafoto (webcam fake-device) ---------- */
      await expect(page.getByText("Verifikasi Wajah (Swafoto)")).toBeVisible({ timeout: 5000 });
      await page.locator("button:has-text('Buka Kamera')").first().click();
      await page.waitForTimeout(800);
      await page.locator("button:has-text('Ambil Foto')").first().click();
      await page.waitForTimeout(800);
      await expect(page.getByText("Foto Berhasil")).toBeVisible({ timeout: 5000 });
      await takeScreenshot(page, "wf-02-step-4-swafoto");
      await clickNext();

      /* ---------- Step 5: Pekerjaan ---------- */
      await expect(page.locator('input[name="occupation"]')).toBeVisible({ timeout: 5000 });
      await page.locator('input[name="occupation"]').fill("Karyawan Swasta");
      await page.locator('input[name="employer_name"]').fill("PT Test Maju");
      await page.locator('textarea[name="employer_address"], input[name="employer_address"]').first().fill("Jl. Kantor No. 1");
      await takeScreenshot(page, "wf-02-step-5-pekerjaan");
      await clickNext();

      /* ---------- Step 6: Kontak Darurat ---------- */
      await expect(page.locator('input[name="contact_name"]')).toBeVisible({ timeout: 5000 });
      await page.locator('input[name="contact_name"]').fill("Test Contact");
      await page.locator('input[name="phone_number_emergency"]').fill("081234567891");
      await page.locator('input[name="relation"]').fill("Saudara Kandung");
      await takeScreenshot(page, "wf-02-step-6-kontak-darurat");
      await clickNext();

      /* ---------- Step 7: Rekening Bank ---------- */
      await expect(page.locator('input[name="bank_name"]')).toBeVisible({ timeout: 5000 });
      await page.locator('input[name="bank_name"]').fill("BCA");
      await page.locator('input[name="bank_account_no"]').fill("1234567890");
      await page.locator('input[name="account_holder"]').fill("E2E WF Submit");
      await takeScreenshot(page, "wf-02-step-7-rekening-bank");
      await clickNext();

      /* ---------- Step 8: Ringkasan → centang commitment → Kirim Sekarang ---------- */
      await expect(page.getByRole("heading", { name: "Ringkasan Permohonan" })).toBeVisible({ timeout: 5000 });

      const submitBtn = page.getByRole("button", { name: "Kirim Sekarang" });
      await expect(submitBtn).toBeDisabled();
      const commitment = page.locator('input[type="checkbox"]');
      if (await commitment.first().isVisible().catch(() => false)) {
        await commitment.first().check({ force: true });
      }
      await expect(submitBtn).toBeEnabled({ timeout: 3000 });
      await takeScreenshot(page, "wf-02-step-8-ringkasan");

      // ── 3. Klik "Kirim Sekarang" → submit nyata ke backend ──
      await submitBtn.click();

      // ── 4. SweetAlert "Berhasil" dengan tombol "Lihat Status Pendaftaran" ──
      const successPopup = page.locator(".swal2-popup");
      await expect(successPopup).toBeVisible({ timeout: 15000 });
      await expect(successPopup.getByRole("heading", { name: "Berhasil" })).toBeVisible();
      const statusLink = successPopup.getByRole("link", { name: "Lihat Status Pendaftaran" });
      await expect(statusLink).toBeVisible();
      const href = await statusLink.getAttribute("href");
      expect(href, "href menuju registrationPage").toBeTruthy();
      await takeScreenshot(page, "wf-02-sweetalert-lihat-status");

      // ── 5. Klik tombol → halaman Status Pendaftaran (registrationPage) ──
      // Tutup dialog modal notifikasi bila ada yang menutupi link
      const tutupBtn = page.getByRole("button", { name: "Tutup" });
      if (await tutupBtn.isVisible().catch(() => false)) {
        await tutupBtn.click().catch(() => {});
        await page.waitForTimeout(300);
      }
      expect(href.startsWith("/"), "href adalah path route token").toBeTruthy();
      await page.goto(href, { waitUntil: "domcontentloaded", timeout: 20000 });
      await page.waitForTimeout(2000);

      // ── 6. Verifikasi halaman status pendaftaran pasca-submit ──
      await expect(
        page.getByRole("heading", { name: "Pendaftaran Anggota", level: 1 })
      ).toBeVisible({ timeout: 10000 });
      await expect(
        page.getByRole("heading", { name: "Detail Pendaftaran" })
      ).toBeVisible({ timeout: 5000 });
      await takeScreenshot(page, "wf-02-redirect-registration-status");

      await assertPageLoaded(page, "Status Pendaftaran (pasca-submit)");
      console.log("[WF-02] ✅ Kirim Sekarang → SweetAlert → registrationPage OK");
    });

    test("1-3: Approval Chain (Pengawas → Ketua → Bayar → Bendahara → APPROVED)", async ({ page, request }) => {
      test.setTimeout(240000);

      // ── 1. Buat akun Calon Anggota BARU ──
      const uniq = Date.now();
      const memberEmail = `e2e.wf-approval.${uniq}@kkpus.id`;
      const memberNIK = `31710${String(uniq).slice(-11).padStart(11, "0")}`;

      const regRes = await request.post(`${API_BASE_URL}/auth/register`, {
        data: {
          full_name: "E2E WF Approval",
          email: memberEmail,
          password: TEST_PASSWORD,
          phone_number: "081234567890",
          nik_ktp: memberNIK,
          gender: "L",
          address: "Jl. Approval No. 1",
          date_of_birth: "1990-01-01",
        },
      });
      expect(regRes.status(), `register → ${regRes.status()}`).toBe(201);
      const regBody = await regRes.json();
      const memberToken = regBody.data.token;
      const memberId = regBody.data.member_id;

      // ── 2. Submit formulir 8-step ──
      const submitRes = await request.post(`${API_BASE_URL}/anggota/pendaftaran`, {
        headers: auth(memberToken),
        data: {
          full_name: "E2E WF Approval",
          email: memberEmail,
          phone_number: "081234567890",
          nik_ktp: memberNIK,
          alamat_ktp: "Jl. Approval No. 1, Kota Test",
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
          account_holder: "E2E WF Approval",
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

      // ── 3. Cari registration_id via antrian Pengawas ──
      const pengawasToken = await loginAPI(request, ROLE_ACCOUNTS.pengawas.email, ROLE_ACCOUNTS.pengawas.password);
      const pendingRes = await request.get(`${API_BASE_URL}/approvals/pendaftaran/pending`, {
        headers: auth(pengawasToken),
      });
      const pendingBody = await pendingRes.json();
      const registrationItem = (pendingBody.data || []).find(
        (r) => r.type === "REGISTRATION" && r.member?.member_id === memberId
      );
      expect(registrationItem, "registration_id muncul di antrian Pengawas").toBeTruthy();
      const registrationId = registrationItem.registration_id;
      console.log(`[WF-03] registration_id: ${registrationId}`);

      // ── 4. Pengawas approve ──
      const appr1 = await request.put(
        `${API_BASE_URL}/approvals/pendaftaran/approve/${registrationId}`,
        { headers: auth(pengawasToken), data: { action: "APPROVE", notes: "Step 1 OK (WF)" }, timeout: 60000 }
      );
      expect(appr1.ok(), `approval pengawas → ${appr1.status()}`).toBeTruthy();
      console.log("[WF-03] Step 1 (Pengawas) APPROVED");

      // ── 5. Ketua approve → tagihan awal terbit ──
      const ketuaToken = await loginAPI(request, ROLE_ACCOUNTS.ketua.email, ROLE_ACCOUNTS.ketua.password);
      const appr2 = await request.put(
        `${API_BASE_URL}/approvals/pendaftaran/approve/${registrationId}`,
        { headers: auth(ketuaToken), data: { action: "APPROVE", notes: "Step 2 OK (WF)" }, timeout: 60000 }
      );
      expect(appr2.ok(), `approval ketua → ${appr2.status()}`).toBeTruthy();
      console.log("[WF-03] Step 2 (Ketua) APPROVED — tagihan awal diterbitkan");

      // ── 6. Anggota bayar + upload bukti transfer ──
      const billsRes = await request.get(`${API_BASE_URL}/billing/list/pending`, {
        headers: auth(memberToken),
      });
      expect(billsRes.ok(), `pending bills → ${billsRes.status()}`).toBeTruthy();
      const billsBody = await billsRes.json();
      const unpaidItems = billsBody.data || [];
      expect(unpaidItems.length, "tagihan awal (Pokok & Wajib) tersedia").toBeGreaterThan(0);
      const billItemIds = unpaidItems.map((i) => i.bill_item_id);
      const totalAmount = unpaidItems.reduce((s, i) => s + parseFloat(i.amount || 0), 0);

      const payRes = await request.post(`${API_BASE_URL}/billing/manual-payment`, {
        headers: auth(memberToken),
        multipart: {
          proof: { name: "bukti-transfer.png", mimeType: "image/png", buffer: PNG_1x1_BUFFER },
          tx_category: "MEMBER_REGISTRATION",
          bill_item_ids: JSON.stringify(billItemIds),
          amount: String(totalAmount),
          sender_name: "E2E WF Approval",
          sender_bank: "BCA",
          sender_account_no: "1234567890",
        },
        timeout: 60000,
      });
      const payBody = await payRes.json();
      expect(payRes.ok(), `bayar manual → ${payRes.status()}`).toBeTruthy();
      expect(payBody?.data?.status, "status transaksi").toBe("PENDING_VERIFICATION");
      console.log("[WF-03] Bukti pembayaran diunggah (PENDING_VERIFICATION)");

      // ── 7. Bendahara approve (final) ──
      const bendaharaToken = await loginAPI(request, ROLE_ACCOUNTS.bendahara.email, ROLE_ACCOUNTS.bendahara.password);
      const appr3 = await request.put(
        `${API_BASE_URL}/approvals/pendaftaran/approve/${registrationId}`,
        { headers: auth(bendaharaToken), data: { action: "APPROVE", notes: "Step 3 OK (WF)" }, timeout: 90000 }
      );
      expect(appr3.ok(), `approval bendahara → ${appr3.status()}`).toBeTruthy();
      console.log("[WF-03] Step 3 (Bendahara) APPROVED — anggota diaktifkan");

      // ── 8. Verifikasi status akhir = APPROVED ──
      const statusRes = await request.get(`${API_BASE_URL}/anggota/getRegistrationStatus`, {
        headers: auth(memberToken),
      });
      expect(statusRes.ok(), `getRegistrationStatus → ${statusRes.status()}`).toBeTruthy();
      const statusBody = await statusRes.json();
      expect(statusBody?.data?.final_status, "final_status").toBe("APPROVED");
      expect(statusBody?.data?.member?.status?.status_name, "status keanggotaan aktif").toMatch(
        /Anggota (Reguler|Luar Biasa)/
      );
      console.log(`[WF-03] ✅ Selesai: ${memberEmail} → ${statusBody.data.member.status.status_name}`);
    });

    test("1-4: Dashboard Anggota Reguler → Modules 06-14 → Logout", async ({ page, request }) => {
      test.setTimeout(180000);

      // ── 1. Buat akun + submit form + approval penuh (API) ──
      const uniq = Date.now();
      const memberEmail = `e2e.wf-dashboard.${uniq}@kkpus.id`;
      const memberNIK = `31710${String(uniq).slice(-11).padStart(11, "0")}`;

      const regRes = await request.post(`${API_BASE_URL}/auth/register`, {
        data: {
          full_name: "E2E WF Dashboard",
          email: memberEmail,
          password: TEST_PASSWORD,
          phone_number: "081234567890",
          nik_ktp: memberNIK,
          gender: "L",
          address: "Jl. Dashboard No. 1",
          date_of_birth: "1990-01-01",
        },
      });
      expect(regRes.status(), `register → ${regRes.status()}`).toBe(201);
      const regBody = await regRes.json();
      const memberToken = regBody.data.token;
      const memberId = regBody.data.member_id;

      // Submit form
      await request.post(`${API_BASE_URL}/anggota/pendaftaran`, {
        headers: auth(memberToken),
        data: {
          full_name: "E2E WF Dashboard",
          email: memberEmail,
          phone_number: "081234567890",
          nik_ktp: memberNIK,
          alamat_ktp: "Jl. Dashboard No. 1, Kota Test",
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
          account_holder: "E2E WF Dashboard",
          job_title: "Karyawan Swasta",
          occupation: "Karyawan Swasta",
          employer_name: "PT Test Maju",
          employer_address: "Jl. Kantor No. 1",
          contact_name: "Test Contact",
          phone_number_emergency: "081234567891",
          relation: "Saudara Kandung",
        },
      });

      // Approval chain
      const pengawasToken = await loginAPI(request, ROLE_ACCOUNTS.pengawas.email, ROLE_ACCOUNTS.pengawas.password);
      const pendingRes = await request.get(`${API_BASE_URL}/approvals/pendaftaran/pending`, {
        headers: auth(pengawasToken),
      });
      const pendingBody = await pendingRes.json();
      const registrationItem = (pendingBody.data || []).find(
        (r) => r.type === "REGISTRATION" && r.member?.member_id === memberId
      );
      expect(registrationItem, "registration_id di antrian Pengawas").toBeTruthy();
      const registrationId = registrationItem.registration_id;

      await request.put(`${API_BASE_URL}/approvals/pendaftaran/approve/${registrationId}`, {
        headers: auth(pengawasToken), data: { action: "APPROVE", notes: "Step 1" }, timeout: 60000,
      });

      const ketuaToken = await loginAPI(request, ROLE_ACCOUNTS.ketua.email, ROLE_ACCOUNTS.ketua.password);
      await request.put(`${API_BASE_URL}/approvals/pendaftaran/approve/${registrationId}`, {
        headers: auth(ketuaToken), data: { action: "APPROVE", notes: "Step 2" }, timeout: 60000,
      });

      // Bayar
      const billsRes = await request.get(`${API_BASE_URL}/billing/list/pending`, {
        headers: auth(memberToken),
      });
      const unpaidItems = (await billsRes.json()).data || [];
      expect(unpaidItems.length).toBeGreaterThan(0);
      const totalAmount = unpaidItems.reduce((s, i) => s + parseFloat(i.amount || 0), 0);
      const billItemIds = unpaidItems.map((i) => i.bill_item_id);
      await request.post(`${API_BASE_URL}/billing/manual-payment`, {
        headers: auth(memberToken),
        multipart: {
          proof: { name: "bukti.png", mimeType: "image/png", buffer: PNG_1x1_BUFFER },
          tx_category: "MEMBER_REGISTRATION",
          bill_item_ids: JSON.stringify(billItemIds),
          amount: String(totalAmount),
          sender_name: "E2E WF Dashboard",
          sender_bank: "BCA",
          sender_account_no: "1234567890",
        },
        timeout: 60000,
      });

      const bendaharaToken = await loginAPI(request, ROLE_ACCOUNTS.bendahara.email, ROLE_ACCOUNTS.bendahara.password);
      await request.put(`${API_BASE_URL}/approvals/pendaftaran/approve/${registrationId}`, {
        headers: auth(bendaharaToken), data: { action: "APPROVE", notes: "Step 3" }, timeout: 90000,
      });

      // ── 2. Inject token → Dashboard Anggota Reguler ──
      await page.addInitScript(({ t }) => {
        localStorage.setItem("token", t);
      }, { t: memberToken });

      // ── 3. Dashboard Anggota Reguler ──
      await navigateTo(page, "dashboard", {}, 2000);
      await takeScreenshot(page, "wf-04-dashboard-reguler");
      await assertPageLoaded(page, "Dashboard Anggota Reguler");

      // Verifikasi menu utama TIDAK terkunci lagi
      const disabledMenus = page.locator(".dc-menu-item.is-disabled");
      await expect(disabledMenus).toHaveCount(0);
      // Verifikasi badge Anggota Reguler tampil di sidebar
      await expect(page.getByRole("complementary").getByText("Anggota Reguler")).toBeVisible({ timeout: 10000 });
      await expect(page.getByText(/Calon Anggota/i)).not.toBeVisible({ timeout: 5000 });

      // ── 4. Simpanan (Pokok/Wajib/Sukarela) ──
      await navigateTo(page, "simpananPage", {}, 2000);
      await takeScreenshot(page, "wf-04-simpanan");
      await assertPageLoaded(page, "Simpanan");

      // Switch produk tabs
      const productTabs = page.locator(".simpanan-tab-btn");
      if (await productTabs.first().isVisible({ timeout: 5000 }).catch(() => false)) {
        for (const product of ["Pokok", "Wajib", "Sukarela"]) {
          const tab = productTabs.nth(["Pokok", "Wajib", "Sukarela"].indexOf(product));
          if (await tab.isVisible({ timeout: 2000 }).catch(() => false)) {
            await tab.click();
            await page.waitForTimeout(1000);
            await takeScreenshot(page, `wf-04-simpanan-${product.toLowerCase()}`);
          }
        }
      }

      // ── 5. Tabungan Target ──
      await navigateTo(page, "tabunganPage", {}, 2000);
      await takeScreenshot(page, "wf-04-tabungan");
      await assertPageLoaded(page, "Tabungan");

      // ── 6. Pinjaman/Pembiayaan (ProgramPage → Pinjaman) ──
      await navigateTo(page, "programPage", {}, 2000);
      await takeScreenshot(page, "wf-04-program");
      await assertPageLoaded(page, "Program / Pinjaman");

      // ── 7. Arisan ──
      await navigateTo(page, "arisanPage", {}, 2000);
      await takeScreenshot(page, "wf-04-arisan");
      await assertPageLoaded(page, "Arisan");

      // ── 8. Jual Beli ──
      await navigateTo(page, "jualBeliPage", {}, 2000);
      await takeScreenshot(page, "wf-04-jualbeli");
      await assertPageLoaded(page, "Jual Beli");

      // ── 9. Investasi ──
      await navigateTo(page, "investasiPage", {}, 2000);
      await takeScreenshot(page, "wf-04-investasi");
      await assertPageLoaded(page, "Investasi");

      // ── 10. Training & Evaluasi ──
      await navigateTo(page, "trainingPage", {}, 2000);
      await takeScreenshot(page, "wf-04-training");
      await assertPageLoaded(page, "Training");

      // ── 11. Notifikasi & Transaksi ──
      await navigateTo(page, "notificationPage", {}, 2000);
      await takeScreenshot(page, "wf-04-notifikasi");
      await assertPageLoaded(page, "Notifikasi");

      // ── 12. Akun & Profil ──
      await navigateTo(page, "accountPage", {}, 2000);
      await takeScreenshot(page, "wf-04-akun");
      await assertPageLoaded(page, "Akun / Profil");

      // ── 13. Logout ──
      const logoutBtn = page.locator("button:has-text('Logout')");
      if (await logoutBtn.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await logoutBtn.first().click();
        await page.waitForTimeout(1000);
        await takeScreenshot(page, "wf-04-logout");
        // Verifikasi redirect ke login
        await expect(page).toHaveURL(/authLogin/);
      }

      console.log("[WF-04] ✅ Dashboard Anggota Reguler → Modul 06-14 → Logout OK");
    });
  });

  /* ================================================================
   * FLOW 2: RETURNING MEMBER JOURNEY
   * Login (token existing) → Dashboard → Semua Modul → Logout
   * ================================================================ */
  test.describe("Flow 2 — Returning Member Journey", () => {
    test("2-1: Login → Dashboard → Simpanan → Penarikan → Akun → Logout", async ({ page }) => {
      // ── 1. Login via API ──
      const loginResult = await apiLogin(page, TEST_EMAIL, TEST_PASSWORD);
      if (!loginResult?.success) {
        test.skip(true, "Login failed - skipping returning member journey");
        return;
      }

      // ── 2. Dashboard ──
      await navigateWithAuth(page, "dashboard", {}, 2000, loginResult.token);
      await takeScreenshot(page, "wf-21-dashboard");
      await assertPageLoaded(page, "Dashboard");

      // ── 3. Simpanan ──
      await navigateWithAuth(page, "simpananPage", {}, 2000, loginResult.token);
      await takeScreenshot(page, "wf-21-simpanan");
      await assertPageLoaded(page, "Simpanan");

      // ── 4. Penarikan Simpanan ──
      await navigateWithAuth(page, "penarikanSimpananPage", {}, 2000, loginResult.token);
      await takeScreenshot(page, "wf-21-penarikan");
      await assertPageLoaded(page, "Penarikan Simpanan");

      // ── 5. Akun & Profil ──
      await navigateWithAuth(page, "accountPage", {}, 2000, loginResult.token);
      await takeScreenshot(page, "wf-21-akun");
      await assertPageLoaded(page, "Akun / Profil");

      // ── 6. Logout ──
      const logoutBtn = page.locator("button:has-text('Logout')");
      if (await logoutBtn.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await logoutBtn.first().click();
        await page.waitForTimeout(1000);
        await takeScreenshot(page, "wf-21-logout");
        await expect(page).toHaveURL(/authLogin/);
      }

      console.log("[WF-21] ✅ Returning Member Journey OK");
    });
  });
});