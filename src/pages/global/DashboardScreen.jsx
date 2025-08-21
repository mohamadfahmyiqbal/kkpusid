import { useState, useCallback } from "react";
import Header from "../../comp/global/header/Header";
import Sidebar from "../../comp/global/Sidebar";
import { Col, Container, Image, Row, Spinner } from "react-bootstrap";
import CardCalon from "../../comp/dashboard/CardCalon";
import CardAnggota from "../../comp/dashboard/CardAnggota";
import CardTraining from "../../comp/training/CardTraining";
import CardArticle from "../../comp/article/CardArticle";
import Footer from "../../comp/global/Footer";
import CardVisi from "../../comp/global/CardVisi";
import CardContact from "../../comp/global/CardContact";

export default function DashboardScreen() {
  const [user, setUser] = useState(null);

  // Optimized: useCallback to prevent unnecessary re-renders
  const handleUserChange = useCallback((newUser) => {
    setUser(newUser);
  }, []);
  console.log(user);

  return (
    <div id="main-wrapper">
      <Header onUserChange={handleUserChange} />
      <Sidebar user={user} />
      <div className="page-wrapper">
        <Container>
          <Row className="border-bottom mb-3">
            <Col xs={2} className="text-center">
              <Image src="/assets/icons/pus.png" alt="Logo PUS" height={40} />
            </Col>
            <Col xs={8} className="text-center">
              <h5>KOPERASI KONSUMEN "PAGUYUBAN USAHA SUKSES"</h5>
              <h6>No Badan Hukum : AHU-0000852.AH.01.29. TAHUN 2024"</h6>
            </Col>
            <Col xs={2} className="text-center">
              <Image
                src="/assets/icons/Logo Koperasi Indoensia.png"
                alt="Logo PUS"
                height={40}
              />
            </Col>
          </Row>
          <Row className="border-bottom mb-3">
            <Col md={12} xs={12}>
              <h1 className="fw-bold mb-0">Assalamualaikum</h1>
              <h3 className="text-muted">{user?.nama}</h3>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={12} xs={12} className="mb-3">
              {user?.roles === "1" ? (
                <CardCalon user={user} />
              ) : (
                <CardAnggota user={user} />
              )}
            </Col>
            {Number(user?.roles) === 1 ? (
              <Col md={12} xs={12} className="mb-3">
                <CardVisi />
              </Col>
            ) : null}
            {Number(user?.roles) !== 1 ? (
              <Col md={12} xs={12} className="mb-3">
                <CardTraining />
              </Col>
            ) : null}
            <Col md={12} xs={12} className="mb-3">
              <CardArticle />
            </Col>
            <Col md={12} xs={12} className="mb-3">
              <CardContact />
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    </div>
  );
}
