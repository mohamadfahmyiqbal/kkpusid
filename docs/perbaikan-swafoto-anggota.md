# Dokumentasi Perbaikan: Tampilan Swafoto Anggota

## Ringkasan

Perbaikan ini mengatasi masalah **swafoto anggota tidak menampilkan** di beberapa komponen, disebabkan oleh penggunaan nama field foto yang tidak konsisten dan duplikasi logika pembangun `src` gambar.

## Masalah

- `Sidebar.jsx` membaca field `user.foto` yang **tidak ada** dalam respons API → foto selalu `undefined` → selalu fallback ke ikon `MdPerson`, swafoto tidak pernah muncul.
- `ProfileHeaderCard.jsx` juga menggunakan `userProfile?.foto` (sama salah) dan memiliki fungsi `getFotoSrc` lokal yang duplikat.
- Nama field yang benar dari API adalah `fotoImg` (sudah digunakan `ProfileScreen.jsx` dan `DetailPendaftaranAnggota.jsx`).

## Perubahan yang Dibuat

### File baru

| File | Deskripsi |
|------|-----------|
| `src/utils/fotoHelper.js` | Util bersama `getFotoSrc(foto, fallback)` untuk membangun `src` gambar profil/swafoto secara konsisten. |
| `src/utils/fotoHelper.test.js` | Tes unit untuk `getFotoSrc` (fallback, data URL passthrough, base64 mentah). |

### File diubah

| File | Perubahan |
|------|-----------|
| `src/components/layout/components/Sidebar.jsx` | `user.foto` → `user.fotoImg`; pakai `getFotoSrc` dari util bersama. |
| `src/pages/anggota/ProfileScreen.jsx` | Hapus `getFotoSrc` lokal; pakai util bersama; field `fotoImg` tetap. |
| `src/pages/anggota/AccountPage/components/ProfileHeaderCard.jsx` | Hapus `getFotoSrc` lokal; pakai util bersama; `userProfile?.foto` → `userProfile?.fotoImg`. |

## Logika `getFotoSrc`

```
getFotoSrc(foto, fallback = "/assets/icons/default-user.png")
- jika foto kosong (null/undefined/"") → kembalikan fallback
- jika foto sudah data URL (diawali "data:image") → gunakan langsung
- jika base64 mentah → tambahkan awalan "data:image/jpeg;base64,"
```

## Hasil Verifikasi

- **Build:** `npm run build` → ✅ lolos (0 error)
- **Lint:** `npx eslint src --ext .js,.jsx` → ✅ 0 error (501 warning pre-existing, tidak ada yang terkait perubahan ini)
- **Test:** Tidak dapat dijalankan di lingkungan ini karena **Node v24** di luar range yang diharuskan projek (`>=18 <23`). Error `Cannot read properties of undefined (reading 'config')` terjadi pada **semua** file test termasuk `money.test.js` dan `App.test.jsx` yang sudah ada sebelum perubahan ini. Ini adalah masalah lingkungan, bukan disebabkan oleh kode. Tes siap dijalankan di environment yang sesuai.

## Commit

- Commit: `bae3d0b` — `fix(anggota): tampilkan swafoto anggota dengan field fotoImg yang konsisten`
- Branch: `rollback/2026-11-02`
- Remote: `origin` (https://github.com/mohamadfahmyiqbal/kkpusid.git)

## Rekomendasi Lanjutan

- Pastikan CI/CD menggunakan Node versi `>=18 <23` agar test suite dapat dijalankan.
- Periksa apakah ada komponen lain yang masih mereferensi field `foto` (bukan `fotoImg`) untuk menghindari regresi serupa.
