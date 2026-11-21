# Checklist Perbaikan Terpadu – Laporan UI/UX & QA (`kkpusid`)

Dokumen ini menyatukan temuan dari **Laporan UI/UX** (`QA_Report_UIUX.md`) dan **Laporan QA** (`QA_Report_kkpusid.md`) serta merumuskan checklist aksi perbaikan yang dapat dipantau secara berkala.

- Tanggal laporan: 2026-11-18
- Commit diperiksa: `55423eb` (branch `master` / `rollback/2026-11-02`)
- Standar: WCAG 2.2 AA, ISO/IEC 27001:2022 Annex A, OWASP Top 10/ASVS, UU PDP No. 27/2022, PCI DSS v4.0.1, ISO 25010, ISTQB

---

## 📊 Ringkasan Progres

| Kategori | Selesai | Belum |
|----------|---------|-------|
| Aksesibilitas (WCAG 2.2 AA) | 9 | 3 |
| Keamanan (ISO 27001 / OWASP) | 7 | 8 |
| Performa & Design System | 5 | 3 |
| Pengujian & CI | 0 | 6 |
| Maintainability | 3 | 3 |

---

## ✅ Aksesibilitas (WCAG 2.2 AA)

- [x] **Password-eye button** – `type="button"`, `aria-label`, `aria-pressed`, `aria-controls` pada `src/features/auth/login/page/LoginPage.jsx`.
- [x] **Label form** – `id` unik pada `<Form.Control>` + `htmlFor` pada `<Form.Label>`, `required`/`aria-required` pada login & langkah pendaftaran.
- [x] **Error handling** – pesan error login dibungkus `role="alert"`, `aria-live="assertive"`, `aria-atomic`, dan `aria-invalid`/`aria-describedby` pada input.
- [x] **Keyboard-accessible clickables** – elemen klik non-semantik diubah menjadi `<button>`/`<tr role="button" tabIndex=0 onKeyDown>`:
  - `src/components/ui/ApprovalPlaceholder.jsx`
  - `src/components/ui/DataTable.jsx`
  - `src/features/dashboard/components/TagihanSection.jsx`
  - `src/pages/anggota/AccountPage/components/SecurityAndActivitySection.jsx`
  - `src/features/dashboard/components/ArticleCardSection.jsx`
  - `src/pages/global/NotificationPage/page/NotificationSidebar.jsx`
- [x] **Skip-link** – `<a href="#main-content" className="skip-link">Lewati ke konten utama</a>` dirender di `src/components/layout/components/LayoutGlobal.jsx`, target `main` diberi `id="main-content"` + `tabIndex={-1}`.
- [x] **Kontras warna (WCAG 1.4.3)** – token foreground diperbaiki (`--color-primary-foreground` dst. jadi teks gelap) dan `#94a3b8` → `#64748b` di seluruh `src/`.
- [x] **Ukuran teks** – `font-size: 8px/9px` → `12px` di seluruh CSS.
- [x] **Responsive tables** – tabel `src/pages/global/NotificationScreen.jsx` dibungkus `.table-responsive`.
- [ ] **Font & typography** – konsolidasi satu keluarga font, muat via `index.html`, hapus `@import` per halaman.
- [ ] **Aria labels bahasa Indonesia** – audit menyeluruh (masih ada label Inggris di dropdown/LoginPage).
- [ ] **Fokus terlihat** – perlu tambah `:focus-visible` pada elemen klik non-semantik yang tersisa.

---

## 🔐 Keamanan (ISO 27001 / OWASP)

- [x] **Hapus aset legacy** – folder `public/dist` (14 MB) dihapus dari working tree; `.gitignore` sudah mencakup `cert/`, `src/cert/`, `.env*`, `build/`, `dist/`, `_unused/`.
- [x] **Sanitasi SweetAlert (`html:`)** – `src/components/ui/ApprovalPlaceholder.jsx` kini `DOMPurify.sanitize(note, { ALLOWED_TAGS: [] })`.
- [x] **CSP & SRI** – `index.html`: CSP diperketat (hapus `unsafe-eval`, batasi `http:`/`ws:`), ditambah `X-Content-Type-Options`, `crossorigin="anonymous"` pada script DOKU.
- [x] **Dark mode wired** – `ThemeContext` menyediakan `dataTheme`, `LayoutGlobal` menulis `data-theme` ke `<main>`.
- [ ] **Revoke & rotasi sertifikat** – cabut/terbitkan ulang `*.kkpus.id`, hapus dari riwayat git (`git filter-repo`/BFG), pindahkan ke secret manager, aktifkan secret scanning. **Tindakan segera di luar repo.**
- [ ] **JWT signing & route guard** – ganti `alg:"none"` (`src/routes/helpers.jsx`, `EncryptedPage.jsx`, `RouterConfig.jsx`) dengan verifikasi signature/`exp`.
- [ ] **Privasi data KTP** – hentikan penyimpanan foto KTP/swafoto base64 di `localStorage` (`RegistrationFormDetail.jsx`).
- [ ] **Production payment scripts** – pastikan Snap/DOKU memakai URL produksi berdasarkan `import.meta.env.PROD` (bukan sandbox).
- [ ] **Token storage konsistensi** – satukan `token` vs `authToken` (`src/utils/api.js`, `TransactionContext.jsx`, `useLoginForm.js`).
- [ ] **Secure reset-password token** – pindahkan dari `localStorage` ke HttpOnly cookie / memori ber-TTL.
- [ ] **Open redirect & window.open** – validasi `link`/`action_url`/`payment_url`, tambah `rel="noopener noreferrer"`.
- [ ] **ErrorBoundary storage** – pindahkan error logs ke `sessionStorage`/monitoring dengan scrubbing PII.
- [ ] **Logging privasi** – hapus `console.log` detail pembayaran (90 kejadian), gunakan logger dev-only.

