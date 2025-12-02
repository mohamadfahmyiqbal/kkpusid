// src/component/HeroSection.jsx
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import UGlobal from "../../../../utils/api/UGlobal";

// Data fallback (teks default jika API gagal)
const FALLBACK_DATA = {
  title: ["Muamalah", "Syar'i", "Berkah Hakiki"],
  subtitle:
    "Bertekad untuk melaksanakan muamalah syar’i sesuai Al-Qur’an, Al-Hadits, serta ijma’ para Salafush Shalih.",
};

const HeroSection = () => {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        // MENGGUNAKAN FUNGSI BARU DARI UGLOBAL.JSX
        const response = await UGlobal.getLandingText();

        // Asumsi API mengembalikan data dalam format:
        // { title_line1, title_line2, title_line3, subtitle }
        const data = response.data;
        const formattedTitle = [
          data.title_line1,
          data.title_line2,
          data.title_line3,
        ];

        setHeroData({
          title: formattedTitle,
          subtitle: data.subtitle,
        });
      } catch (err) {
        // Jika API gagal, gunakan data fallback
        setHeroData(FALLBACK_DATA);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  // ... (Sisa kode HeroSection untuk loading dan rendering) ...

  if (loading) {
    // ... tampilkan Spinner ...
  }

  const currentData = heroData || FALLBACK_DATA;

  return (
    <Container>
      <Row className="justify-content-center text-center text-white mb-5">
        <Col md={10} lg={8}>
          <h1 className="fw-bold display-4" style={{ lineHeight: "1.2" }}>
            {currentData.title.map((line, index) => (
              <React.Fragment key={index}>
                {line.trim()}
                {index < currentData.title.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>
          <h4 className="mt-3 text-white-50">{currentData.subtitle}</h4>
        </Col>
      </Row>
    </Container>
  );
};

export default HeroSection;
