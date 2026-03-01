import React from "react";
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
} from "react-icons/io5";

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
}) => {
  return (
    <Card className="border-0 shadow-lg overflow-hidden rounded-4">
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

        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">
              Email / Nomor Handphone
            </Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <IoMailOutline />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Masukkan Email atau Nomor HP"
                value={emailHp}
                onChange={onEmailChange}
                isInvalid={emailHpInvalid}
                autoComplete="username"
                aria-label="Email atau Nomor Handphone"
              />
              <Form.Control.Feedback type="invalid">
                Wajib diisi.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label className="fw-semibold">Password</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <IoLockClosedOutline />
              </InputGroup.Text>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan Password"
                value={password}
                onChange={onPasswordChange}
                isInvalid={passwordInvalid}
                autoComplete="current-password"
                aria-label="Password"
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
              <Form.Control.Feedback type="invalid">
                Wajib diisi.
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
            className="w-100 fw-semibold py-2 d-flex align-items-center justify-content-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" />
                Memproses...
              </>
            ) : (
              <>
                Login
                <IoArrowForward />
              </>
            )}
          </Button>

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

