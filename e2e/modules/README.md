# E2E Test — User Workflow

Dokumentasi lengkap untuk menjalankan E2E test dengan Playwright, terorganisir sebagai **satu user workflow end-to-end** yang mengganti struktur per-module sebelumnya.

---

## 📁 STRUKTUR FOLDER

```
e2e/
├── modules/
│   └── user-workflow/            # Satu-satunya test E2E (New & Returning Member)
│       └── user-workflow.spec.mjs
├── screenshots/                  # Output screenshot per workflow step
│   └── user-workflow/
├── helpers.mjs                   # Helper functions (shared)
├── index.mjs                     # Master index (import user-workflow)
└── fixtures/                     # Test fixtures (optional)
```

> **Catatan:** Struktur per-module lama (`01-splash-landing/` … `16-alur-penggunaan/`) sudah **diganti** oleh satu workflow pengguna menyeluruh di `user-workflow/user-workflow.spec.mjs` sesuai `ALUR-PER-MODUL.md`.

---

## 🚀 QUICK START

### 1. Install Dependencies

```bash
npm install
npx playwright install chromium
```

### 2. Start Dev Server

```bash
npm run dev
# → http://localhost:5173
```

### 3. Run Tests

```bash
# Jalankan semua user workflow test
npm run e2e

# Atau langsung
npx playwright test e2e/modules/user-workflow/
```

---

## 📋 COMMANDS

### Run All User Workflow Tests

```bash
# Semua test (mobile viewport)
npm run e2e

# Semua test (headed / visible browser)
npm run e2e:headed
```

### Run Specific Flow

```bash
# Flow 1 - New Member Journey
npx playwright test e2e/modules/user-workflow/user-workflow.spec.mjs --grep "Flow 1"

# Flow 2 - Returning Member Journey
npx playwright test e2e/modules/user-workflow/user-workflow.spec.mjs --grep "Flow 2"
```

### Run with Authentication

Untuk test halaman terproteksi (Dashboard, Simpanan, dll):

```bash
# Set credentials via environment
TEST_EMAIL=user@example.com TEST_PASSWORD=P@ssw0rd123! \
  npx playwright test e2e/modules/user-workflow/

# Atau via npm script
npm run e2e:login
```

### Screenshots

```bash
# Capture screenshots (automatic per step)
npx playwright test e2e/modules/user-workflow/ --screenshot=on

# Screenshots for every test
npx playwright test e2e/modules/user-workflow/ --screenshot=on
```

### HTML Report

```bash
# Generate report
npx playwright test e2e/modules/user-workflow/ --reporter=html

# Open report
npm run e2e:html
# → http://localhost:9323
```

---

## 📸 SCREENSHOT OUTPUT

Screenshot disimpan di `e2e/screenshots/user-workflow/` dengan struktur:

```
e2e/screenshots/user-workflow/
├── wf-01-splash.png
├── wf-01-landing.png
├── wf-01-dashboard-candidate.png
├── wf-02-step-1-data-pribadi.png
├── wf-02-step-2-akun-kontak.png
├── wf-02-step-3-foto-ktp.png
├── wf-02-step-4-swafoto.png
├── wf-02-step-5-pekerjaan.png
├── wf-02-step-6-kontak-darurat.png
├── wf-02-step-7-rekening-bank.png
├── wf-02-step-8-ringkasan.png
├── wf-02-redirect-registration-status.png
├── wf-03-approval-chain.png
├── wf-04-dashboard-reguler.png
├── wf-04-simpanan.png
├── wf-04-tabungan.png
├── wf-04-program.png
├── wf-04-arisan.png
├── wf-04-jualbeli.png
├── wf-04-investasi.png
├── wf-04-training.png
├── wf-04-notifikasi.png
├── wf-04-akun.png
├── wf-04-logout.png
├── wf-21-dashboard.png
├── wf-21-simpanan.png
├── wf-21-penarikan.png
├── wf-21-akun.png
└── wf-21-logout.png
```

