import "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { Ut as FaChevronLeft, Wt as FaChevronRight } from "./vendor-react-D5pUDmay.js";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var FinancialScrollButtons = ({ onScrollLeft, onScrollRight }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick: onScrollLeft,
		className: "btn btn-light rounded-circle shadow-sm position-absolute start-0 top-50 translate-middle-y z-3 d-flex align-items-center justify-content-center scroll-btn scroll-btn-left",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaChevronLeft, {})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick: onScrollRight,
		className: "btn btn-light rounded-circle shadow-sm position-absolute end-0 top-50 translate-middle-y z-3 d-flex align-items-center justify-content-center scroll-btn scroll-btn-right",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaChevronRight, {})
	})] });
};
//#endregion
export { FinancialScrollButtons as t };
