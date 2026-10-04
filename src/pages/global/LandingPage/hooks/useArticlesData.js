import { useState, useEffect } from "react";
import UGlobal from "../../../../utils/api/UGlobal";

/**
 * Hook untuk mengambil data artikel landing page
 * Dioptimasi: Penanganan error yang lebih baik dan fleksibilitas data.
 */
export const useArticlesData = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await UGlobal.getLandingArticles();
        
        if (!isMounted) return;

        const fetchedArticles = response?.data?.data || [];
        
        const formattedArticles = fetchedArticles.map((article) => ({
          title: article.title || "Layanan Koperasi",
          text: article.text || "Informasi detail mengenai layanan kami akan segera hadir.",
          img: article.img || "/assets/images/placeholder-article.png", // Fallback image
          showIllustration: !!article.img, // Tampilkan jika ada gambar
        }));

        setArticles(formattedArticles);
        setError(null);
      } catch (err) {
        if (!isMounted) return;
        console.error("Article Fetch Error:", err);
        setError("Gagal memuat layanan. Silakan coba lagi nanti.");
        setArticles([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchArticles();

    return () => {
      isMounted = false;
    };
  }, []);

  return { articles, loading, error };
};
