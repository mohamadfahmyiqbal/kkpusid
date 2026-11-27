/**
 * Module 05 — Tahap 3: Rantai Approval Pendaftaran Anggota
 * Alur nyata end-to-end (backend REAL, tanpa mock):
 *
 *   1. Buat akun Calon Anggota BARU (POST /auth/register) — akun terpisah agar
 *      e2e.test@kkpus.id (Flow 5) tidak rusak saat diaktifkan.
 *   2. Submit formulir 8-step (POST /anggota/pendaftaran) → member_registrations
 *      dibuat, final_status=PENDING, current_step = Step 1 (Pengawas).
 *   3. Approval Step 1 — Pengawas  (PUT /approvals/pendaftaran/approve/:id).
 *   4. Approval Step 2 — Ketua     → createInitialBills (Simpanan Pokok & Wajib).
 *   5. Anggota bayar + upload bukti (POST /billing/manual-payment) → Transaction
 *      PENDING_VERIFICATION.
 *   6. Approval Step 3 — Bendahara (final) → handleMemberFinalAction: anggota
 *      diaktifkan (status_id 1 → Anggota Reguler), final_status=APPROVED.
 *   7. Verifikasi via GET /anggota/getRegistrationStatus → APPROVED.
 *
 * Setiap peran memakai akun berbeda (maker-checker):
 *   pengawas@kkpus.id / ketua@kkpus.id / bendahara@kkpus.id  (qwerty123!!)
 *
 * Test bersifat stateful & destruktif terhadap akun BARU yang dibuat saat run
 * (bukan akun e2e.test). Email/NIK dibuat unik per run agar dapat diulang.
 *
 * Usage:
 *   npx playwright test e2e/modules/05-dashboard/approval-chain.spec.mjs
 */

import { test, expect } from "@playwright/test";
import { API_BASE_URL } from "../../../playwright.config.mjs";
import { takeScreenshot } from "../../helpers.mjs";

// ── Akun peran approval (password dari user) ──
const ROLE_ACCOUNTS = {
  pengawas: { email: "pengawas@kkpus.id", password: "qwerty123!!" },
  ketua: { email: "ketua@kkpus.id", password: "qwerty123!!" },
  bendahara: { email: "bendahara@kkpus.id", password: "qwerty123!!" },
};

// PNG 1x1 valid (dipakai untuk foto KTP/swafoto base64 & bukti transfer).
const PNG_1x1_BASE64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
const PNG_1x1_BUFFER = Buffer.from(PNG_1x1_BASE64, "base64");
const DATA_URI_PNG = `data:image/png;base64,${PNG_1x1_BASE64}`;

// ── Helper: login via API, kembalikan token ──
async function login(request, email, password) {
  const res = await request.post(`${API_BASE_URL}/auth/accountLogin`, {
    data: { emailHp: email, password },
  });
  expect(res.ok(), `login ${email} → ${res.status()}`).toBeTruthy();
  const body = await res.json();
  expect(body?.data?.token, `token ${email}`).toBeTruthy();
  return body.data.token;
}

const auth = (token) => ({ Authorization: `Bearer ${token}` });

