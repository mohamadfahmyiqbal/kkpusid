import React, { useEffect, useState } from "react";
import { Card, Spinner, Alert, Button, Stack } from "react-bootstrap";
import { FaInfoCircle, FaPlusCircle, FaHandHoldingUsd } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import USimpanan from "../../utils/api/USimpanan";
import { jwtEncode } from "../../routes/helpers";

const InformasiRekeningCard = ({ activeType }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch data berdasarkan kategori tab yang aktif
        const response = await USimpanan.getSavingsHistory({
          category: activeType,
        });

        if (response.data && response.data.status) {
          const txs = response.data.data;

          if (txs.length > 0) {
            // Kalkulasi saldo sederhana dari history (Idealnya ambil dari tabel Account)
            const totalSaldo = txs.reduce((acc, curr) => {
              const itemAmount = parseFloat(curr.bill?.items?.[0]?.amount || 0);
              return acc + itemAmount;
            }, 0);

            setDetails({
              nama: txs[0]?.member?.full_name || "Anggota",
              produk: activeType,
              akad: txs[0]?.bill?.billType?.category_map || "Wadi'ah",
              tanggal: txs[0]?.created_at,
              saldo: totalSaldo,
              lastBillId: txs[0].bill?.bill_id,
            });
          } else {
            // Jika data kosong
            setDetails({
              nama: "-",
              produk: activeType,
              akad: "-",
              tanggal: "-",
              saldo: 0,
              lastBillId: null,
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

    if (activeType) fetchDetail();
  }, [activeType]);

  // Handler untuk navigasi Setoran & Detail Invoice
  const handleActionClick = () => {
    if (activeType === "Simpanan Pokok") {
      if (details?.lastBillId) {
        const token = jwtEncode({
          page: "invoicePage",
          billId: details.lastBillId,
          return: "simpananPage",
        });
        navigate(`/${token}`);
      } else {
        alert("Belum ada data tagihan untuk kategori ini.");
      }
    } else {
      // Untuk Wajib dan Sukarela ke BillingPage
      const token = jwtEncode({
        page: "billingPage",
        setoranType: activeType,
        fromPage: "simpananPage",
      });
      navigate(`/${token}`);
    }
  };

  // Handler khusus untuk Pencairan
  const handleWithdrawClick = () => {
    if (details?.saldo <= 0) {
      alert("Saldo Anda Rp 0. Pencairan tidak dapat diproses.");
      return;
    }

    const token = jwtEncode({
      page: "billingPage", // Diarahkan ke BillingPage yang kini bersifat hybrid
      setoranType: activeType,
      isWithdraw: true, // Flag untuk memunculkan form bank
      maxAmount: details.saldo,
      fromPage: "simpananPage",
    });
    navigate(`/${token}`);
  };

  const renderActionButtons = () => {
    const btnStyle = {
      minWidth: "90px",
      fontSize: "11px",
      padding: "10px 5px",
    };

    return (
      <Stack
        direction="horizontal"
        gap={3}
        className="mt-4 justify-content-center"
      >
        {/* DETAIL: Hanya untuk Pokok */}
        {activeType === "Simpanan Pokok" && (
          <Button
            variant="light"
            style={btnStyle}
            className="fw-bold text-primary d-flex flex-column align-items-center gap-1 border-0 shadow-sm"
            onClick={handleActionClick}
          >
            <FaInfoCircle size={22} />
            <span>Detail</span>
          </Button>
        )}

        {/* SETORAN: Untuk Wajib & Sukarela */}
        {(activeType === "Simpanan Wajib" ||
          activeType === "Simpanan Sukarela") && (
          <Button
            variant="success"
            style={btnStyle}
            className="fw-bold text-white d-flex flex-column align-items-center gap-1 border-0 shadow-sm"
            onClick={handleActionClick}
          >
            <FaPlusCircle size={22} />
            <span>Setoran</span>
          </Button>
        )}

        {/* PENCAIRAN: Khusus Sukarela */}
        {activeType === "Simpanan Sukarela" && (
          <Button
            variant="warning"
            style={btnStyle}
            className="fw-bold text-white d-flex flex-column align-items-center gap-1 border-0 shadow-sm"
            onClick={handleWithdrawClick}
          >
            <FaHandHoldingUsd size={22} />
            <span>Pencairan</span>
          </Button>
        )}
      </Stack>
    );
  };

  if (loading)
    return (
      <Card
        className="border-0 shadow-sm text-center py-5 text-white"
        style={{ backgroundColor: "#005a8d" }}
      >
        <Spinner animation="border" variant="light" size="sm" />
        <p className="mt-2 mb-0 small">Memuat Data...</p>
      </Card>
    );

  if (error)
    return (
      <Alert variant="danger" className="py-2 small text-center">
        {error}
      </Alert>
    );

  return (
    <Card
      className="border-0 shadow-lg text-white"
      style={{
        backgroundColor: "#005a8d",
        backgroundImage: "linear-gradient(135deg, #005a8d 0%, #007bbd 100%)",
        borderRadius: "15px",
      }}
    >
      <Card.Body className="p-4">
        <h6
          className="text-center mb-4 border-bottom pb-2 fw-bold"
          style={{ borderColor: "rgba(255,255,255,0.2)", letterSpacing: "1px" }}
        >
          INFORMASI REKENING
        </h6>

        <div className="mb-4">
          <div className="d-flex justify-content-between mb-2 opacity-75">
            <small>Nama Anggota</small>
            <small>Produk</small>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <span className="fw-bold">{details?.nama}</span>
            <span className="fw-bold">{details?.produk}</span>
          </div>

          <div className="d-flex justify-content-between mb-2 opacity-75">
            <small>Akad</small>
            <small>Status Rekening</small>
          </div>
          <div className="d-flex justify-content-between">
            <span className="fw-bold">{details?.akad}</span>
            <span className="badge bg-light text-primary d-flex align-items-center">
              Aktif
            </span>
          </div>
        </div>

        <div
          className="p-3 rounded-3 text-center"
          style={{
            backgroundColor: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <small className="d-block mb-1 opacity-75">
            Total Saldo Tersedia
          </small>
          <h3 className="mb-0 fw-bold">
            Rp {details?.saldo.toLocaleString("id-ID")}
          </h3>
        </div>

        {renderActionButtons()}
      </Card.Body>
    </Card>
  );
};

export default InformasiRekeningCard;
