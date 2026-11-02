import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { At as FaBullseye, b as Container, l as Row, sn as FaEye, x as Col } from "./vendor-react-D5pUDmay.js";
//#region src/pages/global/LandingPage/component/AboutUsSection.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AboutUsSection = ({ about = null }) => {
	const handleScrollToContact = (0, import_react.useCallback)((e) => {
		e.preventDefault();
		const contactSection = document.getElementById("kontak");
		if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" });
	}, []);
	if (!about) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "tentang",
		className: "pbs-section",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
			className: "align-items-center g-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
				xs: 12,
				lg: 6,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "pbs-badge",
						children: "Tentang Kami"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "pbs-title-section mt-3",
						children: about?.title || "Membangun Ekonomi Umat"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "pbs-subtitle-section text-start m-0 mt-3 mb-4",
						children: about?.description || "Paguyuban Usaha Sukses hadir sebagai wadah koperasi modern yang berfokus pada pemberdayaan ekonomi umat."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 pt-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#kontak",
							className: "pbs-btn-primary",
							onClick: handleScrollToContact,
							children: "Hubungi Kami"
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
				xs: 12,
				lg: 6,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pbs-card-glass p-4 p-lg-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "d-flex flex-column gap-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pbs-about-item",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pbs-about-icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaEye, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
								className: "fw-bold text-white mb-2",
								children: "Visi"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-0 text-white-50 lh-base",
								children: about?.vision || "Menjadi koperasi syariah terpercaya dalam membangun kemandirian ekonomi umat."
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pbs-about-item",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pbs-about-icon",
								style: {
									background: "rgba(24, 119, 242, 0.15)",
									color: "#1877f2"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaBullseye, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
								className: "fw-bold text-white mb-2",
								children: "Misi"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-0 text-white-50 lh-base",
								children: about?.mission || "Memberikan layanan pembiayaan syariah yang adil dan memberdayakan usaha anggota."
							})] })]
						})]
					})
				})
			})]
		}) })
	});
};
var AboutUsSection_default = (0, import_react.memo)(AboutUsSection);
//#endregion
export { AboutUsSection_default as default };
