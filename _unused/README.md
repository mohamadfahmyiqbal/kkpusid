# Folder Berkas Tidak Digunakan (`_unused`)

Folder ini berisi berkas dan folder yang sudah tidak digunakan atau tidak relevan dalam runtime/build aplikasi utama, dipindahkan untuk merapikan struktur direktori:

### Berkas Root & Utilitas
| Nama Berkas Asal | Keterangan / Alasan Dipindahkan |
| :--- | :--- |
| `kkpusid` | SSH Private Key yang tertinggal di root proyek (tidak digunakan oleh web app / risiko keamanan jika dibiarkan di root). |
| `kkpusid.pub` | SSH Public Key untuk pasangan kunci di atas. |
| `localhost-key.pem` | Berkas sertifikat lokal redundan (sertifikat aktif dikonfigurasi di `src/localhost/`). |
| `replace-alerts.js` | Script migrasi / codemod sekali pakai untuk SwalAlert lama. |
| `deploy.sh` | Shell script lama untuk rsync deployment yang seluruh barisnya sudah di-comment out. |
| `install.cmd` | Installer batch script Antigravity CLI yang terunduh ke root. |
| `src/pages/jualBeli/Test.jsx` | Berkas pengujian kosong (0 byte) dari `src/pages/jualBeli/`. |
| `src/pages/simpanan/DetailSaldoPage/dcodingreact...` | Berkas duplikat dengan nama path corrupt (`dcodingreact...`) dari `src/pages/simpanan/DetailSaldoPage/`. |

### Folder Legacy Kode Sumber (`src/`)
| Folder Asal | Keterangan / Alasan Dipindahkan |
| :--- | :--- |
| `src/comp/` (`_unused/src/comp/`) | Seluruh komponen legacy/lama yang fungsionalitasnya telah digantikan sepenuhnya oleh arsitektur modular modern di `src/components/`. |
| `src/route/` (`_unused/src/route/`) | Konfigurasi routing versi lama. Routing aktif aplikasi telah menggunakan `src/routes/RouterConfig.jsx`. |
| `src/page/` (`_unused/src/page/`) | Template halaman versi lama yang sebelumnya diimpor oleh `src/route/`. Seluruh halaman aktif aplikasi telah menggunakan `src/pages/`. |

---
*Catatan: Jika sewaktu-waktu berkas/folder di atas masih diperlukan untuk referensi, Anda dapat mengaksesnya di dalam folder ini atau memindahkannya kembali.*
