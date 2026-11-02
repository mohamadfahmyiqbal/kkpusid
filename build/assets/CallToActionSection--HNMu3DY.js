import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { E as Button, b as Container, l as Row, x as Col } from "./vendor-react-D5pUDmay.js";
import { s as jwtEncode } from "./index-BaUN0sjk.js";
//#region src/pages/global/LandingPage/component/CallToActionSection.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CallToActionSection = () => {
	const handleApplyNow = () => {
		window.location.href = "/" + jwtEncode({ page: "accountRegisterPage" });
	};
	const handleContactUs = () => {
		const contactSection = document.getElementById("kontak");
		if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" });
		else window.location.href = "/contact";
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "pb-5",
		id: "kontak",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pbs-cta",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
				className: "align-items-center gy-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
					xs: 12,
					lg: 7,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Siap Mengembangkan Usaha Anda?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Bergabung sekarang dan rasakan manfaatnya." })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
					xs: 12,
					lg: 5,
					className: "text-center text-lg-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "d-flex flex-column flex-sm-row gap-2 justify-content-center justify-content-lg-end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "pbs-btn-main rounded-pill px-4",
							onClick: handleApplyNow,
							children: "Ajukan Sekarang"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline-light",
							className: "rounded-pill px-4",
							onClick: handleContactUs,
							children: "Hubungi Kami"
						})]
					})
				})]
			})
		}) })
	});
};
var CallToActionSection_default = import_react.memo(CallToActionSection);
//#endregion
export { CallToActionSection_default as default };
