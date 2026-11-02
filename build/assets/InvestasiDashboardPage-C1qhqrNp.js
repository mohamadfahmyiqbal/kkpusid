import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { Ft as FaCertificate, Lt as FaChartLine, Pr as useNavigate, b as Container, l as Row, rr as FaStore, x as Col, xt as FaArrowRight } from "./vendor-react-D5pUDmay.js";
import { s as jwtEncode } from "./index-BaUN0sjk.js";
//#region src/pages/investasi/InvestasiDashboardPage.css
var import_react = /* @__PURE__ */ __toESM(require_react());
//#endregion
//#region src/pages/investasi/InvestasiDashboardPage.jsx
var import_jsx_runtime = require_jsx_runtime();
var INVESTASI_OPTIONS = [{
	label: "Investasi Halal",
	key: "investasiHalal",
	icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCertificate, { size: 32 }),
	color: "success",
	description: "Investasi dalam produk Sukuk dan reksadana syariah yang aman, menguntungkan, dan bebas riba.",
	cta: "Mulai Investasi"
}, {
	label: "Pendanaan Syariah",
	key: "pendanaanSyariah",
	icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaStore, { size: 32 }),
	color: "primary",
	description: "Dukung pertumbuhan usaha kecil menengah (UKM) dengan prinsip bagi hasil yang adil dan memberdayakan.",
	cta: "Lihat Peluang"
}];
var InvestasiCard = ({ option, onClick }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: `investasi-option-card ${option.color}`,
	onClick,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `investasi-card-icon-wrapper ${option.color}`,
			children: option.icon
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "investasi-card-title",
			children: option.label
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "investasi-card-desc",
			children: option.description
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `investasi-card-footer ${option.color}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: option.cta }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaArrowRight, {
				className: "investasi-card-footer-icon",
				size: 14
			})]
		})
	]
});
var InvestasiDashboardPage = () => {
	const navigate = useNavigate();
	const handleOptionClick = (0, import_react.useCallback)((key) => {
		navigate(`/${jwtEncode({ page: key })}`);
	}, [navigate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "investasi-page-container investasi-fade-in",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
			fluid: true,
			className: "px-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "investasi-hero",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "investasi-hero-content",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "investasi-hero-title",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								padding: "12px",
								background: "rgba(255,255,255,0.2)",
								borderRadius: "16px",
								display: "inline-flex",
								backdropFilter: "blur(10px)"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaChartLine, {
								size: 30,
								color: "#ffffff"
							})
						}), "Pusat Investasi Syariah"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "investasi-hero-subtitle",
						children: "Kembangkan aset Anda dengan aman dan penuh berkah. Jelajahi berbagai instrumen investasi dan pendanaan produktif yang dikelola secara transparan dan sesuai syariat."
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				className: "justify-content-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
					lg: 12,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "investasi-section-title",
							children: "Instrumen Pilihan"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "investasi-section-desc",
							children: "Pilih jenis produk pendanaan atau investasi yang sesuai dengan tujuan finansial Anda."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						className: "g-4",
						children: INVESTASI_OPTIONS.map((option, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
							md: 6,
							style: { animationDelay: `${idx * .15}s` },
							className: "investasi-fade-in",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvestasiCard, {
								option,
								onClick: () => handleOptionClick(option.key)
							})
						}, option.key))
					})]
				})
			})]
		})
	});
};
//#endregion
export { InvestasiDashboardPage as default };
