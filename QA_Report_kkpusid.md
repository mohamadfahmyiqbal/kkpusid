# Laporan QA: `kkpusid` (frontend anggota KKPUS)

Tanggal: 2026-11-18
Versi laporan: 1.0
Commit diperiksa: `55423eb` (HEAD, branch `master`)
Mode: read-only (tidak ada file produksi yang diubah; build diarahkan ke `/tmp/opencode/kkpusid-dist`)

## Ringkasan

- **Keputusan: TIDAK LAYAK — ada material kunci privat domain `*.kkpus.id` di repositori publik.**
- Jumlah temuan: **Blocker 1, Major 8, Minor 8, Saran 3**
- Aplikasi ini adalah frontend anggota koperasi syariah: login, pendaftaran anggota (foto KTP + swafoto), simpanan, pembiayaan/jual beli, arisan, sukuk, tagihan, dan pembayaran Midtrans/DOKU. Audit menemukan: **private key + fullchain certificate untuk `kkpus.id`, `*.kkpus.id`, dan `api.kkpus.id` ter-commit di repo GitHub publik**, **otorisasi halaman hanya berbasis token base64 tanpa tanda tangan sehingga semua halaman "protected" dapat dibuka tanpa login**, **seluruh data pendaftaran termasuk foto KTP base64 disimpan permanen di `localStorage`**, **build produksi masih memuat Snap/DOKU sandbox**, serta **gate kualitas (lint/test/audit) tidak berjalan**.
- Di sisi positif: konten materi training dirender dengan `DOMPurify`, berkas bukti transfer diambil lewat `fetch` ber-`Authorization` (bukan token di URL), ada `ErrorBoundary`, pemisahan chunk, dan pembersihan sebagian kredensial saat logout.

> **Tindakan segera (sebelum hal lain):** cabut/revoke certificate `cert/kkpusid/fullchain.pem`, terbitkan ulang key & sertifikat, hapus `cert/` dari riwayat git (`git filter-repo`/BFG), ganti kunci Root CA bila kunci CA ikut terekspos, dan jadikan repo privat.

## Standar yang dipakai

- **Proyek:** tidak ada `AGENTS.md`/standar tertulis, tidak ada konfigurasi ESLint di repo, 1 test trivial, CI hanya build+deploy.
- **Baseline:** ISO/IEC 27001:2022 Annex A, ISO/IEC 25010, OWASP Top 10/ASVS, CWE Top 25, WCAG 2.2 AA, ISTQB.
- **Fintech:** UU PDP No. 27/2022, POJK/SEOJK & PBI/PSBI, FATF/AML-KYC, PCI DSS v4.0.1 (relevan: pembayaran Midtrans/DOKU), ISO 22301/27035.

## Cakupan

- **Diperiksa:** 510 file di `src/`, `index.html`, `vite.config.js`, `package.json`/lockfile, `.env*`, `cert/`, `public/`, `build/`, `_unused/`, `.github/workflows/deploy.yml`, riwayat git, dan `npm audit`.
- **Tidak diperiksa:** backend (sudah diaudit terpisah di `api.kkpus.id/QA_Report_api.md`), konfigurasi nginx/VPS, dan perilaku runtime di perangkat nyata. Klaim tentang header produksi atau validasi server ditandai **tidak terverifikasi**.
- **Jalur uang:** tagihan → `InvoicePage` → `UBilling.createMidtransTransaction` → Snap/DOKU; pencairan & pembiayaan → `TransactionDetailPage`/`ReceiptPage`; pendaftaran → unggah KTP/swafoto base64 → `AnggotaService.submitRegistration`.

## Hasil perintah yang dijalankan

| Perintah | Hasil | Catatan |
|---|---|---|
| `npx vite build --outDir /tmp/opencode/kkpusid-dist` | **exit 0** (50,01 s) | Sukses; `vendor-CHYBhA0-.js` 1.551 kB |
| `npm run test:ci` | **exit 0** | 1 file, 1 test lulus (`src/App.test.jsx`) |
| `npm run lint` | **exit 2** | `Invalid option '--ext'`; ESLint juga memakai `eslint.config.js` dari direktori induk |
| `npm audit` | **31 temuan: 1 critical, 23 high, 7 moderate** | `dompurify` critical; `axios`, `vite`, `vitest`, `ws`, `engine.io` high |
| `git ls-files build \| wc -l` | **775** | Artefak build ter-track (27 MB) |
| `git ls-files \| grep -E "cert\|\.env"` | `.env`, `.env.*`, 9 file cert | Termasuk `privkey.pem` |
| `openssl x509 -ext subjectAltName` | `localhost, api.kkpus.id, kkpus.id, *.kkpus.id` | Key pasangannya ada di repo |
| `git ls-files _unused \| wc -l` | **166** | Termasuk `corrupt_DetailSaldoPage.jsx` |

