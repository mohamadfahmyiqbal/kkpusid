import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, T as require_sweetalert2_all, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { M as MdAddCircleOutline, Pr as useNavigate, W as MdCreditCard, Z as MdInfoOutline, c as Spinner, ct as MdRefresh, j as MdAccountBalanceWallet } from "./vendor-react-D5pUDmay.js";
import { n as getSocket } from "./socket-CtRvCIQ2.js";
import { n as useProfile } from "./ProfileContext-DQCnAT09.js";
import { s as jwtEncode } from "./index-BaUN0sjk.js";
import { t as Button } from "./Button-DpYzkz3l.js";
import { t as SwalAlert } from "./SwalAlert-C3kBxD_o.js";
import { t as uSimpanan } from "./USimpanan-BSasVMP7.js";
import { t as Card } from "./Card-DeCk4TVr.js";
/* empty css                               */
import { t as StatusBadge } from "./StatusBadge-e4PjUSZw.js";
//#region src/pages/simpanan/SimpananPage/components/InformasiRekeningCard.css
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_sweetalert2_all = /* @__PURE__ */ __toESM(require_sweetalert2_all());
//#endregion
//#region src/pages/simpanan/SimpananPage/components/InformasiRekeningCard.jsx
var import_jsx_runtime = require_jsx_runtime();
/**
* Komponen kartu informasi rekening dengan desain premium & modern
*/
var InformasiRekeningCard = (0, import_react.memo)(({ activeType, displayName, variant = "primary", showActions = true, fromPage = "transaksiPage" }) => {
	const [details, setDetails] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const [isRefreshing, setIsRefreshing] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	const { userData } = useProfile();
	const fetchDetail = (0, import_react.useCallback)(async (isManual = false) => {
		if (!activeType) return;
		if (isManual) setIsRefreshing(true);
		else setLoading(true);
		setError(null);
		try {
			const response = await uSimpanan.getAccountDetail({ category: activeType });
			if (response.data?.status) {
				const accData = response.data.data;
				setDetails({
					nama: accData.member_name || "Anggota",
					produk: displayName || accData.product_name,
					saldo: parseFloat(accData.balance || 0),
					accountNo: accData.account_no,
					billItemIds: accData.billItemIds || []
				});
			} else setError("Data simpanan tidak ditemukan");
		} catch (err) {
			setError("Gagal menyinkronkan saldo");
		} finally {
			setLoading(false);
			setIsRefreshing(false);
		}
	}, [activeType, displayName]);
	(0, import_react.useEffect)(() => {
		let isMounted = true;
		fetchDetail();
		const memberId = userData?.member_id;
		const socket = getSocket();
		if (memberId && socket) socket.on("savings:balance:update", (data) => {
			if (data.category === activeType && isMounted) {
				setDetails((prev) => ({
					...prev,
					saldo: data.balance
				}));
				import_sweetalert2_all.default.fire({
					title: `Saldo ${displayName} diperbarui: Rp ${data.balance.toLocaleString("id-ID")}`,
					icon: "info",
					toast: true,
					position: "bottom",
					timer: 3e3,
					showConfirmButton: false
				});
			}
		});
		return () => {
			isMounted = false;
			if (socket) socket.off("savings:balance:update");
		};
	}, [
		fetchDetail,
		activeType,
		displayName,
		userData
	]);
	const handleAction = (type) => {
		let payload = {
			return: fromPage,
			category: activeType,
			displayName
		};
		if (type === "PAY" && details?.billItemIds?.length > 0) payload = {
			...payload,
			page: "invoicePage",
			billItemIds: details.billItemIds
		};
		else if (type === "WITHDRAW") payload = {
			...payload,
			page: "penarikanSimpananPage",
			maxAmount: details?.saldo,
			accountNo: details?.accountNo
		};
		else payload = {
			...payload,
			page: "billingPage"
		};
		navigate(`/${jwtEncode(payload)}`);
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		variant: "premium",
		theme: variant,
		className: "text-center py-5 loading-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "d-flex flex-column align-items-center justify-content-center h-100",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
				animation: "border",
				variant: "light",
				size: "sm"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 mb-0 small fw-bold opacity-75",
				children: "Menghitung Saldo..."
			})]
		})
	});
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SwalAlert, {
		variant: "danger",
		className: "py-4 text-center border-0 shadow-sm rounded-4 animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdInfoOutline, {
				size: 24,
				className: "mb-2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fw-bold",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "link",
				size: "sm",
				onClick: () => fetchDetail(),
				className: "text-danger p-0 mt-1",
				children: "Coba Lagi"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		variant: "premium",
		theme: variant,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card.Body, {
			className: "p-4 relative card-body-front",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "d-flex justify-content-between align-items-center mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "d-flex align-items-center gap-2 px-3 py-1 rounded-pill blur-effect",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdCreditCard, {
							size: 14,
							className: "text-light"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "fw-bold tracking-wider card-type-label",
							children: "INFORMASI REKENING"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "d-flex align-items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
							status: "AKTIF",
							size: "sm"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: `btn btn-link p-0 text-white opacity-75 hover-opacity-100 transition-all ${isRefreshing ? "fa-spin" : ""}`,
							onClick: () => fetchDetail(true),
							disabled: isRefreshing,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdRefresh, { size: 20 })
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "dc-saldo-display mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "small opacity-75 mb-1 fw-medium",
						children: ["Saldo ", details?.produk]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "fw-bold mb-0 text-white font-outfit card-amount-value saldo-text",
						children: ["Rp ", details?.saldo?.toLocaleString("id-ID")]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "row g-3 mb-4 pt-3 border-top border-white border-opacity-10 text-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "col-7",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-uppercase opacity-50 fw-bold mb-1 card-grid-label",
							children: "NAMA ANGGOTA"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "fw-bold small text-white-90 text-truncate",
							children: details?.nama
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "col-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-uppercase opacity-50 fw-bold mb-1 card-grid-label",
							children: "NO. REKENING"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "fw-bold small text-white-90",
							children: details?.accountNo || "-"
						})]
					})]
				}),
				showActions && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "d-flex gap-2",
					children: [
						activeType.includes("POKOK") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "premium",
							className: "flex-fill rounded-3 py-2 d-flex align-items-center justify-content-center gap-2",
							onClick: () => handleAction("PAY"),
							children: details?.billItemIds?.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdInfoOutline, { size: 18 }), " Detail"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdAddCircleOutline, { size: 18 }), " Setoran"] })
						}),
						(activeType.includes("WAJIB") || activeType.includes("SUKARELA")) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "premium",
							className: "flex-fill rounded-3 py-2 d-flex align-items-center justify-content-center gap-2",
							onClick: () => handleAction("BILL"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdAddCircleOutline, { size: 18 }), " Setoran"]
						}),
						activeType.includes("SUKARELA") && details?.saldo > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "premium-outline",
							className: "flex-fill rounded-3 py-2 d-flex align-items-center justify-content-center gap-2",
							onClick: () => handleAction("WITHDRAW"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdAccountBalanceWallet, { size: 18 }), " Pencairan"]
						})
					]
				})
			]
		})
	});
});
//#endregion
export { InformasiRekeningCard as t };
