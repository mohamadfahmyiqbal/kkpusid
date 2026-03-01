import React, { useState, useEffect, useCallback, useRef } from "react";
import { Button, Spinner, Alert } from "react-bootstrap";
import USimpanan from "../../../../utils/api/USimpanan";
import InformasiRekeningCard from "../components/InformasiRekeningCard";

const SimpananPage = () => {
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState({ code: null, name: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(new AbortController());

  useEffect(() => {
    const controller = abortControllerRef.current;

    const fetchMasterProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await USimpanan.getProducts({
          signal: controller.signal,
        });

        if (response.data?.status) {
          const products = response.data.data;
          setCategories(products);

          if (products.length > 0) {
            setActiveTab({
              code: products[0].product_code,
              name: products[0].product_name,
            });
          }
        } else {
          setError("Gagal memuat kategori simpanan.");
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error Fetching Products:", err);
          setError(err.response?.data?.message || "Gagal terhubung ke server.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMasterProducts();

    return () => {
      controller.abort();
    };
  }, []);

  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3 text-muted">Sinkronisasi Data Produk...</p>
      </div>
    );
  }

  return (
    <div>
      {error && (
        <Alert variant="danger" className="mx-2 shadow-sm">
          {error}
        </Alert>
      )}

      <div className="d-flex flex-column gap-2 mx-2 mb-4">
        {categories.map((cat) => (
          <Button
            key={cat.product_code}
            onClick={() =>
              setActiveTab({ code: cat.product_code, name: cat.product_name })
            }
            className="py-3 border-0 shadow-sm text-start ps-4"
            style={{
              backgroundColor:
                activeTab.code === cat.product_code ? "#005a8d" : "white",
              color: activeTab.code === cat.product_code ? "white" : "#495057",
              fontWeight: activeTab.code === cat.product_code ? "bold" : "500",
              borderRadius: "12px",
              transition: "all 0.2s ease-in-out",
              fontSize: "14px",
            }}
          >
            {cat.product_name}
          </Button>
        ))}
      </div>

      {activeTab.code ? (
        <div className="mx-2">
          <section className="mb-4">
            <InformasiRekeningCard
              activeType={activeTab.code}
              displayName={activeTab.name}
            />
          </section>
        </div>
      ) : (
        !loading && (
          <div className="text-center py-5 text-muted">
            Data simpanan tidak tersedia.
          </div>
        )
      )}
    </div>
  );
};

export default SimpananPage;
