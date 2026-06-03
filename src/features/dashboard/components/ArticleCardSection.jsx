import React from "react";
import { Card, Button } from "react-bootstrap";
import { 
  MdChevronRight, 
  MdArticle, 
  MdAccessTime,
  MdCollectionsBookmark
} from "react-icons/md";

/**
 * Komponen kartu artikel terbaru
 */
const ArticleCardSection = ({ articleData, onSeeAll }) => {
  // Mapping gradasi untuk thumbnail artikel agar variatif
  const gradients = [
    "linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)",
    "linear-gradient(135deg, #34d399 0%, #10b981 100%)",
    "linear-gradient(135deg, #f472b6 0%, #db2777 100%)",
  ];

  return (
    <section className="mb-4 dc-article-section">
      <div className="d-flex align-items-center justify-content-between mb-3 px-1">
        <div className="d-flex align-items-center gap-2">
          <div className="dc-section-icon bg-success bg-opacity-10 text-success">
            <MdCollectionsBookmark size={20} />
          </div>
          <h5 className="fw-bold mb-0" style={{ fontSize: '1rem', color: '#1e293b' }}>
            Artikel Terbaru
          </h5>
        </div>
        <Button
          variant="link"
          className="p-0 text-decoration-none fw-bold d-flex align-items-center"
          style={{ fontSize: '13px' }}
          onClick={onSeeAll}
        >
          Lihat Semua <MdChevronRight size={18} />
        </Button>
      </div>

      <Card className="border-0 shadow-sm dc-card-modern overflow-hidden">
        <Card.Body className="p-0">
          {articleData.map((item, i) => (
            <div key={i} className="dc-article-row-v2" onClick={onSeeAll}>
              <div 
                className="dc-article-thumb"
                style={{ background: gradients[i % gradients.length] }}
              >
                <MdArticle size={28} color="white" />
              </div>
              
              <div className="dc-article-body">
                <div className="d-flex justify-content-between align-items-start mb-1">
                  <h6 className="dc-article-title mb-0">{item.title}</h6>
                </div>
                <p className="dc-article-desc mb-2 text-muted">{item.desc}</p>
                
                <div className="dc-article-meta d-flex align-items-center gap-3">
                  <div className="d-flex align-items-center gap-1">
                    <MdAccessTime size={14} className="opacity-50" />
                    <span>{item.date}</span>
                  </div>
                  <div className="dc-read-more">
                    <span>Baca Selengkapnya</span>
                    <MdChevronRight size={16} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Card.Body>
      </Card>

      <style>{`
        .dc-article-section {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .dc-article-row-v2 {
          display: flex;
          gap: 20px;
          padding: 24px;
          border-bottom: 1px solid #f1f5f9;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .dc-article-row-v2:last-child {
          border-bottom: none;
        }

        .dc-article-row-v2:hover {
          background-color: #f8fafc;
        }

        .dc-article-row-v2:hover .dc-article-title {
          color: #2563eb;
        }

        .dc-article-thumb {
          width: 80px;
          height: 80px;
          border-radius: 16px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        .dc-article-body {
          flex-grow: 1;
          min-width: 0;
        }

        .dc-article-title {
          font-size: 15px;
          font-weight: 700;
          color: #1e293b;
          line-height: 1.4;
          transition: color 0.2s ease;
        }

        .dc-article-desc {
          font-size: 13px;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .dc-article-meta {
          font-size: 12px;
          color: #94a3b8;
          font-weight: 500;
        }

        .dc-read-more {
          color: #2563eb;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 2px;
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.3s ease;
        }

        .dc-article-row-v2:hover .dc-read-more {
          opacity: 1;
          transform: translateX(0);
        }

        @media (max-width: 576px) {
          .dc-article-row-v2 {
            padding: 16px;
            gap: 16px;
          }
          .dc-article-thumb {
            width: 64px;
            height: 64px;
          }
          .dc-article-title {
            font-size: 14px;
          }
          .dc-read-more {
            display: none; /* Hide on mobile for cleaner look */
          }
        }
      `}</style>
    </section>
  );
};

export default React.memo(ArticleCardSection);
