import React from 'react';
import { FaLock } from 'react-icons/fa';
import Alert from "../../../components/ui/SwalAlert";
;


const RoleBasedContent = ({ isFullMember, isCandidate, children }) => {
  if (isFullMember) {
    return <div className="dash-slide-up mb-4">{children}</div>;
  }

  if (!isCandidate) {
    return (
      <Alert
        variant="warning"
        className="border-0 shadow-sm mb-4"
        aria-live="polite"
      >
        <FaLock className="me-2" />
        Fitur operasional akan terbuka otomatis setelah status keanggotaan
        aktif.
      </Alert>
    );
  }

  return null;
};

export default React.memo(RoleBasedContent);
