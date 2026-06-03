import React, { useCallback, useMemo } from "react";
import {
  Card,
  Form,
  Button,
  Alert,
  Spinner,
  InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  IoMailOutline,
  IoLockClosedOutline,
  IoEyeOutline,
  IoEyeOffOutline,
  IoArrowForward,
  IoPhonePortraitOutline,
} from "react-icons/io5";
import { AUTH_CONSTANTS } from "../constants/authConstants";

const LoginFormCard = ({
  emailHp,
  password,
  showPassword,
  error,
  loading,
  emailHpInvalid,
  passwordInvalid,
  forgotPasswordPath,
  registerPath,
  onEmailChange,
  onPasswordChange,
  onTogglePassword,
  onSubmit,
  firstInputRef,
}) => {
  // Memoized validation untuk performance
  const isValidEmail = useMemo(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailHp);
  }, [emailHp]);

  const isValidPhone = useMemo(() => {
    const phoneRegex = /^\d{10,13}$/;
    return phoneRegex.test(emailHp.replace(/\D/g, ""));
  }, [emailHp]);

  // Enhanced input type detection
  const getInputType = useCallback(() => {
    if (isValidEmail) return "email";
    if (isValidPhone) return "tel";
    return "text";
  }, [isValidEmail, isValidPhone]);

  // Optimized placeholder
  const getPlaceholder = useCallback(() => {
    if (isValidEmail) return "nama@email.com";
    if (isValidPhone) return "0812-3456-7890";
    return AUTH_CONSTANTS.PLACEHOLDERS.EMAIL_OR_PHONE;
  }, [isValidEmail, isValidPhone]);

  return (
    <Card className="border-0 shadow-lg overflow-hidden rounded-4 login-card">
      <Card.Body className="p-4 p-md-5">
        <div className="text-center mb-4">
          <img
            src="/assets/icons/PUSlogo.png"
            alt="PUS Logo"
            className="mb-3"
            style={{ height: "60px" }}
          />
          <h2 className="fw-bold mb-1">Login Anggota</h2>
          <p className="text-muted mb-0">
            Masukkan email/nomor HP dan password Anda
          </p>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={onSubmit} noValidate>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold" htmlFor="email-input">
              Email / Nomor Handphone
            </Form.Label>
            <InputGroup>
              <InputGroup.Text>
                {isValidEmail ? <IoMailOutline /> : <IoPhonePortraitOutline />}
              </InputGroup.Text>
              <Form.Control
                id="email-input"
                ref={firstInputRef}
                type="text"
                placeholder={getPlaceholder()}
                value={emailHp}
                onChange={onEmailChange}
                isInvalid={emailHpInvalid}
                autoComplete="username"
                inputMode={isValidEmail ? "email" : "tel"}
                aria-label="Email atau Nomor Handphone"
                aria-describedby="email-error"
                aria-invalid={!!emailHpInvalid}
              />
              <Form.Control.Feedback id="email-error" type="invalid">
                {emailHpInvalid
                  ? AUTH_CONSTANTS.ERROR_MESSAGES.EMAIL_OR_PHONE_INVALID
                  : "Wajib diisi"}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label className="fw-semibold" htmlFor="password-input">
              Password
            </Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <IoLockClosedOutline />
              </InputGroup.Text>
              <Form.Control
                id="password-input"
                type={showPassword ? "text" : "password"}
                placeholder={AUTH_CONSTANTS.PLACEHOLDERS.LOGIN_PASSWORD}
                value={password}
                onChange={onPasswordChange}
                isInvalid={passwordInvalid}
                autoComplete="current-password"
                inputMode="text"
                aria-label="Password"
                aria-describedby="password-error"
                aria-invalid={!!passwordInvalid}
              />
              <Button
                variant="outline-secondary"
                type="button"
                onClick={onTogglePassword}
                aria-label={
                  showPassword ? "Sembunyikan password" : "Tampilkan password"
                }
              >
                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </Button>
              <Form.Control.Feedback id="password-error" type="invalid">
                {AUTH_CONSTANTS.ERROR_MESSAGES.PASSWORD_REQUIRED}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <div className="d-flex justify-content-end mb-4">
            <Link
              to={forgotPasswordPath}
              className="text-decoration-none small fw-semibold"
            >
              Lupa Password?
            </Link>
          </div>

          <Button
            variant="primary"
            type="submit"
            className="w-100 fw-semibold py-2 d-flex align-items-center justify-content-center gap-2 login-btn"
            disabled={loading}
            aria-describedby="submit-help"
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" aria-hidden="true" />
                Memproses...
              </>
            ) : (
              <>
                Login
                <IoArrowForward />
              </>
            )}
          </Button>
          {loading && (
            <small
              id="submit-help"
              className="text-muted d-block mt-2 text-center"
            >
              Sedang memproses login Anda...
            </small>
          )}

          <div className="text-center mt-3">
            <p className="mb-0 text-muted">
              Belum memiliki akun?{" "}
              <Link to={registerPath} className="text-decoration-none fw-bold">
                Daftar sekarang
              </Link>
            </p>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default LoginFormCard;
