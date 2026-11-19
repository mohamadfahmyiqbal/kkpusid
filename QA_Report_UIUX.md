# Laporan UI/UX: `kkpusid` (frontend anggota KKPUS)

Tanggal: 2026-11-18
Versi laporan: 1.0
Commit diperiksa: `55423eb` (HEAD, branch `master`)
Mode: read-only (tidak ada file produksi yang diubah)

## Ringkasan

- **Keputusan: TIDAK LAYAK** — visual/branding tergolong rapi, tetapi **aksesibilitas belum memenuhi WCAG 2.2 AA** dan ada cacat interaksi pada alur utama (login).
- Jumlah temuan: **Major 9, Minor 7, Saran 5**
- Temuan paling berdampak:
  1. Tombol tampilkan password ikut **men-submit form login** dan tidak punya nama aksesibel (`LoginPage.jsx:204-210`).
  2. **208 kontrol form hanya 20 yang punya `<label htmlFor>`**; field wajib tidak memakai `required`/`aria-required` (`Step1PersonalData.jsx:160-180`, `LoginPage.jsx:167-177`).
  3. Pesan error login **tidak diumumkan** ke screen reader dan fokus tidak dipindahkan (`LoginPage.jsx:150-161`).
  4. **Kontras teks gagal AA**: putih di atas primary 3,68:1, success 2,54:1, warning 2,15:1; teks `#94a3b8` di atas putih 2,56:1.
  5. Banyak elemen `div`/`tr` yang dapat diklik tetapi **tidak dapat dijangkau keyboard** (`ApprovalPlaceholder.jsx:53`, `DataTable.jsx:44-47`, `TagihanSection.jsx:29`).
  6. Sistem desain tidak dipakai konsisten: `App.css` **8.044 baris**, **1.343 warna hardcoded** vs 31 pemakaian token, **423 `!important`**, dan dark mode tidak pernah aktif.
- Di sisi positif: struktur landmark semantik, `lang="id"`, semua 33 gambar punya `alt`, dukungan `prefers-reduced-motion` dan `prefers-contrast`, indikator loading `role="status"`, serta breakpoint responsif tersebar di hampir semua halaman.

## Metode dan batasan

- **Statis:** membaca 265 file JSX, 41 file CSS, `index.html`, `vite.config.js`, dan hasil build.
- **Kontras:** dihitung dari nilai CSS memakai rumus WCAG relative luminance.
- **Tidak dilakukan:** audit runtime dengan browser (tidak ada Playwright/Puppeteer/axe/pa11y di lingkungan), screenshot, dan uji dengan screen reader nyata. Temuan visual yang bergantung pada render akhir (mis. overflow aktual) ditandai **perlu verifikasi**.
- Tidak ada `CONTRIBUTING.md`, `STYLEGUIDE.md`, folder `design/`, atau dokumentasi komponen di repo; baseline memakai WCAG 2.2 AA + Nielsen + HIG.

## Standar yang dipakai

- WCAG 2.2 Level AA (terutama 1.3.1, 1.4.3, 2.1.1, 2.4.1, 2.4.7, 3.3.1, 3.3.2, 4.1.2).
- Nielsen's 10 Usability Heuristics.
- ISO 9241-110 (prinsip dialog), ISO 25010 (usability, accessibility, maintainability).
- Bootstrap 5 / React-Bootstrap sebagai design system de facto, plus token CSS di `App.css`.

## Cakupan

Diperiksa: `src/features/auth`, `src/features/dashboard`, `src/pages/**` (login, pendaftaran, simpanan, jual beli, program, investasi, tabungan, training, invoice, receipt), `src/components/**` (layout, dropdown, tabel, form, feedback), `src/styles`, `src/index.css`, `src/App.css`, `public/`, dan output build.

## Matriks heuristik Nielsen

