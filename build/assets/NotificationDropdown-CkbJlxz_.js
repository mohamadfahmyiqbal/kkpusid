import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime, jn as require_react_dom, mt as require_prop_types } from "./vendor-rpDlma0K.js";
import { Bt as FaCheckDouble, D as Badge, Mt as FaCalendarAlt, p as Modal_default, wt as FaBell, xt as FaArrowRight } from "./vendor-react-D5pUDmay.js";
import { n as useProfile } from "./ProfileContext-DQCnAT09.js";
import { r as MAX_HEIGHTS } from "./index-BaUN0sjk.js";
import { t as useNavigation } from "./useNavigation-BZEAXjTS.js";
import { i as sanitizeText, n as safeDateFormat } from "./sanitization-Pu2qiHfl.js";
import { t as Button } from "./Button-DpYzkz3l.js";
//#region src/components/layout/dropdowns/NotificationDetailModal.jsx
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_prop_types = /* @__PURE__ */ __toESM(require_prop_types());
var import_jsx_runtime = require_jsx_runtime();
var NotificationDetailModal = ({ show, onHide, notif }) => {
	if (!notif) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal_default, {
		show,
		onHide,
		centered: true,
		backdrop: "static",
		keyboard: false,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal_default.Header, {
				closeButton: true,
				className: "border-0 pb-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal_default.Title, {
					className: "font-outfit fw-bold d-flex align-items-center gap-2",
					style: { fontSize: "1.1rem" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							width: 32,
							height: 32,
							borderRadius: "8px",
							background: "linear-gradient(135deg, #02113d 0%, #1e3a8a 100%)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaBell, {
							size: 14,
							color: "#ffffff"
						})
					}), "Detail Notifikasi"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal_default.Body, {
				className: "pt-4 px-4 pb-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
						className: "fw-bold text-dark mb-2",
						style: { lineHeight: "1.4" },
						children: sanitizeText(notif.title)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "d-flex align-items-center gap-2 mb-4 text-secondary opacity-75",
						style: { fontSize: "12px" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCalendarAlt, { size: 12 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: safeDateFormat(notif.sent_at) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-3 rounded-3",
						style: {
							backgroundColor: "#f8fafc",
							border: "1px solid #e2e8f0",
							fontSize: "14px",
							lineHeight: "1.6",
							color: "#334155"
						},
						children: sanitizeText(notif.body)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal_default.Footer, {
				className: "border-0 pt-0 px-4 pb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "premium-outline",
					onClick: onHide,
					className: "w-100 py-2 rounded-3 fw-bold",
					children: "Tutup"
				})
			})
		]
	});
};
NotificationDetailModal.propTypes = {
	show: import_prop_types.default.bool.isRequired,
	onHide: import_prop_types.default.func.isRequired,
	notif: import_prop_types.default.object
};
//#endregion
//#region src/components/layout/dropdowns/NotificationBadge.jsx
var NotificationBadge = ({ unreadCount, ariaExpanded = false }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "position-relative text-white",
		"aria-expanded": ariaExpanded,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaBell, { size: 18 }), unreadCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			bg: "warning",
			pill: true,
			className: "position-absolute top-0 start-100 translate-middle text-dark notification-badge",
			"aria-label": `${unreadCount} unread notifications`,
			children: unreadCount
		})]
	});
};
NotificationBadge.propTypes = {
	unreadCount: import_prop_types.default.number.isRequired,
	ariaExpanded: import_prop_types.default.bool
};
//#endregion
//#region src/components/layout/dropdowns/NotificationItem.jsx
var NotificationItem = ({ notif, onClick }) => {
	const isUnread = notif.status === 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		"aria-label": `Baca notifikasi: ${sanitizeText(notif.title)}`,
		style: {
			display: "flex",
			alignItems: "flex-start",
			gap: "12px",
			width: "100%",
			padding: "12px 16px",
			border: "none",
			borderBottom: "1px solid #f1f5f9",
			background: isUnread ? "linear-gradient(90deg, #eff6ff 0%, #ffffff 100%)" : "#ffffff",
			cursor: "pointer",
			textAlign: "left",
			transition: "background 0.15s ease",
			position: "relative"
		},
		onMouseEnter: (e) => {
			e.currentTarget.style.background = "#f8fafc";
		},
		onMouseLeave: (e) => {
			e.currentTarget.style.background = isUnread ? "linear-gradient(90deg, #eff6ff 0%, #ffffff 100%)" : "#ffffff";
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					width: 36,
					height: 36,
					borderRadius: "10px",
					background: isUnread ? "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)" : "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexShrink: 0,
					boxShadow: isUnread ? "0 2px 8px rgba(59,130,246,0.3)" : "none"
				},
				children: isUnread ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaBell, {
					size: 14,
					color: "#ffffff"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheckDouble, {
					size: 14,
					color: "#94a3b8"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					flex: 1,
					minWidth: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							fontSize: "13px",
							fontWeight: isUnread ? 700 : 500,
							color: isUnread ? "#1e293b" : "#475569",
							marginBottom: "2px",
							whiteSpace: "nowrap",
							overflow: "hidden",
							textOverflow: "ellipsis"
						},
						children: sanitizeText(notif.title)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							fontSize: "12px",
							color: "#64748b",
							display: "-webkit-box",
							WebkitLineClamp: 2,
							WebkitBoxOrient: "vertical",
							overflow: "hidden",
							lineHeight: 1.4,
							marginBottom: "4px"
						},
						children: sanitizeText(notif.body)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							fontSize: "11px",
							color: "#94a3b8"
						},
						children: safeDateFormat(notif.sent_at)
					})
				]
			}),
			isUnread && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
				width: 8,
				height: 8,
				borderRadius: "50%",
				background: "#3b82f6",
				flexShrink: 0,
				marginTop: 4,
				boxShadow: "0 0 0 2px rgba(59,130,246,0.2)"
			} })
		]
	});
};
NotificationItem.propTypes = {
	notif: import_prop_types.default.shape({
		id: import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.number]).isRequired,
		title: import_prop_types.default.string.isRequired,
		body: import_prop_types.default.string.isRequired,
		status: import_prop_types.default.number.isRequired,
		sent_at: import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.number]).isRequired
	}).isRequired,
	onClick: import_prop_types.default.func.isRequired
};
//#endregion
//#region src/components/layout/dropdowns/NotificationDropdown.jsx
var NotificationDropdown = (0, import_react.memo)(function NotificationDropdown() {
	const { notifications, markNotificationAsRead } = useProfile();
	const { navigateTo } = useNavigation();
	const [isDropdownOpen, setIsDropdownOpen] = (0, import_react.useState)(false);
	const [dropdownPos, setDropdownPos] = (0, import_react.useState)({
		top: 70,
		right: 0,
		width: 360
	});
	const [isAnimating, setIsAnimating] = (0, import_react.useState)(false);
	const [selectedNotif, setSelectedNotif] = (0, import_react.useState)(null);
	const [showModal, setShowModal] = (0, import_react.useState)(false);
	const btnRef = (0, import_react.useRef)(null);
	const { safeNotifications, unreadCount } = (0, import_react.useMemo)(() => {
		const safeNotifs = Array.isArray(notifications) ? notifications : [];
		return {
			safeNotifications: safeNotifs,
			unreadCount: safeNotifs.filter((n) => n.status === 1).length
		};
	}, [notifications]);
	const handleToggle = (0, import_react.useCallback)(() => {
		if (!isDropdownOpen && btnRef.current) {
			const rect = btnRef.current.getBoundingClientRect();
			const dropdownWidth = Math.min(360, window.innerWidth - 24);
			const rightOffset = window.innerWidth - rect.right;
			setDropdownPos({
				top: rect.bottom + 8,
				right: Math.max(12, rightOffset - 4),
				width: dropdownWidth
			});
			setIsAnimating(true);
			setTimeout(() => setIsAnimating(false), 300);
		}
		setIsDropdownOpen((prev) => !prev);
	}, [isDropdownOpen]);
	const handleNavigate = (0, import_react.useCallback)(() => {
		setIsDropdownOpen(false);
		navigateTo("notificationPage");
	}, [navigateTo]);
	(0, import_react.useEffect)(() => {
		if (!isDropdownOpen) return;
		const onKey = (e) => {
			if (e.key === "Escape") setIsDropdownOpen(false);
		};
		const updatePos = () => {
			if (btnRef.current) {
				const rect = btnRef.current.getBoundingClientRect();
				const dropdownWidth = Math.min(360, window.innerWidth - 24);
				const rightOffset = window.innerWidth - rect.right;
				setDropdownPos({
					top: rect.bottom + 8,
					right: Math.max(12, rightOffset - 4),
					width: dropdownWidth
				});
			}
		};
		const onOutside = (e) => {
			if (!e.target.closest(".notification-dropdown") && !e.target.closest(".nd-panel")) setIsDropdownOpen(false);
		};
		window.addEventListener("scroll", updatePos, true);
		window.addEventListener("resize", updatePos);
		document.addEventListener("keydown", onKey);
		document.addEventListener("mousedown", onOutside);
		return () => {
			window.removeEventListener("scroll", updatePos, true);
			window.removeEventListener("resize", updatePos);
			document.removeEventListener("keydown", onKey);
			document.removeEventListener("mousedown", onOutside);
		};
	}, [isDropdownOpen]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "nav-item notification-dropdown-container",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				ref: btnRef,
				className: "btn btn-link p-0 border-0 text-white position-relative shadow-none",
				onClick: handleToggle,
				"aria-expanded": isDropdownOpen,
				"aria-haspopup": "true",
				"aria-label": "Notifikasi",
				style: { transition: "opacity 0.15s" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationBadge, {
					unreadCount,
					ariaExpanded: isDropdownOpen
				})
			}),
			isDropdownOpen && (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					position: "fixed",
					inset: 0,
					zIndex: 1090,
					backgroundColor: "transparent"
				},
				onClick: () => setIsDropdownOpen(false)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `nd-panel ${isAnimating ? "animating-in" : ""}`,
				style: {
					position: "fixed",
					top: dropdownPos.top,
					right: dropdownPos.right,
					width: dropdownPos.width,
					zIndex: 1099
				},
				onClick: (e) => e.stopPropagation(),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "nd-header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 10
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "nd-header-icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaBell, {
									size: 15,
									color: "#ffffff"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "nd-header-title",
								children: "Notifikasi"
							}), unreadCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "nd-header-subtitle",
								children: [unreadCount, " belum dibaca"]
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "nd-header-btn",
							onClick: handleNavigate,
							children: ["Semua ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaArrowRight, { size: 10 })]
						})]
					}),
					unreadCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "nd-unread-bar",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "nd-unread-dot" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "nd-unread-text",
							children: [unreadCount, " notifikasi baru menunggu"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							maxHeight: MAX_HEIGHTS.NOTIFICATION_LIST,
							overflowY: "auto"
						},
						children: safeNotifications.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "nd-empty-state",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "nd-empty-icon-wrap",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaBell, {
									size: 24,
									color: "#cbd5e1"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "nd-empty-title",
								children: "Tidak ada notifikasi"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "nd-empty-subtitle",
								children: "Semua notifikasi sudah dibaca"
							})] })]
						}) : safeNotifications.map((notif) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationItem, {
							notif,
							onClick: () => {
								if (notif.status === 1) markNotificationAsRead(notif.id || notif.notification_id);
								setSelectedNotif(notif);
								setShowModal(true);
								setIsDropdownOpen(false);
							}
						}, notif.id))
					}),
					safeNotifications.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "nd-footer",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "nd-footer-btn",
							onClick: handleNavigate,
							children: ["Lihat Semua Notifikasi ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaArrowRight, { size: 11 })]
						})
					})
				]
			})] }), document.body),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationDetailModal, {
				show: showModal,
				onHide: () => setShowModal(false),
				notif: selectedNotif
			})
		]
	});
});
//#endregion
export { NotificationDropdown as default };
