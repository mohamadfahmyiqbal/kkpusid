import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  CardTitle,
  Col,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import ApprovalStepper from "../../approval/ApprovalStepper";
import { toast } from "react-toastify";
import UPinjaman from "../../../utils/UPinjaman";

export default function MdlAmpunPinjaman({
  detailData = {},
  handleCloseAmpun,
  feedback,
  user = {},
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  const formatRupiah = (number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(Number(number) || 0);

  const detailFields = useMemo(
    () => [
      { label: "Nama Anggota", value: detailData?.nama },
      { label: "Jenis Pinjaman", value: detailData?.jenispinjaman },
      {
        label: "Jumlah Pinjaman",
        value: formatRupiah(detailData?.jumlahpinjaman),
      },
      { label: "Term", value: detailData?.term },
      { label: "Cicilan", value: formatRupiah(detailData?.cicilan) },
      { label: "Piutang", value: formatRupiah(detailData?.piutang) },
      { label: "Status Cicilan", value: detailData?.statuscicilan },
    ],
    [detailData]
  );

  // Urutan step: Bendahara → Ketua → Pengawas
  const steps = useMemo(() => ["Bendahara", "Ketua", "Pengawas"], []);
  const role = useMemo(() => user?.roles, [user]);

  useEffect(() => {
    const stepMap = {
      null: 0,
      bendahara: 1,
      ketua: 2,
      pengawas: 3,
      rejected: 4,
    };
    setCurrentStep(stepMap[detailData?.statusapproval] ?? 0);
  }, [detailData]);

  const handleAmpun = useCallback(
    async (status = "approved") => {
      if (loading) return;

      setLoading(true);
      const payload = {
        ...detailData,
        pic: user?.nik,
        roles: user?.roles,
        status,
      };

      try {
        const res = await UPinjaman.setPengampunan(payload);
        handleCloseAmpun();
        feedback(res);
      } catch (error) {
        feedback(error);
      } finally {
        setLoading(false);
      }
    },
    [detailData, user, handleCloseAmpun, loading]
  );

  console.log(currentStep, role);

  const renderActionButtons = () => {
    if (currentStep === 0 && role === "3") {
      return (
        <Button
          className="bg-topbar"
          onClick={() => handleAmpun("bendahara")}
          disabled={loading}
        >
          {loading ? "Memproses..." : "Ajukan Pengampunan"}
        </Button>
      );
    }

    if (currentStep === 1 && role === "1") {
      return (
        <>
          <Button
            className="bg-topbar me-2"
            onClick={() => handleAmpun("ketua")}
            disabled={loading}
          >
            {loading ? "Memproses..." : "Setujui"}
          </Button>
          <Button
            className="bg-danger"
            onClick={() => handleAmpun("rejected")}
            disabled={loading}
          >
            {loading ? "Memproses..." : "Tolak"}
          </Button>
        </>
      );
    }

    if (currentStep === 2 && role === "2") {
      return (
        <>
          <Button
            className="bg-topbar me-2"
            onClick={() => handleAmpun("pengawas")}
            disabled={loading}
          >
            {loading ? "Memproses..." : "Setujui"}
          </Button>
          <Button
            className="bg-danger"
            onClick={() => handleAmpun("rejected")}
            disabled={loading}
          >
            {loading ? "Memproses..." : "Tolak"}
          </Button>
        </>
      );
    }

    return null;
  };

  return (
    <>
      <Modal.Body>
        <Card>
          <Card.Body className="p-2">
            <CardTitle className="h6 fw-bold mb-2">Detail Pinjaman</CardTitle>
            <Form noValidate validated={validated}>
              <Row className="border-top pt-2">
                {detailFields.map((field, idx) => (
                  <Col md={6} key={idx} className="mb-2">
                    <Form.Group controlId={`field-${idx}`}>
                      <Form.Label>{field.label}</Form.Label>
                      <Form.Control
                        type="text"
                        value={field.value || "-"}
                        readOnly
                        isValid={!!field.value}
                        isInvalid={!field.value}
                      />
                      <Form.Control.Feedback type="invalid">
                        Data tidak tersedia
                      </Form.Control.Feedback>
                      <Form.Control.Feedback type="valid">
                        Terisi
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                ))}
              </Row>
            </Form>

            <ApprovalStepper currentStep={currentStep} steps={steps} />
          </Card.Body>
        </Card>
      </Modal.Body>

      <Modal.Footer>
        {renderActionButtons()}
        <Button variant="secondary" onClick={handleCloseAmpun}>
          Tutup
        </Button>
      </Modal.Footer>
    </>
  );
}