| Heuristik | Status | Bukti singkat |
|---|---|---|
| Visibility of system status | Sebagian | Spinner + teks "Memuat/Memproses" ada; tetapi beberapa proses hanya `alert()` |
| Match with real world | Baik | Istilah simpanan/pembiayaan/akad konsisten, format Rupiah |
| User control & freedom | Sebagian | Modal/dropdown bisa ditutup (Escape), tetapi `alert()` memblokir |
| Consistency & standards | **Gagal** | 3 pola feedback (Swal 46, toast 16, `alert()` 8); 8+ formatter Rupiah |
| Error prevention | Sebagian | Validasi inline ada; tombol mata password men-submit form |
| Recognition vs recall | Baik | Sidebar, breadcrumb, ikon + label |
| Flexibility & efficiency | Sebagian | Shortcut keyboard ada; tidak ada skip link |
| Aesthetic & minimalist design | Baik | Visual modern, ilustrasi konsisten |
| Help users recognize/recover from errors | **Gagal** | Error tidak diumumkan, tidak fokus ke field bermasalah |
| Help & documentation | Kurang | README masih boilerplate CRA; tidak ada pusat bantuan in-app |

## Matriks WCAG 2.2 AA (ringkas)

| Kriteria | Status | Bukti |
|---|---|---|
| 1.3.1 Info & Relationships | **Gagal** | 208 kontrol vs 20 `htmlFor`; label tidak terhubung |
| 1.4.3 Contrast (Minimum) | **Gagal** | 4 pasangan warna < 4,5:1 |
| 1.4.4 Resize Text / 1.4.10 Reflow | Perlu verifikasi | Teks 8–9px; 213 lebar tetap; 76 `overflow:hidden` |
| 2.1.1 Keyboard | **Gagal** | `div`/`tr` klik tanpa `tabIndex`/`onKeyDown` |
| 2.4.1 Bypass Blocks | **Gagal** | `.skip-link` ada di CSS tetapi tidak dirender |
| 2.4.7 Focus Visible | Sebagian | 52 aturan `:focus`, 8 `:focus-visible`; elemen klik non-fokus tidak punya outline |
| 3.3.1 Error Identification | Sebagian | Pesan error ada, tidak terhubung ke kontrol |
| 3.3.2 Labels or Instructions | **Gagal** | Placeholder dipakai sebagai satu-satunya petunjuk; tidak ada `required` |
| 4.1.2 Name, Role, Value | **Gagal** | Tombol ikon tanpa `aria-label` (mis. mata password), dropdown tanpa `role="menu"` |
| 4.1.3 Status Messages | **Gagal** | Hanya 5 `role="alert"`/`aria-live` untuk 265 halaman |

## Matriks responsif

| Aspek | Status | Bukti |
|---|---|---|
| Breakpoint konsisten | Sebagian | 29× `768px`, 24× `576px`, tetapi juga `991px`, `991.98px`, `767.98px`, `575.98px` |
| Layout mobile-first | Sebagian | Banyak media query max-width; body 14px; sidebar punya mode mobile |
| Tabel responsif | Baik | 12 dari 13 tabel memakai `responsive`/wrapper; `NotificationScreen.jsx:121` belum |
| Target sentuh ≥ 24px | Perlu verifikasi | Ada `width/height: 24px` untuk ikon; tombol utama Bootstrap memadai |
| Gambar & aset | **Gagal** | 1 dari 33 gambar memakai `loading="lazy"`; 22 MB di `public/` |

## Temuan

### [Major] Tombol tampilkan password men-submit form login dan tidak punya nama aksesibel

- Lokasi: `src/features/auth/login/page/LoginPage.jsx:204-210`
- Aspek: Fungsional + WCAG 4.1.2, 2.1.1
- Bukti:
  ```jsx
  <Button
    variant="light"
    className="border border-start-0 text-muted pbs-password-eye-btn"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </Button>
  ```
  Tidak ada `type="button"` di dalam `<Form onSubmit={handleLogin}>`, dan tidak ada `aria-label`, `aria-pressed`, atau teks tersembunyi.
- Dampak: Menekan ikon mata langsung mengirim form dengan kredensial yang mungkin belum lengkap, memicu error yang membingungkan. Screen reader hanya membacanya sebagai "button" tanpa tujuan. Ini cacat pada alur utama aplikasi.
- Rekomendasi: tambahkan `type="button"`, `aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}`, `aria-pressed={showPassword}`, dan `aria-controls` ke `id` input password.

### [Major] Label form tidak terhubung secara programatik dan field wajib tidak ditandai