## Matriks kepatuhan ISO/IEC 27001:2022 (Annex A)

| Kontrol | Status | Bukti / temuan |
|---|---|---|
| A.5.17 secret & kredensial | **Gagal** | Private key & fullchain di repo publik (T1) |
| A.8.2 hak akses istimewa | **Gagal** | Otorisasi halaman hanya di klien dan dapat dipalsukan (T2) |
| A.8.3 pembatasan akses informasi | **Gagal** | Halaman protected terbuka tanpa login; PII tersimpan di browser (T2, T4) |
| A.8.5 autentikasi aman | **Gagal** | Token di `localStorage`; reset token di `localStorage`; XSS → session theft (T3, M8) |
| A.8.8 manajemen kerentanan | **Gagal** | 31 CVE, 1 critical, 23 high (M5) |
| A.8.28 secure coding | **Gagal** | `html:` SweetAlert tanpa sanitasi; CSP longgar (T3, M7) |
| A.8.29 pengujian keamanan | **Gagal** | 1 test trivial; lint rusak; CI tanpa test/audit (M4) |
| A.8.32 manajemen perubahan | **Gagal** | Deploy langsung dari branch tanpa gate (M4) |
| A.5.34 privasi PII | **Gagal** | Foto KTP/swafoto base64 disimpan di `localStorage` (T4) |
| A.8.9 manajemen konfigurasi | **Gagal** | `.env` & `build/` ter-track padahal di-`.gitignore` (M6) |
| A.8.24 kriptografi | **Gagal** | "JWT" tanpa tanda tangan (`alg: none`) dipakai sebagai kontrol rute (T2) |
| A.8.15 logging | Sebagian | 90 `console.log`, termasuk hasil pembayaran (m1) |
| A.8.13 backup / A.8.14 redundansi | Tidak terverifikasi | Tidak ada bukti di repo |

## Matriks regulasi

| Regulasi / standar | Berlaku? | Bukti | Status | Temuan |
|---|---|---|---|---|
| UU PDP No. 27/2022 | Ya | KTP/swafoto disimpan tanpa enkripsi di `localStorage`; tidak ada kebijakan retensi | **Gagal** | T4 |
| POJK/SEOJK (OJK) | Ya | Tidak ada dokumen izin/kebijakan di repo | Tidak terverifikasi | T2, T4 |
| AML/CFT & KYC (FATF/PPATK) | Ya | Tidak ada CDD/PEP/sanctions screening; foto KTP tanpa kontrol penyimpanan | Tidak terverifikasi | T4 |
| PCI DSS v4.0.1 | Ya (Midtrans/DOKU) | Tidak ada AoC/SAQ; script gateway pihak ketiga tanpa SRI | Tidak terverifikasi | T5, M7 |
| ISO 22301 (BCM) | Tidak diwajibkan eksplisit | Tidak ada runbook/RTO/RPO | Tidak terverifikasi | — |

## Matriks kebenaran finansial

| Skenario | Diharapkan | Aktual | Temuan |
|---|---|---|---|
| Pengguna membuka halaman pembayaran tanpa login | Dialihkan ke login | Halaman dirender karena token rute dapat dibuat sendiri | T2 |
| Pembayaran di produksi | Snap/DOKU produksi | Script **sandbox** Midtrans & DOKU dimuat | T5 |
| Nominal tagihan diubah di klien | Server menghitung ulang | Server menghitung ulang dari `BillItem` untuk tagihan (baik); nominal deposit memang dari klien | Hal baik |
| Status pembayaran setelah Snap ditutup | Menunggu webhook, bukan status klien | `onUpdateStatus` dipanggil dari callback Snap, tetapi status akhir tetap dari polling/webhook | Perlu verifikasi |
| Login lalu membuka realtime pembiayaan | Socket terhubung | `TransactionProvider` membaca `authToken` yang tidak pernah diisi | M3 |
| Reset password | Token hanya di memori/HttpOnly | `resetPasswordToken` disimpan di `localStorage` | M8 |

## Abuse case dan skenario fraud

| Abuse case | Kontrol | Hasil |
|---|---|---|
| Membuka dashboard tanpa login | Guard rute | **Tidak ada** — token rute dibuat sendiri (T2) |
| Mencuri sesi lewat XSS | Sanitasi + CSP + cookie HttpOnly | Token di `localStorage`, `html:` tanpa sanitasi, CSP `unsafe-inline` (T3, M7) |
| Mengambil foto KTP dari perangkat bersama | Penyimpanan sementara terenkripsi | Base64 KTP tersimpan permanen di `localStorage` (T4) |
| MITM/impersonasi domain | TLS key aman | Private key wildcard publik (T1) |
| Mengarahkan korban ke situs lain | Validasi URL | `data.link` dari socket langsung dipakai `location.href` (m2) |
| Mengambil alih akun via reset password | Token reset sekali pakai & aman | Token reset di `localStorage`, dapat dicuri XSS (M8) |

