import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, T as require_sweetalert2_all, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { E as Button, Fr as useParams, Pr as useNavigate, S as Card_default, b as Container, l as Row, x as Col, zt as FaCheckCircle } from "./vendor-react-D5pUDmay.js";
import { s as jwtEncode } from "./index-BaUN0sjk.js";
import { t as SwalAlert } from "./SwalAlert-C3kBxD_o.js";
//#region src/pages/program/arisan/ArisanConfirmationPage.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_sweetalert2_all = /* @__PURE__ */ __toESM(require_sweetalert2_all());
var import_jsx_runtime = require_jsx_runtime();
var decodeTokenPayload = (token) => {
	if (!token) return null;
	try {
		const [, payload] = token.split(".");
		const json = decodeURIComponent(escape(atob(payload.replace(/-/g, "+").replace(/_/g, "/"))));
		return JSON.parse(json);
	} catch (err) {
		return null;
	}
};
function ArisanConfirmationPage() {
	const navigate = useNavigate();
	const { token } = useParams();
	const arisanData = (0, import_react.useMemo)(() => {
		return decodeTokenPayload(token)?.arisan || {};
	}, [token]);
	const handleBack = (0, import_react.useCallback)(() => {
		navigate(`/${jwtEncode({ page: "arisanJoinPage" })}`);
	}, [navigate]);
	const handleConfirm = (0, import_react.useCallback)(async () => {
		await import_sweetalert2_all.default.fire({
			title: "Berhasil",
			text: `Konfirmasi gabung Grup Arisan ${arisanData.batch} berhasil! Menunggu persetujuan.`,
			icon: "success"
		});
		navigate(`/${jwtEncode({
			page: "transactionDetailPage",
			action: "arisanEnrollment",
			return: "arisanPage"
		})}`);
	}, [arisanData, navigate]);
	if (!arisanData || !arisanData.batch) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		className: "mt-5 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwalAlert, {
			variant: "danger",
			children: "Data grup arisan tidak ditemukan."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "secondary",
			onClick: handleBack,
			children: "Kembali"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "arisan-confirmation-page-container pb-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				className: "justify-content-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
					lg: 8,
					md: 10,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwalAlert, {
						variant: "info",
						className: "text-center",
						children: "Pastikan detail arisan di bawah ini sudah benar sebelum mengklik **Konfirmasi Gabung**."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default, {
						className: "shadow-lg border-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
							className: "p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
									className: "fw-bold mb-3 text-primary",
									children: `Detail Arisan ${arisanData.batch}`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
									className: "mb-4 small",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
											xs: 6,
											className: "mb-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
												className: "d-block text-muted",
												children: "Kategori"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
												className: "fw-bold",
												children: arisanData.kategori
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
											xs: 6,
											className: "mb-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
												className: "d-block text-muted",
												children: "Target Nominal"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
												className: "fw-bold text-success",
												children: arisanData.targetNominal
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
											xs: 6,
											className: "mb-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
												className: "d-block text-muted",
												children: "Setoran Bulanan"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
												className: "fw-bold text-success",
												children: arisanData.setoranPerBulan
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
											xs: 6,
											className: "mb-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
												className: "d-block text-muted",
												children: "Term/Durasi"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
												className: "fw-bold",
												children: arisanData.term
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
											xs: 12,
											className: "mb-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
												className: "d-block text-muted",
												children: "Periode Angsuran"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
												className: "fw-bold",
												children: arisanData.periodeAngsuran
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "d-grid mt-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "primary",
										size: "lg",
										className: "fw-bold py-3",
										onClick: handleConfirm,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheckCircle, { className: "me-2" }), " Konfirmasi Gabung"]
									})
								})
							]
						})
					})]
				})
			})
		})
	});
}
//#endregion
export { ArisanConfirmationPage as default };
