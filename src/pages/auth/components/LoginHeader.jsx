import React from "react";
import { Container, Nav } from "react-bootstrap";
import { IoArrowBack } from "react-icons/io5";
import { jwtEncode } from "../../../utils/helpers";

const LoginHeader = () => {
  const HOME_PATH = `/${jwtEncode({ page: "globalSplash" })}`;

  return (
    <header className="l-header fixed-top py-1 shadow-sm">
      <nav className="navbar navbar-expand-md navbar-dark">
        <Container>
          <a className="navbar-brand me-3 fw-bold fs-4" href={HOME_PATH}>
            <img
              src="/assets/icons/PUSlogo.png"
              alt="Logo PUS"
              className="l-logo-size"
              style={{ height: "40px", objectFit: "contain" }}
              loading="lazy"
            />
          </a>

          <div className="ms-auto d-flex align-items-center">
            <Nav>
              <Nav.Link
                href={HOME_PATH}
                className="text-white d-flex align-items-center"
                style={{ cursor: "pointer", textDecoration: "none" }}
                aria-label="Kembali ke halaman utama"
              >
                <IoArrowBack size={24} />
                <span className="ms-2 d-none d-sm-inline">Kembali</span>
              </Nav.Link>
            </Nav>
          </div>
        </Container>
      </nav>
    </header>
  );
};

export default React.memo(LoginHeader);
