import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime, mt as require_prop_types, n as hooks } from "./vendor-rpDlma0K.js";
import { Cn as FaIdCard, D as Badge, E as Button, Er as FaUsers, Fn as FaMoneyBillWave, Ft as FaCertificate, Kt as FaClipboardList, Mt as FaCalendarAlt, Nt as FaCalendarCheck, Or as FaWallet, Pr as useNavigate, S as Card_default, Zt as FaCreditCard, _n as FaHandshake, _r as FaUserCircle, bn as FaHistory, bt as FaArrowLeft, cr as FaTimesCircle, dn as FaFileInvoiceDollar, hr as FaUser, l as Row, ln as FaFileAlt, or as FaTag, pr as FaUniversity, qt as FaClock, rn as FaExchangeAlt, un as FaFileContract, wn as FaInfoCircle, wr as FaUserTag, x as Col, zt as FaCheckCircle } from "./vendor-react-D5pUDmay.js";
import { t as motion } from "./vendor-framer-fx3iiH1e.js";
import { t as api } from "./common-qX05v8MF.js";
import { i as useSocket, s as jwtEncode } from "./index-BaUN0sjk.js";
import { t as ApprovalPlaceholder } from "./ApprovalPlaceholder-BRIHhb7u.js";
import { t as TabunganService } from "./tabungan.service-CPFyTv_m.js";
import { t as uJualBeli } from "./UJualBeli-CQrsKJbc.js";
import { t as uSimpanan } from "./USimpanan-BSasVMP7.js";
//#region src/pages/global/transaction/components/InfoRow.jsx
var import_prop_types = /* @__PURE__ */ __toESM(require_prop_types());
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var InfoRow = ({ icon, label, value, isPrimary = false, isTotal = false }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: `d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom border-light-subtle ${isTotal ? "mt-3 pt-3 border-secondary-subtle border-top border-bottom-0" : ""}`,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "d-flex align-items-center gap-2",
		children: [icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-secondary opacity-75",
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `${isTotal ? "fw-bold text-dark" : "text-secondary"} small text-uppercase tracking-tight`,
			style: {
				fontSize: "11px",
				fontWeight: 600
			},
			children: label
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `text-end ${isPrimary || isTotal ? "text-primary fw-bold fs-6" : "text-dark fw-medium"}`,
		style: { fontSize: isTotal ? "1.1rem" : "14px" },
		children: value || "-"
	})]
});
var InfoRow_default = import_react.memo(InfoRow);
//#endregion
//#region src/pages/global/transaction/components/MemberInfoSection.jsx
var MemberInfoSection = ({ detail, isFinancing }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "mb-4",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "d-flex align-items-center gap-2 mb-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-2 rounded-3 bg-primary bg-opacity-10 text-primary",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUser, { size: 14 })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
			className: "fw-bold mb-0 text-dark",
			children: "Informasi Anggota"
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "ps-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow_default, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUser, { size: 12 }),
				label: "Nama Lengkap",
				value: detail?.member?.full_name || detail?.member?.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow_default, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaIdCard, { size: 12 }),
				label: "ID Anggota",
				value: detail?.member?.member_code || detail?.member?.member_no || detail?.member?.memberId
			}),
			!isFinancing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow_default, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUserTag, { size: 12 }),
				label: "Tipe Anggota",
				value: detail?.member?.member_type || detail?.member?.status || "Reguler"
			})
		]
	})]
});
var MemberInfoSection_default = import_react.memo(MemberInfoSection);
//#endregion
//#region src/pages/global/transaction/components/ApprovalSection.jsx
var ApprovalSection = ({ approvalStatus, detail }) => {
	if (!approvalStatus) return null;
	const getApprovalData = (roleName) => {
		if (!detail?.approvalChain) return null;
		return detail.approvalChain.find((a) => a.role?.toUpperCase() === roleName.toUpperCase());
	};
	const pengawasData = getApprovalData("PENGAWAS");
	const ketuaData = getApprovalData("KETUA");
	const bendaharaData = getApprovalData("BENDAHARA");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-5 p-4 rounded-4 bg-light bg-opacity-50 border border-light-subtle shadow-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
				className: "fw-bold small text-uppercase text-secondary tracking-wider mb-1",
				style: {
					fontSize: "11px",
					letterSpacing: "2px"
				},
				children: "Alur Persetujuan"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto",
				style: {
					width: "30px",
					height: "2px",
					background: "#cbd5e1"
				}
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "position-relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "position-absolute d-none d-md-block",
				style: {
					top: "32px",
					left: "15%",
					right: "15%",
					height: "2px",
					background: "linear-gradient(90deg, #e2e8f0 0%, #e2e8f0 100%)",
					zIndex: 0
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "d-flex justify-content-between align-items-start position-relative",
				style: { zIndex: 1 },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApprovalPlaceholder, {
						role: "Pengawas",
						isApproved: approvalStatus.isApproved || approvalStatus.pengawasDone,
						isRejected: approvalStatus.pengawasRejected || approvalStatus.isRejected && !approvalStatus.pengawasDone && !approvalStatus.ketuaDone && !approvalStatus.bendaharaDone,
						isReadyToPay: approvalStatus.isReadyToPay,
						note: pengawasData?.note,
						approverName: pengawasData?.approverName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApprovalPlaceholder, {
						role: "Ketua",
						isApproved: approvalStatus.isApproved || approvalStatus.ketuaDone,
						isRejected: approvalStatus.ketuaRejected || approvalStatus.isRejected && approvalStatus.pengawasDone && !approvalStatus.ketuaDone,
						isReadyToPay: approvalStatus.isReadyToPay,
						note: ketuaData?.note,
						approverName: ketuaData?.approverName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApprovalPlaceholder, {
						role: "Bendahara",
						isApproved: approvalStatus.isApproved || approvalStatus.bendaharaDone,
						isRejected: approvalStatus.bendaharaRejected || approvalStatus.isRejected && approvalStatus.pengawasDone && approvalStatus.ketuaDone && !approvalStatus.bendaharaDone,
						isReadyToPay: approvalStatus.isReadyToPay,
						note: bendaharaData?.note,
						approverName: bendaharaData?.approverName
					})
				]
			})]
		})]
	});
};
var ApprovalSection_default = import_react.memo(ApprovalSection);
//#endregion
//#region src/pages/global/transaction/components/ActionButtons.jsx
var ActionButtons = ({ isFinancing, isTabungan, isSukukOrder, transactionId, onBack, approvalStatus, productName, detail, returnPage }) => {
	const navigate = useNavigate();
	const isFromHistory = (0, import_react.useMemo)(() => {
		if (!returnPage) return false;
		const lowerReturn = returnPage.toLowerCase();
		return lowerReturn.includes("history") || lowerReturn.includes("riwayat") || lowerReturn.includes("jualbeli");
	}, [returnPage]);
	const isApprovedAndReady = (0, import_react.useMemo)(() => {
		const isArisan = productName?.toLowerCase().includes("arisan") || detail?.category?.toLowerCase().includes("arisan");
		const isStatusApproved = detail?.status === "APPROVED" || detail?.status === "APPROVED_WAITING_PAYMENT";
		if (isArisan) return isStatusApproved || approvalStatus?.isApproved || approvalStatus?.isReadyToPay;
		const hasBendahara = detail?.approvalChain?.some((a) => a.role?.toUpperCase() === "BENDAHARA") || detail?.approvals?.some((a) => (a.role || a.role_name)?.toUpperCase() === "BENDAHARA");
		return approvalStatus?.pengawasDone && approvalStatus?.ketuaDone && (hasBendahara ? approvalStatus?.bendaharaDone : true) && !approvalStatus?.isRejected || isStatusApproved || approvalStatus?.isApproved || approvalStatus?.isReadyToPay;
	}, [
		approvalStatus,
		detail,
		productName
	]);
	const isPinjamanProduct = isFinancing && !productName?.toLowerCase().includes("arisan") && !productName?.toLowerCase().includes("pelunasan") && (productName && ![
		"Property",
		"Kendaraan",
		"Elektronik"
	].includes(productName) || detail?.purpose?.toLowerCase().includes("pinjaman") || !productName && detail?.purpose?.toLowerCase().includes("pinjaman"));
	const isPelunasan = productName?.toLowerCase().includes("pelunasan") || detail?.category?.toLowerCase().includes("pelunasan");
	const downPayment = parseFloat(detail?.down_payment || 0);
	const isWaitingDP = (0, import_react.useMemo)(() => {
		return isFinancing && downPayment > 0 && approvalStatus?.pengawasDone && approvalStatus?.ketuaDone && !approvalStatus?.bendaharaDone && !approvalStatus?.isRejected;
	}, [
		isFinancing,
		downPayment,
		approvalStatus
	]);
	const handlePay = () => {
		if (isPinjamanProduct) {
			navigate(`/${jwtEncode({
				page: "receiptPage",
				financingId: transactionId
			})}`);
			return;
		}
		if (isPelunasan) {
			navigate(`/${jwtEncode({
				page: "invoicePage",
				financingId: transactionId,
				product: productName || detail?.category || "Pelunasan Jual Beli",
				amount: detail?.total_tagihan || detail?.amount_requested,
				return: "transactionDetailPage"
			})}`);
			return;
		}
		const params = {
			page: "billingPage",
			category: isFinancing ? "FINANCING" : isTabungan ? "TABUNGAN_DEPOSIT" : isSukukOrder ? "SUKUK_INVESTMENT" : "WITHDRAWAL",
			return: "transactionDetailPage"
		};
		if (isFinancing) {
			params.financing_id = transactionId;
			if (downPayment > 0) params.downPayment = downPayment;
		} else if (isTabungan) {
			params.tabungan_id = transactionId;
			params.displayName = "Setoran Tabungan";
		} else if (isSukukOrder) {
			params.order_id = transactionId;
			params.displayName = "Pembelian Sukuk";
		}
		if (productName) params.productName = productName;
		navigate(`/${jwtEncode(params)}`);
	};
	const getButtonText = () => {
		if (isPinjamanProduct) return "LIHAT RESI PENCAIRAN";
		if (isPelunasan) return "LIHAT INVOICE";
		if (isWaitingDP) return detail?.has_uploaded_dp ? "LIHAT STATUS PEMBAYARAN DP" : "BAYAR UANG TANDA KESERIUSAN (DP)";
		if (isFinancing) {
			if (productName?.toLowerCase().includes("arisan")) return "BAYAR SETORAN ARISAN";
			return "BAYAR INVOICE SEKARANG";
		}
		if (isSukukOrder) return "BAYAR PEMBELIAN SUKUK";
		return "BAYAR SETORAN PERTAMA";
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mt-5 d-print-none",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "d-flex flex-column flex-sm-row justify-content-center gap-3",
			children: [
				(isApprovedAndReady || isWaitingDP) && !isFromHistory && (isFinancing || isTabungan || isSukukOrder) && detail?.status !== "PAID" && detail?.status !== "APPROVED" && detail?.status !== "COMPLETED" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "primary",
					size: "lg",
					className: "rounded-pill px-5 py-3 fw-bold shadow d-flex align-items-center justify-content-center gap-2",
					onClick: handlePay,
					style: {
						background: isFinancing ? "linear-gradient(45deg, #0284c7, #0ea5e9)" : isSukukOrder ? "linear-gradient(45deg, #f59e0b, #d97706)" : "linear-gradient(45deg, #10b981, #059669)",
						border: "none"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaFileInvoiceDollar, {}), getButtonText()]
				}),
				isSukukOrder && detail?.status === "PAID" && detail?.sukuk?.status === "COMPLETED" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "success",
					size: "lg",
					className: "rounded-pill px-5 py-3 fw-bold shadow d-flex align-items-center justify-content-center gap-2",
					onClick: async () => {
						try {
							const data = await (await fetch(`/api/sukuk/withdraw/${transactionId}`, {
								method: "POST",
								headers: {
									"Content-Type": "application/json",
									"Authorization": `Bearer ${localStorage.getItem("token")}`
								}
							})).json();
							if (data.status) {
								alert("Pengajuan pencairan berhasil dikirim.");
								window.location.reload();
							} else alert(data.message || "Gagal mengajukan pencairan.");
						} catch (e) {
							alert("Terjadi kesalahan.");
						}
					},
					style: {
						background: "linear-gradient(45deg, #10b981, #059669)",
						border: "none"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaWallet, {}), "AJUKAN PENCAIRAN"]
				}),
				isApprovedAndReady && (!isFinancing && !isTabungan && !isSukukOrder || isPinjamanProduct) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "primary",
					size: "lg",
					className: "rounded-pill px-5 py-3 fw-bold shadow d-flex align-items-center justify-content-center gap-2",
					onClick: () => navigate(`/${jwtEncode({
						page: "receiptPage",
						...isFinancing ? { financingId: transactionId } : { withdrawalId: transactionId }
					})}`),
					style: {
						background: "linear-gradient(45deg, #10b981, #059669)",
						border: "none"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaFileInvoiceDollar, {}), "LIHAT RESI PENCAIRAN"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: isApprovedAndReady ? "light" : "outline-secondary",
					size: isApprovedAndReady ? "lg" : "md",
					className: `rounded-pill px-5 ${isApprovedAndReady ? "py-3 fw-semibold border text-secondary" : "py-2"} d-flex align-items-center justify-content-center gap-2`,
					onClick: onBack,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaArrowLeft, { size: isApprovedAndReady ? 14 : 12 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "KEMBALI" })]
				})
			]
		})
	});
};
var ActionButtons_default = import_react.memo(ActionButtons);
//#endregion
//#region src/pages/global/transaction/components/TransactionDetailSkeleton.jsx
function TransactionDetailSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container-fluid py-4 px-3 px-md-4 min-vh-100 d-flex justify-content-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "w-100",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default, {
				className: "border-0 shadow-sm rounded-4 overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default.Body, {
					className: "p-4",
					children: [
						1,
						2,
						3,
						4
					].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton-box skeleton-title mb-3" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton-box skeleton-line-full mb-2" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton-box skeleton-line-partial" })
						]
					}, i))
				})
			})
		})
	});
}
//#endregion
//#region src/pages/global/transaction/components/PaymentDetailsSection.jsx
var PaymentDetailsSection = ({ detail, isFinancing, isTabungan }) => {
	const amount = parseFloat(isTabungan ? detail?.catalog?.target_amount || 0 : detail?.amount || detail?.item_price || 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "d-flex align-items-center gap-2 mb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-2 rounded-3 bg-success bg-opacity-10 text-success",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaFileInvoiceDollar, { size: 14 })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
				className: "fw-bold mb-0 text-dark",
				children: "Rincian Transaksi"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "ps-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow_default, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaTag, { size: 12 }),
					label: "Kategori",
					value: isFinancing ? "Pembiayaan" : isTabungan ? detail?.catalog?.target_name || "Pengajuan Tabungan" : detail?.account_type || detail?.displayName || "Penarikan Simpanan"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow_default, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCalendarAlt, { size: 12 }),
					label: "Tanggal Pengajuan",
					value: hooks(detail?.created_at || detail?.createdAt).format("DD MMMM YYYY, HH:mm")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow_default, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaWallet, { size: 12 }),
					label: "Metode",
					value: detail?.method || "Transfer Bank"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow_default, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaFileInvoiceDollar, { size: 12 }),
					label: isFinancing ? "Total Pembiayaan" : isTabungan ? "Target Tabungan" : "Jumlah Penarikan",
					value: `Rp ${amount.toLocaleString("id-ID")}`,
					isTotal: true,
					isPrimary: true
				}),
				isFinancing && detail?.operational_cost && parseFloat(detail.operational_cost) !== 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow_default, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaFileInvoiceDollar, { size: 12 }),
					label: "Biaya Operasional",
					value: `Rp ${parseFloat(Math.abs(detail.operational_cost)).toLocaleString("id-ID")} ${parseFloat(detail.operational_cost) < 0 ? "(Dikurangi)" : ""}`
				}) : null,
				isTabungan && detail?.catalog?.min_monthly_deposit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow_default, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaFileInvoiceDollar, { size: 12 }),
					label: "Minimal Setoran Bulanan",
					value: `Rp ${parseFloat(detail.catalog.min_monthly_deposit).toLocaleString("id-ID")}`
				}),
				isTabungan && detail?.catalog?.term_months && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow_default, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCalendarAlt, { size: 12 }),
					label: "Tenor (Bulan)",
					value: `${detail.catalog.term_months} Bulan`
				})
			]
		})]
	});
};
var PaymentDetailsSection_default = import_react.memo(PaymentDetailsSection);
//#endregion
//#region src/pages/global/transaction/components/FinancingDetailsSection.jsx
var FinancingDetailsSection = ({ detail, isPelunasan }) => {
	const isArisan = detail?.category === "Arisan" || detail?.account_type === "Arisan";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "d-flex align-items-center gap-2 mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-2 rounded-3 bg-primary bg-opacity-10 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaInfoCircle, { size: 14 })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h6", {
					className: "fw-bold mb-0 text-dark",
					children: ["Detail ", isArisan ? "Arisan" : "Pembiayaan"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ps-1 mb-4",
				children: [
					detail?.nama_nasabah && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow_default, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUsers, { size: 12 }),
						label: "Nama Anggota",
						value: detail.nama_nasabah
					}),
					detail?.nama_peserta_2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow_default, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUsers, { size: 12 }),
						label: "Nama Peserta Ke-2",
						value: detail.nama_peserta_2
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow_default, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaFileAlt, { size: 12 }),
						label: "Program",
						value: detail?.purpose || detail?.item_name || "-"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow_default, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaHandshake, { size: 12 }),
						label: "Jenis Akad",
						value: detail?.akad_type || (isArisan ? "Musyarakah Mutanaqisah" : "Murabahah")
					}),
					detail?.keterangan && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "d-flex align-items-center gap-2 mb-1 text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaClipboardList, { size: 12 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "small fw-bold",
								children: "Keterangan Pembukaan"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "small text-dark mb-0 bg-light p-2 rounded-2 border-start border-primary border-3",
							children: detail.keterangan
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "my-4 p-3 bg-light rounded-3 border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-muted small fw-bold mb-1 text-uppercase",
							style: { letterSpacing: "1px" },
							children: ["Total ", isPelunasan ? "Pelunasan" : "Tagihan (Termasuk Margin)"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "mb-0 fw-bold text-primary",
							children: ["Rp ", parseFloat(detail?.total_tagihan || 0).toLocaleString("id-ID")]
						})]
					}),
					!isPelunasan && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow_default, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaMoneyBillWave, { size: 12 }),
						label: "Harga Barang",
						value: `Rp ${parseFloat(detail?.item_price || 0).toLocaleString("id-ID")}`
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow_default, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaMoneyBillWave, { size: 12 }),
						label: "Uang Tanda Keseriusan",
						value: `Rp ${parseFloat(detail?.down_payment || 0).toLocaleString("id-ID")}`
					})] }),
					detail?.operational_cost && parseFloat(detail.operational_cost) !== 0 && !isPelunasan && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow_default, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaMoneyBillWave, { size: 12 }),
						label: "Biaya Operasional",
						value: `Rp ${parseFloat(Math.abs(detail.operational_cost)).toLocaleString("id-ID")} ${parseFloat(detail.operational_cost) < 0 ? "(Dikurangi)" : "(Ditambah)"}`
					}),
					isPelunasan && detail?.discount && parseFloat(detail.discount) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow_default, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaMoneyBillWave, { size: 12 }),
						label: "Diskon Pelunasan",
						value: `Rp ${parseFloat(detail.discount).toLocaleString("id-ID")} (Dikurangi)`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow_default, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaMoneyBillWave, { size: 12 }),
						label: isPelunasan ? "Sisa Pokok Tagihan" : "Pokok Pembiayaan",
						value: `Rp ${parseFloat(detail?.amount_requested || 0).toLocaleString("id-ID")}`
					}),
					!isPelunasan && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow_default, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaMoneyBillWave, { size: 12 }),
							label: `Keuntungan Koperasi (${detail?.margin_percent || 0}%)`,
							value: `Rp ${parseFloat(detail?.margin_amount || 0).toLocaleString("id-ID")}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow_default, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCalendarCheck, { size: 12 }),
							label: isArisan ? "Durasi Program" : "Tenor",
							value: `${detail?.cooperation_months || 0} Bulan`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow_default, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaFileContract, { size: 12 }),
							label: isArisan ? "Setoran Bulanan" : "Angsuran Bulanan",
							value: `Rp ${(parseFloat(detail?.monthly_installment) || 0).toLocaleString("id-ID")}`,
							isPrimary: true
						})
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 p-3 rounded-3 bg-light border border-light-subtle",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "d-flex align-items-center gap-2 mb-2 text-success",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaFileContract, { size: 12 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "small fw-bold",
						children: "Persetujuan Akad Digital"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "small text-muted mb-0",
					style: {
						fontSize: "11px",
						lineHeight: "1.4"
					},
					children: [
						"Anggota telah menyetujui syarat dan ketentuan ",
						isArisan ? "program arisan" : "pembiayaan",
						" secara digital pada saat pengajuan."
					]
				})]
			})
		]
	});
};
var FinancingDetailsSection_default = import_react.memo(FinancingDetailsSection);
//#endregion
//#region src/pages/global/transaction/components/TabunganDetailsSection.jsx
var TabunganDetailsSection = ({ detail }) => {
	if (!detail) return null;
	const monthNames = [
		"Januari",
		"Februari",
		"Maret",
		"April",
		"Mei",
		"Juni",
		"Juli",
		"Agustus",
		"September",
		"Oktober",
		"November",
		"Desember"
	];
	const startMonthName = detail.start_period_month ? monthNames[parseInt(detail.start_period_month, 10) - 1] : "-";
	let endPeriod = "-";
	if (detail.start_period_month && detail.start_period_year && detail.catalog?.term_months) {
		const start = new Date(parseInt(detail.start_period_year), parseInt(detail.start_period_month) - 1);
		start.setMonth(start.getMonth() + parseInt(detail.catalog.term_months));
		endPeriod = `${monthNames[start.getMonth()]} ${start.getFullYear()}`;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "d-flex align-items-center gap-2 mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-2 rounded-3 bg-success bg-opacity-10 text-success",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaInfoCircle, { size: 14 })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
					className: "fw-bold mb-0 text-dark",
					children: "Informasi Tambahan"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ps-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow_default, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCalendarCheck, { size: 12 }),
						label: "Mulai Menabung",
						value: `${startMonthName} ${detail.start_period_year || "-"}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow_default, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaClock, { size: 12 }),
						label: "Estimasi Selesai",
						value: endPeriod
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow_default, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaClipboardList, { size: 12 }),
						label: "Kategori Program",
						value: detail.catalog?.category || "-"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow_default, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaFileContract, { size: 12 }),
						label: "Setoran Bulanan (Minimal)",
						value: `Rp ${(parseFloat(detail.catalog?.min_monthly_deposit) || 0).toLocaleString("id-ID")}`,
						isPrimary: true
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 p-3 rounded-3 bg-light border border-light-subtle",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "d-flex align-items-center gap-2 mb-2 text-success",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaFileContract, { size: 12 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "small fw-bold",
						children: "Ketentuan Tabungan Berjangka"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small text-muted mb-0",
					style: {
						fontSize: "11px",
						lineHeight: "1.4"
					},
					children: "Dengan ini anggota menyetujui program tabungan sesuai jangka waktu dan setoran bulanan yang telah dipilih. Penarikan sebelum jatuh tempo dapat dikenakan ketentuan khusus dari koperasi."
				})]
			})
		]
	});
};
var TabunganDetailsSection_default = import_react.memo(TabunganDetailsSection);
//#endregion
//#region src/pages/global/transaction/components/ReturnInfoSection.jsx
var ReturnInfoSection = ({ detail }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "mb-4",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "d-flex align-items-center gap-2 mb-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-2 rounded-3 bg-info bg-opacity-10 text-info",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUniversity, { size: 14 })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
			className: "fw-bold mb-0 text-dark",
			children: "Informasi Rekening Tujuan"
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "ps-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow_default, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaExchangeAlt, { size: 12 }),
				label: "Metode",
				value: detail?.method || "Bank Transfer"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow_default, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUniversity, { size: 12 }),
				label: "Bank",
				value: detail?.bank_name || detail?.bank?.bankName
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow_default, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUserCircle, { size: 12 }),
				label: "Nama Pemilik",
				value: detail?.bank_account_name || detail?.bank?.accountName || detail?.member?.full_name || detail?.member?.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow_default, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCreditCard, { size: 12 }),
				label: "Nomor Rekening",
				value: detail?.bank_account_no || detail?.bank?.accountNo
			})
		]
	})]
});
var ReturnInfoSection_default = import_react.memo(ReturnInfoSection);
//#endregion
//#region src/pages/global/transaction/components/SukukOrderSection.jsx
var SukukOrderSection = ({ detail }) => {
	const amount = parseFloat(detail?.amount_requested || 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "d-flex align-items-center gap-2 mb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-2 rounded-3 bg-success bg-opacity-10 text-success",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaFileInvoiceDollar, { size: 14 })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
				className: "fw-bold mb-0 text-dark",
				children: "Rincian Transaksi"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "ps-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow_default, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaTag, { size: 12 }),
					label: "Kategori",
					value: "Investasi Sukuk"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow_default, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCalendarAlt, { size: 12 }),
					label: "Tanggal Pengajuan",
					value: hooks(detail?.createdAt).format("DD MMMM YYYY, HH:mm")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow_default, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaFileInvoiceDollar, { size: 12 }),
					label: "Nominal Investasi",
					value: `Rp ${amount.toLocaleString("id-ID")}`,
					isTotal: true,
					isPrimary: true
				})
			]
		})]
	}), detail?.sukuk && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "d-flex align-items-center gap-2 mb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-2 rounded-3 bg-primary bg-opacity-10 text-primary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCertificate, { size: 14 })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
				className: "fw-bold mb-0 text-dark",
				children: "Detail Sukuk"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "ps-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow_default, {
					label: "Nama Sukuk",
					value: detail.sukuk.issue_name || "-"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow_default, {
					label: "Penerbit",
					value: detail.sukuk.issuer || "-"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow_default, {
					label: "Jenis",
					value: detail.sukuk.type || "-"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow_default, {
					label: "Imbal Hasil",
					value: detail.sukuk.coupon || "-"
				})
			]
		})]
	})] });
};
var SukukOrderSection_default = import_react.memo(SukukOrderSection);
//#endregion
//#region src/pages/global/transaction/components/TransactionBodyContent.jsx
function TransactionBodyContent({ detail, isSukukOrder, isFinancing, isTabungan, isPelunasan }) {
	if (isSukukOrder) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SukukOrderSection_default, { detail });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		isFinancing && detail?.operational_cost && parseFloat(detail.operational_cost) !== 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "alert alert-info py-2 px-3 small d-flex align-items-center gap-2 mb-4 border-0 bg-info bg-opacity-10 text-info rounded-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaInfoCircle, { className: "flex-shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
				"Biaya operasional sebesar",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
					"Rp",
					" ",
					parseFloat(Math.abs(detail.operational_cost)).toLocaleString("id-ID")
				] }),
				" ",
				"telah",
				" ",
				parseFloat(detail.operational_cost) > 0 ? "ditambahkan ke" : "dikurangi dari",
				" ",
				"pokok pembiayaan."
			] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentDetailsSection_default, {
			detail,
			isFinancing,
			isTabungan
		}),
		isFinancing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinancingDetailsSection_default, {
			detail,
			isPelunasan
		}) : isTabungan ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabunganDetailsSection_default, { detail }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReturnInfoSection_default, { detail })
	] });
}
TransactionBodyContent.propTypes = {
	detail: import_prop_types.default.object,
	isSukukOrder: import_prop_types.default.bool.isRequired,
	isFinancing: import_prop_types.default.bool.isRequired,
	isTabungan: import_prop_types.default.bool.isRequired,
	isPelunasan: import_prop_types.default.bool
};
//#endregion
//#region src/pages/global/transaction/components/transactionDetailHelpers.jsx
var calculateApprovalStatus = (detail, isFinancing, isTabungan) => {
	if (!detail) return null;
	const status = detail.status?.toUpperCase();
	const isApproved = status === "APPROVED" || status === "SUCCESS" || status === "PAID" || status === "COMPLETED" || status === "DISETUJUI";
	const isReadyToPay = status === "READY_TO_PAY" || status === "WAITING_PAYMENT";
	const isRejected = status === "REJECTED" || status === "DITOLAK" || detail.is_rejected;
	const flags = detail.approval_status || detail;
	const pengawasDone = flags.is_approved_pengawas || false;
	const ketuaDone = flags.is_approved_ketua || false;
	const bendaharaDone = flags.is_approved_bendahara || false;
	const allStepsDone = pengawasDone && ketuaDone && bendaharaDone && !isRejected;
	let pengawasRejected = false;
	let ketuaRejected = false;
	let bendaharaRejected = false;
	if (isRejected) if (!pengawasDone) pengawasRejected = true;
	else if (!ketuaDone) ketuaRejected = true;
	else bendaharaRejected = true;
	return {
		pengawasDone,
		ketuaDone,
		bendaharaDone,
		pengawasRejected,
		ketuaRejected,
		bendaharaRejected,
		isRejected,
		isReadyToPay: isReadyToPay || allStepsDone && !isApproved && !isTabungan && !isFinancing,
		isApproved: isApproved || allStepsDone && (isTabungan || isFinancing),
		currentStatus: status || "PENDING"
	};
};
var renderStatusBadge = (detail, approvalStatus) => {
	if (!detail) return null;
	const status = detail.status?.toUpperCase();
	if (status === "REJECTED" || approvalStatus?.isRejected) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
		bg: "danger",
		className: "rounded-pill px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaTimesCircle, { className: "me-1" }), " DITOLAK"]
	});
	if (status === "WITHDRAWAL_REQUESTED") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
		bg: "info",
		className: "rounded-pill px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaClock, { className: "me-1" }), " PENCAIRAN DIPROSES"]
	});
	if (status === "WITHDRAWN") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
		bg: "success",
		className: "rounded-pill px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheckCircle, { className: "me-1" }), " SUDAH DICAIRKAN"]
	});
	if (status === "COMPLETED" || status === "PAID" || status === "SUCCESS" || status === "APPROVED" || approvalStatus?.isApproved) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
		bg: "success",
		className: "rounded-pill px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheckCircle, { className: "me-1" }), " DISETUJUI / SELESAI"]
	});
	if (status === "READY_TO_PAY" || status === "WAITING_PAYMENT" || approvalStatus?.isReadyToPay) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
		bg: "primary",
		className: "rounded-pill px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheckCircle, { className: "me-1" }), " MENUNGGU PEMBAYARAN"]
	});
	if (approvalStatus?.pengawasDone && !approvalStatus?.ketuaDone) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
		bg: "warning",
		text: "dark",
		className: "rounded-pill px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaClock, { className: "me-1" }), " MENUNGGU KETUA"]
	});
	if (approvalStatus?.pengawasDone && approvalStatus?.ketuaDone && !approvalStatus?.bendaharaDone) {
		if (parseFloat(detail?.down_payment || 0) > 0) {
			if (detail?.has_uploaded_dp || detail?.has_paid_dp) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
				bg: "info",
				className: "rounded-pill px-3 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaClock, { className: "me-1" }), " MENUNGGU VERIFIKASI DP (BENDAHARA)"]
			});
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
				bg: "warning",
				text: "dark",
				className: "rounded-pill px-3 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaClock, { className: "me-1" }), " MENUNGGU UANG TANDA KESERIUSAN"]
			});
		}
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
			bg: "warning",
			text: "dark",
			className: "rounded-pill px-3 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaClock, { className: "me-1" }), " MENUNGGU BENDAHARA"]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
		bg: "warning",
		text: "dark",
		className: "rounded-pill px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaClock, { className: "me-1" }), " MENUNGGU PENGAWAS"]
	});
};
//#endregion
//#region src/pages/global/transaction/components/TransactionStatusFooter.jsx
function TransactionStatusFooter({ detail, approvalStatus, transactionType }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "d-flex justify-content-between align-items-center bg-light p-3 rounded-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "d-flex align-items-center gap-2 text-muted",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaHistory, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "fw-semibold text-uppercase status-label",
				children: "Status Transaksi"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: renderStatusBadge(detail, approvalStatus) })]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-center px-4 mt-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", {
			className: "text-muted opacity-50",
			children: [
				"Jika ada pertanyaan mengenai status ",
				transactionType,
				" ini, silakan hubungi pengurus koperasi."
			]
		})
	})] });
}
TransactionStatusFooter.propTypes = {
	detail: import_prop_types.default.object,
	approvalStatus: import_prop_types.default.object,
	transactionType: import_prop_types.default.string.isRequired
};
//#endregion
//#region src/pages/global/transaction/TransactionDetailPage.jsx
var TransactionDetailPage = ({ decodedToken }) => {
	const navigate = useNavigate();
	const { socket } = useSocket();
	const isSukukOrder = !!decodedToken?.sukukOrder;
	const isFinancing = !isSukukOrder && !!decodedToken?.financingId || decodedToken?.action === "arisanEnrollment";
	const isTabungan = !!decodedToken?.tabunganId;
	const transactionId = isFinancing || isSukukOrder ? decodedToken?.financingId || null : isTabungan ? decodedToken?.tabunganId : decodedToken?.withdrawalId;
	const returnPage = decodedToken?.return || "dashboard";
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [detail, setDetail] = (0, import_react.useState)(null);
	const isPelunasan = detail?.category?.toLowerCase().includes("pelunasan") || detail?.item_name?.toLowerCase().includes("pelunasan") || detail?.product?.toLowerCase().includes("pelunasan");
	const fetchDetail = (0, import_react.useCallback)(async (showLoading = true) => {
		if (!transactionId) return;
		if (showLoading) setLoading(true);
		try {
			let res;
			if (isSukukOrder) res = await api.get(`/financing/sukuk/order/${transactionId}`);
			else if (isFinancing) res = await uJualBeli.getFinancingDetail(transactionId);
			else if (isTabungan) res = await TabunganService.getTabunganDetail(transactionId);
			else res = await uSimpanan.getWithdrawalDetail(transactionId);
			if (res.data?.status || res.data?.success) setDetail(res.data.data);
		} catch (err) {
			console.error("Fetch Detail Error:", err);
		} finally {
			setLoading(false);
		}
	}, [
		transactionId,
		isFinancing,
		isTabungan,
		isSukukOrder
	]);
	(0, import_react.useEffect)(() => {
		if (decodedToken?.data) {
			setDetail(decodedToken.data);
			setLoading(false);
			if (transactionId) fetchDetail(false);
		} else fetchDetail(true);
	}, [
		fetchDetail,
		decodedToken,
		transactionId
	]);
	const approvalStatus = (0, import_react.useMemo)(() => calculateApprovalStatus(detail, isFinancing, isTabungan), [
		detail,
		isFinancing,
		isTabungan
	]);
	const handleBack = (0, import_react.useCallback)(() => {
		const isWithdrawal = !isFinancing && !isTabungan && !isSukukOrder;
		if (isFinancing && approvalStatus?.bendaharaDone && !approvalStatus?.isRejected) if (isPelunasan) {
			navigate(`/${jwtEncode({
				page: "invoicePage",
				financingId: transactionId,
				product: detail?.category || "Pelunasan Jual Beli",
				amount: detail?.total_tagihan || detail?.amount_requested,
				return: returnPage || "dashboard"
			})}`);
			return;
		} else {
			navigate(`/${jwtEncode({
				page: "receiptPage",
				financingId: transactionId
			})}`);
			return;
		}
		if (isWithdrawal && approvalStatus?.bendaharaDone && !approvalStatus?.isRejected) {
			navigate(`/${jwtEncode({
				page: "receiptPage",
				withdrawalId: transactionId
			})}`);
			return;
		}
		navigate(`/${jwtEncode({ page: returnPage })}`);
	}, [
		isFinancing,
		isTabungan,
		isSukukOrder,
		approvalStatus,
		isPelunasan,
		detail,
		transactionId,
		returnPage,
		navigate
	]);
	(0, import_react.useEffect)(() => {
		if (!socket) return;
		const handleUpdate = (data) => {
			const incomingId = data.entityId || data.financing_id || data.withdrawal_id || data.id;
			if (String(incomingId) === String(transactionId)) fetchDetail(false);
		};
		socket.on("REGISTRATION_UPDATED", handleUpdate);
		socket.on("TRANSACTION_UPDATED", handleUpdate);
		socket.on("withdrawals:update", handleUpdate);
		socket.on("financing_applications:update", handleUpdate);
		socket.on("member_saving_targets:update", handleUpdate);
		return () => {
			socket.off("REGISTRATION_UPDATED", handleUpdate);
			socket.off("TRANSACTION_UPDATED", handleUpdate);
			socket.off("withdrawals:update", handleUpdate);
			socket.off("financing_applications:update", handleUpdate);
			socket.off("member_saving_targets:update", handleUpdate);
		};
	}, [
		socket,
		transactionId,
		fetchDetail
	]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransactionDetailSkeleton, {});
	const transactionType = isFinancing ? "pembiayaan" : isTabungan ? "tabungan" : isSukukOrder ? "sukuk" : "penarikan";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bg-light min-vh-100 pb-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: {
				opacity: 0,
				y: 20
			},
			animate: {
				opacity: 1,
				y: 0
			},
			className: "container-fluid py-4 px-3 px-md-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				className: "justify-content-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
					xs: 12,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default, {
						className: "border-0 shadow rounded-4 overflow-hidden mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `accent-header ${isFinancing ? "accent-financing" : "accent-default"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
							className: "p-4 p-md-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemberInfoSection_default, {
									detail,
									isFinancing
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "section-divider" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransactionBodyContent, {
									detail,
									isSukukOrder,
									isFinancing,
									isTabungan,
									isPelunasan
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "section-divider my-4" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApprovalSection_default, {
									approvalStatus,
									detail
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionButtons_default, {
										isFinancing,
										isTabungan,
										isSukukOrder,
										transactionId,
										onBack: handleBack,
										approvalStatus,
										productName: detail?.category,
										detail,
										returnPage
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "section-divider my-4" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransactionStatusFooter, {
									detail,
									approvalStatus,
									transactionType
								})
							]
						})]
					})
				})
			})
		})
	});
};
TransactionDetailPage.propTypes = { decodedToken: import_prop_types.default.shape({
	sukukOrder: import_prop_types.default.any,
	financingId: import_prop_types.default.any,
	tabunganId: import_prop_types.default.any,
	withdrawalId: import_prop_types.default.any,
	action: import_prop_types.default.string,
	return: import_prop_types.default.string,
	data: import_prop_types.default.object
}) };
//#endregion
export { TransactionDetailPage as default };
