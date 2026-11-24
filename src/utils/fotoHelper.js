/**
 * Helper untuk membangun src gambar profil/swafoto anggota.
 *
 * API anggota mengembalikan foto sebagai:
 *  - string base64 (tanpa awalan data URL)
 *  - data URL lengkap (data:image/...;base64,...)
 *  - URL lengkap (http/https)
 *  - path relatif (mis. /api/files/uploads/anggota/xxx.jpg atau uploads/...)
 * Fungsi ini memastikan hasil selalu berupa src yang dapat langsung dipakai di <img src>.
 *
 * @param {string|null|undefined} foto - base64, data URL, URL lengkap, atau path relatif dari API
 * @param {string} fallback - path fallback jika foto kosong
 * @returns {string} src siap pakai
 */
export function getFotoSrc(foto, fallback = "/assets/icons/default-user.png") {
  if (!foto) return fallback;
  // Sudah URL lengkap (http/https), gunakan langsung
  if (foto.startsWith("http://") || foto.startsWith("https://")) return foto;
  // Sudah lengkap sebagai data URL, gunakan langsung
  if (foto.startsWith("data:image")) return foto;
  // Path relatif (mis. /api/files/... atau uploads/...) — biarkan browser
  // me-resolve terhadap origin. Jangan perlakukan sebagai base64 mentah.
  if (foto.startsWith("/") || foto.startsWith("uploads/")) return foto;
  // Asumsikan base64 mentah dari API, tambahkan awalan data URL JPEG
  return `data:image/jpeg;base64,${foto}`;
}

/**
 * Resize & kompres gambar dari File/Blob menjadi data URL JPEG.
 * Mengurangi ukuran agar aman dikirim ke backend (maks 2MB) tanpa
 * mengorbankan kualitas avatar.
 *
 * @param {File|Blob} file - berkas gambar pilihan pengguna
 * @param {Object} [options]
 * @param {number} [options.maxSize=1000] - sisi terpanjang maksimum (px)
 * @param {number} [options.quality=0.85] - kualitas JPEG (0..1)
 * @returns {Promise<string>} data URL JPEG (data:image/jpeg;base64,...)
 */
export function resizeImageToBase64(file, { maxSize = 1000, quality = 0.85 } = {}) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type || !file.type.startsWith("image/")) {
      reject(new Error("Berkas harus berupa gambar."));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Gagal membaca berkas gambar."));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Gambar tidak dapat diproses."));
      img.onload = () => {
        try {
          let { width, height } = img;
          if (width > maxSize || height > maxSize) {
            const scale = Math.min(maxSize / width, maxSize / height);
            width = Math.round(width * scale);
            height = Math.round(height * scale);
          }
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          // Latar putih agar PNG transparan tidak menjadi hitam saat jadi JPEG.
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL("image/jpeg", quality);
          resolve(dataUrl);
        } catch (err) {
          reject(err);
        }
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}