import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, T as require_sweetalert2_all, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { Bn as FaPlus, Dr as FaUtensils, E as Button, Pr as useNavigate, S as Card_default, Tn as FaKaaba, bn as FaHistory, bt as FaArrowLeft, c as Spinner, g as Form_default, hn as FaGraduationCap, l as Row, o as Table, p as Modal_default, x as Col } from "./vendor-react-D5pUDmay.js";
import { t as api } from "./common-qX05v8MF.js";
import { n as useProfile } from "./ProfileContext-DQCnAT09.js";
import { o as jwtDecodePage, s as jwtEncode } from "./index-BaUN0sjk.js";
import { t as SwalAlert } from "./SwalAlert-C3kBxD_o.js";
import { t as StatusBadge } from "./StatusBadge-e4PjUSZw.js";
//#region src/pages/tabungan/DetailTabungan/components/DetailSkeleton.jsx
var import_sweetalert2_all = /* @__PURE__ */ __toESM(require_sweetalert2_all());
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DetailSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "detail-animate-pulse",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "d-flex align-items-center gap-3 mb-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-light rounded-3",
						style: {
							width: 56,
							height: 56
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-grow-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-light rounded-3 mb-2",
							style: {
								width: 180,
								height: 20
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-light rounded-3",
							style: {
								width: 140,
								height: 14
							}
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-light rounded-pill",
						style: {
							width: 70,
							height: 28
						}
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row g-3 mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "col-md-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "detail-skeleton-balance" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "col-md-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "detail-skeleton-balance" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "detail-skeleton-progress mb-4" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row g-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "col-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "detail-skeleton-stat" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "col-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "detail-skeleton-stat" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "col-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "detail-skeleton-stat" })
					})
				]
			})
		]
	});
}
//#endregion
//#region src/pages/tabungan/DetailTabungan/components/tabunganHelpers.jsx
var TABUNGAN_CONFIG = {
	haji: {
		label: "Tabungan Haji",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaKaaba, { size: 32 }),
		color: "success"
	},
	umrah: {
		label: "Tabungan Umrah",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaKaaba, { size: 32 }),
		color: "primary"
	},
	pendidikan: {
		label: "Tabungan Pendidikan",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaGraduationCap, { size: 32 }),
		color: "info"
	},
	qurban: {
		label: "Tabungan Qurban",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUtensils, { size: 32 }),
		color: "warning"
	}
};
var normalizeBankName = (bankName) => {
	if (!bankName) return "Bank Syariah Indonesia";
	const name = bankName.toLowerCase();
	if (name.includes("syariah") || name.includes("bsi")) return "Bank Syariah Indonesia";
	if (name.includes("mandiri")) return "Bank Mandiri";
	if (name.includes("bca") || name.includes("central asia")) return "BCA";
	if (name.includes("bri") || name.includes("rakyat indonesia")) return "BRI";
	if (name.includes("bni") || name.includes("negara indonesia")) return "BNI";
	return "Bank Syariah Indonesia";
};
var formatCurrency = (value) => {
	if (value === void 0 || value === null) return "0";
	return new Intl.NumberFormat("id-ID").format(value);
};
var formatDate = (dateString) => {
	if (!dateString) return "-";
	return new Date(dateString).toLocaleDateString("id-ID", {
		day: "numeric",
		month: "long",
		year: "numeric"
	});
};
//#endregion
//#region src/pages/tabungan/DetailTabungan/components/AccountInfoCard.jsx
function AccountInfoCard({ productConfig, accountData, progressPercentage }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default, {
		className: "shadow-lg border-0 mb-4 detail-tabungan-main-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "d-flex justify-content-between align-items-start mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "d-flex align-items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `detail-icon-wrapper bg-light rounded-3 me-3 text-${productConfig.color}`,
						children: productConfig.icon
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
						className: "fw-bold mb-1",
						children: productConfig.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-muted mb-0 small",
						children: ["No. Rekening: ", accountData.accountNumber]
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
					status: "Aktif",
					size: "lg"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
				className: "g-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
					md: 6,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default, {
						className: "bg-light border-0 h-100 detail-balance-card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
							className: "p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted mb-1 small",
								children: "Saldo Saat Ini"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
								className: "fw-bold text-primary mb-0",
								children: ["Rp ", formatCurrency(accountData.currentBalance)]
							})]
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
					md: 6,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default, {
						className: "bg-light border-0 h-100 detail-balance-card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
							className: "p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted mb-1 small",
								children: "Target Saldo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
								className: "fw-bold text-success mb-0",
								children: ["Rp ", formatCurrency(accountData.targetAmount)]
							})]
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "d-flex justify-content-between mb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted small",
						children: "Progress"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "fw-bold small",
						children: [progressPercentage, "%"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "detail-progress",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "detail-progress-bar bg-success",
						style: { width: `${progressPercentage}%` },
						role: "progressbar",
						"aria-valuenow": progressPercentage,
						"aria-valuemin": "0",
						"aria-valuemax": "100"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
				className: "mt-4 g-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
						md: 4,
						xs: 4,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center p-3 bg-light detail-stat-item",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted mb-1",
								children: "Setoran Awal"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "fw-bold mb-0",
								children: ["Rp ", formatCurrency(accountData.initialDeposit)]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
						md: 4,
						xs: 4,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center p-3 bg-light detail-stat-item",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted mb-1",
								children: "Target Bulanan"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "fw-bold mb-0",
								children: ["Rp ", formatCurrency(accountData.monthlyTarget)]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
						md: 4,
						xs: 4,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center p-3 bg-light detail-stat-item",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted mb-1",
								children: "Sisa Tenor"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "fw-bold mb-0",
								children: [accountData.tenor, " Bulan"]
							})]
						})
					})
				]
			})
		] })
	});
}
//#endregion
//#region src/pages/tabungan/DetailTabungan/components/ActionButtonsCard.jsx
function ActionButtonsCard({ progressPercentage, onSetoran, onPencairan, onPengajuanBaru }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default, {
		className: "shadow-sm border-0 mb-4 detail-actions-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
			className: "p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
				className: "fw-bold mb-3",
				children: "Menu Aksi"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "d-flex gap-2 flex-wrap",
				children: [progressPercentage < 100 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "primary",
					className: "px-4 py-2 shadow-sm",
					onClick: onSetoran,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaPlus, { className: "me-2" }), "Setoran"]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "success",
					className: "px-4 py-2 shadow-sm",
					onClick: onPencairan,
					children: "Pencairan"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline-secondary",
					className: "px-4 py-2",
					onClick: onPengajuanBaru,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaPlus, { className: "me-2" }), "Pengajuan Baru"]
				})]
			})]
		})
	});
}
//#endregion
//#region src/pages/tabungan/DetailTabungan/components/TransactionHistoryTable.jsx
function TransactionHistoryTable({ transactions }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default, {
		className: "shadow-sm border-0 detail-history-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
			className: "p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "d-flex justify-content-between align-items-center mb-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h6", {
					className: "fw-bold mb-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaHistory, { className: "me-2" }), "Riwayat Transaksi"]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "table-responsive",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
					hover: true,
					className: "align-middle mb-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Tanggal" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Jenis Transaksi" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "text-end",
							children: "Nominal"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "text-end",
							children: "Saldo"
						})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: transactions && transactions.length > 0 ? transactions.map((tx, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "text-nowrap",
							children: formatDate(tx.date)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: tx.type }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "text-end text-success fw-medium",
							children: ["+Rp ", formatCurrency(tx.amount)]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "text-end fw-bold",
							children: ["Rp ", formatCurrency(tx.balance)]
						})
					] }, index)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 4,
						className: "text-center text-muted py-3",
						children: "Belum ada riwayat transaksi."
					}) }) })]
				})
			})]
		})
	});
}
//#endregion
//#region src/pages/tabungan/DetailTabungan/components/WithdrawalModal.jsx
function WithdrawalModal({ show, onHide, currentBalance, withdrawData, onChange, onSubmit, isSubmitting }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal_default, {
		show,
		onHide,
		centered: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default, {
			onSubmit,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal_default.Header, {
					closeButton: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal_default.Title, { children: "Form Pencairan Tabungan" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal_default.Body, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SwalAlert, {
						variant: "info",
						className: "mb-3",
						children: [
							"Anda akan mencairkan seluruh saldo terkumpul sebesar",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: ["Rp ", formatCurrency(currentBalance || 0)] }),
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
						className: "mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, { children: "Metode Pencairan" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Select, {
							value: withdrawData.method,
							onChange: (e) => onChange({
								...withdrawData,
								method: e.target.value
							}),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "TRANSFER",
									children: "Transfer Bank"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "TUNAI",
									children: "Ambil Tunai"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "SIMPANAN",
									children: "Pindahkan ke Saldo Simpanan Koperasi"
								})
							]
						})]
					}),
					withdrawData.method === "TRANSFER" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
						className: "mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, { children: "Nama Bank" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
							required: true,
							placeholder: "Contoh: BCA, BSI, Mandiri",
							value: withdrawData.bank_name,
							onChange: (e) => onChange({
								...withdrawData,
								bank_name: e.target.value
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
						className: "mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, { children: "No Rekening" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
							required: true,
							placeholder: "Nomor rekening tujuan",
							value: withdrawData.bank_account_no,
							onChange: (e) => onChange({
								...withdrawData,
								bank_account_no: e.target.value
							})
						})]
					})] }),
					withdrawData.method === "SIMPANAN" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwalAlert, {
						variant: "info",
						className: "mb-3",
						children: "Dana pencairan akan dipindahkan ke saldo Simpanan Koperasi Anda dan bisa dicairkan kapan saja melalui menu Tarik Tunai."
					}),
					withdrawData.method === "TUNAI" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
							className: "mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, { children: "Nama Pengambil" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
								required: true,
								value: withdrawData.cash_name,
								onChange: (e) => onChange({
									...withdrawData,
									cash_name: e.target.value
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
							className: "mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, { children: "Lokasi Pengambilan" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
								required: true,
								placeholder: "Contoh: Kantor Cabang Utama",
								value: withdrawData.cash_location,
								onChange: (e) => onChange({
									...withdrawData,
									cash_location: e.target.value
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
							className: "mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, { children: "Waktu Pengambilan" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
								type: "date",
								required: true,
								value: withdrawData.cash_time,
								onChange: (e) => onChange({
									...withdrawData,
									cash_time: e.target.value
								})
							})]
						})
					] })
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal_default.Footer, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: onHide,
					disabled: isSubmitting,
					children: "Batal"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "primary",
					type: "submit",
					disabled: isSubmitting,
					children: isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
						size: "sm",
						animation: "border"
					}) : "Ajukan Pencairan"
				})] })
			]
		})
	});
}
//#endregion
//#region src/pages/tabungan/DetailTabungan/DetailTabungan.jsx
var DetailTabungan = () => {
	const navigate = useNavigate();
	const { userData } = useProfile();
	const [productType, setProductType] = (0, import_react.useState)("haji");
	const [tabunganId, setTabunganId] = (0, import_react.useState)(null);
	const [accountData, setAccountData] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const [showWithdrawModal, setShowWithdrawModal] = (0, import_react.useState)(false);
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const [autoOpenWithdraw, setAutoOpenWithdraw] = (0, import_react.useState)(false);
	const [withdrawData, setWithdrawData] = (0, import_react.useState)({
		method: "TRANSFER",
		bank_name: "",
		bank_account_no: "",
		cash_name: "",
		cash_time: "",
		cash_location: ""
	});
	(0, import_react.useEffect)(() => {
		if (userData) {
			const defaultBankName = normalizeBankName(userData.bank_name || userData.bank_info?.bank_name || "");
			const defaultAccountNo = userData.bank_account_no || userData.bank_info?.bank_account_no || "";
			setWithdrawData((prev) => ({
				...prev,
				bank_name: prev.bank_name || defaultBankName,
				bank_account_no: prev.bank_account_no || defaultAccountNo
			}));
		}
	}, [userData]);
	const productConfig = TABUNGAN_CONFIG[productType] || TABUNGAN_CONFIG.haji;
	(0, import_react.useEffect)(() => {
		const pathParts = window.location.pathname.split("/");
		const lastPart = pathParts[pathParts.length - 1];
		try {
			const decoded = jwtDecodePage(lastPart);
			if (decoded?.product && TABUNGAN_CONFIG[decoded.product]) setProductType(decoded.product);
			if (decoded?.tabunganId) setTabunganId(decoded.tabunganId);
			if (decoded?.action === "withdraw") setAutoOpenWithdraw(true);
		} catch (e) {
			console.error("Error decoding URL:", e);
		}
		setTimeout(() => {
			setAccountData({
				accountNumber: "TBG-2024-001234",
				accountName: "Ahmad Fauzi",
				targetAmount: 25e6,
				currentBalance: 25e6,
				initialDeposit: 5e5,
				tenor: 60,
				startDate: "2024-01-15",
				endDate: "2029-01-15",
				monthlyTarget: 416667,
				status: "active",
				transactions: [
					{
						date: "2024-01-15",
						type: "Setoran Awal",
						amount: 5e5,
						balance: 5e5
					},
					{
						date: "2024-02-15",
						type: "Setoran Bulanan",
						amount: 416667,
						balance: 916667
					},
					{
						date: "2024-03-15",
						type: "Setoran Bulanan",
						amount: 416667,
						balance: 1333334
					},
					{
						date: "2024-04-15",
						type: "Setoran Bulanan",
						amount: 416667,
						balance: 1750001
					},
					{
						date: "2024-05-15",
						type: "Setoran Bulanan",
						amount: 416667,
						balance: 2166668
					}
				]
			});
			setLoading(false);
		}, 1e3);
	}, []);
	const progressPercentage = accountData ? Math.round(accountData.currentBalance / accountData.targetAmount * 100) : 0;
	(0, import_react.useEffect)(() => {
		if (accountData && autoOpenWithdraw) {
			if (progressPercentage >= 100) setShowWithdrawModal(true);
			setAutoOpenWithdraw(false);
		}
	}, [
		accountData,
		autoOpenWithdraw,
		progressPercentage
	]);
	const handleSetoran = (0, import_react.useCallback)(() => {
		navigate(`/${jwtEncode({
			page: "setoranTabungan",
			product: productType
		})}`);
	}, [navigate, productType]);
	const handlePengajuanBaru = (0, import_react.useCallback)(() => {
		navigate(`/${jwtEncode({
			page: "formPengajuanTabungan",
			product: productType
		})}`);
	}, [navigate, productType]);
	const handleBack = (0, import_react.useCallback)(() => {
		navigate(`/${jwtEncode({ page: "tabunganPage" })}`);
	}, [navigate]);
	const handlePencairanClick = (0, import_react.useCallback)(() => {
		if (progressPercentage < 100) {
			import_sweetalert2_all.default.fire({
				title: "Perhatian",
				text: "Tabungan baru bisa dicairkan jika target nominal terpenuhi.",
				icon: "warning"
			});
			return;
		}
		setShowWithdrawModal(true);
	}, [progressPercentage]);
	const handleWithdrawSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			const targetId = tabunganId || accountData?.memberSavingTargetId || "dummy-id";
			const payload = {
				method: withdrawData.method,
				bank_name: withdrawData.method === "TRANSFER" ? withdrawData.bank_name : null,
				bank_account_no: withdrawData.method === "TRANSFER" ? withdrawData.bank_account_no : null,
				cash_name: withdrawData.method === "TUNAI" ? withdrawData.cash_name : null,
				cash_time: withdrawData.method === "TUNAI" ? withdrawData.cash_time : null,
				cash_location: withdrawData.method === "TUNAI" ? withdrawData.cash_location : null
			};
			const res = await api.post(`/tabungan/pengajuan/${targetId}/withdraw`, payload);
			const withdrawalId = res.data?.data?.withdrawal_id || res.data?.data?.id;
			setShowWithdrawModal(false);
			import_sweetalert2_all.default.fire({
				title: "Berhasil",
				text: "Pengajuan pencairan tabungan berhasil dikirim. Menunggu persetujuan.",
				icon: "success"
			}).then(() => {
				navigate(`/${jwtEncode({
					page: "transactionDetailPage",
					withdrawalId,
					tabunganId: targetId,
					return: "tabunganPage",
					product: productConfig?.label || "Tabungan"
				})}`);
			});
		} catch (err) {
			import_sweetalert2_all.default.fire({
				title: "Gagal",
				text: err.response?.data?.message || "Gagal mengajukan pencairan",
				icon: "error"
			});
		} finally {
			setIsSubmitting(false);
		}
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "detail-loading-state p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-100",
			style: { maxWidth: 800 },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "detail-tabungan-header pb-3 mb-4 border-bottom",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "fw-bold mb-0",
					children: "Detail Tabungan"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailSkeleton, {})]
		})
	});
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "detail-error-state",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-100",
			style: { maxWidth: 800 },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "detail-tabungan-header pb-3 mb-4 border-bottom",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "fw-bold mb-0",
						children: "Detail Tabungan"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwalAlert, {
					variant: "danger",
					className: "shadow-sm",
					children: error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "light",
					className: "detail-back-btn px-4 py-2",
					onClick: handleBack,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaArrowLeft, { className: "me-2" }), "Kembali"]
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "detail-tabungan-page pb-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto",
				style: { maxWidth: 900 },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "detail-tabungan-header pt-3 pb-3 mb-4 border-bottom",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "fw-bold mb-0",
						children: ["Detail ", productConfig.label]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "detail-animate-fade-in",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountInfoCard, {
							productConfig,
							accountData,
							progressPercentage
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionButtonsCard, {
							progressPercentage,
							onSetoran: handleSetoran,
							onPencairan: handlePencairanClick,
							onPengajuanBaru: handlePengajuanBaru
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransactionHistoryTable, { transactions: accountData.transactions }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "light",
								className: "detail-back-btn px-4 py-2 fw-bold",
								onClick: handleBack,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaArrowLeft, { className: "me-2" }), "Kembali"]
							})
						})
					]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithdrawalModal, {
			show: showWithdrawModal,
			onHide: () => setShowWithdrawModal(false),
			currentBalance: accountData?.currentBalance,
			withdrawData,
			onChange: setWithdrawData,
			onSubmit: handleWithdrawSubmit,
			isSubmitting
		})]
	});
};
//#endregion
export { DetailTabungan as default };
