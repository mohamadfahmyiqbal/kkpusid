/**
 * Helper untuk membangun src gambar profil/swafoto anggota.
 *
 * API anggota mengembalikan foto sebagai string base64 (tanpa awalan data URL)
 * atau sudah lengkap sebagai data URL (data:image/...;base64,...). Fungsi ini
 * memastikan hasil selalu berupa src yang dapat langsung dipakai di <img src>.
 *
 * @param {string|null|undefined} foto - base64 atau data URL dari API
 * @param {string} fallback - path fallback jika foto kosong
 * @returns {string} src siap pakai
 */
export function getFotoSrc(foto, fallback = "/assets/icons/default-user.png") {
  if (!foto) return fallback;
  // Sudah lengkap sebagai data URL, gunakan langsung
  if (foto.startsWith("data:image")) return foto;
  // Asumsikan base64 mentah dari API, tambahkan awalan data URL JPEG
  return `data:image/jpeg;base64,${foto}`;
}
