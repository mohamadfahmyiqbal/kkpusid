import { useEffect, useState, useCallback, useMemo } from "react";
import { Button, Form, Row, Col, Modal } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import UPinjaman from "../../../utils/UPinjaman";

const formatRupiah = (number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number || 0);

export default function MdlUpdMasterPinjaman({
  user,
  show,
  onHide,
  detailData,
  onSave,
}) {
  const [saldoAwal, setSaldoAwal] = useState(0);
  const [formData, setFormData] = useState({
    nama: "",
    nik: "",
    akun: "",
    jumlah: 0,
    saldo: 0,
    keterangan: "",
  });

  const isEdit = useMemo(() => !!detailData, [detailData]);

  // Ambil saldo user saat modal dibuka
  const fetchSaldo = useCallback(async () => {
    if (!user?.nik) return;
    try {
      const res = await UPinjaman.getSaldoMasterPinjaman({ nik: user.nik });
      console.log(res.data.saldo);

      setSaldoAwal(res.data?.saldo || 0);
    } catch (error) {
      console.error("Gagal mengambil saldo:", error);
    }
  }, [user?.nik]);

  useEffect(() => {
    fetchSaldo();
  }, [fetchSaldo]);

  // Set form data saat edit atau tambah
  useEffect(() => {
    const jumlah = isEdit ? detailData?.jumlah || 0 : 0;

    setFormData({
      id: detailData?.id || "",
      nama: isEdit ? detailData.nama : user?.nama || "",
      nik: isEdit ? detailData.nik : user?.nik || "",
      akun: isEdit ? detailData.akun : user?.akun || "",
      jumlah,
      saldo: jumlah,
      keterangan: isEdit ? detailData?.keterangan || "" : "",
    });
  }, [detailData, saldoAwal, user, isEdit, show]);

  // Update saldo otomatis jika jumlah berubah
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      saldo: Number(prev.jumlah || 0) + saldoAwal,
    }));
  }, [formData.jumlah, saldoAwal]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave(formData);
    }
    if (onHide) onHide();
  };

  return (
    <>
      <Modal.Header closeButton className="bg-topbar">
        <Modal.Title className="text-white">
          {isEdit ? "Edit" : "Tambah"} Data Pinjaman
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formNama">
                <Form.Label>Nama</Form.Label>
                <Form.Control type="text" value={formData.nama} readOnly />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formNIK">
                <Form.Label>NIK</Form.Label>
                <Form.Control type="text" value={formData.nik} readOnly />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formAkun">
                <Form.Label>Akun</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.akun}
                  onChange={(e) => handleChange("akun", e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formJumlah">
                <Form.Label>Jumlah</Form.Label>
                <NumericFormat
                  className="form-control"
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix="Rp "
                  allowNegative={false}
                  value={formData.jumlah}
                  onValueChange={({ value }) =>
                    handleChange("jumlah", Number(value || 0))
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formSaldo">
                <Form.Label>Saldo (otomatis)</Form.Label>
                <Form.Control
                  type="text"
                  value={formatRupiah(formData.saldo)}
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="formKeterangan">
            <Form.Label>Keterangan</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formData.keterangan}
              onChange={(e) => handleChange("keterangan", e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" type="submit" onClick={handleSubmit}>
          Simpan
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Tutup
        </Button>
      </Modal.Footer>
    </>
  );
}