### Mobile Screenshots

Test mobile secara otomatis menambahkan suffix `-mobile`:

```bash
npx playwright test e2e/modules/user-workflow/ --project=mobile
# Output: wf-01-splash-mobile.png
```

---

## 🔐 AUTHENTICATION

### Public Pages (No Auth)

Workflow dimulai dari halaman publik:
- Splash Screen
- Landing Page
- Login Page

### Protected Pages (Auth Required)

Workflow otomatis login via API jika credentials tersedia.

**Option 1: Environment Variables (Recommended)**

```bash
TEST_EMAIL=user@example.com TEST_PASSWORD=P@ssw0rd123! \
  npx playwright test e2e/modules/user-workflow/
```

**Option 2: API Login in Test**

Test akan otomatis login via API jika credentials tersedia.

**Option 3: Manual Token Injection**

```javascript
await page.addInitScript(({ t }) => {
  localStorage.setItem("token", t);
}, { t: "your-jwt-token" });
```

---

## 🛠 HELPERS

File `e2e/helpers.mjs` menyediakan functions yang bisa digunakan:

| Function | Description |
|----------|-------------|
| `navigateTo(page, pageName, extra, waitMs)` | Navigate ke halaman via route token |
| `takeScreenshot(page, name)` | Screenshot dengan auto folder mapping |
| `clearAuth(page)` | Clear localStorage token |
| `apiLogin(page, email, password)` | Login via API call |
| `attemptLogin(page, email, password)` | Login via UI form |
| `waitForLoginToken(page)` | Wait hingga token ada di localStorage |
| `navigateWithAuth(page, pageName, extra, waitMs, token)` | Navigate dengan auth token |
| `jwtEncodePage(payload, options)` | Encode route token (unsigned JWT) |
| `assertPageLoaded(page, label)` | Assert halaman loaded |
| `waitForPageReady(page, timeout)` | Wait hingga page fully loaded |

---

## 📊 USER WORKFLOW OVERVIEW

| Flow | Test | Deskripsi |
|------|------|-----------|
| **Flow 1** | `1-1: Splash → Landing → Register → Login → Dashboard` | New Member Journey: onboarding sampai dashboard calon anggota |
| **Flow 1** | `1-2: Form 8-Step → Kirim → SweetAlert → RegistrationPage` | Formulir keanggotaan 8 langkah + submit + redirect ke status pendaftaran |
| **Flow 1** | `1-3: Approval Chain (Pengawas → Ketua → Bayar → Bendahara → APPROVED)` | Rantai approval pendaftaran anggota end-to-end |
| **Flow 1** | `1-4: Dashboard Anggota Reguler → Modules 06-14 → Logout` | Akses penuh modul pasca-approval + logout |
| **Flow 2** | `2-1: Login → Dashboard → Simpanan → Penarikan → Akun → Logout` | Returning Member Journey |

---

## 🐛 TROUBLESHOOTING

### Test Fails Immediately

```bash
# Pastikan dev server running
npm run dev

# Install Playwright browsers
npx playwright install chromium
```

### Token Expired / Auth Failed

```bash
# Clear cache & retry
rm -rf test-results/
npx playwright test e2e/modules/user-workflow/ --retries=0
```

### Screenshot Not Saved

Check output directory permissions:

```bash
mkdir -p e2e/screenshots
chmod -R 755 e2e/screenshots
```

### Network Timeout

Increase timeout in `playwright.config.mjs`:

```javascript
timeout: 300000, // 5 minutes
navigationTimeout: 30000,
```

---

## 📚 REFERENCES

- [Playwright Documentation](https://playwright.dev/)
- [Training E2E Flow Docs](../../docs/training-e2e-flow.md)
- [Helpers Source](../helpers.mjs)
- [ALUR-PER-MODUL.md](../ALUR-PER-MODUL.md) — Dokumentasi alur pengguna per modul

---

*Last updated: 2026-11-26*
