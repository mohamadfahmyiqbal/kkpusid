import React, { useEffect, useState, memo, useMemo, useCallback } from "react";
import { Card, Spinner, Alert, Button } from "react-bootstrap";
import { 
  MdInfoOutline, 
  MdAddCircleOutline, 
  MdAccountBalanceWallet, 
  MdPerson, 
  MdCreditCard,
  MdRefresh
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import USimpanan from "../../../../utils/api/USimpanan";
import { jwtEncode } from "../../../../utils/helpers";
import { getSocket } from "../../../../utils/socket";
import { useProfile } from "../../../../components/layout/contexts";
import { toast } from "react-toastify";

/**
 * Komponen kartu informasi rekening dengan desain premium & modern
 */
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
    const [isRefreshing, setIsRefreshing] = useState(false);
    const navigate = useNavigate();
    const { userData } = useProfile();

    // Konfigurasi Tema Warna Premium
    const themes = useMemo(() => ({
      primary: {
        gradient: "linear-gradient(135deg, #075985 0%, #0369a1 40%, #0ea5e9 100%)",
        shadow: "rgba(7, 89, 133, 0.3)",
      },
      success: {
        gradient: "linear-gradient(135deg, #065f46 0%, #059669 40%, #10b981 100%)",
        shadow: "rgba(5, 150, 105, 0.3)",
      },
      warning: {
        gradient: "linear-gradient(135deg, #92400e 0%, #d97706 40%, #f59e0b 100%)",
        shadow: "rgba(217, 119, 6, 0.3)",
      },
    }), []);

    const activeTheme = useMemo(() => themes[variant] || themes.primary, [variant, themes]);

    const fetchDetail = useCallback(async (isManual = false) => {
      if (!activeType) return;
      if (isManual) setIsRefreshing(true);
      else setLoading(true);
      
      setError(null);

      try {
        const response = await USimpanan.getAccountDetail({
          category: activeType,
        });

        if (response.data?.status) {
          const accData = response.data.data;
          setDetails({
            nama: accData.member_name || "Anggota",
            produk: displayName || accData.product_name,
            saldo: parseFloat(accData.balance || 0),
            accountNo: accData.account_no,
            billItemIds: accData.billItemIds || [],
          });
        } else {
          setError("Data simpanan tidak ditemukan");
        }
      } catch (err) {
        setError("Gagal menyinkronkan saldo");
      } finally {
        setLoading(false);
        setIsRefreshing(false);
      }
    }, [activeType, displayName]);

    useEffect(() => {
      let isMounted = true;
      fetchDetail();

      const memberId = userData?.member_id;
      const socket = getSocket();
      
      if (memberId && socket) {
        socket.on("savings:balance:update", (data) => {
          if (data.category === activeType && isMounted) {
            setDetails((prev) => ({ ...prev, saldo: data.balance }));
            toast.info(
              `Saldo ${displayName} diperbarui: Rp ${data.balance.toLocaleString("id-ID")}`,
              { position: "bottom-center", autoClose: 3000 }
            );
          }
        });
      }

      return () => {
        isMounted = false;
        if (socket) socket.off("savings:balance:update");
      };
    }, [fetchDetail, activeType, displayName, userData]);

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
          style={{ background: activeTheme.gradient, borderRadius: "24px", minHeight: '200px' }}
        >
          <div className="d-flex flex-column align-items-center justify-content-center h-100">
            <Spinner animation="border" variant="light" size="sm" />
            <p className="mt-3 mb-0 small fw-bold opacity-75">Menghitung Saldo...</p>
          </div>
        </Card>
      );

    if (error)
      return (
        <Alert
          variant="danger"
          className="py-4 text-center border-0 shadow-sm rounded-4 animate-fade-in"
        >
          <MdInfoOutline size={24} className="mb-2" />
          <div className="fw-bold">{error}</div>
          <Button variant="link" size="sm" onClick={() => fetchDetail()} className="text-danger p-0 mt-1">Coba Lagi</Button>
        </Alert>
      );

    return (
      <Card
        className="border-0 shadow-lg text-white overflow-hidden animate-fade-in"
        style={{ 
          background: activeTheme.gradient, 
          borderRadius: "24px",
          boxShadow: `0 20px 40px -10px ${activeTheme.shadow}`
        }}
      >
        {/* Background Decorations */}
        <div style={{
          position: 'absolute', top: '-20px', right: '-20px',
          width: '140px', height: '140px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)', zIndex: 0
        }} />
        <div style={{
          position: 'absolute', bottom: '-30px', left: '5%',
          width: '100px', height: '100px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.03)', zIndex: 0
        }} />

        <Card.Body className="p-4 position-relative" style={{ zIndex: 1 }}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center gap-2 bg-white bg-opacity-10 px-3 py-1 rounded-pill">
              <MdCreditCard size={14} className="opacity-75" />
              <span className="fw-bold" style={{ fontSize: "10px", letterSpacing: "1px" }}>
                INFORMASI REKENING
              </span>
            </div>
            <button 
              className={`btn btn-link p-0 text-white opacity-75 hover-opacity-100 transition-all ${isRefreshing ? 'fa-spin' : ''}`}
              onClick={() => fetchDetail(true)}
              disabled={isRefreshing}
            >
              <MdRefresh size={20} />
            </button>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-7">
              <div className="d-flex align-items-start gap-2">
                <MdPerson className="mt-1 opacity-60" size={16} />
                <div className="min-w-0">
                  <div className="text-uppercase opacity-60 fw-bold" style={{ fontSize: '9px', letterSpacing: '0.8px' }}>
                    NAMA ANGGOTA
                  </div>
                  <div className="fw-bold text-truncate" style={{ fontSize: '15px' }}>
                    {details?.nama}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-5">
              <div className="d-flex align-items-start gap-2">
                <MdAccountBalanceWallet className="mt-1 opacity-60" size={16} />
                <div>
                  <div className="text-uppercase opacity-60 fw-bold" style={{ fontSize: '9px', letterSpacing: '0.8px' }}>
                    NO. REKENING
                  </div>
                  <div className="fw-bold" style={{ fontSize: '14px' }}>
                    {details?.accountNo || "-"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="dc-saldo-box mb-4">
            <div className="text-center py-3 rounded-4" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="small opacity-75 mb-1 fw-medium">Saldo {details?.produk}</div>
              <h2 className="mb-0 fw-bold" style={{ fontSize: '2rem', letterSpacing: '-0.5px' }}>
                Rp {details?.saldo?.toLocaleString("id-ID")}
              </h2>
            </div>
          </div>

          {showActions && (
            <div className="dc-action-grid">
              {/* Logic Pokok: Tampilkan 'Detail' jika ada tagihan, 'Setoran' jika tidak */}
              {activeType.includes("POKOK") && (
                <ActionButton
                  variant="light"
                  icon={details?.billItemIds?.length > 0 ? <MdInfoOutline /> : <MdAddCircleOutline />}
                  label={details?.billItemIds?.length > 0 ? "Detail" : "Setoran"}
                  onClick={() => handleAction("PAY")}
                  isHighlight={details?.billItemIds?.length > 0}
                />
              )}

              {/* Logic Wajib/Sukarela: Selalu ada Setoran */}
              {(activeType.includes("WAJIB") || activeType.includes("SUKARELA")) && (
                <ActionButton
                  variant="light"
                  icon={<MdAddCircleOutline />}
                  label="Setoran"
                  onClick={() => handleAction("BILL")}
                />
              )}

              {/* Logic Sukarela: Tambahan tombol Pencairan */}
              {activeType.includes("SUKARELA") && details?.saldo > 0 && (
                <ActionButton
                  variant="light"
                  icon={<MdAccountBalanceWallet />}
                  label="Pencairan"
                  onClick={() => handleAction("WITHDRAW")}
                />
              )}
            </div>
          )}
        </Card.Body>

        <style>{`
          .dc-action-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
            gap: 12px;
          }

          .animate-fade-in {
            animation: fadeIn 0.4s ease-out forwards;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .fa-spin {
            animation: spin 1s linear infinite;
          }

          .transition-all {
            transition: all 0.2s ease-in-out;
          }

          .hover-opacity-100:hover {
            opacity: 1 !important;
            transform: scale(1.1);
          }
        `}</style>
      </Card>
    );
  },
);

/**
 * Reusable Action Button Tile
 */
const ActionButton = ({ icon, label, onClick, isHighlight = false }) => (
  <button
    type="button"
    onClick={onClick}
    className={`dc-action-tile ${isHighlight ? 'highlight' : ''}`}
  >
    <div className="dc-action-tile-icon">{icon}</div>
    <div className="dc-action-tile-label">{label}</div>
    <style>{`
      .dc-action-tile {
        background: rgba(255, 255, 255, 0.12);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 18px;
        padding: 12px 8px;
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
        width: 100%;
      }

      .dc-action-tile:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-4px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
      }

      .dc-action-tile.highlight {
        background: white;
        color: #075985;
        border-color: white;
      }

      .dc-action-tile.highlight .dc-action-tile-icon {
        color: #075985;
      }

      .dc-action-tile-icon {
        font-size: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .dc-action-tile-label {
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
    `}</style>
  </button>
);

export default InformasiRekeningCard;
