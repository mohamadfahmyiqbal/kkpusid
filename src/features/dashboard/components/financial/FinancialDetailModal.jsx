// fe/src/features/dashboard/components/financial/FinancialDetailModal.jsx

import React from "react";
import { Modal, Button, Table } from "react-bootstrap";

const FinancialDetailModal = ({ show, onHide, details, formatCurrency }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Rekap Simpanan & Tabungan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {details && details.length > 0 ? (
          <Table responsive hover>
            <thead>
              <tr>
                <th>Jenis</th>
                <th className="text-end">Saldo</th>
              </tr>
            </thead>
            <tbody>
              {details.map((detail, index) => (
                <tr key={index}>
                  <td>{detail.name}</td>
                  <td className="text-end fw-semibold text-primary">
                    {formatCurrency(detail.balance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div className="text-center text-muted py-4">Belum ada data simpanan.</div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Tutup
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FinancialDetailModal;