## Exit criteria

| Kriteria | Ambang | Aktual | Status |
|---|---|---|---|
| 0 private key/secret di repo & riwayat | 0 | ≥1 private key + fullchain | **Gagal** |
| Otorisasi halaman diverifikasi server/token bertanda tangan | 100% | 0% (token `alg:none`) | **Gagal** |
| PII tidak disimpan di `localStorage` | 0 | KTP + swafoto base64 | **Gagal** |
| Pembayaran produksi memakai endpoint produksi | 100% | 0% (sandbox) | **Gagal** |
| Critical/High CVE | 0 | 24 | **Gagal** |
| Lint + test berjalan di CI | wajib | lint gagal, 1 test trivial | **Gagal** |
| Test jalur uang & auth | 100% | 0% | **Gagal** |

## Temuan

### [Blocker] Private key dan fullchain certificate `*.kkpus.id` ter-commit di repositori publik

- Lokasi:
  - `cert/kkpusid/privkey.pem` (baris 1, ter-track git)
  - `cert/kkpusid/fullchain.pem` (baris 1)
  - `cert/localhost-key.pem:1`
  - `src/cert/localhost.key:1`
- Aspek / standar: Keamanan / ISO 27001 A.5.17, A.8.24 / OWASP A02
- Klasifikasi: ketidaksesuaian mayor
- Bukti:
  ```
  $ git ls-files cert src/cert
  cert/kkpusid/fullchain.pem
  cert/kkpusid/privkey.pem
  cert/localhost-key.pem
  ...
  $ openssl x509 -in cert/kkpusid/fullchain.pem -noout -ext subjectAltName
  DNS:localhost, DNS:api.kkpus.id, DNS:kkpus.id, DNS:*.kkpus.id, IP Address:127.0.0.1
  $ openssl x509 -modulus ... | md5sum   → aee5adc7...
  $ openssl rsa  -modulus ... | md5sum   → aee5adc7...  (key cocok dengan sertifikat)
  $ curl https://api.github.com/repos/mohamadfahmyiqbal/kkpusid → private: false
  ```
  Sertifikat diterbitkan `KKPUS Root CA`, berlaku 2026-09-29 s/d 2029-01-01, dan mencakup wildcard seluruh subdomain.
- Dampak: Siapa pun dapat mengunduh private key dari repo publik. Jika sertifikat ini dipakai pada server (`api.kkpus.id`/`kkpus.id`), penyerang dapat melakukan MITM/impersonasi domain, membuka sesi TLS palsu, dan mencuri kredensial serta data nasabah. Karena kuncinya juga mencakup `*.kkpus.id`, seluruh subdomain berisiko. Kunci yang pernah publik harus dianggap bocor meskipun sertifikatnya self-signed/internal.
- Rekomendasi: (1) revoke dan terbitkan ulang sertifikat + key; (2) hapus `cert/` dan `src/cert/` dari seluruh riwayat git, force-push terkoordinasi; (3) ganti kunci Root CA bila kunci CA pernah ikut terekspos; (4) pindahkan manajemen sertifikat ke secret manager/Vault dan mount saat runtime; (5) aktifkan secret scanning (gitleaks/GitHub Advanced Security); (6) jadikan repo privat.

### [Major] Otorisasi halaman memakai "JWT" tanpa tanda tangan dan tanpa guard login

- Lokasi:
  - `src/routes/helpers.jsx:2-12` (encode `alg: "none"`, signature kosong)
  - `src/routes/EncryptedPage.jsx:24-50`, `:55-60`, `:79-83`
  - `src/routes/RouterConfig.jsx:22`
- Aspek / standar: Keamanan / OWASP A01, A07 / ISO 27001 A.8.2, A.8.5
- Klasifikasi: ketidaksesuaian mayor
- Bukti:
  ```js
  // routes/helpers.jsx
  const header = { alg: "none", typ: "JWT" };
  return `${encode(header)}.${encode(payload)}.`;   // tanpa signature

  // EncryptedPage.jsx
  const decodedData = useMemo(() => jwtDecodePage(token), [token]);
  ...
  const { component: PageComponent, isProtected } = routeConfig;
  ...
  return isProtected ? <LayoutGlobal ...> : animatedPageContent;
  ```
  `isProtected` hanya menentukan ada/tidaknya layout; tidak pernah memeriksa `localStorage.token` atau memanggil `/profil`. Tidak ada route guard di `RouterConfig.jsx`.
