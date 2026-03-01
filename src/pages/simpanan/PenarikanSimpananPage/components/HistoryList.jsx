import React, { useMemo } from "react";
import { ListGroup, Spinner } from "react-bootstrap";
import { FaArrowUp } from "react-icons/fa";
import { formatRupiah } from "../../../../utils/helper/formatRupiah";

const HistoryList = ({ history, loading, onItemClick }) => {
  const getStatusStyle = useMemo(
    () => (status) => {
      const upperStatus = status?.toUpperCase();
      if (upperStatus === "APPROVED")
        return { bg: "#E8F5E9", color: "#2E7D32" };
      if (upperStatus === "REJECTED")
        return { bg: "#FFEBEE", color: "#C62828" };
      if (upperStatus === "PENDING") return { bg: "#FFF3E0", color: "#EF6C00" };
      return { bg: "#F5F5F5", color: "#757575" };
    },
    [],
  );

  const historyItems = useMemo(() => {
    if (!history?.length) return null;

    return history.map((item) => {
      const style = getStatusStyle(item.status);
      const formattedDate = new Date(item.created_at).toLocaleDateString(
        "id-ID",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        },
      );

      return (
        <ListGroup.Item
          key={item.withdrawal_id || item.id}
          className="px-0 py-3 border-0 d-flex align-items-center justify-content-between"
          style={{ borderBottom: "1px solid #F1F4F8", cursor: "pointer" }}
          onClick={() => onItemClick && onItemClick(item)}
        >
          <div className="d-flex align-items-center">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center me-3"
              style={{
                width: "45px",
                height: "45px",
                backgroundColor: "#F8F9FE",
              }}
            >
              <FaArrowUp size={14} className="text-primary" />
            </div>
            <div>
              <div
                className="fw-bold text-dark mb-0"
                style={{ fontSize: "14px" }}
              >
                Pencairan Simpanan
              </div>
              <div className="text-muted" style={{ fontSize: "11px" }}>
                {formattedDate}
              </div>
            </div>
          </div>
          <div className="text-end">
            <div className="fw-bold text-dark" style={{ fontSize: "15px" }}>
              Rp {formatRupiah(item.amount)}
            </div>
            <span
              className="badge border-0"
              style={{
                fontSize: "10px",
                backgroundColor: style.bg,
                color: style.color,
                borderRadius: "6px",
                padding: "4px 8px",
              }}
            >
              {item.status || "PENDING"}
            </span>
          </div>
        </ListGroup.Item>
      );
    });
  }, [history, getStatusStyle]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" size="sm" variant="primary" />
        <div className="text-muted small mt-2">Memuat riwayat...</div>
      </div>
    );
  }

  if (!history?.length) {
    return (
      <div className="text-center py-5 text-muted small">
        Belum ada riwayat transaksi.
      </div>
    );
  }

  return <ListGroup variant="flush">{historyItems}</ListGroup>;
};

export default React.memo(HistoryList);
