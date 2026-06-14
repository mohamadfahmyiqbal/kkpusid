import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { jwtDecodePage, jwtEncode } from "../utils/helpers";

const PAGE_TITLES = {
  dashboard: "Dashboard",
  notificationPage: "Notifikasi",
  notificationDetailPage: "Detail Notifikasi",
  billingPage: "Setoran Simpanan",
  invoicePage: "Invoice",
  accountPage: "Profil Saya",
  transactionDetailPage: "Detail Jual Beli",
  registrationPage: "Pendaftaran",
  registrationFormDetail: "Formulir Pendaftaran",
  simpananPage: "Simpanan",
  penarikanSimpananPage: "Penarikan Simpanan",
  jualBeliPage: "Jual Beli",
  formPengajuanTransaksi: "Pengajuan Jual Beli",
  investasiPage: "Investasi",
  trainingPage: "Training",
  tabunganPage: "Tabungan",
  programPage: "Program",
};

/**
 * Helper untuk mengubah camelCase menjadi Title Case yang rapi
 */
const prettifyPageName = (pageName = "") =>
  pageName
    .replace(/Page$/i, "")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();

export const usePageConfig = (propPageName, title) => {
  const { token } = useParams();

  const decodedToken = useMemo(() => jwtDecodePage(token), [token]);
  const currentPage = propPageName || decodedToken?.page || "";
  const showPageNavigation = currentPage !== "dashboard";

  const pageConfig = useMemo(() => {
    const dashboardPath = `/${jwtEncode({ page: "dashboard" })}`;
    const registrationPagePath = `/${jwtEncode({ page: "registrationPage" })}`;
    const jualBeliPagePath = `/${jwtEncode({ page: "jualBeliPage" })}`;
    const simpananPagePath = `/${jwtEncode({ page: "simpananPage" })}`;
    const programPagePath = `/${jwtEncode({ page: "programPage" })}`;
    const arisanPagePath = `/${jwtEncode({ page: "arisanPage" })}`;
    const tabunganPagePath = `/${jwtEncode({ page: "tabunganPage" })}`;

    let baseTitle = title || PAGE_TITLES[currentPage] || prettifyPageName(currentPage);

    // Custom logic untuk billingPage
    if (currentPage === "billingPage") {
      const returnPage = decodedToken?.return;
      if (returnPage === "simpananPage") baseTitle = "Setoran Simpanan";
      else if (returnPage === "jualBeliPage")
        baseTitle = "Setoran Transaksi";
      else if (!returnPage) baseTitle = "Daftar Tagihan";
    }

    const displayName = decodedToken?.displayName;
    const fullTitle = displayName ? `${baseTitle} - ${displayName}` : baseTitle;

    const configs = {
      registrationPage: {
        title: "Pendaftaran Anggota",
        subtitle: "Ketentuan dan instruksi pendaftaran anggota",
        icon: "FaUserPlus",
        breadcrumbs: [
          { label: "Beranda", path: dashboardPath },
          { label: "Pendaftaran Anggota" },
        ],
      },
      registrationFormDetail: {
        title: "Form Pendaftaran Anggota",
        subtitle:
          "Lengkapi data diri, pekerjaan, informasi bank, serta unggah foto KTP dan swafoto Anda.",
        icon: "FaUserPlus",
        breadcrumbs: [
          { label: "Beranda", path: dashboardPath },
          { label: "Pendaftaran Anggota", path: registrationPagePath },
          { label: "Form Pendaftaran" },
        ],
      },
      notificationPage: {
        title: "Pusat Notifikasi",
        subtitle: "Pantau semua informasi dan aktivitas akun Anda",
        icon: "FaBell",
        breadcrumbs: [
          { label: "Beranda", path: dashboardPath },
          { label: "Pusat Notifikasi" },
        ],
      },
      billingPage: {
        title: baseTitle,
        subtitle: "Pembayaran simpanan pokok, wajib, dan sukarela",
        icon: "FaFileInvoiceDollar",
        breadcrumbs: [
          { label: "Beranda", path: dashboardPath },
          { label: baseTitle },
        ],
      },
      accountPage: {
        title: "Profil Saya",
        subtitle: "Kelola informasi akun dan pengaturan profil Anda.",
        icon: "FaUserCog",
        breadcrumbs: [
          { label: "Beranda", path: dashboardPath },
          { label: "Profil Saya" },
        ],
      },
      simpananPage: {
        title: "Simpanan",
        subtitle: "Kelola dana simpanan pokok, wajib, dan sukarela Anda",
        icon: "FaPiggyBank",
        breadcrumbs: [
          { label: "Beranda", path: dashboardPath },
          { label: "Simpanan" },
        ],
      },
      penarikanSimpananPage: {
        title: "Penarikan Simpanan",
        subtitle: "Pengajuan penarikan dana simpanan sukarela",
        icon: "FaHandHoldingUsd",
        breadcrumbs: [
          { label: "Beranda", path: dashboardPath },
          { label: "Simpanan", path: simpananPagePath },
          { label: "Penarikan" },
        ],
      },
      jualBeliPage: {
        title: "Jual Beli",
        subtitle: "Riwayat dan status transaksi keuangan Anda",
        icon: "MdShoppingCart",
        breadcrumbs: [
          { label: "Beranda", path: dashboardPath },
          { label: "Jual Beli" },
        ],
      },
      formPengajuanTransaksi: {
        title: "Pengajuan Jual Beli",
        subtitle: "Formulir pengajuan pembiayaan atau transaksi baru",
        icon: "FaFileSignature",
        breadcrumbs: [
          { label: "Beranda", path: dashboardPath },
          { label: "Jual Beli", path: jualBeliPagePath },
          { label: "Pengajuan" },
        ],
      },
      investasiPage: {
        title: "Investasi",
        subtitle: "Kelola portofolio investasi syariah Anda",
        icon: "FaChartLine",
        breadcrumbs: [
          { label: "Beranda", path: dashboardPath },
          { label: "Investasi" },
        ],
      },
      trainingPage: {
        title: "Training",
        subtitle: "Program pelatihan dan sertifikasi kewirausahaan syariah",
        icon: "FaGraduationCap",
        breadcrumbs: [
          { label: "Beranda", path: dashboardPath },
          { label: "Training" },
        ],
      },
      tabunganPage: {
        title: "Tabungan",
        subtitle: "Kelola rekening tabungan mudharabah Anda",
        icon: "FaPiggyBank",
        breadcrumbs: [
          { label: "Beranda", path: dashboardPath },
          { label: "Tabungan" },
        ],
      },
      programPage: {
        title: "Program",
        subtitle: "Program pembiayaan, arisan, dan investasi koperasi",
        icon: "FaHome",
        breadcrumbs: [
          { label: "Beranda", path: dashboardPath },
          { label: "Program" },
        ],
      },
      arisanPage: {
        title: "Program Arisan",
        subtitle: "Daftar grup arisan yang tersedia",
        icon: "FaUsers",
        breadcrumbs: [
          { label: "Beranda", path: dashboardPath },
          { label: "Program", path: programPagePath },
          { label: "Arisan" },
        ],
      },
      formPengajuanArisan: {
        title: "Form Pengajuan Arisan",
        subtitle: "Lengkapi berkas untuk bergabung dalam grup arisan",
        icon: "FaClipboardList",
        breadcrumbs: [
          { label: "Beranda", path: dashboardPath },
          { label: "Program", path: programPagePath },
          { label: "Arisan", path: arisanPagePath },
          { label: "Pengajuan" },
        ],
      },
      arisanDetailPage: {
        title: "Detail Pengajuan Arisan",
        subtitle: "Rincian status pengajuan arisan Anda",
        icon: "FaClipboardList",
        breadcrumbs: [
          { label: "Beranda", path: dashboardPath },
          { label: "Program", path: programPagePath },
          { label: "Arisan", path: arisanPagePath },
          { label: "Detail Pengajuan" },
        ],
      },
      arisanJoinPage: {
        title: "Pilih Grup Arisan",
        subtitle: "Pilih grup arisan yang tersedia untuk bergabung",
        icon: "FaUsers",
        breadcrumbs: [
          { label: "Beranda", path: dashboardPath },
          { label: "Program", path: programPagePath },
          { label: "Arisan", path: arisanPagePath },
          { label: "Pilih Grup" },
        ],
      },
      arisanConfirmationPage: {
        title: "Konfirmasi Arisan",
        subtitle: "Tinjau kembali data pengajuan arisan Anda",
        icon: "FaCheckCircle",
        breadcrumbs: [
          { label: "Beranda", path: dashboardPath },
          { label: "Program", path: programPagePath },
          { label: "Arisan", path: arisanPagePath },
          { label: "Konfirmasi" },
        ],
      },
      transactionDetailPage: {
        title: decodedToken?.financingId ? "Detail Pembiayaan" : decodedToken?.tabunganId ? "Detail Pengajuan Tabungan" : "Detail Penarikan",
        subtitle: "Informasi rincian dan status pengajuan Anda",
        icon: decodedToken?.financingId ? "FaFileSignature" : decodedToken?.tabunganId ? "FaPiggyBank" : "FaHandHoldingUsd",
        breadcrumbs: [
          { label: "Beranda", path: dashboardPath },
          {
            label: decodedToken?.financingId ? "Jual Beli" : decodedToken?.tabunganId ? "Tabungan" : "Simpanan",
            path: decodedToken?.financingId ? jualBeliPagePath : decodedToken?.tabunganId ? tabunganPagePath : simpananPagePath,
          },
          { label: decodedToken?.financingId ? "Detail Pembiayaan" : decodedToken?.tabunganId ? "Detail Tabungan" : "Detail Penarikan" },
        ],
      },
      detailMateri: {
        title: "Detail Materi Training",
        subtitle: "Pelajari modul dan kerjakan kuis untuk meningkatkan progress Anda",
        icon: "FaGraduationCap",
        breadcrumbs: [
          { label: "Beranda", path: dashboardPath },
          { label: "Training", path: `/${jwtEncode({ page: "trainingPage" })}` },
          { label: "Detail Materi" },
        ],
      },
      bacaMateri: {
        title: "Baca Materi",
        subtitle: "Fokus pada materi pembelajaran untuk persiapan kuis",
        icon: "FaBookOpen",
        breadcrumbs: [
          { label: "Beranda", path: dashboardPath },
          { label: "Training", path: `/${jwtEncode({ page: "trainingPage" })}` },
          { label: "Baca Materi" },
        ],
      },
      evaluasi: {
        title: "Evaluasi Training",
        subtitle: "Uji pemahaman Anda terhadap materi yang telah dipelajari",
        icon: "FaTrophy",
        breadcrumbs: [
          { label: "Beranda", path: dashboardPath },
          { label: "Training", path: `/${jwtEncode({ page: "trainingPage" })}` },
          { label: "Evaluasi" },
        ],
      },
      ranking: {
        title: "Papan Peringkat",
        subtitle: "Lihat prestasi Anda dibandingkan dengan peserta lainnya",
        icon: "FaTrophy",
        breadcrumbs: [
          { label: "Beranda", path: dashboardPath },
          { label: "Training", path: `/${jwtEncode({ page: "trainingPage" })}` },
          { label: "Papan Peringkat" },
        ],
      },
    };

    return (
      configs[currentPage] || {
        title: fullTitle,
        subtitle: "",
        icon: null,
        breadcrumbs: [
          { label: "Beranda", path: dashboardPath },
          { label: fullTitle },
        ],
      }
    );
  }, [currentPage, title, decodedToken]);

  return { pageConfig, showPageNavigation, currentPage, decodedToken };
};
