// components/transaksi/NoTransactionState.jsx

import React, { memo } from "react";
import { Card, Button } from "react-bootstrap";
import { FaPlusCircle, FaFileInvoiceDollar } from "react-icons/fa";

/**
 * Komponen yang ditampilkan ketika pengguna belum memiliki riwayat transaksi.
 * Hanya menampilkan tombol Ajukan Pengajuan (Pencairan).
 * * @param {function} onAjukanPencairan - Fungsi yang akan dipanggil saat tombol diklik (berisi logika navigasi).
 */
function NoTransactionState({ onAjukanPencairan }) {
  return (
    <Card className="text-center p-5 border-0 shadow-sm bg-light">
      <FaFileInvoiceDollar size={50} className="text-primary mb-3 mx-auto" />
      <h4 className="text-dark">Anda Belum Memiliki Riwayat Transaksi</h4>
      <p className="text-muted">
        Mulai transaksi pertama Anda dengan mengajukan pencairan dana.
      </p>
      <div className="d-flex justify-content-center mt-4">
        <Button
          variant="primary"
          className="fw-bold"
          onClick={onAjukanPencairan}
        >
          <FaPlusCircle className="me-2" /> Ajukan Pengajuan (Pencairan)
        </Button>
      </div>
    </Card>
  );
}

export default memo(NoTransactionState);
