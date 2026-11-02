import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, T as require_sweetalert2_all, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { E as Button, Pr as useNavigate, S as Card_default, b as Container, c as Spinner, j as MdAccountBalanceWallet } from "./vendor-react-D5pUDmay.js";
import { s as jwtEncode } from "./index-BaUN0sjk.js";
import { t as uJualBeli } from "./UJualBeli-CQrsKJbc.js";
//#region src/pages/jualBeli/PelunasanPage.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_sweetalert2_all = /* @__PURE__ */ __toESM(require_sweetalert2_all());
var import_jsx_runtime = require_jsx_runtime();
var PelunasanPage = ({ decodedToken }) => {
	const navigate = useNavigate();
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [data, setData] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const fetchData = async () => {
			try {
				if (!decodedToken?.financingId) return;
				const res = await uJualBeli.getFinancingDetail(decodedToken.financingId);
				if (res.data?.status) setData(res.data.data);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [decodedToken]);
	const handleBack = () => {
		navigate(`/${jwtEncode({ page: decodedToken?.return || "jualBeliPage" })}`);
	};
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const handleBayar = async () => {
		try {
			setSubmitting(true);
			const payload = {
				category: "Pelunasan Jual Beli",
				item_name: `Pelunasan ${data.purpose || data.item_name || "Pembiayaan"}`,
				item_price: sisaTagihan,
				amount_requested: sisaTagihan,
				down_payment: 0,
				principal_amount: sisaTagihan,
				tenure: 1,
				monthly_installment: sisaTagihan,
				margin_percent: 0,
				margin_amount: 0,
				total_tagihan: sisaTagihan,
				operational_cost: 0,
				keterangan: `PELUNASAN_REF:${data.financing_id}`
			};
			const res = await uJualBeli.submitPengajuan(payload);
			if (res.data?.status) {
				const newFinancingId = res.data.data.financing_id;
				navigate(`/${jwtEncode({
					page: "transactionDetailPage",
					financingId: newFinancingId,
					return: "jualBeliPage"
				})}`);
			}
		} catch (error) {
			console.error(error);
			import_sweetalert2_all.default.fire({
				title: "Gagal",
				text: "Gagal mengajukan pelunasan: " + (error.response?.data?.message || error.message),
				icon: "error"
			});
		} finally {
			setSubmitting(false);
		}
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		className: "py-5 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
			animation: "border",
			variant: "primary"
		})
	});
	if (!data) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		className: "py-5 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
			className: "text-muted",
			children: "Data tidak ditemukan"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "link",
			onClick: handleBack,
			children: "Kembali"
		})]
	});
	const totalKeseluruhan = Number(data.item_price || data.amount_requested || 0) + Number(data.operational_cost || 0) + Number(data.margin_amount || 0);
	const dp = Number(data.down_payment || 0);
	const totalCicilan = totalKeseluruhan - dp;
	const cicilanTerbayar = data.paid_installment_amount !== void 0 ? Number(data.paid_installment_amount) : Math.max(0, Number(data.paid_amount || 0) - dp);
	const tenure = parseInt(data.tenure || data.term_months || data.cooperation_months || 1);
	const cicilanPerBulan = Math.ceil(totalCicilan / tenure);
	const termTerbayar = data.paid_term_count !== void 0 ? data.paid_term_count : cicilanPerBulan > 0 ? Math.floor(cicilanTerbayar / cicilanPerBulan) : 0;
	const sisaTerm = data.unpaid_term_count !== void 0 ? data.unpaid_term_count : Math.max(0, tenure - termTerbayar);
	const sisaTagihan = data.unpaid_amount !== void 0 ? Number(data.unpaid_amount) : Math.max(0, totalCicilan - cicilanTerbayar);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		fluid: true,
		className: "py-4 px-3 px-md-4 animate-fade-in",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "page-header mb-4",
			style: {
				paddingBottom: "16px",
				borderBottom: "1.5px solid #f1f5f9"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "d-flex align-items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-circle d-flex align-items-center justify-content-center me-3 shadow-sm",
					style: {
						width: "48px",
						height: "48px",
						backgroundColor: "#eff6ff",
						color: "#2563eb",
						flexShrink: 0,
						border: "1px solid #dbeafe"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdAccountBalanceWallet, { size: 24 })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "h4 mb-0 fw-bold",
					style: {
						color: "#02113d",
						fontSize: "20px"
					},
					children: "Konfirmasi Pelunasan"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted mb-0 mt-1",
					style: { fontSize: "13px" },
					children: "Tinjau dan konfirmasi detail pelunasan pembiayaan Anda"
				})] })]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default, {
				className: "border-0 shadow-sm rounded-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default.Header, {
					className: "bg-white border-bottom-0 pt-4 pb-0 px-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
						className: "fw-bold mb-0 text-dark",
						children: "Rincian Pembiayaan"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
					className: "p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "d-flex justify-content-between mb-3 pb-3 border-bottom",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted",
								children: "Total Keseluruhan"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "fw-bold text-dark",
								children: ["Rp ", totalKeseluruhan.toLocaleString("id-ID")]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "d-flex justify-content-between mb-3 pb-3 border-bottom",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted",
								children: "Uang Muka (DP)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "fw-bold text-dark",
								children: ["Rp ", dp.toLocaleString("id-ID")]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "d-flex justify-content-between mb-3 pb-3 border-bottom",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted",
								children: "Total Cicilan"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "fw-bold text-dark",
								children: ["Rp ", totalCicilan.toLocaleString("id-ID")]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "d-flex justify-content-between mb-3 pb-3 border-bottom",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: [
									"Cicilan per Bulan (",
									tenure,
									"x)"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "fw-bold text-dark",
								children: ["Rp ", cicilanPerBulan.toLocaleString("id-ID")]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "d-flex justify-content-between mb-3 pb-3 border-bottom",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted d-block",
								children: "Telah Dibayar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", {
								className: "text-muted",
								children: [termTerbayar, "x term terbayar"]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "fw-bold text-success fs-5",
								children: ["Rp ", cicilanTerbayar.toLocaleString("id-ID")]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "d-flex justify-content-between align-items-center bg-light p-3 rounded-3 mt-4 border border-danger border-opacity-25 bg-danger bg-opacity-10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-danger fw-bold d-block",
								children: [
									"Sisa Tagihan (",
									sisaTerm,
									"x)"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
								className: "text-danger opacity-75",
								children: "Akan dilunasi sekarang"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "fw-bold text-danger fs-4",
								children: ["Rp ", sisaTagihan.toLocaleString("id-ID")]
							})]
						})
					]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default, {
				className: "border-0 shadow-sm rounded-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
					className: "p-4 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-primary bg-opacity-10 text-primary p-4 rounded-circle d-inline-block mb-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdAccountBalanceWallet, { size: 48 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
							className: "text-muted mb-2",
							children: "Total Pembayaran Pelunasan"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "fw-bold text-primary mb-4",
							children: ["Rp ", sisaTagihan.toLocaleString("id-ID")]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "primary",
							size: "lg",
							className: "w-100 py-3 rounded-pill fw-bold shadow-sm d-flex justify-content-center align-items-center btn-hover-lift",
							onClick: handleBayar,
							disabled: sisaTagihan <= 0 || submitting,
							children: submitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
								size: "sm",
								className: "me-2"
							}), " Memproses..."] }) : "Lanjutkan Pembayaran"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 text-muted small",
							children: "Klik tombol di atas untuk melanjutkan ke proses pembayaran."
						})
					]
				})
			})
		})] })]
	});
};
//#endregion
export { PelunasanPage as default };
