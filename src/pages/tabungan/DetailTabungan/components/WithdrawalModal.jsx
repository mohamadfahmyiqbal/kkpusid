import React from "react";
import { Modal, Form, Button, Spinner } from "react-bootstrap";
import Alert from "../../../components/ui/SwalAlert";
import { formatCurrency } from "./tabunganHelpers";

export default function WithdrawalModal({
  show,
  onHide,
  currentBalance,
  withdrawData,
  onChange,
  onSubmit,
  isSubmitting,
}) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Form Pencairan Tabungan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="info" className="mb-3">
            Anda akan mencairkan seluruh saldo terkumpul sebesar{" "}
            <strong>Rp {formatCurrency(currentBalance || 0)}</strong>.
          </Alert>
          <Form.Group className="mb-3">
            <Form.Label>Metode Pencairan</Form.Label>
            <Form.Select
              value={withdrawData.method}
              onChange={(e) =>
                onChange({ ...withdrawData, method: e.target.value })
              }
            >
              <option value="TRANSFER">Transfer Bank</option>
              <option value="TUNAI">Ambil Tunai</option>
              <option value="SIMPANAN">
                Pindahkan ke Saldo Simpanan Koperasi
              </option>
            </Form.Select>
          </Form.Group>

          {withdrawData.method === "TRANSFER" && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Nama Bank</Form.Label>
                <Form.Control
                  required
                  placeholder="Contoh: BCA, BSI, Mandiri"
                  value={withdrawData.bank_name}
                  onChange={(e) =>
                    onChange({ ...withdrawData, bank_name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>No Rekening</Form.Label>
                <Form.Control
                  required
                  placeholder="Nomor rekening tujuan"
                  value={withdrawData.bank_account_no}
                  onChange={(e) =>
                    onChange({
                      ...withdrawData,
                      bank_account_no: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </>
          )}

          {withdrawData.method === "SIMPANAN" && (
            <Alert variant="info" className="mb-3">
              Dana pencairan akan dipindahkan ke saldo Simpanan Koperasi Anda
              dan bisa dicairkan kapan saja melalui menu Tarik Tunai.
            </Alert>
          )}

          {withdrawData.method === "TUNAI" && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Nama Pengambil</Form.Label>
                <Form.Control
                  required
                  value={withdrawData.cash_name}
                  onChange={(e) =>
                    onChange({ ...withdrawData, cash_name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Lokasi Pengambilan</Form.Label>
                <Form.Control
                  required
                  placeholder="Contoh: Kantor Cabang Utama"
                  value={withdrawData.cash_location}
                  onChange={(e) =>
                    onChange({
                      ...withdrawData,
                      cash_location: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Waktu Pengambilan</Form.Label>
                <Form.Control
                  type="date"
                  required
                  value={withdrawData.cash_time}
                  onChange={(e) =>
                    onChange({ ...withdrawData, cash_time: e.target.value })
                  }
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={onHide}
            disabled={isSubmitting}
          >
            Batal
          </Button>
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <Spinner size="sm" animation="border" />
            ) : (
              "Ajukan Pencairan"
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
