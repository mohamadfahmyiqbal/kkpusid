import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, T as require_sweetalert2_all, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { E as Button, Er as FaUsers, Pr as useNavigate, S as Card_default, b as Container, fn as FaFileSignature, l as Row, x as Col } from "./vendor-react-D5pUDmay.js";
import { s as jwtEncode } from "./index-BaUN0sjk.js";
//#region src/pages/program/arisan/ArisanJoinPage.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_sweetalert2_all = /* @__PURE__ */ __toESM(require_sweetalert2_all());
var import_jsx_runtime = require_jsx_runtime();
var MOCK_ARISAN_LIST = [{
	batch: "Batch 1",
	kategori: "Arisan Haji/Umroh Skema 1",
	peserta: "6/6 Peserta",
	targetNominal: "Rp. 50.400.000",
	term: "36 Bulan",
	setoranPerBulan: "Rp. 1.400.000",
	periodeAngsuran: "Jan 2025 - Des 2028",
	status: "Tutup"
}, {
	batch: "Batch 2",
	kategori: "Arisan Haji/Umroh Skema 1",
	peserta: "5/30 Peserta",
	targetNominal: "Rp. 50.400.000",
	term: "36 Bulan",
	setoranPerBulan: "Rp. 1.400.000",
	periodeAngsuran: "Jan 2025 - Des 2028",
	status: "Buka"
}];
var ArisanListItem = import_react.memo(({ arisan, handleJoin, handleWaitlist }) => {
	const isFull = arisan.status === "Tutup";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default, {
		className: "shadow-sm mb-3 border-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
			className: "p-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
					className: "fw-bold text-dark mb-2",
					children: arisan.kategori
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-primary fw-bold mb-3",
					children: arisan.batch
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
					className: "small",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
							xs: 6,
							className: "mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
								className: "d-block text-muted",
								children: "Kategori"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "fw-bold",
								children: arisan.kategori
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
							xs: 6,
							className: "mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
								className: "d-block text-muted",
								children: "Peserta"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "fw-bold",
								children: arisan.peserta
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
							xs: 6,
							className: "mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
								className: "d-block text-muted",
								children: "Target Nominal"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "fw-bold",
								children: arisan.targetNominal
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
							xs: 6,
							className: "mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
								className: "d-block text-muted",
								children: "Term"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "fw-bold",
								children: arisan.term
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
							xs: 6,
							className: "mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
								className: "d-block text-muted",
								children: "Setoran per bulan"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "fw-bold text-success",
								children: arisan.setoranPerBulan
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
							xs: 6,
							className: "mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
								className: "d-block text-muted",
								children: "Periode Angsuran"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "fw-bold",
								children: arisan.periodeAngsuran
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "d-grid gap-2 mt-3 pt-3 border-top",
					children: isFull ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "primary",
						className: "fw-bold",
						disabled: true,
						style: { opacity: .65 },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUsers, { className: "me-2" }), " Daftar Sekarang"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "secondary",
						className: "fw-bold",
						onClick: () => handleWaitlist(arisan),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaFileSignature, { className: "me-2" }), " Daftar Tunggu"]
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "primary",
						className: "fw-bold",
						onClick: () => handleJoin(arisan),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUsers, { className: "me-2" }), " Daftar Sekarang"]
					})
				})
			]
		})
	});
});
function ArisanJoinPage() {
	const navigate = useNavigate();
	const handleJoin = (0, import_react.useCallback)((arisan) => {
		navigate(`/${jwtEncode({
			page: "formPengajuanArisan",
			arisanId: arisan.arisan_id || arisan.id || 1
		})}`);
	}, [navigate]);
	const handleWaitlist = (0, import_react.useCallback)((arisan) => {
		import_sweetalert2_all.default.fire({
			title: "Perhatian",
			text: `Anda masuk daftar tunggu untuk Grup Arisan ${arisan.batch}.`,
			icon: "info"
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "arisan-join-page-container pb-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				className: "justify-content-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
					lg: 10,
					md: 12,
					children: MOCK_ARISAN_LIST.map((arisan, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArisanListItem, {
						arisan,
						handleJoin,
						handleWaitlist
					}, index))
				})
			})
		})
	});
}
//#endregion
export { ArisanJoinPage as default };
