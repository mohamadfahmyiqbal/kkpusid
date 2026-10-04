import React, { useCallback } from "react";
import { Card, Button } from "react-bootstrap";
import { 
  MdChevronRight, 
  MdArticle, 
  MdAccessTime,
  MdCollectionsBookmark
} from "react-icons/md";

/**
 * Mapping gradasi untuk thumbnail artikel agar variatif
 */
const gradients = [
  "linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)",
  "linear-gradient(135deg, #34d399 0%, #10b981 100%)",
  "linear-gradient(135deg, #f472b6 0%, #db2777 100%)",
];

const ArticleItem = React.memo(({ item, index, onReadArticle }) => {
  const handleClick = useCallback(() => {
    if (onReadArticle) onReadArticle(item.id);
  }, [item.id, onReadArticle]);

  return (
    <div className="dc-article-row-v2" onClick={handleClick}>
      <div 
        className="dc-article-thumb"
        style={{ background: gradients[index % gradients.length] }}
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
  );
});

/**
 * Komponen kartu artikel terbaru
 */
const ArticleCardSection = ({ articleData, onSeeAll, onReadArticle }) => {

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
            <ArticleItem 
              key={item.id ?? i} 
              item={item} 
              index={i} 
              onReadArticle={onReadArticle} 
            />
          ))}
        </Card.Body>
      </Card>

    </section>
  );
};

export default React.memo(ArticleCardSection);
