import { useMemo } from "react";

const useApprovalStatus = (
  is_approved_pengawas,
  is_approved_ketua,
  bill_id,
  current_step_id,
  final_status,
) => {
  return useMemo(() => {
    const status = final_status?.toUpperCase() || "";
    const isRejected = status === "REJECTED" || status === "DITOLAK";

    // Pengawas selesai jika sudah approve ATAU workflow sudah mencapai status akhir
    const pengawasDone =
      is_approved_pengawas == true ||
      status === "APPROVED" ||
      status === "WAITING_PAYMENT";

    // Ketua selesai jika sudah approve ATAU workflow sudah mencapai status akhir
    const ketuaDone =
      is_approved_ketua == true ||
      status === "APPROVED" ||
      status === "WAITING_PAYMENT";

    // Siap bayar jika kedua pihak setuju ATAU status sudah masuk fase bayar
    const readyForInvoice =
      (pengawasDone && ketuaDone && !isRejected) ||
      status === "APPROVED" ||
      status === "WAITING_PAYMENT";

    let pengawasRejected = false;
    let ketuaRejected = false;

    if (isRejected) {
      if (!pengawasDone) {
        pengawasRejected = true;
      } else {
        ketuaRejected = true;
      }
    }

    return { pengawasDone, ketuaDone, pengawasRejected, ketuaRejected, isRejected, readyForInvoice };
  }, [is_approved_pengawas, is_approved_ketua, current_step_id, final_status]);
};

export default useApprovalStatus;
