// src/pages/global/transaction/components/ApprovalSection.jsx
import React from "react";
import ApprovalPlaceholder from "../../../../components/ui/ApprovalPlaceholder";

const ApprovalSection = ({ approvalStatus }) => {
  if (!approvalStatus) return null;

  return (
    <section className="mb-4 pt-3 border-top">
      <h6 className="fw-bold small text-uppercase text-secondary mb-4 text-center">
        Approval
      </h6>
      <div className="d-flex justify-content-around pb-3">
        <ApprovalPlaceholder
          role="Pengawas"
          isApproved={approvalStatus.pengawasDone}
          isRejected={approvalStatus.isRejected}
          isReadyToPay={approvalStatus.isReadyToPay}
        />
        <ApprovalPlaceholder
          role="Ketua"
          isApproved={approvalStatus.ketuaDone}
          isRejected={approvalStatus.isRejected}
          isReadyToPay={approvalStatus.isReadyToPay}
        />
        <ApprovalPlaceholder
          role="Bendahara"
          isApproved={approvalStatus.bendaharaDone}
          isRejected={approvalStatus.isRejected}
          isReadyToPay={approvalStatus.isReadyToPay}
        />
      </div>
    </section>
  );
};

export default React.memo(ApprovalSection);
