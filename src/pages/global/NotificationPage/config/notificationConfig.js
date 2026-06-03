// Notification Configuration
export const NOTIFICATION_CONFIG = {
  // Pagination
  ITEMS_PER_PAGE: 10,
  MAX_ITEMS_PER_PAGE: 50,
  
  // Feature Flags
  FEATURES: {
    SEARCH: true,
    FILTER: true,
    CATEGORIES: true,
    BULK_ACTIONS: true,
    REAL_TIME: true,
    PUSH_NOTIFICATIONS: false, // Enable when ready
    NOTIFICATION_PREFERENCES: false, // Enable when ready
  },
  
  // Notification Types
  TYPES: {
    TRANSACTION: 'transaction',
    PAYMENT: 'payment', 
    SYSTEM: 'system',
    PROMOTION: 'promotion',
    REMINDER: 'reminder',
    ANNOUNCEMENT: 'announcement',
  },
  
  // Type Labels
  TYPE_LABELS: {
    transaction: 'Transaksi',
    payment: 'Pembayaran',
    system: 'Sistem',
    promotion: 'Promosi',
    reminder: 'Pengingat',
    announcement: 'Pengumuman',
  },
  
  // Filter Options
  FILTER_OPTIONS: [
    { value: 'all', label: 'Semua' },
    { value: 'unread', label: 'Belum Dibaca' },
    { value: 'read', label: 'Sudah Dibaca' },
  ],
  
  // Search Configuration
  SEARCH_CONFIG: {
    MIN_CHARACTERS: 2,
    DEBOUNCE_DELAY: 300,
    SEARCH_FIELDS: ['title', 'body', 'type'],
  },
  
  // Bulk Actions
  BULK_ACTIONS: [
    { value: 'mark_read', label: 'Tandai Dibaca', icon: 'fa-check' },
    { value: 'mark_unread', label: 'Tandai Belum Dibaca', icon: 'fa-envelope' },
    { value: 'delete', label: 'Hapus', icon: 'fa-trash', danger: true },
  ],
  
  // Real-time Configuration
  REAL_TIME_CONFIG: {
    RECONNECT_ATTEMPTS: 5,
    RECONNECT_DELAY: 1000,
    HEARTBEAT_INTERVAL: 30000,
  },
  
  // UI Configuration
  UI: {
    SKELETON_COUNT: 3,
    ANIMATION_DURATION: 300,
    AUTO_REFRESH_INTERVAL: 60000, // 1 minute
  },
  
  // API Configuration
  API: {
    ENDPOINTS: {
      LIST: '/notifications',
      MARK_READ: '/notifications/mark-read',
      MARK_ALL_READ: '/notifications/mark-all-read',
      DELETE: '/notifications',
      PREFERENCES: '/notifications/preferences',
    },
    TIMEOUT: 10000,
  }
};
