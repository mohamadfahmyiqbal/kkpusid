// 📁 src/pages/global/BillingPage/components/HistoryList.jsx
import React from "react";
import { Card, Badge } from "react-bootstrap";
import { FaCheckCircle, FaHistory } from "react-icons/fa";

const HistoryList = ({ history }) => {
  const safeHistory = Array.isArray(history) ? history : [];
  const hasHistory = safeHistory.length > 0;

  return (
    <Card className="border-0 shadow-sm rounded-20 overflow-hidden">
      <Card.Header className="bg-dark text-white py-3 px-4 d-flex align-items-center gap-2">
        <FaHistory size={14} />
        <span className="fw-bold" style={{ fontSize: "15px" }}>
          Histori Transaksi
        </span>
        {hasHistory && (
          <span className="ms-auto text-white-50 small">
            {safeHistory.length} transaksi
          </span>
        )}
      </Card.Header>
      <Card.Body className="p-0">
        {hasHistory ? (
          <div className="bp-history-scroll">
            {safeHistory.map((item) => {
              // Generate unique key dari data
              const itemKey = item.id || item.bill_item_id || `${item.createdAt}-${item.amount}-${Math.random()}`;
              return (
                <div
                  key={itemKey}
                  className="bp-history-item d-flex align-items-center gap-3 p-3 px-4 border-bottom border-light"
                >
                  <div className="bp-history-icon">
                    <FaCheckCircle className="text-success" size={16} />
                  </div>
                  <div className="flex-grow-1 min-w-0">
                    <div className="fw-bold text-dark small text-truncate">
                      {item.description || "Transaksi"}
                    </div>
                    <div className="text-success fw-bold small">
                      Rp{" "}
                      {parseFloat(item.amount || 0).toLocaleString("id-ID")}
                    </div>
                    {item.createdAt && (
                      <div
                        className="text-muted"
                        style={{ fontSize: "10px" }}
                      >
                        {new Date(item.createdAt).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    )}
                  </div>
                  <Badge
                    bg="success"
                    className="fw-normal rounded-pill flex-shrink-0"
                    style={{ fontSize: "10px" }}
                  >
                    Lunas
                  </Badge>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-5 text-center text-muted">
            <FaHistory className="mb-2 opacity-25" size={28} />
            <p className="mb-0 small">Belum ada transaksi.</p>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default React.memo(HistoryList);