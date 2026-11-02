import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { B as MdCategory, E as Button, F as MdAttachMoney, Pr as useNavigate, R as MdCalendarToday, S as Card_default, V as MdCheckCircle, X as MdInfo, b as Container, ft as MdShield, g as Form_default, h as InputGroup_default, l as Row, pt as MdShoppingBag, st as MdReceiptLong, tt as MdPayment, x as Col } from "./vendor-react-D5pUDmay.js";
import { n as useProfile } from "./ProfileContext-DQCnAT09.js";
import { s as jwtEncode } from "./index-BaUN0sjk.js";
import { t as SwalAlert } from "./SwalAlert-C3kBxD_o.js";
import { t as uJualBeli } from "./UJualBeli-CQrsKJbc.js";
import { n as parseRawNumber, t as formatRupiah } from "./formatRupiah-x0ZMkhue.js";
//#region src/pages/jualBeli/FormPengajuanJualBeli.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var formatCurrency = (amount) => amount.toLocaleString("id-ID", {
	style: "currency",
	currency: "IDR",
	minimumFractionDigits: 0
});
var TIPE_OPTIONS = [
	"Elektronik",
	"Kendaraan",
	"Property"
];
var TERMS_OPTIONS = [
	{
		label: "1x Pembayaran",
		value: "1"
	},
	{
		label: "3x Pembayaran",
		value: "3"
	},
	{
		label: "6x Pembayaran",
		value: "6"
	},
	{
		label: "12x Pembayaran",
		value: "12"
	},
	{
		label: "24x Pembayaran",
		value: "24"
	}
];
var FormSkeleton = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
	className: "g-4 animate-pulse",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
		lg: 7,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default, {
			className: "border-0 shadow-sm rounded-4 p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "d-flex align-items-center gap-2 mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-light rounded-3 animate-pulse placeholder-icon-mock" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-grow-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-light rounded mb-2 animate-pulse placeholder-title-mock" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-light rounded animate-pulse placeholder-subtitle-mock" })]
				})]
			}), [
				1,
				2,
				3,
				4,
				5
			].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-light rounded mb-2 animate-pulse placeholder-label-mock" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-light rounded animate-pulse placeholder-input-mock" })]
			}, i))]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
		lg: 5,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default, {
			className: "border-0 shadow-sm rounded-4 p-4 placeholder-card-right",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-light rounded mb-4 animate-pulse placeholder-sim-title" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-light rounded mb-4 animate-pulse placeholder-sim-value" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-light rounded mb-4 animate-pulse placeholder-sim-term" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-light rounded mb-4 animate-pulse placeholder-sim-detail" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "opacity-10" }),
				[
					1,
					2,
					3
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "d-flex justify-content-between mb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-light rounded animate-pulse placeholder-sim-label" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-light rounded animate-pulse placeholder-sim-val" })]
				}, i))
			]
		})
	})]
});
function FormPengajuanJualBeli() {
	const navigate = useNavigate();
	const { userData } = useProfile();
	const [tipeDipilih, setTipeDipilih] = (0, import_react.useState)("");
	const [namaBarang, setNamaBarang] = (0, import_react.useState)("");
	const [tenorDipilih, setTenorDipilih] = (0, import_react.useState)("12");
	const [nominalHarga, setNominalHarga] = (0, import_react.useState)(0);
	const [nominalDP, setNominalDP] = (0, import_react.useState)(0);
	const [categories, setCategories] = (0, import_react.useState)([]);
	const [terms, setTerms] = (0, import_react.useState)([]);
	const [loadingOptions, setLoadingOptions] = (0, import_react.useState)(true);
	const [errorOptions, setErrorOptions] = (0, import_react.useState)(null);
	const [submissionError, setSubmissionError] = (0, import_react.useState)(null);
	const [validationError, setValidationError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const fetchOptions = async () => {
			try {
				setLoadingOptions(true);
				setErrorOptions(null);
				const response = await uJualBeli.getOptions();
				if (response.data?.status) {
					const fetchedCategories = response.data.data.categories || [];
					const finalCategories = fetchedCategories.length > 0 ? fetchedCategories : TIPE_OPTIONS;
					const fetchedTerms = response.data.data.terms || [];
					const finalTerms = fetchedTerms.length > 0 ? fetchedTerms : TERMS_OPTIONS;
					setCategories(finalCategories);
					setTerms(finalTerms);
					if (finalCategories.length > 0) setTipeDipilih(finalCategories[0]);
				}
			} catch (err) {
				console.error(err);
				setErrorOptions("Gagal memuat opsi dari server. Menggunakan opsi default.");
				setCategories(TIPE_OPTIONS);
				setTerms(TERMS_OPTIONS);
				if (TIPE_OPTIONS.length > 0) setTipeDipilih(TIPE_OPTIONS[0]);
			} finally {
				setLoadingOptions(false);
			}
		};
		fetchOptions();
	}, []);
	const nominalKredit = (0, import_react.useMemo)(() => Math.max(0, Number(nominalHarga) - Number(nominalDP)), [nominalHarga, nominalDP]);
	const { estimasiAngsuran, totalTagihan, marginPercent, keuntunganKoperasi } = (0, import_react.useMemo)(() => {
		const harga = Number(nominalHarga) || 0;
		const dp = Number(nominalDP) || 0;
		if (harga <= 0 || !tenorDipilih) return {
			estimasiAngsuran: 0,
			totalTagihan: 0,
			marginPercent: 0,
			keuntunganKoperasi: 0
		};
		const tenorMonths = parseInt(tenorDipilih);
		const selectedTerm = terms.find((t) => String(t.value) === String(tenorDipilih));
		let margin = 0;
		if (selectedTerm && selectedTerm.persentase_anggota !== void 0) margin = userData?.role_id && Number(userData.role_id) !== 1 ? Number(selectedTerm.persentase_anggota) : Number(selectedTerm.persentase_reguler);
		const profit = harga * (margin / 100);
		const totalUtang = harga + profit;
		const sisaCicilan = Math.max(0, totalUtang - dp);
		return {
			estimasiAngsuran: Math.ceil(sisaCicilan / tenorMonths),
			totalTagihan: totalUtang,
			marginPercent: margin,
			keuntunganKoperasi: profit
		};
	}, [
		nominalHarga,
		nominalDP,
		tenorDipilih,
		terms,
		userData
	]);
	const localValidationError = (0, import_react.useMemo)(() => {
		if (nominalHarga !== "" && Number(nominalHarga) < 0) return "Harga barang tidak boleh kurang dari 0.";
		if (nominalDP !== "" && Number(nominalDP) < 0) return "Uang tanda keseriusan tidak boleh kurang dari 0.";
		if (nominalHarga !== "" && nominalDP !== "" && Number(nominalDP) > Number(nominalHarga)) return "Uang tanda keseriusan tidak boleh melebihi harga barang.";
		return null;
	}, [nominalHarga, nominalDP]);
	const handleSubmit = (0, import_react.useCallback)(async (e) => {
		e.preventDefault();
		setValidationError(null);
		setSubmissionError(null);
		const amountReq = Number(nominalHarga);
		if (amountReq <= 0) {
			setValidationError("Harga barang harus lebih dari 0.");
			return;
		}
		if (!namaBarang.trim()) {
			setValidationError("Nama barang tidak boleh kosong.");
			return;
		}
		if (!tipeDipilih) {
			setValidationError("Tipe barang harus dipilih.");
			return;
		}
		if (Number(nominalDP) > amountReq) {
			setValidationError("Uang tanda keseriusan tidak boleh melebihi harga barang.");
			return;
		}
		try {
			const payload = {
				category: tipeDipilih,
				item_name: namaBarang,
				tenure: parseInt(tenorDipilih),
				amount_requested: amountReq,
				down_payment: Number(nominalDP),
				principal_amount: Number(nominalKredit),
				monthly_installment: Number(estimasiAngsuran),
				margin_percent: marginPercent,
				margin_amount: keuntunganKoperasi,
				total_tagihan: totalTagihan
			};
			const res = await uJualBeli.submitPengajuan(payload);
			if (res.data?.status || res.status) {
				const targetId = res.data?.data?.financing_id;
				navigate(`/${jwtEncode({
					page: "transactionDetailPage",
					financingId: targetId,
					return: "jualBeliPage"
				})}`);
			} else setSubmissionError("Pengajuan gagal diproses. Silakan coba lagi.");
		} catch (error) {
			console.error("Submission error:", error);
			setSubmissionError(error.response?.data?.message || "Terjadi kesalahan saat mengirim pengajuan. Silakan coba lagi.");
		}
	}, [
		nominalHarga,
		namaBarang,
		tipeDipilih,
		nominalDP,
		tenorDipilih,
		nominalKredit,
		estimasiAngsuran,
		marginPercent,
		keuntunganKoperasi,
		totalTagihan,
		navigate
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		fluid: true,
		className: "px-0 py-4",
		children: loadingOptions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormSkeleton, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
			className: "g-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
				lg: 7,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default, {
					className: "border-0 shadow-sm rounded-4 overflow-hidden custom-card",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
						className: "p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "d-flex align-items-center gap-3 mb-4 pb-3 border-bottom border-light",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-primary-soft text-primary rounded-3 p-2.5 d-flex align-items-center justify-content-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdReceiptLong, { size: 24 })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
								className: "fw-bold mb-0 text-slate-800",
								children: "Formulir Pengajuan"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted small",
								children: "Lengkapi rincian pembiayaan barang Anda"
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default, {
							onSubmit: handleSubmit,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
									className: "mb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Label, {
										className: "fw-bold mb-1.5 d-flex align-items-center gap-1.5 small text-muted",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdCategory, { size: 16 }), " Tipe Barang"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup_default, {
										className: "custom-input-group shadow-sm",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Select, {
											className: "fw-bold text-slate-800",
											value: tipeDipilih,
											onChange: (e) => setTipeDipilih(e.target.value),
											disabled: loadingOptions,
											children: categories.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: t,
												children: t
											}, t))
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
									className: "mb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Label, {
										className: "fw-bold mb-1.5 d-flex align-items-center gap-1.5 small text-muted",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdShoppingBag, { size: 16 }), " Nama Barang"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup_default, {
										className: "custom-input-group shadow-sm",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
											type: "text",
											className: "fw-bold text-slate-800",
											placeholder: "Contoh: Laptop Asus ROG, Honda Vario",
											value: namaBarang,
											onChange: (e) => setNamaBarang(e.target.value),
											required: true
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
									className: "mb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Label, {
										className: "fw-bold mb-1.5 d-flex align-items-center gap-1.5 small text-muted",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdAttachMoney, { size: 16 }), " Harga Barang"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup_default, {
										className: "custom-input-group shadow-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup_default.Text, {
											className: "fw-bold",
											children: "Rp"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
											type: "text",
											className: "fw-bold text-slate-800 border-start-0",
											placeholder: "0",
											value: formatRupiah(nominalHarga),
											onChange: (e) => {
												const val = parseRawNumber(e.target.value);
												setNominalHarga(val ? Number(val) : 0);
											}
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
									className: "mb-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Label, {
											className: "fw-bold mb-1.5 d-flex align-items-center gap-1.5 small text-muted",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdPayment, { size: 16 }), " Uang Tanda Keseriusan"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup_default, {
											className: "custom-input-group shadow-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup_default.Text, {
												className: "fw-bold",
												children: "Rp"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
												type: "text",
												className: "fw-bold text-slate-800 border-start-0",
												placeholder: "0",
												value: formatRupiah(nominalDP),
												onChange: (e) => {
													const val = parseRawNumber(e.target.value);
													setNominalDP(val ? Number(val) : 0);
												}
											})]
										}),
										Number(nominalHarga) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "d-flex gap-2 mt-2.5 flex-wrap",
											children: [
												0,
												10,
												20,
												30
											].map((pct) => {
												const calculatedDP = Math.floor(Number(nominalHarga) * (pct / 100));
												return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													type: "button",
													onClick: () => setNominalDP(calculatedDP),
													className: `btn-quick-dp ${Number(nominalDP) === calculatedDP ? "active" : ""}`,
													children: [
														pct,
														"% (",
														pct === 0 ? "Tanpa Uang Keseriusan" : `Rp ${formatRupiah(calculatedDP)}`,
														")"
													]
												}, pct);
											})
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
									className: "mb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Label, {
										className: "fw-bold mb-1.5 d-flex align-items-center gap-1.5 small text-muted",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdCalendarToday, { size: 16 }), " Jangka Waktu (Tenor)"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup_default, {
										className: "custom-input-group shadow-sm",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Select, {
											className: "fw-bold text-slate-800",
											value: tenorDipilih,
											onChange: (e) => setTenorDipilih(e.target.value),
											disabled: loadingOptions,
											children: terms.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: opt.value,
												children: opt.label
											}, opt.value))
										})
									})]
								})
							]
						})]
					})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
				lg: 5,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sticky-lg-top sticky-calc-panel",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default, {
							className: "border-0 shadow-sm rounded-4 overflow-hidden premium-calc-card text-white mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
								className: "p-4 d-flex flex-column h-100",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "d-flex align-items-center gap-2.5 mb-3 pb-3 border-bottom border-white border-opacity-10",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdShield, {
											size: 22,
											className: "text-warning"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
											className: "fw-bold mb-0 text-white",
											children: "Simulasi Pembiayaan"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-white-50 small",
											children: "Prinsip Syariah (Murabahah)"
										})] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "sim-title d-block mb-1",
												children: "Total Tagihan (Termasuk Margin)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
												className: "sim-value-large text-warning mb-1",
												children: formatCurrency(totalTagihan)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-white-50 small",
												children: ["Tenor: ", terms.find((t) => String(t.value) === String(tenorDipilih))?.label || `${tenorDipilih}x Pembayaran`]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "pt-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "sim-detail-row",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "sim-detail-label",
													children: "Harga Barang"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "sim-detail-val",
													children: formatCurrency(Number(nominalHarga || 0))
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "sim-detail-row",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "sim-detail-label",
													children: "Uang Tanda Keseriusan"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "sim-detail-val",
													children: formatCurrency(Number(nominalDP || 0))
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "sim-detail-row",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "sim-detail-label",
													children: "Pokok Pembiayaan"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "sim-detail-val text-warning fw-bold",
													children: formatCurrency(nominalKredit)
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "sim-detail-row",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "sim-detail-label",
													children: [
														"Keuntungan Koperasi (",
														marginPercent,
														"%)"
													]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "sim-detail-val",
													children: formatCurrency(keuntunganKoperasi)
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "sim-detail-row",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "sim-detail-label",
													children: "Lama Term"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "sim-detail-val",
													children: terms.find((t) => String(t.value) === String(tenorDipilih))?.label || `${tenorDipilih}x Pembayaran`
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "sim-detail-row border-top border-white border-opacity-10 pt-3 mt-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "sim-detail-label",
													children: "Estimasi Cicilan"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "sim-detail-val text-warning fw-bold",
													children: [formatCurrency(estimasiAngsuran), " / Bulan"]
												})]
											})
										]
									})
								]
							})
						}),
						localValidationError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SwalAlert, {
							variant: "danger",
							className: "mb-3 d-flex align-items-center gap-2 rounded-3 border-0 py-2.5 px-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdInfo, {
								className: "flex-shrink-0",
								size: 20
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "small fw-semibold",
								children: localValidationError
							})]
						}),
						validationError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SwalAlert, {
							variant: "danger",
							className: "mb-3 d-flex align-items-center gap-2 rounded-3 border-0 py-2.5 px-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdInfo, {
								className: "flex-shrink-0",
								size: 20
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "small fw-semibold",
								children: validationError
							})]
						}),
						submissionError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SwalAlert, {
							variant: "danger",
							className: "mb-3 d-flex align-items-center gap-2 rounded-3 border-0 py-2.5 px-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdInfo, {
								className: "flex-shrink-0",
								size: 20
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "small fw-semibold",
								children: submissionError
							})]
						}),
						errorOptions && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SwalAlert, {
							variant: "warning",
							className: "mb-3 d-flex align-items-center gap-2 rounded-3 border-0 py-2.5 px-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdInfo, {
								className: "flex-shrink-0",
								size: 20
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "small fw-semibold",
								children: errorOptions
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "submit",
							onClick: handleSubmit,
							className: "w-100 fw-bold py-3 shadow d-flex align-items-center justify-content-center gap-2 premium-btn-submit",
							disabled: nominalKredit <= 0 || !namaBarang || loadingOptions || !!localValidationError,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdCheckCircle, { size: 20 }), "Proses Pengajuan"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3 bg-white rounded-4 shadow-sm border border-light d-flex align-items-start gap-3 mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdInfo, {
								size: 24,
								className: "text-info flex-shrink-0 mt-0.5"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
								className: "fw-bold text-slate-800 mb-1 info-title",
								children: "Catatan Penting"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted mb-0 small info-desc",
								children: "Perhitungan di atas merupakan estimasi sementara. Akad pembiayaan menggunakan prinsip Murabahah yang transparan tanpa bunga/riba tersembunyi."
							})] })]
						})
					]
				})
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        .form-page-container {
          width: 100%;
          max-width: 100%;
        }
        .hover-primary {
          transition: all 0.2s ease;
        }
        .hover-primary:hover {
          color: #0369a1 !important;
          transform: translateX(-3px);
        }
        .bg-primary-soft {
          background-color: rgba(3, 105, 161, 0.1);
        }
        .custom-card {
          border: 1px solid #e2e8f0;
        }
        .custom-input-group {
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #cbd5e1;
          transition: all 0.2s ease;
        }
        .custom-input-group:focus-within {
          border-color: #0369a1;
          box-shadow: 0 0 0 4px rgba(3, 105, 161, 0.1);
        }
        .custom-input-group .form-control,
        .custom-input-group .form-select {
          border: none !important;
          box-shadow: none !important;
          font-size: 14.5px;
          padding: 11px 14px;
        }
        .custom-input-group .input-group-text {
          border: none !important;
          background-color: #f8fafc;
          color: #64748b;
          font-size: 14.5px;
          padding-left: 16px;
          padding-right: 16px;
        }
        .btn-quick-dp {
          background: #f1f5f9;
          border: 1px solid #cbd5e1;
          color: #475569;
          font-size: 11px;
          font-weight: 700;
          padding: 6px 12px;
          border-radius: 99px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .btn-quick-dp:hover {
          background: #e2e8f0;
          color: #0f172a;
          transform: translateY(-1px);
        }
        .btn-quick-dp.active {
          background: #0369a1;
          border-color: #0369a1;
          color: #ffffff;
          box-shadow: 0 4px 10px rgba(3, 105, 161, 0.15);
        }
        .btn-metode {
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          color: #475569;
          font-size: 13.5px;
          transition: all 0.2s ease;
        }
        .btn-metode:hover {
          background: #f1f5f9;
          color: #0f172a;
        }
        .btn-metode.active {
          background: #e0f2fe;
          border-color: #0369a1;
          color: #0369a1;
          box-shadow: 0 0 0 3px rgba(3, 105, 161, 0.15);
        }
        .premium-calc-card {
          background: linear-gradient(135deg, #0c4a6e 0%, #0284c7 100%);
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          position: relative;
          border-radius: 24px;
          overflow: hidden;
        }
        .premium-calc-card::before {
          content: "";
          position: absolute;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%);
          top: -50px;
          right: -50px;
          border-radius: 50%;
          pointer-events: none;
        }
        .sim-title {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          opacity: 0.85;
          font-weight: 700;
          color: #e0f2fe;
        }
        .sim-value-large {
          font-size: 28px;
          font-weight: 800;
          letter-spacing: -0.5px;
          font-family: 'Outfit', 'Inter', sans-serif;
        }
        .sim-detail-row {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .sim-detail-row:last-child {
          border-bottom: none;
        }
        .sim-detail-label {
          font-size: 13.5px;
          opacity: 0.9;
          color: #f0f9ff;
        }
        .sim-detail-val {
          font-size: 13.5px;
          font-weight: 700;
          color: #ffffff;
        }
        .premium-btn-submit {
          background-color: #0369a1 !important;
          border-color: #0369a1 !important;
          border-radius: 14px !important;
          padding: 12.5px !important;
          font-size: 15px;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .premium-btn-submit:hover:not(:disabled) {
          background-color: #0284c7 !important;
          border-color: #0284c7 !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(3, 105, 161, 0.3) !important;
        }
        .premium-btn-submit:active:not(:disabled) {
          transform: translateY(0);
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @media (max-width: 991px) {
          .sticky-lg-top {
            position: static !important;
          }
        }

        /* Mock Skeleton styles */
        .placeholder-icon-mock {
          width: 38px;
          height: 38px;
        }
        .placeholder-title-mock {
          width: 120px;
          height: 16px;
        }
        .placeholder-subtitle-mock {
          width: 200px;
          height: 12px;
        }
        .placeholder-label-mock {
          width: 80px;
          height: 14px;
        }
        .placeholder-input-mock {
          width: 100%;
          height: 42px;
        }
        .placeholder-card-right {
          height: 380px;
          background: #f8fafc;
        }
        .placeholder-sim-title {
          width: 120px;
          height: 14px;
        }
        .placeholder-sim-value {
          width: 200px;
          height: 28px;
        }
        .placeholder-sim-term {
          width: 100px;
          height: 12px;
        }
        .placeholder-sim-detail {
          width: 180px;
          height: 24px;
        }
        .placeholder-sim-label {
          width: 90px;
          height: 14px;
        }
        .placeholder-sim-val {
          width: 110px;
          height: 14px;
        }

        /* Sticky Calculator & Info panel */
        .sticky-calc-panel {
          top: 130px;
          z-index: 10;
        }
        .info-title {
          font-size: 13px;
        }
        .info-desc {
          line-height: 1.4;
        }
      ` })] });
}
var FormPengajuanJualBeli_default = (0, import_react.memo)(FormPengajuanJualBeli);
//#endregion
export { FormPengajuanJualBeli_default as default };
