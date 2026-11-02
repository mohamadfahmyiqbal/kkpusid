import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { E as Button, S as Card_default, zt as FaCheckCircle } from "./vendor-react-D5pUDmay.js";
import { t as FinancialScrollButtons } from "./FinancialScrollButtons-DXW_bC2Z.js";
//#region src/features/dashboard/components/CandidateStepsCard.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var StepItem = import_react.memo(({ item, onNavigate }) => {
	const handleClick = (0, import_react.useCallback)((e) => {
		if (item.status === "pending") return;
		onNavigate("registrationPage");
	}, [item.status, onNavigate]);
	const handleButtonClick = (0, import_react.useCallback)((e) => {
		e.stopPropagation();
		onNavigate("registrationPage");
	}, [onNavigate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `dc-step ${item.status}`,
		style: {
			padding: "12px 6px",
			cursor: item.status !== "pending" ? "pointer" : "default"
		},
		onClick: handleClick,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dc-step-icon",
				style: {
					width: "34px",
					height: "34px",
					fontSize: "14px"
				},
				children: item.icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
				className: "fw-bold mt-1 text-center",
				style: {
					fontSize: "11px",
					lineHeight: "1.2",
					minHeight: "26px",
					display: "flex",
					alignItems: "center",
					justifyContent: "center"
				},
				children: item.title
			}),
			item.no === 2 && item.status === "active" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "primary",
				className: "mt-2 py-1 px-2 fw-bold text-nowrap",
				style: {
					fontSize: "9px",
					borderRadius: "6px"
				},
				onClick: handleButtonClick,
				children: "Daftar Sekarang"
			}) : item.no === 3 && item.status === "active" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "primary",
				className: "mt-2 py-1 px-2 fw-bold text-nowrap",
				style: {
					fontSize: "9px",
					borderRadius: "6px"
				},
				onClick: handleButtonClick,
				children: "Lihat Detail"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
				style: { fontSize: "10px" },
				className: "opacity-75",
				children: item.desc
			})
		]
	});
});
var CandidateStepsCard = ({ steps, onNavigate }) => {
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
	const handleViewDetail = (0, import_react.useCallback)(() => {
		onNavigate("registrationPage");
	}, [onNavigate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default, {
		className: "mb-4 border-0 shadow-sm dc-card-modern",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Header, {
			className: "bg-transparent border-0 pt-3 px-4 d-flex justify-content-between align-items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
				className: "fw-bold mb-0 text-dark",
				style: { fontSize: "15px" },
				children: "Status Pendaftaran Anggota"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "link",
				className: "p-0 text-decoration-none fw-bold",
				style: { fontSize: "12px" },
				onClick: handleViewDetail,
				children: "Lihat Detail"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
			className: "px-4 pb-3 pt-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted small mb-0",
					style: { fontSize: "12px" },
					children: "Lengkapi semua tahapan untuk menjadi anggota koperasi secara resmi."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "dc-info-box",
					style: {
						padding: "10px 14px",
						marginTop: "12px"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheckCircle, { style: {
						fontSize: "14px",
						flexShrink: 0
					} }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: {
							fontSize: "11px",
							lineHeight: "1.4"
						},
						children: "Untuk dapat mengakses keseluruhan fitur. (*Mengacu pada UU No 4 Tahun 2023 dan Permenkop UKM No 8 Tahun 2023. Layanan ini bersifat inclusive loop, hanya diperuntukan untuk Anggota Koperasi)"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "position-relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinancialScrollButtons, {
						onScrollLeft: handleScrollLeft,
						onScrollRight: handleScrollRight
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "dc-steps custom-scrollbar",
						style: { marginTop: "16px" },
						ref: scrollContainerRef,
						children: steps.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepItem, {
							item,
							onNavigate
						}, item.no))
					})]
				})
			]
		})]
	});
};
var CandidateStepsCard_default = import_react.memo(CandidateStepsCard);
//#endregion
export { CandidateStepsCard_default as default };
