import RegistrationSummary from "../../components/anggota/regsitrationForm/RegistrationSummary";
import AccountPage from "../../pages/anggota/AccountPage";
import RegistrationFormDetail from "../../pages/anggota/RegistrationFormDetail";
import RegistrationPage from "../../pages/anggota/RegistrationPage";

const anggotaRoutes = {
  accountPage: AccountPage,
  registrationPage: RegistrationPage,
  registrationFormDetail: RegistrationFormDetail,
  registrationSummary: RegistrationSummary,
  // Tambahkan halaman lain dari folder anggota di sini
};

export default anggotaRoutes; // <--- Variabel diekspor
