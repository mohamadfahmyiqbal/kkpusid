import React from "react";
import { Container } from "react-bootstrap";
import { jwtEncode } from "../../../../utils/helpers";

export default function ForgotOtpTopbar({ loginPath }) {
  return (
    <header className="pbs-register-topbar">
      <Container fluid>
        <div className="pbs-topbar-wrap">
          <div className="pbs-topbar-brand">
            <a
              href={`/${jwtEncode({ page: "globalSplash" })}`}
              className="d-flex align-items-center gap-3 text-decoration-none"
            >
              <img
                src={`${process.env.PUBLIC_URL}/assets/icons/PUSlogo.png`}
                alt="PBS"
              />
              <div>
                <strong>Paguyuban Usaha</strong>
                <span>Sukses</span>
              </div>
            </a>
          </div>

          <div className="pbs-topbar-login">
            <span>Ingat password?</span>
            <a href={loginPath}>Login</a>
          </div>
        </div>
      </Container>
    </header>
  );
}
