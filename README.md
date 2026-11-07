# Portal Anggota Koperasi KKPUS (kkpusid)

Aplikasi Web Progressive (PWA) portal mandiri bagi anggota Koperasi KKPUS. Menggunakan React 18, Vite, Bootstrap 5, dan terhubung dengan backend REST API KKPUS.

## Prasyarat Lingkungan
- **Node.js**: `>=18.0.0 <23.0.0`
- **npm**: `>=9.0.0`

## Menjalankan Aplikasi

### Instalasi Dependensi
```bash
npm install
```

### Server Pengembangan (Development)
Menjalankan server Vite lokal pada port yang ditentukan (default `https://localhost:3000` atau sesuai konfigurasi `.env`):
```bash
npm run dev
# atau
npm start
```

### Menjalankan Pengujian (Testing)
Pengujian dijalankan menggunakan [Vitest](https://vitest.dev/):
```bash
# Mode run sekali selesai (CI)
npm run test:ci

# Mode watch (interaktif lokal)
npm test
```

### Pengecekan Kualitas Kode (Linting)
```bash
# Cek linting
npm run lint

# Otomatis memperbaiki peringatan yang dapat di-fix
npm run lint:fix
```

### Build Produksi
Membangun bundle teroptimasi ke direktori `build/`:
```bash
npm run build
```

Hasil build dapat dipratinjau secara lokal dengan:
```bash
npm run preview
```

## Struktur Direktori Utama
- `src/features/`: Modul bisnis berorientasi fitur (auth, login, register, dashboard).
- `src/pages/`: Halaman aplikasi (anggota, simpanan, pinjaman, tabungan, training, dsb.).
- `src/components/`: Komponen antarmuka yang dapat digunakan kembali (layout, modals, status cards).
- `src/utils/`: Utilitas aplikasi, helper perutean berbasis token, dan axios interceptor instance.
- `src/services/`: Lapisan abstraksi panggilan API.

## Keamanan & Kontrol Sesi
Aplikasi mengikuti praktik keamanan sesuai ISO/IEC 27001:2022:
- Komunikasi API dienkripsi melalui HTTPS dengan sertifikat terkelola.
- Header Bearer JWT otomatis disisipkan pada setiap request yang membutuhkan autentikasi melalui `api.interceptors.request`.
- Input dan konten dinamis disanitasi menggunakan DOMPurify sebelum dirender.
