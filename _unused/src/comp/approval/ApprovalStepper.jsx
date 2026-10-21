import { Container, Row, Col } from "react-bootstrap";
import { FaHourglassHalf, FaCheck, FaTimes, FaQuestion } from "react-icons/fa";
import { useMemo } from "react";

export default function ApprovalStepper({ approvalData = [] }) {
  /** =====================================================
   *  AUTO FLOW: Pengawas → Ketua
   ====================================================== */
  const steps =
    approvalData.length === 1 ? ["Pengawas"] : ["Pengawas", "Ketua"];

  /** =====================================================
   *  HITUNG CURRENT STEP
   ====================================================== */
  const currentStep = useMemo(() => {
    if (!Array.isArray(approvalData)) return 0;

    // Jika ada yang rejected
    const isRejected = approvalData.some(
      (a) => a?.status?.toLowerCase() === "rejected"
    );
    if (isRejected) return "rejected";

    // Temukan step aktif berdasarkan approved
    let approvedCount = 0;
    approvalData.forEach((a) => {
      if (a?.status?.toLowerCase() === "approved") {
        approvedCount++;
      }
    });

    return approvedCount; // 0 = pengawas aktif, 1 = ketua aktif
  }, [approvalData]);

  /** =====================================================
   *  STYLE CONFIG
   ====================================================== */
  const STEP_STATUS_STYLE = {
    completed: {
      bg: "#0d6efd",
      color: "#fff",
      label: "#0d6efd",
      icon: <FaCheck />,
    },
    active: {
      bg: "#ffc107",
      color: "#212529",
      label: "#ffc107",
      icon: <FaHourglassHalf />,
    },
    pending: {
      bg: "#dee2e6",
      color: "#6c757d",
      label: "#6c757d",
      icon: <FaQuestion />,
    },
    rejected: {
      bg: "#dc3545",
      color: "#fff",
      label: "#dc3545",
      icon: <FaTimes />,
    },
  };

  /** =====================================================
   *  STEP STATUS LOGIC
   ====================================================== */
  const getStatus = (index) => {
    if (currentStep === "rejected") return "rejected";
    if (index < currentStep) return "completed";
    if (index === currentStep) return "active";
    return "pending";
  };

  /** =====================================================
   *  MEMOIZED STEP ITEMS
   ====================================================== */
  const stepItems = useMemo(() => {
    return steps.map((label, index) => {
      const status = getStatus(index);
      const style = STEP_STATUS_STYLE[status];

      return (
        <div
          key={index}
          style={{
            flex: 1,
            textAlign: "center",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Circle */}
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: style.bg,
              color: style.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: 18,
              zIndex: 2,
            }}
          >
            {style.icon}
          </div>

          {/* Label */}
          <div
            style={{
              marginTop: 8,
              fontSize: 12,
              maxWidth: 90,
              color: style.label,
            }}
          >
            {label}
          </div>
        </div>
      );
    });
  }, [steps, currentStep]);

  /** =====================================================
   *  PROGRESS WIDTH
   ====================================================== */
  const progressWidth =
    currentStep !== "rejected"
      ? `${(currentStep / (steps.length - 1)) * 100}%`
      : "0%";

  return (
    <div className="mt-4">
      <h6 className="border-bottom fw-bold mb-3">Progress Approval</h6>

      <Container className="d-flex justify-content-center mt-4">
        <Row className="w-100">
          <Col xs={12} md={10} lg={8} className="mx-auto">
            <div
              style={{
                position: "relative",
                padding: "20px 0",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {/* Background Line */}
              <div
                style={{
                  position: "absolute",
                  top: 20,
                  left: 0,
                  right: 0,
                  height: 4,
                  backgroundColor: "#dee2e6",
                  zIndex: 0,
                }}
              />

              {/* Progress Line */}
              {currentStep !== "rejected" && (
                <div
                  style={{
                    position: "absolute",
                    top: 20,
                    left: 0,
                    width: progressWidth,
                    height: 4,
                    backgroundColor: "#0d6efd",
                    zIndex: 1,
                    transition: "width 0.3s ease",
                  }}
                />
              )}

              {/* Steps */}
              {stepItems}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
