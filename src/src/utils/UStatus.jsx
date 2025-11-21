// utils/UStatus.js

/**
 * Mapping status Midtrans ke label bahasa Indonesia
 */
export function mapMidtransStatusToLabel(status) {
  switch (status) {
    case "success":
    case "capture":
    case "settlement":
      return "Pembayaran Berhasil";

    case "pending":
      return "Menunggu Pembayaran";

    case "deny":
      return "Pembayaran Ditolak";

    case "expire":
      return "Pembayaran Kadaluarsa";

    case "cancel":
      return "Pembayaran Dibatalkan";

    default:
      return "Menunggu Pembayaran";
  }
}

/**
 * Mapping label status ke variant Bootstrap
 */
export function getStatusVariant(statusLabel) {
  switch (statusLabel) {
    case "Pembayaran Berhasil":
      return "success";
    case "Menunggu Pembayaran":
      return "warning";
    case "Pembayaran Ditolak":
      return "danger";
    case "Pembayaran Kadaluarsa":
      return "secondary";
    case "Pembayaran Dibatalkan":
      return "dark";
    default:
      return "secondary";
  }
}
