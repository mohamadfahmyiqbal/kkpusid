import React from "react";
import { Container, Nav } from "react-bootstrap";
import { IoLogIn, IoArrowBack } from "react-icons/io5";
// Pastikan path import ini sesuai dengan struktur folder Anda
import { jwtEncode } from "../../../../routes/helpers";

/**
 * Header Landing yang dinamis dengan proteksi Encrypted Routing.
 * * @param {object} props
 * @param {string} props.targetPageName - Nama halaman tujuan (default: 'authLogin').
 * @param {string} props.linkText - Teks tombol (default: 'Login').
 * @param {string} props.iconType - Tipe ikon 'login' atau 'back'.
 */
const LandingHeader = ({
  targetPageName = "authLogin",
  linkText = "Login",
  iconType = "login",
}) => {
  const SPLASH_PAGE_NAME = "globalSplash";

  // Helper untuk melakukan encode secara aman
  const getSafePath = (pageName) => {
    try {
      // Validasi: jwtEncode mewajibkan properti 'page' string
      if (!pageName) {
        console.warn(
          "LandingHeader: targetPageName is missing, falling back to Splash"
        );
        return `/${jwtEncode({ page: SPLASH_PAGE_NAME })}`;
      }
      return `/${jwtEncode({ page: pageName })}`;
    } catch (error) {
      console.error("LandingHeader JWT Error:", error);
      return "/"; // Fallback ke root jika gagal total
    }
  };

  const SPLASH_PATH = getSafePath(SPLASH_PAGE_NAME);
  const TARGET_PATH = getSafePath(targetPageName);

  // Seleksi Ikon
  const targetIcon =
    iconType === "back" ? <IoArrowBack size={24} /> : <IoLogIn size={24} />;

  return (
    <header className="l-header fixed-top py-1 shadow-sm">
      <nav className="navbar navbar-expand-md navbar-dark">
        <Container>
          {/* LOGO: Navigasi ke Splash Page */}
          <a className="navbar-brand me-3 fw-bold fs-4" href={SPLASH_PATH}>
            <img
              src="/assets/icons/pusLogo.png"
              alt="Logo PUS"
              className="l-logo-size"
              style={{ height: "40px", objectFit: "contain" }}
            />
          </a>

          <div className="ms-auto d-flex align-items-center">
            <Nav>
              <Nav.Link
                href={TARGET_PATH}
                className="text-white d-flex align-items-center"
                style={{ cursor: "pointer", textDecoration: "none" }}
              >
                {targetIcon}
                <span className="ms-2 d-none d-sm-inline">{linkText}</span>
              </Nav.Link>
            </Nav>
          </div>
        </Container>
      </nav>
    </header>
  );
};

export default React.memo(LandingHeader);
