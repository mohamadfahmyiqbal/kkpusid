import React from "react";
import PropTypes from "prop-types";
import { FaInfoCircle } from "react-icons/fa";
import PaymentDetailsSection from "./PaymentDetailsSection";
import FinancingDetailsSection from "./FinancingDetailsSection";
import TabunganDetailsSection from "./TabunganDetailsSection";
import ReturnInfoSection from "./ReturnInfoSection";
import SukukOrderSection from "./SukukOrderSection";

export default function TransactionBodyContent({
  detail,
  isSukukOrder,
  isFinancing,
  isTabungan,
  isPelunasan,
}) {
  if (isSukukOrder) {
    return <SukukOrderSection detail={detail} />;
  }

  return (
    <>
      {/* Operational cost alert */}
      {isFinancing &&
        detail?.operational_cost &&
        parseFloat(detail.operational_cost) !== 0 && (
          <div className="alert alert-info py-2 px-3 small d-flex align-items-center gap-2 mb-4 border-0 bg-info bg-opacity-10 text-info rounded-3">
            <FaInfoCircle className="flex-shrink-0" />
            <span>
              Biaya operasional sebesar{" "}
              <strong>
                Rp{" "}
                {parseFloat(
                  Math.abs(detail.operational_cost)
                ).toLocaleString("id-ID")}
              </strong>{" "}
              telah{" "}
              {parseFloat(detail.operational_cost) > 0
                ? "ditambahkan ke"
                : "dikurangi dari"}{" "}
              pokok pembiayaan.
            </span>
          </div>
        )}

      {/* Sections */}
      <PaymentDetailsSection
        detail={detail}
        isFinancing={isFinancing}
        isTabungan={isTabungan}
      />
      {isFinancing ? (
        <FinancingDetailsSection
          detail={detail}
          isPelunasan={isPelunasan}
        />
      ) : isTabungan ? (
        <TabunganDetailsSection detail={detail} />
      ) : (
        <ReturnInfoSection detail={detail} />
      )}
    </>
  );
}

TransactionBodyContent.propTypes = {
  detail: PropTypes.object,
  isSukukOrder: PropTypes.bool.isRequired,
  isFinancing: PropTypes.bool.isRequired,
  isTabungan: PropTypes.bool.isRequired,
  isPelunasan: PropTypes.bool,
};