- Lokasi:
  - `src/features/auth/login/page/LoginPage.jsx:173-177` dan `:190-201`
  - `src/pages/anggota/RegistrationFormDetail/components/steps/Step1PersonalData.jsx:160-180`
  - Pola berulang di 208 `<Form.Control>`/`<input>` vs hanya 20 `htmlFor` di seluruh `src/`
- Aspek: WCAG 1.3.1, 3.3.2, 4.1.2
- Bukti:
  ```jsx
  <Form.Label>Email atau Nomor WhatsApp</Form.Label>
  <Form.Control
    value={emailHp}
    onChange={...}
    placeholder={AUTH_CONSTANTS.PLACEHOLDERS.EMAIL_OR_PHONE}
  />
  ```
  `Form.Label` tidak punya `htmlFor` dan `Form.Control` tidak punya `id`. Pada langkah pendaftaran, `Form.Label` juga tidak menandai wajib, dan tidak ditemukan `required`/`aria-required` di seluruh folder pendaftaran (0 hasil).
- Dampak: Screen reader mengumumkan input tanpa nama (hanya placeholder yang hilang saat mengetik). Pengguna keyboard/screen reader tidak tahu field mana yang wajib. Ini menghalangi penyelesaian pendaftaran bagi pengguna assistive technology.
- Rekomendasi: beri `id` unik pada setiap kontrol dan `htmlFor` pada label; tambahkan `required` + `aria-required="true"`; gunakan `aria-describedby` untuk teks bantuan; jadikan placeholder hanya contoh, bukan label.

### [Major] Pesan error tidak diumumkan, tidak terhubung ke field, dan fokus tidak dipindahkan

- Lokasi: `src/features/auth/login/page/LoginPage.jsx:150-161`; `Form.Control.Feedback` di `:182-184`, `:211-213`; hanya 8 `aria-describedby`/`aria-invalid` eksplisit di seluruh `src/`
- Aspek: WCAG 3.3.1, 4.1.3, 2.4.3
- Bukti:
  ```jsx
  {error && (
    <div className="alert alert-danger ...">
      <span className="small fw-semibold">{error}</span>
    </div>
  )}
  ```
  Tidak ada `role="alert"`, `aria-live="assertive"`, atau `aria-atomic`. Setelah submit gagal, fokus tetap di tombol submit.
- Dampak: Pengguna screen reader tidak tahu login gagal; pengguna low-vision tidak diarahkan ke field yang salah. Percobaan berulang meningkatkan frustrasi dan risiko akun terkunci.
- Rekomendasi: bungkus error dengan `role="alert"`, hubungkan feedback ke input (`aria-describedby`), set `aria-invalid`, dan pindahkan fokus ke ringkasan error atau field pertama yang gagal.

### [Major] Elemen yang dapat diklik tidak dapat dijangkau keyboard

- Lokasi:
  - `src/components/ui/ApprovalPlaceholder.jsx:53` (`<div onClick={handleClick}>` tanpa `role`/`tabIndex`/`onKeyDown`)
  - `src/components/ui/DataTable.jsx:44-47` (`<tr onClick={...}>`)
  - `src/features/dashboard/components/TagihanSection.jsx:29`
  - `src/pages/anggota/AccountPage/components/SecurityAndActivitySection.jsx:34`
  - `src/pages/global/NotificationPage/page/NotificationSidebar.jsx:24,35,46`
  - `src/features/dashboard/components/ArticleCardSection.jsx:25`
- Aspek: WCAG 2.1.1, 2.4.7
- Bukti:
  ```jsx
  <div className="text-center" onClick={handleClick} style={{ cursor: "pointer" }}>
  ...
  <tr onClick={() => onRowClick && onRowClick(row)} style={{ cursor: "pointer" }}>
  ```
- Dampak: Pengguna keyboard tidak dapat membuka detail persetujuan, membayar tagihan, membuka pengaturan keamanan, atau memilih baris tabel. Ini memblokir fungsi inti bagi pengguna tanpa mouse.
- Rekomendasi: gunakan `<button>`/`<a>`; bila harus mempertahankan elemen, tambahkan `role="button"`, `tabIndex={0}`, `onKeyDown` untuk Enter/Space, dan gaya `:focus-visible` yang jelas.

