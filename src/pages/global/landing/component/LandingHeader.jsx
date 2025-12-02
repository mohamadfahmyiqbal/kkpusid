// pages/global/landing/component/LandingHeader.jsx
import React from "react";
import { Container, Nav } from "react-bootstrap";
import { IoLogIn, IoArrowBack } from "react-icons/io5";
import { useParams } from "react-router-dom";
// PATH FIX: Disesuaikan dengan struktur folder
import { jwtEncode } from "../../../../routes/helpers";

/**
 * Header Landing yang dinamis.
 *
 * @param {object} props
 * @param {string} props.targetPageName - Nama halaman tujuan (misalnya 'authLogin' atau 'globalSplash').
 * @param {string} props.linkText - Teks yang ditampilkan di samping ikon (misalnya 'Login' atau 'Kembali').
 * @param {string} props.iconType - Tipe ikon ('login' atau 'back').
 */
const LandingHeader = ({ targetPageName, linkText, iconType }) => {
  const SPLASH_PAGE_NAME = "globalSplash";

  // Hitung path terenkripsi untuk logo (selalu ke splash)
  const SPLASH_PATH = `/${jwtEncode({ page: SPLASH_PAGE_NAME })}`;

  // Hitung path terenkripsi untuk tombol dinamis
  const TARGET_PATH = `/${jwtEncode({ page: targetPageName })}`;

  // Tentukan ikon berdasarkan prop iconType
  let targetIcon;
  if (iconType === "back") {
    targetIcon = <IoArrowBack size={24} />;
  } else {
    // Default ke 'login' atau jika tidak dispesifikasikan
    targetIcon = <IoLogIn size={24} />;
  }

  return (
    <header className="l-header fixed-top py-1 shadow-sm">
      <nav className="navbar navbar-expand-md navbar-dark">
        <Container>
          {/* LOGO: Selalu mengarah ke SPLASH_PATH terenkripsi */}
          <a className="navbar-brand me-3 fw-bold fs-4" href={SPLASH_PATH}>
            <img
              src="/assets/icons/pusLogo.png"
              alt="Logo PUS"
              className="l-logo-size"
            />
          </a>

          <div className="ms-auto d-flex align-items-center">
            <Nav>
              {/* IKON DINAMIS BERDASARKAN PROPS */}
              <Nav.Link
                href={TARGET_PATH}
                className="text-white d-flex align-items-center"
                style={{ cursor: "pointer" }}
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

export default LandingHeader;
