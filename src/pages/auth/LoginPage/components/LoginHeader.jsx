import React from "react";
import { Container, Nav } from "react-bootstrap";
import { IoLogIn, IoArrowBack } from "react-icons/io5";
import { jwtEncode } from "../../../../utils/helpers";

const LoginHeader = ({
  targetPageName = "authLogin",
  linkText = "Login",
  iconType = "login",
}) => {
  const SPLASH_PAGE_NAME = "globalSplash";

  const getSafePath = (pageName) => {
    try {
      if (!pageName) {
        return `/${jwtEncode({ page: SPLASH_PAGE_NAME })}`;
      }
      return `/${jwtEncode({ page: pageName })}`;
    } catch (error) {
      console.error("LoginHeader JWT Error:", error);
      return "/";
    }
  };

  const splashPath = getSafePath(SPLASH_PAGE_NAME);
  const targetPath = getSafePath(targetPageName);
  const targetIcon =
    iconType === "back" ? <IoArrowBack size={24} /> : <IoLogIn size={24} />;

  return (
    <header className="l-header fixed-top py-1 shadow-sm">
      <nav className="navbar navbar-expand-md navbar-dark">
        <Container>
          <a className="navbar-brand me-3 fw-bold fs-4" href={splashPath}>
            <img
              src="/assets/icons/PUSlogo.png"
              alt="Logo PUS"
              className="l-logo-size"
              style={{ height: "40px", objectFit: "contain" }}
            />
          </a>

          <div className="ms-auto d-flex align-items-center">
            <Nav>
              <Nav.Link
                href={targetPath}
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

export default React.memo(LoginHeader);