### [Major] Kontras warna di bawah ambang WCAG AA

- Lokasi:
  - Token: `src/App.css:9-29`
  - Teks metadata `#94a3b8`: `src/features/dashboard/styles/DashboardPage.css:830,986,1101`; `src/App.css:7797`; `src/components/layout/dropdowns/UserDropdown.css:158,164`
  - Tombol/status berwarna: `src/App.css:6790` dan kartu status `src/components/program/ProgramStatusCard.css:167,173`
- Aspek: WCAG 1.4.3
- Bukti (dihitung dari nilai CSS):

  | Kombinasi | Rasio | Ambang teks normal |
  |---|---|---|
  | `#ffffff` di `#3b82f6` (primary) | **3,68:1** | gagal (butuh 4,5:1) |
  | `#ffffff` di `#10b981` (success) | **2,54:1** | gagal |
  | `#ffffff` di `#14b8a6` (secondary) | **2,49:1** | gagal |
  | `#ffffff` di `#f59e0b` (warning) | **2,15:1** | gagal |
  | `#94a3b8` di `#ffffff` | **2,56:1** | gagal |
  | `#94a3b8` di `#f8fafc` | **2,45:1** | gagal |

- Dampak: Teks kecil pada tombol hijau/kuning, badge, dan metadata dashboard sulit dibaca, terutama di layar redup atau bagi pengguna low-vision. Ini juga memengaruhi kredibilitas pada aplikasi keuangan.
- Rekomendasi: gunakan varian lebih gelap untuk teks putih (mis. primary `#2563eb` = 5,17:1, success `#047857`, warning `#b45309`), atau pilih teks gelap di atas latar terang. Simpan token semantik dan uji otomatis dengan axe.

### [Major] Tidak ada tautan "lewati ke konten" (skip link)

- Lokasi: `src/App.css:534-549` mendefinisikan `.skip-link`, tetapi tidak ada JSX yang memakainya; pencarian `skip-link` hanya menemukan CSS.
- Aspek: WCAG 2.4.1
- Bukti: `grep -rn "skip-link" src` → hanya `App.css:534` dan `App.css:546`. Tidak ada elemen `<a href="#main-content">` di layout.
- Dampak: Pengguna keyboard harus menekan Tab melewati seluruh sidebar/topbar (puluhan tautan) di setiap halaman sebelum mencapai konten.
- Rekomendasi: render `<a href="#main-content" className="skip-link">Lewati ke konten utama</a>` sebagai elemen pertama `LayoutGlobal`, dan pastikan target punya `id="main-content"` serta `tabIndex={-1}`.

### [Major] Sistem tipografi tidak konsisten dan tidak pernah memuat font yang dideklarasikan

- Lokasi: `src/index.css:6-21`, `:27-50`; `src/index.jsx:3,6`; `src/pages/program/pinjaman/FormPengajuanPinjaman.css:4`; `src/pages/program/arisan/FormPengajuanArisan.css:3`
- Aspek: Konsistensi visual, performa render
- Bukti:
  ```css
  body { font-family: "Inter", -apple-system, ...; }   /* Inter tidak pernah dimuat */
  h1,.h1 { font-size: 1.75rem !important; } ... h6 { font-size: .85rem !important; }
  ```
  ```jsx
  import "./index.css";
  import App from "./App";
  import "bootstrap/dist/css/bootstrap.min.css";   // Bootstrap dimuat SETELAH index.css
  ```
  Hanya dua file CSS halaman yang mengimpor Google Fonts (`Outfit`, `Plus Jakarta Sans`) lewat `@import` — render-blocking dan hanya berlaku di halaman itu.
- Dampak: Tampilan bergantung pada font sistem perangkat, sehingga layout dan lebar teks berbeda antar OS. Dua halaman memakai keluarga font berbeda dari halaman lain. `!important` pada heading memaksa override global yang menyulitkan kustomisasi. Urutan impor membuat aturan dasar `index.css` kalah oleh Bootstrap.
- Rekomendasi: pilih satu keluarga font (self-host atau `preconnect` + `display=swap`), muat di `index.html`, hapus `@import` per halaman, tetapkan skala tipografi sebagai token, dan impor CSS pihak ketiga sebelum CSS aplikasi.

