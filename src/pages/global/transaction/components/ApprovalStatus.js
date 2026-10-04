// src/pages/transaction/components/ApprovalStatus.js
const ApprovalStatus = (detail) => {
  if (!detail)
    return {
      pengawasDone: false,
      ketuaDone: false,
      bendaharaDone: false,
      isRejected: false,
    };

  const approvals = detail.approvals || [];
  const isRejected =
    approvals.some((a) => a.decision === "REJECTED") ||
    detail.status === "REJECTED";
  const pengawasDone = approvals.some(
    (a) => a.role_name === "Pengawas" && a.decision === "APPROVED"
  );
  const ketuaDone = approvals.some(
    (a) => a.role_name === "Ketua" && a.decision === "APPROVED"
  );
  const bendaharaDone = approvals.some(
    (a) => a.role_name === "Bendahara" && a.decision === "APPROVED"
  );

  return { pengawasDone, ketuaDone, bendaharaDone, isRejected };
};

export default ApprovalStatus;
