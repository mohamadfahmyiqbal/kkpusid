import RegistrationSummary from "../../pages/anggota/RegistrationSummary";
import AccountPage from "../../pages/anggota/AccountPage/AccountPage";
import RegistrationFormDetail from "../../pages/anggota/RegistrationFormDetail/pages/RegistrationFormDetail";
import RegistrationPage from "../../pages/anggota/RegistrationPage/pages/RegistrationPage";

const anggotaRoutes = {
  accountPage: AccountPage,
  registrationPage: RegistrationPage,
  registrationFormDetail: RegistrationFormDetail,
  registrationSummary: RegistrationSummary,
  // Tambahkan halaman lain dari folder anggota di sini
};

export default anggotaRoutes; // <--- Variabel diekspor
