import ArisanConfirmationPage from "../../pages/program/arisan/ArisanConfirmationPage";
import ArisanDetailPage from "../../pages/program/arisan/ArisanDetailPage";
import ArisanJoinPage from "../../pages/program/arisan/ArisanJoinPage";
import ArisanPage from "../../pages/program/arisan/ArisanPage";
import FormPengajuanArisan from "../../pages/program/arisan/FormPengajuanArisan";
import FormPengajuanPinjaman from "../../pages/program/pinjaman/FormPengajuanPinjaman";
import PinjamanDetailPage from "../../pages/program/pinjaman/PinjamanDetailPage";
import ProgramPage from "../../pages/program/ProgramPage";


const programRoutes = {
  programPage: ProgramPage,
  formPengajuanPinjaman: FormPengajuanPinjaman,
  pinjamanDetailPage: PinjamanDetailPage,
  arisanPage: ArisanPage,
  arisanJoinPage: ArisanJoinPage,
  arisanConfirmationPage: ArisanConfirmationPage,
  formPengajuanArisan: FormPengajuanArisan,
  arisanDetailPage: ArisanDetailPage,
  // Tambahkan halaman lain dari folder transaksi di sini
};

export default programRoutes;
