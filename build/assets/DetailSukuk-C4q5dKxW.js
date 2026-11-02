import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { D as Badge, E as Button, Ft as FaCertificate, Lt as FaChartLine, Pr as useNavigate, Qn as FaShieldAlt, S as Card_default, b as Container, c as Spinner, g as Form_default, l as Row, x as Col } from "./vendor-react-D5pUDmay.js";
import { n as AnimatePresence, t as motion } from "./vendor-framer-fx3iiH1e.js";
import { t as api } from "./common-qX05v8MF.js";
import { o as jwtDecodePage, s as jwtEncode } from "./index-BaUN0sjk.js";
import { t as SwalAlert } from "./SwalAlert-C3kBxD_o.js";
//#region src/pages/investasi/DetailSukuk/hooks/useDetailSukuk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var useDetailSukuk = () => {
	const [sukukData, setSukukData] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const fetchSukukDetail = (0, import_react.useCallback)(async (id) => {
		setLoading(true);
		setError(null);
		try {
			const response = await api.get(`/financing/sukuk/detail/${id}`);
			if (response.data.success) {
				const item = response.data.data;
				setSukukData({
					id: item.issue_id,
					name: item.issue_name,
					issuer: item.issuer,
					type: item.type,
					coupon: item.coupon,
					startDate: item.start_date,
					maturity: item.end_date,
					totalAmount: item.total_amount,
					minInvestment: item.min_investment,
					price: item.price,
					status: item.status,
					description: "Sukuk dengan imbal hasil menarik dan risiko terukur yang dikelola secara profesional sesuai prinsip syariah.",
					riskLevel: "Rendah",
					rating: "AAA"
				});
			} else throw new Error(response.data.message || "Gagal mengambil detail sukuk");
		} catch (err) {
			console.error("Error fetching sukuk detail:", err);
			setError("Gagal memuat detail sukuk. Silakan coba lagi nanti.");
		} finally {
			setLoading(false);
		}
	}, []);
	const submitInvestment = async (sukuk_id, nominal) => {
		setSubmitting(true);
		try {
			return (await api.post("/financing/sukuk/order", {
				sukuk_id,
				nominal
			})).data;
		} catch (err) {
			console.error("Error submitting investment:", err);
			throw err;
		} finally {
			setSubmitting(false);
		}
	};
	return {
		sukukData,
		loading,
		error,
		submitting,
		fetchSukukDetail,
		submitInvestment
	};
};
//#endregion
//#region src/pages/investasi/DetailSukuk/DetailSukuk.jsx
var import_jsx_runtime = require_jsx_runtime();
var DetailSukuk = () => {
	const navigate = useNavigate();
	const { sukukData, loading, error: fetchError, submitting, fetchSukukDetail, submitInvestment } = useDetailSukuk();
	const [formData, setFormData] = (0, import_react.useState)({ nominal: "" });
	const [errors, setErrors] = (0, import_react.useState)({});
	const [submitError, setSubmitError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const pathParts = window.location.pathname.split("/");
		const lastPart = pathParts[pathParts.length - 1];
		try {
			const sukukId = jwtDecodePage(lastPart)?.sukukId;
			if (sukukId) fetchSukukDetail(sukukId);
			else setSubmitError("ID Sukuk tidak ditemukan pada URL");
		} catch (e) {
			console.error("Error decoding URL:", e);
			setSubmitError("URL tidak valid");
		}
	}, [fetchSukukDetail]);
	const formatCurrency = (0, import_react.useCallback)((value) => {
		return new Intl.NumberFormat("id-ID").format(value);
	}, []);
	(0, import_react.useCallback)((dateString) => {
		return new Date(dateString).toLocaleDateString("id-ID", {
			day: "numeric",
			month: "long",
			year: "numeric"
		});
	}, []);
	const calculateTenor = (0, import_react.useCallback)((start, end) => {
		if (!start || !end) return "-";
		const startDate = new Date(start);
		const endDate = new Date(end);
		let months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
		months -= startDate.getMonth();
		months += endDate.getMonth();
		return `${months > 0 ? months : 1} Bulan`;
	}, []);
	const handleNominalChange = (0, import_react.useCallback)((e) => {
		const rawValue = e.target.value.replace(/\D/g, "");
		setFormData((prev) => ({
			...prev,
			nominal: rawValue
		}));
		setErrors((prev) => ({
			...prev,
			nominal: ""
		}));
	}, []);
	const estimatedUnits = (0, import_react.useMemo)(() => {
		if (!sukukData || !formData.nominal) return 0;
		const nominal = parseInt(formData.nominal, 10) || 0;
		const price = sukukData.price || 100;
		return Math.floor(nominal / (price * 1e4));
	}, [sukukData, formData.nominal]);
	const estimatedReturn = (0, import_react.useMemo)(() => {
		if (!sukukData || !formData.nominal) return 0;
		const nominal = parseInt(formData.nominal, 10) || 0;
		const couponStr = sukukData.coupon ? sukukData.coupon.replace("%", "") : "0";
		return nominal * (parseFloat(couponStr) / 100);
	}, [sukukData, formData.nominal]);
	const validateForm = (0, import_react.useCallback)(() => {
		const newErrors = {};
		const nominal = parseInt(formData.nominal, 10) || 0;
		if (!formData.nominal) newErrors.nominal = "Nominal investasi wajib diisi";
		else if (nominal < sukukData?.minInvestment) newErrors.nominal = `Minimal investasi: Rp ${formatCurrency(sukukData?.minInvestment)}`;
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}, [
		formData,
		sukukData,
		formatCurrency
	]);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) return;
		setSubmitError(null);
		try {
			navigate(`/${jwtEncode({
				page: "transactionDetailPage",
				financingId: (await submitInvestment(sukukData.id, parseInt(formData.nominal, 10)))?.data?.order_id,
				sukukOrder: true,
				return: "investasiHalal"
			})}`);
		} catch (err) {
			setSubmitError(err?.response?.data?.message || "Gagal mengirim pengajuan investasi");
		}
	};
	const handleBack = (0, import_react.useCallback)(() => {
		navigate(`/${jwtEncode({ page: "investasiHalal" })}`);
	}, [navigate]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "d-flex flex-column justify-content-center align-items-center vh-100 bg-light",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
			animation: "border",
			variant: "primary"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-muted",
			children: "Memuat detail sukuk..."
		})]
	});
	if (fetchError && !sukukData) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		fluid: true,
		className: "px-0 mt-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwalAlert, {
			variant: "danger",
			children: fetchError
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "outline-secondary",
			onClick: handleBack,
			children: "Kembali"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "sukuk-detail-wrapper pb-5 px-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
			fluid: true,
			className: "px-0 mt-4 font-outfit",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
				className: "g-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
					lg: 7,
					xl: 8,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: {
							opacity: 0,
							x: -20
						},
						animate: {
							opacity: 1,
							x: 0
						},
						transition: { delay: .1 },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default, {
							className: "sukuk-detail-card border-0 p-3 p-md-4 mb-4 shadow-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "d-flex flex-wrap justify-content-between align-items-start mb-4 pb-3 border-bottom",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "d-flex align-items-center mb-3 mb-md-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "p-3 rounded-circle bg-primary bg-opacity-10 text-primary me-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCertificate, { size: 24 })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "fw-bold mb-1 text-dark",
											children: sukukData?.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-muted small mb-0 d-flex align-items-center",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaShieldAlt, { className: "me-1 text-success" }),
												"Diterbitkan oleh: ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: "ms-1",
													children: sukukData?.issuer
												})
											]
										})] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										bg: sukukData?.status === "OPEN" ? "success" : "secondary",
										className: "px-4 py-2 rounded-pill fs-6",
										children: sukukData?.status === "OPEN" ? "Masa Penawaran" : "Ditutup"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
										className: "fw-bold mb-3",
										children: "Informasi Pendanaan"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
										className: "list-unstyled mb-0 border rounded-3 overflow-hidden",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "d-flex justify-content-between align-items-center p-3 bg-light border-bottom",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted small",
													children: "Kategori"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "fw-bold text-dark",
													children: sukukData?.type
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "d-flex justify-content-between align-items-center p-3 bg-white border-bottom",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted small",
													children: "Akad Sukuk"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "fw-bold text-primary",
													children: sukukData?.type === "Sukuk Ritel" ? "Ijarah" : "Mudharabah"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "d-flex justify-content-between align-items-center p-3 bg-light border-bottom",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted small",
													children: "Nilai Pendanaan"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "fw-bold text-dark",
													children: ["Rp ", formatCurrency(sukukData?.totalAmount || 0)]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "d-flex justify-content-between align-items-center p-3 bg-white border-bottom",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted small",
													children: "Imbal Hasil / Kupon"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "fw-bold text-success d-flex align-items-center",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaChartLine, { className: "me-2" }),
														sukukData?.coupon,
														" p.a."
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "d-flex justify-content-between align-items-center p-3 bg-light border-bottom",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted small",
													children: "Tenor"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "fw-bold text-dark",
													children: calculateTenor(sukukData?.startDate, sukukData?.maturity)
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "d-flex justify-content-between align-items-center p-3 bg-white",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted small",
													children: "Minimum Investasi"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "fw-bold text-dark",
													children: ["Rp ", formatCurrency(sukukData?.minInvestment || 0)]
												})]
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
									className: "fw-bold mb-3 border-bottom pb-2",
									children: "Deskripsi Produk"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted lh-lg small",
									children: sukukData?.description || "Deskripsi produk belum tersedia."
								})] })
							] })
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
					lg: 5,
					xl: 4,
					className: "sticky-summary-column",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: {
							opacity: 0,
							x: 20
						},
						animate: {
							opacity: 1,
							x: 0
						},
						transition: { delay: .2 },
						className: "d-flex flex-column gap-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default, {
							className: "sukuk-detail-card border-0 p-4 shadow-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "form-section-header mb-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
										className: "fw-bold font-outfit mb-0 text-dark",
										children: "Formulir Investasi"
									})
								}),
								(submitError || fetchError) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwalAlert, {
									variant: "danger",
									className: "mb-4 rounded-3 text-sm",
									children: submitError || fetchError
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default, {
									onSubmit: handleSubmit,
									noValidate: true,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
											className: "mb-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Label, {
													className: "fw-semibold text-dark small",
													htmlFor: "nominal",
													children: ["Nominal Pembelian", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-danger ms-1",
														children: "*"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
													id: "nominal",
													className: `nominal-input bg-light border-0 ${errors.nominal ? "border-danger" : ""}`,
													type: "text",
													value: formData.nominal ? `Rp ${formatCurrency(formData.nominal)}` : "",
													onChange: handleNominalChange,
													placeholder: `Min: Rp ${formatCurrency(sukukData?.minInvestment)}`,
													isInvalid: !!errors.nominal,
													disabled: submitting || sukukData?.status !== "OPEN",
													inputMode: "numeric"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: errors.nominal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
													initial: {
														opacity: 0,
														height: 0
													},
													animate: {
														opacity: 1,
														height: "auto"
													},
													exit: {
														opacity: 0,
														height: 0
													},
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control.Feedback, {
														type: "invalid",
														className: "d-block mt-1",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
															className: "text-danger fw-bold",
															children: errors.nominal
														})
													})
												}) })
											]
										}),
										formData.nominal && !errors.nominal && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "summary-card p-3 mb-4 rounded-3 border-0 bg-success bg-opacity-10",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
													className: "fw-bold mb-3 text-success",
													children: "Estimasi Ringkasan Investasi"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "d-flex justify-content-between mb-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-muted small",
														children: "Imbal Hasil Tahunan"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "fw-bold text-success",
														children: ["Rp ", formatCurrency(estimatedReturn)]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "d-flex justify-content-between border-top pt-2 mt-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-muted small",
														children: "Total Unit Didapat"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "fw-bold text-dark",
														children: [
															"~",
															estimatedUnits,
															" unit"
														]
													})]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "d-grid gap-2 mt-4 pt-2 border-top",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "primary",
												type: "submit",
												className: "btn-invest w-100 py-3 shadow-md border-0 d-flex align-items-center justify-content-center",
												disabled: submitting || sukukData?.status !== "OPEN" || !!errors.nominal || !formData.nominal,
												children: submitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
													animation: "border",
													size: "sm",
													className: "me-2"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "fw-bold",
													children: "Memproses..."
												})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "fw-bold",
													children: "Proses Pembelian"
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "light",
												className: "w-100 py-2 fw-bold text-muted border-0 shadow-sm mt-2",
												onClick: handleBack,
												disabled: submitting,
												children: "Batal & Kembali"
											})]
										})
									]
								})
							]
						})
					})
				})]
			})
		})
	});
};
//#endregion
export { DetailSukuk as default };