- Dampak: Siapa pun dapat membuat `/<base64({"page":"dashboard"})>.` dan membuka seluruh halaman "protected". Data dari API tetap ditolak backend, tetapi kontrol klien ini memberi rasa aman palsu, membocorkan struktur halaman/URL, dan pada perangkat bersama tetap menampilkan cache data pengguna sebelumnya. Token rute juga memuat `financingId`/`withdrawalId` di URL sehingga ID transaksi terekspos di history/referrer.
- Rekomendasi: gunakan router biasa dengan guard yang memeriksa sesi nyata (token valid + `exp`), atau bertanda tangan HMAC dari server; jangan menaruh ID sensitif di URL; redirect ke login bila tidak ada sesi; tambahkan test untuk setiap rute protected.

### [Major] Stored XSS lewat `html:` SweetAlert pada catatan persetujuan

- Lokasi: `src/components/ui/ApprovalPlaceholder.jsx:39-48`; pemanggil `src/pages/global/transaction/components/ApprovalSection.jsx:43-65`, `src/pages/anggota/RegistrationSummary/pages/RegistrationSummary.jsx:251-266`
- Aspek / standar: Keamanan / OWASP A03 / ISO 27001 A.8.28
- Klasifikasi: ketidaksesuaian mayor
- Bukti:
  ```js
  Swal.fire({
    html: `
      ...
      ${approverName ? `<p><strong>Oleh:</strong> ${approverName}</p>` : ''}
      ${note ? `<div ...>"${note}"</div>` : '...'}
    `,
  ```
  `note` berasal dari keputusan approval (diisi pengurus) dan `approverName` dari data anggota; keduanya dimasukkan mentah ke HTML SweetAlert.
- Dampak: Pengurus (atau akun pengurus yang disusupi) dapat menanam `<img src=x onerror=...>` pada catatan persetujuan. Saat anggota membuka detail transaksi, skrip berjalan di origin aplikasi, membaca `localStorage.token`, dan mengambil alih akun anggota. Ini juga jalur eskalasi dari pengurus ke seluruh anggota. Diperberat oleh CVE DOMPurify di M5 dan CSP yang mengizinkan `unsafe-inline`.
- Rekomendasi: gunakan `text:`/elemen React, atau `DOMPurify.sanitize(note, { ALLOWED_TAGS: [] })` sebelum masuk `html:`; escape juga `approverName`; terapkan CSP berbasis nonce/hash dan hapus `unsafe-inline`.

### [Major] Foto KTP dan swafoto (base64) disimpan permanen di `localStorage`

- Lokasi: `src/pages/anggota/RegistrationFormDetail/pages/RegistrationFormDetail.jsx:30-32`, `:65-68`; pengambilan gambar `src/components/ui/WebcamCaptureField.jsx:50-60`; langkah `Step3CaptureKTP.jsx:47-53`, `Step4Swafoto.jsx:47-53`
- Aspek / standar: Privasi / UU PDP / ISO 27001 A.5.34, A.8.11
- Klasifikasi: ketidaksesuaian mayor
- Bukti:
  ```js
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("temp_reg_data");
    return saved ? JSON.parse(saved) : {};
  });
  ...
  useEffect(() => {
    localStorage.setItem("temp_reg_data", JSON.stringify(formData));  // termasuk foto_ktp & foto_swafoto base64
  }, [formData]);
  ```
  Data baru dihapus setelah submit sukses (`:119`); jika pengguna berhenti di tengah jalan, data tetap tersimpan tanpa batas waktu.
- Dampak: Dokumen identitas (NIK, alamat, foto KTP, swafoto) dapat dibaca skrip mana pun di origin yang sama (XSS/ekstensi berbahaya) dan tetap ada di perangkat bersama. Base64 juga ditulis ulang pada setiap perubahan field sehingga memicu kuota `localStorage` dan UI tersendat. Ini pelanggaran prinsip minimisasi & pembatasan penyimpanan UU PDP.
- Rekomendasi: simpan draf tanpa gambar (atau hanya di `sessionStorage` dengan TTL), kirim gambar langsung ke backend, hapus draf saat halaman ditutup/idle, enkripsi bila harus disimpan, dan tambahkan kebijakan retensi + pemberitahuan privasi.

### [Major] Build produksi masih memuat gateway pembayaran sandbox (Midtrans Snap & DOKU)

- Lokasi: `src/pages/global/InvoiceSnap.jsx:25`; `index.html:21`; backend `api.kkpus.id/.env` (`DOKU_PROD_IS_PRODUCTION=true`, `MIDTRANS_IS_PRODUCTION=false`)
- Aspek / standar: Integritas finansial / PCI DSS 6.4 / ISO 27001 A.8.28
- Klasifikasi: ketidaksesuaian mayor
- Bukti:
  ```js
  script.src = "https://app.sandbox.midtrans.com/snap/snap.js"; // ganti ke production jika perlu
  ```
  ```html
  <script src="https://sandbox.doku.com/jokul-checkout-js/v1/jokul-checkout-1.0.0.js"></script>
  ```
  Script dimuat tanpa atribut `integrity`/`crossorigin`.
