# User Workflow E2E Screenshots

Folder ini menyimpan screenshot dari test **User Workflow E2E** — alur lengkap pengguna dari registrasi hingga penggunaan semua modul.

## 📁 Struktur Folder

```
user-workflow/
├── wf-01-splash-landing/      # Splash → Landing → Register → Login → Dashboard
├── wf-02-form-8step/          # Form Pendaftaran 8-Step → Submit → Status
├── wf-03-approval-payment/    # Approval Chain + Pembayaran UI
├── wf-04-dashboard-modules/   # Dashboard Anggota → Semua Modul (06-14)
└── wf-21-returning-journey/   # Returning Member Journey (Login → Dashboard → Modules)
```

## 📋 Daftar Screenshot per Test

### WF-01: Splash → Landing → Register → Login → Dashboard (3 files)

| File | Deskripsi |
|------|-----------|
| `wf-01-splash-mobile.png` | Splash screen awal |
| `wf-01-landing-mobile.png` | Landing page (publik) |
| `wf-01-dashboard-candidate-mobile.png` | Dashboard calon anggota (setelah login) |

**Test:** `1-1: Splash → Landing → Register → Login → Dashboard`

---

### WF-02: Form Pendaftaran 8-Step (10 files)

| File | Deskripsi |
|------|-----------|
| `wf-02-step-1-data-pribadi-mobile.png` | Step 1: Data Pribadi |
| `wf-02-step-2-akun-kontak-mobile.png` | Step 2: Akun & Kontak |
| `wf-02-step-3-foto-ktp-mobile.png` | Step 3: Foto KTP |
| `wf-02-step-4-swafoto-mobile.png` | Step 4: Swafoto |
| `wf-02-step-5-pekerjaan-mobile.png` | Step 5: Pekerjaan |
| `wf-02-step-6-kontak-darurat-mobile.png` | Step 6: Kontak Darurat |
| `wf-02-step-7-rekening-bank-mobile.png` | Step 7: Rekening Bank |
| `wf-02-step-8-ringkasan-mobile.png` | Step 8: Ringkasan |
| `wf-02-sweetalert-lihat-status-mobile.png` | SweetAlert setelah submit |
| `wf-02-redirect-registration-status-mobile.png` | Redirect ke registrationPage |

**Test:** `1-2: Form 8-Step → Kirim → SweetAlert → RegistrationPage`

---

### WF-03: Approval Chain + Pembayaran UI (6 files)

| File | Deskripsi |
|------|-----------|
| `wf-03-pembayaran-registration-page-mobile.png` | RegistrationPage (status pending) |
| `wf-03-pembayaran-billing-page-mobile.png` | BillingPage (daftar tagihan) |
| `wf-03-pembayaran-billing-page-verified-mobile.png` | BillingPage (tagihan terverifikasi) |
| `wf-03-pembayaran-invoice-page-mobile.png` | InvoicePage (form transfer) |
| `wf-03-pembayaran-invoice-form-filled-mobile.png` | InvoicePage (form terisi + bukti upload) |
| `wf-03-pembayaran-after-submit-mobile.png` | Setelah submit (PENDING_VERIFICATION) |

**Test:** `1-3: Approval Chain (Pengawas → Ketua → Bayar → Bendahara → APPROVED)`

**Alur Lengkap:**
1. Register → Submit 8-step
2. Pengawas approve (API)
3. Ketua approve (API) → Tagihan dibuat
4. UI: RegistrationPage → klik "BAYAR SIMPANAN SEKARANG"
5. BillingPage → InvoicePage
6. Upload bukti transfer → Submit
7. Bendahara approve (API) → Status: APPROVED

---

### WF-04: Dashboard Anggota → Semua Modul (19 files)

#### Dashboard
| File | Deskripsi |
|------|-----------|
| `wf-04-dashboard-reguler-mobile.png` | Dashboard anggota reguler |

#### Simpanan (8 files)
| File | Deskripsi |
|------|-----------|
| `wf-04-simpanan-mobile.png` | Halaman Simpanan (main) |
| `wf-04-simpanan-pokok-mobile.png` | Tab Simpanan Pokok |
| `wf-04-simpanan-wajib-mobile.png` | Tab Simpanan Wajib |
| `wf-04-simpanan-wajib-billing-mobile.png` | BillingPage setelah klik "Setoran" (Wajib) |
| `wf-04-simpanan-sukarela-mobile.png` | Tab Simpanan Sukarela |
| `wf-04-simpanan-sukarela-billing-mobile.png` | BillingPage (SukarelaForm) |
| `wf-04-simpanan-sukarela-invoice-mobile.png` | InvoicePage (Sukarela) |
| `wf-04-simpanan-sukarela-after-submit-mobile.png` | Setelah upload bukti (Sukarela) |

