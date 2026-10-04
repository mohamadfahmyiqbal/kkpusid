import React, { useEffect, useState, memo, useCallback } from "react";
import { Spinner } from "react-bootstrap";
import Card from "../../../../components/ui/Card";
import Button from "../../../../components/ui/Button";
import { 
  MdInfoOutline, 
  MdAddCircleOutline, 
  MdAccountBalanceWallet, 
  MdCreditCard,
  MdRefresh
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import USimpanan from "../../../../utils/api/USimpanan";
import { jwtEncode } from "../../../../utils/helpers";
import { getSocket } from "../../../../utils/socket";
import { useProfile } from "../../../../components/layout/contexts";
import Swal from "sweetalert2";
import "../../../jualbeli/JualBeliDashboardPage.css";
import "./InformasiRekeningCard.css";
import Alert from "../../../../components/ui/SwalAlert";


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
            Swal.fire({
              title: `Saldo ${displayName} diperbarui: Rp ${data.balance.toLocaleString("id-ID")}`,
              icon: "info",
              toast: true,
              position: "bottom",
              timer: 3000,
              showConfirmButton: false
            });
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
          variant="premium"
          theme={variant}
          className="text-center py-5 loading-card"
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
      <Card variant="premium" theme={variant}>
        <Card.Body className="p-4 relative card-body-front">
          {/* Card Top */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center gap-2 px-3 py-1 rounded-pill blur-effect">
              <MdCreditCard size={14} className="text-light" />
              <span className="fw-bold tracking-wider card-type-label">INFORMASI REKENING</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <span className="premium-status-badge">AKTIF</span>
              <button 
                className={`btn btn-link p-0 text-white opacity-75 hover-opacity-100 transition-all ${isRefreshing ? 'fa-spin' : ''}`}
                onClick={() => fetchDetail(true)}
                disabled={isRefreshing}
              >
                <MdRefresh size={20} />
              </button>
            </div>
          </div>

          {/* Saldo Display */}
          <div className="dc-saldo-display mb-4">
            <div className="small opacity-75 mb-1 fw-medium">Saldo {details?.produk}</div>
            <h2 className="fw-bold mb-0 text-white font-outfit card-amount-value saldo-text">
              Rp {details?.saldo?.toLocaleString("id-ID")}
            </h2>
          </div>

          {/* Info Details */}
          <div className="row g-3 mb-4 pt-3 border-top border-white border-opacity-10 text-start">
            <div className="col-7">
              <div className="text-uppercase opacity-50 fw-bold mb-1 card-grid-label">NAMA ANGGOTA</div>
              <div className="fw-bold small text-white-90 text-truncate">{details?.nama}</div>
            </div>
            <div className="col-5">
              <div className="text-uppercase opacity-50 fw-bold mb-1 card-grid-label">NO. REKENING</div>
              <div className="fw-bold small text-white-90">{details?.accountNo || "-"}</div>
            </div>
          </div>

          {showActions && (
            <div className="d-flex gap-2">
              {/* Logic Pokok: Tampilkan 'Detail' jika ada tagihan, 'Setoran' jika tidak */}
              {activeType.includes("POKOK") && (
                <Button
                  variant="premium"
                  className="flex-fill rounded-3 py-2 d-flex align-items-center justify-content-center gap-2"
                  onClick={() => handleAction("PAY")}
                >
                  {details?.billItemIds?.length > 0 ? (
                    <><MdInfoOutline size={18} /> Detail</>
                  ) : (
                    <><MdAddCircleOutline size={18} /> Setoran</>
                  )}
                </Button>
              )}

              {/* Logic Wajib/Sukarela: Selalu ada Setoran */}
              {(activeType.includes("WAJIB") || activeType.includes("SUKARELA")) && (
                <Button
                  variant="premium"
                  className="flex-fill rounded-3 py-2 d-flex align-items-center justify-content-center gap-2"
                  onClick={() => handleAction("BILL")}
                >
                  <MdAddCircleOutline size={18} /> Setoran
                </Button>
              )}

              {/* Logic Sukarela: Tambahan tombol Pencairan */}
              {activeType.includes("SUKARELA") && details?.saldo > 0 && (
                <Button
                  variant="premium-outline"
                  className="flex-fill rounded-3 py-2 d-flex align-items-center justify-content-center gap-2"
                  onClick={() => handleAction("WITHDRAW")}
                >
                  <MdAccountBalanceWallet size={18} /> Pencairan
                </Button>
              )}
            </div>
          )}
        </Card.Body>
      </Card>
    );
  },
);

export default InformasiRekeningCard;