- Dampak: Di produksi, pembayaran diarahkan ke lingkungan sandbox. Bergantung pada perilaku backend, transaksi bisa gagal total (anggota tidak bisa membayar) atau—lebih berbahaya—pembayaran sandbox dianggap lunas dan memicu pelunasan tagihan tanpa uang nyata masuk. Selain itu, script pihak ketiga tanpa SRI dapat diganti jika CDN disusupi.
- Rekomendasi: pilih URL Snap/DOKU berdasarkan `import.meta.env.PROD`, gunakan kunci produksi hanya di build produksi, tambahkan `integrity` + `crossorigin` pada script, dan uji end-to-end di staging sebelum rilis.

### [Major] Tidak ada gate kualitas: lint rusak, test trivial, CI tanpa lint/test/audit

- Lokasi: `package.json:36-41`; `src/App.test.jsx:4-6`; `.github/workflows/deploy.yml:22-25`, `:39`
- Aspek / standar: Pengujian / ISO 27001 A.8.29, A.8.25, A.8.32 / ISTQB
- Klasifikasi: ketidaksesuaian mayor
- Bukti:
  ```
  $ npm run lint
  Invalid option '--ext' ...
  You're using eslint.config.js, some command line flags are no longer available
  ```
  Tidak ada `.eslintrc*` maupun `eslint.config.js` di repo; ESLint akhirnya membaca `/home/kkpusid/projects/eslint.config.js` (di luar repo) dan tetap exit 2.
  ```js
  it('renders without crashing', () => {
    render(<App />);       // tidak ada assertion perilaku
    expect(true).toBe(true);
  });
  ```
  Workflow hanya `npm ci` → `npm run build` → `rsync`, tanpa `lint`, `test:ci`, `npm audit`, atau smoke test.
- Dampak: Kesalahan pada alur uang/login/pendaftaran tidak terdeteksi sebelum produksi; lint tidak dapat dijalankan konsisten di mesin lain/CI sehingga standar kode tidak terjaga. Deploy langsung menimpa `/var/www/kkpus.id` tanpa healthcheck/rollback.
- Rekomendasi: tambahkan `eslint.config.js` (flat config) yang self-contained, perbaiki script lint, tambahkan `npm run test:ci -- --coverage` dengan ambang minimum, jalankan `npm audit --audit-level=high` di CI, dan tambahkan smoke test setelah deploy + rollback otomatis.

### [Major] 31 kerentanan dependensi, termasuk 1 critical dan 23 high

- Lokasi: `package.json:9` (`axios`), `:11` (`dompurify`), `:34-35` (`vite`); lockfile: `dompurify 3.4.12`, `axios 1.16.0`, `vite 8.0.14`, `socket.io-client 4.8.3`
- Aspek / standar: Supply chain / ISO 27001 A.8.8 / OWASP A06
- Klasifikasi: ketidaksesuaian mayor
- Bukti `npm audit`: 1 critical — `dompurify <=3.4.16` (IN_PLACE hook / SAFE_FOR_TEMPLATES bypass → XSS); 23 high — antara lain `axios`, `vite`, `vitest`, `ws`, `engine.io`, `socket.io-parser`, `postcss`, `follow-redirects`, `form-data`, `undici`; 7 moderate.
- Dampak: `DOMPurify` justru dipakai untuk merender materi training (`BacaMateri.jsx:95`); CVE pada versi ini membuat sanitasi dapat dilewati sehingga materi yang diunggah pengurus menjadi stored XSS. `axios`/`follow-redirects`/`form-data` relevan untuk penanganan unggahan dan kredensial; `ws`/`engine.io` untuk socket.
- Rekomendasi: perbarui `dompurify` ke versi ≥ perbaikan, lalu `axios`, `vite`, `vitest`, `socket.io-client`; jalankan `npm audit` di CI; pin versi di lockfile dan review otomatis (Dependabot/Renovate).

### [Major] Kunci token tidak konsisten (`token` vs `authToken`) — socket realtime dan penanganan 401 tidak berfungsi

- Lokasi: `src/features/auth/login/hooks/useLoginForm.js:75`; `src/utils/api.js:15`, `:34`; `src/components/layout/contexts/TransactionContext.jsx:22`
- Aspek / standar: Kualitas fungsional / ISO 25010 (reliability)
- Klasifikasi: ketidaksesuaian mayor
- Bukti:
  ```js
  localStorage.setItem("token", token);          // login
  const token = localStorage.getItem('authToken'); // api.js & TransactionContext
  localStorage.removeItem('authToken');            // interceptor 401
  ```
  `profileService.js:20` dan `tabungan.service.js:18` memakai fallback `authToken || token`, tetapi `api.js` dan `TransactionProvider` tidak.
