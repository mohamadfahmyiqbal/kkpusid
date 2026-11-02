import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, T as require_sweetalert2_all } from "./vendor-rpDlma0K.js";
//#region src/hooks/usePaymentHandler.js
var import_react = /* @__PURE__ */ __toESM(require_react());
require_sweetalert2_all();
/**
* Hook untuk menangani event pembayaran berhasil dari socket
* - Menutup Snap popup
* - Update UI registrasi
* - Menampilkan konfirmasi pembayaran
*/
var usePaymentHandler = () => {
	const [paymentSuccess, setPaymentSuccess] = (0, import_react.useState)(false);
	const [paymentData, setPaymentData] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const handleCloseSnap = () => {
			if (window.snap) window.snap.hide();
			document.querySelectorAll("[id*=\"snap\"], [class*=\"snap\"]").forEach((el) => {
				if (el.style.display !== "none") el.style.display = "none";
			});
		};
		const handlePaymentSuccessful = (event) => {
			setPaymentSuccess(true);
			setPaymentData(event.detail);
			handleCloseSnap();
		};
		window.addEventListener("CLOSE_SNAP_POPUP", handleCloseSnap);
		window.addEventListener("PAYMENT_SUCCESSFUL", handlePaymentSuccessful);
		return () => {
			window.removeEventListener("CLOSE_SNAP_POPUP", handleCloseSnap);
			window.removeEventListener("PAYMENT_SUCCESSFUL", handlePaymentSuccessful);
		};
	}, []);
	const resetPaymentState = () => {
		setPaymentSuccess(false);
		setPaymentData(null);
	};
	return {
		paymentSuccess,
		paymentData,
		resetPaymentState
	};
};
//#endregion
export { usePaymentHandler as t };
