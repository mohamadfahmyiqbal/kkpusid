import React from "react";
import { Button } from "react-bootstrap";
import { FaClock } from "react-icons/fa";
import Alert from "../../../../components/ui/SwalAlert";

export default function OtpVerificationFormActions({
  loading,
  isBlocked,
  otpCode,
  resendLoading,
  onResendOtp,
  blockTime,
  formatBlockTime,
  loginPath,
}) {
  return (
    <>
      <Button
        type="submit"
        disabled={
          loading ||
          isBlocked ||
          otpCode.replace(/\s/g, "").length !== 6
        }
        className="pbs-submit-v2"
      >
        {loading ? "Memverifikasi..." : "Verifikasi Kode"}
      </Button>

      <div className="text-center mt-3">
        <p className="mb-2 small">
          Tidak menerima kode?
          <button
            type="button"
            onClick={onResendOtp}
            disabled={resendLoading}
            className="btn btn-link p-0 text-decoration-none fw-bold ms-1"
          >
            {resendLoading ? "Mengirim..." : "Kirim Ulang"}
          </button>
        </p>

        {isBlocked && (
          <Alert variant="warning" className="mt-2">
            <FaClock className="me-2" />
            Terlalu banyak percobaan. Coba lagi dalam{" "}
            {formatBlockTime(blockTime)}.
          </Alert>
        )}

        <p className="mb-0">
          <a href={loginPath} className="text-decoration-none">
            Batal dan Kembali ke Login
          </a>
        </p>
      </div>
    </>
  );
}
