import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaCheck, FaTimes, FaClock } from "react-icons/fa";

/**
 * Peta status persetujuan → ikon, warna, dan label yang konsisten.
 * Warna dipilih agar kontras teks/ikon memenuhi WCAG 2.2 AA pada latar
 * tint tipis (status tidak hanya dibedakan oleh warna — ada ikon + label).
 */
const STATUS_MAP = {
  approved: { icon: FaCheck, color: "#157347", bg: "#e7f4ec", label: "Disetujui" },
  rejected: { icon: FaTimes, color: "#b02a37", bg: "#f7e4e6", label: "Ditolak" },
  pending: { icon: FaClock, color: "#a16207", bg: "#fdf3e2", label: "Menunggu" },
};

const resolveStatus = (status) => {
  const key = String(status || "").toLowerCase();
  if (key === "approved") return STATUS_MAP.approved;
  if (key === "rejected") return STATUS_MAP.rejected;
  return STATUS_MAP.pending;
};

export default function ApprovalInfoSection({
  requestApprovals,
  allApproved,
  onNext,
}) {
  return (
    <section className="border-bottom mb-2 pb-2">
      <h5 className="fw-bold border-bottom pb-2">Approval Info</h5>
      <Container>
        <Row className="text-center justify-content-center g-3">
          {requestApprovals?.map((app, index) => {
            const { icon: Icon, color, bg, label } = resolveStatus(app?.status);
            return (
              <Col xs={6} md={6} lg={3} className="mb-2" key={app?.id || index}>
                <div className="d-flex flex-column align-items-center justify-content-center h-100 gap-2">
                  {/* Ikon status dalam lingkaran tint (ukuran ikon konsisten) */}
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle shadow-sm"
                    style={{
                      width: "72px",
                      height: "72px",
                      backgroundColor: bg,
                      color,
                      border: `1px solid ${color}33`,
                    }}
                    role="img"
                    aria-label={`Status persetujuan: ${label}`}
                  >
                    <Icon size={30} />
                  </div>

                  {/* Nama Approver */}
                  <div
                    className="fw-semibold text-center text-truncate"
                    style={{ maxWidth: "120px", lineHeight: "1.2" }}
                  >
                    {app?.approverAnggota?.nama || "-"}
                  </div>

                  {/* Status: pill dengan ikon + label (bukan warna saja) */}
                  <span
                    className="badge rounded-pill fw-semibold d-inline-flex align-items-center gap-1 px-3 py-1"
                    style={{
                      fontSize: "11px",
                      letterSpacing: "0.3px",
                      backgroundColor: bg,
                      color,
                    }}
                  >
                    <Icon size={10} />
                    {label}
                  </span>
                </div>
              </Col>
            );
          })}
        </Row>
        <Row className="border-top pt-2">
          {allApproved && (
            <Col xs={12} className="mt-2">
              <Button
                className="bg-blue700 w-100 text-white"
                onClick={onNext}
              >
                Selanjutnya
              </Button>
            </Col>
          )}
        </Row>
      </Container>
    </section>
  );
}
