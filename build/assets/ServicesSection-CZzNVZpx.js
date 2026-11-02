import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { Er as FaUsers, It as FaChalkboardTeacher, S as Card_default, _n as FaHandshake, b as Container, gn as FaHandHoldingUsd, l as Row, x as Col } from "./vendor-react-D5pUDmay.js";
//#region src/pages/global/LandingPage/component/ServicesSection.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var iconMap = {
	FaHandHoldingUsd,
	FaChalkboardTeacher,
	FaHandshake,
	FaUsers
};
var ServicesSection = ({ services = [] }) => {
	const handleServiceClick = (serviceTitle) => {
		const contactSection = document.getElementById("kontak");
		if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" });
	};
	const uniqueServices = services.reduce((acc, current) => {
		if (!acc.some((item) => item.title === current.title)) acc.push(current);
		return acc;
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-5",
		id: "layanan",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "pbs-title-section text-center mb-5",
			children: "Layanan Unggulan Kami"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
			className: "g-4",
			children: uniqueServices.map((item, i) => {
				const IconComponent = iconMap[item.icon] || FaHandHoldingUsd;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
					xs: 12,
					sm: 6,
					md: 6,
					lg: 3,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default, {
						className: "pbs-card h-100 border-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
							className: "p-4 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "pbs-icon mx-auto mb-3 d-flex align-items-center justify-content-center",
									style: { background: item.color },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconComponent, {
										size: 24,
										color: "#ffffff"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", { children: item.title }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.description || item.desc }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#",
									onClick: (e) => {
										e.preventDefault();
										handleServiceClick(item.title);
									},
									children: "Selengkapnya →"
								})
							]
						})
					})
				}, item.id || i);
			})
		})] })
	});
};
var ServicesSection_default = import_react.memo(ServicesSection);
//#endregion
export { ServicesSection_default as default };
