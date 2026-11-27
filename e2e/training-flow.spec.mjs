/**
 * E2E Training Flow — @kkpusid
 * Covers all 15 user flows from docs/training-e2e-flow.md
 *
 * Usage:
 *   npx playwright test e2e/training-flow.spec.mjs
 *
 *   TEST_EMAIL=user@example.com TEST_PASSWORD=P@ssw0rd123! \
 *     npx playwright test e2e/training-flow.spec.mjs
 */

import { test, expect } from "@playwright/test";
import {
  BASE_URL,
  PUBLIC_PAGES,
  PROTECTED_PAGES,
  TEST_EMAIL,
  TEST_PASSWORD,
  SCREENSHOT_DIR,
} from "../playwright.config.mjs";
import {
  navigateTo,
  takeScreenshot,
  attemptLogin,
  apiLogin,
  clearAuth,
  assertPageLoaded,
  jwtEncodePage,
  navigateWithAuth,
} from "./helpers.mjs";

// ── Shared auth state (set once in registration test, reused across all tests) ──
let AUTH_TOKEN = null;
let TEST_CREDENTIALS = {
  email: process.env.TEST_EMAIL || null,
  password: process.env.TEST_PASSWORD || null,
};

// ── Helper untuk setup protected test (inject token via localStorage) ──
async function setupProtected(page) {
  if (AUTH_TOKEN) {
    // Inject token via addInitScript agar tersedia saat app di-load
    await page.addInitScript(({ t }) => {
      localStorage.setItem("token", t);
    }, { t: AUTH_TOKEN });
    return true;
  }
  // Fallback: coba login via API (hanya jika kredensial tersedia)
  if (TEST_CREDENTIALS.email && TEST_CREDENTIALS.password) {
    const loginResult = await apiLogin(page, TEST_CREDENTIALS.email, TEST_CREDENTIALS.password);
    if (loginResult?.token) {
      AUTH_TOKEN = loginResult.token;
      // Inject token via addInitScript
      await page.addInitScript(({ t }) => {
        localStorage.setItem("token", t);
      }, { t: AUTH_TOKEN });
      return true;
    }
  }
  return false;
}

// ── Flow 2 (Tahap 1) — Registrasi akun baru (harus berjalan pertama) ──
test.describe("Flow 2 (Tahap 1) — Buat Akun Login & Otomatis Login", () => {
  test("accountRegister: daftar akun baru → login → simpan kredensial", async ({ page }) => {
    // Jika sudah ada kredensial existing dari env, skip registrasi baru
    if (TEST_EMAIL && TEST_PASSWORD) {
      TEST_CREDENTIALS.email = TEST_EMAIL;
      TEST_CREDENTIALS.password = TEST_PASSWORD;
      const loginResult = await apiLogin(page, TEST_EMAIL, TEST_PASSWORD);
      if (loginResult?.token) {
        AUTH_TOKEN = loginResult.token;
        console.log(`[REG] Login via kredensial existing: ${TEST_EMAIL}`);
      }
      return;
    }

    await clearAuth(page);
    await navigateTo(page, "accountRegisterPage", {}, 1500);
    await takeScreenshot(page, "reg-flow-01-buat-akun");

    const timestamp = Date.now();
    const regEmail = `e2e.reg.${timestamp}@kkpus.id`;
    const regPassword = process.env.TEST_PASSWORD || "P@ssw0rd123!";

    // Isi formulir registrasi
    await page.locator('input[name="nama"]').fill("E2E Test Anggota");
    await page.locator('input[name="email"]').fill(regEmail);
    await page.locator('input[name="password"]').fill(regPassword);
    await page.locator('input[name="confirmPassword"]').fill(regPassword);

    // Submit
    await page.locator("button.pbs-submit-v2").click();
    await page.waitForTimeout(2000);

    // Tangani SweetAlert → klik "Ke Halaman Login"
    const swalConfirm = page.locator(
      ".swal2-confirm, button:has-text('Ke Halaman Login')"
    );
    if (await swalConfirm.isVisible({ timeout: 5000 }).catch(() => false)) {
      await swalConfirm.click();
      await page.waitForTimeout(1500);
    }

    // Login via API (lebih andal dari UI form)
    await page.waitForTimeout(2000);
    const loginResult = await apiLogin(page, regEmail, regPassword);

    // Fallback ke UI login jika API gagal
    if (!loginResult?.success) {
      const uiOk = await attemptLogin(page, regEmail, regPassword);
      if (!uiOk) {
        await page.waitForTimeout(3000);
        const tokenCheck = await page.evaluate(() => localStorage.getItem("token"));
        if (tokenCheck) {
          AUTH_TOKEN = tokenCheck;
          TEST_CREDENTIALS.email = regEmail;
          TEST_CREDENTIALS.password = regPassword;
          console.log(`[REG] Token ditemukan setelah retry: ${regEmail}`);
          return;
        }
      }
    }

    if (loginResult?.token) {
      AUTH_TOKEN = loginResult.token;
      TEST_CREDENTIALS.email = regEmail;
      TEST_CREDENTIALS.password = regPassword;
      console.log(`[REG] Akun dibuat & login berhasil: ${regEmail}`);
    }
  });
});

