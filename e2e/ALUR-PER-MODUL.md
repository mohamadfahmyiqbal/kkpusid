# Alur Proses Penggunaan per Modul — E2E @kkpusid

Dokumentasi alur pengguna (user journey) per modul pada E2E test suite `kkpusid`.
Setiap modul mereplikasi proses nyata pengguna PUS Member Portal.

---

## Alur Pengguna Lengkap (End-to-End User Journey)

Berikut adalah alur pengguna dari awal hingga logout, sesuai dengan implementasi nyata di repo `@kkpusid`. Alur ini mengikuti jalur nyata tanpa terikat batas modul individual.

### **Flow 1: New Member Journey (Anggota Baru)**

```
[1] Splash Screen (Modul 01)
    ±5 detik → Auto-redirect ke Landing Page

[2] Landing Page (Modul 01)
    → Baca artikel/informasi
    ↓ Klik "Daftar Sekarang"
    → Halaman Pendaftaran Awal (PendaftaranAnggota)

[3] Registrasi Akun (Modul 02 — Tahap 1)
    → Isi form: nama, email, password, konfirmasi password
    → Klik submit → Muncul SweetAlert konfirmasi
    ↓ Klik "Ke Halaman Login"
    → Halaman Login (status akun: `pending`)

[4] Login (Modul 03)
    → Isi email/HP + password
    → Klik "Masuk Sekarang"
    → Jika berhasil → token tersimpan → masuk dashboard
    → Status akun berubah menjadi `isCandidate = true` (Calon Anggota)

[5] Dashboard Calon Anggota (Modul 05)
    → State: `isCandidate = true`, `status_id = 1`
    → CandidateStepsCard: 4 tahap progres
        - Tahap 1: Buat Akun → **Selesai (done)**
        - Tahap 2: Daftar Menjadi Anggota → `Belum Lengkap`; muncul **Daftar Sekarang**
        - Tahap 3: Approval → `Proses Verifikasi` / `Menunggu`; tombol **Lihat Detail** → `registrationPage`
        - Tahap 4: Menjadi Anggota Koperasi → `Menunggu`
    → NextStepsCard: 4 langkah khusus calon anggota
        - Lengkapi Data Usaha → `registrationFormDetail`
        - Unggah Dokumen → `registrationFormDetail`
        - Ajukan Pembiayaan → `registrationPage`
        - Konsultasi Dengan Kami → `https://wa.me/6281234567890`
    → MainMenuSection: **SEMUA DINONAKTIFKAN** (kelas `is-disabled`)
    → Notifikasi & Tagihan: bell menampilkan tapi non-interaktif untuk candidate

[6] Formulir Keanggotaan 8 Step (Tahap 2 — RegistrationFormDetail)
    1. Data Pribadi — NIK, nama, alamat, provinsi/kota/kecamatan/kelurahan
    2. Akun & Kontak — pilih tipe anggota (Reguler)
    3. Foto KTC/KTP — buka kamera → ambil foto
    4. Swafoto — verifikasi wajah via kamera
    5. Pekerjaan — pekerjaan, nama perusahaan, alamat kantor
    6. Kontak Darurat — nama, nomor HP, hubungan
    7. Rekening Bank — nama bank, no. rekening, nama pemilik
    8. Ringkasan — cek ringkasan → centang commitment → **"Kirim Sekarang"**

    Setelah Klik "Kirim Sekarang":
    → Data dikirim via `POST /api/anggota/pendaftaran` (`AnggotaService.submitRegistration`)
    → **Tidak auto-redirect**
    → Muncul **SweetAlert "Berhasil"** berisi: *"Pengajuan pendaftaran anggota berhasil dikirim"*
    → Berisi **tombol "Lihat Status Pendaftaran"**
    → Tombol link href mengarah ke: `/${jwtEncode({ page: "registrationPage" })}`
    → **User tetap di halaman form** RegistrationFormDetail sampai menekan tombol tersebut

[7] Halaman Status Pendaftaran (RegistrationPage — Modul 05, Tahap 3)
    ↓ Klik "Lihat Status Pendaftaran" di SweetAlert

    **A. Jika belum terverifikasi (status candidat):**
    → Menampilkan 3 section:
        - Section 1: "Pendaftaran Anggota" — CTA "Isi Form Permohonan Menjadi Anggota" (ke RegistrationFormDetail)
        - Section 2: "Ketentuan Pendaftaran Anggota" — 3 syarat: WNI, lengkapi dokumen, bayar AD/ART
        - Section 3: "Butuh Bantuan?" — tombol Hubungi Kami (WA: 6281234567890)

    **B. Jika sudah terdaftar tapi belum APPROVED:**
    → Menampilkan **RegistrationSummary** dengan:
        - Data lengkap pendaftar (nama, NIK, foto KTP/swafoto)
        - Verifikasi dokumen (foto KTP, swafoto)
        - Detail domisili (provinsi, kota, kecamatan, kelurahan, RT/RW)
        - **Status Persetujuan** 3 tahap: Pengawas → Ketua → Bendahara
        - Indikator posisi berkas: "DI APPROVAL KETUA", "MENUNGGU PEMBAYARAN", "APPROVED", dst
        - **Aksi**: Tombol "BAYAR SIMPANAN SEKARANG" (jika belum lunas) atau "Kembali ke Dashboard"

