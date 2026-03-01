// 📁 src/pages/global/BillingPage/components/HistoryList.jsx
import React from "react";
import { Card, ListGroup, Badge } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";

const HistoryList = ({ history }) => {
  return (
    <Card className="border-0 shadow-sm rounded-3 overflow-hidden">
      <Card.Header
        className="bg-dark text-white py-2 fw-bold"
        style={{ fontSize: "14px" }}
      >
        Histori Transaksi
      </Card.Header>
      <Card.Body className="p-0">
        {Array.isArray(history) && history.length > 0 ? (
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            <ListGroup variant="flush">
              {history.map((item, idx) => (
                <ListGroup.Item
                  key={idx}
                  className="p-3 border-bottom border-light"
                >
                  <div className="d-flex align-items-center">
                    <div className="bg-light p-2 rounded me-3">
                      <FaCheckCircle className="text-success" size={18} />
                    </div>
                    <div className="flex-grow-1">
                      <div className="fw-bold text-dark small">
                        {item.description}
                      </div>
                      <div className="text-success fw-bold small">
                        Rp{" "}
                        {parseFloat(item.amount || 0).toLocaleString("id-ID")}
                      </div>
                      <div
                        className="text-muted"
                        style={{ fontSize: "10px" }}
                      >
                        {item.createdAt &&
                          new Date(item.createdAt).toLocaleDateString(
                            "id-ID",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                      </div>
                    </div>
                    <Badge bg="success" className="fw-normal">
                      Lunas
                    </Badge>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        ) : (
          <div className="p-4 text-center text-muted small">
            Belum ada transaksi.
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default HistoryList;