test.describe("Approval Chain — Pendaftaran Anggota (Tahap 3)", () => {
  test("rantai approval lengkap: Pengawas → Ketua → bayar → Bendahara → APPROVED", async ({
    request,
    page,
  }) => {
    test.setTimeout(180000);

    // Identitas unik per run agar test dapat diulang tanpa konflik.
    const uniq = Date.now();
    const memberEmail = `e2e.approval.${uniq}@kkpus.id`;
    const memberPassword = "P@ssw0rd123!";
    const memberNIK = `31710${String(uniq).slice(-11).padStart(11, "0")}`; // 16 digit

    /* ---------- 1. Buat akun Calon Anggota BARU ---------- */
    const regRes = await request.post(`${API_BASE_URL}/auth/register`, {
      data: {
        full_name: "E2E Approval Candidate",
        email: memberEmail,
        password: memberPassword,
        phone_number: "081234567890",
        nik_ktp: memberNIK,
        gender: "L",
        address: "Jl. Approval No. 1",
        date_of_birth: "1990-01-01",
      },
    });
    const regBody = await regRes.json();
    expect(regRes.status(), `register → ${regRes.status()} ${JSON.stringify(regBody)}`).toBe(201);
    expect(regBody?.data?.token, "token member baru").toBeTruthy();
    const memberToken = regBody.data.token;
    const memberId = regBody.data.member_id;
    console.log(`[APPROVAL] Akun calon anggota dibuat: ${memberEmail} (${memberId})`);

    /* ---------- 2. Submit formulir 8-step ---------- */
    const submitRes = await request.post(`${API_BASE_URL}/anggota/pendaftaran`, {
      headers: auth(memberToken),
      data: {
        full_name: "E2E Approval Candidate",
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
        account_holder: "E2E Approval Candidate",
        job_title: "Karyawan Swasta",
        occupation: "Karyawan Swasta",
        employer_name: "PT Test Maju",
        employer_address: "Jl. Kantor No. 1",
        contact_name: "Test Contact",
        phone_number_emergency: "081234567891",
        relation: "Saudara Kandung",
      },
    });
    const submitBody = await submitRes.json();
    expect(submitRes.ok(), `submit pendaftaran → ${submitRes.status()} ${JSON.stringify(submitBody)}`).toBeTruthy();

    // Ambil registration_id (entityId approval) via endpoint pending (sebagai Pengawas).
    const pengawasToken = await login(request, ROLE_ACCOUNTS.pengawas.email, ROLE_ACCOUNTS.pengawas.password);

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
    expect(registrationId, "registration_id muncul di antrian approval Pengawas").toBeTruthy();
    console.log(`[APPROVAL] registration_id: ${registrationId}`);

    /* ---------- 3. Approval Step 1 — Pengawas ---------- */
    const appr1 = await request.put(
      `${API_BASE_URL}/approvals/pendaftaran/approve/${registrationId}`,
      { headers: auth(pengawasToken), data: { action: "APPROVE", notes: "Step 1 OK (E2E)" }, timeout: 60000 }
    );
    expect(appr1.ok(), `approval pengawas → ${appr1.status()} ${await appr1.text()}`).toBeTruthy();
    console.log("[APPROVAL] Step 1 (Pengawas) APPROVED");

    /* ---------- 4. Approval Step 2 — Ketua (terbit tagihan) ---------- */
    const ketuaToken = await login(request, ROLE_ACCOUNTS.ketua.email, ROLE_ACCOUNTS.ketua.password);
    const appr2 = await request.put(
      `${API_BASE_URL}/approvals/pendaftaran/approve/${registrationId}`,
      { headers: auth(ketuaToken), data: { action: "APPROVE", notes: "Step 2 OK (E2E)" }, timeout: 60000 }
    );
    expect(appr2.ok(), `approval ketua → ${appr2.status()} ${await appr2.text()}`).toBeTruthy();
    console.log("[APPROVAL] Step 2 (Ketua) APPROVED — tagihan awal diterbitkan");

    /* ---------- 5. Anggota bayar + upload bukti transfer ---------- */
    const billsRes = await request.get(`${API_BASE_URL}/billing/list/pending`, {
      headers: auth(memberToken),
    });
    expect(billsRes.ok(), `pending bills → ${billsRes.status()}`).toBeTruthy();
    const billsBody = await billsRes.json();
    const unpaidItems = billsBody.data || [];
    expect(unpaidItems.length, "tagihan awal (Pokok & Wajib) tersedia").toBeGreaterThan(0);
    const billItemIds = unpaidItems.map((i) => i.bill_item_id);
    const totalAmount = unpaidItems.reduce((s, i) => s + parseFloat(i.amount || 0), 0);
    console.log(`[APPROVAL] ${billItemIds.length} item tagihan, total Rp ${totalAmount}`);

    const payRes = await request.post(`${API_BASE_URL}/billing/manual-payment`, {
      headers: auth(memberToken),
      multipart: {
        proof: {
          name: "bukti-transfer.png",
          mimeType: "image/png",
          buffer: PNG_1x1_BUFFER,
        },
        tx_category: "MEMBER_REGISTRATION",
        bill_item_ids: JSON.stringify(billItemIds),
        amount: String(totalAmount),
        sender_name: "E2E Approval Candidate",
        sender_bank: "BCA",
        sender_account_no: "1234567890",
      },
      timeout: 60000,
    });
    const payBody = await payRes.json();
    expect(payRes.ok(), `bayar manual → ${payRes.status()} ${JSON.stringify(payBody)}`).toBeTruthy();
    expect(payBody?.data?.status, "status transaksi").toBe("PENDING_VERIFICATION");
    console.log("[APPROVAL] Bukti pembayaran diunggah (PENDING_VERIFICATION)");

    /* ---------- 6. Approval Step 3 — Bendahara (final) ---------- */
    const bendaharaToken = await login(
      request,
      ROLE_ACCOUNTS.bendahara.email,
      ROLE_ACCOUNTS.bendahara.password
    );
    const appr3 = await request.put(
      `${API_BASE_URL}/approvals/pendaftaran/approve/${registrationId}`,
      { headers: auth(bendaharaToken), data: { action: "APPROVE", notes: "Step 3 OK (E2E)" }, timeout: 90000 }
    );
    expect(appr3.ok(), `approval bendahara → ${appr3.status()} ${await appr3.text()}`).toBeTruthy();
    console.log("[APPROVAL] Step 3 (Bendahara) APPROVED — anggota diaktifkan");

    /* ---------- 7. Verifikasi status akhir = APPROVED ---------- */
    const statusRes = await request.get(`${API_BASE_URL}/anggota/getRegistrationStatus`, {
      headers: auth(memberToken),
    });
    expect(statusRes.ok(), `getRegistrationStatus → ${statusRes.status()}`).toBeTruthy();
    const statusBody = await statusRes.json();
    expect(statusBody?.data?.final_status, "final_status").toBe("APPROVED");

    // Anggota tidak lagi Calon Anggota (status_id 1) — sudah diaktifkan.
    expect(statusBody?.data?.member?.status?.status_name, "status keanggotaan aktif").toMatch(
      /Anggota (Reguler|Luar Biasa)/
    );
    console.log(
      `[APPROVAL] ✅ Selesai: ${memberEmail} → ${statusBody.data.member.status.status_name}`
    );
    
    // Screenshot final approval status
    await takeScreenshot(page, "approval-chain-final-approved");
  });
});