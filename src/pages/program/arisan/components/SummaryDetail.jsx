import React from "react";
import Card from "../../../components/ui/Card";
import {
  FaCheck,
  FaInfoCircle,
  FaLayerGroup,
  FaCalendarAlt,
  FaUsers,
  FaMoneyBillWave,
} from "react-icons/fa";

const SummaryDetail = React.memo(({ summaryData }) => {
  const getIcon = (key) => {
    if (key.includes("Kategori")) return <FaInfoCircle className="text-white opacity-75" size={14} />;
    if (key.includes("Target")) return <FaMoneyBillWave className="text-white opacity-75" size={14} />;
    if (key.includes("Setoran")) return <FaCheck className="text-white opacity-75" size={14} />;
    if (key.includes("Peserta")) return <FaUsers className="text-white opacity-75" size={14} />;
    if (key.includes("Durasi")) return <FaCalendarAlt className="text-white opacity-75" size={14} />;
    return <FaLayerGroup className="text-white opacity-75" size={14} />;
  };

  return (
    <Card
      className="overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
        border: "none",
      }}
    >
      <div
        className="d-flex justify-content-between align-items-center p-4"
        style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.2)" }}
      >
        <h5 className="fw-bold mb-0 font-outfit text-white">Ringkasan Arisan</h5>
        <div
          className="summary-badge-premium text-white"
          style={{ background: "rgba(255, 255, 255, 0.2)" }}
        >
          Detail Grup
        </div>
      </div>
      <div className="p-4">
        <div className="summary-grid">
          {Object.entries(summaryData).map(([key, value]) => {
            const isTarget = key.includes("Target");
            const isContribution = key.includes("Setoran");
            return (
              <div
                className="summary-item"
                key={key}
                style={{ borderBottom: "1px dashed rgba(255, 255, 255, 0.2)" }}
              >
                <div className="d-flex align-items-center gap-2">
                  {getIcon(key)}
                  <span className="small fw-bold text-white opacity-75">{key}</span>
                </div>
                <span
                  className={`fw-bold text-white ${
                    isTarget || isContribution ? "large-amount-display" : ""
                  }`}
                  style={{ color: "white" }}
                >
                  {value}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
});

export default SummaryDetail;
