/**
 * Master Index — E2E Test Modules (@kkpusid)
 *
 * Mengimpor seluruh modul E2E agar dapat dijalankan bersama.
 * testDir diarahkan ke ./e2e/modules (lihat playwright.config.mjs), sehingga
 * semua *.spec.mjs di bawah folder ini otomatis ditemukan. File index ini
 * disediakan untuk impor eksplisit / dokumentasi.
 *
 * Usage:
 *   # Jalankan semua modul
 *   npx playwright test e2e/modules/
 *
 *   # Modul tertentu
 *   npx playwright test e2e/modules/user-workflow/
 *   npx playwright test e2e/modules/auth-ui/
 *   npx playwright test e2e/modules/derived-pages/
 *
 *   # Dengan login (protected pages)
 *   TEST_EMAIL=user@example.com TEST_PASSWORD=P@ssw0rd123! \
 *     npx playwright test e2e/modules/
 *
 *   # Mode headed (lihat browser)
 *   npx playwright test e2e/modules/ --headed
 *
 *   # HTML report
 *   npx playwright test e2e/modules/ --reporter=html
 *   npx playwright show-report
 */

// ── User Workflow E2E (New & Returning Member) — suite utama ──
import "./user-workflow/user-workflow.spec.mjs";

// ── P1: Auth UI (register form, login, forgot → OTP → reset) ──
import "./auth-ui/auth-ui.spec.mjs";

// ── P2: Derived / Detail Pages (billing, invoice, receipt, detail, dll.) ──
import "./derived-pages/derived-pages.spec.mjs";

// ── Per-domain smoke specs (01–16) ──
import "./01-splash-landing/splash-landing.spec.mjs";
import "./02-registrasi/registrasi.spec.mjs";
import "./03-login/login.spec.mjs";
import "./04-lupa-password/lupa-password.spec.mjs";
import "./05-dashboard/dashboard.spec.mjs";
import "./06-simpanan/simpanan-wajib/simpanan-wajib.spec.mjs";
import "./06-simpanan/simpanan-sukarela/simpanan-sukarela.spec.mjs";
import "./06-simpanan/simpanan-pokok/simpanan-pokok.spec.mjs";
import "./07-tabungan/tabungan.spec.mjs";
import "./08-pinjaman/pinjaman.spec.mjs";
import "./09-arisan/arisan.spec.mjs";
import "./10-jual-beli/jual-beli.spec.mjs";
import "./11-investasi/investasi.spec.mjs";
import "./12-training/training.spec.mjs";
import "./13-notifikasi/notifikasi.spec.mjs";
import "./14-akun-profil/akun-profil.spec.mjs";
import "./15-logout/logout.spec.mjs";
import "./16-alur-penggunaan/alur-penggunaan.spec.mjs";