- Dampak: `TransactionProvider` tidak pernah membuat koneksi socket pembiayaan (token `null`), sehingga pembaruan status realtime tidak diterima. Interceptor 401 `api.js` menghapus kunci yang salah, sehingga token kedaluwarsa tetap tersimpan dan pengguna terjebak pada error berulang. Ini juga menyulitkan audit karena ada dua sumber kebenaran sesi.
- Rekomendasi: tetapkan satu kunci (mis. `authToken`) melalui modul `session` terpusat; ganti semua akses langsung `localStorage`; tambahkan test untuk login → request → 401 → logout.

### [Major] `.env` dan artefak `build/` ter-track meskipun sudah di-`.gitignore`

- Lokasi: `.gitignore:3-6`; file ter-track: `.env`, `.env.development`, `.env.production`, `build/` (775 file, 27 MB)
- Aspek / standar: Manajemen konfigurasi / ISO 27001 A.8.9, A.8.32
- Klasifikasi: ketidaksesuaian mayor
- Bukti:
  ```
  $ cat .gitignore
  .env
  .env.*
  build/
  $ git ls-files | grep -E "^\.env|^build/" | wc -l
  775
  $ git status --short | head
   D build/assets/AccountPage-vZKbx64o.js ...
  ```
  `.env` saat ini hanya memuat kunci publik (`VAPID_PUBLIC_KEY`, `MIDTRANS_CLIENT_KEY`), tetapi tetap ter-track dan menjadi tempat yang wajar untuk menaruh secret di masa depan. `build/` menyimpan bundel lama yang tidak sinkron dengan sumber (banyak ditandai `D` di working tree).
- Dampak: Konfigurasi lingkungan bercampur dengan source; risiko secret masuk repo meningkat. Artefak lama memperbesar clone, membingungkan deploy, dan dapat membuat orang menjalankan bundel usang. Karena `.env.production` ter-track, perubahan endpoint produksi tidak terlihat sebagai perubahan rahasia.
- Rekomendasi: `git rm --cached .env .env.*` dan `build/`, tambahkan `.env.example`, dokumentasikan variabel, dan pastikan build hanya dihasilkan CI (tidak pernah di-commit).

### [Minor] CSP longgar, script pihak ketiga tanpa SRI, dan header keamanan hanya di dev server

- Lokasi: `index.html:18-21`; `vite.config.js:69-73`
- Aspek / standar: Keamanan / OWASP A05
- Klasifikasi: ketidaksesuaian minor
- Bukti:
  ```html
  <meta http-equiv="Content-Security-Policy"
        content="default-src 'self' https: http: data: blob: 'unsafe-inline' 'unsafe-eval' ws: wss:;">
  <script src="https://sandbox.doku.com/jokul-checkout-js/v1/jokul-checkout-1.0.0.js"></script>
  ```
  `Strict-Transport-Security` dan `X-Content-Type-Options` hanya diset pada `server.headers` Vite (dev), bukan pada server produksi.
- Dampak: `unsafe-inline`/`unsafe-eval` melemahkan pertahanan XSS; `http:`/`ws:` mengizinkan konten tidak terenkripsi; script tanpa SRI dapat diganti bila CDN disusupi. Header keamanan produksi **tidak terverifikasi** dan kemungkinan tidak ada.
- Rekomendasi: hapus `unsafe-eval`, gunakan nonce/hash, batasi `connect-src` ke domain API/gateway, tambahkan `integrity`+`crossorigin`, dan set HSTS/nosniff/X-Frame-Options di nginx.

### [Minor] Token reset password disimpan di `localStorage`

- Lokasi: `src/features/auth/forgot-password/hooks/useOtpVerification.js:172-179`; dibaca di `useResetPassword.js:22-34`
- Aspek / standar: Keamanan / ISO 27001 A.8.5 / OWASP A07
- Klasifikasi: ketidaksesuaian minor
- Bukti:
  ```js
  localStorage.setItem("resetPasswordToken", JSON.stringify({
    resetToken: response.data?.resetToken,
    expiresAt: response.data?.expiresAt,
  }));
  ```
- Dampak: Reset token adalah kredensial setara password; menyimpannya di `localStorage` membuatnya dapat dicuri oleh XSS (lihat T3/M5) dan tetap ada setelah tab ditutup sampai dipakai/kedaluwarsa.
- Rekomendasi: kirim token reset lewat `HttpOnly` cookie ber-`SameSite=Strict`, atau simpan hanya di memori dengan TTL pendek; hapus segera setelah dipakai.

### [Minor] `console.log` mencetak detail hasil pembayaran

