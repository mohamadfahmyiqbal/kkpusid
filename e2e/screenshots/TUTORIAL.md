# 📖 Tutorial Penggunaan KKPU ID

> Dokumentasi lengkap alur penggunaan aplikasi KKPU ID berdasarkan E2E test screenshots.

---

## 📑 Daftar Isi

1. [Pendahuluan](#pendahuluan)
2. [Registrasi Anggota Baru](#1-registrasi-anggota-baru)
3. [Login & Autentikasi](#2-login--autentikasi)
4. [Dashboard Anggota](#3-dashboard-anggota)
5. [Simpanan](#4-simpanan)
6. [Tabungan Target](#5-tabungan-target)
7. [Pinjaman/Pembiayaan](#6-pinjamanpembiayaan)
8. [Arisan](#7-arisan)
9. [Jual Beli](#8-jual-beli)
10. [Investasi](#9-investasi)
11. [Training & Evaluasi](#10-training--evaluasi)
12. [Notifikasi](#11-notifikasi)
13. [Akun & Profil](#12-akun--profil)
14. [Logout](#13-logout)

---

## Pendahuluan

KKPU ID adalah aplikasi koperasi digital yang menyediakan layanan:
- **Simpanan** (Pokok, Wajib, Sukarela)
- **Tabungan Target** (Haji, Umrah, Pendidikan, Qurban)
- **Pinjaman/Pembiayaan**
- **Arisan**
- **Jual Beli**
- **Investasi/Sukuk**
- **Training & Evaluasi**

### 🗺️ Alur Utama Pengguna

```
┌─────────────────────────────────────────────────────────────────┐
│                         ALUR PENGGUNA BARU                       │
└─────────────────────────────────────────────────────────────────┘

  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────────┐
  │  SPLASH  │───▶│ LANDING  │───▶│ REGISTRASI│───▶│  APPROVAL    │
  │  (5 detik)│    │   PAGE   │    │ 8-STEP   │    │  BERJENJANG  │
  └──────────┘    └──────────┘    └──────────┘    └──────────────┘
                        │                                 │
                        │                                 ▼
                        │                          ┌──────────────┐
                        │                          │  PEMBAYARAN  │
                        │                          │  (Bendahara) │
                        │                          └──────────────┘
                        │                                 │
                        ▼                                 ▼
                  ┌──────────┐                    ┌──────────────┐
                  │  LOGIN   │◀───────────────────│   DASHBOARD  │
                  │  PAGE    │                    │   ANGGOTA    │
                  └──────────┘                    └──────────────┘
                                                       │
                                                       ▼
                  ┌─────────────────────────────────────────────┐
                  │           MENU ANGGOTA (UNLOCKED)            │
                  ├─────────────────────────────────────────────┤
                  │  • Simpanan (Pokok/Wajib/Sukarela)          │
                  │  • Tabungan Target                          │
                  │  • Pinjaman/Pembiayaan                      │
                  │  • Arisan                                   │
                  │  • Jual Beli                                │
                  │  • Investasi                                │
                  │  • Training & Evaluasi                      │
                  │  • Notifikasi                               │
                  │  • Akun & Profil                            │
                  └─────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                        ALUR PENGGUNA LAMA                        │
└─────────────────────────────────────────────────────────────────┘

  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────────┐
  │  SPLASH  │───▶│ LANDING  │───▶│  LOGIN   │───▶│  DASHBOARD   │
  │  (5 detik)│    │   PAGE   │    │  PAGE    │    │   ANGGOTA    │
  └──────────┘    └──────────┘    └──────────┘    └──────────────┘
                                                       │
                                                       ▼
                  ┌─────────────────────────────────────────────┐
                  │           MENU ANGGOTA (UNLOCKED)            │
                  │      (Langsung akses semua fitur)            │
                  └─────────────────────────────────────────────┘
```

### 📱 Navigasi Mobile

```
Mobile View (375px):
┌─────────────────────┐
│ ☰  KKPU ID    🔔 👤 │  ← Navbar dengan hamburger menu
├─────────────────────┤
│                     │
│   [Page Content]    │
│                     │
│                     │
└─────────────────────┘

Menu Slide (tap ☰):
┌─────────────────────┐
│ KKPU ID         ✕   │
├─────────────────────┤
│ 🏠 Dashboard        │
│ 💰 Simpanan         │
│ 🎯 Tabungan         │
│ 🏦 Pinjaman         │
│ 🔄 Arisan           │
│ 🛒 Jual Beli        │
│ 📈 Investasi        │
│ 📚 Training         │
│ 🔔 Notifikasi       │
│ 👤 Akun             │
│ ─────────────────── │
│ 🚪 Keluar           │
└─────────────────────┘
```

---

## 1. Registrasi Anggota Baru

### 1.1. Buka Halaman Registrasi

**Alur:**
```
Splash Screen (5 detik) → Landing Page → Klik "Daftar Sekarang" → Form Registrasi
```

**Langkah:**
1. Buka aplikasi KKPU ID
2. Di halaman splash, tunggu 5 detik (auto-redirect)
3. Akan masuk ke halaman landing
4. Klik tombol **"Daftar Sekarang"** di navbar (atau buka menu hamburger ☰ di mobile)
5. Akan diarahkan ke halaman registrasi

**Screenshot:**
- `01-splash-landing/01-01-splash-screen-mobile.png` - Halaman splash (5 detik)
- `01-splash-landing/01-02-landing-page-mobile.png` - Halaman landing
- `02-registrasi/02-01-form-data-pribadi-mobile.png` - Form registrasi step 1

### 1.2. Isi Form Registrasi (8 Langkah)

#### Step 1: Data Pribadi
**Field yang diisi:**
- Nama Lengkap
- Tanggal Lahir
- Jenis Kelamin
- Alamat (Provinsi, Kota, Kecamatan, Kelurahan)
- RT/RW

**Screenshot:**
- `02-registrasi/02-01-form-data-pribadi-mobile.png`

#### Step 2: Akun & Kontak
**Field yang diisi:**
- Email
- Nomor HP
- Password
- Konfirmasi Password

**Screenshot:**
- `02-registrasi/02-02-form-akun-kontak-mobile.png`

#### Step 3: Foto KTP
**Langkah:**
1. Klik area upload foto KTP
2. Ambil foto atau pilih dari galeri
3. Pastikan foto jelas dan terbaca

**Screenshot:**
- `02-registrasi/02-03-form-foto-ktp-mobile.png`

#### Step 4: Swafoto
**Langkah:**
1. Klik area upload swafoto
2. Ambil foto selfie
3. Pastikan wajah terlihat jelas

**Screenshot:**
- `02-registrasi/02-04-form-swafoto-mobile.png`

#### Step 5: Pekerjaan
**Field yang diisi:**
- Pekerjaan
- Nama Perusahaan
- Alamat Perusahaan

**Screenshot:**
- `02-registrasi/02-05-form-pekerjaan-mobile.png`

#### Step 6: Kontak Darurat
**Field yang diisi:**
- Nama Kontak Darurat
- Nomor HP Kontak Darurat
- Hubungan dengan Kontak Darurat

**Screenshot:**
- `02-registrasi/02-06-form-kontak-darurat-mobile.png`

#### Step 7: Rekening Bank
**Field yang diisi:**
- Nama Bank
- Nomor Rekening
- Nama Pemilik Rekening

**Screenshot:**
- `02-registrasi/02-07-form-rekening-bank-mobile.png`

#### Step 8: Ringkasan
**Langkah:**
1. Periksa kembali semua data
2. Klik **"Kirim Sekarang"**
3. Tunggu SweetAlert konfirmasi

**Screenshot:**
- `02-registrasi/02-08-form-ringkasan-mobile.png`
- `02-registrasi/02-09-sweetalert-berhasil-mobile.png`

### 1.3. Approval Berjenjang

Setelah submit, pendaftaran akan melalui 3 tahap approval:

1. **Pengawas** → Review awal
2. **Ketua** → Review kedua + Terbitkan tagihan
3. **Bendahara** → Verifikasi pembayaran

**Screenshot:**
- `05-dashboard/05-01-approval-pending-mobile.png` - Status pending
- `05-dashboard/05-02-approval-approved-mobile.png` - Status approved

---

## 2. Login & Autentikasi

### 2.1. Login dengan Email/HP

**Alur:**
```
Splash Screen (5 detik) → Landing Page → Klik "Masuk" → Form Login
```

**Langkah:**
1. Buka aplikasi KKPU ID
2. Di halaman splash, tunggu 5 detik (auto-redirect)
3. Akan masuk ke halaman landing
4. Klik tombol **"Masuk"** di navbar (atau buka menu hamburger ☰ di mobile)
5. Masukkan email atau nomor HP
6. Masukkan password
7. Klik **"Masuk Sekarang"**

**Screenshot:**
- `01-splash-landing/01-01-splash-screen-mobile.png` - Halaman splash
- `01-splash-landing/01-02-landing-page-mobile.png` - Halaman landing
- `03-login/03-01-login-page-mobile.png` - Halaman login
- `03-login/03-02-login-filled-mobile.png` - Form terisi
- `03-login/03-03-login-success-mobile.png` - Login berhasil → Dashboard

### 2.2. Lupa Password

**Langkah:**
1. Klik **"Lupa Password"**
2. Masukkan email terdaftar
3. Klik **"Kirim OTP"**
4. Cek email untuk kode OTP 6 digit
5. Masukkan OTP
6. Buat password baru
7. Konfirmasi password baru
8. Klik **"Submit"**

**Screenshot:**
- `04-lupa-password/04-01-lupa-password-page-mobile.png`
- `04-lupa-password/04-02-otp-sent-mobile.png`
- `04-lupa-password/04-03-otp-verified-mobile.png`
- `04-lupa-password/04-04-reset-password-form-mobile.png`
- `04-lupa-password/04-05-reset-success-mobile.png`

---

## 3. Dashboard Anggota

### 3.1. Dashboard Calon Anggota (Pending)

**Tampilan:**
- Menu terkunci (disabled)
- Status: "Calon Anggota"
- Tombol "Lengkapi Pendaftaran"

**Screenshot:**
- `05-dashboard/05-01-dashboard-candidate-mobile.png`

### 3.2. Dashboard Anggota Reguler

**Tampilan:**
- Semua menu unlocked
- Status: "Anggota Reguler"
- Akses ke semua fitur

**Screenshot:**
- `05-dashboard/05-02-dashboard-member-mobile.png`

### 3.3. Menu Mobile

**Langkah:**
1. Tap ikon hamburger (☰) di pojok kiri atas
2. Menu slide dari kiri
3. Pilih menu yang diinginkan

**Screenshot:**
- `05-dashboard/05-03-menu-mobile-open-mobile.png`

---

## 4. Simpanan

### 4.1. Halaman Simpanan

**Tampilan:**
- 3 Tab: Pokok, Wajib, Sukarela
- Summary saldo per tab
- Tombol "Setoran" dan "Penarikan"

**Screenshot:**
- `06-simpanan/06-01-daftar-simpanan-mobile.png`

### 4.2. Simpanan Pokok

#### Detail Pokok
**Tampilan:**
- Nominal setoran awal
- Saldo terkini
- Riwayat transaksi
- Tombol "Setoran" dan "Penarikan"

**Screenshot:**
- `06-simpanan/simpanan-pokok/06-01-01-detail-pokok-mobile.png`

#### Setoran Pokok
**Langkah:**
1. Klik tab "Pokok"
2. Klik tombol "Setoran"
3. Masukkan nominal
4. Pilih metode pembayaran
5. Upload bukti transfer
6. Klik "Kirim Bukti Pembayaran"

**Screenshot:**
- `06-simpanan/simpanan-pokok/06-01-02-setoran-pokok-mobile.png`
- `06-simpanan/simpanan-pokok/06-01-03-upload-bukti-mobile.png`

#### Penarikan Pokok
**Langkah:**
1. Klik tombol "Penarikan"
2. Masukkan nominal penarikan
3. Konfirmasi
4. Tunggu approval Bendahara

**Screenshot:**
- `06-simpanan/simpanan-pokok/06-01-04-penarikan-pokok-mobile.png`

### 4.3. Simpanan Wajib

#### Detail Wajib
**Tampilan:**
- Jadwal setoran bulanan (12x)
- Saldo terkini
- Status pembayaran per bulan
- Tombol "Setoran"

**Screenshot:**
- `06-simpanan/simpanan-wajib/06-02-01-detail-wajib-mobile.png`

#### Setoran Wajib
**Langkah:**
1. Klik tab "Wajib"
2. Klik tombol "Setoran"
3. Pilih bulan yang akan disetor
4. Upload bukti transfer
5. Klik "Kirim Bukti Pembayaran"

**Screenshot:**
- `06-simpanan/simpanan-wajib/06-02-02-setoran-wajib-mobile.png`

### 4.4. Simpanan Sukarela

#### Detail Sukarela
**Tampilan:**
- Saldo terkini
- Riwayat setoran
- Tombol "Setoran" dan "Penarikan"

**Screenshot:**
- `06-simpanan/simpanan-sukarela/06-03-01-detail-sukarela-mobile.png`

#### Setoran Sukarela
**Langkah:**
1. Klik tab "Sukarela"
2. Klik tombol "Setoran"
3. Masukkan nominal
4. Upload bukti transfer
5. Klik "Kirim Bukti Pembayaran"

**Screenshot:**
- `06-simpanan/simpanan-sukarela/06-03-02-setoran-sukarela-mobile.png`

#### Penarikan Sukarela
**Langkah:**
1. Klik tombol "Penarikan"
2. Masukkan nominal penarikan
3. Konfirmasi
4. Tunggu approval Bendahara

**Screenshot:**
- `06-simpanan/simpanan-sukarela/06-03-03-penarikan-sukarela-mobile.png`

---

## 5. Tabungan Target

### 5.1. Halaman Tabungan

**Tampilan:**
- Daftar target tabungan (Haji, Umrah, Pendidikan, Qurban)
- Progress bar per target
- Tombol "Ajukan Tabungan"

**Screenshot:**
- `07-tabungan/07-01-daftar-tabungan-mobile.png`

### 5.2. Ajukan Tabungan Baru

**Langkah:**
1. Klik tombol "Ajukan Tabungan"
2. Pilih kategori (Haji/Umrah/Pendidikan/Qurban)
3. Masukkan target nominal
4. Masukkan iuran bulanan
5. Masukkan durasi (bulan)
6. Klik "Ajukan Tabungan"

**Screenshot:**
- `07-tabungan/07-02-form-ajuan-tabungan-mobile.png`
- `07-tabungan/07-03-form-terisi-mobile.png`

### 5.3. Setoran Tabungan

**Langkah:**
1. Pilih target tabungan
2. Klik tombol "Setoran"
3. Masukkan nominal
4. Upload bukti transfer
5. Klik "Kirim Bukti Pembayaran"

**Screenshot:**
- `07-tabungan/07-04-setoran-tabungan-mobile.png`

### 5.4. Pencairan Tabungan

**Syarat:** Progress minimal 100%

**Langkah:**
1. Pilih target tabungan yang sudah 100%
2. Klik tombol "Pencairan"
3. Konfirmasi
4. Tunggu approval

**Screenshot:**
- `07-tabungan/07-05-pencairan-tabungan-mobile.png`

---

## 6. Pinjaman/Pembiayaan

### 6.1. Halaman Pinjaman

**Tampilan:**
- Daftar produk pinjaman
- Informasi suku bunga, durasi, limit

**Screenshot:**
- `08-pinjaman/08-01-daftar-pinjaman-mobile.png`

### 6.2. Ajukan Pinjaman

**Langkah:**
1. Pilih produk pinjaman
2. Klik "Ajukan Pinjaman"
3. Masukkan nominal pinjaman
4. Pilih durasi
5. Masukkan tujuan pinjaman
6. Upload dokumen pendukung
7. Klik "Ajukan Pinjaman"

**Screenshot:**
- `08-pinjaman/08-02-form-ajuan-pinjaman-mobile.png`
- `08-pinjaman/08-03-form-terisi-mobile.png`

---

## 7. Arisan

### 7.1. Halaman Arisan

**Tampilan:**
- Daftar arisan aktif
- Info batch, kategori, nominal
- Tombol "Gabung Arisan"

**Screenshot:**
- `09-arisan/09-01-daftar-arisan-mobile.png`

### 7.2. Gabung Arisan

**Langkah:**
1. Pilih arisan yang diinginkan
2. Klik "Gabung Arisan"
3. Konfirmasi
4. Tunggu approval

**Screenshot:**
- `09-arisan/09-02-konfirmasi-gabung-mobile.png`
- `09-arisan/09-03-gabung-berhasil-mobile.png`

---

## 8. Jual Beli

### 8.1. Halaman Jual Beli

**Tampilan:**
- Daftar transaksi jual beli
- Status pembayaran
- Tombol "Ajukan Transaksi"

**Screenshot:**
- `10-jual-beli/10-01-daftar-jualbeli-mobile.png`

### 8.2. Ajukan Transaksi

**Langkah:**
1. Klik "Ajukan Transaksi"
2. Masukkan nama penjual
3. Masukkan nominal
4. Pilih produk/barang/jasa
5. Upload QRIS
6. Klik "Ajukan Transaksi"

**Screenshot:**
- `10-jual-beli/10-02-form-ajuan-mobile.png`
- `10-jual-beli/10-03-form-terisi-mobile.png`

### 8.3. Pelunasan

**Langkah:**
1. Pilih transaksi
2. Klik "Pelunasan"
3. Upload bukti pembayaran
4. Klik "Kirim Bukti"

**Screenshot:**
- `10-jual-beli/10-04-pelunasan-mobile.png`

### 8.4. Nota/Receipt

**Screenshot:**
- `10-jual-beli/10-05-nota-receipt-mobile.png`

---

## 9. Investasi

### 9.1. Halaman Investasi

**Tampilan:**
- Daftar produk investasi (Halal, Sukuk, Pendanaan)
- Informasi return, risiko, durasi

**Screenshot:**
- `11-investasi/11-01-daftar-investasi-mobile.png`

### 9.2. Detail Produk

**Screenshot:**
- `11-investasi/11-02-detail-produk-mobile.png`

### 9.3. Ajukan Investasi

**Langkah:**
1. Pilih produk investasi
2. Klik "Ajukan Investasi"
3. Masukkan nominal
4. Konfirmasi
5. Klik "Ajukan"

**Screenshot:**
- `11-investasi/11-03-form-ajuan-mobile.png`

---

## 10. Training & Evaluasi

### 10.1. Halaman Training

**Tampilan:**
- Daftar materi training
- Progress belajar
- Tombol "Baca Materi"

**Screenshot:**
- `12-training/12-01-daftar-training-mobile.png`

### 10.2. Baca Materi

**Langkah:**
1. Pilih materi
2. Klik "Baca Materi"
3. Scroll ke bawah untuk baca semua
4. Klik "Selesai"

**Screenshot:**
- `12-training/12-02-baca-materi-mobile.png`

### 10.3. Evaluasi/Kuis

**Langkah:**
1. Setelah baca materi, klik "Evaluasi"
2. Jawab semua pertanyaan
3. Klik "Submit"

**Screenshot:**
- `12-training/12-03-evaluasi-mobile.png`
- `12-training/12-04-hasil-evaluasi-mobile.png`

### 10.4. Ranking

**Screenshot:**
- `12-training/12-05-ranking-mobile.png`

---

## 11. Notifikasi

### 11.1. Halaman Notifikasi

**Tampilan:**
- Daftar notifikasi
- Status read/unread
- Tombol "Tandai Semua Dibaca"

**Screenshot:**
- `13-notifikasi/13-01-daftar-notifikasi-mobile.png`

### 11.2. Detail Notifikasi

**Langkah:**
1. Klik notifikasi
2. Detail muncul
3. Klik "Kembali"

**Screenshot:**
- `13-notifikasi/13-02-detail-notifikasi-mobile.png`

### 11.3. Riwayat Transaksi

**Screenshot:**
- `13-notifikasi/13-03-riwayat-transaksi-mobile.png`

---

## 12. Akun & Profil

### 12.1. Halaman Akun

**Tampilan:**
- Foto profil
- Data diri
- Menu: Edit Profil, Status Pendaftaran, Pengajuan Keluar

**Screenshot:**
- `14-akun-profil/14-01-halaman-akun-mobile.png`

### 12.2. Edit Profil

**Langkah:**
1. Klik "Edit Profil"
2. Ubah data yang diinginkan
3. Klik "Simpan"

**Screenshot:**
- `14-akun-profil/14-02-edit-profil-mobile.png`

### 12.3. Status Pendaftaran

**Screenshot:**
- `14-akun-profil/14-03-status-pendaftaran-mobile.png`

### 12.4. Pengajuan Keluar (Resignasi)

**Langkah:**
1. Klik "Pengajuan Keluar"
2. Isi alasan resignasi
3. Klik "Ajukan Pengajuan Keluar"
4. Tunggu approval

**Screenshot:**
- `14-akun-profil/14-04-form-resignasi-mobile.png`
- `14-akun-profil/14-05-status-resignasi-mobile.png`

---

## 13. Logout

### 13.1. Logout dari Aplikasi

**Langkah:**
1. Klik menu "Akun"
2. Scroll ke bawah
3. Klik tombol "Keluar" / "Logout"
4. Konfirmasi
5. Akan redirect ke halaman login

**Screenshot:**
- `15-logout/15-01-konfirmasi-logout-mobile.png`
- `15-logout/15-02-logout-success-mobile.png`

---

## 📱 Tips Penggunaan

### Akses Menu Cepat
- Gunakan menu hamburger (☰) untuk navigasi cepat
- Swipe dari kiri untuk buka menu

### Upload Dokumen
- Pastikan foto jelas dan terbaca
- Format yang didukung: JPG, PNG, PDF
- Maksimal ukuran file: 5MB

### Pembayaran
- Transfer ke rekening yang tertera di invoice
- Upload bukti transfer yang jelas
- Tunggu verifikasi dari Bendahara (1-2 hari kerja)

### Status Approval
- **PENDING** → Menunggu review
- **APPROVED** → Disetujui
- **REJECTED** → Ditolak (cek alasan di notifikasi)

---

## 🔗 Link Terkait

- [Standar Penamaan Screenshot](./NAMING-CONVENTION.md)
- [Struktur Folder Screenshots](./README.md)
- [E2E Test Documentation](../modules/README.md)

---

*Terakhir diperbarui: November 2026*