[8] Proses Approval (Tahap 3) — End-to-End (approval-chain.spec.mjs)
    Alur 3 tahap approval beserta pembayaran tagihan:

    **Tahap 1: Pengawas approve**
        → `PUT /approvals/pendaftaran/approve/:id` with `action: "APPROVE"`
        → Step 1 selesui, antrian ke Ketua

    **Tahap 2: Ketua approve**
        → `PUT /approvals/pendaftaran/approve/:id` with `action: "APPROVE"`
        → Step 2 selesai, **terbit tagihan Awal** (Simpanan Pokok & Wajib)
        → User wajib membayar tagihan ini

    **Tahap 3: Anggota bayar tagihan + upload bukti transfer**
        → Dialihkan ke **BillingPage (BillList)** ← **INI POINT YANG ANDA CARI**
        → Pilih tagihan → Klik "Bayar Sekarang"
        → Upload bukti transfer (bukti transfer gambar)
        → Status transaksi menjadi `PENDING_VERIFICATION`

    **Tahap 4: Bendahara approve (final)**
        → `PUT /approvals/pendaftaran/approve/:id` with `action: "APPROVE"`
        → Step 3 final → Anggota diaktifkan
        → `status_id` berubah dari `1` (Calon Anggota) menjadi `5` (Anggota Penuh)
        → `final_status` berubah menjadi `APPROVED`

    **Tahap 5: Verifikasi status**
        → `GET /anggota/getRegistrationStatus`
        → `final_status = APPROVED`

[9] MainMenuSection Diaktifkan Kembali
    → Setelah status berubah menjadi `Anggota Penuh` (status_id = 5)
    → Kelas `is-diserved` dihapus dari semua menu utama
    → User sekarang bisa mengakses modul-modul 06–15

[10] Akses Modul Lanjutan (Setelah Jadi Anggota Penuh)
    | Modul | Halaman Awal | Keterangan |
    |-------|-------------|------------|
    | 06. Simpanan | `SimpananPage` | Setor/tarik simpanan (3 produk: Pokok/Wajib/Sukarela) |
    | 07. Tabungan Target | `TabunganPage` | Buat & kelola target tabungan |
    | 08. Pinjaman/Pembiayaan | `ProgramPage` → Pinjaman | Ajukan pinjaman |
    | 09. Arisan | `ArisanPage` | Ikut arisan |
    | 10. Jual Beli | `JualBeliDashboardPage` | Transaksi jual beli |
    | 11. Investasi | `InvestasiDashboardPage` | Investasi halal/syariah |
    | 12. Training | `TrainingDashboardPage` | Belajar & evaluasi |
    | 13. Notifikasi | `NotificationPage` | Cek notifikasi & transaksi |
    | 14. Akun & Profil | `AccountPage` | Kelola akun, profil, resignasi |
    | 15. Logout | `UserDropdown` | Keluar aplikasi |

[11] Logout (Modul 15)
    → Tombol **Logout** diakses melalui dropdown **UserDropdown** di header
    → Muncul Swal konfirmasi: "Apakah Anda yakin ingin keluar?"
    → Proses logout: POST logout API → hapus token → redirect ke login

---

### **Flow 2: Returning Member Journey (Anggota Kembali)**

Sama seperti Flow 1, namun user sudah memiliki token dari login sebelumnya dan langsung masuk ke Dashboard Calon Anggota atau dashboard anggota penuh tergantung statusaknya.

---

## Peta Modul → Fitur Utama

| Modul | Fitur Utama | Screenshot Test |
|-------|-------------|-----------------|
| **01** | Splash Screen, Landing Page | `e2e/modules/01-splash-landing/` |
| **02** | Registrasi Akun (Tahap 1) | `e2e/modules/02-registrasi/` |
| **03** | Login, Token Management | `e2e/modules/03-login/` |
| **04** | Lupa Password & OTP Verifikasi | `e2e/modules/04-lupa-password/` |
| **05** | Dashboard Calon Anggota lengkap | `e2e/modules/05-dashboard/` |
| **05-dashboard** | Tombol "Lihat Detail" → registrationPage | `dashboard.spec.mjs` |
| **05-dashboard** | Submit form → SweetAlert → registrationPage | `submit-redirect.spec.mjs` |
| **05-dashboard** | End-to-End approval chain | `approval-chain.spec.mjs` |
| **06** | Simpanan (Pokok/Wajib/Sukarela) | `e2e/modules/06-simpanan/` |
| **06** | Setoran & Pembayaran Tagihan (BillingPage) | `e2e/modules/05-dashboard/billing-flow.spec.mjs` |
| **07** | Tabungan Target | `e2e/modules/07-tabungan/` |
| **07** | Tabungan Target (Detailed) | `e2e/modules/07-tabungan/tabungan-detailed.spec.mjs` |
| **08** | Pinjaman/Pembiayaan | `e2e/modules/08-pinjaman/` |
| **09** | Arisan | `e2e/modules/09-arisan/` |
| **10** | Jual Beli | `e2e/modules/10-jual-beli/` |
| **11** | Investasi | `e2e/modules/11-investasi/` |
| **12** | Training & Evaluasi | `e2e/modules/12-training/` |
| **13** | Notifikasi & Transaksi | `e2e/modules/13-notifikasi/` |
| **14** | Akun & Profil | `e2e/modules/14-akun-profil/` |
| **15** | Logout | `e2e/modules/15-logout/` |
| **16** | **Alur Pengguna Lengkap (New & Returning Member)** | `e2e/modules/16-alur-penggunaan/` |
| **USER-FLOW** | User Workflow E2E | `e2e/modules/user-workflow/user-workflow.spec.mjs` |
| **AUTH-UI** | Auth UI Components | `e2e/modules/auth-ui/auth-ui.spec.mjs` |
| **DERIVED** | Derived Pages | `e2e/modules/derived-pages/derived-pages.spec.mjs` |

