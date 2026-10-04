import React from "react";
import { Card } from "react-bootstrap";
import { FaWallet } from "react-icons/fa";

const SetoranAccountSummary = ({ productConfig, accountData, formatCurrency }) => {
  return (
    <Card className="border-0 shadow-sm rounded-4 overflow-hidden mb-4">
      <div
        className="p-4 text-white d-flex flex-column flex-md-row align-items-md-center justify-content-between position-relative"
        style={{ background: productConfig.gradient }}
      >
        <div
          className="position-absolute top-0 end-0 h-100 w-50"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.1))",
          }}
        />

        <div
          className="d-flex align-items-center gap-3 mb-3 mb-md-0 position-relative"
          style={{ zIndex: 1 }}
        >
          <div className="bg-white bg-opacity-25 p-3 rounded-circle backdrop-blur">
            {productConfig.icon}
          </div>
          <div>
            <h4 className="fw-bold mb-1 text-white">{productConfig.label}</h4>
            <div
              className="d-flex align-items-center gap-2 text-white-50 bg-black bg-opacity-25 px-2 py-1 rounded-pill"
              style={{ width: "max-content" }}
            >
              <FaWallet size={12} />
              <small className="fw-medium">{accountData?.accountNumber}</small>
            </div>
          </div>
        </div>

        <div
          className="text-md-end bg-white bg-opacity-10 p-3 rounded-4 backdrop-blur position-relative"
          style={{ zIndex: 1 }}
        >
          <p className="text-white-50 mb-1 small fw-medium">Saldo Saat Ini</p>
          <h3 className="fw-bold mb-0 text-white">
            Rp {formatCurrency(accountData?.currentBalance)}
          </h3>
        </div>
      </div>
    </Card>
  );
};

export default SetoranAccountSummary;
