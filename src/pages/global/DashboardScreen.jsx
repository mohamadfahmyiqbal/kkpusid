import { useState, useCallback } from "react";
import Header from "../../comp/global/header/Header";
import Sidebar from "../../comp/global/Sidebar";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import CardCalon from "../../comp/dashboard/CardCalon";
import CardAnggota from "../../comp/dashboard/CardAnggota";
import CardTraining from "../../comp/training/CardTraining";
import CardArticle from "../../comp/article/CardArticle";
import Footer from "../../comp/global/Footer";

export default function DashboardScreen() {
  const [user, setUser] = useState(null);

  // Optimized: useCallback to prevent unnecessary re-renders
  const handleUserChange = useCallback((newUser) => {
    setUser(newUser);
  }, []);

  return (
    <div id="main-wrapper">
      <Header onUserChange={handleUserChange} />
      <Sidebar user={user} />
      <div className="page-wrapper">
        <Container fluid>
          <Row className="border-bottom mb-3">
            <Col xs={12}>
              <h1 className="fw-bold mb-0">Assalamualaikum</h1>
              <h3 className="text-muted">{user?.nama}</h3>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={8} lg={9} className="mb-3">
              {user?.roles === "calon" ? (
                <CardCalon />
              ) : (
                <CardAnggota user={user} />
              )}
            </Col>
            <Col md={4} lg={3} className="mb-3">
              <CardTraining />
            </Col>
            <Col md={4} lg={3} className="mb-3">
              <CardArticle />
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    </div>
  );
}
