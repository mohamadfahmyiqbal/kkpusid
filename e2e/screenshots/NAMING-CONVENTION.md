# 📸 Standar Penamaan Screenshot E2E

## 🎯 Tujuan
Standar penamaan yang konsisten untuk memudahkan:
- Dokumentasi tutorial penggunaan
- Tracking perubahan UI
- Audit visual
- Onboarding developer baru

---

## 📁 Struktur Folder

```
e2e/screenshots/
├── 01-splash-landing/          # Splash & Landing Page
├── 02-registrasi/              # Form Registrasi 8-Step
├── 03-login/                   # Login & Autentikasi
├── 04-lupa-password/           # Lupa Password & OTP
├── 05-dashboard/               # Dashboard & Approval
├── 06-simpanan/                # Simpanan (Pokok/Wajib/Sukarela)
│   ├── simpanan-pokok/         # Detail Simpanan Pokok
│   ├── simpanan-wajib/         # Detail Simpanan Wajib
│   └── simpanan-sukarela/      # Detail Simpanan Sukarela
├── 07-tabungan/                # Tabungan Target
├── 08-pinjaman/                # Pinjaman/Pembiayaan
├── 09-arisan/                  # Arisan
├── 10-jual-beli/               # Jual Beli
├── 11-investasi/               # Investasi/Sukuk
├── 12-training/                # Training & Evaluasi
├── 13-notifikasi/              # Notifikasi & Transaksi
├── 14-akun-profil/             # Akun & Profil
├── 15-logout/                  # Logout
├── 16-alur-penggunaan/         # User Flow E2E
├── auth-ui/                    # Auth UI Tests
├── derived-pages/              # Detail Pages
└── user-workflow/              # User Workflow E2E
    ├── wf-01-splash-landing/
    ├── wf-02-form-8step/
    ├── wf-03-approval-payment/
    ├── wf-04-dashboard-modules/
    │   └── simpanan/
    └── wf-21-returning-journey/
```

---

## 📝 Format Penamaan File

### Standar Utama
```
{module}-{step}-{description}-{platform}.png
```

### Komponen
| Komponen | Deskripsi | Contoh |
|----------|-----------|--------|
| `module` | Nomor/kategori module | `01`, `06`, `wf-01` |
| `step` | Urutan langkah (2 digit) | `01`, `02`, `03` |
| `description` | Deskripsi singkat (kebab-case) | `splash-screen`, `form-data-pribadi` |
| `platform` | Platform (auto) | `mobile` |

### Contoh Lengkap
```
01-splash-landing/
  └── 01-01-splash-screen-mobile.png
  └── 01-02-landing-page-mobile.png

02-registrasi/
  └── 02-01-form-data-pribadi-mobile.png
  └── 02-02-form-akun-kontak-mobile.png
  └── 02-03-form-foto-ktp-mobile.png
  └── 02-04-form-swafoto-mobile.png
  └── 02-05-form-pekerjaan-mobile.png
  └── 02-06-form-kontak-darurat-mobile.png
  └── 02-07-form-rekening-bank-mobile.png
  └── 02-08-form-ringkasan-mobile.png
  └── 02-09-sweetalert-berhasil-mobile.png

06-simpanan/
  ├── 06-01-daftar-simpanan-mobile.png
  ├── 06-02-tab-pokok-mobile.png
  ├── 06-03-tab-wajib-mobile.png
  └── simpanan-pokok/
      ├── 06-01-01-detail-pokok-mobile.png
      ├── 06-01-02-setoran-pokok-mobile.png
      └── 06-01-03-penarikan-pokok-mobile.png

user-workflow/
  └── wf-01-splash-landing/
      ├── wf-01-01-splash-mobile.png
      ├── wf-01-02-landing-mobile.png
      └── wf-01-03-dashboard-candidate-mobile.png
```

---

## 🎨 Kategori Deskripsi

### Aksi Pengguna
| Kategori | Prefix | Contoh |
|----------|--------|--------|
| **Lihat/Detail** | `detail-`, `lihat-` | `detail-produk`, `lihat-tagihan` |
| **Isi Form** | `form-`, `isi-` | `form-data-pribadi`, `isi-nominal` |
| **Klik Aksi** | `klik-`, `pilih-` | `klik-setoran`, `pilih-bank` |
| **Upload** | `upload-` | `upload-bukti-transfer` |
| **Submit** | `submit-`, `kirim-` | `submit-form`, `kirim-otp` |

