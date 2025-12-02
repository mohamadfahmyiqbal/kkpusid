import globalRoutes from "./pages/globalRoutes";
import authRoutes from "./pages/authRoutes";
import anggotaRoutes from "./pages/anggotaRoutes";
import simpananRoutes from "./pages/simpananRoutes";
import transaksiRoutes from "./pages/transaksiRoutes";

// Menggabungkan semua routes menjadi satu objek utama
const PAGE_COMPONENTS = {
  ...globalRoutes,
  ...authRoutes,
  ...anggotaRoutes,
  ...simpananRoutes,
  ...transaksiRoutes,
  // Hapus impor JBRoutes dan ProgramRoutes jika tidak digunakan
};

export default PAGE_COMPONENTS;