---

## File Test Terkait Modul 05 (Dashboard Calon Anggota)

| File Test | Modul | Fitur |
|-----------|-------|-------|
| `e2e/modules/05-dashboard/dashboard.spec.mjs` | Modul 05 | UI test dashboard calon anggota + verifikasi tombol "Lihat Detail" → registrationPage + test adaptif RegistrationSummary → "BAYAR SIMPANAN SEKARANG" → BillingPage |
| `e2e/modules/05-dashboard/submit-redirect.spec.mjs` | Modul 05 | Test submit form 8-step → SweetAlert → registrationPage navigasi |
| `e2e/modules/05-dashboard/approval-chain.spec.mjs` | Modul 05 | Test alur approval Pengawas→Ketua→Bendahara end-to-end (API) |
| `e2e/modules/05-dashboard/billing-flow.spec.mjs` | Modul 05 | Test UI E2E lengkap: calon anggota → approval Pengawas/Ketua → RegistrationSummary → "BAYAR SIMPANAN SEKARANG" → BillingPage (BillList) |
| `e2e/modules/05-dashboard/full-member-journey.spec.mjs` | Modul 05 | Full Member Journey E2E: calon anggota → approval → billing → pembayaran → Bendahara → dashboard anggota reguler |

---

## Ringkasan Alur Besar (Visual)

```
[Splash Screen (5s)]
    ↓
[Landing Page]
    ↓ Klik "Daftar Sekarang"
[Register Account] → [Login]
    ↓
[Dashboard Calon Anggota (status_id=1)]
    ├── CandidateStepsCard (4 tahap)
    ├── NextStepsCard (4 langkah)
    ├── MainMenuSection: SEMUA DINONAKTIFKAN (is-disabled)
    └── Bisa lihat tagihan pending (tampil tapi tidak interaktif)
    ↓
[Isi Form 8 Step (Tahap 2)]
    ↓ Klik "Kirim Sekarang"
[SweetAlert "Berhasil"] → Tombol "Lihat Status Pendaftaran"
    ↓
[RegistrationPage (Status Pendaftaran)]
    ↓
    ├─ Belum terverifikasi → Lihat ketentuan + CTA ke form
    └─ Sudah terdaftar → RegistrationSummary + verifikasi 3 tahap
    ↓
[Proses Approval (Tahap 3)]
    ↓ Pengawas → Ketua → Anggota bayar tagihan → Bendahara final
    ↓ Status berubah jadi APPROVED
    ↓
[MainMenuSection: AKTIF (hilangkan is-disabled)]
    ↓
[Akses Modul 06–15] (Simpanan, Tabungan, Pinjaman, dst)
    ↓
[Logout] (jika ingin keluar)
```

---

## Penjelasan Perubahan

Berikut adalah alasan perubahan utama dari versi sebelumnya:

1. **Alur kini menggikuti journey aktual, bukan modul per modul**: Setiap tahap menghubungkan ke tahap berikutnya (seperti: Dashboard → Form 8-step → SweetAlert → RegistrationPage → Approval → BillingPage → Modul 06+).

2. **Modul 05 sekarang mencakup seluruh journey kandidat**: Dari tampilan dashboard awal hingga proses approval lengkap yang mengakhiri dengan status APPROVED dan pengaktifan main menu.

3. **BillingPage (Tagihan) sekarang terintegrasi**: Alur dari Tahap 3 approval langsung mengarah ke BillingPage untuk pembayaran tagihan Simpanan Pokok & Wajib, sebelum Bendahara melakukan verifikasi final.

4. **Route mapping terperinci**: Setiap halaman route token dimetakan ke komponen sumber yang sesuai, sesuai dengan tabel "Pema Route → Komponen Sumber" di bagian bawah.

5. **File test yang sudah ada**: 5 test file di `e2e/modules/05-dashboard/` sudah mencakup semua fitur utama dashboard, submit-redirect, approval chain, billing-flow, dan full-member-journey.

6. **Modul 16** (`e2e/modules/16-alur-penggunaan/`) adalah implementasi praktis dari alur lengkap ini, yang testing flow dari Splash → Landing → Login → Dashboard → Semua modul 06-15 → Logout.

---