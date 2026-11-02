import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { Kt as FaClipboardList, Qn as FaShieldAlt, Sr as FaUserPlus, b as Container, gr as FaUserCheck, l as Row, x as Col } from "./vendor-react-D5pUDmay.js";
//#region src/pages/global/LandingPage/component/HowItWorksSection.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var HowItWorksSection = () => {
	const steps = [
		{
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUserPlus, {}),
			title: "Buat Akun",
			description: "Daftar akun baru menggunakan nama, email, dan password Anda.",
			color: "#1877f2"
		},
		{
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaClipboardList, {}),
			title: "Daftar Menjadi Anggota",
			description: "Lengkapi formulir pendaftaran anggota beserta dokumen pendukung.",
			color: "#00c6a7"
		},
		{
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaShieldAlt, {}),
			title: "Approval",
			description: "Proses verifikasi dan persetujuan berkas pendaftaran oleh pengurus.",
			color: "#f59e0b"
		},
		{
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUserCheck, {}),
			title: "Menjadi Anggota Koperasi",
			description: "Secara resmi terdaftar sebagai anggota koperasi dan akses semua layanan.",
			color: "#2563eb"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "cara-kerja",
		className: "pbs-section",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center mb-5 pb-lg-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "pbs-badge",
						children: "Langkah Mudah"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "pbs-title-section mt-3",
						children: "Cara Kerja Kami"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "pbs-subtitle-section mx-auto mt-3",
						children: "Proses yang transparan dan cepat untuk mendukung pertumbuhan bisnis Anda sesuai prinsip syariah."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pbs-stepper-mobile d-lg-none",
				children: steps.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pbs-step-item",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center p-4 h-100",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pbs-step-icon",
								style: {
									background: `${step.color}15`,
									color: step.color,
									border: `1px solid ${step.color}30`
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "pbs-step-number",
									children: index + 1
								}), step.icon]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
								className: "text-white fw-bold mb-3",
								children: step.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-white-50 mb-0",
								children: step.description
							}),
							index < steps.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pbs-step-connector-mobile" })
						]
					})
				}, index))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				className: "g-4 d-none d-lg-flex",
				children: steps.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
					lg: 3,
					className: "pbs-step-item",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center p-4 h-100",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pbs-step-icon",
								style: {
									background: `${step.color}15`,
									color: step.color,
									border: `1px solid ${step.color}30`
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "pbs-step-number",
									children: index + 1
								}), step.icon]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
								className: "text-white fw-bold mb-3",
								children: step.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-white-50 mb-0",
								children: step.description
							}),
							index < steps.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pbs-step-connector" })
						]
					})
				}, index))
			})
		] })
	});
};
var HowItWorksSection_default = import_react.memo(HowItWorksSection);
//#endregion
export { HowItWorksSection_default as default };
