import React from "react";
import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
  Spinner,
  CardImg,
} from "react-bootstrap";
import { IoMenu } from "react-icons/io5";
import { useArticlesData } from "../hooks/useArticlesData";

// **Data FALLBACK_ARTICLES DIHAPUS**

// Komponen untuk menampilkan Ilustrasi/Gambar
const ArticleIllustration = ({ src, alt }) => {
  return (
    <div className="p-3">
      <CardImg
        src={src}
        alt={alt}
        className="rounded-4 w-100"
        style={{ height: "auto", objectFit: "cover" }}
        loading="lazy"
      />
    </div>
  );
};

const ArticleSection = () => {
  const { articles, loading } = useArticlesData();

  // --- RENDERING BERSYARAT ---
  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="secondary" />
      </Container>
    );
  }

  return (
    <Container className="py-5 article-section">
      <h2 className="text-center text-white fw-bold mb-5">
        Layanan Unggulan Kami
      </h2>

      {/* TAMPILKAN PESAN JIKA TIDAK ADA ARTIKEL */}
      {articles.length === 0 ? (
        <Row className="justify-content-center">
          <Col md={12} className="text-center py-5">
            <p className="lead text-muted">
              Belum ada artikel yang dipublikasikan saat ini.
            </p>
          </Col>
        </Row>
      ) : (
        <Row className="justify-content-center">
          {articles.map((card, index) => (
            <Col key={index} sm={12} md={6} lg={4} className="mb-4">
              <Card
                className="shadow-lg border-0 mx-3 h-100 rounded-4 article-card"
                role="article"
                aria-labelledby={`article-title-${index}`}
              >
                <CardBody>
                  <Card.Title className="fw-bold" id={`article-title-${index}`}>
                    {card.title}
                  </Card.Title>
                  <Card.Text className="text-muted small">
                    {card.text}
                  </Card.Text>

                  {card.showIllustration && (
                    <>
                      {/* Dot Indicators dan Menu Internal */}
                      <div className="d-flex justify-content-between align-items-center mb-3 pt-3">
                        <div className="d-flex">
                          <span className="dot bg-secondary me-1"></span>
                          <span className="dot bg-secondary me-1 opacity-50"></span>
                          <span className="dot bg-secondary opacity-50"></span>
                        </div>
                        <IoMenu
                          size={20}
                          className="text-muted"
                          aria-label="Menu artikel"
                        />
                      </div>
                    </>
                  )}
                </CardBody>

                {/* MENAMPILKAN GAMBAR (ArticleIllustration) */}
                {card.showIllustration && (
                  <ArticleIllustration src={card.img} alt={card.title} />
                )}
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default React.memo(ArticleSection);
