import React from "react";
import { Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MdAccessTime } from "react-icons/md";
import { jwtEncode } from "../../../utils/helpers";
import { ARTICLE_DATA } from "../../../features/dashboard/constants/dashboardData";

const ArticleDetailPage = ({ decodedToken }) => {
  const navigate = useNavigate();
  const articleId = decodedToken?.id;
  
  // Try to find the article
  const article = ARTICLE_DATA.find(a => a.id === articleId) || {
    title: "Artikel Tidak Ditemukan",
    desc: "Maaf, artikel yang Anda cari tidak tersedia atau telah dihapus.",
    date: "-",
  };

  const handleBack = () => {
    const returnPage = decodedToken?.return || "dashboard";
    navigate(`/${jwtEncode({ page: returnPage })}`);
  };

  return (
    <Container className="py-4">
      <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
        {/* Placeholder image header */}
        <div 
          style={{ 
            height: '250px', 
            background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <span className="text-muted opacity-50">Gambar Artikel</span>
        </div>
        
        <Card.Body className="p-4 p-md-5">
          <div className="d-flex align-items-center gap-2 text-muted mb-3">
            <MdAccessTime size={16} />
            <small>{article.date}</small>
          </div>
          
          <h2 className="fw-bold mb-4" style={{ color: "#1e293b" }}>{article.title}</h2>
          
          <div className="article-content" style={{ lineHeight: "1.8", color: "#475569" }}>
            <p className="lead fw-semibold text-dark">{article.desc}</p>
            <p>
              Ini adalah halaman detail artikel sementara. Konten teks yang lebih rinci mengenai topik ini akan dimuat sepenuhnya setelah sistem terintegrasi dengan backend.
            </p>
            <p>
              Sebagai koperasi yang mendukung pertumbuhan UMKM, Paguyuban Usaha Sukses senantiasa berkomitmen untuk menyediakan edukasi dan informasi yang bermanfaat demi kemajuan ekonomi kerakyatan secara syariah.
            </p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ArticleDetailPage;
