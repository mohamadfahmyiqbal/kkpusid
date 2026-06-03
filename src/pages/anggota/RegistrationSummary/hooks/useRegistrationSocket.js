import useSocketListener from "../../../../utils/helper/SocketListener";

const useRegistrationSocket = (registration_id, setData) => {
  console.log("🔌 Setting up registration socket for ID:", registration_id);

  useSocketListener((payload) => {
    console.log("🔌 Socket payload received:", payload);
    console.log("🔌 Expected registration_id:", registration_id);
    console.log("🔌 Payload entityId:", payload.entityId);
    console.log("🔌 Payload entityRef:", payload.entityRef);

    if (
      payload.entityId === String(registration_id) &&
      (payload.entityRef === "member_registration" ||
        payload.entityRef === "members")
    ) {
      console.log("✅ Update Real-time diterima:", payload);
      setData((prev) => {
        console.log("🔄 Previous state:", prev);
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
        };
        console.log("🔄 New state:", newState);
        return newState;
      });
    } else {
      console.log("❌ Payload doesn't match expected criteria");
    }
  });
};

export default useRegistrationSocket;
