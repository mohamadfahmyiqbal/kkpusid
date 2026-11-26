import { defineConfig } from "@playwright/test";

// ── Environment ──
const BASE_URL = process.env.BASE_URL || "http://localhost:5173";
const API_BASE_URL = process.env.VITE_API_BASE_URL || "http://localhost:3000/api";

// ── Test Credentials ──
const TEST_EMAIL = process.env.TEST_EMAIL || "e2e.test@kkpus.id";
const TEST_PASSWORD = process.env.TEST_PASSWORD || "P@ssw0rd123!";

// ── Screenshot Output ──
const SCREENSHOT_DIR = "e2e/screenshots";

// ── Public Pages (No Auth Required) ──
const PUBLIC_PAGES = [
  { name: "globalSplash", label: "Splash Screen", wait: 1200 },
  { name: "landingPage", label: "Landing Page", wait: 2500 },
  { name: "authLogin", label: "Login Page", wait: 1500 },
  { name: "accountRegisterPage", label: "Buat Akun Login", wait: 1500 },
  { name: "authForgotPassword", label: "Lupa Password", wait: 1500 },
  { name: "authForgotOtp", label: "Input OTP", wait: 1200 },
  { name: "authResetPassword", label: "Reset Password", wait: 1200 },
  { name: "privacyPolicy", label: "Kebijakan Privasi", wait: 1500 },
  { name: "termsConditions", label: "Syarat & Ketentuan", wait: 1500 },
];

// ── Protected Pages (Auth Required) ──
const PROTECTED_PAGES = [
  // Dashboard
  { name: "dashboard", label: "Dashboard", wait: 3000 },
  
  // Simpanan
  { name: "simpananPage", label: "Simpanan", wait: 2000 },
  { name: "penarikanSimpananPage", label: "Penarikan Simpanan", wait: 2000 },
  
  // Tabungan
  { name: "tabunganPage", label: "Tabungan", wait: 2000 },
  { name: "formPengajuanTabungan", label: "Ajukan Tabungan Target", wait: 2000 },
  { name: "detailTabungan", label: "Detail Tabungan", wait: 2000 },
  { name: "setoranTabungan", label: "Setoran Tabungan", wait: 2000 },
  { name: "penarikanTabunganPage", label: "Penarikan Tabungan", wait: 2000 },
  
  // Pinjaman
  { name: "programPage", label: "Program / Pinjaman", wait: 2000 },
  { name: "formPengajuanPinjaman", label: "Ajukan Pinjaman", wait: 2000 },
  
  // Arisan
  { name: "arisanPage", label: "Arisan", wait: 2000 },
  { name: "arisanJoinPage", label: "Gabung Arisan", wait: 2000 },
  { name: "arisanConfirmationPage", label: "Konfirmasi Arisan", wait: 2000 },
  { name: "formPengajuanArisan", label: "Pengajuan Arisan", wait: 2000 },
  
  // Jual Beli
  { name: "jualBeliPage", label: "Jual Beli", wait: 2000 },
  { name: "formPengajuanTransaksi", label: "Ajukan Jual Beli", wait: 2000 },
  { name: "pelunasanPage", label: "Pelunasan", wait: 2000 },
  
  // Investasi
  { name: "investasiPage", label: "Investasi", wait: 2000 },
  { name: "investasiHalal", label: "Investasi Halal", wait: 2000 },
  { name: "detailSukuk", label: "Detail Sukuk", wait: 2000 },
  { name: "pendanaanSyariah", label: "Pendanaan Syariah", wait: 2000 },
  { name: "formPendanaanSyariah", label: "Ajukan Pendanaan", wait: 2000 },
  
  // Training
  { name: "trainingPage", label: "Training", wait: 2000 },
  { name: "detailMateri", label: "Detail Materi", wait: 2000 },
  { name: "bacaMateri", label: "Baca Materi", wait: 2000 },
  { name: "evaluasi", label: "Evaluasi / Kuis", wait: 2000 },
  { name: "ranking", label: "Ranking", wait: 2000 },
  
  // Notifikasi & Transaksi
  { name: "notificationPage", label: "Notifikasi", wait: 2000 },
  { name: "notificationDetailPage", label: "Detail Notifikasi", wait: 2000 },
  { name: "transactionDetailPage", label: "Detail Transaksi", wait: 2000 },
  { name: "receiptPage", label: "Nota / Receipt", wait: 2000 },
  { name: "billingPage", label: "Billing / Tagihan", wait: 2000 },
  { name: "invoicePage", label: "Invoice", wait: 2000 },
  
  // Akun & Profil
  { name: "accountPage", label: "Akun / Profil", wait: 2000 },
  { name: "registrationPage", label: "Status Pendaftaran", wait: 2000 },
  { name: "registrationFormDetail", label: "Formulir Pendaftaran 8 Step", wait: 2000 },
  { name: "detailPendaftaranAnggota", label: "Detail Pendaftaran Anggota", wait: 2000 },
  { name: "resignationCheck", label: "Resignasi Anggota", wait: 2000 },
  { name: "termination_progress", label: "Progres Terminasi", wait: 2000 },
];

export default defineConfig({
  testDir: "./e2e/modules/user-workflow",
  testMatch: "**/*.spec.mjs",
  timeout: 120000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: process.env.CI ? "html" : "list",
  outputDir: "test-results",
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    actionTimeout: 10000,
    navigationTimeout: 20000,
    viewport: { width: 1440, height: 900 },
  },
  projects: [
    // Test hanya dijalankan pada viewport mobile (per instruksi).
    // Project "chromium" (desktop) dinonaktifkan.
    // {
    //   name: "chromium",
    //   use: {
    //     browserName: "chromium",
    //     channel: "chrome",
    //   },
    // },
    {
      name: "mobile",
      use: {
        browserName: "chromium",
        channel: "chrome",
        viewport: { width: 375, height: 812 }, // iPhone X
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true,
        // Perangkat kamera palsu bawaan browser (bukan mock data) agar alur
        // kamera (Foto KTP/Swafoto) dapat diuji tanpa hardware fisik.
        launchOptions: {
          args: [
            "--use-fake-device-for-media-stream",
            "--use-fake-ui-for-media-stream",
          ],
        },
      },
    },
  ],
});

// Export config values
export {
  BASE_URL,
  API_BASE_URL,
  TEST_EMAIL,
  TEST_PASSWORD,
  SCREENSHOT_DIR,
  PUBLIC_PAGES,
  PROTECTED_PAGES,
};
