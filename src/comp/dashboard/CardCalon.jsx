import { Card, Col, Container, Row } from "react-bootstrap";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../routes/helpers";
import { useEffect, useState, useCallback } from "react";
import UAnggota from "../../utils/UAnggota";

export default function CardCalon({ user }) {
  const navigate = useNavigate();
  const [detail, setDetail] = useState(null);

  // Optimasi: gunakan useCallback untuk handleNavigate
  const handleNavigate = useCallback(() => {
    const token = jwtEncode({ page: "pendaftaranAnggota" });
    navigate(`/page/${token}`);
  }, [navigate]);

  return (
    <Container fluid>
      <Card className="bg-blue700 border-0 shadow-sm mb-3">
        <Card.Body>
          <Row className="align-items-center">
            <Col xs={10}>
              <h5 className="text-white mb-2 fw-bold">
                Silahkan Daftar Anggota
              </h5>
              <p className="text-white mb-0" style={{ fontSize: "0.97rem" }}>
                Untuk dapat mengakses keseluruhan fitur. <br />
                <span className="fst-italic">
                  (Mengacu pada UU No 4 Tahun 2023 dan Permenkop UKM No 8 Tahun
                  2023. Layanan ini bersifat inclusive loop, hanya diperuntukkan
                  untuk Anggota Koperasi)
                </span>
              </p>
            </Col>
            <Col xs={2} className="text-end">
              <span
                style={{ textDecoration: "none", cursor: "pointer" }}
                onClick={handleNavigate}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleNavigate();
                }}
                aria-label="Daftar Anggota"
              >
                <FaChevronRight
                  color="white"
                  size={28}
                  style={{ cursor: "pointer" }}
                />
              </span>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}