### [Major] Design token tidak diadopsi dan dark mode tidak berfungsi

- Lokasi: `src/App.css:1-105` (token + tema gelap), `:507-530` (partial override), `src/contexts/ThemeContext.jsx:17-22`, `src/components/ui/ThemeToggle.jsx:17`
- Aspek: Konsistensi desain, maintainability
- Bukti:
  - `App.css` **8.044 baris**, **1.343** warna hex hardcoded, hanya **31** pemakaian `rgb(var(--color-*))`, **423** `!important`.
  - `ThemeProvider` mengunci `theme: "light"` dan tidak pernah menulis `data-theme` ke `<html>`.
  - `ThemeToggle` memanggil `toggleTheme`, `setTheme`, `systemTheme` yang **tidak disediakan** provider, dan komponen ini tidak dipakai di mana pun.
- Dampak: Tema gelap yang sudah ditulis di CSS tidak dapat diaktifkan; tombol tema (jika dipasang) akan error. Perubahan warna harus menyunting ratusan nilai hardcoded, sehingga risiko inkonsistensi tinggi dan biaya perubahan mahal.
- Rekomendasi: implementasikan `ThemeProvider` yang menulis `data-theme`, sediakan `toggleTheme/setTheme/systemTheme`, migrasikan CSS ke token secara bertahap (mulai dari halaman utama), dan hapus komponen/aturan mati.

### [Major] Kinerja UI: aset legacy besar, bundle berat, dan gambar tanpa lazy loading

- Lokasi: `public/` (22 MB), `public/dist/css/style.min.css:1` (404 KB), `public/dist/scss/icons/.../*.svg` (hingga 1,9 MB), `src/index.jsx:6` (Bootstrap penuh), `src/pages/**` (33 `<img>`)
- Aspek: Performa UI / Core Web Vitals
- Bukti:
  - `du -sh public` → **22 MB**; `public/dist/` berisi tema legacy + font ikon yang tidak direferensikan aplikasi.
  - Build: `vendor-CHYBhA0-.js` **1,55 MB** (belum termasuk chunk React 267 KB dan framer 32 KB); total JS build **2,8 MB**.
  - `grep 'loading="lazy"'` → **1** dari 33 gambar.
  - Dua `@import` Google Fonts di CSS halaman memblokir render.
- Dampak: Unduhan awal berat (terutama di jaringan seluler), LCP/TBT memburuk, dan biaya bandwidth naik. Aset legacy juga memperbesar deploy.
- Rekomendasi: hapus `public/dist` yang tidak terpakai, optimalkan/konversi gambar ke WebP + `loading="lazy"`/`fetchpriority`, audit bundle (`rollup-plugin-visualizer`), impor komponen Bootstrap yang dipakai saja, dan self-host font.

### [Minor] Pola feedback tidak konsisten: `alert()` browser di tengah alur

- Lokasi: `src/pages/jualBeli/FPengajuanJB.jsx:99,117,121`; `src/pages/simpanan/PencairanSimpananScreen.jsx:81`; `src/pages/simpanan/SukarelaScreen.jsx:76`; `src/pages/global/transaction/components/ActionButtons.jsx:169,172,175`
- Aspek: Konsistensi & aksesibilitas
- Bukti:
  ```js
  alert("DP tidak boleh lebih besar dari harga barang!");
  alert("Pengajuan berhasil disimpan!");
  ```
  Aplikasi juga memakai SweetAlert2 (46 pemanggilan) dan react-toastify (16 pemanggilan).
- Dampak: `alert()` memblokir UI, tidak bisa didesain, tidak konsisten dengan tema, dan pada beberapa browser tidak terbaca baik oleh screen reader. Pengguna melihat tiga "bahasa" feedback berbeda.
- Rekomendasi: standarkan tiga kanal: toast untuk sukses ringan, inline error untuk validasi field, dan modal Swal untuk keputusan penting. Larang `alert()` lewat lint rule.

### [Minor] Format angka/uang diduplikasi di banyak tempat

