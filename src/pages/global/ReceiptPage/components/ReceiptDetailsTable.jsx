import React from "react";
import { Table } from "react-bootstrap";
import { formatCurrency } from "./receiptHelpers";

export default function ReceiptDetailsTable({ receiptData, isWithdrawal, isPendanaanSyariah }) {
  return (
    <div className="table-responsive-custom mb-5">
      <Table borderless className="align-middle mb-0">
        <thead>
          <tr className="border-bottom border-2 border-light">
            <th
              className="py-3 px-2 text-muted small text-uppercase fw-bold ls-1"
              style={{ width: "60%" }}
            >
              DESKRIPSI ITEM
            </th>
            <th className="py-3 px-2 text-end text-muted small text-uppercase fw-bold ls-1">
              KETERANGAN
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-bottom border-light">
            <td className="py-4 px-2">
              <div className="fw-bold text-dark">
                {isPendanaanSyariah
                  ? "Target Dana yang Dibutuhkan"
                  : `Jumlah ${isWithdrawal ? "Penarikan" : "Pinjaman"}`}
              </div>
              <small className="text-muted">Nominal transaksi yang diajukan</small>
            </td>
            <td className="py-4 px-2 text-end">
              <span className="fw-bold text-dark h5 mb-0">
                {formatCurrency(
                  isWithdrawal ? receiptData.amount : receiptData.amount_requested
                )}
              </span>
            </td>
          </tr>

          {isPendanaanSyariah && (
            <>
              <tr className="border-bottom border-light">
                <td className="py-4 px-2">
                  <div className="fw-bold text-dark">Nama Usaha</div>
                  <small className="text-muted">Identitas bisnis UMKM</small>
                </td>
                <td className="py-4 px-2 text-end">
                  <span className="fw-bold text-dark h5 mb-0">
                    {receiptData.business_name ||
                      receiptData.business_profile?.business_name ||
                      "-"}
                  </span>
                </td>
              </tr>
              <tr className="border-bottom border-light">
                <td className="py-4 px-2">
                  <div className="fw-bold text-dark">Sektor Bisnis Utama</div>
                  <small className="text-muted">Kategori industri/bidang usaha</small>
                </td>
                <td className="py-4 px-2 text-end">
                  <span className="fw-bold text-dark h6 mb-0">
                    {receiptData.business_sector ||
                      receiptData.business_profile?.business_sector ||
                      "-"}
                  </span>
                </td>
              </tr>
              <tr className="border-bottom border-light">
                <td className="py-4 px-2">
                  <div className="fw-bold text-dark">Alamat Tempat Usaha</div>
                  <small className="text-muted">Lokasi operasional bisnis</small>
                </td>
                <td className="py-4 px-2 text-end">
                  <span
                    className="fw-bold text-dark h6 mb-0 text-wrap"
                    style={{ maxWidth: "300px", display: "inline-block" }}
                  >
                    {receiptData.business_address ||
                      receiptData.business_profile?.business_address ||
                      "-"}
                  </span>
                </td>
              </tr>
              <tr className="border-bottom border-light">
                <td className="py-4 px-2">
                  <div className="fw-bold text-dark">Estimasi Omset Tahunan Saat Ini</div>
                  <small className="text-muted">Pendapatan kotor setahun</small>
                </td>
                <td className="py-4 px-2 text-end">
                  <span className="fw-bold text-dark h5 mb-0">
                    {formatCurrency(
                      receiptData.estimated_yearly_turnover ||
                        (receiptData.business_profile?.monthly_revenue * 12) ||
                        0
                    )}
                  </span>
                </td>
              </tr>
              <tr className="border-bottom border-light">
                <td className="py-4 px-2">
                  <div className="fw-bold text-dark">Tujuan Penggunaan Dana</div>
                  <small className="text-muted">Rencana alokasi dana</small>
                </td>
                <td className="py-4 px-2 text-end">
                  <span
                    className="fw-bold text-dark h6 mb-0 text-wrap"
                    style={{ maxWidth: "300px", display: "inline-block" }}
                  >
                    {receiptData.purpose || receiptData.funding_purpose || "-"}
                  </span>
                </td>
              </tr>
              <tr className="border-bottom border-light">
                <td className="py-4 px-2">
                  <div className="fw-bold text-dark">Estimasi Omset (Bulanan)</div>
                  <small className="text-muted">Selama periode pendanaan</small>
                </td>
                <td className="py-4 px-2 text-end">
                  <span className="fw-bold text-dark h5 mb-0">
                    {formatCurrency(
                      receiptData.estimated_monthly_turnover ||
                        receiptData.business_profile?.monthly_revenue ||
                        0
                    )}
                  </span>
                </td>
              </tr>
              <tr className="border-bottom border-light">
                <td className="py-4 px-2">
                  <div className="fw-bold text-dark">Tawaran Bagi Hasil Investor</div>
                  <small className="text-muted">Persentase bagi hasil keuntungan</small>
                </td>
                <td className="py-4 px-2 text-end">
                  <span className="fw-bold text-success h5 mb-0">
                    {receiptData.investor_profit_share || receiptData.profit_share || 0}%
                  </span>
                </td>
              </tr>
            </>
          )}

          {!isWithdrawal && (
            <>
              <tr className="border-bottom border-light">
                <td className="py-4 px-2">
                  <div className="fw-bold text-dark">
                    {isPendanaanSyariah ? "Periode Pengembalian Modal" : "Jangka Waktu"}
                  </div>
                  <small className="text-muted">
                    {isPendanaanSyariah ? "Durasi pendanaan" : "Durasi pinjaman"}
                  </small>
                </td>
                <td className="py-4 px-2 text-end">
                  <span className="fw-bold text-dark h5 mb-0">
                    {receiptData.cooperation_months || 0} Bulan
                  </span>
                </td>
              </tr>
              {!isPendanaanSyariah && (
                <tr className="border-bottom border-light">
                  <td className="py-4 px-2">
                    <div className="fw-bold text-dark">Angsuran per Bulan</div>
                    <small className="text-muted">Kewajiban bulanan</small>
                  </td>
                  <td className="py-4 px-2 text-end">
                    <span className="fw-bold text-dark h5 mb-0">
                      {formatCurrency(receiptData.monthly_installment)}
                    </span>
                  </td>
                </tr>
              )}
            </>
          )}

          <tr className="border-bottom border-light">
            <td className="py-4 px-2">
              <div className="fw-bold text-dark">Metode Pencairan</div>
              <small className="text-muted">Cara penyaluran dana</small>
            </td>
            <td className="py-4 px-2 text-end">
              <span className="fw-bold text-dark h5 mb-0">
                {isWithdrawal
                  ? receiptData.method || "Transfer"
                  : receiptData.metode_pencairan || "Tunai"}
              </span>
            </td>
          </tr>

          {((isWithdrawal && receiptData.method !== "TUNAI") ||
            (!isWithdrawal && receiptData.metode_pencairan !== "Tunai")) && (
            <tr className="border-bottom border-light">
              <td className="py-4 px-2">
                <div className="fw-bold text-dark">Tujuan Pencairan</div>
                <small className="text-muted">Bank dan Nomor Rekening</small>
              </td>
              <td className="py-4 px-2 text-end">
                <div className="fw-bold text-dark h6 mb-1">
                  {isWithdrawal
                    ? receiptData.bank_name || receiptData.bank?.bankName || "-"
                    : receiptData.bank_tujuan || "-"}
                </div>
                <small className="text-muted d-block">
                  {isWithdrawal
                    ? receiptData.bank_account_no || receiptData.bank?.accountNo || "-"
                    : receiptData.no_rekening || "-"}
                </small>
                {isWithdrawal && (
                  <small className="text-muted d-block">
                    a.n. {receiptData.bank_account_name || receiptData.bank?.accountName || "-"}
                  </small>
                )}
              </td>
            </tr>
          )}

          {!isWithdrawal && receiptData.metode_pencairan === "Tunai" && (
            <tr className="border-bottom border-light">
              <td className="py-4 px-2">
                <div className="fw-bold text-dark">Lokasi Pencairan</div>
                <small className="text-muted">Tempat pengambilan dana</small>
              </td>
              <td className="py-4 px-2 text-end">
                <span className="fw-bold text-dark h5 mb-0">
                  {receiptData.lokasi_pencairan || "-"}
                </span>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
