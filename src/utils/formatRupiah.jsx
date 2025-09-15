// utils/formatter.js

// Format angka ke Rupiah (tanpa desimal)
export const formatRupiah = (value) => {
  if (value == null || isNaN(value)) return "Rp0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0, // tanpa ,00
  }).format(value);
};

// Format angka ke Rupiah (dengan desimal 2 digit)
export const formatRupiahWithDecimal = (value) => {
  if (value == null || isNaN(value)) return "Rp0,00";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
  }).format(value);
};
