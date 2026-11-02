import "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { S as Card_default } from "./vendor-react-D5pUDmay.js";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var Card = ({ variant = "default", theme = "primary", className = "", children, style = {}, ...props }) => {
	let customClass = "border-0 shadow-sm";
	let customStyle = { ...style };
	let renderExtras = null;
	if (variant === "premium") {
		customClass = "premium-card premium-card-active border-0 text-white overflow-hidden shadow-lg animate-fade-in premium-main-card";
		const themes = {
			primary: {
				gradient: "linear-gradient(135deg, #075985 0%, #0369a1 40%, #0ea5e9 100%)",
				shadow: "rgba(7, 89, 133, 0.3)"
			},
			success: {
				gradient: "linear-gradient(135deg, #065f46 0%, #059669 40%, #10b981 100%)",
				shadow: "rgba(5, 150, 105, 0.3)"
			},
			warning: {
				gradient: "linear-gradient(135deg, #92400e 0%, #d97706 40%, #f59e0b 100%)",
				shadow: "rgba(217, 119, 6, 0.3)"
			}
		};
		const activeTheme = themes[theme] || themes.primary;
		if (!customStyle.background) customStyle.background = activeTheme.gradient;
		if (!customStyle.boxShadow) customStyle.boxShadow = `0 20px 40px -10px ${activeTheme.shadow}`;
		renderExtras = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "glass-sheen" });
	} else if (variant === "form") customClass = "premium-form-card border-0 shadow-sm";
	else if (variant === "stat") customClass = "dashboard-stat-card shadow-sm bg-white rounded-4 border-light-1";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default, {
		className: `${customClass} ${className}`.trim(),
		style: customStyle,
		...props,
		children: [renderExtras, children]
	});
};
Card.Body = Card_default.Body;
Card.Header = Card_default.Header;
Card.Footer = Card_default.Footer;
Card.Img = Card_default.Img;
Card.ImgOverlay = Card_default.ImgOverlay;
Card.Title = Card_default.Title;
Card.Subtitle = Card_default.Subtitle;
Card.Text = Card_default.Text;
Card.Link = Card_default.Link;
//#endregion
export { Card as t };
