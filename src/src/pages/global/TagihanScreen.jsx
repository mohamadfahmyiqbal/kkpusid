import { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtEncode } from "../../routes/helpers";
import UMenu from "../../utils/UMenu";
import notification from "../../comp/global/Notification";
import Header from "../../comp/global/header/Header";
import Sidebar from "../../comp/global/Sidebar";
import { FaArrowLeft } from "react-icons/fa";
import TbTagihan from "../../comp/global/payment/TbTagihan";

export default function TagihanScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { back, jenis } = location.state;

  const handleUserChange = useCallback((newUser) => setUser(newUser), []);

  const handleClick = useCallback(() => {
    navigate(`/${jwtEncode({ page: "dashboard" })}`);
  }, [navigate, back]);

  return (
    <div id="main-wrapper">
      <Header onUserChange={handleUserChange} />
      <Sidebar user={user} />
      <div className="page-wrapper">
        <Container fluid>
          {/* Header Page */}
          <Row className="border-bottom mb-3">
            <Col xs={12} className="d-flex align-items-center">
              <Button
                variant="none"
                className="p-0 me-2 d-flex align-items-center"
                onClick={handleClick}
              >
                <FaArrowLeft size={15} className="me-1" />
              </Button>
              <h1 className="fw-bold mb-0">Tagihan</h1>
            </Col>
          </Row>

          <Row>
            <TbTagihan data={location.state} />
          </Row>
        </Container>
      </div>
    </div>
  );
}