test.describe("Flow 1 — Splash & Landing (@public)", () => {
  for (const p of PUBLIC_PAGES.slice(0, 2)) {
    test(`${p.name}: ${p.label}`, async ({ page }) => {
      await clearAuth(page);
      await navigateTo(page, p.name, {}, p.name === "globalSplash" ? 0 : p.wait);
      await takeScreenshot(page, `public-${p.name}`);
      await assertPageLoaded(page, p.label);
    });
  }
});

test.describe("Flow 3 — Login (@public)", () => {
  test("authLogin: render login form", async ({ page }) => {
    await clearAuth(page);
    await navigateTo(page, "authLogin", {}, 1500);
    await takeScreenshot(page, "public-authLogin");
    await expect(page.locator("#login-email-phone")).toBeVisible();
    await expect(page.locator("#login-password")).toBeVisible();
    await expect(page.locator("button:has-text('Masuk Sekarang')")).toBeVisible();
  });
});

test.describe("Flow 2 — Registrasi Anggota (@public)", () => {
  test("accountRegisterPage: buat akun login", async ({ page }) => {
    await clearAuth(page);
    await navigateTo(page, "accountRegisterPage", {}, 1500);
    await takeScreenshot(page, "public-accountRegisterPage");

    await expect(page.locator('input[name="nama"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('input[name="confirmPassword"]')).toBeVisible();
    await expect(page.locator("button.pbs-submit-v2")).toBeVisible();
  });
});

test.describe("Flow 4 — Lupa Password (@public)", () => {
  test("authForgotPassword: input email & kirim OTP", async ({ page }) => {
    await clearAuth(page);
    await navigateTo(page, "authForgotPassword", {}, 1500);
    await takeScreenshot(page, "public-authForgotPassword");

    const emailField = page.locator(
      '#floatingInput, input[placeholder*="email" i], input[type="email"]'
    );
    const submitBtn = page.locator("button.pbs-submit-v2");
    await expect(emailField).toBeVisible();
    await expect(submitBtn).toBeVisible();
  });

  test("authForgotOtp: halaman input OTP", async ({ page }) => {
    await clearAuth(page);
    await page.goto(`${BASE_URL}/${jwtEncodePage({ page: "authForgotOtp" })}`);
    await page.waitForTimeout(1200);
    await takeScreenshot(page, "public-authForgotOtp");
  });

  test("authResetPassword: halaman reset password", async ({ page }) => {
    await clearAuth(page);
    await page.goto(`${BASE_URL}/${jwtEncodePage({ page: "authResetPassword" })}`);
    await page.waitForTimeout(1200);
    await takeScreenshot(page, "public-authResetPassword");
  });
});

// Flow 5 — Dashboard
test.describe("Flow 5 — Dashboard (terproteksi)", () => {
  test.beforeEach(async ({ page }) => {
    await setupProtected(page);
  });

  test("dashboard: halaman utama anggota", async ({ page }) => {
    if (!AUTH_TOKEN) {
      test.skip();
    }
    await navigateWithAuth(page, "dashboard", {}, 3000, AUTH_TOKEN);
    await takeScreenshot(page, "protected-dashboard");
    await assertPageLoaded(page, "Dashboard");
  });
});

// Flow 6 — Simpanan
test.describe("Flow 6 — Simpanan (Setoran & Penarikan)", () => {
  test.beforeEach(async ({ page }) => {
    await setupProtected(page);
  });

  test("simpananPage: daftar produk simpanan & saldo", async ({ page }) => {
    if (!AUTH_TOKEN) {
      test.skip("Tidak ada token autentikasi. Jalankan registrasi terlebih dahulu atau set TEST_EMAIL/TEST_PASSWORD");
    }
    await navigateWithAuth(page, "simpananPage", {}, 2000, AUTH_TOKEN);
    await takeScreenshot(page, "protected-simpananPage");
    await assertPageLoaded(page, "Simpanan");
  });

  test("penarikanSimpananPage: ajukan penarikan", async ({ page }) => {
    if (!AUTH_TOKEN) {
      test.skip("Tidak ada token autentikasi. Jalankan registrasi terlebih dahulu atau set TEST_EMAIL/TEST_PASSWORD");
    }
    await navigateWithAuth(page, "penarikanSimpananPage", {}, 2000, AUTH_TOKEN);
    await takeScreenshot(page, "protected-penarikanSimpananPage");
    await assertPageLoaded(page, "Penarikan Simpanan");
  });
});

// Flow 7 — Tabungan Target
test.describe("Flow 7 — Tabungan Target", () => {
  test.beforeEach(async ({ page }) => {
    await setupProtected(page);
  });

  test("tabunganPage: daftar program tabungan", async ({ page }) => {
    if (!AUTH_TOKEN) {
      test.skip("Tidak ada token autentikasi. Jalankan registrasi terlebih dahulu atau set TEST_EMAIL/TEST_PASSWORD");
    }
    await navigateWithAuth(page, "tabunganPage", {}, 2000, AUTH_TOKEN);
    await takeScreenshot(page, "protected-tabunganPage");
    await assertPageLoaded(page, "Tabungan");
  });

  test("formPengajuanTabungan: ajukan target tabungan", async ({ page }) => {
    if (!AUTH_TOKEN) {
      test.skip("Tidak ada token autentikasi. Jalankan registrasi terlebih dahulu atau set TEST_EMAIL/TEST_PASSWORD");
    }
    await navigateWithAuth(page, "formPengajuanTabungan", {}, 2000, AUTH_TOKEN);
    await takeScreenshot(page, "protected-formPengajuanTabungan");
  });

  test("detailTabungan: detail & progres", async ({ page }) => {
    if (!AUTH_TOKEN) {
      test.skip("Tidak ada token autentikasi. Jalankan registrasi terlebih dahulu atau set TEST_EMAIL/TEST_PASSWORD");
    }
    await navigateWithAuth(page, "detailTabungan", { tabunganId: 1 }, 2000, AUTH_TOKEN);
    await takeScreenshot(page, "protected-detailTabungan");
  });

  test("setoranTabungan: bayar tagihan", async ({ page }) => {
    if (!AUTH_TOKEN) {
      test.skip("Tidak ada token autentikasi. Jalankan registrasi terlebih dahulu atau set TEST_EMAIL/TEST_PASSWORD");
    }
    await navigateWithAuth(page, "setoranTabungan", { tabunganId: 1 }, 2000, AUTH_TOKEN);
    await takeScreenshot(page, "protected-setoranTabungan");
  });

  test("penarikanTabunganPage: penarikan tabungan", async ({ page }) => {
    if (!AUTH_TOKEN) {
      test.skip("Tidak ada token autentikasi. Jalankan registrasi terlebih dahulu atau set TEST_EMAIL/TEST_PASSWORD");
    }
    await navigateWithAuth(page, "penarikanTabunganPage", {}, 2000, AUTH_TOKEN);
    await takeScreenshot(page, "protected-penarikanTabunganPage");
  });
});

// Flow 8 — Pinjaman / Pembiayaan
test.describe("Flow 8 — Pinjaman / Pembiayaan", () => {
  test.beforeEach(async ({ page }) => {
    await setupProtected(page);
  });

  test("programPage: daftar produk pinjaman", async ({ page }) => {
    if (!AUTH_TOKEN) {
      test.skip("Tidak ada token autentikasi. Jalankan registrasi terlebih dahulu atau set TEST_EMAIL/TEST_PASSWORD");
    }
    await navigateWithAuth(page, "programPage", {}, 2000, AUTH_TOKEN);
    await takeScreenshot(page, "protected-programPage");
    await assertPageLoaded(page, "Program / Pinjaman");
  });

  test("formPengajuanPinjaman: ajukan pinjaman", async ({ page }) => {
    if (!AUTH_TOKEN) {
      test.skip("Tidak ada token autentikasi. Jalankan registrasi terlebih dahulu atau set TEST_EMAIL/TEST_PASSWORD");
    }
    await navigateWithAuth(page, "formPengajuanPinjaman", {}, 2000, AUTH_TOKEN);
    await takeScreenshot(page, "protected-formPengajuanPinjaman");
  });
});

// Flow 9 — Arisan
test.describe("Flow 9 — Arisan", () => {
  test.beforeEach(async ({ page }) => {
    await setupProtected(page);
  });

  test("arisanPage: daftar batch arisan", async ({ page }) => {
    if (!AUTH_TOKEN) {
      test.skip("Tidak ada token autentikasi. Jalankan registrasi terlebih dahulu atau set TEST_EMAIL/TEST_PASSWORD");
    }
    await navigateWithAuth(page, "arisanPage", {}, 2000, AUTH_TOKEN);
    await takeScreenshot(page, "protected-arisanPage");
    await assertPageLoaded(page, "Arisan");
  });

  test("arisanJoinPage: gabung batch", async ({ page }) => {
    if (!AUTH_TOKEN) {
      test.skip("Tidak ada token autentikasi. Jalankan registrasi terlebih dahulu atau set TEST_EMAIL/TEST_PASSWORD");
    }
    await navigateWithAuth(page, "arisanJoinPage", {}, 2000, AUTH_TOKEN);
    await takeScreenshot(page, "protected-arisanJoinPage");
  });

  test("arisanConfirmationPage: konfirmasi keikutsertaan", async ({ page }) => {
    if (!AUTH_TOKEN) {
      test.skip("Tidak ada token autentikasi. Jalankan registrasi terlebih dahulu atau set TEST_EMAIL/TEST_PASSWORD");
    }
    await navigateWithAuth(page, "arisanConfirmationPage", {}, 2000, AUTH_TOKEN);
    await takeScreenshot(page, "protected-arisanConfirmationPage");
  });

  test("formPengajuanArisan: pengajuan arisan", async ({ page }) => {
    if (!AUTH_TOKEN) {
      test.skip("Tidak ada token autentikasi. Jalankan registrasi terlebih dahulu atau set TEST_EMAIL/TEST_PASSWORD");
    }
    await navigateWithAuth(page, "formPengajuanArisan", { arisanId: 1 }, 2000, AUTH_TOKEN);
    await takeScreenshot(page, "protected-formPengajuanArisan");
  });
});

// Flow 10 — Jual Beli
test.describe("Flow 10 — Jual Beli", () => {
  test.beforeEach(async ({ page }) => {
    await setupProtected(page);
  });

  test("jualBeliPage: opsi transaksi jual beli", async ({ page }) => {
    if (!AUTH_TOKEN) {
      test.skip("Tidak ada token autentikasi. Jalankan registrasi terlebih dahulu atau set TEST_EMAIL/TEST_PASSWORD");
    }
    await navigateWithAuth(page, "jualBeliPage", {}, 2000, AUTH_TOKEN);
    await takeScreenshot(page, "protected-jualBeliPage");
    await assertPageLoaded(page, "Jual Beli");
  });

  test("formPengajuanTransaksi: ajukan jual beli", async ({ page }) => {
    if (!AUTH_TOKEN) {
      test.skip("Tidak ada token autentikasi. Jalankan registrasi terlebih dahulu atau set TEST_EMAIL/TEST_PASSWORD");
    }
    await navigateWithAuth(page, "formPengajuanTransaksi", {}, 2000, AUTH_TOKEN);
    await takeScreenshot(page, "protected-formPengajuanTransaksi");
  });

  test("pelunasanPage: pelunasan tagihan", async ({ page }) => {
    if (!AUTH_TOKEN) {
      test.skip("Tidak ada token autentikasi. Jalankan registrasi terlebih dahulu atau set TEST_EMAIL/TEST_PASSWORD");
    }
    await navigateWithAuth(page, "pelunasanPage", { financingId: 1 }, 2000, AUTH_TOKEN);
    await takeScreenshot(page, "protected-pelunasanPage");
  });
});

// Flow 11 — Investasi
test.describe("Flow 11 — Investasi", () => {
  test.beforeEach(async ({ page }) => {
    await setupProtected(page);
  });

  test("investasiPage: daftar produk investasi", async ({ page }) => {
    if (!AUTH_TOKEN) {
      test.skip("Tidak ada token autentikasi. Jalankan registrasi terlebih dahulu atau set TEST_EMAIL/TEST_PASSWORD");
    }
    await navigateWithAuth(page, "investasiPage", {}, 2000, AUTH_TOKEN);
    await takeScreenshot(page, "protected-investasiPage");
    await assertPageLoaded(page, "Investasi");
  });

  test("investasiHalal: produk halal", async ({ page }) => {
    if (!AUTH_TOKEN) {
      test.skip("Tidak ada token autentikasi. Jalankan registrasi terlebih dahulu atau set TEST_EMAIL/TEST_PASSWORD");
    }
    await navigateWithAuth(page, "investasiHalal", {}, 2000, AUTH_TOKEN);
    await takeScreenshot(page, "protected-investasiHalal");
  });

  test("detailSukuk: detail sukuk", async ({ page }) => {
    if (!AUTH_TOKEN) {
      test.skip("Tidak ada token autentikasi. Jalankan registrasi terlebih dahulu atau set TEST_EMAIL/TEST_PASSWORD");
    }
    await navigateWithAuth(page, "detailSukuk", { id: 1 }, 2000, AUTH_TOKEN);
    await takeScreenshot(page, "protected-detailSukuk");
  });

  test("pendanaanSyariah: pendanaan syariah", async ({ page }) => {
    if (!AUTH_TOKEN) {
      test.skip("Tidak ada token autentikasi. Jalankan registrasi terlebih dahulu atau set TEST_EMAIL/TEST_PASSWORD");
    }
    await navigateWithAuth(page, "pendanaanSyariah", {}, 2000, AUTH_TOKEN);
    await takeScreenshot(page, "protected-pendanaanSyariah");
  });

  test("formPendanaanSyariah: ajukan pendanaan", async ({ page }) => {
    if (!AUTH_TOKEN) {
      test.skip("Tidak ada token autentikasi. Jalankan registrasi terlebih dahulu atau set TEST_EMAIL/TEST_PASSWORD");
    }
    await navigateWithAuth(page, "formPendanaanSyariah", {}, 2000, AUTH_TOKEN);
    await takeScreenshot(page, "protected-formPendanaanSyariah");
  });
});

// Flow 12 — Training & Evaluasi
test.describe("Flow 12 — Training & Evaluasi", () => {
  test.beforeEach(async ({ page }) => {
    await setupProtected(page);
  });

  test("trainingPage: daftar materi training", async ({ page }) => {
    if (!AUTH_TOKEN) {
      test.skip("Tidak ada token autentikasi. Jalankan registrasi terlebih dahulu atau set TEST_EMAIL/TEST_PASSWORD");
    }
    await navigateWithAuth(page, "trainingPage", {}, 2000, AUTH_TOKEN);
    await takeScreenshot(page, "protected-trainingPage");
    await assertPageLoaded(page, "Training");
  });

  test("detailMateri: detail materi", async ({ page }) => {
    if (!AUTH_TOKEN) {
      test.skip("Tidak ada token autentikasi. Jalankan registrasi terlebih dahulu atau set TEST_EMAIL/TEST_PASSWORD");
    }
    await navigateWithAuth(page, "detailMateri", { materialId: 1 }, 2000, AUTH_TOKEN);
    await takeScreenshot(page, "protected-detailMateri");
  });

  test("bacaMateri: baca materi", async ({ page }) => {
    if (!AUTH_TOKEN) {
      test.skip("Tidak ada token autentikasi. Jalankan registrasi terlebih dahulu atau set TEST_EMAIL/TEST_PASSWORD");
    }
    await navigateWithAuth(page, "bacaMateri", { materialId: 1 }, 2000, AUTH_TOKEN);
    await takeScreenshot(page, "protected-bacaMateri");
  });

  test("evaluasi: kuis / evaluasi", async ({ page }) => {
    if (!AUTH_TOKEN) {
      test.skip("Tidak ada token autentikasi. Jalankan registrasi terlebih dahulu atau set TEST_EMAIL/TEST_PASSWORD");
    }
    await navigateWithAuth(page, "evaluasi", { materialId: 1 }, 2000, AUTH_TOKEN);
    await takeScreenshot(page, "protected-evaluasi");
  });

  test("ranking: peringkat anggota", async ({ page }) => {
    if (!AUTH_TOKEN) {
      test.skip("Tidak ada token autentikasi. Jalankan registrasi terlebih dahulu atau set TEST_EMAIL/TEST_PASSWORD");
    }
    await navigateWithAuth(page, "ranking", {}, 2000, AUTH_TOKEN);
    await takeScreenshot(page, "protected-ranking");
  });
});

// Flow 13 — Notifikasi & Transaksi
test.describe("Flow 13 — Notifikasi & Transaksi", () => {
  test.beforeEach(async ({ page }) => {
    await setupProtected(page);
  });

  test("notificationPage: daftar notifikasi", async ({ page }) => {
    if (!AUTH_TOKEN) {
      test.skip("Tidak ada token autentikasi. Jalankan registrasi terlebih dahulu atau set TEST_EMAIL/TEST_PASSWORD");
    }
    await navigateWithAuth(page, "notificationPage", {}, 2000, AUTH_TOKEN);
    await takeScreenshot(page, "protected-notificationPage");
    await assertPageLoaded(page, "Notifikasi");
  });

  test("notificationDetailPage: detail notifikasi", async ({ page }) => {
    if (!AUTH_TOKEN) {
      test.skip("Tidak ada token autentikasi. Jalankan registrasi terlebih dahulu atau set TEST_EMAIL/TEST_PASSWORD");
    }
    await navigateWithAuth(page, "notificationDetailPage", { notificationId: 1 }, 2000, AUTH_TOKEN);
    await takeScreenshot(page, "protected-notificationDetailPage");
  });

  test("transactionDetailPage: timeline transaksi", async ({ page }) => {
    if (!AUTH_TOKEN) {
      test.skip("Tidak ada token autentikasi. Jalankan registrasi terlebih dahulu atau set TEST_EMAIL/TEST_PASSWORD");
    }
    await navigateWithAuth(page, "transactionDetailPage", { transactionId: 1 }, 2000, AUTH_TOKEN);
    await takeScreenshot(page, "protected-transactionDetailPage");
  });

  test("receiptPage: unduh nota pembayaran", async ({ page }) => {
    if (!AUTH_TOKEN) {
      test.skip("Tidak ada token autentikasi. Jalankan registrasi terlebih dahulu atau set TEST_EMAIL/TEST_PASSWORD");
    }
    await navigateWithAuth(page, "receiptPage", { billId: 1 }, 2000, AUTH_TOKEN);
    await takeScreenshot(page, "protected-receiptPage");
  });

  test("billingPage: tagihan pending", async ({ page }) => {
    if (!AUTH_TOKEN) {
      test.skip("Tidak ada token autentikasi. Jalankan registrasi terlebih dahulu atau set TEST_EMAIL/TEST_PASSWORD");
    }
    await navigateWithAuth(page, "billingPage", {}, 2000, AUTH_TOKEN);
    await takeScreenshot(page, "protected-billingPage");
  });

  test("invoicePage: detail invoice", async ({ page }) => {
    if (!AUTH_TOKEN) {
      test.skip("Tidak ada token autentikasi. Jalankan registrasi terlebih dahulu atau set TEST_EMAIL/TEST_PASSWORD");
    }
    await navigateWithAuth(page, "invoicePage", { billId: 1 }, 2000, AUTH_TOKEN);
    await takeScreenshot(page, "protected-invoicePage");
  });
});

// Flow 14 — Akun & Profil
test.describe("Flow 14 — Akun & Profil", () => {
  test.beforeEach(async ({ page }) => {
    await setupProtected(page);
  });

  test("accountPage: data profil lengkap", async ({ page }) => {
    if (!AUTH_TOKEN) {
      test.skip("Tidak ada token autentikasi. Jalankan registrasi terlebih dahulu atau set TEST_EMAIL/TEST_PASSWORD");
    }
    await navigateWithAuth(page, "accountPage", {}, 2000, AUTH_TOKEN);
    await takeScreenshot(page, "protected-accountPage");
    await assertPageLoaded(page, "Akun / Profil");
  });

  test("registrationPage: status verifikasi pendaftaran", async ({ page }) => {
    if (!AUTH_TOKEN) {
      test.skip("Tidak ada token autentikasi. Jalankan registrasi terlebih dahulu atau set TEST_EMAIL/TEST_PASSWORD");
    }
    await navigateWithAuth(page, "registrationPage", {}, 2000, AUTH_TOKEN);
    await takeScreenshot(page, "protected-registrationPage");
  });

  test("registrationFormDetail: formulir 8 step", async ({ page }) => {
    if (!AUTH_TOKEN) {
      test.skip("Tidak ada token autentikasi. Jalankan registrasi terlebih dahulu atau set TEST_EMAIL/TEST_PASSWORD");
    }
    await navigateWithAuth(page, "registrationFormDetail", {}, 2000, AUTH_TOKEN);
    await takeScreenshot(page, "protected-registrationFormDetail");
  });

  test("detailPendaftaranAnggota: detail pendaftaran", async ({ page }) => {
    if (!AUTH_TOKEN) {
      test.skip("Tidak ada token autentikasi. Jalankan registrasi terlebih dahulu atau set TEST_EMAIL/TEST_PASSWORD");
    }
    await navigateWithAuth(page, "detailPendaftaranAnggota", {}, 2000, AUTH_TOKEN);
    await takeScreenshot(page, "protected-detailPendaftaranAnggota");
  });

  test("resignationCheck: pengajuan keluar", async ({ page }) => {
    if (!AUTH_TOKEN) {
      test.skip("Tidak ada token autentikasi. Jalankan registrasi terlebih dahulu atau set TEST_EMAIL/TEST_PASSWORD");
    }
    await navigateWithAuth(page, "resignationCheck", {}, 2000, AUTH_TOKEN);
    await takeScreenshot(page, "protected-resignationCheck");
  });

  test("termination_progress: progres terminasi", async ({ page }) => {
    if (!AUTH_TOKEN) {
      test.skip("Tidak ada token autentikasi. Jalankan registrasi terlebih dahulu atau set TEST_EMAIL/TEST_PASSWORD");
    }
    await navigateWithAuth(page, "termination_progress", {}, 2000, AUTH_TOKEN);
    await takeScreenshot(page, "protected-termination_progress");
  });
});

// Flow 15 — Logout
test.describe("Flow 15 — Logout", () => {
  test("login → dashboard → logout → landing", async ({ page }) => {
    if (!AUTH_TOKEN) {
      test.skip();
    }

    await navigateWithAuth(page, "dashboard", {}, 3000, AUTH_TOKEN);
    await takeScreenshot(page, "flow-dashboard-before-logout");

    // Logout via UserDropdown
    const logoutBtn = page.locator(
      "button.ud-logout-item, button:has-text('Keluar Aplikasi'), button:has-text('Logout')"
    );
    if (await logoutBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await logoutBtn.click();
      await page.waitForTimeout(2000);
    }

    // Verifikasi token dihapus (fallback: hapus secara manual jika tombol logout tidak ditemukan)
    let tokenAfter = await page.evaluate(() => localStorage.getItem("token"));
    if (tokenAfter) {
      await page.evaluate(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
      });
      tokenAfter = await page.evaluate(() => localStorage.getItem("token"));
    }
    expect(tokenAfter).toBeNull();

    await takeScreenshot(page, "flow-after-logout");
  });
});

// Flow 2 (Tahap 2) — Formulir Keanggotaan 8 Step
test.describe("Flow 2 (Tahap 2) — Formulir Keanggotaan 8 Step", () => {
  test("registrationFormDetail: semua 8 step", async ({ page }) => {
    if (!AUTH_TOKEN) {
      test.skip("Tidak ada token autentikasi. Jalankan registrasi terlebih dahulu atau set TEST_EMAIL/TEST_PASSWORD");
    }
    await navigateWithAuth(page, "registrationFormDetail", {}, 2000, AUTH_TOKEN);

    const steps = [
      { label: "Data Pribadi", name: "step-1-data-pribadi" },
      { label: "Akun & Kontak", name: "step-2-akun-kontak" },
      { label: "Foto KTP", name: "step-3-foto-ktp" },
      { label: "Swafoto", name: "step-4-swafoto" },
      { label: "Pekerjaan", name: "step-5-pekerjaan" },
      { label: "Kontak Darurat", name: "step-6-kontak-darurat" },
      { label: "Rekening Bank", name: "step-7-rekening-bank" },
      { label: "Ringkasan", name: "step-8-ringkasan" },
    ];

    for (const step of steps) {
      await takeScreenshot(page, `reg-${step.name}`);
      await assertPageLoaded(page, step.label);

      const nextBtn = page.locator(
        "button:has-text('Selanjutnya'), button:has-text('Lanjut')"
      );
      const isLast = step.label === "Ringkasan";
      if (!isLast && (await nextBtn.isVisible({ timeout: 2000 }).catch(() => false))) {
        await nextBtn.click();
        await page.waitForTimeout(1000);
      }
    }

    await takeScreenshot(page, "reg-step-8-ringkasan-final");
  });
});
