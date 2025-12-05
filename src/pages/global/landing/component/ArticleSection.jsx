import React, { useState, useEffect } from "react";
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
   />
  </div>
 );
};

const ArticleSection = () => {
 const [articles, setArticles] = useState([]);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchArticles = async () => {
   try {
    // --- 1. PANGGIL API ---
    const response = await UGlobal.getLandingArticles();

    const fetchedArticles = response.data.data || [];
    console.log(fetchArticles);

    // --- 2. FORMAT DATA ---
    let formattedArticles = [];

    if (fetchedArticles.length > 0) {
     formattedArticles = fetchedArticles.map((article, index) => ({
      title: article.title || "Judul Artikel",
      text: article.text || "Deskripsi tidak tersedia.",
      img: article.img || null,
      // Tetapkan showIllustration pada card pertama (index === 0)
      showIllustration: index === 0,
     }));
    }

    // --- 3. SET DATA ---
    setArticles(formattedArticles);

   } catch (err) {
    console.error("Gagal mengambil data Artikel:", err);
    // Jika terjadi error, set Articles menjadi array kosong
    setArticles([]);
   } finally {
    setLoading(false);
   }
  };

  fetchArticles();
 }, []);

 // --- RENDERING BERSYARAT ---
 if (loading) {
  return (
   <Container className="text-center py-5">
    <Spinner animation="border" variant="secondary" />
   </Container>
  );
 }

 return (
  <Container className="py-5">
   <h2 className="text-center text-white fw-bold mb-5">Layanan Unggulan Kami</h2>

   {/* TAMPILKAN PESAN JIKA TIDAK ADA ARTIKEL */}
   {articles.length === 0 ? (
    <Row className="justify-content-center">
     <Col md={12} className="text-center py-5">
      <p className="lead text-muted">Belum ada artikel yang dipublikasikan saat ini.</p>
     </Col>
    </Row>
   ) : (
    <Row className="justify-content-center">
     {articles.map((card, index) => (
      <Col key={index} sm={12} md={8} lg={6} className="mb-4">
       <Card
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

export default ArticleSection;