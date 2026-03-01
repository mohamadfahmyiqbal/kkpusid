import { useState, useEffect } from "react";
import UGlobal from "../../../../utils/api/UGlobal";

export const useArticlesData = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await UGlobal.getLandingArticles();
        const fetchedArticles = response.data.data || [];
        let formattedArticles = [];

        if (fetchedArticles.length > 0) {
          formattedArticles = fetchedArticles.map((article, index) => ({
            title: article.title || "Judul Artikel",
            text: article.text || "Deskripsi tidak tersedia.",
            img: article.img || null,
            showIllustration: index === 0,
          }));
        }

        setArticles(formattedArticles);
        setError(null); // Reset error on success
      } catch (err) {
        console.error("Gagal mengambil data Artikel:", err);
        setArticles([]);
        setError(err.message || "Gagal memuat data artikel");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return { articles, loading, error };
};
