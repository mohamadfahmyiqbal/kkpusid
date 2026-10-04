import React, { memo } from "react";
import { Card } from "react-bootstrap";

const SaldoInfo = memo(({ user }) => (
  <Card className="mb-3 border-0 shadow-sm">
    <Card.Body>
      <p className="mb-0 text-muted small">
        Anggota ID: {user?.no_anggota ?? "N/A"}
      </p>
      <div className="total-saldo-box d-flex justify-content-between align-items-center p-3 rounded mb-3">
        <div>
          <p className="mb-0 text-white-50 small">Total Saldo</p>
          <h3 className="h4 text-white mb-0">Rp. *********</h3>
        </div>
        <span className="text-white-50">👁️</span>
      </div>
      <p className="small mb-1 text-muted">
        No Anggota: {user?.no_anggota ?? "N/A"}
      </p>
      <p className="small mb-0 text-muted">
        No Rekening Simpanan: #010260000002103
      </p>
    </Card.Body>
  </Card>
));

export default SaldoInfo;
