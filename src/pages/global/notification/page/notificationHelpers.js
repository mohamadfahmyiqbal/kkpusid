// Default Premium Mock Notifications
export const DEFAULT_NOTIFICATIONS = [
  {
    id: "def-1",
    title: "Pengajuan Pembiayaan Disetujui",
    body: "Pengajuan pembiayaan Anda telah disetujui dan siap melanjutkan ke tahap akad.",
    created_at: new Date().toISOString(), // Today
    status: 1, // Unread
    type: "transaction",
  },
  {
    id: "def-2",
    title: "Dokumen Perlu Diperiksa",
    body: "Mohon cek kembali dokumen KTP dan NPWP yang Anda unggah agar proses lebih cepat.",
    created_at: new Date(new Date().getTime() - 30 * 60 * 1000).toISOString(), // Today (30m ago)
    status: 1, // Unread
    type: "system",
  },
  {
    id: "def-3",
    title: "Jadwal Verifikasi Diperbarui",
    body: "Tim kami akan melakukan verifikasi lapangan pada Rabu, 21 Mei 2024 pukul 10.30 WIB.",
    created_at: new Date(new Date().getTime() - 2 * 60 * 60 * 1000).toISOString(), // Today (2h ago)
    status: 1, // Unread
    type: "reminder",
  },
  {
    id: "def-4",
    title: "Pelatihan Usaha Tersedia",
    body: "Modul pelatihan usaha terbaru sudah bisa diakses dari dashboard Anda.",
    created_at: new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
    status: 2, // Read
    type: "announcement",
  },
  {
    id: "def-5",
    title: "Pembayaran Angsuran Masuk",
    body: "Pembayaran angsuran bulan ini telah berhasil diterima dan tercatat di sistem.",
    created_at: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    status: 2, // Read
    type: "payment",
  },
  {
    id: "def-6",
    title: "Password Perlu Diperbarui",
    body: "Untuk keamanan akun, silakan perbarui password Anda secara berkala.",
    created_at: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    status: 1, // Unread
    type: "system",
  },
];

// Helper format relatif waktu
export const getRelativeTime = (dateStr) => {
  if (!dateStr) return "";
  try {
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (60 * 1000));
    const diffHours = Math.floor(diffMs / (60 * 60 * 1000));
    const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));

    if (diffMins < 1) return "Baru saja";
    if (diffMins < 60) return `${diffMins} menit lalu`;
    if (diffHours < 24) return `${diffHours} jam lalu`;
    if (diffDays === 1) return "Kemarin";
    if (diffDays < 7) return `${diffDays} hari lalu`;

    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch (e) {
    return dateStr;
  }
};

// Helper pengelompokan waktu
export const groupNotificationsByDate = (notifList) => {
  const groups = {
    today: [],
    yesterday: [],
    earlier: [],
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  notifList.forEach((notif) => {
    const notifDate = new Date(notif.created_at);
    notifDate.setHours(0, 0, 0, 0);

    if (notifDate.getTime() === today.getTime()) {
      groups.today.push(notif);
    } else if (notifDate.getTime() === yesterday.getTime()) {
      groups.yesterday.push(notif);
    } else {
      groups.earlier.push(notif);
    }
  });

  return groups;
};
