// 📁 src/pages/member/SimpananPage.jsx
import React, { useState, useEffect } from "react";
import { Button, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { jwtEncode } from "../../routes/helpers";
import USimpanan from "../../utils/api/USimpanan";
import InformasiRekeningCard from "../../components/shared/InformasiRekeningCard";

const SimpananPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  // State awal: menyimpan objek { code, name }
  const [activeTab, setActiveTab] = useState({ code: null, name: null });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMasterProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await USimpanan.getProducts();

        if (response.data && response.data.status) {
          const products = response.data.data;
          setCategories(products);

          // Set default aktif menggunakan item pertama
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
        console.error("Error Fetching Products:", err);
        setError("Gagal terhubung ke server.");
      } finally {
        setLoading(false);
      }
    };

    fetchMasterProducts();
  }, []);

  const handleBackToDashboard = () => {
    const token = jwtEncode({ page: "dashboard" });
    navigate(`/${token}`);
  };

  if (loading) {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" variant="primary" />
        <p className="mt-3 text-muted">Sinkronisasi Data Produk...</p>
      </div>
    );
  }

  return (
    <div
      className="container-fluid py-3"
      style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}
    >
      {/* Tombol Kembali */}
      <div className="mx-2 mb-3">
        <Button
          variant="link"
          className="p-0 text-decoration-none text-muted fw-bold d-flex align-items-center"
          onClick={handleBackToDashboard}
        >
          <FaArrowLeft className="me-2" /> Kembali ke Dashboard
        </Button>
      </div>

      {error && (
        <Alert variant="danger" className="mx-2 shadow-sm">
          {error}
        </Alert>
      )}

      {/* Navigasi Tab Vertikal */}
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

      {/* Konten Utama (Hanya Informasi Rekening) */}
      {activeTab.code ? (
        <div className="mx-2 animate__animated animate__fadeIn">
          <section className="mb-4">
            <InformasiRekeningCard
              activeType={activeTab.code}
              displayName={activeTab.name}
            />
          </section>

          {/* Bagian Riwayat/Mutasi telah dihapus sesuai permintaan */}
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
