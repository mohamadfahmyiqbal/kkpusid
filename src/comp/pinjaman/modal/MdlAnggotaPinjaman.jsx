import {
  Badge,
  Button,
  Card,
  CardHeader,
  Col,
  Image,
  Modal,
  Row,
} from "react-bootstrap";
import moment from "moment";
import { useMachine } from "@xstate/react";
import { approvalMachine } from "../../approval/approvalMachine";

export default function MdlAnggotaPinjaman({ detailData }) {
  // Hooks HARUS dipanggil paling awal!
  const [state, send] = useMachine(approvalMachine);

  const currentRole = "bendahara";

  // Baru setelah itu boleh cek null-nya
  if (!detailData) {
    return (
      <Modal.Body>
        <div className="text-center text-muted py-5">Data belum tersedia.</div>
      </Modal.Body>
    );
  }

  const {
    nama,
    jenispinjaman,
    jumlahpinjaman,
    term,
    cicilan,
    TanggalDaftar,
    metodepembayaran = "Transfer Bank",
    norek = "1234567890",
    bank = "Bank Syariah Mandiri",
    fotoKTP,
    evidence,
  } = detailData;

  const approvalMap = {
    pengawas: "waiting_pengawas",
    ketua: "waiting_ketua",
    bendahara: "waiting_bendahara",
  };

  const isApproved = (role) => {
    return (
      (role === "pengawas" && !state.matches("waiting_pengawas")) ||
      (role === "ketua" && state.matches("waiting_bendahara")) ||
      state.matches("approved") ||
      (role === "bendahara" && state.matches("approved"))
    );
  };

  const getStatusBadge = (role) => {
    if (isApproved(role)) {
      return (
        <Badge bg="success" className="rounded-pill mt-2 w-100 text-center p-2">
          Approved
        </Badge>
      );
    }

    if (state.matches(approvalMap[role])) {
      return (
        <Badge className="bg-yellow-grad rounded-pill mt-2 w-100 text-center p-2">
          Waiting Approval
        </Badge>
      );
    }

    return (
      <Badge bg="secondary" className="rounded-pill mt-2 w-100 text-center p-2">
        Not Yet
      </Badge>
    );
  };

  const renderApprovalActions = () => {
    if (!state.matches(approvalMap[currentRole])) {
      return null;
    }

    return (
      <div className="d-flex gap-2 mt-4">
        <Button
          variant="success"
          className="rounded-pill text-white flex-fill"
          onClick={() => send(`APPROVE_${currentRole.toUpperCase()}`)}
        >
          Setujui
        </Button>
        <Button
          variant="danger"
          className="rounded-pill text-white flex-fill"
          onClick={() => send("REJECT")}
        >
          Tolak
        </Button>
      </div>
    );
  };

  const renderField = (label, value, col = 6) => (
    <Col md={col}>
      <h6 className="fw-semibold text-dark">{label}</h6>
      <div className="py-2 text-dark">{value || "-"}</div>
    </Col>
  );

  const formatRupiah = (number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number || 0);
  return (
    <Modal.Body>
      {/* Informasi Registrasi */}
      <Card className="mb-4 border-top border-bottom border-dark">
        <Card.Body className="p-2">
          <Card.Title className="h5 fw-bold text-dark">
            Informasi Registrasi
          </Card.Title>
        </Card.Body>
      </Card>

      <Row className="g-4">
        {renderField(
          "Tanggal Pengajuan",
          moment(TanggalDaftar).utc().format("DD-MM-YYYY HH:mm")
        )}
        {renderField("Nama", nama)}
        {renderField("Jenis Pinjaman", jenispinjaman)}
        {renderField("Jumlah Pinjaman", formatRupiah(jumlahpinjaman))}

        {renderField("Jumlah Term", term)}
        {renderField("Cicilan", formatRupiah(cicilan))}
        {renderField("Metode Pembayaran", metodepembayaran)}
        {renderField("No Rekening", norek)}
        {renderField("Bank", bank, 12)}

        <Col md={6}>
          <h6 className="fw-semibold text-dark">Foto KTP</h6>
          <Image
            src={fotoKTP || "https://placehold.co/370x250"}
            rounded
            className="w-100"
          />
        </Col>

        <Col md={6}>
          <h6 className="fw-semibold text-dark">Evidence</h6>
          <Image
            src={evidence || "https://placehold.co/370x250"}
            rounded
            className="w-100"
          />
        </Col>

        <Col md={6}>
          <h6 className="fw-semibold text-dark">S&K</h6>
          <Button variant="success" className="rounded-pill text-white w-100">
            Setuju
          </Button>
        </Col>

        <Col md={6}>
          <h6 className="fw-semibold text-dark">Akad</h6>
          <Button variant="success" className="rounded-pill text-white w-100">
            Setuju
          </Button>
        </Col>
      </Row>

      {/* Approval Info */}
      <Card className="mt-4">
        <CardHeader className="border-top border-bottom border-dark">
          <Card.Title className="h5 fw-bold text-dark">
            Approval Info
          </Card.Title>
        </CardHeader>
        <Card.Body className="p-0">
          <Row className="g-4 mt-0">
            {["pengawas", "ketua", "bendahara"].map((role, idx) => (
              <Col md={4} key={role}>
                <h6 className="fw-semibold text-dark">
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </h6>
                <div className="text-dark">User {idx + 1}</div>
                <div className="text-dark">01-01-2025 05:0{idx}</div>
                {getStatusBadge(role)}
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>

      {renderApprovalActions()}
    </Modal.Body>
  );
}
