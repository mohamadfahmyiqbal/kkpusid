// src/pages/global/transaction/components/ApprovalSection.jsx
import React from "react";
import ApprovalPlaceholder from "../../../../components/ui/ApprovalPlaceholder";

const ApprovalSection = ({ approvalStatus, detail }) => {
  if (!approvalStatus) return null;

  const getApprovalData = (roleName) => {
    if (!detail?.approvalChain) return null;
    return detail.approvalChain.find(
      (a) => a.role?.toUpperCase() === roleName.toUpperCase()
    );
  };

  const pengawasData = getApprovalData("PENGAWAS");
  const ketuaData = getApprovalData("KETUA");
  const bendaharaData = getApprovalData("BENDAHARA");

  return (
    <section className="mt-5 p-4 rounded-4 bg-light bg-opacity-50 border border-light-subtle shadow-sm">
      <div className="text-center mb-4">
        <h6 className="fw-bold small text-uppercase text-secondary tracking-wider mb-1" style={{ fontSize: '11px', letterSpacing: '2px' }}>
          Alur Persetujuan
        </h6>
        <div className="mx-auto" style={{ width: '30px', height: '2px', background: '#cbd5e1' }}></div>
      </div>
      
      <div className="position-relative">
        {/* Connector Line */}
        <div 
          className="position-absolute d-none d-md-block" 
          style={{ 
            top: '32px', 
            left: '15%', 
            right: '15%', 
            height: '2px', 
            background: 'linear-gradient(90deg, #e2e8f0 0%, #e2e8f0 100%)',
            zIndex: 0 
          }} 
        />
        
        <div className="d-flex justify-content-between align-items-start position-relative" style={{ zIndex: 1 }}>
          <ApprovalPlaceholder
            role="Pengawas"
            isApproved={approvalStatus.isApproved || approvalStatus.pengawasDone}
            isRejected={approvalStatus.pengawasRejected || (approvalStatus.isRejected && !approvalStatus.pengawasDone && !approvalStatus.ketuaDone && !approvalStatus.bendaharaDone)}
            isReadyToPay={approvalStatus.isReadyToPay}
            note={pengawasData?.note}
            approverName={pengawasData?.approverName}
          />
          <ApprovalPlaceholder
            role="Ketua"
            isApproved={approvalStatus.isApproved || approvalStatus.ketuaDone}
            isRejected={approvalStatus.ketuaRejected || (approvalStatus.isRejected && approvalStatus.pengawasDone && !approvalStatus.ketuaDone)}
            isReadyToPay={approvalStatus.isReadyToPay}
            note={ketuaData?.note}
            approverName={ketuaData?.approverName}
          />
          <ApprovalPlaceholder
            role="Bendahara"
            isApproved={approvalStatus.isApproved || approvalStatus.bendaharaDone}
            isRejected={approvalStatus.bendaharaRejected || (approvalStatus.isRejected && approvalStatus.pengawasDone && approvalStatus.ketuaDone && !approvalStatus.bendaharaDone)}
            isReadyToPay={approvalStatus.isReadyToPay}
            note={bendaharaData?.note}
            approverName={bendaharaData?.approverName}
          />
        </div>
      </div>
    </section>
  );
};

export default React.memo(ApprovalSection);
