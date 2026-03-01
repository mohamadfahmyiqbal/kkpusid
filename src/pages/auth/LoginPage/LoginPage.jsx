import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { jwtEncode } from "../../../utils/helpers";
import { toast } from "react-toastify";
import LoginHeader from "./components/LoginHeader";
import LoginFooter from "./components/LoginFooter";
import LoginFormCard from "./components/LoginFormCard";
import { useLoginForm } from "../hooks/useLoginForm";
import { useNavigate } from "react-router-dom";

const REGISTER_PATH = `/${jwtEncode({ page: "accountRegisterPage" })}`;
const FORGOT_PASSWORD_PATH = `/${jwtEncode({ page: "authForgotPassword" })}`;
const DEFAULT_HEADER_OFFSET_PX = 96;

const LoginPage = () => {
  const [headerOffset, setHeaderOffset] = useState(DEFAULT_HEADER_OFFSET_PX);
  const {
    emailHp,
    password,
    showPassword,
    error,
    loading,
    emailHpInvalid,
    passwordInvalid,
    setEmailHp,
    setPassword,
    setShowPassword,
    handleLogin,
    success,
  } = useLoginForm();

  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      toast.success(success);
      navigate(`/${jwtEncode({ page: "dashboard" })}`);
    }
  }, [success, navigate]);

  useEffect(() => {
    const syncHeaderOffset = () => {
      const headerEl = document.querySelector(".l-header");
      const measuredHeight = headerEl?.offsetHeight || DEFAULT_HEADER_OFFSET_PX;
      setHeaderOffset(measuredHeight + 16);
    };

    syncHeaderOffset();
    window.addEventListener("resize", syncHeaderOffset);
    return () => window.removeEventListener("resize", syncHeaderOffset);
  }, []);

  return (
    <div id="l-main-wrapper" className="d-flex flex-column min-vh-100">
      <LoginHeader />

      <div
        className="l-content flex-grow-1 d-flex align-items-start pb-5"
        style={{
          paddingTop: `${headerOffset}px`,
        }}
      >
        <Container style={{ maxWidth: "640px" }}>
          <Row className="justify-content-center">
            <Col md={10} lg={9}>
              <LoginFormCard
                emailHp={emailHp}
                password={password}
                showPassword={showPassword}
                error={error}
                loading={loading}
                emailHpInvalid={emailHpInvalid}
                passwordInvalid={passwordInvalid}
                forgotPasswordPath={FORGOT_PASSWORD_PATH}
                registerPath={REGISTER_PATH}
                onEmailChange={(e) => setEmailHp(e.target.value)}
                onPasswordChange={(e) => setPassword(e.target.value)}
                onTogglePassword={() => setShowPassword((prev) => !prev)}
                onSubmit={handleLogin}
              />
            </Col>
          </Row>
        </Container>
      </div>

      <LoginFooter />
    </div>
  );
};

export default LoginPage;
