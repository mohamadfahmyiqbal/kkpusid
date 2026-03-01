// Template untuk implementasi PageTitle di halaman lain
// Copy dan sesuaikan untuk setiap halaman

/*
// CONTOH IMPLEMENTASI DI HALAM LAIN:

import PageTitle from "../../../components/layout/components/PageTitle";

// Di bagian return, ganti header lama dengan:
<PageTitle 
  title="Judul Halaman"
  subtitle="Deskripsi halaman"
  breadcrumbs={[
    { label: 'Beranda', path: '/dashboard' },
    { label: 'Nama Halaman' }
  ]}
  customBackAction={() => navigate(-1)} // atau fungsi kustom
/>

// Atau gunakan HOC:
import { withPageTitle } from "../../../components/layout/hooks/usePageTitle";

export default withPageTitle('namaHalaman')(NamaKomponen);
*/

// Daftar halaman yang perlu diupdate:
const PAGES_TO_UPDATE = [
  'src/pages/anggota/AccountPage.jsx',
  'src/pages/global/transaction/TransactionDetailPage.jsx',
  'src/pages/global/registration/RegistrationPage.jsx',
  'src/pages/global/registration/RegistrationFormDetail.jsx',
  'src/pages/simpanan/SimpananPage.jsx',
  'src/pages/simpanan/PenarikanSimpananPage/PenarikanSimpananPage.jsx',
  'src/pages/transaksi/TransaksiDashboardPage.jsx',
  'src/pages/transaksi/FormPengajuanTransaksi.jsx',
  'src/pages/investasi/InvestasiPage.jsx',
  'src/pages/training/TrainingPage.jsx'
];

console.log('Pages to update with PageTitle:', PAGES_TO_UPDATE);
export default PAGES_TO_UPDATE;