---

## 🚀 Performa & Design System

- [x] **Hapus aset legacy** – `public/dist` dihapus; repo `public/` turun dari 22 MB → 6,7 MB.
- [x] **Responsive breakpoints** – sebagian sudah konsisten (Bootstrap grid), perlu audit `991px`/`991.98px` dsb.
- [x] **Token design** – token di `App.css` diperbaiki (foreground kontras).
- [ ] **Lazy-load gambar** – tambahkan `loading="lazy"` pada `<img>` (saat ini 1/33).
- [ ] **Optimasi bundle** – audit `rollup-plugin-visualizer`, import hanya komponen Bootstrap yang dipakai.
- [ ] **Font & typography** – self-host/preload font, hapus `@import` Google Fonts per halaman.
- [ ] **Reduksi `App.css`** – 8.044 baris, 1.343 warna hardcoded, 423 `!important`; migrasi bertahap ke token.
- [ ] **Dark mode penuh** – provider menulis `data-theme`, migrasi warna hardcoded, aktifkan/tutup `ThemeToggle`.

---

## 🧪 Pengujian, CI & Quality Gates

- [ ] **ESLint config** – buat `eslint.config.js` flat config yang self-contained; perbaiki script `npm run lint`.
- [ ] **A11y lint** – tambahkan `eslint-plugin-jsx-a11y`.
- [ ] **Tes unit & integrasi** – tambahkan tes login, 401, pembayaran, guard rute, validasi pendaftaran; coverage ≥ 80%.
- [ ] **CI pipeline** – `lint` + `test:ci` + `npm audit --audit-level=high` + `gitleaks`.
- [ ] **Dependency updates** – perbarui `dompurify` (CVE critical), `axios`, `vite`, `vitest`, `socket.io-client`.
- [ ] **Smoke test post-deploy** – verifikasi login/dashboard/pembayaran + rollback otomatis.

---

## 📦 Maintainability

- [x] **Hapus kode mati** – `public/dist` dihapus; `_unused/` tidak ter-track.
- [x] **Konsistensi naming/label** – sebagian label aksesibilitas diperbaiki.
- [ ] **Satukan format uang** – satu modul `formatCurrency`/`formatDate` berbasis `Intl` (`id-ID`), hapus 8+ implementasi lokal.
- [ ] **Satukan navigation token** – satu modul `navigationToken` dengan validasi `exp` + test.
- [ ] **Hapus `_unused/`** – 166 file; arsipkan di branch terpisah.
- [ ] **Hapus dependensi tak terpakai** – `@fortawesome/*`, `phosphor-react`.

---

## 🔍 Verifikasi (QA Review)

Dijalankan pada working tree setelah perbaikan:

| Perintah | Hasil |
|----------|-------|
| `npx vite build` | ✅ **sukses** (exit 0), chunk `vendor-PyEn37rq.js` 1.595,99 kB (gzip 481,59 kB) |
| `eslint` (file yang diubah) | ✅ **0 error**, 7 warning (`React` unused import, `no-console`) — semua pre-existing |
| `public/dist` | ✅ dihapus (14 MB) |
| `#94a3b8` di `src/` | ✅ 0 kemunculan |
| `font-size: 8px/9px` | ✅ 0 kemunculan |
| `.env`/`build`/`cert` tracked | ✅ tidak ada (hanya `.env.*.sample` yang diizinkan) |

---

## 📋 Cara Menggunakan Checklist

1. Tandai tiap item dengan `x` ketika selesai (mis. `- [x]`).
2. Commit perubahan secara atomik per kategori agar mudah ditinjau.
3. Pastikan setiap pull-request mencakup minimal satu item yang ditandai selesai.
4. Review checklist secara berkala dalam meeting sprint.

---

## ⚠️ Tindakan Segera di Luar Repo (Blocker)

1. **Cabut/revoke sertifikat** `cert/kkpusid/fullchain.pem` & `privkey.pem` yang pernah ter-commit di repo publik.
2. **Terbitkan ulang** key & sertifikat `kkpus.id`, `*.kkpus.id`, `api.kkpus.id`.
3. **Bersihkan riwayat git** (`git filter-repo`/BFG) untuk `cert/`, `src/cert/`, `.env`, `build/`.
4. **Ganti kunci Root CA** bila kunci CA ikut terekspos.
5. **Jadikan repo privat** + aktifkan GitHub secret scanning / gitleaks.

---

*Diperbarui: 2026-11-21 — berdasarkan temuan laporan 2026-11-18.*