#### Penarikan Simpanan
| File | Deskripsi |
|------|-----------|
| `wf-04-penarikan-sukarela-mobile.png` | Form Pencairan Sukarela |
| `wf-04-penarikan-sukarela-form-mobile.png` | Form Pencairan (terisi) |

#### Modul Lainnya (06-14)
| File | Deskripsi |
|------|-----------|
| `wf-04-tabungan-mobile.png` | Tabungan Target |
| `wf-04-program-mobile.png` | Program / Pinjaman |
| `wf-04-arisan-mobile.png` | Arisan |
| `wf-04-jualbeli-mobile.png` | Jual Beli |
| `wf-04-investasi-mobile.png` | Investasi |
| `wf-04-training-mobile.png` | Training |
| `wf-04-notifikasi-mobile.png` | Notifikasi |
| `wf-04-akun-mobile.png` | Akun & Profil |

**Test:** `1-4: Dashboard Anggota Reguler → Modules 06-14 → Logout`

---

### WF-21: Returning Member Journey (4 files)

| File | Deskripsi |
|------|-----------|
| `wf-21-dashboard-mobile.png` | Dashboard (existing member) |
| `wf-21-simpanan-mobile.png` | Simpanan page |
| `wf-21-penarikan-mobile.png` | Penarikan form |
| `wf-21-akun-mobile.png` | Akun & Profil |

**Test:** `2-1: Login → Dashboard → Simpanan → Penarikan → Akun → Logout`

---

## 📊 Statistik

| Folder | Files | Size (est.) |
|--------|-------|-------------|
| `wf-01-splash-landing/` | 3 | ~2.5 MB |
| `wf-02-form-8step/` | 10 | ~3.0 MB |
| `wf-03-approval-payment/` | 6 | ~3.5 MB |
| `wf-04-dashboard-modules/` | 19 | ~9.0 MB |
| └── `simpanan/` | 8 | ~3.5 MB |
| `wf-21-returning-journey/` | 4 | ~2.0 MB |
| **TOTAL** | **42** | **~20 MB** |

---

## 🔧 Maintenance

### Regenerate Screenshots
```bash
# Run specific test
npx playwright test e2e/modules/user-workflow/user-workflow.spec.mjs --project=mobile --grep "1-4"

# Run all user-workflow tests
npx playwright test e2e/modules/user-workflow/user-workflow.spec.mjs --project=mobile
```

### Fix Double Suffix (if any)
```bash
cd e2e/screenshots/user-workflow
for f in *mobile-mobile.png; do 
  mv "$f" "${f/-mobile-mobile.png/-mobile.png}"
done
```

### Clean & Regenerate
```bash
# Delete all screenshots in user-workflow
rm -rf e2e/screenshots/user-workflow/*/*.png

# Regenerate
npx playwright test e2e/modules/user-workflow/user-workflow.spec.mjs --project=mobile
```

---

## 📝 Naming Convention

```
{wf-id}-{description}-{platform}.png
   │     │           └─ mobile (auto-added by takeScreenshot)
   │     └─ Deskripsi halaman/aksi
   └─ Test identifier (wf-01, wf-02, wf-03, wf-04, wf-21)
```

**Contoh:**
- `wf-03-pembayaran-invoice-page-mobile.png`
- `wf-04-simpanan-wajib-billing-mobile.png`
- `wf-21-penarikan-mobile.png`

---

## ✅ Test Coverage Status

| Test ID | Name | Status | Files |
|---------|------|--------|-------|
| `wf-01` | Splash → Landing → Dashboard | ✅ Passing | 3 |
| `wf-02` | Form 8-Step → Submit | ✅ Passing | 10 |
| `wf-03` | Approval Chain + Payment UI | ✅ Passing | 6 |
| `wf-04` | Dashboard → All Modules | ✅ Passing | 19 |
| `wf-21` | Returning Member Journey | ✅ Passing | 4 |

**Total:** 5/5 tests passing (100%)

---

## 🔗 Related Documentation

- Main README: `e2e/screenshots/README.md`
- Test file: `e2e/modules/user-workflow/user-workflow.spec.mjs`
- Helpers: `e2e/helpers.mjs`
- Playwright config: `e2e/playwright.config.mjs`
