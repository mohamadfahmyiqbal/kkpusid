import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime, jn as require_react_dom } from "./vendor-rpDlma0K.js";
import { Mt as FaCalendarAlt, Wt as FaChevronRight, an as FaExclamationTriangle, c as Spinner, dn as FaFileInvoiceDollar, in as FaExclamationCircle, xt as FaArrowRight, zt as FaCheckCircle } from "./vendor-react-D5pUDmay.js";
import { n as useProfile } from "./ProfileContext-DQCnAT09.js";
import { r as MAX_HEIGHTS } from "./index-BaUN0sjk.js";
import { t as useNavigation } from "./useNavigation-BZEAXjTS.js";
import { i as sanitizeText, r as safeDateOnlyFormat } from "./sanitization-Pu2qiHfl.js";
//#region src/components/layout/dropdowns/KeranjangDropdown.css
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
//#endregion
//#region src/components/layout/dropdowns/KeranjangDropdown.jsx
var import_jsx_runtime = require_jsx_runtime();
var KeranjangDropdown = (0, import_react.memo)(function KeranjangDropdown() {
	const { bills, loading } = useProfile();
	const { navigateTo } = useNavigation();
	const [error, setError] = (0, import_react.useState)(null);
	const [isDropdownOpen, setIsDropdownOpen] = (0, import_react.useState)(false);
	const [dropdownPos, setDropdownPos] = (0, import_react.useState)({
		top: 70,
		right: 0,
		width: 340
	});
	const [isAnimating, setIsAnimating] = (0, import_react.useState)(false);
	const btnRef = (0, import_react.useRef)(null);
	const safeBills = (0, import_react.useMemo)(() => Array.isArray(bills) ? bills : [], [bills]);
	const formatIDR = (0, import_react.useMemo)(() => new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		maximumFractionDigits: 0
	}), []);
	const safeFormatIDR = (0, import_react.useCallback)((val) => {
		try {
			return formatIDR.format(val || 0);
		} catch {
			return "Rp 0";
		}
	}, [formatIDR]);
	const safeItemData = (0, import_react.useCallback)((item) => {
		if (!item || typeof item !== "object") return {
			id: "unknown",
			description: "Data tidak tersedia",
			amount: 0,
			due_date: null
		};
		return {
			id: item.bill_item_id || item.id || `unknown-${Date.now()}`,
			description: sanitizeText(item.description) || "Tanpa deskripsi",
			amount: Number(item.amount) || 0,
			due_date: item.due_date
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (error && Array.isArray(bills)) setError(null);
	}, [bills, error]);
	const handleNavigate = (0, import_react.useCallback)(() => {
		setIsDropdownOpen(false);
		navigateTo("billingPage");
	}, [navigateTo]);
	const handleToggle = (0, import_react.useCallback)(() => {
		if (!isDropdownOpen && btnRef.current) {
			const rect = btnRef.current.getBoundingClientRect();
			const dropdownWidth = Math.min(340, window.innerWidth - 24);
			setDropdownPos({
				top: rect.bottom + 8,
				right: Math.max(12, window.innerWidth - rect.right - 4),
				width: dropdownWidth
			});
			setIsAnimating(true);
			setTimeout(() => setIsAnimating(false), 300);
		}
		setIsDropdownOpen((prev) => !prev);
	}, [isDropdownOpen]);
	(0, import_react.useEffect)(() => {
		if (!isDropdownOpen) return;
		const onKey = (e) => {
			if (e.key === "Escape") setIsDropdownOpen(false);
		};
		const updatePos = () => {
			if (btnRef.current) {
				const rect = btnRef.current.getBoundingClientRect();
				const dropdownWidth = Math.min(340, window.innerWidth - 24);
				setDropdownPos({
					top: rect.bottom + 8,
					right: Math.max(12, window.innerWidth - rect.right - 4),
					width: dropdownWidth
				});
			}
		};
		window.addEventListener("scroll", updatePos, true);
		window.addEventListener("resize", updatePos);
		document.addEventListener("keydown", onKey);
		return () => {
			window.removeEventListener("scroll", updatePos, true);
			window.removeEventListener("resize", updatePos);
			document.removeEventListener("keydown", onKey);
		};
	}, [isDropdownOpen]);
	const { overdueBills } = (0, import_react.useMemo)(() => {
		const now = /* @__PURE__ */ new Date();
		return { overdueBills: safeBills.filter((b) => b.due_date && new Date(b.due_date) < now) };
	}, [safeBills]);
	const totalAmount = (0, import_react.useMemo)(() => safeBills.reduce((sum, b) => sum + (Number(b.amount) || 0), 0), [safeBills]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "nav-item keranjang-dropdown-container",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			ref: btnRef,
			className: "btn btn-link p-0 border-0 text-white keranjang-btn",
			onClick: handleToggle,
			"aria-expanded": isDropdownOpen,
			"aria-haspopup": "true",
			"aria-label": "Tagihan",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaFileInvoiceDollar, { size: 18 }), safeBills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `kd-badge ${overdueBills.length > 0 ? "kd-badge-danger" : "kd-badge-warning"}`,
				children: safeBills.length
			})]
		}), isDropdownOpen && (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				position: "fixed",
				inset: 0,
				zIndex: 1090,
				backgroundColor: "transparent"
			},
			onClick: () => setIsDropdownOpen(false)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `kd-panel ${isAnimating ? "animating-in" : ""}`,
			style: {
				top: dropdownPos.top,
				right: dropdownPos.right,
				width: dropdownPos.width
			},
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "kd-header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 10
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "kd-header-icon-wrap",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaFileInvoiceDollar, {
									size: 15,
									color: "#ffffff"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "kd-header-title",
								children: "Tagihan Pending"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "kd-header-subtitle",
								children: safeBills.length > 0 ? `${safeBills.length} tagihan aktif` : "Tidak ada tagihan"
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 6
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: handleNavigate,
								className: "kd-btn-outline",
								children: "Semua"
							}), safeBills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: handleNavigate,
								className: "kd-btn-solid",
								children: ["Bayar ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaArrowRight, { size: 10 })]
							})]
						})]
					}), safeBills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "kd-total-pill",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "kd-total-label",
							children: "Total Tagihan"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "kd-total-value",
							children: safeFormatIDR(totalAmount)
						})]
					})]
				}),
				overdueBills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "kd-warning-bar",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaExclamationCircle, {
						size: 13,
						color: "#ef4444"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "kd-warning-text",
						children: [overdueBills.length, " tagihan sudah melewati jatuh tempo!"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						maxHeight: MAX_HEIGHTS.KERANJANG_LIST,
						overflowY: "auto"
					},
					children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							padding: "32px 20px",
							textAlign: "center"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
							animation: "border",
							size: "sm",
							className: "me-2"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: {
								color: "#64748b",
								fontSize: 13
							},
							children: "Memuat tagihan..."
						})]
					}) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							padding: "32px 20px",
							textAlign: "center"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaExclamationTriangle, {
								color: "#f59e0b",
								size: 28
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: {
									color: "#64748b",
									fontSize: 13,
									margin: "8px 0"
								},
								children: error
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setError(null),
								style: {
									border: "1px solid #e2e8f0",
									borderRadius: "8px",
									padding: "6px 16px",
									background: "#fff",
									cursor: "pointer",
									fontSize: 13,
									color: "#475569"
								},
								children: "Coba lagi"
							})
						]
					}) : safeBills.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "kd-empty-state",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "kd-empty-icon",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheckCircle, {
								size: 28,
								color: "#059669"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "kd-empty-title",
							children: "Semua Tagihan Lunas! 🎉"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "kd-empty-subtitle",
							children: "Tidak ada tagihan yang perlu dibayar"
						})] })]
					}) : safeBills.map((item) => {
						const safeData = safeItemData(item);
						const now = /* @__PURE__ */ new Date();
						const isOverdue = safeData.due_date && new Date(safeData.due_date) < now;
						const isDueSoon = !isOverdue && safeData.due_date && new Date(safeData.due_date) <= new Date(Date.now() + 3 * 864e5);
						let iconClass = "default";
						let dateClass = "default";
						if (isOverdue) {
							iconClass = "danger";
							dateClass = "danger";
						} else if (isDueSoon) {
							iconClass = "warning";
							dateClass = "warning";
						}
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: handleNavigate,
							className: `kd-item ${isOverdue ? "overdue" : ""}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `kd-item-icon ${iconClass}`,
									children: isOverdue ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaExclamationCircle, {
										size: 16,
										color: "#ef4444"
									}) : isDueSoon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCalendarAlt, {
										size: 16,
										color: "#d97706"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaFileInvoiceDollar, {
										size: 16,
										color: "#3b82f6"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										flex: 1,
										minWidth: 0
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "kd-item-title",
										children: safeData.description
									}), safeData.due_date && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `kd-item-date ${dateClass}`,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCalendarAlt, { size: 9 }),
											isOverdue ? "Terlambat: " : "Jatuh tempo: ",
											safeDateOnlyFormat(safeData.due_date)
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										flexShrink: 0,
										textAlign: "right"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "kd-item-amount",
										children: safeFormatIDR(safeData.amount)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaChevronRight, {
										size: 10,
										color: "#cbd5e1"
									})]
								})
							]
						}, safeData.id);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "kd-footer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: handleNavigate,
						className: "kd-footer-btn-secondary",
						children: "Semua Tagihan"
					}), safeBills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleNavigate,
						className: "kd-footer-btn-primary",
						children: ["Bayar Sekarang ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaArrowRight, { size: 11 })]
					})]
				})
			]
		})] }), document.body)]
	});
});
//#endregion
export { KeranjangDropdown as default };