- Lokasi: `src/utils/formatRupiah.jsx:4`; `src/utils/helper/formatRupiah.js:6`; `src/pages/global/BillingPage/components/utils.js:4,23`; `src/pages/global/ReceiptPage/components/receiptHelpers.js:7`; `src/pages/investasi/FormPendanaanSyariah/components/formHelpers.js:27`; implementasi lokal di `FormPengajuanJualBeli.jsx:29`, `DetailSukuk.jsx:46`, `InvestasiHalal.jsx:27`, `PendanaanSyariah.jsx:40`, `SetoranTabungan.jsx:122`
- Aspek: Konsistensi
- Bukti: 8+ definisi `formatCurrency`/`formatRupiah`/`formatIDR` yang terpisah; sebagian memakai `Intl.NumberFormat`, sebagian `toLocaleString`, sebagian manual `"Rp " + angka`.
- Dampak: Format bisa berbeda (desimal, spasi, pemisah ribuan) antar halaman untuk nominal yang sama — membingungkan pada aplikasi keuangan.
- Rekomendasi: satu modul `formatCurrency`/`formatDate` berbasis `Intl` dengan locale `id-ID`, lalu hapus implementasi lokal.

### [Minor] Campuran bahasa Inggris pada antarmuka berbahasa Indonesia

- Lokasi: `src/components/layout/dropdowns/UserDropdown.jsx:203,285,288` ("Guest User", "No email"), `src/components/layout/components/Sidebar.jsx:278` (`aria-label="Close sidebar"`), `LoginPage.jsx:51` (`alt="PUS Logo"`), `LoginPage.jsx:104` (`alt="Illustration"`)
- Aspek: WCAG 3.1.2, konsistensi
- Bukti: label terlihat dan nama aksesibel bercampur Inggris/Indonesia tanpa mekanisme terjemahan.
- Dampak: Pengguna berbahasa Indonesia melihat istilah asing; screen reader membacakan label Inggris dengan pelafalan Indonesia.
- Rekomendasi: gunakan satu bahasa untuk UI dan `aria-label` (Indonesia), lalu siapkan lapisan i18n bila multibahasa dibutuhkan.

### [Minor] Tabel notifikasi belum responsif

- Lokasi: `src/pages/global/NotificationScreen.jsx:121`
- Aspek: Responsif (1.4.10 Reflow)
- Bukti:
  ```jsx
  <Table>
    <tbody>{notifikasi?.map(...)}</tbody>
  </Table>
  ```
  12 dari 13 tabel lain sudah memakai `responsive`/`table-responsive`.
- Dampak: Di layar sempit, tabel dapat mendorong lebar halaman dan memaksa scroll horizontal seluruh halaman.
- Rekomendasi: bungkus dengan `<div className="table-responsive">` atau ubah menjadi daftar kartu di mobile.

### [Minor] Teks sangat kecil (8–9px) di kartu dashboard

- Lokasi: `src/pages/jualBeli/JualBeliDashboardPage.css:199,285,466,549,559,817`; `src/components/program/ProgramStatusCard.css:288,300`; `src/pages/program/ProgramPage.css:396,465,481`; `src/pages/program/arisan/ArisanPage.css:90`
- Aspek: WCAG 1.4.4, keterbacaan
- Bukti: `font-size: 8px;` dan `font-size: 9px;` pada label status, kode, dan metadata.
- Dampak: Sulit dibaca di perangkat seluler dan saat zoom; informasi penting (status/kode) menjadi tidak terbaca.
- Rekomendasi: tetapkan ukuran minimum 12px untuk metadata dan 14px untuk teks isi; gunakan `rem` agar mengikuti preferensi pengguna.

### [Minor] Nama aksesibel generik dan dropdown tanpa semantik menu

- Lokasi: `src/features/dashboard/components/financial/FinancialCard.jsx:30,34,37` (`aria-label="Detail"`, `"Refresh"`, `"Toggle"`); `src/components/layout/dropdowns/UserDropdown.jsx:103,151-152`; `src/components/layout/dropdowns/NotificationDropdown.jsx:63,107-108`
- Aspek: WCAG 4.1.2, 2.1.1
- Bukti: dropdown hanya menangani `Escape`, tanpa navigasi panah/`role="menu"`/`role="menuitem"`; `aria-current` hanya dipakai 1 kali di seluruh aplikasi.
- Dampak: Pengguna screen reader mendengar "Toggle" tanpa konteks; pengguna keyboard tidak dapat menelusuri item dropdown dengan panah dan tidak tahu halaman aktif di navigasi.
- Rekomendasi: gunakan label spesifik ("Sembunyikan saldo", "Muat ulang saldo"), tambahkan pola menu ARIA atau gunakan React-Bootstrap Dropdown, dan set `aria-current="page"` pada tautan aktif.

