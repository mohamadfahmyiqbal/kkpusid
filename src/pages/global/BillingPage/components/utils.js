/**
 * Format angka ke format ribuan Indonesia (10.000)
 */
const formatRupiah = (value) => {
  if (!value) return "";
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
 * Format currency to IDR
 */
export const formatIDR = (val) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Number(val) || 0);

/**
 * Format date string to localized Indonesian date
 */
export const formatDate = (dateStr, opts = { day: "2-digit", month: "short", year: "numeric" }) =>
  dateStr ? new Date(dateStr).toLocaleDateString("id-ID", opts) : "-";

/**
 * Get number of days until a due date (negative = overdue)
 */
export const getDaysUntilDue = (dueDate) => {
  if (!dueDate) return null;
  const diff = new Date(dueDate) - new Date();
  return Math.ceil(diff / 86400000);
};

/**
 * Generate invoice number: INV/YYYY/XXXXXX
 */
export const formatInvoiceNumber = (id, date) => {
  const year = date ? new Date(date).getFullYear() : new Date().getFullYear();
  return `INV/${year}/${String(id || 0).padStart(6, "0")}`;
};

export const ITEMS_PER_PAGE = 5;

export default formatRupiah;