### Status/Halaman
| Kategori | Prefix | Contoh |
|----------|--------|--------|
| **Halaman Utama** | `halaman-`, `main-` | `halaman-utama`, `main-dashboard` |
| **Loading** | `loading-` | `loading-spinner` |
| **Error** | `error-`, `gagal-` | `error-validasi`, `gagal-login` |
| **Sukses** | `sukses-`, `berhasil-` | `sukses-login`, `berhasil-submit` |
| **Konfirmasi** | `konfirmasi-` | `konfirmasi-hapus` |

### Navigasi
| Kategori | Prefix | Contoh |
|----------|--------|--------|
| **Tab** | `tab-` | `tab-pokok`, `tab-wajib` |
| **Menu** | `menu-` | `menu-mobile`, `menu-dropdown` |
| **Back/Next** | `back-`, `next-` | `back-login`, `next-step` |

---

## 🔄 Mapping Test ke Screenshot

### Module 01: Splash & Landing
| Test ID | Screenshot Name |
|---------|-----------------|
| 01-01 | `01-01-splash-screen-mobile.png` |
| 01-02 | `01-02-landing-page-mobile.png` |
| 01-03 | `01-03-login-redirect-mobile.png` |

### Module 02: Registrasi
| Test ID | Screenshot Name |
|---------|-----------------|
| 02-01 | `02-01-form-data-pribadi-mobile.png` |
| 02-02 | `02-02-form-akun-kontak-mobile.png` |
| ... | ... |
| 02-08 | `02-08-form-ringkasan-mobile.png` |
| 02-09 | `02-09-sweetalert-berhasil-mobile.png` |

### Module 06: Simpanan
| Test ID | Screenshot Name |
|---------|-----------------|
| 06-01 | `06-01-daftar-simpanan-mobile.png` |
| 06-02 | `06-02-tab-pokok-mobile.png` |
| 06-03 | `06-03-tab-wajib-mobile.png` |
| 06-04 | `06-04-tab-sukarela-mobile.png` |
| 06-P1 | `simpanan-pokok/06-01-01-detail-pokok-mobile.png` |
| 06-P2 | `simpanan-pokok/06-01-02-setoran-pokok-mobile.png` |

### User Workflow
| Test ID | Screenshot Name |
|---------|-----------------|
| wf-01 | `wf-01-splash-landing/wf-01-01-splash-mobile.png` |
| wf-02 | `wf-02-form-8step/wf-02-01-step-1-data-pribadi-mobile.png` |
| wf-03 | `wf-03-approval-payment/wf-03-01-registration-page-mobile.png` |
| wf-04 | `wf-04-dashboard-modules/wf-04-01-dashboard-reguler-mobile.png` |

---

## 📚 Dokumentasi Tutorial

### Template Deskripsi Screenshot
```markdown
### {Test ID}: {Nama Test}

**Deskripsi:** {Penjelasan singkat apa yang di-test}

**Langkah:**
1. {Langkah 1}
2. {Langkah 2}
3. {Langkah 3}

**Expected Result:**
- {Hasil yang diharapkan}

**Screenshot:**
- `{filename}.png` - {Deskripsi screenshot}
```

### Contoh Dokumentasi
```markdown
### 06-01: Daftar Simpanan

**Deskripsi:** Menampilkan halaman utama simpanan dengan 3 tab produk

**Langkah:**
1. Login sebagai anggota
2. Klik menu "Simpanan" dari sidebar
3. Halaman menampilkan 3 tab: Pokok, Wajib, Sukarela

**Expected Result:**
- Tab "Pokok" aktif secara default
- Tab "Wajib" dan "Sukarela" tersedia
- Tombol "Setoran" muncul di setiap tab

**Screenshot:**
- `06-01-daftar-simpanan-mobile.png` - Halaman utama simpanan
```

---

## 🛠️ Maintenance

### Regenerate Screenshots
```bash
# Run specific module
npx playwright test e2e/modules/06-simpanan/ --project=mobile

# Run all
npx playwright test e2e/modules/ --project=mobile
```

### Clean Screenshots
```bash
# Delete all PNG files
find e2e/screenshots -name "*.png" -type f -delete
```

### Verify Naming
```bash
# List all screenshots with naming check
find e2e/screenshots -name "*.png" | sort
```

---

## 📋 Checklist Review

- [ ] Nama file mengikuti format `{module}-{step}-{description}-{platform}.png`
- [ ] Description menggunakan kebab-case
- [ ] Platform suffix `-mobile` ada (auto-generated)
- [ ] Folder sesuai dengan module
- [ ] Tidak ada double suffix (`-mobile-mobile.png`)
- [ ] Screenshot mudah dipahami dari nama file