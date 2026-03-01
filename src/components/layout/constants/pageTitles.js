// Page title configuration for all pages except dashboard
export const PAGE_TITLES = {
  // Notification pages
  notificationPage: {
    title: 'Notifikasi',
    subtitle: 'Pusat notifikasi dan informasi terkini',
    breadcrumbs: [
      { label: 'Beranda', path: '/dashboard' },
      { label: 'Notifikasi' }
    ]
  },
  notificationDetailPage: {
    title: 'Detail Notifikasi',
    subtitle: 'Informasi lengkap notifikasi',
    breadcrumbs: [
      { label: 'Beranda', path: '/dashboard' },
      { label: 'Notifikasi', path: '/notificationPage' },
      { label: 'Detail' }
    ]
  },
  
  // Billing pages
  billingPage: {
    title: 'Tagihan Saya',
    subtitle: 'Kelola dan bayar tagihan Anda',
    breadcrumbs: [
      { label: 'Beranda', path: '/dashboard' },
      { label: 'Tagihan' }
    ]
  },
  invoicePage: {
    title: 'Detail Invoice',
    subtitle: 'Rincian pembayaran tagihan',
    breadcrumbs: [
      { label: 'Beranda', path: '/dashboard' },
      { label: 'Tagihan', path: '/billingPage' },
      { label: 'Detail Invoice' }
    ]
  },
  
  // Account pages
  accountPage: {
    title: 'Profil Saya',
    subtitle: 'Kelola informasi akun dan pribadi',
    breadcrumbs: [
      { label: 'Beranda', path: '/dashboard' },
      { label: 'Profil' }
    ]
  },
  
  // Transaction pages
  transactionDetailPage: {
    title: 'Detail Transaksi',
    subtitle: 'Informasi lengkap transaksi',
    breadcrumbs: [
      { label: 'Beranda', path: '/dashboard' },
      { label: 'Transaksi' },
      { label: 'Detail' }
    ]
  },
  
  // Registration pages
  registrationPage: {
    title: 'Pendaftaran Anggota',
    subtitle: 'Formulir pendaftaran anggota baru',
    breadcrumbs: [
      { label: 'Beranda', path: '/dashboard' },
      { label: 'Pendaftaran' }
    ]
  },
  registrationFormDetail: {
    title: 'Detail Pendaftaran',
    subtitle: 'Lihat dan kelola data pendaftaran',
    breadcrumbs: [
      { label: 'Beranda', path: '/dashboard' },
      { label: 'Pendaftaran', path: '/registrationPage' },
      { label: 'Detail' }
    ]
  },
  
  // Savings pages
  simpananPage: {
    title: 'Simpanan',
    subtitle: 'Kelola simpanan dan tabungan Anda',
    breadcrumbs: [
      { label: 'Beranda', path: '/dashboard' },
      { label: 'Simpanan' }
    ]
  },
  penarikanSimpananPage: {
    title: 'Penarikan Simpanan',
    subtitle: 'Ajukan penarikan simpanan',
    breadcrumbs: [
      { label: 'Beranda', path: '/dashboard' },
      { label: 'Simpanan', path: '/simpananPage' },
      { label: 'Penarikan' }
    ]
  },
  
  // Transaction pages
  transaksiPage: {
    title: 'Transaksi',
    subtitle: 'Kelola semua transaksi Anda',
    breadcrumbs: [
      { label: 'Beranda', path: '/dashboard' },
      { label: 'Transaksi' }
    ]
  },
  formPengajuanTransaksi: {
    title: 'Pengajuan Transaksi',
    subtitle: 'Ajukan transaksi baru',
    breadcrumbs: [
      { label: 'Beranda', path: '/dashboard' },
      { label: 'Transaksi', path: '/transaksiPage' },
      { label: 'Pengajuan' }
    ]
  },
  
  // Investment pages
  investasiPage: {
    title: 'Investasi',
    subtitle: 'Kelola portofolio investasi Anda',
    breadcrumbs: [
      { label: 'Beranda', path: '/dashboard' },
      { label: 'Investasi' }
    ]
  },
  
  // Training pages
  trainingPage: {
    title: 'Pelatihan',
    subtitle: 'Ikuti pelatihan dan pengembangan',
    breadcrumbs: [
      { label: 'Beranda', path: '/dashboard' },
      { label: 'Pelatihan' }
    ]
  }
};

// Hook to get page title configuration
export const usePageTitle = (pageName) => {
  return PAGE_TITLES[pageName] || {
    title: 'Halaman',
    subtitle: '',
    breadcrumbs: []
  };
};
