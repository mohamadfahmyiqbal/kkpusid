// src/components/simpanan/InformasiRekeningCard.jsx
import React, { useEffect, useState } from "react";
import { Card, Spinner, Alert } from "react-bootstrap";
import USimpanan from "../../utils/api/USimpanan";

const InformasiRekeningCard = ({ activeType }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        // Panggil API dengan filter kategori (e.g., "Simpanan Pokok")
        const response = await USimpanan.getSavingsHistory({
          category: activeType,
        });

        if (response.data && response.data.status) {
          const txs = response.data.data;

          if (txs.length > 0) {
            const totalSaldo = txs.reduce((acc, curr) => {
              const itemAmount = parseFloat(curr.bill?.items?.[0]?.amount || 0);
              return acc + itemAmount;
            }, 0);

            setDetails({
              // REVISI: Ambil nama dari backend (curr.member.full_name)
              nama: txs[0]?.member?.full_name || "Anggota",
              produk: activeType,
              akad: txs[0]?.bill?.billType?.category_map || "Wadi'ah",
              tanggal: txs[0]?.created_at,
              saldo: totalSaldo,
            });
          } else {
            // Jika tidak ada transaksi untuk kategori ini
            setDetails({
              nama: "Budi Santoso",
              produk: activeType,
              akad: "-",
              tanggal: "-",
              saldo: 0,
            });
          }
        } else {
          setError("Gagal memproses data simpanan");
        }
      } catch (err) {
        console.error("Error Fetching Detail:", err);
        setError("Koneksi ke server terputus");
      } finally {
        setLoading(false);
      }
    };

    if (activeType) {
      fetchDetail();
    }
  }, [activeType]);

  if (loading) {
    return (
      <Card
        className="border-0 shadow-sm text-center py-5 text-white"
        style={{ backgroundColor: "#005a8d" }}
      >
        <Spinner
          animation="border"
          variant="light"
          size="sm"
          className="mb-2"
        />
        <p className="mb-0 small">Memuat data {activeType}...</p>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="py-2 small">
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        {error}
      </Alert>
    );
  }

  return (
    <Card
      className="border-0 shadow-sm text-white"
      style={{
        backgroundColor: "#005a8d",
        backgroundImage: "linear-gradient(135deg, #005a8d 0%, #007bbd 100%)",
      }}
    >
      <Card.Body>
        <h6
          className="text-center mb-3 border-bottom pb-2 fw-bold"
          style={{ borderColor: "rgba(255,255,255,0.2) !important" }}
        >
          INFORMASI REKENING
        </h6>
        <div className="small">
          <div className="d-flex justify-content-between mb-2">
            <span className="opacity-75">Nama:</span>
            <span className="fw-semibold">{details?.nama}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span className="opacity-75">Produk:</span>
            <span className="fw-semibold">{details?.produk}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span className="opacity-75">Akad:</span>
            <span className="fw-semibold">{details?.akad}</span>
          </div>
          <hr style={{ borderColor: "rgba(255,255,255,0.2)" }} />
          <div className="d-flex justify-content-between align-items-center">
            <span className="opacity-75">Total Saldo:</span>
            <h5 className="mb-0 fw-bold">
              Rp {details?.saldo.toLocaleString("id-ID")}
            </h5>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default InformasiRekeningCard;
