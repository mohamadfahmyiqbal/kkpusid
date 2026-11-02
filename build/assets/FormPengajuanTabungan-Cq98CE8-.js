import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { Dr as FaUtensils, Pr as useNavigate, Tn as FaKaaba, an as FaExclamationTriangle, b as Container, c as Spinner, g as Form_default, hn as FaGraduationCap, l as Row, u as ProgressBar, x as Col } from "./vendor-react-D5pUDmay.js";
import { n as AnimatePresence, t as motion } from "./vendor-framer-fx3iiH1e.js";
import { n as useProfile } from "./ProfileContext-DQCnAT09.js";
import { o as jwtDecodePage, s as jwtEncode } from "./index-BaUN0sjk.js";
import { t as Button } from "./Button-DpYzkz3l.js";
import { t as SwalAlert } from "./SwalAlert-C3kBxD_o.js";
import { t as TabunganService } from "./tabungan.service-CPFyTv_m.js";
import { t as Card } from "./Card-DeCk4TVr.js";
//#region src/pages/tabungan/FormPengajuanTabungan/FormPengajuanTabungan.css
var import_react = /* @__PURE__ */ __toESM(require_react());
//#endregion
//#region src/pages/tabungan/FormPengajuanTabungan/FormPengajuanTabungan.jsx
var import_jsx_runtime = require_jsx_runtime();
var getIconForCategory = (category) => {
	const cat = category?.toLowerCase() || "";
	if (cat.includes("haji")) return FaKaaba;
	if (cat.includes("umrah")) return FaKaaba;
	if (cat.includes("pendidikan")) return FaGraduationCap;
	if (cat.includes("qurban")) return FaUtensils;
	return FaKaaba;
};
var FormPengajuanTabungan = () => {
	const navigate = useNavigate();
	const firstInputRef = (0, import_react.useRef)(null);
	const { userData } = useProfile();
	const [programData, setProgramData] = (0, import_react.useState)(null);
	const [formData, setFormData] = (0, import_react.useState)({
		monthly_deposit: "",
		term_months: "",
		target_amount: "",
		akadAgreed: false
	});
	const [errors, setErrors] = (0, import_react.useState)({});
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [submitError, setSubmitError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const pathParts = window.location.pathname.split("/");
		const lastPart = pathParts[pathParts.length - 1];
		try {
			const decoded = jwtDecodePage(lastPart);
			if (decoded?.program) setProgramData(decoded.program);
		} catch (e) {
			console.error("Error decoding URL:", e);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		if (firstInputRef.current) firstInputRef.current.focus();
	}, []);
	const formatCurrency = (0, import_react.useCallback)((value) => {
		if (!value && value !== 0) return "";
		return new Intl.NumberFormat("id-ID").format(value);
	}, []);
	const parseCurrency = (0, import_react.useCallback)((value) => {
		return value.replace(/\D/g, "");
	}, []);
	const handleTargetChange = (0, import_react.useCallback)((e) => {
		const rawValue = parseCurrency(e.target.value);
		setFormData((prev) => ({
			...prev,
			target_amount: rawValue
		}));
		setErrors((prev) => ({
			...prev,
			target_amount: ""
		}));
	}, [parseCurrency]);
	const handleSetoranChange = (0, import_react.useCallback)((e) => {
		const rawValue = parseCurrency(e.target.value);
		setFormData((prev) => ({
			...prev,
			monthly_deposit: rawValue
		}));
		setErrors((prev) => ({
			...prev,
			monthly_deposit: ""
		}));
	}, [parseCurrency]);
	const handleTermChange = (0, import_react.useCallback)((e) => {
		const val = e.target.value.replace(/\D/g, "");
		setFormData((prev) => ({
			...prev,
			term_months: val
		}));
		setErrors((prev) => ({
			...prev,
			term_months: ""
		}));
	}, []);
	const handleAkadChange = (0, import_react.useCallback)((e) => {
		setFormData((prev) => ({
			...prev,
			akadAgreed: e.target.checked
		}));
	}, []);
	const isQurban = programData?.category?.toLowerCase().includes("qurban");
	const calculatedTarget = (0, import_react.useMemo)(() => {
		if (isQurban) return parseInt(formData.target_amount, 10) || 0;
		return (parseInt(formData.monthly_deposit, 10) || 0) * (parseInt(formData.term_months, 10) || 0);
	}, [
		isQurban,
		formData.target_amount,
		formData.monthly_deposit,
		formData.term_months
	]);
	const calculatedDeposit = (0, import_react.useMemo)(() => {
		if (!isQurban) return parseInt(formData.monthly_deposit, 10) || 0;
		const target = parseInt(formData.target_amount, 10) || 0;
		const term = parseInt(formData.term_months, 10) || 0;
		return term > 0 ? Math.ceil(target / term) : 0;
	}, [
		isQurban,
		formData.target_amount,
		formData.term_months,
		formData.monthly_deposit
	]);
	const validateForm = (0, import_react.useCallback)(() => {
		const newErrors = {};
		const setoran = calculatedDeposit;
		const term = parseInt(formData.term_months, 10) || 0;
		if (isQurban) {
			if ((parseInt(formData.target_amount, 10) || 0) <= 0) newErrors.target_amount = "Target nominal harus lebih dari 0";
		} else if (setoran <= 0) newErrors.monthly_deposit = "Setoran bulanan harus lebih dari 0";
		if (term <= 0) newErrors.term_months = "Durasi harus lebih dari 0";
		if (term <= 0) newErrors.term_months = "Durasi harus lebih dari 0";
		if (!formData.akadAgreed) newErrors.akadAgreed = "Anda harus menyetujui akad";
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}, [formData]);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) return;
		setLoading(true);
		setSubmitError(null);
		try {
			const payload = {
				saving_target_id: programData.saving_target_id,
				monthly_deposit: calculatedDeposit,
				term_months: parseInt(formData.term_months, 10)
			};
			const response = await TabunganService.submitApplication(payload);
			const responseData = response?.data?.data || response?.data || {};
			const applicationId = responseData.member_saving_target_id || responseData.id || null;
			const mappedData = {
				id: applicationId,
				amount: calculatedTarget,
				item_price: payload.monthly_deposit,
				cooperation_months: payload.term_months,
				purpose: programData.target_name,
				item_name: programData.target_name,
				account_type: "Simpanan Target",
				akad_type: "Wadiah",
				method: "Autodebet - Setoran",
				status: "PENDING",
				created_at: (/* @__PURE__ */ new Date()).toISOString(),
				is_approved_pengawas: false,
				is_approved_ketua: false,
				is_approved_bendahara: false,
				is_rejected: false,
				member: {
					full_name: responseData?.member?.full_name || responseData?.member_name || userData?.name || "-",
					member_code: responseData?.member?.member_code || responseData?.member_no || "-",
					member_type: "Reguler"
				},
				bank_name: responseData?.bank_name || "-",
				bank_account_name: responseData?.bank_account_name || "-",
				bank_account_no: responseData?.bank_account_no || "-",
				catalog: {
					target_name: programData.target_name,
					category: programData.category,
					target_amount: calculatedTarget,
					term_months: payload.term_months
				}
			};
			navigate(`/${jwtEncode({
				page: "transactionDetailPage",
				tabunganId: applicationId,
				return: "tabunganPage",
				product: programData.target_name,
				data: mappedData
			})}`);
		} catch (err) {
			setSubmitError(err?.response?.data?.message || "Gagal mengirim pengajuan");
		} finally {
			setLoading(false);
		}
	};
	const handleBack = (0, import_react.useCallback)(() => {
		navigate(`/${jwtEncode({ page: "tabunganPage" })}`);
	}, [navigate]);
	if (!programData) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		className: "py-5 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { animation: "border" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3",
			children: "Memuat Data Program..."
		})]
	});
	const ProductIcon = getIconForCategory(programData.category);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "form-pengajuan-page pb-5 px-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
			fluid: true,
			className: "px-0 mt-4 font-outfit",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default, {
				onSubmit: handleSubmit,
				noValidate: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
					className: "g-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
						lg: 7,
						xl: 8,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								x: -20
							},
							animate: {
								opacity: 1,
								x: 0
							},
							transition: { delay: .1 },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								variant: "form",
								className: "p-3 p-md-4 mb-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card.Body, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "d-flex align-items-center mb-4 pb-3 border-bottom",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "p-3 rounded-circle bg-primary bg-opacity-10 text-primary me-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductIcon, { size: 24 })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
											className: "fw-bold mb-1 text-dark",
											children: programData.target_name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-muted small mb-0",
											children: "Program Tabungan Koperasi"
										})] })]
									}),
									submitError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SwalAlert, {
										variant: "danger",
										className: "mb-4 d-flex align-items-center",
										dismissible: true,
										onClose: () => setSubmitError(null),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaExclamationTriangle, { className: "me-2" }), submitError]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "form-section-header mb-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
											className: "fw-bold font-outfit mb-0 text-dark",
											children: "Detail Program Simpanan"
										})
									}),
									!isQurban && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										className: "mb-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
											md: 12,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "p-3 bg-light rounded-3 mb-3 mb-md-0 border",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "small text-muted d-block mb-1",
													children: "Target Nominal (Otomatis dari Setoran Bulanan × Durasi)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "fw-bold text-dark fs-5",
													children: ["Rp ", formatCurrency(calculatedTarget)]
												})]
											})
										})
									}),
									isQurban && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										className: "mb-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
											md: 12,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
												className: "custom-input-group",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Label, {
														className: "form-label d-flex align-items-center fw-semibold",
														children: ["Target Nominal", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-danger ms-1",
															children: "*"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
														ref: firstInputRef,
														type: "text",
														name: "target_amount",
														value: formData.target_amount ? `Rp ${formatCurrency(formData.target_amount)}` : "",
														onChange: handleTargetChange,
														placeholder: "Contoh: Rp 3.500.000",
														className: `custom-flat-input ${errors.target_amount ? "border-danger error-shake" : ""}`,
														isInvalid: !!errors.target_amount,
														disabled: loading,
														inputMode: "numeric"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: errors.target_amount && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
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
																children: errors.target_amount
															})
														})
													}) })
												]
											})
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
										className: "mb-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
											md: 6,
											children: isQurban ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "p-3 bg-light rounded-3 mb-3 mb-md-0 border h-100 d-flex flex-column justify-content-center",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "small text-muted d-block mb-1",
													children: "Setoran Bulanan (Target ÷ Durasi)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "fw-bold text-dark fs-5",
													children: ["Rp ", formatCurrency(calculatedDeposit)]
												})]
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
												className: "custom-input-group",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Label, {
														className: "form-label d-flex align-items-center fw-semibold",
														children: ["Setoran Bulanan", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-danger ms-1",
															children: "*"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
														ref: firstInputRef,
														type: "text",
														name: "monthly_deposit",
														value: formData.monthly_deposit ? `Rp ${formatCurrency(formData.monthly_deposit)}` : "",
														onChange: handleSetoranChange,
														placeholder: "Contoh: Rp 500.000",
														className: `custom-flat-input ${errors.monthly_deposit ? "border-danger error-shake" : ""}`,
														isInvalid: !!errors.monthly_deposit,
														disabled: loading,
														inputMode: "numeric"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: errors.monthly_deposit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
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
																children: errors.monthly_deposit
															})
														})
													}) })
												]
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
											md: 6,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
												className: "custom-input-group",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Label, {
														className: "form-label d-flex align-items-center fw-semibold",
														children: ["Durasi Program (Bulan)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-danger ms-1",
															children: "*"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
														type: "text",
														name: "term_months",
														value: formData.term_months,
														onChange: handleTermChange,
														placeholder: "Contoh: 12",
														className: `custom-flat-input ${errors.term_months ? "border-danger error-shake" : ""}`,
														isInvalid: !!errors.term_months,
														disabled: loading,
														inputMode: "numeric"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: errors.term_months && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
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
																children: errors.term_months
															})
														})
													}) })
												]
											})
										})]
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								variant: "form",
								className: "p-3 p-md-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card.Body, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "form-section-header",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
										className: "fw-bold font-outfit mb-0 text-dark",
										children: "Akad Perjanjian (Wadiah)"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "small text-muted mb-0 mt-3 leading-relaxed font-plus-jakarta",
									children: [
										"Dengan menyetujui, Anda menyatakan sepakat untuk membuka simpanan ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: programData.target_name }),
										" dengan sistem titipan murni (Wadiah Yad Dhamanah). Dana dapat diambil kembali sesuai dengan ketentuan periode dan target yang disepakati."
									]
								})] })
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
						lg: 5,
						xl: 4,
						className: "sticky-summary-column",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
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
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "summary-gradient-card",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "summary-accent-header d-flex justify-content-between align-items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
											className: "fw-bold mb-0 font-outfit text-dark",
											children: "Ringkasan Tabungan"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "summary-badge-premium text-white",
											children: "Program"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-4 bg-white rounded-bottom-4 shadow-sm",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "d-flex justify-content-between align-items-center mb-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted small fw-bold",
													children: "Durasi Program"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "fw-bold fs-5 text-primary",
													children: [formData.term_months || 0, " Bulan"]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBar, {
												now: 100,
												variant: "primary",
												className: "form-pengajuan-progress mb-2",
												style: { height: "6px" }
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "d-flex justify-content-between mt-3 pt-3 border-top",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted small",
													children: "Target Terkumpul"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "fw-bold",
													children: ["Rp ", formatCurrency(calculatedTarget)]
												})]
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
									variant: "form",
									className: "p-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "form-section-header mb-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
												className: "fw-bold font-outfit mb-0 text-dark",
												children: "Pernyataan Persetujuan"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "custom-checkbox-premium",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												id: "akadAgreed",
												checked: formData.akadAgreed,
												onChange: handleAkadChange,
												className: `form-check-input ${errors.akadAgreed ? "is-invalid" : ""}`,
												disabled: loading
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												htmlFor: "akadAgreed",
												className: "form-check-label small ms-2",
												children: "Saya menyetujui akad Wadiah dan syarat ketentuan yang berlaku untuk program ini."
											})]
										}),
										errors.akadAgreed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-danger small mt-1 fw-bold",
											children: errors.akadAgreed
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "d-grid gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "form",
										type: "submit",
										isLoading: loading,
										loadingText: "Memproses Pengajuan...",
										disabled: !formData.akadAgreed,
										className: "w-100 d-flex flex-column align-items-center justify-content-center py-3",
										children: !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "fw-bold",
											style: { fontSize: "16px" },
											children: "Ajukan Sekarang"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
											className: "opacity-75",
											style: { fontSize: "11px" },
											children: "Konfirmasi Pembukaan Rekening"
										})] })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "light",
										className: "w-100 py-2 fw-bold text-muted border-0 shadow-sm",
										onClick: handleBack,
										disabled: loading,
										children: "Batal & Kembali"
									})]
								})
							]
						})
					})]
				})
			})
		})
	});
};
//#endregion
export { FormPengajuanTabungan as default };
