import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Row,
  Col,
  Spinner,
  Alert,
  InputGroup,
} from "react-bootstrap";
import { toast } from "react-toastify";
import {
  IoPerson,
  IoCard,
  IoCall,
  IoMail,
  IoLockClosed,
} from "react-icons/io5";

// API & Helpers
import { jwtEncode } from "../../../../utils/helpers";

// Layout
import LandingHeader from "../../../global/LandingPage/component/LandingHeader";
import LandingFooter from "../../../global/LandingPage/component/LandingFooter";

// Hooks
import useAccountRegister from "../hooks/useAccountRegister";

const LOGIN_PATH = `/${jwtEncode({ page: "authLogin" })}`;
const DEFAULT_HEADER_OFFSET_PX = 96;

const AccountRegisterPage = () => {
  const [headerOffset, setHeaderOffset] = useState(DEFAULT_HEADER_OFFSET_PX);
  const {
    formData,
    loading,
    notifPermission,
    handleInputChange,
    handleRegister,
  } = useAccountRegister();

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
    <div id="l-main-wrapper">
      <LandingHeader
        targetPageName="authLogin"
        linkText="Login"
        iconType="login"
      />

      <div
        className="l-content d-flex align-items-center justify-content-center pb-5"
        style={{
          paddingTop: `${headerOffset}px`,
        }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6}>
              <Card className="shadow-lg border-0 rounded-4 register-card">
                <Card.Body className="p-4 p-md-5">
                  <h3 className="text-center mb-4 fw-bold">Daftar Akun Baru</h3>

                  {notifPermission === "denied" && (
                    <Alert variant="warning" className="small py-2 text-center">
                      ⚠️ Notifikasi diblokir. Mohon aktifkan di pengaturan
                      browser agar Anda bisa menerima pembaruan akun.
                    </Alert>
                  )}

                  <Form onSubmit={handleRegister}>
                    <Row>
                      <Col md={12} className="mb-3">
                        <Form.Label className="fw-semibold">
                          Nama Lengkap
                        </Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <IoPerson />
                          </InputGroup.Text>
                          <Form.Control
                            required
                            name="nama"
                            placeholder="Masukkan nama lengkap"
                            onChange={handleInputChange}
                          />
                        </InputGroup>
                      </Col>

                      <Col md={6} className="mb-3">
                        <Form.Label className="fw-semibold">NIK KTP</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <IoCard />
                          </InputGroup.Text>
                          <Form.Control
                            required
                            name="nikKtp"
                            placeholder="16 Digit NIK"
                            onChange={handleInputChange}
                          />
                        </InputGroup>
                      </Col>

                      <Col md={6} className="mb-3">
                        <Form.Label className="fw-semibold">
                          Nomor WA
                        </Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <IoCall />
                          </InputGroup.Text>
                          <Form.Control
                            required
                            name="nomorTelepon"
                            placeholder="0812..."
                            onChange={handleInputChange}
                          />
                        </InputGroup>
                      </Col>

                      <Col md={12} className="mb-3">
                        <Form.Label className="fw-semibold">Email</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <IoMail />
                          </InputGroup.Text>
                          <Form.Control
                            type="email"
                            required
                            name="email"
                            placeholder="nama@email.com"
                            onChange={handleInputChange}
                          />
                        </InputGroup>
                      </Col>

                      <Col md={12} className="mb-4">
                        <Form.Label className="fw-semibold">
                          Password
                        </Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <IoLockClosed />
                          </InputGroup.Text>
                          <Form.Control
                            type="password"
                            required
                            name="password"
                            placeholder="Minimal 6 karakter"
                            onChange={handleInputChange}
                          />
                        </InputGroup>
                      </Col>
                    </Row>

                    <Button
                      type="submit"
                      variant="primary"
                      className="w-100 p-3 fw-bold rounded-3 shadow-sm register-btn"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Spinner
                            animation="border"
                            size="sm"
                            className="me-2"
                          />
                          Memproses...
                        </>
                      ) : (
                        "Daftar Sekarang"
                      )}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <LandingFooter />
    </div>
  );
};

export default AccountRegisterPage;
