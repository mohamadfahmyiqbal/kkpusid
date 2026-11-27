# E2E Screenshots

Folder ini menyimpan screenshot dari Playwright E2E tests untuk dokumentasi dan visual regression.

## 📚 Dokumentasi

| File | Deskripsi |
|------|-----------|
| [TUTORIAL.md](./TUTORIAL.md) | 📖 Tutorial penggunaan aplikasi lengkap |
| [NAMING-CONVENTION.md](./NAMING-CONVENTION.md) | 📸 Standar penamaan screenshot |
| [README.md](./README.md) | 📁 Dokumentasi struktur folder (file ini) |

## 📁 Struktur Folder

```
e2e/screenshots/
├── 01-splash-landing/     # Splash & Landing pages
├── 02-registrasi/         # Registrasi akun baru
├── 03-login/              # Login authentication
├── 04-lupa-password/      # Forgot password & reset
├── 05-dashboard/          # Dashboard & billing flow
├── 06-simpanan/           # Simpanan (Pokok, Wajib, Sukarela)
│   ├── simpanan-pokok/    # Detail Simpanan Pokok
│   ├── simpanan-wajib/    # Detail Simpanan Wajib
│   └── simpanan-sukarela/ # Detail Simpanan Sukarela
├── 07-tabungan/           # Tabungan Target
├── 08-pinjaman/           # Pinjaman/Pembiayaan
├── 09-arisan/             # Arisan
├── 10-jual-beli/          # Jual Beli
├── 11-investasi/          # Investasi
├── 12-training/           # Training & Edukasi
├── 13-notifikasi/         # Notifikasi & Transaksi
├── 14-akun-profil/        # Akun & Profil
├── 15-logout/             # Logout
├── 16-alur-penggunaan/    # User Flow E2E
├── auth-ui/               # Auth UI comprehensive tests (AU-xx)
├── derived-pages/         # Derived pages tests (DP-xx)
└── user-workflow/         # Full user journey tests (WF-xx)
    ├── wf-01-splash-landing/
    ├── wf-02-form-8step/
    ├── wf-03-approval-payment/
    ├── wf-04-dashboard-modules/
    │   └── simpanan/
    └── wf-21-returning-journey/
```

## 📝 Konvensi Penamaan

### Format Standar
```
{module}-{step}-{description}-{platform}.png
```

### Komponen
| Bagian | Deskripsi | Contoh |
|--------|-----------|--------|
| `module` | Nomor/kategori module | `01`, `06`, `wf-01` |
| `step` | Urutan langkah (2 digit) | `01`, `02`, `03` |
| `description` | Deskripsi singkat (kebab-case) | `splash-screen`, `form-data-pribadi` |
| `platform` | Platform target (auto) | `mobile` |

### Contoh
```
01-splash-landing/
  └── 01-01-splash-screen-mobile.png
  └── 01-02-landing-page-mobile.png

06-simpanan/
  ├── 06-01-daftar-simpanan-mobile.png
  └── simpanan-pokok/
      └── 06-01-01-detail-pokok-mobile.png

user-workflow/
  └── wf-01-splash-landing/
      └── wf-01-01-splash-mobile.png
```

> 📖 **Detail lengkap:** Lihat [NAMING-CONVENTION.md](./NAMING-CONVENTION.md)

## 📋 Daftar Test Coverage

### Module Tests (01-15)

| Module | Folder | Prefix | Example | Status |
|--------|--------|--------|---------|--------|
| 01 | `01-splash-landing/` | `01-`, `02-` | `01-globalSplash-mobile.png` | ✅ |
| 02 | `02-registrasi/` | `04-` | `04-register-page-mobile.png` | ✅ |
| 03 | `03-login/` | `03-` | `03-login-page-mobile.png` | ✅ |
| 04 | `04-lupa-password/` | `04-` | `04-lupa-password-mobile.png` | ✅ |
| 05 | `05-dashboard/` | `dashboard-`, `billingflow-`, `reg-` | `dashboard-main-mobile.png` | ✅ |
| 06 | `06-simpanan/` | `simpanan-*` | `simpanan-pokok-main-mobile.png` | ✅ |
| 07 | `07-tabungan/` | `tabungan-` | `tabungan-main-mobile.png` | ⏳ |
| 08 | `08-pinjaman/` | `pinjaman-`, `program-` | `pinjaman-main-mobile.png` | ⏳ |
| 09 | `09-arisan/` | `arisan-` | `arisan-main-mobile.png` | ⏳ |
| 10 | `10-jual-beli/` | `jualbeli-`, `pelunasan-` | `jualbeli-main-mobile.png` | ⏳ |
| 11 | `11-investasi/` | `investasi-`, `sukuk-` | `investasi-main-mobile.png` | ⏳ |
| 12 | `12-training/` | `training-`, `materi-` | `training-main-mobile.png` | ⏳ |
| 13 | `13-notifikasi/` | `notifikasi-`, `transaksi-` | `notifikasi-main-mobile.png` | ⏳ |
| 14 | `14-akun-profil/` | `akun-`, `profil-` | `akun-profil-main-mobile.png` | ⏳ |
| 15 | `15-logout/` | `logout-` | `logout-main-mobile.png` | ⏳ |

