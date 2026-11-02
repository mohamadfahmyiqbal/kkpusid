import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { H as MdChevronRight, Pr as useNavigate, V as MdCheckCircle, nt as MdPayments, st as MdReceiptLong } from "./vendor-react-D5pUDmay.js";
import { n as useProfile } from "./ProfileContext-DQCnAT09.js";
import { s as jwtEncode } from "./index-BaUN0sjk.js";
import { t as FinancialScrollButtons } from "./FinancialScrollButtons-DXW_bC2Z.js";
//#region src/features/dashboard/components/TagihanSection.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var currencyFormatter = new Intl.NumberFormat("id-ID", {
	style: "currency",
	currency: "IDR",
	minimumFractionDigits: 0
});
var formatCurrency = (amount) => currencyFormatter.format(amount || 0);
/**
* Komponen kartu tagihan individu dengan desain premium
*/
var BillingCard = import_react.memo(({ item, onPay }) => {
	const formattedAmount = (0, import_react.useMemo)(() => formatCurrency(Number(item.amount)), [item.amount]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "dc-bill-item-wrapper",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "dc-bill-card",
			onClick: () => onPay(item.bill_id),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "dc-bill-card-header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "dc-bill-icon-bg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdReceiptLong, { size: 18 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "dc-bill-type",
						children: item.tx_type || "TAGIHAN"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "dc-bill-card-body",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "dc-bill-desc",
						children: item.description || "Pembayaran Tagihan"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "dc-bill-amount",
						children: formattedAmount
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "dc-bill-card-footer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "dc-bill-action-text",
						children: "Bayar Sekarang"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdChevronRight, { size: 18 })]
				})
			]
		})
	});
});
/**
* Skeleton loading untuk item tagihan
*/
var BillSkeleton = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: "dc-bill-item-wrapper",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "dc-bill-card skeleton",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "placeholder-glow",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "placeholder col-4 mb-3 rounded",
					style: { height: "24px" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "placeholder col-10 mb-2 rounded",
					style: { height: "16px" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "placeholder col-8 rounded",
					style: { height: "20px" }
				})
			]
		})
	})
});
var TagihanSection = () => {
	const navigate = useNavigate();
	const { bills, loading } = useProfile();
	const scrollContainerRef = (0, import_react.useRef)(null);
	const handleScrollLeft = (0, import_react.useCallback)(() => {
		if (scrollContainerRef.current) scrollContainerRef.current.scrollBy({
			left: -250,
			behavior: "smooth"
		});
	}, []);
	const handleScrollRight = (0, import_react.useCallback)(() => {
		if (scrollContainerRef.current) scrollContainerRef.current.scrollBy({
			left: 250,
			behavior: "smooth"
		});
	}, []);
	const handleNavigation = (0, import_react.useCallback)((billId) => {
		if (!billId) return;
		navigate(`/${jwtEncode({
			page: "invoicePage",
			billId,
			return: "dashboard"
		})}`);
	}, [navigate]);
	const totalAmount = (0, import_react.useMemo)(() => {
		return bills?.reduce((acc, bill) => acc + (Number(bill.amount) || 0), 0) || 0;
	}, [bills]);
	const formattedTotal = (0, import_react.useMemo)(() => formatCurrency(totalAmount), [totalAmount]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mb-4 dc-bill-section px-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "placeholder-glow mb-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "placeholder col-5 rounded",
				style: { height: "24px" }
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "dc-bill-scroll-container",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BillSkeleton, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BillSkeleton, {})]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mb-4 dc-bill-section",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "d-flex align-items-center justify-content-between mb-3 px-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
				className: "fw-bold mb-0",
				style: {
					fontSize: "1rem",
					color: "#1e293b"
				},
				children: "Tagihan Perlu Dibayar"
			}), bills && bills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "badge bg-danger bg-opacity-10 text-danger rounded-pill px-3 py-2 fw-bold",
				style: { fontSize: "11px" },
				children: [bills.length, " Tagihan"]
			})]
		}), bills && bills.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-3 mb-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dc-bill-summary-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "d-flex align-items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "dc-summary-icon",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdPayments, { size: 20 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-uppercase opacity-70 fw-bold",
						style: {
							fontSize: "10px",
							letterSpacing: "0.5px"
						},
						children: "TOTAL TUNGGAKAN"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "fw-bold h5 mb-0 text-danger",
						children: formattedTotal
					})] })]
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "position-relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinancialScrollButtons, {
				onScrollLeft: handleScrollLeft,
				onScrollRight: handleScrollRight
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dc-bill-scroll-container custom-scrollbar",
				ref: scrollContainerRef,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "dc-bill-scroll-content",
					children: [bills.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BillingCard, {
						item,
						onPay: handleNavigation
					}, `${item.bill_id ?? "bill"}-${index}`)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
						width: "16px",
						flexShrink: 0
					} })]
				})
			})]
		})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "dc-empty-bill-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "dc-empty-icon-wrapper",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdCheckCircle, { size: 32 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
						className: "fw-bold mb-1",
						children: "Semua Tagihan Terbayar"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted mb-0",
						style: { fontSize: "12.5px" },
						children: "Alhamdulillah, Anda tidak memiliki tagihan yang tertunda saat ini."
					})
				]
			})
		})]
	});
};
//#endregion
export { TagihanSection as default };