- Lokasi: `src/pages/global/InvoiceSnap.jsx:48`, `:61`; total 90 `console.log` di `src/`
- Aspek / standar: Keamanan / ISO 27001 A.8.15
- Klasifikasi: ketidaksesuaian minor
- Bukti:
  ```js
  console.log("User menutup popup Snap");
  console.log(`Pembayaran status ${status}:`, result);   // result berisi order_id, gross_amount, dsb.
  ```
- Dampak: Detail transaksi dan ID pesanan tercatat di console browser dan dapat terbaca ekstensi/perangkat lain atau tool screenshot support. Menambah noise saat investigasi.
- Rekomendasi: gunakan logger yang hanya aktif di development dan menyamarkan ID/nominal; hapus log di build produksi.

### [Minor] Redirect berbasis data notifikasi/socket dan `window.open` tanpa `noopener`

- Lokasi: `src/App.jsx:176`; `src/pages/global/InvoicePage/components/InvoicePaymentInstruction.jsx:11`, `:90`
- Aspek / standar: Keamanan / OWASP A01, A05
- Klasifikasi: ketidaksesuaian minor
- Bukti:
  ```js
  window.location.href = data.link || data.action_url || `/${jwtEncode({ page: "dashboard" })}`;
  window.open(paymentInstruction.payment_url, "_blank");
  <Button href={action.url} target="_blank" ...>
  ```
- Dampak: Payload socket/notifikasi yang disusupi dapat mengalihkan pengguna ke situs phishing (open redirect). `window.open`/`target="_blank"` tanpa `noopener` memungkinkan halaman tujuan mengakses `window.opener` (reverse tabnabbing).
- Rekomendasi: whitelist path internal untuk `link`/`action_url`, validasi `payment_url` terhadap domain gateway, dan tambahkan `rel="noopener noreferrer"`.

### [Minor] `ErrorBoundary` menyimpan `userId` dan URL ke `localStorage`

- Lokasi: `src/components/ui/EnhancedErrorBoundary.jsx:59-93`
- Aspek / standar: Privasi / ISO 27001 A.8.15 / UU PDP
- Klasifikasi: ketidaksesuaian minor
- Bukti:
  ```js
  const errors = JSON.parse(localStorage.getItem("errorLogs") || "[]");
  errors.push(errorData);   // berisi userId, url, userAgent, stack
  localStorage.setItem("errorLogs", JSON.stringify(errors));
  ```
- Dampak: Metadata pengguna dan stack trace tersimpan tanpa batas di browser (50 entri terakhir) dan dapat dibaca skrip lain; tidak ada pengiriman ke monitoring sehingga nilainya rendah tetapi risikonya tetap ada.
- Rekomendasi: kirim ke layanan monitoring dengan scrubbing PII, atau batasi ke `sessionStorage` dan hapus otomatis.

### [Minor] `_unused/` berisi 166 file ter-track, termasuk file rusak

- Lokasi: `_unused/corrupt_DetailSaldoPage.jsx:1`, `_unused/replace-alerts.js:1`, dan 164 file lain
- Aspek / standar: Maintainability / ISO 25010
- Klasifikasi: ketidaksesuaian minor
- Bukti: `git ls-files _unused | wc -l` → **166**; sebagian masih mengimpor dependensi lama dan tidak dipakai router.
- Dampak: Mencari kode aktif menjadi sulit, tools (grep/audit/IDE) memindai kode mati, dan file rusak dapat memicu error bila tidak sengaja diimpor.
- Rekomendasi: hapus dari repo (simpan di branch arsip), atau pindahkan ke paket terpisah dengan dokumentasi.

### [Minor] Default konfigurasi API tidak konsisten dan berpotensi `http://localhost`

- Lokasi: `src/utils/api.js:5`; `src/utils/socket.js:7`; `src/utils/api/common.js:5-7`
- Aspek / standar: Konfigurasi / ISO 27001 A.8.9
- Klasifikasi: ketidaksesuaian minor
- Bukti:
  ```js
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000'   // api.js
  const SOCKET_URL = ... || 'http://localhost:3445'                  // socket.js
  const API_BASE_URL = ... || "https://localhost:3445/api"           // common.js
  ```
  Tiga default berbeda untuk backend yang sama.
- Dampak: Bila variabel environment tidak terdefinisi saat build, aplikasi produksi akan mencoba `http://localhost` (gagal, atau downgrade ke HTTP). Menyulitkan debugging.
- Rekomendasi: satu modul konfigurasi dengan validasi wajib saat build (`throw` bila `VITE_API_URL` kosong pada mode production).

### [Minor] `jwtDecode` token backend tanpa cek kedaluwarsa sebelum membuka socket

- Lokasi: `src/App.jsx:29-34`
- Aspek / standar: Keamanan / ISO 27001 A.8.5
- Klasifikasi: ketidaksesuaian minor
- Bukti:
  ```js
  const decoded = jwtDecode(token);
  const memberId = decoded.member_id;
  const socket = initSocket(token);
  ```
  Tidak ada pemeriksaan `decoded.exp`.
