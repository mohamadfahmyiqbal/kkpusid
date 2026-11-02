import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { St as FaArrowUp, c as Spinner, g as Form_default, l as Row, m as ListGroup_default, x as Col } from "./vendor-react-D5pUDmay.js";
import { t as formatRupiah } from "./formatRupiah-x0ZMkhue.js";
//#region src/pages/simpanan/PenarikanSimpananPage/components/MethodSelector.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MethodSelector = ({ value, onChange }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
		className: "mb-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
			className: "small fw-bold text-muted text-uppercase",
			style: { fontSize: "10px" },
			children: "Metode Pencairan"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Select, {
			value,
			onChange: (e) => onChange(e.target.value),
			className: "fw-bold text-primary",
			style: {
				borderRadius: "10px",
				padding: "10px"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: "TRANSFER",
				children: "Transfer Bank"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: "TUNAI",
				children: "Tunai / Ambil di Kantor"
			})]
		})]
	});
};
var MethodSelector_default = import_react.memo(MethodSelector);
//#endregion
//#region src/pages/simpanan/PenarikanSimpananPage/components/TransferDetails.jsx
var TransferDetails = ({ bankInfo }) => {
	if (!bankInfo || !bankInfo.bank_account_no) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "alert alert-warning small py-2",
		children: "Data rekening bank belum diatur. Silahkan hubungi admin."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-light p-3 rounded-3 mb-3 border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
			className: "mb-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
				className: "text-muted mb-0",
				style: { fontSize: "10px" },
				children: "NOMOR REKENING"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fw-bold",
				children: bankInfo.bank_account_no
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
			xs: 6,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
				className: "text-muted mb-0",
				style: { fontSize: "10px" },
				children: "BANK"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fw-bold",
				children: bankInfo.bank_name || bankInfo.bank
			})] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
			xs: 6,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
				className: "text-muted mb-0",
				style: { fontSize: "10px" },
				children: "NAMA NASABAH"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fw-bold text-truncate",
				children: bankInfo.account_holder || bankInfo.account_name
			})] })
		})] })]
	});
};
var TransferDetails_default = import_react.memo(TransferDetails);
//#endregion
//#region src/pages/simpanan/PenarikanSimpananPage/components/CashDetails.jsx
var CashDetails = ({ cashDetails, onChange }) => {
	const handleChange = (field, val) => {
		onChange({
			...cashDetails,
			[field]: val
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-light p-3 rounded-3 mb-3 border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
				className: "mb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
					className: "text-muted mb-0",
					style: { fontSize: "10px" },
					children: "NAMA PENERIMA"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
					size: "sm",
					type: "text",
					value: cashDetails.cashName,
					onChange: (e) => handleChange("cashName", e.target.value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
				className: "mb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
					className: "text-muted mb-0",
					style: { fontSize: "10px" },
					children: "LOKASI KANTOR"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
					size: "sm",
					type: "text",
					value: cashDetails.cashLocation,
					onChange: (e) => handleChange("cashLocation", e.target.value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
				className: "mb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
					className: "text-muted mb-0",
					style: { fontSize: "10px" },
					children: "WAKTU TRANSAKSI"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
					size: "sm",
					type: "text",
					value: cashDetails.cashTime,
					onChange: (e) => handleChange("cashTime", e.target.value)
				})]
			})
		]
	});
};
var CashDetails_default = import_react.memo(CashDetails);
//#endregion
//#region src/pages/simpanan/PenarikanSimpananPage/components/HistoryList.jsx
var HistoryList = ({ history, loading, onItemClick }) => {
	const getStatusStyle = (0, import_react.useMemo)(() => (status) => {
		const upperStatus = status?.toUpperCase();
		if (upperStatus === "APPROVED") return {
			bg: "#E8F5E9",
			color: "#2E7D32"
		};
		if (upperStatus === "REJECTED") return {
			bg: "#FFEBEE",
			color: "#C62828"
		};
		if (upperStatus === "PENDING") return {
			bg: "#FFF3E0",
			color: "#EF6C00"
		};
		return {
			bg: "#F5F5F5",
			color: "#757575"
		};
	}, []);
	const historyItems = (0, import_react.useMemo)(() => {
		if (!history?.length) return null;
		return history.map((item) => {
			const style = getStatusStyle(item.status);
			const formattedDate = new Date(item.created_at).toLocaleDateString("id-ID", {
				day: "2-digit",
				month: "short",
				year: "numeric",
				hour: "2-digit",
				minute: "2-digit"
			});
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListGroup_default.Item, {
				className: "px-0 py-3 border-0 d-flex align-items-center justify-content-between",
				style: {
					borderBottom: "1px solid #F1F4F8",
					cursor: "pointer"
				},
				onClick: () => onItemClick && onItemClick(item),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "d-flex align-items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-circle d-flex align-items-center justify-content-center me-3",
						style: {
							width: "45px",
							height: "45px",
							backgroundColor: "#F8F9FE"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaArrowUp, {
							size: 14,
							className: "text-primary"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "fw-bold text-dark mb-0",
						style: { fontSize: "14px" },
						children: "Pencairan Simpanan"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-muted",
						style: { fontSize: "11px" },
						children: formattedDate
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "fw-bold text-dark",
						style: { fontSize: "15px" },
						children: ["Rp ", formatRupiah(item.amount)]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "badge border-0",
						style: {
							fontSize: "10px",
							backgroundColor: style.bg,
							color: style.color,
							borderRadius: "6px",
							padding: "4px 8px"
						},
						children: item.status || "PENDING"
					})]
				})]
			}, item.withdrawal_id || item.id);
		});
	}, [
		history,
		getStatusStyle,
		onItemClick
	]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "text-center py-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
			animation: "border",
			size: "sm",
			variant: "primary"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-muted small mt-2",
			children: "Memuat riwayat..."
		})]
	});
	if (!history?.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-center py-5 text-muted small",
		children: "Belum ada riwayat transaksi."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListGroup_default, {
		variant: "flush",
		children: historyItems
	});
};
var HistoryList_default = import_react.memo(HistoryList);
//#endregion
//#region src/pages/simpanan/PenarikanSimpananPage/components/SaldoHeader.jsx
var SaldoHeader = ({ balance, loading }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "p-4 text-white position-relative overflow-hidden",
	style: {
		background: "linear-gradient(135deg, #0D47A1 0%, #1976D2 100%)",
		borderRadius: "24px",
		boxShadow: "0 10px 30px rgba(13, 71, 161, 0.25)"
	},
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "position-absolute",
		style: {
			top: "-20px",
			right: "-20px",
			width: "120px",
			height: "120px",
			borderRadius: "50%",
			background: "rgba(255,255,255,0.1)"
		}
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "position-relative z-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "opacity-75 small fw-medium mb-1 text-uppercase",
				style: { letterSpacing: "1px" },
				children: "Saldo Tersedia"
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
				animation: "grow",
				size: "sm",
				variant: "light"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "fw-bold mb-2",
				style: {
					fontSize: "2.4rem",
					letterSpacing: "-1px"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					style: {
						fontSize: "1.5rem",
						marginRight: "4px"
					},
					children: "Rp"
				}), formatRupiah(balance)]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "d-inline-flex align-items-center px-2 py-1 bg-white bg-opacity-10 rounded-pill mt-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-success rounded-circle me-2",
					style: {
						width: "6px",
						height: "6px"
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					style: {
						fontSize: "11px",
						fontWeight: "500"
					},
					children: "Tersinkronisasi Otomatis"
				})]
			})
		]
	})]
});
var SaldoHeader_default = import_react.memo(SaldoHeader);
//#endregion
export { MethodSelector_default as a, TransferDetails_default as i, HistoryList_default as n, CashDetails_default as r, SaldoHeader_default as t };
