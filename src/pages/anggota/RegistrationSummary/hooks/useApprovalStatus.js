import { useMemo } from "react";

const useApprovalStatus = (
  is_approved_pengawas,
  is_approved_ketua,
  bill_id,
  current_step_id,
  final_status,
) => {
  return useMemo(() => {
    // Pengawas selesai jika sudah approve ATAU workflow sudah mencapai status akhir
    const pengawasDone =
      is_approved_pengawas == true ||
      final_status === "APPROVED" ||
      final_status === "WAITING_PAYMENT";

    // Ketua selesai jika sudah approve ATAU workflow sudah mencapai status akhir
    const ketuaDone =
      is_approved_ketua == true ||
      final_status === "APPROVED" ||
      final_status === "WAITING_PAYMENT";

    // Debug logging
    console.log("🔍 Approval Status Debug:", {
      current_step_id,
      is_approved_pengawas,
      is_approved_ketua,
      final_status,
      pengawasDone,
      ketuaDone,
    });

    // Siap bayar jika kedua pihak setuju ATAU status sudah masuk fase bayar
    const readyForInvoice =
      (pengawasDone && ketuaDone) ||
      final_status === "APPROVED" ||
      final_status === "WAITING_PAYMENT";

    return { pengawasDone, ketuaDone, readyForInvoice };
  }, [is_approved_pengawas, is_approved_ketua, current_step_id, final_status]);
};

export default useApprovalStatus;
