// 📁 src/components/shared/InformasiRekeningCard.jsx
import React, { useEffect, useState, memo } from "react";
import { Card, Spinner, Alert, Button, Stack } from "react-bootstrap";
import { FaInfoCircle, FaPlusCircle, FaHandHoldingUsd } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import USimpanan from "../../utils/api/USimpanan";
import { jwtEncode } from "../../routes/helpers";

// Memoize component untuk mencegah re-render jika props tidak berubah
const InformasiRekeningCard = memo(
  ({
    activeType,
    displayName,
    variant = "primary",
    showActions = true,
    fromPage = "transaksiPage",
  }) => {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Konfigurasi Tema Warna yang lebih bersih
    const themes = {
      primary: {
        bg: "#005a8d",
        gradient: "linear-gradient(135deg, #005a8d 0%, #007bbd 100%)",
      },
      success: {
        bg: "#28a745",
        gradient: "linear-gradient(135deg, #28a745 0%, #218838 100%)",
      },
      warning: {
        bg: "#f39c12",
        gradient: "linear-gradient(135deg, #f39c12 0%, #d35400 100%)",
      },
    };

    const activeTheme = themes[variant] || themes.primary;

    useEffect(() => {
      let isMounted = true; // Cleanup flag

      const fetchDetail = async () => {
        if (!activeType) return;

        try {
          setLoading(true);
          setError(null);

          const response = await USimpanan.getAccountDetail({
            category: activeType,
          });

          if (isMounted && response.data?.status) {
            const accData = response.data.data;
            setDetails({
              nama: accData.member_name || "Anggota",
              produk: displayName || accData.product_name,
              saldo: parseFloat(accData.balance || 0),
              accountNo: accData.account_no,
              billItemIds: accData.billItemIds || [],
            });
          } else if (isMounted) {
            setError("Data simpanan tidak ditemukan");
          }
        } catch (err) {
          if (isMounted) setError("Gagal menyinkronkan saldo");
        } finally {
          if (isMounted) setLoading(false);
        }
      };

      fetchDetail();
      return () => {
        isMounted = false;
      }; // Cleanup on unmount
    }, [activeType, displayName]);

    // Logika Navigasi Terpadu
    const handleAction = (type) => {
      let payload = { return: fromPage, category: activeType, displayName };

      if (type === "PAY" && details?.billItemIds?.length > 0) {
        payload = {
          ...payload,
          page: "invoicePage",
          billItemIds: details.billItemIds,
        };
      } else if (type === "WITHDRAW") {
        payload = {
          ...payload,
          page: "penarikanSimpananPage",
          maxAmount: details?.saldo,
          accountNo: details?.accountNo,
        };
      } else {
        payload = { ...payload, page: "billingPage" };
      }

      navigate(`/${jwtEncode(payload)}`);
    };

    if (loading)
      return (
        <Card
          className="border-0 shadow-sm text-center py-5 text-white"
          style={{ backgroundColor: activeTheme.bg, borderRadius: "15px" }}
        >
          <Spinner animation="border" variant="light" size="sm" />
          <p className="mt-2 mb-0 small opacity-75">Menghitung Saldo...</p>
        </Card>
      );

    if (error)
      return (
        <Alert
          variant="danger"
          className="py-3 text-center border-0 shadow-sm rounded-4"
        >
          <FaInfoCircle className="me-2" /> {error}
        </Alert>
      );

    return (
      <Card
        className="border-0 shadow-lg text-white"
        style={{ background: activeTheme.gradient, borderRadius: "20px" }}
      >
        <Card.Body className="p-4">
          <div
            className="text-center mb-4 opacity-50 fw-bold"
            style={{ fontSize: "10px", letterSpacing: "2px" }}
          >
            INFORMASI REKENING
          </div>

          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <small
                className="d-block opacity-75 mb-1"
                style={{ fontSize: "9px" }}
              >
                NAMA ANGGOTA
              </small>
              <span
                className="fw-bold d-block text-truncate"
                style={{ maxWidth: "160px" }}
              >
                {details?.nama}
              </span>
            </div>
            <div className="text-end">
              <small
                className="d-block opacity-75 mb-1"
                style={{ fontSize: "9px" }}
              >
                NOMOR REKENING
              </small>
              <span className="fw-bold d-block small">
                {details?.accountNo || "-"}
              </span>
            </div>
          </div>

          <div
            className="py-3 px-2 mb-4 rounded-4 text-center"
            style={{
              backgroundColor: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <small
              className="d-block mb-1 opacity-75"
              style={{ fontSize: "10px" }}
            >
              Saldo {details?.produk}
            </small>
            <h2 className="mb-0 fw-bold">
              Rp {details?.saldo?.toLocaleString("id-ID")}
            </h2>
          </div>

          {showActions && (
            <Stack
              direction="horizontal"
              gap={3}
              className="justify-content-center"
            >
              {/* Logic Pokok: Tampilkan 'Detail' jika ada tagihan, 'Setoran' jika tidak */}
              {activeType.includes("POKOK") && (
                <ActionButton
                  variant={
                    details?.billItemIds?.length > 0 ? "light" : "success"
                  }
                  icon={
                    details?.billItemIds?.length > 0 ? (
                      <FaInfoCircle />
                    ) : (
                      <FaPlusCircle />
                    )
                  }
                  label={
                    details?.billItemIds?.length > 0 ? "Detail" : "Setoran"
                  }
                  onClick={() => handleAction("PAY")}
                  colorClass={
                    details?.billItemIds?.length > 0
                      ? "text-primary"
                      : "text-white"
                  }
                />
              )}

              {/* Logic Wajib/Sukarela: Selalu ada Setoran */}
              {(activeType.includes("WAJIB") ||
                activeType.includes("SUKARELA")) && (
                <ActionButton
                  variant="success"
                  icon={<FaPlusCircle />}
                  label="Setoran"
                  onClick={() => handleAction("BILL")}
                />
              )}

              {/* Logic Sukarela: Tambahan tombol Pencairan */}
              {activeType.includes("SUKARELA") && details?.saldo > 0 && (
                <ActionButton
                  variant="warning"
                  icon={<FaHandHoldingUsd />}
                  label="Pencairan"
                  onClick={() => handleAction("WITHDRAW")}
                />
              )}
            </Stack>
          )}
        </Card.Body>
      </Card>
    );
  }
);

// Komponen Button Kecil yang di-reusable
const ActionButton = ({
  variant,
  icon,
  label,
  onClick,
  colorClass = "text-white",
}) => (
  <Button
    variant={variant}
    onClick={onClick}
    className={`fw-bold ${colorClass} d-flex flex-column align-items-center justify-content-center border-0 shadow-sm transition-all`}
    style={{
      minWidth: "80px",
      height: "65px",
      fontSize: "10px",
      borderRadius: "16px",
    }}
  >
    <div className="mb-1" style={{ fontSize: "18px" }}>
      {icon}
    </div>
    <span>{label}</span>
  </Button>
);

export default InformasiRekeningCard;
