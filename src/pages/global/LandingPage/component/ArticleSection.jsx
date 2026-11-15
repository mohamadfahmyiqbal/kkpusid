import React, { useState, useEffect, memo, useCallback, useRef } from "react";
import { Card, CardBody, Container, Row, Col,  Button } from "react-bootstrap";
import UGlobal from "../../../../utils/api/UGlobal";
import ArticleSkeleton from "./ArticleSkeleton";
import Alert from "../../../../components/ui/SwalAlert";


const ArticleSection = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const retryTimeoutRef = useRef(null);

  const fetchArticles = useCallback(async () => {
    try {
      setError(null);
      const response = await UGlobal.getLandingArticles();
      const fetchedArticles = response.data.data || [];

      let formattedArticles = [];

      if (fetchedArticles.length > 0) {
        formattedArticles = fetchedArticles.map((article) => ({
          title: article.title || "Judul Artikel",
          text: article.text || "Deskripsi artikel tidak tersedia.",
          img: article.img || null,
        }));
      }

      setArticles(formattedArticles);
      setRetryCount(0);
    } catch (err) {
      console.error("Gagal mengambil data Artikel:", err);
      setError(err.message || "Terjadi kesalahan saat mengambil data");
      setArticles([]);

      if (retryCount < 3) {
        retryTimeoutRef.current = setTimeout(() => {
          setRetryCount((prev) => prev + 1);
          fetchArticles();
        }, 5000);
      }
    } finally {
      setLoading(false);
    }
  }, [retryCount]);

  useEffect(() => {
    fetchArticles();

    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, [fetchArticles]);

  if (loading) {
    return <ArticleSkeleton />;
  }

  if (error && retryCount >= 3) {
    return (
      <Container className="py-5">
        <Alert variant="warning" className="text-center">
          <Alert.Heading>Gagal Memuat Data</Alert.Heading>
          <p>Tidak dapat memuat artikel setelah beberapa percobaan.</p>
          <button
            className="btn btn-warning"
            onClick={() => {
              setRetryCount(0);
              setLoading(true);
              fetchArticles();
            }}
          >
            Coba Lagi
          </button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="article-section py-5" id="artikel">
      <div className="text-center mb-5">
        <span className="pbs-badge">Berita & Informasi</span>
        <h2 className="pbs-title-section mt-3 text-center">Artikel Terbaru</h2>
      </div>

      {articles.length === 0 ? (
        <Row className="justify-content-center">
          <Col md={8} className="text-center py-5">
            <div className="pbs-card-glass p-5">
              <p className="lead text-white mb-0">
                Belum ada artikel yang dipublikasikan saat ini.
              </p>
              <p className="text-white-50 mt-2">
                Nantikan informasi menarik lainnya dari kami segera.
              </p>
            </div>
          </Col>
        </Row>
      ) : (
        <Row className="justify-content-center g-3 g-md-4">
          {articles.map((card, index) => (
            <Col key={index} xs={6} md={6} lg={4}>
              <Card className="article-card h-100 shadow-sm border-0">
                {card.img ? (
                  <div className="article-image-wrapper">
                    <Card.Img
                      variant="top"
                      src={card.img}
                      alt={card.title}
                      className="article-image"
                    />
                  </div>
                ) : (
                  <div className="article-image-wrapper d-flex align-items-center justify-content-center bg-light">
                    <span className="text-muted">No Image</span>
                  </div>
                )}
                <CardBody className="p-4 d-flex flex-column">
                  <Card.Title className="fw-bold">{card.title}</Card.Title>
                  <Card.Text className="flex-grow-1">
                    {card.text}
                  </Card.Text>
                  <a href="#" className="article-btn-link" onClick={(e) => e.preventDefault()}>
                    Selengkapnya <span>→</span>
                  </a>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {articles.length > 0 && (
        <div className="text-center mt-5">
          <Button variant="outline-light" className="rounded-pill px-5 py-2">
            Lihat Semua Artikel
          </Button>
        </div>
      )}
    </Container>
  );
};

export default memo(ArticleSection);
