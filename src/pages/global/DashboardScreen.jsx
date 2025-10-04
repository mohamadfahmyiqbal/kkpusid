import { useState, useCallback, useMemo } from "react";
import Header from "../../comp/global/header/Header";
import Sidebar from "../../comp/global/Sidebar";
import { Col, Container, Image, Row } from "react-bootstrap";

import CardCalon from "../../comp/dashboard/CardCalon";
import CardAnggota from "../../comp/dashboard/CardAnggota";
import CardTraining from "../../comp/training/CardTraining";
import CardArticle from "../../comp/article/CardArticle";
import CardVisi from "../../comp/global/CardVisi";
import CardContact from "../../comp/global/CardContact";
import Footer from "../../comp/global/Footer";
import CardMenu from "../../comp/dashboard/CardMenu";
import CardTagihan from "../../comp/dashboard/CardTagihan";

export default function DashboardScreen() {
  const [user, setUser] = useState(null);

  // handleUserChange tetap stabil agar Header tidak menyebabkan re-render berlebih
  const handleUserChange = useCallback((newUser) => {
    setUser(newUser);
  }, []);

  // Cache role checks untuk readability dan performa
  const role = user?.roles ?? null;
  const isRoleOne = useMemo(() => Number(role) === 1, [role]);
  const isGuestOrCandidate = useMemo(() => role === "1", [role]); // kalau ada logic spesifik

  // render komponen kartu berdasarkan role — dipisah agar JSX lebih bersih
  const renderMainCard = () => {
    if (isRoleOne) return <CardCalon user={user} />;
    return <CardAnggota user={user} />;
  };

  return (
    <div id="main-wrapper">
      <Header onUserChange={handleUserChange} />
      <Sidebar user={user} />

      <div className="page-wrapper">
        <Container>
          <Row className="border-bottom mb-3 align-items-center">
            <Col xs={2} className="text-center">
              <Image src="/assets/icons/pus.png" alt="Logo PUS" height={40} />
            </Col>

            <Col xs={8} className="text-center">
              <h6 className="mb-0">KOPERASI KONSUMEN</h6>
              <h6 className="mb-0">"PAGUYUBAN USAHA SUKSES"</h6>
              <p className="mb-0">
                No Badan Hukum : <br />
                AHU-0000852.AH.01.29. TAHUN 2024
              </p>
            </Col>

            <Col xs={2} className="text-center">
              <Image
                src="/assets/icons/Logo Koperasi Indoensia.png"
                alt="Logo Koperasi Indonesia"
                height={40}
              />
            </Col>
          </Row>

          <Row className="border-bottom mb-3">
            <Col>
              <h1 className="fw-bold mb-0">Assalamualaikum</h1>
              <h3 className="text-muted">{user?.nama ?? "Tamu"}</h3>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col xs={12} className="mb-3">
              {renderMainCard()}
            </Col>
            {user?.role !== 1 && (
              <>
                <Col xs={12} className="mb-3">
                  <CardMenu />
                </Col>
                <Col xs={12} className="mb-3">
                  <CardTagihan />
                </Col>
              </>
            )}

            {isRoleOne && (
              <Col xs={12} className="mb-3">
                <CardVisi />
              </Col>
            )}

            {!isRoleOne && (
              <Col xs={12} className="mb-3">
                <CardTraining />
              </Col>
            )}

            <Col xs={12} className="mb-3">
              <CardArticle />
            </Col>

            <Col xs={12} className="mb-3">
              <CardContact />
            </Col>
          </Row>
        </Container>

        <Footer />
      </div>
    </div>
  );
}
