import React, { useState, useEffect } from "react";
// Pastikan CardImg diimpor
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
import UGlobal from "../../../../utils/api/UGlobal";

// Data fallback (teks default jika API gagal atau kosong)
const FALLBACK_ARTICLES = [
  {
    title: "Pinjaman Lunak",
    text: "Solusi pembiayaan dengan bunga rendah untuk mendukung usaha Anda.",
    img: "https://placehold.co/382x315", // URL gambar Placeholder
  },
  {
    title: "Pelatihan Usaha",
    text: "Ikuti pelatihan bisnis untuk meningkatkan keterampilan dan jaringan.",
    img: "https://placehold.co/382x315",
  },
  {
    title: "Kemitraan Produk",
    text: "Bergabung dalam kemitraan distribusi produk lokal unggulan.",
    img: "https://placehold.co/382x315",
  },
  {
    title: "Pendampingan Bisnis",
    text: "Dapatkan bimbingan langsung dari mentor berpengalaman.",
    img: "https://placehold.co/382x315",
  },
];

// Komponen untuk menampilkan Ilustrasi/Gambar
const ArticleIllustration = ({ src, alt }) => {
  // Gunakan placeholder default jika src tidak ada
  const imageUrl = src || "https://placehold.co/382x180";

  return (
    <CardImg
      variant="bottom"
      src={imageUrl}
      alt={alt || "Ilustrasi Artikel"}
      style={{
        // Mempertahankan sedikit radius sudut pada gambar jika Card memiliki radius yang lebih besar
        borderRadius: 5,
        marginTop: "1rem",
        height: "180px",
        objectFit: "cover",
      }}
    />
  );
};

const ArticleSection = () => {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await UGlobal.getLandingArticles();

        const fetchedArticles = response.data || [];

        const formattedArticles = fetchedArticles.map((article, index) => ({
          title: article.title || "Judul Artikel",
          text:
            article.description ||
            article.content ||
            "Deskripsi tidak tersedia.",
          img: article.image_url || article.img || null,
          showIllustration: index === 0,
        }));

        setArticles(
          formattedArticles.length > 0 ? formattedArticles : FALLBACK_ARTICLES
        );
      } catch (err) {
        console.error("Gagal mengambil data Artikel:", err);
        setArticles(FALLBACK_ARTICLES);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const currentArticles = articles || FALLBACK_ARTICLES;

  if (loading) {
    return (
      <Container className="my-5">
        <Row
          className="justify-content-center text-center text-white"
          style={{ minHeight: "30vh", alignItems: "center" }}
        >
          <Col>
            <Spinner animation="border" variant="light" role="status">
              <span className="visually-hidden">Memuat Artikel...</span>
            </Spinner>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="l-card-group pb-5 justify-content-center">
        {currentArticles.map((card, index) => (
          <Col key={index} sm={12} md={8} lg={6} className="mb-4">
            <Card
              // Menggunakan rounded-4 untuk corner radius yang seragam
              className="shadow-lg border-0 mx-3 h-100 rounded-4"
            >
              <CardBody>
                <Card.Title className="fw-bold">{card.title}</Card.Title>
                <Card.Text className="text-muted small">{card.text}</Card.Text>

                {card.showIllustration && (
                  <>
                    {/* Dot Indicators dan Menu Internal */}
                    <div className="d-flex justify-content-between align-items-center mb-3 pt-3">
                      <div className="d-flex">
                        <span className="dot bg-secondary me-1"></span>
                        <span className="dot bg-secondary me-1 opacity-50"></span>
                        <span className="dot bg-secondary opacity-50"></span>
                      </div>
                      <IoMenu size={20} className="text-muted" />
                    </div>
                  </>
                )}
              </CardBody>

              {/* MENAMPILKAN GAMBAR (ArticleIllustration) DI SINI */}
              {card.showIllustration && (
                <ArticleIllustration src={card.img} alt={card.title} />
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ArticleSection;
