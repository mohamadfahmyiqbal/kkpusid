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
  'src/pages/anggota/account-page/AccountPage.jsx',
  'src/pages/global/transaction/transaction-detail-page.jsx',
  'src/pages/anggota/registration-page/RegistrationPage.jsx',
  'src/pages/anggota/registration-form-detail/RegistrationFormDetail.jsx',
  'src/pages/simpanan/detail-saldo-page/DetailSaldoPage.jsx',
  'src/pages/simpanan/PenarikanSimpananPage/PenarikanSimpananPage.jsx',
  'src/pages/global/billing/pages/BillingPage.jsx',
  'src/pages/global/invoice/pages/InvoicePage.jsx',
  'src/pages/training/TrainingDashboardPage.jsx'
];


export default PAGES_TO_UPDATE;
