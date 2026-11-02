import "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { E as Button, S as Card_default } from "./vendor-react-D5pUDmay.js";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var ProgramAccountCard = ({ accountData, handleSetoran, handlePengajuan, handleDetail }) => {
	if (!accountData) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default, {
		className: "premium-card premium-card-active border-0 shadow-lg font-outfit text-white",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "glass-sheen" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
			className: "p-5 text-center relative z-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "spinner-border text-teal mb-3",
				role: "status",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "visually-hidden",
					children: "Memuat..."
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-0 text-white-50",
				children: "Memuat data rekening..."
			})]
		})]
	});
	const isArisan = accountData?.akad?.toLowerCase().includes("peserta") || accountData?.produk?.toLowerCase().includes("arisan");
	const isPending = accountData?.isPending ?? !accountData?.isApproved;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default, {
		className: "premium-card premium-card-active border-0 text-white overflow-hidden shadow-lg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "glass-sheen" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
			className: "p-4 relative",
			style: { zIndex: 2 },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "d-flex justify-content-between align-items-center mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "d-flex align-items-center gap-2 px-3 py-1 rounded-pill blur-effect",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "fw-bold tracking-wider card-type-label",
							children: isArisan ? "INFORMASI ARISAN" : "INFORMASI PINJAMAN LUNAK"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "premium-status-badge",
						children: accountData.statusLabel || "AKTIF"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "dc-saldo-display mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "small opacity-75 mb-1 fw-medium",
						children: isArisan ? "Saldo Arisan" : "Total Pinjaman"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "fw-bold mb-0 text-white font-outfit card-amount-value",
						style: { fontSize: "30px" },
						children: accountData?.saldoAkhir ?? "-"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "row g-3 mb-4 pt-3 border-top border-white border-opacity-10 text-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "col-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-uppercase opacity-50 fw-bold mb-1 card-grid-label",
								children: "NAMA PRODUK"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "fw-bold small text-white-90",
								children: accountData?.produk ?? "-"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "col-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-uppercase opacity-50 fw-bold mb-1 card-grid-label",
								children: isArisan ? "STATUS/NO. PESERTA" : "NAMA ANGGOTA"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "fw-bold small text-white-90",
								children: isArisan ? accountData?.akad : accountData?.nama
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "col-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-uppercase opacity-50 fw-bold mb-1 card-grid-label",
								children: "TANGGAL BUKA"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "fw-bold small text-white-90",
								children: accountData?.tanggalBuka ?? "-"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "d-flex gap-2",
					children: [!isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						!accountData?.isLunas && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "light",
							className: "w-100 border-0 shadow-sm rounded-3 py-2.5 fw-bold text-teal d-flex align-items-center justify-content-center gap-2 premium-btn-hover premium-btn-text",
							onClick: handleSetoran,
							children: "Bayar Setoran"
						}),
						accountData?.isLunas && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "light",
							className: "w-100 border-0 shadow-sm rounded-3 py-2.5 fw-bold text-teal d-flex align-items-center justify-content-center gap-2 premium-btn-hover premium-btn-text",
							onClick: handlePengajuan,
							children: isArisan ? "Daftar Arisan Baru" : "Pengajuan Pinjaman Baru"
						}),
						!isArisan && handleDetail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline-light",
							className: "w-100 border border-white border-opacity-25 shadow-sm rounded-3 py-2.5 fw-bold text-white d-flex align-items-center justify-content-center gap-2 premium-btn-hover",
							onClick: handleDetail,
							children: "Detail Pengajuan"
						})
					] }), isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "light",
						className: "w-100 border-0 shadow-sm rounded-3 py-2.5 fw-bold text-warning d-flex align-items-center justify-content-center gap-2 premium-btn-hover premium-btn-text",
						onClick: handlePengajuan,
						children: "Lihat Pengajuan"
					})]
				})
			]
		})]
	});
};
//#endregion
export { ProgramAccountCard as t };
