import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime, t as purify } from "./vendor-rpDlma0K.js";
import { E as Button, Pr as useNavigate, S as Card_default, b as Container, c as Spinner, l as Row, x as Col, zt as FaCheckCircle } from "./vendor-react-D5pUDmay.js";
import { s as jwtEncode } from "./index-BaUN0sjk.js";
import { t as TrainingService } from "./training.service-Bgth343V.js";
//#region src/pages/training/BacaMateri/BacaMateri.css
var import_react = /* @__PURE__ */ __toESM(require_react());
//#endregion
//#region src/pages/training/BacaMateri/BacaMateri.jsx
var import_jsx_runtime = require_jsx_runtime();
var BacaMateri = ({ decodedToken }) => {
	const navigate = useNavigate();
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [materi, setMateri] = (0, import_react.useState)(null);
	const [scrollProgress, setScrollProgress] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const handleScroll = () => {
			const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
			setScrollProgress(window.scrollY / totalHeight * 100);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	(0, import_react.useEffect)(() => {
		const { kurikulumId, modulId } = decodedToken || {};
		const fetchContent = async () => {
			try {
				setLoading(true);
				const response = await TrainingService.getMaterialDetail(modulId);
				if (response.status) {
					const data = response.data;
					setMateri({
						id: data.material_id,
						title: data.material_title,
						kurikulumTitle: data.curriculum?.curriculum_name || "Materi Training",
						duration: data.duration || "15 Menit",
						content: data.description
					});
				}
			} catch (err) {
				console.error("Failed to fetch material content", err);
			} finally {
				setLoading(false);
				window.scrollTo(0, 0);
			}
		};
		if (modulId) fetchContent();
	}, [decodedToken]);
	const handleFinish = (0, import_react.useCallback)(() => {
		navigate(`/${jwtEncode({
			page: "evaluasi",
			kurikulumId: decodedToken?.kurikulumId,
			modulId: decodedToken?.modulId,
			type: decodedToken?.type
		})}`);
	}, [navigate, decodedToken]);
	const handleBackToDashboard = (0, import_react.useCallback)(() => {
		navigate(`/${jwtEncode({ page: "trainingDashboard" })}`);
	}, [navigate]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "d-flex flex-column justify-content-center align-items-center vh-100 bg-white",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
			animation: "border",
			variant: "primary",
			size: "lg"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-muted",
			children: "Membuka materi..."
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "baca-materi-container pb-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "reading-progress-bar",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "reading-progress-fill",
				style: { width: `${scrollProgress}%` }
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
			fluid: true,
			className: "pt-4 px-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				className: "justify-content-center mx-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
					xs: 12,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default, {
						className: "materi-content-card p-4 p-md-5 mb-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "materi-body",
							dangerouslySetInnerHTML: { __html: purify.sanitize(materi.content) }
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
							className: "mt-5 pt-4 border-top",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "materi-meta mb-4 text-start small text-muted",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-0",
									children: "Selamat! Anda telah menyelesaikan materi ini. Silakan lanjut ke Quiz untuk menguji pemahaman Anda."
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "d-flex flex-column flex-md-row gap-3 justify-content-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline-primary",
									className: "px-5 py-3 fw-bold rounded-pill",
									onClick: handleBackToDashboard,
									children: "Nanti Saja"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "primary",
									className: "btn-finish-reading px-5 py-3",
									onClick: handleFinish,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheckCircle, { className: "me-2" }), "Mulai Quiz Materi"]
								})]
							})]
						})]
					})
				})
			})
		})]
	});
};
//#endregion
export { BacaMateri as default };