### User Workflow Tests (WF-xx)

| ID | Test | Folder | Screenshots | Status |
|----|------|--------|-------------|--------|
| `wf-01` | Landing → Splash → Dashboard Calon Anggota | `user-workflow/` | `splash`, `landing`, `dashboard-candidate` | ✅ |
| `wf-02` | Form 8-Step → Kirim → SweetAlert | `user-workflow/` | `step-1-data-pribadi` → `step-8-ringkasan` | ✅ |
| `wf-03` | Approval Chain + Pembayaran UI | `user-workflow/` | `pembayaran-registration-page`, `billing-page`, `invoice-page` | ✅ |
| `wf-04` | Dashboard Anggota Reguler → Modul 06-14 | `user-workflow/` | `dashboard-reguler`, `simpanan-*`, `tabungan`, dll | ✅ |
| `wf-21` | Returning Member Journey | `user-workflow/` | `dashboard`, `simpanan`, `penarikan`, `akun` | ✅ |

### Auth UI Tests (AU-xx)

| ID | Test | Folder | Screenshots | Status |
|----|------|--------|-------------|--------|
| `au-01` | Register form → SweetAlert | `auth-ui/` | `register-form`, `register-success` | ✅ |
| `au-02` | Login form → Dashboard | `auth-ui/` | `login-form`, `login-success` | ✅ |
| `au-03` | Forgot password → OTP → Reset | `auth-ui/` | `forgot-form`, `otp-page`, `reset-success` | ✅ |
| `au-04` | Resend OTP | `auth-ui/` | `before-resend`, `after-resend` | ✅ |

### Derived Pages Tests (DP-xx)

| ID | Test | Folder | Screenshots | Status |
|----|------|--------|-------------|--------|
| `dp-01` | Billing Page | `derived-pages/` | `billing` | ✅ |
| `dp-04` | Transaction Detail | `derived-pages/` | `transaction-detail` | ✅ |
| `dp-05` | Detail Tabungan | `derived-pages/` | `detail-tabungan` | ✅ |

## 🔧 Maintenance

### Hapus Screenshot Lama
```bash
# Hapus semua screenshot dari folder tertentu
rm -rf e2e/screenshots/05-dashboard/*.png

# Hapus screenshot dengan suffix ganda (bug lama)
rm e2e/screenshots/user-workflow/*mobile-mobile.png
```

### Rename File dengan Suffix Ganda
```bash
# Fix double -mobile-mobile suffix
cd e2e/screenshots/user-workflow
for f in *mobile-mobile.png; do 
  mv "$f" "${f/-mobile-mobile.png/-mobile.png}"
done
```

### Jalankan Test untuk Generate Screenshot
```bash
# Module spesifik
npx playwright test e2e/modules/03-login/login.spec.mjs --project=mobile

# Semua test dalam folder
npx playwright test e2e/modules/06-simpanan/ --project=mobile

# User workflow
npx playwright test e2e/modules/user-workflow/user-workflow.spec.mjs --project=mobile
```

## 📊 Statistik

Total file dan ukuran (per Nov 27, 2026):

| Folder | Files | Size |
|--------|-------|------|
| `user-workflow/` | 40 | 20 MB |
| `auth-ui/` | 15 | 5.5 MB |
| `05-dashboard/` | ~20 | 5.2 MB |
| `06-simpanan/` | ~22 | 4.0 MB |
| `04-lupa-password/` | ~12 | 2.6 MB |
| `01-splash-landing/` | ~8 | 2.6 MB |
| `03-login/` | ~8 | 2.2 MB |
| `02-registrasi/` | ~4 | 712 KB |
| `derived-pages/` | 3 | 788 KB |
| **TOTAL** | **~132** | **~43 MB** |

Cek ukuran dengan:
```bash
du -sh e2e/screenshots/*/
```

## ⚠️ Catatan Penting

1. **Suffix `-mobile`** ditambahkan otomatis oleh helper `takeScreenshot()` saat viewport width < 480px
2. **Jangan** menambahkan `-mobile` manual di nama file untuk menghindari suffix ganda (`-mobile-mobile.png`)
3. Screenshot di-**overwrite** setiap test run (tidak ada incremental)
4. Folder mapping otomatis berdasarkan prefix nama file (lihat `helpers.mjs` → `getScreenshotFolder()`)
5. Untuk visual regression testing, commit screenshot ke git setelah perubahan UI signifikan
6. Empty folders (07-15) akan terisi saat test modules terkait dijalankan

## 🔗 Helper Functions

File: `e2e/helpers.mjs`

```javascript
// Take screenshot dengan auto-detect mobile/desktop
await takeScreenshot(page, "nama-screenshot");
// Output: e2e/screenshots/<folder>/nama-screenshot-mobile.png

// Navigate ke halaman dengan JWT token
await navigateTo(page, "simpananPage", {}, 2000);
// Output: http://localhost:5173/{routeToken}
```

## 📚 Related Documentation

- Test modules: `e2e/modules/`
- Playwright config: `e2e/playwright.config.mjs`
- Helpers: `e2e/helpers.mjs`
- ALUR-PER-MODUL: `e2e/ALUR-PER-MODUL.md`
