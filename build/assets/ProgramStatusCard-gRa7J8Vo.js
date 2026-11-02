import "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { A as MdAccountBalance, E as Button, J as MdHandshake, L as MdCached, M as MdAddCircleOutline, S as Card_default, ln as FaFileAlt, st as MdReceiptLong } from "./vendor-react-D5pUDmay.js";
require_react();
//#endregion
//#region src/components/program/ProgramStatusCard.jsx
var import_jsx_runtime = require_jsx_runtime();
var ProgramStatusCard = ({ title, message, buttonText, onButtonClick, variant, status, pendingAmount, pendingDesc }) => {
	if (variant === "pending" || message && (message.toLowerCase().includes("menunggu") || message.toLowerCase().includes("approval"))) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default, {
		className: "program-status-card program-status-pending border-0 text-white text-center p-4 p-md-5 shadow-lg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "glass-sheen" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
			className: "relative",
			style: { zIndex: 2 },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "program-radar-pulse mb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-warning bg-opacity-15 p-4 rounded-circle text-white mx-auto",
						style: { width: "max-content" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdCached, {
							size: 48,
							className: "animate-spin-slow"
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "fw-bold mb-2 text-white",
					children: title || "Pengajuan Sedang Diproses"
				}),
				pendingAmount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "my-3 py-2 px-4 rounded-pill d-inline-block blur-effect",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "small opacity-75 d-block text-uppercase fw-bold",
						style: {
							fontSize: "9px",
							letterSpacing: "0.5px"
						},
						children: "Nominal Pengajuan"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
						className: "text-warning font-outfit",
						style: { fontSize: "18px" },
						children: ["Rp ", Number(pendingAmount).toLocaleString("id-ID")]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "card-text opacity-90 mb-4 px-3 text-white-90",
					children: message || pendingDesc || "Mohon tunggu verifikasi admin koperasi. Kami sedang memproses berkas Anda secara berkala."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "program-stepper-container mb-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "program-stepper-line",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "program-stepper-progress",
								style: { width: "50%" }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "program-stepper-step completed",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "program-stepper-node",
								children: "✓"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "program-stepper-label",
								children: "Pengajuan"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "program-stepper-step active",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "program-stepper-node",
								children: "2"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "program-stepper-label",
								children: "Verifikasi"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "program-stepper-step",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "program-stepper-node",
								children: "3"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "program-stepper-label",
								children: "Pencairan"
							})]
						})
					]
				}),
				buttonText && onButtonClick && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "light",
					className: "rounded-pill px-5 py-2 fw-bold text-warning border-0 program-cta-btn shadow-md",
					onClick: onButtonClick,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaFileAlt, {
						size: 14,
						className: "me-2"
					}), buttonText]
				})
			]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default, {
		className: "program-status-card program-status-empty border-0 text-white text-center p-4 p-md-5 shadow-lg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "program-decor-circle c1" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "program-decor-circle c2" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "program-glass-sheen" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
				className: "relative",
				style: { zIndex: 2 },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-4 text-white opacity-90",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdHandshake, {
							size: 56,
							className: "animate-pulse"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "fw-bold mb-2",
						children: title || "Mulai Pengajuan Baru"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "card-text opacity-80 mb-4 px-3",
						children: message || "Dapatkan berbagai fasilitas secara syariah dengan akad yang mudah, adil, dan transparan."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "program-benefits-grid mb-5 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "program-benefit-card",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "program-benefit-icon",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdHandshake, { size: 22 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "program-benefit-title",
										children: "100% Syariah"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "program-benefit-desc",
										children: "Akad transparan tanpa bunga riba."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "program-benefit-card",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "program-benefit-icon",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdReceiptLong, { size: 22 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "program-benefit-title",
										children: "Proses Instan"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "program-benefit-desc",
										children: "Pengajuan online cepat langsung diverifikasi admin."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "program-benefit-card",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "program-benefit-icon",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdAccountBalance, { size: 22 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "program-benefit-title",
										children: "Mudah & Aman"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "program-benefit-desc",
										children: "Sistem koperasi yang bersahabat dan terpercaya."
									})
								]
							})
						]
					}),
					buttonText && onButtonClick && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "light",
						className: "rounded-pill px-5 py-2.5 fw-bold text-primary border-0 program-cta-btn shadow-md d-inline-flex align-items-center gap-2",
						onClick: onButtonClick,
						children: [
							buttonText,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdAddCircleOutline, { size: 18 })
						]
					})
				]
			})
		]
	});
};
//#endregion
export { ProgramStatusCard as t };
