import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { Er as FaUsers, Lt as FaChartLine, Nn as FaMapMarkerAlt, Ot as FaBriefcase, b as Container, l as Row, x as Col } from "./vendor-react-D5pUDmay.js";
//#region src/pages/global/LandingPage/component/StatsSection.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var StatsSection = ({ stats = null }) => {
	const statsData = stats ? [
		{
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUsers, {}),
			value: `${stats.active_members}+`,
			label: "Anggota Aktif"
		},
		{
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaBriefcase, {}),
			value: `${stats.financed_businesses}+`,
			label: "Usaha Dibiayai"
		},
		{
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaChartLine, {}),
			value: `${stats.satisfaction_rate}%`,
			label: "Tingkat Kepuasan"
		},
		{
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaMapMarkerAlt, {}),
			value: `${stats.cities}+`,
			label: "Kota di Indonesia"
		}
	] : [];
	if (statsData.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "pb-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pbs-stats",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				className: "g-4",
				children: statsData.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
					xs: 12,
					sm: 6,
					md: 6,
					lg: 3,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pbs-stat-item",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pbs-stat-icon",
							children: item.icon
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pbs-stat-content",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: item.value }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.label })]
						})]
					})
				}, i))
			})
		}) })
	});
};
var StatsSection_default = import_react.memo(StatsSection);
//#endregion
export { StatsSection_default as default };
