# Standar Konvensi Penamaan File & Struktur Folder (Frontend @kkpusid)

> **Status:** Berlaku  
> **Tujuan:** Menjaga konsistensi, keterbacaan, kemudahan kolaborasi tim, dan stabilitas modul di seluruh aplikasi `@kkpusid`.

---

## 1. Aturan Casing (Huruf Besar / Kecil)

| Tipe File / Folder | Konvensi | Contoh yang Benar | Hindari / Salah |
|---|---|---|---|
| **Folder Modul / Rute (`pages/`)** | `kebab-case` atau `lowercase` seragam | `jual-beli/`, `simpanan/`, `auth/` | `jualBeli/`, `DetailSaldoPage/` |
| **Folder Sub-fitur Lokal** | `kebab-case` (lowercase jamak) | `components/`, `hooks/`, `services/` | `component/`, `service/`, `page/` |
| **Komponen React (`.jsx`)** | `PascalCase.jsx` | `Button.jsx`, `NotificationPage.jsx` | `transactionHistoryItem.jsx`, `btn.jsx` |
| **Custom Hooks (`.js` / `.jsx`)** | `useCamelCase.js` | `useDashboardData.js`, `useDebounce.js` | `DashboardHook.js`, `use_auth.js` |
| **Service & API Client (`.js`)** | `camelCaseService.js` | `profileService.js`, `tabunganService.js` | `tabungan.service.js`, `UTabungan.jsx` |
| **Utilitas Murni (`.js`)** | `camelCase.js` | `formatRupiah.js`, `sanitization.js` | `FormatRupiah.jsx`, `UApproval.jsx` |
| **Konstanta (`.js`)** | `camelCase.js` / `SCREAMING_SNAKE` (variabel) | `designTokens.js`, `pageTitles.js` | `DesignTokens.js` |
| **File CSS / Style (`.css`)** | Menyamai nama komponen atau `kebab-case.css` | `NotificationPage.css`, `utilities.css` | `UserDropdown--FS7qH2g.css` |
| **File Rute (`routes/pages/`)** | `camelCaseRoutes.jsx` | `programRoutes.jsx`, `jualBeliRoutes.jsx` | `ProgramRoutes.jsx`, `JBRoutes.jsx` |

---

## 2. Standar Suffix Halaman (*Page vs *Screen)

Semua komponen yang dipetakan langsung sebagai target rute URL **wajib berakhiran `*Page.jsx`**, bukan `*Screen.jsx`.

- ✅ `DashboardPage.jsx`
- ✅ `LoginPage.jsx`
- ✅ `RegisterPage.jsx`
- ✅ `TagihanPage.jsx`
- ✅ `ResiPage.jsx`
- ❌ `DashboardScreen.jsx`
- ❌ `LoginScreen.jsx`
- ❌ `RegisterScreen.jsx`

---

## 3. Pedoman Struktur Folder di dalam `src/pages/`

**Prinsip: Tidak semua halaman wajib punya `components/`, `hooks/`, `services/`, dan `utils/`.**

Gunakan struktur berdasarkan kompleksitas berikut:

### Level 1: Halaman Sederhana (Simple / Flat Page)
Untuk halaman statis, informasional, atau formulir pendek (< 150 baris):
```
pages/
└── privacy-policy/
    ├── PrivacyPolicyPage.jsx
    └── PrivacyPolicyPage.css   (opsional jika butuh styling khusus)
```
*Jangan buat folder `components/` atau `hooks/` jika tidak ada file yang dipisah.*

### Level 2: Halaman Sedang (Medium Page)
Untuk halaman dengan beberapa sub-tampilan lokal atau filter khusus:
```
pages/
└── billing/
    ├── components/
    │   ├── BillingFilter.jsx
    │   └── BillingTable.jsx
    ├── BillingPage.jsx
    └── BillingPage.css
```

### Level 3: Halaman Kompleks / Modul Fitur Besar (Complex Feature Page)
Untuk fitur besar dengan banyak interaksi, multi-step form, atau integrasi socket/API rumit:
```
pages/
└── notification/
    ├── components/            # Komponen khusus halaman ini saja
    │   ├── NotificationRowItem.jsx
    │   └── NotificationSidebar.jsx
    ├── hooks/                 # Logic khusus halaman ini
    │   ├── useNotificationData.js
    │   └── useNotificationFilter.js
    ├── services/              # API call khusus halaman ini
    │   └── notificationService.js
    ├── NotificationPage.jsx   # Root halaman (entry point)
    ├── NotificationDetailPage.jsx
    └── NotificationPage.css
```

---

## 4. Matriks Keputusan: Di mana Meletakkan Kode?

| Pertanyaan | Ya ➔ Letakkan di | Tidak ➔ Letakkan di |
|---|---|---|
| Apakah komponen ini dipakai di > 1 halaman rute? | `src/components/ui/` atau `src/components/shared/` | `pages/[nama-fitur]/components/` |
| Apakah utilitas/helper ini dipakai lintas fitur? | `src/utils/` | `pages/[nama-fitur]/utils/` atau satukan di file terkait |
| Apakah service API ini merupakan domain data inti koperasi? | `src/services/` | `pages/[nama-fitur]/services/` |
| Apakah custom hook ini logic global (auth, responsive, theme)? | `src/hooks/` atau `src/contexts/` | `pages/[nama-fitur]/hooks/` |

---

## 5. Daftar Perbaikan Prioritas (Action Items untuk Refactoring)

1. **Perbaikan Casing Typo:**
   - `src/components/transaksi/transactionHistoryItem.jsx` ➔ `TransactionHistoryItem.jsx`
   - `src/services/tabungan.service.js` ➔ `tabunganService.js`
   - `src/services/training.service.js` ➔ `trainingService.js`

2. **Konsolidasi File Rute Duplikat:**
   - Gabungkan `src/routes/pages/JBRoutes.jsx` dan `src/routes/pages/jualbeliRoutes.jsx` menjadi satu `jualBeliRoutes.jsx`.
   - Standarkan nama file rute ke `camelCaseRoutes.jsx` (misal: `ProgramRoutes.jsx` ➔ `programRoutes.jsx`).

3. **Standarisasi Plural Folder:**
   - `LandingPage/component/` ➔ `LandingPage/components/`
   - `DetailSaldoPage/component/` ➔ `DetailSaldoPage/components/`
   - `SplashPage/service/` ➔ `SplashPage/services/` (atau ratakan struktur file SplashPage)

4. **Penyederhanaan Folder Over-engineered:**
   - Ratakan folder `SplashPage/page/SplashPage.jsx` menjadi `SplashPage/SplashPage.jsx` langsung.
