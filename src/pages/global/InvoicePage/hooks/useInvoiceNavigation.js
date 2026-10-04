import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../../../utils/helpers";

export const useInvoiceNavigation = ({
  billData,
  isPaid,
  returnPage,
  registrationId,
  category,
  categoryName,
  originalReturn,
  financingId,
  product,
  productName,
  id,
}) => {
  const navigate = useNavigate();

  const isRegistrationFlow = useMemo(() => {
    return (
      returnPage === "registrationPage" ||
      (returnPage === "billingPage" && Boolean(registrationId))
    );
  }, [returnPage, registrationId]);

  const isSimpananFlow = useMemo(() => {
    return (
      originalReturn === "simpananPage" ||
      returnPage === "simpananPage" ||
      category === "SIMPANAN" ||
      category === "SUKARELA" ||
      category === "WAJIB" ||
      category === "POKOK"
    );
  }, [originalReturn, returnPage, category]);

  const isPelunasan = useMemo(() => {
    return Boolean(
      (productName || product || categoryName || category)
        ?.toLowerCase()
        .includes("pelunasan"),
    );
  }, [productName, product, categoryName, category]);

  const returnPageName = useMemo(() => {
    if (isPelunasan) return "Jual Beli";
    if (isPaid && isRegistrationFlow) return "Dashboard";
    if (isSimpananFlow) return "Simpanan";
    if (isPaid && category === "FINANCING") return "Billing";
    if (isPaid && category === "TABUNGAN_DEPOSIT") return "Tabungan";

    switch (returnPage) {
      case "dashboard":
        return "Dashboard";
      case "billingPage":
        return "Billing";
      case "setoranTabungan":
        return "Setoran Tabungan";
      case "registrationPage":
        return "Registrasi";
      default:
        return "Kembali";
    }
  }, [
    isPelunasan,
    isPaid,
    isRegistrationFlow,
    isSimpananFlow,
    category,
    returnPage,
  ]);

  const handleNavigateBack = useCallback(() => {
    // Redirect to dashboard if paid and part of registration flow
    if (isPaid && isRegistrationFlow) {
      navigate(`/${jwtEncode({ page: "dashboard" })}`);
      return;
    }

    if (isSimpananFlow) {
      const billDetailDesc =
        billData?.details?.map((d) => d.description).join(" ") || "";
      const targetCategory = `${categoryName || ""} ${category || ""} ${product || ""} ${productName || ""} ${billDetailDesc}`;
      let activeTabCode = "SUKARELA";

      const catUpper = targetCategory.toUpperCase();
      if (catUpper.includes("WAJIB")) {
        activeTabCode = "WAJIB";
      } else if (catUpper.includes("POKOK")) {
        activeTabCode = "POKOK";
      } else if (catUpper.includes("SUKARELA")) {
        activeTabCode = "SUKARELA";
      }

      navigate(
        `/${jwtEncode({ page: "simpananPage", activeTab: activeTabCode })}`,
      );
      return;
    }

    if (isPelunasan) {
      navigate(`/${jwtEncode({ page: "jualBeliPage" })}`);
      return;
    }

    if (isPaid && category === "FINANCING") {
      navigate(
        `/${jwtEncode({
          page: "billingPage",
          category: "FINANCING",
          financingId: financingId,
          productName: productName || product,
          return: "transaksiPage",
        })}`,
      );
      return;
    }

    if (isPaid && category === "TABUNGAN_DEPOSIT") {
      navigate(`/${jwtEncode({ page: "tabunganPage" })}`);
      return;
    }

    if (returnPage === "billingPage") {
      const billingToken = jwtEncode({
        page: "billingPage",
        registrationId: registrationId,
        category: categoryName,
        financingId: financingId,
        productName: productName || product,
        return: originalReturn || "dashboard",
      });
      navigate(`/${billingToken}`);
      return;
    }

    if (returnPage === "registrationPage") {
      navigate(`/${jwtEncode({ page: "dashboard" })}`);
      return;
    }

    if (returnPage === "dashboard") {
      navigate("/dashboard");
      return;
    }

    if (returnPage === "setoranTabungan") {
      const tabunganToken = jwtEncode({
        page: "setoranTabungan",
        product: product,
        id: id,
      });
      navigate(`/${tabunganToken}`);
      return;
    }

    navigate(`/${returnPage}`);
  }, [
    navigate,
    isPaid,
    isRegistrationFlow,
    isSimpananFlow,
    billData,
    categoryName,
    category,
    product,
    productName,
    isPelunasan,
    financingId,
    returnPage,
    registrationId,
    originalReturn,
    id,
  ]);

  return {
    handleNavigateBack,
    returnPageName,
    isRegistrationFlow,
    isSimpananFlow,
    isPelunasan,
  };
};
