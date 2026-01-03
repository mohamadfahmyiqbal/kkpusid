// src/utils/helper/formatrupiah.jsx

/**
 * Mengubah angka murni menjadi format Rupiah dengan titik ribuan
 * Contoh: 50000 -> 50.000
 */
export const formatRupiah = (value) => {
  if (!value) return "";
  // Pastikan input adalah string dan ambil hanya angka
  const numberString = value.toString().replace(/[^,\d]/g, "");
  const split = numberString.split(",");
  const sisa = split[0].length % 3;
  let rupiah = split[0].substr(0, sisa);
  const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  if (ribuan) {
    const separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  return split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
};

/**
 * Mengubah string format Rupiah kembali menjadi angka murni
 * Contoh: "50.000" -> "50000"
 */
export const parseRawNumber = (rupiahString) => {
  if (!rupiahString) return "";
  // Menghapus semua karakter selain angka
  return rupiahString.toString().replace(/[^\d]/g, "");
};