- Dampak: Token kedaluwarsa tetap dipakai untuk koneksi socket, menghasilkan `connect_error`/`auth:fail` berulang dan pembersihan state yang tidak konsisten.
- Rekomendasi: periksa `exp` sebelum inisialisasi dan bersihkan sesi bila kedaluwarsa.

### [Saran] Satukan implementasi token rute dan hapus duplikasi

- Lokasi: `src/routes/helpers.jsx:2-12` dan `src/utils/helpers.js:51-92`
- Aspek / standar: Maintainability & keamanan
- Klasifikasi: peluang perbaikan
- Bukti: dua encoder token berbeda (`routes/helpers.jsx` payload mentah; `utils/helpers.js` menambah `_v/_ts/_exp`) dan dua decoder.
- Dampak: Perbaikan keamanan bisa dilakukan di satu tempat tetapi terlewat di tempat lain.
- Rekomendasi: satu modul `navigationToken` dengan validasi `exp` dan test.

### [Saran] Tambahkan test perilaku untuk jalur uang dan autentikasi

- Lokasi: `src/App.test.jsx:4-6`; belum ada test di `src/features/auth`, `src/pages/global/InvoicePage`, `src/pages/anggota/RegistrationFormDetail`
- Aspek / standar: ISTQB / ISO 27001 A.8.29
- Klasifikasi: peluang perbaikan
- Bukti: hanya 1 test `expect(true).toBe(true)`.
- Dampak: Regresi pada kalkulasi tagihan, status pembayaran, dan validasi langkah pendaftaran tidak terdeteksi.
- Rekomendasi: tambahkan test komponen + integrasi untuk login, 401, pembuatan transaksi, polling status, validasi tiap langkah pendaftaran, dan penolakan rute tanpa sesi.

### [Saran] Ganti penyimpanan error lokal dengan monitoring terpusat

- Lokasi: `src/components/ui/EnhancedErrorBoundary.jsx:76-95`
- Aspek / standar: Operasional / ISO 27001 A.8.15, A.8.16
- Klasifikasi: peluang perbaikan
- Bukti: endpoint monitoring dikomentari, data hanya ditumpuk di `localStorage`.
- Dampak: Error produksi tidak pernah terlihat tim; waktu deteksi insiden panjang.
- Rekomendasi: integrasikan Sentry/OpenTelemetry dengan scrubbing PII dan sampling.

## Hal yang sudah baik

- **Sanitasi materi training**: satu-satunya `dangerouslySetInnerHTML` memakai `DOMPurify.sanitize` (`src/pages/training/BacaMateri/BacaMateri.jsx:95`).
- **Berkas terlindungi tidak memakai token di URL**: `ProtectedFileViewer.jsx:20-23` mengambil blob dengan header `Authorization`, bukan `?token=`.
- **Sanitasi tampilan teks**: `sanitizeText` dipakai pada nama/email/notifikasi (`src/utils/sanitization.js:10-17`).
- **Tidak ada `eval`/`new Function`/`innerHTML`** di `src/`.
- **Error boundary dan chunk splitting**: `EnhancedErrorBoundary` membungkus aplikasi; `vite.config.js:78-101` memisahkan vendor berdasarkan pustaka.
- **Socket memakai `auth.token`** (`src/utils/socket.js:20-23`), bukan query string, sehingga token tidak mudah tercatat di log akses server.
- **Logout membersihkan `token` dan `userData`** serta memutus socket (`ProfileContext.jsx:232-241`).
- **Build dan test berjalan** (exit 0) serta tidak ada source map yang ikut ter-build.

## Langkah lanjutan

1. **Sekarang:** revoke sertifikat `*.kkpus.id`, terbitkan ulang key, hapus `cert/` + `src/cert/` dari riwayat git, dan jadikan repo privat.
2. **Hari ini:** perbaiki XSS di `ApprovalPlaceholder` (pakai `text:`/sanitasi), perbarui `dompurify`, dan hentikan penyimpanan foto KTP di `localStorage`.
3. **Hari ini:** ganti URL Snap/DOKU sandbox ke produksi berdasarkan mode build; tambahkan SRI.
4. **Minggu ini:** tambahkan guard rute berbasis sesi nyata (bukan token `alg:none`), satukan kunci token, dan perbaiki socket `TransactionContext`.
5. **Minggu ini:** buat `eslint.config.js`, perbaiki script lint, tambahkan test perilaku + `npm audit` ke CI, dan hapus artefak `build/`/`.env` dari git.
6. **Bulan ini:** terapkan CSP nonce, monitoring error terpusat, kebijakan retensi PII, dan review aksesibilitas menyeluruh (WCAG 2.2 AA).
