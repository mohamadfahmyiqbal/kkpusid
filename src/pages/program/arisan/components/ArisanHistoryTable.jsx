import React from "react";
import PropTypes from "prop-types";
import { Table, Button } from "react-bootstrap";
import { MdTrackChanges, MdVisibility } from "react-icons/md";

export default function ArisanHistoryTable({ historyArisan, onDetailClick }) {
  if (!historyArisan) return null;

  return (
    <div className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 className="fw-bold text-dark mb-1 font-outfit">
            <MdTrackChanges className="me-2 text-primary" size={22} />
            Riwayat Arisan
          </h5>
          <p className="text-muted small mb-0">
            Riwayat keikutsertaan arisan Anda yang telah lunas
          </p>
        </div>
      </div>
      <div className="table-responsive">
        <Table
          hover
          className="align-middle bg-white rounded-3 overflow-hidden shadow-sm text-sm"
        >
          <thead className="bg-light">
            <tr>
              <th>Nama Program</th>
              <th>No. Peserta / Akad</th>
              <th>Tanggal Buka</th>
              <th>Total Saldo</th>
              <th>Status</th>
              <th className="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="fw-medium">
                {historyArisan.program_name} ({historyArisan.batch_name})
              </td>
              <td>No. Peserta: {historyArisan.participant_no || "-"}</td>
              <td>
                {historyArisan.created_at
                  ? new Date(historyArisan.created_at).toLocaleDateString(
                      "id-ID",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )
                  : "-"}
              </td>
              <td className="fw-bold text-success">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(historyArisan.current_balance || 0)}
              </td>
              <td>
                <span className="badge bg-secondary">Closed</span>
              </td>
              <td className="text-center">
                <Button
                  variant="light"
                  size="sm"
                  onClick={onDetailClick}
                  className="text-primary border-0 rounded-circle p-2 shadow-sm"
                  title="Lihat Detail"
                >
                  <MdVisibility size={18} />
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}

ArisanHistoryTable.propTypes = {
  historyArisan: PropTypes.shape({
    program_name: PropTypes.string,
    batch_name: PropTypes.string,
    participant_no: PropTypes.string,
    created_at: PropTypes.string,
    current_balance: PropTypes.number,
  }),
  onDetailClick: PropTypes.func.isRequired,
};
