import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, T as require_sweetalert2_all, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { Ct as FaBan, D as Badge, E as Button, Pr as useNavigate, S as Card_default, b as Container, c as Spinner, in as FaExclamationCircle, l as Row, x as Col, zt as FaCheckCircle } from "./vendor-react-D5pUDmay.js";
import { t as uBilling } from "./UBilling-DLTCHisI.js";
import { s as jwtEncode } from "./index-BaUN0sjk.js";
import { t as uGlobal } from "./UGlobal-MGBt7b3Z.js";
import { t as LoadingState } from "./LoadingState-Bg-49PHx.js";
//#region src/components/ui/ErrorState.jsx
var import_sweetalert2_all = /* @__PURE__ */ __toESM(require_sweetalert2_all());
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Reusable ErrorState component with optional retry action
* @param {string} title - Error heading
* @param {string} message - Error explanation message
* @param {function} onRetry - Optional callback function for retry button
* @param {string} retryText - Text for retry button (defaults to "Coba Lagi")
* @param {string} minHeight - Minimum container height
* @param {string} className - Additional CSS class names
*/
var ErrorState = ({ title = "Gagal Memuat Data", message = "Terjadi kesalahan saat memproses data. Silakan coba beberapa saat lagi.", onRetry, retryText = "Coba Lagi", minHeight = "200px", className = "" }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `text-center py-5 d-flex flex-column align-items-center justify-content-center ${className}`,
		style: { minHeight },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaExclamationCircle, {
				className: "text-danger mb-3",
				style: { fontSize: "3rem" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
				className: "fw-bold mb-2",
				children: title
			}),
			message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted mb-3 max-w-md",
				children: message
			}),
			onRetry && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline-primary",
				size: "sm",
				onClick: onRetry,
				className: "px-4",
				children: retryText
			})
		]
	});
};
//#endregion
//#region src/pages/anggota/ResignationCheckPage/components/ResignationStatusBanner.jsx
function ResignationStatusBanner({ hasBills }) {
	if (hasBills) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "text-center mb-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rcp-icon-wrapper danger-bg mx-auto mb-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaBan, { className: "rcp-icon text-danger" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "fw-bold text-dark mb-2",
				children: "Tidak Dapat Berhenti Keanggotaan"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted mx-auto",
				style: { maxWidth: "600px" },
				children: "Kami menemukan bahwa Anda masih memiliki kewajiban atau tagihan yang belum diselesaikan. Harap melunasi semua tagihan di bawah ini sebelum Anda dapat mengajukan berhenti keanggotaan."
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "text-center mb-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rcp-icon-wrapper success-bg mx-auto mb-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheckCircle, { className: "rcp-icon text-success" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "fw-bold text-dark mb-2",
				children: "Pengecekan Selesai"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted mx-auto",
				style: { maxWidth: "600px" },
				children: "Anda tidak memiliki kewajiban atau tagihan yang tertunggak. Anda dapat melanjutkan proses pengajuan berhenti keanggotaan."
			})
		]
	});
}
//#endregion
//#region src/utils/formatRupiah.jsx
var formatRupiah = (value) => {
	if (value == null || isNaN(value)) return "Rp0";
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0
	}).format(value);
};
//#endregion
//#region src/pages/anggota/ResignationCheckPage/components/SavingsAndAssetsSection.jsx
function SavingsAndAssetsSection({ savingsInfo, otherAssets }) {
	const totalSimpanan = savingsInfo ? savingsInfo.pokok + savingsInfo.wajib + savingsInfo.sukarela : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		savingsInfo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rcp-savings-section mb-4 p-4 rounded bg-light border border-secondary border-opacity-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
					className: "fw-bold mb-3",
					children: "Informasi Simpanan Anda"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
					className: "g-3 text-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
							md: 4,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-3 bg-white rounded shadow-sm border border-secondary border-opacity-10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
									className: "text-muted d-block",
									children: "Simpanan Pokok"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "fw-bold text-dark fs-5",
									children: formatRupiah(savingsInfo.pokok)
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
							md: 4,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-3 bg-white rounded shadow-sm border border-secondary border-opacity-10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
									className: "text-muted d-block",
									children: "Simpanan Wajib"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "fw-bold text-dark fs-5",
									children: formatRupiah(savingsInfo.wajib)
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
							md: 4,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-3 bg-white rounded shadow-sm border border-secondary border-opacity-10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
									className: "text-muted d-block",
									children: "Simpanan Sukarela"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "fw-bold text-dark fs-5",
									children: formatRupiah(savingsInfo.sukarela)
								})]
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 text-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
						className: "text-muted me-2",
						children: "Total Simpanan:"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "text-primary fs-5",
						children: formatRupiah(totalSimpanan)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted small mt-3 mb-0",
					children: "* Total simpanan ini akan dikembalikan kepada Anda setelah proses pemberhentian keanggotaan disetujui (dikurangi tagihan/kewajiban jika ada dan sesuai AD/ART)."
				})
			]
		}),
		otherAssets && otherAssets.tabunganList.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rcp-savings-section mb-4 p-4 rounded bg-info bg-opacity-10 border border-info border-opacity-25",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
					className: "fw-bold mb-3 text-info-emphasis",
					children: "Informasi Tabungan Anda"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					className: "g-3 text-start",
					children: otherAssets.tabunganList.map((tab, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
						md: 4,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3 bg-white rounded shadow-sm border border-secondary border-opacity-10 h-100",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
								className: "text-muted d-block",
								children: tab.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "fw-bold text-dark fs-5",
								children: formatRupiah(tab.balance)
							})]
						})
					}, idx))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted small mt-3 mb-0",
					children: "* Saldo tabungan ini akan dikembalikan atau diselesaikan sesuai dengan ketentuan koperasi saat pemberhentian keanggotaan Anda disetujui."
				})
			]
		}),
		otherAssets && otherAssets.investasi > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rcp-savings-section mb-4 p-4 rounded bg-info bg-opacity-10 border border-info border-opacity-25",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
					className: "fw-bold mb-3 text-info-emphasis",
					children: "Informasi Investasi Anda"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					className: "g-3 text-start",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
						md: 4,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3 bg-white rounded shadow-sm border border-secondary border-opacity-10 h-100",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
								className: "text-muted d-block",
								children: "Total Investasi"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "fw-bold text-dark fs-5",
								children: formatRupiah(otherAssets.investasi)
							})]
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted small mt-3 mb-0",
					children: "* Saldo investasi ini akan diselesaikan sesuai dengan ketentuan koperasi saat pemberhentian keanggotaan Anda disetujui."
				})
			]
		})
	] });
}
//#endregion
//#region src/pages/anggota/ResignationCheckPage/components/PendingObligationsSection.jsx
function PendingObligationsSection({ jualBeliBill, programBill, pendingBills }) {
	const hasJualBeliBill = jualBeliBill > 0;
	const hasProgramBill = programBill.pinjaman > 0 || programBill.arisan > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `rcp-savings-section mb-5 p-4 rounded border border-opacity-25 ${hasJualBeliBill ? "bg-danger bg-opacity-10 border-danger" : "bg-success bg-opacity-10 border-success"}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
					className: `fw-bold mb-3 ${hasJualBeliBill ? "text-danger" : "text-success"}`,
					children: "Kewajiban Tagihan Jual Beli"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "d-flex align-items-center justify-content-between p-3 bg-white rounded shadow-sm border border-secondary border-opacity-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
						className: "text-muted d-block",
						children: "Sisa Tagihan Jual Beli"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `fw-bold fs-5 ${hasJualBeliBill ? "text-danger" : "text-success"}`,
						children: formatRupiah(jualBeliBill)
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: hasJualBeliBill ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						bg: "danger",
						className: "p-2",
						children: "Belum Lunas"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						bg: "success",
						className: "p-2",
						children: "Lunas / Tidak Ada"
					}) })]
				}),
				hasJualBeliBill && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-danger small mt-3 mb-0",
					children: "* Anda memiliki tunggakan/sisa tagihan jual beli. Harap lunasi tagihan ini sebelum mengajukan berhenti keanggotaan."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `rcp-savings-section mb-5 p-4 rounded border border-opacity-25 ${hasProgramBill ? "bg-danger bg-opacity-10 border-danger" : "bg-success bg-opacity-10 border-success"}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
					className: `fw-bold mb-3 ${hasProgramBill ? "text-danger" : "text-success"}`,
					children: "Kewajiban Program (Pinjaman Lunak & Arisan)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
					className: "g-3 text-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
						md: 6,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "d-flex align-items-center justify-content-between p-3 bg-white rounded shadow-sm border border-secondary border-opacity-10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
								className: "text-muted d-block",
								children: "Sisa Pinjaman Lunak"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `fw-bold fs-5 ${programBill.pinjaman > 0 ? "text-danger" : "text-success"}`,
								children: formatRupiah(programBill.pinjaman)
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: programBill.pinjaman > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								bg: "danger",
								className: "p-2",
								children: "Belum Lunas"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								bg: "success",
								className: "p-2",
								children: "Lunas"
							}) })]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
						md: 6,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "d-flex align-items-center justify-content-between p-3 bg-white rounded shadow-sm border border-secondary border-opacity-10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
								className: "text-muted d-block",
								children: "Sisa Tagihan Arisan"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `fw-bold fs-5 ${programBill.arisan > 0 ? "text-danger" : "text-success"}`,
								children: formatRupiah(programBill.arisan)
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: programBill.arisan > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								bg: "danger",
								className: "p-2",
								children: "Belum Lunas"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								bg: "success",
								className: "p-2",
								children: "Lunas"
							}) })]
						})
					})]
				}),
				hasProgramBill && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-danger small mt-3 mb-0",
					children: "* Anda masih memiliki kewajiban program yang belum dilunasi. Harap lunasi pinjaman dan/atau arisan Anda sebelum mengajukan berhenti keanggotaan."
				})
			]
		}),
		pendingBills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rcp-savings-section mb-5 p-4 rounded border border-danger border-opacity-25 bg-danger bg-opacity-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
					className: "fw-bold mb-3 text-danger",
					children: "Kewajiban Tagihan Lainnya (Iuran, dll)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					className: "g-3 text-start",
					children: pendingBills.map((bill, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
						md: 6,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "d-flex align-items-center justify-content-between p-3 bg-white rounded shadow-sm border border-secondary border-opacity-10 h-100",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
								className: "text-muted d-block",
								children: bill.billing_name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "fw-bold fs-5 text-danger",
								children: formatRupiah(bill.total_amount)
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								bg: "danger",
								className: "p-2",
								children: "Belum Lunas"
							}) })]
						})
					}, idx))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-danger small mt-3 mb-0",
					children: "* Anda memiliki tagihan lain yang belum lunas. Harap lunasi tagihan ini sebelum mengajukan berhenti keanggotaan."
				})
			]
		})
	] });
}
//#endregion
//#region src/pages/anggota/ResignationCheckPage/components/ResignationActionSection.jsx
function ResignationActionSection({ hasBills, isSubmitting, onTerminate, onGoBack }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rcp-action-section d-flex flex-column align-items-center pt-4 border-top",
		children: [!hasBills ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "danger",
			className: "rcp-btn rcp-btn-danger mb-3",
			onClick: onTerminate,
			disabled: isSubmitting,
			children: isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
					as: "span",
					animation: "border",
					size: "sm",
					className: "me-2"
				}),
				" ",
				"Memproses..."
			] }) : "Ajukan Berhenti Keanggotaan"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "secondary",
			className: "rcp-btn mb-3",
			disabled: true,
			title: "Lunasi tagihan terlebih dahulu",
			children: "Ajukan Berhenti Keanggotaan"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "link",
			className: "text-muted text-decoration-none",
			onClick: onGoBack,
			children: "Batal & Kembali ke Profil"
		})]
	});
}
//#endregion
//#region src/pages/anggota/ResignationCheckPage/ResignationCheckPage.jsx
function ResignationCheckPage() {
	const navigate = useNavigate();
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [pendingBills, setPendingBills] = (0, import_react.useState)([]);
	const [savingsInfo, setSavingsInfo] = (0, import_react.useState)(null);
	const [jualBeliBill, setJualBeliBill] = (0, import_react.useState)(0);
	const [programBill, setProgramBill] = (0, import_react.useState)({
		pinjaman: 0,
		arisan: 0
	});
	const [otherAssets, setOtherAssets] = (0, import_react.useState)({
		tabunganList: [],
		investasi: 0
	});
	const [error, setError] = (0, import_react.useState)("");
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		fetchData();
	}, []);
	const fetchData = async () => {
		try {
			setLoading(true);
			setError("");
			const response = await uBilling.getPendingBills();
			const bills = response.data?.data || response.data || [];
			const grouped = (Array.isArray(bills) ? bills : []).reduce((acc, bill) => {
				const name = bill.billing_name || bill.description || "Tagihan";
				const amt = Number(bill.amount) || Number(bill.total_amount) || 0;
				if (amt > 0) {
					if (!acc[name]) acc[name] = {
						billing_name: name,
						total_amount: 0
					};
					acc[name].total_amount += amt;
				}
				return acc;
			}, {});
			setPendingBills(Object.values(grouped));
			const finResponse = await uGlobal.getFinancialSummary();
			const details = finResponse.data?.data?.details || [];
			setSavingsInfo({
				pokok: details.find((d) => d.type === "SW_POKOK")?.balance || 0,
				wajib: details.find((d) => d.type === "SW_WAJIB")?.balance || 0,
				sukarela: details.find((d) => d.type === "SS_SUKARELA")?.balance || 0
			});
			setJualBeliBill(finResponse.data?.data?.sisaCicilanJualBeli || 0);
			setProgramBill({
				pinjaman: finResponse.data?.data?.sisaCicilanPinjaman || 0,
				arisan: finResponse.data?.data?.sisaCicilanArisan || 0
			});
			setOtherAssets({
				tabunganList: details.filter((d) => d.type.startsWith("TABUNGAN_") && Number(d.balance) > 0).map((d) => ({
					name: d.name,
					balance: Number(d.balance)
				})),
				investasi: finResponse.data?.data?.totalInvestasi || 0
			});
		} catch (err) {
			console.error("Gagal mengambil data tagihan:", err);
			setError("Terjadi kesalahan saat memeriksa status kewajiban Anda. Silakan coba lagi.");
		} finally {
			setLoading(false);
		}
	};
	const handleGoBack = () => {
		navigate(`/${jwtEncode({ page: "accountPage" })}`);
	};
	const handleTerminate = async () => {
		if (pendingBills.length > 0) {
			import_sweetalert2_all.default.fire({
				icon: "error",
				title: "Pengajuan Ditolak",
				text: "Anda masih memiliki kewajiban yang belum diselesaikan."
			});
			return;
		}
		if ((await import_sweetalert2_all.default.fire({
			title: "Konfirmasi Akhir",
			text: "Apakah Anda sangat yakin ingin mengajukan penghentian keanggotaan? Tindakan ini bersifat permanen dan tidak dapat dibatalkan.",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#dc3545",
			cancelButtonColor: "#6c757d",
			confirmButtonText: "Ya, Hentikan Keanggotaan",
			cancelButtonText: "Batal"
		})).isConfirmed) try {
			setIsSubmitting(true);
			import_sweetalert2_all.default.fire({
				title: "Memproses...",
				text: "Sedang mengirim pengajuan...",
				allowOutsideClick: false,
				didOpen: () => {
					import_sweetalert2_all.default.showLoading();
				}
			});
			const token = localStorage.getItem("authToken") || localStorage.getItem("token");
			const res = await fetch(`https://api.kkpus.id/api/anggota/berhenti-keanggotaan`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({ reason: "Pengajuan dari halaman profil" })
			});
			const data = await res.json();
			if (data.success || res.ok) import_sweetalert2_all.default.fire("Berhasil!", "Pengajuan penghentian keanggotaan berhasil dikirim ke pengurus. Silakan tunggu konfirmasi.", "success").then(() => {
				window.location.reload();
			});
			else import_sweetalert2_all.default.fire("Gagal", data.message || "Gagal mengajukan penghentian keanggotaan.", "error");
		} catch (err) {
			console.error(err);
			import_sweetalert2_all.default.fire("Error", "Terjadi kesalahan sistem.", "error");
		} finally {
			setIsSubmitting(false);
		}
	};
	const hasProgramBill = programBill.pinjaman > 0 || programBill.arisan > 0;
	const hasBills = pendingBills.length > 0 || jualBeliBill > 0 || hasProgramBill;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		className: "rcp-container py-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default, {
			className: "rcp-main-card border-0 shadow-sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default.Body, {
				className: "p-4 p-md-5",
				children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingState, {
					size: "lg",
					message: "Sedang memeriksa kewajiban dan tagihan Anda...",
					minHeight: "250px"
				}) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
					title: "Gagal Memeriksa Data",
					message: error,
					onRetry: fetchData,
					minHeight: "250px"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rcp-content animate-fade-in",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResignationStatusBanner, { hasBills }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SavingsAndAssetsSection, {
							savingsInfo,
							otherAssets
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PendingObligationsSection, {
							jualBeliBill,
							programBill,
							pendingBills
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResignationActionSection, {
							hasBills,
							isSubmitting,
							onTerminate: handleTerminate,
							onGoBack: handleGoBack
						})
					]
				})
			})
		})
	});
}
//#endregion
export { ResignationCheckPage as default };
