const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/tabungan.service-CPFyTv_m.js","assets/rolldown-runtime-Cf1989ZW.js","assets/vendor-rpDlma0K.js"])))=>i.map(i=>d[i]);
import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { D as Badge, Dr as FaUtensils, E as Button, Gn as FaReceipt, Or as FaWallet, Pr as useNavigate, S as Card_default, Tn as FaKaaba, b as Container, c as Spinner, et as MdOutlineDateRange, g as Form_default, hn as FaGraduationCap, l as Row, x as Col, zt as FaCheckCircle } from "./vendor-react-D5pUDmay.js";
import { n as AnimatePresence, t as motion } from "./vendor-framer-fx3iiH1e.js";
import { a as __vitePreload, o as jwtDecodePage, s as jwtEncode } from "./index-BaUN0sjk.js";
import { t as SwalAlert } from "./SwalAlert-C3kBxD_o.js";
import { t as LoadingState } from "./LoadingState-Bg-49PHx.js";
//#region src/pages/tabungan/SetoranTabungan/components/SetoranAccountSummary.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SetoranAccountSummary = ({ productConfig, accountData, formatCurrency }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default, {
		className: "border-0 shadow-sm rounded-4 overflow-hidden mb-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4 text-white d-flex flex-column flex-md-row align-items-md-center justify-content-between position-relative",
			style: { background: productConfig.gradient },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "position-absolute top-0 end-0 h-100 w-50",
					style: { background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1))" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "d-flex align-items-center gap-3 mb-3 mb-md-0 position-relative",
					style: { zIndex: 1 },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-white bg-opacity-25 p-3 rounded-circle backdrop-blur",
						children: productConfig.icon
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "fw-bold mb-1 text-white",
						children: productConfig.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "d-flex align-items-center gap-2 text-white-50 bg-black bg-opacity-25 px-2 py-1 rounded-pill",
						style: { width: "max-content" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaWallet, { size: 12 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
							className: "fw-medium",
							children: accountData?.accountNumber
						})]
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-md-end bg-white bg-opacity-10 p-3 rounded-4 backdrop-blur position-relative",
					style: { zIndex: 1 },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-white-50 mb-1 small fw-medium",
						children: "Saldo Saat Ini"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "fw-bold mb-0 text-white",
						children: ["Rp ", formatCurrency(accountData?.currentBalance)]
					})]
				})
			]
		})
	});
};
//#endregion
//#region src/pages/tabungan/SetoranTabungan/components/SetoranTagihanList.jsx
var SetoranTagihanList = ({ tagihanList, selectedTagihan, handleSelectTagihan, formatCurrency, formatDate }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default, {
		className: "border-0 shadow-sm rounded-4 h-100",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
			className: "p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "d-flex align-items-center justify-content-between mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h5", {
					className: "fw-bold mb-0 text-dark d-flex align-items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaReceipt, { className: "text-primary" }), "Daftar Tagihan"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					bg: "primary",
					pill: true,
					className: "px-3 py-2 bg-opacity-10 text-primary",
					children: [tagihanList.length, " Belum Dibayar"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "d-flex flex-column gap-3 overflow-y-auto pe-2 custom-scrollbar",
				style: { maxHeight: "500px" },
				children: tagihanList.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center py-5 bg-light rounded-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheckCircle, {
							size: 48,
							className: "text-success opacity-50 mb-3"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
							className: "text-secondary fw-medium",
							children: "Tidak ada tagihan tertunggak"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted small mb-0",
							children: "Semua setoran Anda sudah dibayar"
						})
					]
				}) : tagihanList.map((tagihan) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					whileHover: { y: -2 },
					whileTap: { scale: .98 },
					onClick: () => handleSelectTagihan(tagihan),
					className: `p-3 rounded-4 cursor-pointer transition-all border ${selectedTagihan?.id === tagihan.id ? "border-primary bg-primary bg-opacity-10 shadow-sm" : "border-light bg-white hover-bg-light"}`,
					style: { cursor: "pointer" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "d-flex align-items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "form-check custom-radio flex-shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "form-check-input",
									type: "radio",
									name: "tagihan",
									checked: selectedTagihan?.id === tagihan.id,
									onChange: () => handleSelectTagihan(tagihan),
									style: { cursor: "pointer" }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-grow-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
									className: "fw-bold mb-1 text-dark",
									children: tagihan.period
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "d-flex align-items-center gap-2 text-muted small",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdOutlineDateRange, {}),
										"Jatuh Tempo: ",
										formatDate(tagihan.dueDate)
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-end",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h6", {
									className: "fw-bold text-primary mb-1",
									children: ["Rp ", formatCurrency(tagihan.amount)]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									bg: "warning",
									className: "text-dark bg-opacity-25 rounded-pill px-2",
									children: "Belum Bayar"
								})]
							})
						]
					})
				}, tagihan.id))
			})]
		})
	});
};
//#endregion
//#region src/pages/tabungan/SetoranTabungan/components/SetoranPaymentSummary.jsx
var SetoranPaymentSummary = ({ selectedTagihan, flexibleAmount, setFlexibleAmount, handleProsesSetoran, submitting, formatCurrency, formatDate }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default, {
		className: "border-0 shadow-sm rounded-4 overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bg-primary bg-opacity-10 p-4 border-bottom border-primary border-opacity-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
				className: "fw-bold text-primary mb-0",
				children: "Ringkasan Pembayaran"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default.Body, {
			className: "p-4",
			children: !selectedTagihan ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center py-4 text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaReceipt, {
					size: 32,
					className: "opacity-25 mb-3"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-0 small",
					children: "Pilih tagihan di samping untuk melihat detail dan melakukan pembayaran."
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
				mode: "wait",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 10
					},
					animate: {
						opacity: 1,
						y: 0
					},
					exit: {
						opacity: 0,
						y: -10
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "d-flex justify-content-between align-items-center mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted small",
								children: "Periode"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "fw-bold text-dark",
								children: selectedTagihan.period
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted small",
								children: "Jatuh Tempo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "fw-medium text-dark",
								children: formatDate(selectedTagihan.dueDate)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
							className: "mb-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Label, {
									className: "fw-bold text-dark small d-flex justify-content-between",
									children: ["Nominal Setoran", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-primary fw-medium",
										children: ["Min. Rp ", formatCurrency(selectedTagihan.amount)]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "input-group input-group-lg shadow-sm rounded-3 overflow-hidden border",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "input-group-text bg-light border-0 fw-bold text-secondary",
										children: "Rp"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
										type: "number",
										value: flexibleAmount,
										onChange: (e) => setFlexibleAmount(e.target.value),
										min: selectedTagihan.amount,
										className: "border-0 fw-bold text-dark fs-5 shadow-none",
										style: { paddingLeft: "10px" }
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Text, {
									className: "text-muted small mt-2 d-block",
									children: "Anda dapat menyetor lebih dari nominal tagihan untuk mempercepat target."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3 bg-light rounded-3 mb-4 d-flex justify-content-between align-items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "fw-bold text-secondary",
								children: "Total Bayar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
								className: "fw-bold text-primary mb-0",
								children: ["Rp ", formatCurrency(flexibleAmount || selectedTagihan.amount)]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "primary",
							size: "lg",
							className: "w-100 rounded-pill fw-bold shadow position-relative overflow-hidden",
							onClick: handleProsesSetoran,
							disabled: submitting,
							style: { transition: "all 0.3s" },
							children: submitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "d-flex align-items-center justify-content-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
									animation: "border",
									size: "sm"
								}), " Memproses..."]
							}) : "Bayar Sekarang"
						})
					]
				}, selectedTagihan.id)
			})
		})]
	});
};
//#endregion
//#region src/pages/tabungan/SetoranTabungan/SetoranTabungan.jsx
var TABUNGAN_CONFIG = {
	haji: {
		label: "Tabungan Haji",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaKaaba, { size: 40 }),
		color: "success",
		gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)"
	},
	umrah: {
		label: "Tabungan Umrah",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaKaaba, { size: 40 }),
		color: "primary",
		gradient: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
	},
	pendidikan: {
		label: "Tabungan Pendidikan",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaGraduationCap, { size: 40 }),
		color: "info",
		gradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)"
	},
	qurban: {
		label: "Tabungan Qurban",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUtensils, { size: 40 }),
		color: "warning",
		gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
	}
};
var SetoranTabungan = () => {
	const navigate = useNavigate();
	const [productType, setProductType] = (0, import_react.useState)("haji");
	const [accountData, setAccountData] = (0, import_react.useState)(null);
	const [tagihanList, setTagihanList] = (0, import_react.useState)([]);
	const [selectedTagihan, setSelectedTagihan] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [showInvoice, setShowInvoice] = (0, import_react.useState)(false);
	const [invoiceData, setInvoiceData] = (0, import_react.useState)(null);
	const [flexibleAmount, setFlexibleAmount] = (0, import_react.useState)("");
	const productConfig = TABUNGAN_CONFIG[productType] || TABUNGAN_CONFIG.haji;
	(0, import_react.useEffect)(() => {
		let currentProduct = "haji";
		const pathParts = window.location.pathname.split("/");
		const lastPart = pathParts[pathParts.length - 1];
		try {
			const decoded = jwtDecodePage(lastPart);
			if (decoded?.product && TABUNGAN_CONFIG[decoded.product]) {
				currentProduct = decoded.product;
				setProductType(currentProduct);
			}
		} catch (e) {
			console.error("Error decoding URL:", e);
		}
		const fetchData = async () => {
			try {
				setLoading(true);
				const { default: TabunganService } = await __vitePreload(async () => {
					const { default: TabunganService } = await import("./tabungan.service-CPFyTv_m.js").then((n) => n.n);
					return { default: TabunganService };
				}, __vite__mapDeps([0,1,2]));
				const accountRes = await TabunganService.checkAccountStatus(currentProduct);
				if (accountRes?.data?.hasAccount) {
					setAccountData({
						memberSavingTargetId: accountRes.data.member_saving_target_id,
						accountNumber: `TBG-${accountRes.data.member_saving_target_id.toString().padStart(6, "0")}`,
						currentBalance: accountRes.data.current_balance,
						targetAmount: accountRes.data.target_amount,
						monthlyTarget: accountRes.data.min_monthly_deposit || 0,
						accountName: accountRes.data.target_name || "Tabungan"
					});
					if (accountRes.data.member_saving_target_id) {
						const billsRes = await TabunganService.getTabunganBills(accountRes.data.member_saving_target_id);
						if (billsRes?.data) setTagihanList(billsRes.data.map((bill) => ({
							id: bill.bill_item_id,
							period: bill.description,
							dueDate: bill.due_date,
							amount: bill.amount,
							status: bill.status.toLowerCase(),
							virtualAccount: "Menunggu Pembayaran"
						})));
					}
				}
			} catch (error) {
				console.error("Failed to fetch tabungan data:", error);
				setError("Gagal memuat data rekening tabungan.");
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);
	const formatCurrency = (0, import_react.useCallback)((value) => {
		return new Intl.NumberFormat("id-ID").format(value);
	}, []);
	const formatDate = (0, import_react.useCallback)((dateString) => {
		return new Date(dateString).toLocaleDateString("id-ID", {
			day: "numeric",
			month: "long",
			year: "numeric"
		});
	}, []);
	const handleSelectTagihan = (0, import_react.useCallback)((tagihan) => {
		setSelectedTagihan(tagihan);
		setFlexibleAmount(tagihan.amount.toString());
	}, []);
	const handleProsesSetoran = async () => {
		if (!selectedTagihan) return;
		setSubmitting(true);
		setError(null);
		try {
			const { default: TabunganService } = await __vitePreload(async () => {
				const { default: TabunganService } = await import("./tabungan.service-CPFyTv_m.js").then((n) => n.n);
				return { default: TabunganService };
			}, __vite__mapDeps([0,1,2]));
			const paymentAmount = flexibleAmount ? parseFloat(flexibleAmount) : selectedTagihan.amount;
			const paymentData = {
				bill_item_ids: [selectedTagihan.id],
				amount: paymentAmount,
				tx_category: "TABUNGAN_DEPOSIT",
				payment_method: "BANK_TRANSFER"
			};
			const response = await TabunganService.processPayment(paymentData);
			if (response?.data?.snapToken || response?.data?.billId) navigate(`/${jwtEncode({
				page: "invoicePage",
				billItemIds: [selectedTagihan.id],
				billId: response.data.billId,
				category: "TABUNGAN_DEPOSIT",
				return: "setoranTabungan",
				product: productType,
				id: accountData.member_saving_target_id
			})}`);
			else if (response?.data?.redirect_url) window.location.href = response.data.redirect_url;
			else navigate(`/${jwtEncode({
				page: "invoicePage",
				billItemIds: [selectedTagihan.id],
				billId: response?.data?.billId,
				status: "success",
				return: "setoranTabungan",
				product: productType,
				id: accountData.member_saving_target_id
			})}`);
		} catch (err) {
			setError(err?.response?.data?.message || "Gagal memproses pembayaran");
			setSubmitting(false);
		}
	};
	(0, import_react.useCallback)(() => {
		navigate(`/${jwtEncode({
			page: "detailTabungan",
			product: productType
		})}`);
	}, [navigate, productType]);
	(0, import_react.useCallback)(() => {
		navigate(`/${jwtEncode({
			page: "detailTabungan",
			product: productType
		})}`);
	}, [navigate, productType]);
	const cardVariants = {
		hidden: {
			opacity: 0,
			y: 20
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: .4 }
		}
	};
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: .1 }
		}
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingState, {
		size: "lg",
		message: "Memuat data tagihan...",
		minHeight: "100vh",
		className: "bg-light"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		className: "py-4 pb-5 min-vh-100 bg-light",
		fluid: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
			className: "justify-content-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
				lg: 10,
				xl: 9,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					variants: containerVariants,
					initial: "hidden",
					animate: "visible",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							variants: cardVariants,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetoranAccountSummary, {
								productConfig,
								accountData,
								formatCurrency
							})
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							variants: cardVariants,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SwalAlert, {
								variant: "danger",
								className: "border-0 shadow-sm rounded-4 mb-4 d-flex align-items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaReceipt, {}),
									" ",
									error
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
							className: "g-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
								lg: 7,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									variants: cardVariants,
									className: "h-100",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetoranTagihanList, {
										tagihanList,
										selectedTagihan,
										handleSelectTagihan,
										formatCurrency,
										formatDate
									})
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
								lg: 5,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									variants: cardVariants,
									className: "position-sticky",
									style: { top: "2rem" },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetoranPaymentSummary, {
										selectedTagihan,
										flexibleAmount,
										setFlexibleAmount,
										handleProsesSetoran,
										submitting,
										formatCurrency,
										formatDate
									})
								})
							})]
						})
					]
				})
			})
		})
	});
};
//#endregion
export { SetoranTabungan as default };
