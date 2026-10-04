import { useCallback } from "react";
import useSocketListener from "../../../../utils/helper/SocketListener";

const useRegistrationSocket = (registration_id, setData) => {
  const handlePayload = useCallback((payload) => {





    if (
      String(payload.entityId).toLowerCase() === String(registration_id).toLowerCase() &&
      (payload.entityRef === "member_registration" ||
        payload.entityRef === "members")
    ) {

      setData((prev) => {

        const newState = {
          ...prev,
          final_status: payload.status || prev.final_status,
          is_approved_pengawas:
            payload.is_approved_pengawas !== undefined
              ? payload.is_approved_pengawas
              : prev.is_approved_pengawas,
          is_approved_ketua:
            payload.is_approved_ketua !== undefined
              ? payload.is_approved_ketua
              : prev.is_approved_ketua,
          bill_id: payload.billId || payload.bill_id || prev.bill_id,
          current_step_id: payload.current_step_id || prev.current_step_id,
          // Tambahkan field lain yang mungkin diperlukan
          member: {
            ...prev.member,
            status: payload.status
              ? {
                  ...prev.member?.status,
                  status_name:
                    payload.status === "APPROVED"
                      ? "APPROVED"
                      : prev.member?.status?.status_name,
                }
              : prev.member?.status,
          },
          approvals: payload.approval_step_id ? [
             ...(prev.approvals || []).filter(a => a.approval_step_id !== payload.approval_step_id),
             {
                 approval_step_id: payload.approval_step_id,
                 note: payload.note,
                 step: { step_order: payload.step_order, verifierRole: { role_name: payload.role_name } }
             }
          ] : prev.approvals,
        };

        return newState;
      });
    }
  }, [registration_id, setData]);

  useSocketListener(handlePayload);
};

export default useRegistrationSocket;
