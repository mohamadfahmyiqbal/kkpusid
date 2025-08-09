import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { jwtEncode } from "../../routes/helpers";

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const token = jwtEncode({ page: "landing" });
      console.log(`/page/${token}`);
      navigate(`/page/${token}`, { replace: true });
    }, 3000);
    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        background: "linear-gradient(180deg, #13547A 0%, #80D0C7 100%)",
        overflow: "hidden",
        padding: 0,
      }}
    >
      <Row className="w-100 justify-content-center align-items-center">
        <Col xs="auto">
          <h1
            className="text-white fw-bold m-0 text-center"
            style={{
              fontSize: "clamp(48px, 15vw, 180px)",
              fontFamily: "Inter, sans-serif",
              lineHeight: "1.2",
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.30)",
            }}
          >
            PUS
          </h1>
        </Col>
      </Row>
      <Row className="w-100 justify-content-center align-items-center mt-3">
        <Col xs="auto">
          <h5
            className="text-white fw-bold m-0 text-center"
            style={{
              fontSize: "clamp(18px, 5vw, 48px)",
              fontFamily: "Inter, sans-serif",
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.30)",
            }}
          >
            Paguyuban Usaha Sukses
          </h5>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xs="auto">
          <Spinner animation="border" variant="light" role="status">
            <span className="visually-hidden">Memuat...</span>
          </Spinner>
        </Col>
      </Row>
    </Container>
  );
}
