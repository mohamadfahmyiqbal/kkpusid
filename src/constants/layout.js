// Layout constants for consistent styling and behavior

export const DROPDOWN_WIDTHS = {
  USER: "280px",
  NOTIFICATION: "320px",
  KERANJANG: "300px",
};

export const FONT_SIZES = {
  BADGE: "0.6rem",
  SMALL: "0.75rem",
  EXTRA_SMALL: "0.65rem",
  TINY: "10px",
};

export const MAX_HEIGHTS = {
  NOTIFICATION_LIST: 350,
  KERANJANG_LIST: 300,
};

export const IMAGE_SIZES = {
  USER_AVATAR_SMALL: 32,
  USER_AVATAR_LARGE: 55,
  LOGO_HEIGHT: 30,
};

export const ACCESSIBILITY_LABELS = {
  // Navigation
  CLOSE_SIDEBAR: "Tutup sidebar navigasi",
  TOGGLE_SIDEBAR: "Buka/tutup sidebar navigasi",
  GO_TO_DASHBOARD: "Menuju halaman dashboard",
  SIDEBAR_BACKDROP: "Latar belakang sidebar - klik untuk menutup",
  MAIN_CONTENT: "Konten utama halaman",
  PAGE_NAVIGATION: "Navigasi halaman",
  
  // User actions
  USER_MENU: "Menu pengguna",
  USER_PROFILE: "Profil pengguna",
  USER_SETTINGS: "Pengaturan pengguna",
  NOTIFICATIONS: "Notifikasi",
  SHOPPING_CART: "Keranjang belanja",
  
  // Page specific
  PROFILE_PAGE: "Menuju halaman profil",
  BALANCE_PAGE: "Menuju halaman saldo",
  LOGOUT: "Keluar dari aplikasi",
  
  // Search
  SEARCH_INPUT: "Kolom pencarian",
  SEARCH_BUTTON: "Tombol pencarian",
  SEARCH_CLEAR: "Hapus pencarian",
  SEARCH_RESULTS: "Hasil pencarian",
  NO_RESULTS: "Tidak ada hasil yang ditemukan",
  
  // Forms
  FORM_REQUIRED: "Field ini wajib diisi",
  FORM_OPTIONAL: "Field ini opsional",
  FORM_ERROR: "Terjadi kesalahan pada field ini",
  FORM_SUCCESS: "Field ini berhasil divalidasi",
  
  // Loading states
  LOADING: "Memuat data...",
  PROCESSING: "Memproses permintaan...",
  SAVING: "Menyimpan data...",
  
  // Keyboard shortcuts
  KEYBOARD_HELP: "Bantuan pintasan keyboard",
  KEYBOARD_NAVIGATION: "Navigasi keyboard",
  
  // Error states
  ERROR_BOUNDARY: "Terjadi kesalahan sistem",
  ERROR_RETRY: "Coba lagi",
  ERROR_REFRESH: "Muat ulang halaman",
  
  // Theme
  THEME_TOGGLE: "Ganti tema (terang/gelap)",
  THEME_LIGHT: "Tema terang",
  THEME_DARK: "Tema gelap",
  THEME_SYSTEM: "Ikuti tema sistem",
  
  // Interactive elements
  BUTTON_EXPAND: "Perluas",
  BUTTON_COLLAPSE: "Sembunyikan",
  BUTTON_PLAY: "Putar",
  BUTTON_PAUSE: "Jeda",
  BUTTON_STOP: "Berhenti",
  
  // Status indicators
  STATUS_ONLINE: "Online",
  STATUS_OFFLINE: "Offline",
  STATUS_BUSY: "Sibuk",
  STATUS_AWAY: "Away",
  
  // Data tables
  TABLE_SORT_ASC: "Urutkan naik",
  TABLE_SORT_DESC: "Urutkan turun",
  TABLE_SORT_NONE: "Tidak diurutkan",
  TABLE_PREVIOUS_PAGE: "Halaman sebelumnya",
  TABLE_NEXT_PAGE: "Halaman selanjutnya",
  TABLE_FIRST_PAGE: "Halaman pertama",
  TABLE_LAST_PAGE: "Halaman terakhir",
  
  // Media
  IMAGE_LOADING: "Gambar sedang dimuat",
  IMAGE_ERROR: "Gagal memuat gambar",
  VIDEO_PLAY: "Putar video",
  VIDEO_PAUSE: "Jeda video",
  VIDEO_MUTE: "Bisu",
  VIDEO_UNMUTE: "Aktifkan suara",
  
  // Time and date
  TIME_RELATIVE: "Waktu relatif",
  TIME_ABSOLUTE: "Waktu absolut",
  DATE_PICKER: "Pemilih tanggal",
  TIME_PICKER: "Pemilih waktu",
  
  // File operations
  FILE_UPLOAD: "Unggah file",
  FILE_DOWNLOAD: "Unduh file",
  FILE_DELETE: "Hapus file",
  FILE_PREVIEW: "Pratinjau file",
  
  // Modals and overlays
  MODAL_CLOSE: "Tutup jendela dialog",
  MODAL_CONFIRM: "Konfirmasi",
  MODAL_CANCEL: "Batal",
  OVERLAY_CLOSE: "Tutup overlay",
  
  // Progress indicators
  PROGRESS_LOADING: "Sedang memuat",
  PROGRESS_COMPLETE: "Selesai",
  PROGRESS_FAILED: "Gagal",
  PROGRESS_CANCELLED: "Dibatalkan",
  
  // Charts and graphs
  CHART_LOADING: "Memuat grafik",
  CHART_NO_DATA: "Tidak ada data untuk ditampilkan",
  CHART_ZOOM_IN: "Perbesar",
  CHART_ZOOM_OUT: "Perkecil",
  CHART_RESET_ZOOM: "Reset zoom",
  
  // Maps
  MAP_ZOOM_IN: "Perbesar peta",
  MAP_ZOOM_OUT: "Perkecil peta",
  MAP_FULLSCREEN: "Layar penuh",
  MAP_LOCATION: "Lokasi saat ini",
  
  // Accessibility
  SKIP_TO_CONTENT: "Lewati ke konten utama",
  SKIP_TO_NAVIGATION: "Lewati ke navigasi",
  SCREEN_READER_ONLY: "Hanya untuk pembaca layar",
  
  // Security
  PASSWORD_SHOW: "Tampilkan password",
  PASSWORD_HIDE: "Sembunyikan password",
  TWO_FACTOR_CODE: "Kode autentikasi dua faktor",
  
  // Social features
  LIKE_BUTTON: "Suka",
  SHARE_BUTTON: "Bagikan",
  COMMENT_BUTTON: "Komentar",
  FOLLOW_BUTTON: "Ikuti",
  UNFOLLOW_BUTTON: "Berhenti mengikuti",
  
  // E-commerce
  ADD_TO_CART: "Tambah ke keranjang",
  REMOVE_FROM_CART: "Hapus dari keranjang",
  CHECKOUT: "Proses pembayaran",
  PAYMENT_METHOD: "Metode pembayaran",
  SHIPPING_ADDRESS: "Alamat pengiriman",
  
  // Notifications
  NOTIFICATION_DISMISS: "Tutup notifikasi",
  NOTIFICATION_MARK_READ: "Tandai sudah dibaca",
  NOTIFICATION_MARK_UNREAD: "Tandai belum dibaca",
  
  // Data management
  DATA_EXPORT: "Ekspor data",
  DATA_IMPORT: "Impor data",
  DATA_SYNC: "Sinkronisasi data",
  DATA_BACKUP: "Backup data",
  DATA_RESTORE: "Pulihkan data",
  
  // Help and support
  HELP_CENTER: "Pusat bantuan",
  CONTACT_SUPPORT: "Hubungi dukungan",
  FAQ: "Pertanyaan yang sering diajukan",
  DOCUMENTATION: "Dokumentasi",
  
  // Language and localization
  LANGUAGE_SELECT: "Pilih bahasa",
  TRANSLATION_AVAILABLE: "Terjemahan tersedia",
  RTL_SUPPORT: "Dukungan tulisan dari kanan ke kiri",
};

export const CSS_CLASSES = {
  SIDEBAR_BACKDROP: "dashboard-sidebar-backdrop",
  SIDEBAR_OPEN: "show",
  SIDEBAR_BODY_CLASS: "show-sidebar",
  NAVIGATION_LINK: "sidebar-link-btn",
  DROPDOWN_ITEM: "dropdown-item-custom",
  LOGOUT_ITEM: "logout-item",
};

export const BREAKPOINTS = {
  DESKTOP: 768,
};

export const ANIMATION_DURATION = {
  SIDEBAR_TRANSITION: 300,
  PAGE_TRANSITION: 300,
  RESIZE_DEBOUNCE: 150,
};

export const TOUCH_GESTURES = {
  SWIPE_THRESHOLD: 50,
};
