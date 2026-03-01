// src/component/HeroSection.jsx
import React, { useMemo } from "react";
import { useHeroData } from "../hooks/useHeroData";
import { Container, Row, Col, Spinner, Button } from "react-bootstrap";
const HeroSection = () => {
  const { heroData, loading } = useHeroData();

  const titleElements = useMemo(() => {
    if (!heroData?.title) return null;
    return heroData.title.map((line, index) => (
      <React.Fragment key={index}>
        {String(line ?? "").trim()}
        {index < heroData.title.length - 1 && <br />}
      </React.Fragment>
    ));
  }, [heroData?.title]);

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="light" />
      </Container>
    );
  }

  const currentData = heroData;

  return (
    <Container className="text-center py-5 hero-section">
      <Row className="justify-content-center text-center text-white mb-5">
        <Col md={10} lg={8}>
          <h1 className="fw-bold display-4" style={{ lineHeight: "1.2" }}>
            {titleElements}
          </h1>
          <h4 className="mt-3 text-white-50">{currentData.subtitle}</h4>
          <Button
            variant="outline-light"
            size="lg"
            className="mt-4"
            aria-label="Pelajari lebih lanjut tentang layanan kami"
          >
            Pelajari Lebih Lanjut
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default React.memo(HeroSection);
