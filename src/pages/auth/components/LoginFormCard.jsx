import React from "react";
import { Card, Form, Button,  InputGroup } from "react-bootstrap";
import { IoEye, IoEyeOff } from "react-icons/io5";
import Alert from "../../../components/ui/SwalAlert";


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
    <Card className="shadow-lg border-0 login-form-card">
      <Card.Body className="p-4">
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary">Masuk</h2>
          <p className="text-muted">
            Masukkan kredensial Anda untuk melanjutkan
          </p>
        </div>

        {error && (
          <Alert variant="danger" className="mb-3">
            {error}
          </Alert>
        )}

        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email atau No. HP</Form.Label>
            <Form.Control
              type="text"
              placeholder="Masukkan email atau nomor HP"
              value={emailHp}
              onChange={onEmailChange}
              isInvalid={emailHpInvalid}
              required
            />
            <Form.Control.Feedback type="invalid">
              Email atau nomor HP tidak valid.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Kata Sandi</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan kata sandi"
                value={password}
                onChange={onPasswordChange}
                isInvalid={passwordInvalid}
                required
              />
              <Button
                variant="outline-secondary"
                onClick={onTogglePassword}
                aria-label="Tampilkan atau sembunyikan kata sandi"
              >
                {showPassword ? <IoEyeOff /> : <IoEye />}
              </Button>
            </InputGroup>
            <Form.Control.Feedback type="invalid">
              Kata sandi tidak boleh kosong.
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-grid mb-3">
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Memproses..." : "Masuk"}
            </Button>
          </div>
        </Form>

        <div className="text-center">
          <p className="mb-2">
            <a href={forgotPasswordPath} className="text-decoration-none">
              Lupa kata sandi?
            </a>
          </p>
          <p className="mb-0">
            Belum punya akun?{" "}
            <a href={registerPath} className="text-decoration-none fw-bold">
              Daftar di sini
            </a>
          </p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default React.memo(LoginFormCard);