### [Minor] Aset dan komponen mati membebani repo serta membingungkan kontributor

- Lokasi: `public/dist/**` (tema legacy, CSS 404 KB, font ikon), `_unused/` (166 file ter-track), `src/components/ui/ThemeToggle.jsx:1` (tidak dipakai), dependensi `@fortawesome/*` dan `phosphor-react` di `package.json` (tidak ditemukan impornya)
- Aspek: Maintainability
- Bukti: `git ls-files _unused | wc -l` → 166; `ThemeToggle` tidak direferensikan; hanya `react-icons` yang diimpor.
- Dampak: Kontributor bingung mana komponen aktif, ukuran repo/deploy membengkak, dan audit aset jadi lebih lambat.
- Rekomendasi: hapus aset legacy dan dependensi tak terpakai, arsipkan `_unused/` di branch terpisah, dan tambahkan aturan "tidak ada kode mati" di review.

## Hal yang sudah baik

- **Landmark semantik**: `header`, `main`, `nav` dengan `aria-label="Main menu"` (`Sidebar.jsx:259`), serta `<html lang="id">`.
- **Semua 33 gambar memiliki `alt`** (meski beberapa masih generik).
- **Dukungan preferensi pengguna**: `prefers-reduced-motion` dan `prefers-contrast: high` sudah ditangani di `App.css:86-105`.
- **Status loading**: spinner memakai `role="status"` dan `aria-hidden` pada ikon (`LoginPage.jsx:220-224`), teks "Memproses..." tetap terlihat.
- **Validasi inline**: `isInvalid` + `Form.Control.Feedback` sudah dipakai konsisten di banyak form (tinggal dihubungkan secara ARIA).
- **Navigasi keyboard dasar**: dropdown dapat ditutup dengan Escape (`UserDropdown.jsx:103`, `NotificationDropdown.jsx:63`), sidebar punya `aria-expanded`/`aria-label`.
- **Responsif cukup luas**: 29 breakpoint `768px` dan 24 breakpoint `576px`, tabel umumnya sudah `responsive`.
- **Identitas visual konsisten**: palet biru–teal, ilustrasi, dan kartu modern dipakai seragam di halaman utama.
- **Fokus terlihat**: 52 aturan `:focus`/`:focus-visible` sudah didefinisikan untuk banyak komponen.

## Saran

1. **Tambahkan gate aksesibilitas otomatis** — `eslint-plugin-jsx-a11y` + `@axe-core/react`/pa11y di CI, dengan ambang 0 pelanggaran serius pada halaman login, dashboard, pendaftaran, dan invoice.
2. **Buat dokumentasi desain** — `STYLEGUIDE.md` berisi token warna/tipe/spacing, status komponen, dan contoh pemakaian; pertimbangkan Storybook.
3. **Uji zoom 200% dan lebar 320–360px** untuk semua halaman transaksi; perbaiki tabel/teks kecil yang pecah.
4. **Satukan lapisan format & bahasa** — satu modul `Intl` untuk uang/tanggal dan satu sumber string UI (Indonesia).
5. **Selesaikan atau hapus dark mode** — implementasikan provider tema yang benar-benar menulis `data-theme` dan migrasikan warna hardcoded ke token.

## Langkah prioritas

1. **Hari ini:** perbaiki tombol mata password (`type="button"` + `aria-label`), hubungkan label (`htmlFor`/`id`), dan umumkan error (`role="alert"`).
2. **Minggu ini:** ganti elemen klik non-semantik dengan `button`/`a`, tambahkan skip link, dan perbaiki kontras token warna.
3. **Minggu ini:** hapus `public/dist`, aktifkan lazy loading gambar, dan optimalkan bundle.
4. **Bulan ini:** migrasikan `App.css` ke token + komponen terdokumentasi, selesaikan dark mode, dan jalankan audit axe/pa11y rutin.
