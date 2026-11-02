import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime, jn as require_react_dom, mt as require_prop_types } from "./vendor-rpDlma0K.js";
import { Hn as FaPowerOff, Ht as FaChevronDown, Wt as FaChevronRight, c as Spinner, hr as FaUser, vt as MdVerified } from "./vendor-react-D5pUDmay.js";
import { n as ACCESSIBILITY_LABELS } from "./index-BaUN0sjk.js";
import { t as useNavigation } from "./useNavigation-BZEAXjTS.js";
import { i as sanitizeText } from "./sanitization-Pu2qiHfl.js";
//#region src/components/layout/dropdowns/UserDropdown.css
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
var import_prop_types = /* @__PURE__ */ __toESM(require_prop_types());
//#endregion
//#region src/components/layout/dropdowns/UserDropdown.jsx
var import_jsx_runtime = require_jsx_runtime();
var getInitials = (name) => {
	if (!name) return "?";
	const parts = name.trim().split(/\s+/);
	if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
	return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};
var AVATAR_GRADIENTS = [
	["#3b82f6", "#2563eb"],
	["#8b5cf6", "#7c3aed"],
	["#10b981", "#059669"],
	["#f59e0b", "#d97706"],
	["#ef4444", "#dc2626"],
	["#06b6d4", "#0891b2"],
	["#ec4899", "#db2777"],
	["#14b8a6", "#0d9488"]
];
var getAvatarGradient = (name) => {
	if (!name) return AVATAR_GRADIENTS[0];
	let hash = 0;
	for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
	return AVATAR_GRADIENTS[Math.abs(hash) % AVATAR_GRADIENTS.length];
};
var UserDropdown = (0, import_react.memo)(function UserDropdown({ user = null, logout, loading = false }) {
	const { navigateTo } = useNavigation();
	const [isDropdownOpen, setIsDropdownOpen] = (0, import_react.useState)(false);
	const [dropdownPos, setDropdownPos] = (0, import_react.useState)({
		top: 70,
		right: 0,
		width: 288
	});
	const [isAnimating, setIsAnimating] = (0, import_react.useState)(false);
	const btnRef = (0, import_react.useRef)(null);
	const initials = (0, import_react.useMemo)(() => getInitials(user?.full_name), [user?.full_name]);
	const [gradFrom, gradTo] = (0, import_react.useMemo)(() => getAvatarGradient(user?.full_name), [user?.full_name]);
	const handleNav = (0, import_react.useCallback)((page) => {
		setIsDropdownOpen(false);
		navigateTo(page);
	}, [navigateTo]);
	const handleToggle = (0, import_react.useCallback)(() => {
		if (!isDropdownOpen && btnRef.current) {
			const rect = btnRef.current.getBoundingClientRect();
			const dropdownWidth = Math.min(288, window.innerWidth - 24);
			setDropdownPos({
				top: rect.bottom + 8,
				right: Math.max(12, window.innerWidth - rect.right - 4),
				width: dropdownWidth
			});
			setIsAnimating(true);
			setTimeout(() => setIsAnimating(false), 300);
		}
		setIsDropdownOpen((prev) => !prev);
	}, [isDropdownOpen]);
	(0, import_react.useEffect)(() => {
		if (!isDropdownOpen) return;
		const onKey = (e) => {
			if (e.key === "Escape") setIsDropdownOpen(false);
		};
		const updatePos = () => {
			if (btnRef.current) {
				const rect = btnRef.current.getBoundingClientRect();
				const dropdownWidth = Math.min(288, window.innerWidth - 24);
				setDropdownPos({
					top: rect.bottom + 8,
					right: Math.max(12, window.innerWidth - rect.right - 4),
					width: dropdownWidth
				});
			}
		};
		window.addEventListener("scroll", updatePos, true);
		window.addEventListener("resize", updatePos);
		document.addEventListener("keydown", onKey);
		return () => {
			window.removeEventListener("scroll", updatePos, true);
			window.removeEventListener("resize", updatePos);
			document.removeEventListener("keydown", onKey);
		};
	}, [isDropdownOpen]);
	const isRegularMember = user?.member_type === "Anggota Reguler" || user?.status_id === 2;
	const memberBadgeColor = isRegularMember ? {
		bg: "#ecfdf5",
		text: "#059669",
		border: "#6ee7b7"
	} : {
		bg: "#fffbeb",
		text: "#d97706",
		border: "#fcd34d"
	};
	const menuItems = [{
		icon: FaUser,
		label: "Profil Saya",
		desc: "Lihat & edit data diri",
		page: "accountPage",
		color: "#3b82f6"
	}];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "nav-item user-dropdown-container",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			ref: btnRef,
			className: "nav-link p-0 d-flex align-items-center border-0 bg-transparent user-btn",
			onClick: handleToggle,
			"aria-expanded": isDropdownOpen,
			"aria-haspopup": "true",
			"aria-label": ACCESSIBILITY_LABELS.USER_MENU,
			children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
				animation: "border",
				size: "sm",
				variant: "light"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "d-flex align-items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: { position: "relative" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								width: 32,
								height: 32,
								borderRadius: "50%",
								background: `linear-gradient(135deg, ${gradFrom}, ${gradTo})`,
								border: "2px solid rgba(255,255,255,0.5)",
								boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								fontSize: 12,
								fontWeight: 800,
								color: "#ffffff",
								letterSpacing: "0.5px",
								userSelect: "none",
								flexShrink: 0
							},
							children: initials
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
							position: "absolute",
							bottom: 0,
							right: 0,
							width: 9,
							height: 9,
							borderRadius: "50%",
							background: "#22c55e",
							border: "1.5px solid rgba(255,255,255,0.8)"
						} })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-start d-none d-md-flex flex-column ms-1",
						style: { lineHeight: "1.15" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: {
								color: "#ffffff",
								fontWeight: 700,
								fontSize: "13px"
							},
							children: sanitizeText(user?.full_name) || user?.email?.split("@")[0] || "Anggota"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: {
								color: "rgba(255,255,255,0.6)",
								fontSize: "11px"
							},
							children: user?.member_type || "Calon Anggota"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaChevronDown, {
						className: "d-none d-md-inline",
						size: 9,
						style: {
							color: "rgba(255,255,255,0.5)",
							marginLeft: 2,
							transition: "transform 0.2s",
							transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)"
						}
					})
				]
			})
		}), isDropdownOpen && (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				position: "fixed",
				inset: 0,
				zIndex: 1090,
				backgroundColor: "transparent"
			},
			onClick: () => setIsDropdownOpen(false)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `ud-panel ${isAnimating ? "animating-in" : ""}`,
			style: {
				top: dropdownPos.top,
				right: dropdownPos.right,
				width: dropdownPos.width
			},
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ud-header",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "ud-header-circle-1" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "ud-header-circle-2" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 12,
								position: "relative"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: { position: "relative" },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "ud-avatar-large",
									style: { background: `linear-gradient(135deg, ${gradFrom}, ${gradTo})` },
									children: initials
								}), isRegularMember && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "ud-verified-badge",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdVerified, {
										size: 12,
										color: "#ffffff"
									})
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									flex: 1,
									minWidth: 0
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "ud-user-name",
										children: sanitizeText(user?.full_name) || "Guest User"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "ud-user-email",
										children: sanitizeText(user?.email) || "No email"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "ud-member-type-badge",
										style: {
											background: memberBadgeColor.bg,
											color: memberBadgeColor.text,
											border: `1px solid ${memberBadgeColor.border}`
										},
										children: [isRegularMember && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdVerified, { size: 10 }), user?.member_type || "Calon Anggota"]
									})
								]
							})]
						}),
						user?.member_no && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ud-member-id-box",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ud-member-id-label",
								children: "ID Anggota"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ud-member-id-val",
								children: sanitizeText(user?.member_no)
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: { padding: "8px" },
					children: menuItems.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => handleNav(item.page),
						"aria-label": item.label,
						className: "ud-menu-item",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "ud-menu-icon",
								style: { background: `${item.color}15` },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
									size: 14,
									color: item.color
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: { flex: 1 },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "ud-menu-title",
									children: item.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "ud-menu-desc",
									children: item.desc
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaChevronRight, {
								size: 10,
								color: "#cbd5e1"
							})
						]
					}, i))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
					height: 1,
					background: "#f1f5f9",
					margin: "0 8px"
				} }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: { padding: "8px" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: logout,
						"aria-label": ACCESSIBILITY_LABELS.LOGOUT,
						className: "ud-logout-item",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "ud-logout-icon",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaPowerOff, {
								size: 14,
								color: "#ef4444"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: { flex: 1 },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "ud-logout-title",
								children: "Keluar Aplikasi"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "ud-logout-desc",
								children: "Akhiri sesi sekarang"
							})]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "ud-footer",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ud-footer-text",
						children: "Paguyuban Usaha Sukses © 2024"
					})
				})
			]
		})] }), document.body)]
	});
});
UserDropdown.propTypes = {
	user: import_prop_types.default.shape({
		full_name: import_prop_types.default.string,
		email: import_prop_types.default.string,
		member_no: import_prop_types.default.string,
		member_type: import_prop_types.default.string,
		status_id: import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.number])
	}),
	logout: import_prop_types.default.func.isRequired,
	loading: import_prop_types.default.bool
};
//#endregion
export { UserDropdown as default };
