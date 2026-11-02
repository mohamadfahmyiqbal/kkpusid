import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, T as require_sweetalert2_all, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { D as Badge, E as Button, Or as FaWallet, Pr as useNavigate, S as Card_default, Tt as FaBellSlash, Vt as FaCheckSquare, Wt as FaChevronRight, Zn as FaSearch, an as FaExclamationTriangle, bt as FaArrowLeft, c as Spinner, g as Form_default, h as InputGroup_default, hn as FaGraduationCap, l as Row, lr as FaTrash, m as ListGroup_default, nn as FaEnvelopeOpen, or as FaTag, p as Modal_default, pn as FaFilter, qt as FaClock, sr as FaTimes, tn as FaEnvelope, tr as FaSquare, wn as FaInfoCircle, wt as FaBell, x as Col, y as Dropdown_default, zt as FaCheckCircle } from "./vendor-react-D5pUDmay.js";
import { n as getSocket } from "./socket-CtRvCIQ2.js";
import { t as uNotification } from "./UNotification-BqEfIC9t.js";
import { n as useProfile } from "./ProfileContext-DQCnAT09.js";
import { s as jwtEncode } from "./index-BaUN0sjk.js";
import { t as LoadingState } from "./LoadingState-Bg-49PHx.js";
import { t as Pagination } from "./Pagination-vCZxXKAR.js";
//#region src/assets/images/notification_bell.png
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_sweetalert2_all = /* @__PURE__ */ __toESM(require_sweetalert2_all());
var notification_bell_default = "/assets/notification_bell-DtLOrzfB.png";
//#endregion
//#region src/pages/global/NotificationPage/page/NotificationHeaderBanner.jsx
var import_jsx_runtime = require_jsx_runtime();
function NotificationHeaderBanner({ unreadCount }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "np-header-banner",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-start",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "np-badge-category",
					children: "Pusat Notifikasi"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "np-title",
					children: "Notifikasi Akun Anda"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "np-subtitle",
					children: "Pantau semua informasi penting terkait pengajuan, dokumen, jadwal, dan pembaruan akun Anda secara real-time."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "np-stats-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "np-stats-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "np-stats-icon-box",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaBell, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "np-stats-info",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "np-stats-count",
								children: unreadCount
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "np-stats-label",
								children: "Belum dibaca"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "np-stats-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "np-stats-icon-box",
							style: {
								backgroundColor: "#ecfdf5",
								color: "#10b981"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaClock, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "np-stats-info",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "np-stats-count",
								style: {
									fontSize: "14px",
									fontWeight: "700"
								},
								children: "Aktif"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "np-stats-label",
								children: "Pembaruan realtime"
							})]
						})]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "np-bell-illustration-wrapper",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: notification_bell_default,
				alt: "Ilustrasi Notifikasi",
				className: "np-bell-illustration"
			})
		})]
	});
}
//#endregion
//#region src/pages/global/NotificationPage/page/NotificationSearchFilter.jsx
function NotificationSearchFilter({ searchInput, onSearchChange, categoryInput, onCategoryChange, tabStatus, onTabChange, unreadCount, onMarkAllAsRead }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "np-search-filter-row",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "np-search-input-wrapper",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaSearch, { className: "np-search-icon" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
				type: "text",
				placeholder: "Cari notifikasi...",
				className: "np-search-input",
				value: searchInput,
				onChange: (e) => onSearchChange(e.target.value)
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "d-flex gap-2 flex-wrap",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Select, {
				className: "np-filter-dropdown",
				value: categoryInput,
				onChange: (e) => onCategoryChange(e.target.value),
				style: {
					width: "150px",
					borderRadius: "12px",
					border: "1.5px solid #e2e8f0",
					fontSize: "13px",
					fontWeight: "600",
					padding: "10px 14px",
					backgroundColor: "#ffffff",
					cursor: "pointer"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "all",
						children: "📂 Semua Kategori"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "transaction",
						children: "💸 Transaksi"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "payment",
						children: "💳 Pembayaran"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "system",
						children: "⚙️ Sistem"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "reminder",
						children: "📅 Pengingat"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "announcement",
						children: "📢 Pengumuman"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "np-mark-all-btn",
				onClick: onMarkAllAsRead,
				children: "Tandai Semua sebagai Dibaca"
			})]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "np-tabs-row",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: `np-tab-btn ${tabStatus === "all" ? "active" : ""}`,
				onClick: () => onTabChange("all"),
				children: "Semua"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: `np-tab-btn ${tabStatus === "unread" ? "active" : ""}`,
				onClick: () => onTabChange("unread"),
				children: ["Belum Dibaca", unreadCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "np-tab-badge",
					children: unreadCount
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: `np-tab-btn ${tabStatus === "read" ? "active" : ""}`,
				onClick: () => onTabChange("read"),
				children: "Sudah Dibaca"
			})
		]
	})] });
}
//#endregion
//#region src/pages/global/NotificationPage/page/notificationHelpers.js
var DEFAULT_NOTIFICATIONS = [
	{
		id: "def-1",
		title: "Pengajuan Pembiayaan Disetujui",
		body: "Pengajuan pembiayaan Anda telah disetujui dan siap melanjutkan ke tahap akad.",
		created_at: (/* @__PURE__ */ new Date()).toISOString(),
		status: 1,
		type: "transaction"
	},
	{
		id: "def-2",
		title: "Dokumen Perlu Diperiksa",
		body: "Mohon cek kembali dokumen KTP dan NPWP yang Anda unggah agar proses lebih cepat.",
		created_at: (/* @__PURE__ */ new Date((/* @__PURE__ */ new Date()).getTime() - 1800 * 1e3)).toISOString(),
		status: 1,
		type: "system"
	},
	{
		id: "def-3",
		title: "Jadwal Verifikasi Diperbarui",
		body: "Tim kami akan melakukan verifikasi lapangan pada Rabu, 21 Mei 2024 pukul 10.30 WIB.",
		created_at: (/* @__PURE__ */ new Date((/* @__PURE__ */ new Date()).getTime() - 7200 * 1e3)).toISOString(),
		status: 1,
		type: "reminder"
	},
	{
		id: "def-4",
		title: "Pelatihan Usaha Tersedia",
		body: "Modul pelatihan usaha terbaru sudah bisa diakses dari dashboard Anda.",
		created_at: (/* @__PURE__ */ new Date((/* @__PURE__ */ new Date()).getTime() - 1440 * 60 * 1e3)).toISOString(),
		status: 2,
		type: "announcement"
	},
	{
		id: "def-5",
		title: "Pembayaran Angsuran Masuk",
		body: "Pembayaran angsuran bulan ini telah berhasil diterima dan tercatat di sistem.",
		created_at: (/* @__PURE__ */ new Date((/* @__PURE__ */ new Date()).getTime() - 2880 * 60 * 1e3)).toISOString(),
		status: 2,
		type: "payment"
	},
	{
		id: "def-6",
		title: "Password Perlu Diperbarui",
		body: "Untuk keamanan akun, silakan perbarui password Anda secara berkala.",
		created_at: (/* @__PURE__ */ new Date((/* @__PURE__ */ new Date()).getTime() - 4320 * 60 * 1e3)).toISOString(),
		status: 1,
		type: "system"
	}
];
var getRelativeTime = (dateStr) => {
	if (!dateStr) return "";
	try {
		const now = /* @__PURE__ */ new Date();
		const date = new Date(dateStr);
		const diffMs = now - date;
		const diffMins = Math.floor(diffMs / (60 * 1e3));
		const diffHours = Math.floor(diffMs / (3600 * 1e3));
		const diffDays = Math.floor(diffMs / (1440 * 60 * 1e3));
		if (diffMins < 1) return "Baru saja";
		if (diffMins < 60) return `${diffMins} menit lalu`;
		if (diffHours < 24) return `${diffHours} jam lalu`;
		if (diffDays === 1) return "Kemarin";
		if (diffDays < 7) return `${diffDays} hari lalu`;
		return date.toLocaleDateString("id-ID", {
			day: "numeric",
			month: "short",
			year: "numeric"
		});
	} catch (e) {
		return dateStr;
	}
};
var groupNotificationsByDate = (notifList) => {
	const groups = {
		today: [],
		yesterday: [],
		earlier: []
	};
	const today = /* @__PURE__ */ new Date();
	today.setHours(0, 0, 0, 0);
	const yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 1);
	notifList.forEach((notif) => {
		const notifDate = new Date(notif.created_at);
		notifDate.setHours(0, 0, 0, 0);
		if (notifDate.getTime() === today.getTime()) groups.today.push(notif);
		else if (notifDate.getTime() === yesterday.getTime()) groups.yesterday.push(notif);
		else groups.earlier.push(notif);
	});
	return groups;
};
//#endregion
//#region src/pages/global/NotificationPage/page/NotificationRowItem.jsx
var getCategoryIcon = (type) => {
	switch (type) {
		case "transaction": return {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheckCircle, {}),
			className: "np-icon-success"
		};
		case "payment": return {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaWallet, {}),
			className: "np-icon-info"
		};
		case "system": return {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaInfoCircle, {}),
			className: "np-icon-info"
		};
		case "reminder": return {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaExclamationTriangle, {}),
			className: "np-icon-warning"
		};
		case "announcement": return {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaGraduationCap, {}),
			className: "np-icon-purple"
		};
		default: return {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaBell, {}),
			className: "np-icon-info"
		};
	}
};
function NotificationRowItem({ notif, onToggleRead, onDelete }) {
	const isUnread = notif.status === 1;
	const config = getCategoryIcon(notif.type);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `np-item ${isUnread ? "unread" : ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `np-item-icon-box ${config.className}`,
				children: config.icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "np-item-content-wrapper",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
					className: "np-item-title",
					children: notif.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "np-item-body",
					children: notif.body
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "np-item-right-actions",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "np-item-time",
						children: getRelativeTime(notif.created_at)
					}),
					isUnread && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "np-item-unread-dot" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "np-item-action-btn",
						onClick: () => onToggleRead(notif.id, notif.status),
						title: isUnread ? "Tandai sudah dibaca" : "Tandai belum dibaca",
						children: isUnread ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaEnvelope, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaEnvelopeOpen, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "np-item-action-btn delete",
						onClick: () => onDelete(notif.id),
						title: "Hapus notifikasi",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaTrash, {})
					})
				]
			})
		]
	});
}
//#endregion
//#region src/pages/global/NotificationPage/page/NotificationSectionList.jsx
function NotificationSectionList({ filteredNotifications, groupedNotifications, onToggleRead, onDelete }) {
	if (filteredNotifications.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "np-empty-state",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "np-empty-icon-box",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaBell, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
				className: "np-empty-title",
				children: "Tidak ada notifikasi"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "np-empty-desc",
				children: "Kami tidak menemukan notifikasi yang sesuai dengan pencarian atau filter Anda."
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		groupedNotifications.today.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "np-date-group-header",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaClock, { size: 12 }), " Hari ini"]
		}), groupedNotifications.today.map((notif) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationRowItem, {
			notif,
			onToggleRead,
			onDelete
		}, notif.id))] }),
		groupedNotifications.yesterday.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "np-date-group-header",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaClock, { size: 12 }), " Kemarin"]
		}), groupedNotifications.yesterday.map((notif) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationRowItem, {
			notif,
			onToggleRead,
			onDelete
		}, notif.id))] }),
		groupedNotifications.earlier.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "np-date-group-header",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaClock, { size: 12 }), " Sebelumnya"]
		}), groupedNotifications.earlier.map((notif) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationRowItem, {
			notif,
			onToggleRead,
			onDelete
		}, notif.id))] })
	] });
}
//#endregion
//#region src/assets/images/customer_support.png
var customer_support_default = "/assets/customer_support-BmtVEJCj.png";
//#endregion
//#region src/pages/global/NotificationPage/page/NotificationSidebar.jsx
function NotificationSidebar({ stats, settings, onTabChange, onToggleSetting, onHelpClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "np-sidebar-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
					className: "np-sidebar-title",
					children: "Ringkasan"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "np-summary-row",
					onClick: () => onTabChange("all"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "np-summary-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaBell, { className: "np-summary-icon text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "np-summary-label",
							children: "Total Notifikasi"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "np-summary-count-box",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "np-summary-count",
							children: stats.total
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaChevronRight, { className: "np-summary-chevron" })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "np-summary-row",
					onClick: () => onTabChange("unread"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "np-summary-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaEnvelope, { className: "np-summary-icon text-warning" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "np-summary-label",
							children: "Belum Dibaca"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "np-summary-count-box",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "np-summary-count",
							children: stats.unread
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaChevronRight, { className: "np-summary-chevron" })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "np-summary-row",
					onClick: () => onTabChange("read"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "np-summary-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheckCircle, { className: "np-summary-icon text-success" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "np-summary-label",
							children: "Sudah Dibaca"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "np-summary-count-box",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "np-summary-count",
							children: stats.read
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaChevronRight, { className: "np-summary-chevron" })]
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "np-sidebar-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
					className: "np-sidebar-title",
					children: "Pengaturan Notifikasi"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "np-setting-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "np-setting-info",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "np-setting-label",
							children: "Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "np-setting-desc",
							children: "Terima update via email"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: `np-switch-toggle ${settings.email ? "active" : ""}`,
						onClick: () => onToggleSetting("email"),
						"aria-label": "Toggle email notification"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "np-setting-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "np-setting-info",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "np-setting-label",
							children: "Push Notification"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "np-setting-desc",
							children: "Notifikasi realtime di browser"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: `np-switch-toggle ${settings.push ? "active" : ""}`,
						onClick: () => onToggleSetting("push"),
						"aria-label": "Toggle push notification"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "np-setting-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "np-setting-info",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "np-setting-label",
							children: "SMS"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "np-setting-desc",
							children: "Info penting via SMS"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: `np-switch-toggle ${settings.sms ? "active" : ""}`,
						onClick: () => onToggleSetting("sms"),
						"aria-label": "Toggle SMS notification"
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "np-help-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
					className: "np-help-title",
					children: "Butuh Bantuan?"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "np-help-desc",
					children: "Tim kami siap membantu Anda jika ada kendala atau pertanyaan terkait notifikasi."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "np-help-illustration-box",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: customer_support_default,
						alt: "Customer Support",
						className: "np-help-illustration"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "np-help-btn",
					onClick: onHelpClick,
					children: ["Hubungi Kami ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaChevronRight, {
						size: 10,
						className: "ms-1"
					})]
				})
			]
		})
	] });
}
//#endregion
//#region src/pages/global/NotificationPage/page/NotificationPage.jsx
function NotificationPage() {
	const { userData } = useProfile();
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [localNotifications, setLocalNotifications] = (0, import_react.useState)([]);
	const [searchInput, setSearchInput] = (0, import_react.useState)("");
	const [categoryInput, setCategoryInput] = (0, import_react.useState)("all");
	const [tabStatus, setTabStatus] = (0, import_react.useState)("all");
	const [settings, setSettings] = (0, import_react.useState)({
		email: true,
		push: true,
		sms: false
	});
	const showNotification = (0, import_react.useCallback)((message, variant = "success") => {
		import_sweetalert2_all.default.fire({
			title: message,
			icon: {
				success: "success",
				danger: "error",
				warning: "warning",
				info: "info"
			}[variant] || "info",
			toast: true,
			position: "top-end",
			timer: 3e3,
			showConfirmButton: false
		});
	}, []);
	const loadNotifications = (0, import_react.useCallback)(async () => {
		const memberId = userData?.member_id || userData?.registration_id;
		if (!memberId) {
			setLocalNotifications(DEFAULT_NOTIFICATIONS);
			setLoading(false);
			return;
		}
		try {
			setLoading(true);
			const res = await uNotification.getNotifications({
				member_id: memberId,
				limit: 50
			});
			const rows = res?.data?.list || res?.data?.data;
			if (Array.isArray(rows)) if (rows.length > 0) setLocalNotifications(rows);
			else setLocalNotifications([]);
			else setLocalNotifications(DEFAULT_NOTIFICATIONS);
		} catch (err) {
			console.error("Gagal memuat notifikasi, menggunakan mock data:", err);
			setLocalNotifications(DEFAULT_NOTIFICATIONS);
		} finally {
			setLoading(false);
		}
	}, [userData]);
	(0, import_react.useEffect)(() => {
		loadNotifications();
	}, [loadNotifications]);
	(0, import_react.useEffect)(() => {
		const socket = getSocket();
		if (socket) {
			const handleNewNotification = (notification) => {
				const formattedNotif = {
					id: notification.notification_id || notification.id,
					title: notification.title,
					body: notification.content || notification.body,
					created_at: notification.sent_datetime || notification.sent_at || (/* @__PURE__ */ new Date()).toISOString(),
					status: notification.status || 1,
					type: notification.type || "general"
				};
				setLocalNotifications((prev) => [formattedNotif, ...prev]);
				showNotification(notification.title || "Notifikasi baru masuk!", "info");
			};
			socket.on("notifications:update", handleNewNotification);
			return () => socket.off("notifications:update", handleNewNotification);
		}
	}, [showNotification]);
	const handleToggleRead = async (id, currentStatus) => {
		const newStatus = currentStatus === 1 ? 2 : 1;
		try {
			if (!id.toString().startsWith("def-")) await uNotification.markAsRead(id);
			setLocalNotifications((prev) => prev.map((n) => n.id === id ? {
				...n,
				status: newStatus
			} : n));
			showNotification(newStatus === 2 ? "Notifikasi ditandai sebagai dibaca." : "Notifikasi ditandai sebagai belum dibaca.", "success");
		} catch (e) {
			console.error(e);
			setLocalNotifications((prev) => prev.map((n) => n.id === id ? {
				...n,
				status: newStatus
			} : n));
		}
	};
	const handleDelete = (id) => {
		setLocalNotifications((prev) => prev.filter((n) => n.id !== id));
		showNotification("Notifikasi berhasil dihapus.", "success");
	};
	const handleMarkAllAsRead = async () => {
		const unreadIds = localNotifications.filter((n) => n.status === 1).map((n) => n.id);
		if (unreadIds.length === 0) {
			showNotification("Semua notifikasi sudah dibaca.", "info");
			return;
		}
		try {
			const realIds = unreadIds.filter((id) => !id.toString().startsWith("def-"));
			if (realIds.length > 0) await uNotification.markAsRead(realIds);
			setLocalNotifications((prev) => prev.map((n) => ({
				...n,
				status: 2
			})));
			showNotification("Semua notifikasi ditandai sebagai dibaca.", "success");
		} catch (e) {
			console.error(e);
			setLocalNotifications((prev) => prev.map((n) => ({
				...n,
				status: 2
			})));
		}
	};
	const handleToggleSetting = (key) => {
		setSettings((prev) => ({
			...prev,
			[key]: !prev[key]
		}));
		showNotification("Pengaturan preferensi berhasil diperbarui.", "success");
	};
	const filteredNotifications = (0, import_react.useMemo)(() => {
		let result = [...localNotifications];
		if (tabStatus === "unread") result = result.filter((n) => n.status === 1);
		else if (tabStatus === "read") result = result.filter((n) => n.status === 2);
		if (categoryInput !== "all") result = result.filter((n) => n.type === categoryInput);
		if (searchInput.trim().length >= 2) {
			const query = searchInput.toLowerCase();
			result = result.filter((n) => n.title?.toLowerCase().includes(query) || n.body?.toLowerCase().includes(query));
		}
		return result;
	}, [
		localNotifications,
		tabStatus,
		categoryInput,
		searchInput
	]);
	const stats = (0, import_react.useMemo)(() => {
		return {
			total: localNotifications.length,
			unread: localNotifications.filter((n) => n.status === 1).length,
			read: localNotifications.filter((n) => n.status === 2).length
		};
	}, [localNotifications]);
	const groupedNotifications = (0, import_react.useMemo)(() => {
		return groupNotificationsByDate(filteredNotifications);
	}, [filteredNotifications]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "np-container py-3 dash-fade-in",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationHeaderBanner, { unreadCount: stats.unread }), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingState, {
			size: "lg",
			message: "Memuat notifikasi...",
			minHeight: "350px"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
			className: "g-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
				lg: 8,
				md: 12,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationSearchFilter, {
					searchInput,
					onSearchChange: setSearchInput,
					categoryInput,
					onCategoryChange: setCategoryInput,
					tabStatus,
					onTabChange: setTabStatus,
					unreadCount: stats.unread,
					onMarkAllAsRead: handleMarkAllAsRead
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationSectionList, {
					filteredNotifications,
					groupedNotifications,
					onToggleRead: handleToggleRead,
					onDelete: handleDelete
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
				lg: 4,
				md: 12,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationSidebar, {
					stats,
					settings,
					onTabChange: setTabStatus,
					onToggleSetting: handleToggleSetting,
					onHelpClick: () => showNotification("Fitur hubungi customer support segera hadir!", "info")
				})
			})]
		})]
	});
}
//#endregion
//#region src/pages/global/NotificationPage/components/NotificationCard.jsx
var NotificationCard = ({ loading, notifications, onMarkAllAsRead, unreadCount, children }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default, {
		className: "notification-main-card border-0 shadow-sm hover:shadow-lg transition-shadow duration-300",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default.Header, {
			className: "notification-header bg-white border-bottom py-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "d-flex justify-content-between align-items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "notification-header-left flex-grow-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "d-flex align-items-center flex-wrap",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaBell, {
								className: "text-primary me-2",
								size: 18
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
								className: "mb-0 fw-semibold me-2",
								children: "Kotak Masuk"
							}),
							unreadCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								bg: "danger",
								pill: true,
								className: "notification-badge animate-pulse",
								children: [unreadCount, " Baru"]
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "notification-header-right ms-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline-primary",
						size: "sm",
						onClick: onMarkAllAsRead,
						disabled: loading || unreadCount === 0,
						className: "notification-action-header-btn hover:bg-primary hover:text-white transition-colors duration-200",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheckCircle, { className: "me-1 d-none d-sm-inline" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "d-sm-none",
								children: "✓"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "d-none d-md-inline",
								children: " Tandai Semua Dibaca"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "d-md-none",
								children: " Semua"
							})
						]
					})
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default.Body, {
			className: "notification-body p-0",
			children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "notification-loading text-center p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
					animation: "border",
					variant: "primary",
					role: "status",
					className: "mb-3"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted mb-0",
					children: "Memuat notifikasi..."
				})]
			}) : children
		})]
	});
};
//#endregion
//#region src/pages/global/NotificationPage/components/NotificationList.jsx
var NotificationList = ({ loading, notifications, children }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListGroup_default, {
		variant: "flush",
		className: "notification-list",
		children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "notification-loading-state p-3",
			children: [...Array(3)].map((_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "notification-skeleton mb-3 p-3 border rounded",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "d-flex align-items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "skeleton-icon me-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-light rounded-circle",
								style: {
									width: "40px",
									height: "40px"
								}
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-grow-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "bg-light rounded mb-2",
									style: {
										height: "16px",
										width: "60%"
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "bg-light rounded mb-2",
									style: {
										height: "14px",
										width: "90%"
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "bg-light rounded",
									style: {
										height: "12px",
										width: "40%"
									}
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "skeleton-action",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-light rounded",
								style: {
									height: "32px",
									width: "80px"
								}
							})
						})
					]
				})
			}, index))
		}) : notifications.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "notification-items",
			children
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "notification-empty-state text-center p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaBellSlash, {
					size: 48,
					className: "text-muted mb-3"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
					className: "text-muted mb-2",
					children: "Tidak Ada Notifikasi"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted small mb-0",
					children: "Anda tidak memiliki notifikasi baru. Semua aman dan terkendali."
				})
			]
		})
	});
};
//#endregion
//#region src/pages/global/NotificationPage/components/NotificationItem.jsx
var NotificationItem = ({ notif, onDetailClick, isSelected, onSelect, showSelection }) => {
	const isUnread = notif.status === 1;
	const TYPE_LABELS = {
		transaction: "Transaksi",
		payment: "Pembayaran",
		system: "Sistem",
		promotion: "Promosi",
		reminder: "Pengingat",
		announcement: "Pengumuman"
	};
	const getStatusBadge = () => {
		if (isUnread) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			bg: "danger",
			pill: true,
			className: "ms-2",
			children: "Baru"
		});
		return null;
	};
	const getCategoryBadge = () => {
		if (!notif.type) return null;
		const color = {
			transaction: "primary",
			payment: "success",
			system: "warning",
			promotion: "info",
			reminder: "secondary",
			announcement: "dark"
		}[notif.type] || "light";
		const label = TYPE_LABELS[notif.type] || notif.type;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
			bg: color,
			pill: true,
			className: "me-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaTag, {
				className: "me-1",
				size: 10
			}), label]
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListGroup_default.Item, {
		className: `notification-item border-0 mb-3 p-0 ${isUnread ? "notification-unread" : "notification-read"} transition-all duration-300 ease-in-out`,
		role: "article",
		"aria-label": `Notifikasi: ${notif.title}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "notification-card p-3 p-sm-3 hover:shadow-md transition-shadow duration-200 cursor-pointer",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
				className: "align-items-start g-2 g-sm-3",
				children: [
					showSelection && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
						xs: "auto",
						className: "notification-checkbox",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Check, {
							type: "checkbox",
							checked: isSelected,
							onChange: () => onSelect(notif.id),
							className: "notification-select-checkbox",
							id: `notification-check-${notif.id}`,
							"aria-label": `Pilih notifikasi: ${notif.title}`
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
						xs: "auto",
						className: "notification-icon",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `icon-wrapper ${isUnread ? "icon-unread" : "icon-read"}`,
							children: isUnread ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaEnvelope, {
								size: 20,
								className: "text-primary"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaEnvelopeOpen, {
								size: 20,
								className: "text-muted"
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
						className: "notification-content",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "d-flex align-items-start justify-content-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-grow-1 min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "d-flex align-items-center mb-2 flex-wrap",
										children: [
											getCategoryBadge(),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
												className: "mb-0 fw-semibold notification-title me-2",
												children: notif.title
											}),
											getStatusBadge()
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mb-2 text-muted notification-body",
										children: notif.body || "Tidak ada deskripsi."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "d-flex align-items-center text-muted small notification-meta",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaBell, {
											size: 12,
											className: "me-1 flex-shrink-0"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-truncate",
											children: new Date(notif.created_at).toLocaleString("id-ID", {
												day: "numeric",
												month: "short",
												year: "numeric",
												hour: "2-digit",
												minute: "2-digit"
											})
										})]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
								xs: "auto",
								className: "notification-actions ms-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: isUnread ? "primary" : "outline-primary",
									size: "sm",
									onClick: () => onDetailClick(notif),
									className: "notification-action-btn transform transition-transform duration-200 hover:scale-105",
									"aria-label": `${isUnread ? "Baca" : "Detail"} notifikasi: ${notif.title}`,
									children: isUnread ? "Baca" : "Detail"
								})
							})]
						})
					})
				]
			})
		})
	});
};
//#endregion
//#region src/pages/global/NotificationPage/components/NotificationPagination.jsx
var NotificationPagination = ({ currentPage, totalPages, onPageChange }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, {
		currentPage,
		totalPages,
		onPageChange,
		totalItems: 0,
		itemsPerPage: 10
	});
};
//#endregion
//#region src/pages/global/NotificationPage/hooks/useNotificationFeatures.js
var FEATURES = {
	SEARCH: true,
	FILTER: true,
	CATEGORIES: true,
	BULK_ACTIONS: true,
	REAL_TIME: true,
	PUSH_NOTIFICATIONS: false,
	NOTIFICATION_PREFERENCES: false
};
var useNotificationFeatures = () => {
	return (0, import_react.useMemo)(() => {
		return {
			search: FEATURES.SEARCH,
			filter: FEATURES.FILTER,
			categories: FEATURES.CATEGORIES,
			bulkActions: FEATURES.BULK_ACTIONS,
			realTime: FEATURES.REAL_TIME,
			pushNotifications: FEATURES.PUSH_NOTIFICATIONS,
			preferences: FEATURES.NOTIFICATION_PREFERENCES,
			isEnabled: (feature) => FEATURES[feature.toUpperCase()] || false,
			getEnabledFeatures: () => Object.entries(FEATURES).filter(([_, enabled]) => enabled).map(([name]) => name.toLowerCase())
		};
	}, []);
};
//#endregion
//#region src/pages/global/NotificationPage/components/NotificationFilters.jsx
var NotificationFilters = ({ searchTerm, filterType, selectedCategory, availableCategories, onSearchChange, onFilterTypeChange, onCategoryChange, onClearFilters, activeFiltersCount }) => {
	const [showFilters, setShowFilters] = (0, import_react.useState)(false);
	const features = useNotificationFeatures();
	const FILTER_OPTIONS = [
		{
			value: "all",
			label: "Semua"
		},
		{
			value: "unread",
			label: "Belum Dibaca"
		},
		{
			value: "read",
			label: "Sudah Dibaca"
		}
	];
	const TYPE_LABELS = {
		transaction: "Transaksi",
		payment: "Pembayaran",
		system: "Sistem",
		promotion: "Promosi",
		reminder: "Pengingat",
		announcement: "Pengumuman"
	};
	if (!features.filter && !features.search) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "notification-filters mb-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
			className: "g-3 align-items-end",
			children: [features.search && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
				md: showFilters ? 6 : 12,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup_default, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup_default.Text, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaSearch, {}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
						type: "text",
						placeholder: "Cari notifikasi...",
						value: searchTerm,
						onChange: (e) => onSearchChange(e.target.value),
						className: "notification-search"
					}),
					searchTerm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline-secondary",
						onClick: () => onSearchChange(""),
						size: "sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaTimes, {})
					})
				] })
			}), features.filter && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
				md: "auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dropdown_default, {
					show: showFilters,
					onToggle: setShowFilters,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dropdown_default.Toggle, {
						variant: "outline-primary",
						size: "sm",
						className: "notification-filter-toggle",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaFilter, { className: "me-1" }),
							"Filter",
							activeFiltersCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								bg: "danger",
								pill: true,
								className: "ms-1",
								children: activeFiltersCount
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dropdown_default.Menu, {
						className: "notification-filter-menu p-3",
						style: { minWidth: "280px" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h6", {
									className: "mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaEnvelope, { className: "me-1" }), "Status"]
								}), FILTER_OPTIONS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Check, {
									type: "radio",
									id: `filter-${option.value}`,
									label: option.label,
									name: "filterType",
									value: option.value,
									checked: filterType === option.value,
									onChange: (e) => onFilterTypeChange(e.target.value),
									className: "mb-2"
								}, option.value))]
							}),
							features.categories && availableCategories.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h6", {
									className: "mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaTag, { className: "me-1" }), "Kategori"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Select, {
									value: selectedCategory,
									onChange: (e) => onCategoryChange(e.target.value),
									size: "sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "all",
										children: "Semua Kategori"
									}), availableCategories.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: category,
										children: TYPE_LABELS[category] || category
									}, category))]
								})]
							}),
							activeFiltersCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "d-grid",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline-danger",
									size: "sm",
									onClick: onClearFilters,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaTimes, { className: "me-1" }), "Hapus Filter"]
								})
							})
						]
					})]
				})
			})]
		}), activeFiltersCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "active-filters mt-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", {
				className: "text-muted",
				children: ["Filter aktif: ", activeFiltersCount]
			})
		})]
	});
};
//#endregion
//#region src/pages/global/NotificationPage/components/NotificationBulkActions.jsx
var NotificationBulkActions = ({ notifications, selectedIds, onSelectAll, onSelectOne, onBulkAction, onClearSelection }) => {
	const [showDeleteModal, setShowDeleteModal] = (0, import_react.useState)(false);
	const features = useNotificationFeatures();
	const BULK_ACTIONS = [
		{
			value: "mark_read",
			label: "Tandai Dibaca",
			icon: "fa-check"
		},
		{
			value: "mark_unread",
			label: "Tandai Belum Dibaca",
			icon: "fa-envelope"
		},
		{
			value: "delete",
			label: "Hapus",
			icon: "fa-trash",
			danger: true
		}
	];
	if (!features.bulkActions || notifications.length === 0) return null;
	const handleBulkAction = (action) => {
		if (action === "delete") setShowDeleteModal(true);
		else onBulkAction(action, selectedIds);
	};
	const confirmDelete = () => {
		onBulkAction("delete", selectedIds);
		setShowDeleteModal(false);
	};
	const isAllSelected = selectedIds.length === notifications.length;
	selectedIds.length > 0 && (selectedIds.length, notifications.length);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "notification-bulk-actions mb-3 p-3 bg-light rounded",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "d-flex align-items-center justify-content-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "selection-controls",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline-primary",
					size: "sm",
					onClick: () => onSelectAll(isAllSelected ? [] : notifications.map((n) => n.id)),
					className: "me-2",
					children: isAllSelected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheckSquare, { className: "me-1" }), " Batal Pilih Semua"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaSquare, { className: "me-1" }), " Pilih Semua"] })
				}), selectedIds.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					bg: "info",
					pill: true,
					children: [selectedIds.length, " terpilih"]
				})]
			}), selectedIds.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bulk-action-buttons",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dropdown_default, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dropdown_default.Toggle, {
					variant: "outline-primary",
					size: "sm",
					children: "Aksi Massal"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dropdown_default.Menu, { children: BULK_ACTIONS.map((action) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dropdown_default.Item, {
					onClick: () => handleBulkAction(action.value),
					className: action.danger ? "text-danger" : "",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: `fa ${action.icon} me-2` }), action.label]
				}, action.value)) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline-secondary",
					size: "sm",
					onClick: onClearSelection,
					className: "ms-2",
					children: "Batal"
				})]
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal_default, {
		show: showDeleteModal,
		onHide: () => setShowDeleteModal(false),
		centered: true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal_default.Header, {
				closeButton: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal_default.Title, { children: "Konfirmasi Hapus" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal_default.Body, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Apakah Anda yakin ingin menghapus ",
				selectedIds.length,
				" notifikasi terpilih?"
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted small",
				children: "Tindakan ini tidak dapat dibatalkan."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal_default.Footer, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				onClick: () => setShowDeleteModal(false),
				children: "Batal"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "danger",
				onClick: confirmDelete,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaTrash, { className: "me-1" }), "Hapus"]
			})] })
		]
	})] });
};
//#endregion
//#region src/pages/global/NotificationPage/hooks/useNotificationData.js
var useNotificationData = (itemsPerPage = 10) => {
	const { userData, notifications: socketNotifications, socket } = useProfile();
	const [notifications, setNotifications] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [currentPage, setCurrentPage] = (0, import_react.useState)(1);
	const [totalPages, setTotalPages] = (0, import_react.useState)(1);
	(0, import_react.useEffect)(() => {
		if (socketNotifications && Array.isArray(socketNotifications)) {
			setNotifications(socketNotifications);
			setTotalPages(Math.ceil(socketNotifications.length / itemsPerPage));
			setLoading(false);
		}
	}, [socketNotifications, itemsPerPage]);
	const fetchNotifications = (0, import_react.useCallback)(async (page) => {
		if (!(userData?.no_anggota || userData?.member_id || userData?.registration_id)) {
			setNotifications([]);
			setTotalPages(1);
			setLoading(false);
			return;
		}
		setLoading(true);
		try {
			const filter = {
				no_anggota: userData?.no_anggota,
				member_id: userData?.member_id || userData?.registration_id,
				page,
				limit: itemsPerPage
			};
			const res = await uNotification.getNotifications(filter);
			const rows = res?.data?.data;
			if (Array.isArray(rows)) {
				setNotifications(rows);
				setTotalPages(res?.data?.total_pages || res?.data?.totalPages || res?.data?.last_page || 1);
			} else {
				setNotifications([]);
				setTotalPages(1);
			}
		} catch (error) {
			console.error("Gagal mengambil daftar notifikasi dari API:", error);
			setNotifications([]);
			setTotalPages(1);
		} finally {
			setLoading(false);
		}
	}, [itemsPerPage, userData]);
	const markOneAsRead = (0, import_react.useCallback)(async (id) => {
		try {
			await uNotification.markAsRead(id);
			if (socket?.connected) socket.emit("notification:mark_read", { id });
		} catch (error) {
			console.error("Gagal menandai notifikasi dibaca:", error);
		}
	}, [socket]);
	const markAllAsRead = (0, import_react.useCallback)(async () => {
		const unreadIds = notifications.filter((n) => n.status === 1).map((n) => n.id);
		if (unreadIds.length === 0) return;
		try {
			await uNotification.markAsRead(unreadIds);
			setNotifications((prev) => prev.map((notif) => ({
				...notif,
				status: 2
			})));
			if (socket?.connected) socket.emit("notification:mark_all_read", { ids: unreadIds });
		} catch (error) {
			console.error("Gagal menandai semua dibaca:", error);
			setNotifications((prev) => prev.map((notif) => ({
				...notif,
				status: 2
			})));
		}
	}, [notifications, socket]);
	const markAsReadLocal = (0, import_react.useCallback)((id) => {
		setNotifications((prev) => prev.map((n) => n.id === id ? {
			...n,
			status: 2
		} : n));
	}, []);
	(0, import_react.useEffect)(() => {
		if (!socket?.connected) return;
		const handleNewNotification = (notification) => {
			setNotifications((prev) => [notification, ...prev]);
		};
		const handleNotificationUpdate = (updatedNotification) => {
			setNotifications((prev) => prev.map((n) => n.id === updatedNotification.id ? updatedNotification : n));
		};
		const handleAllNotificationsUpdate = (updatedNotifications) => {
			if (Array.isArray(updatedNotifications)) setNotifications(updatedNotifications);
		};
		socket.on("notification:new", handleNewNotification);
		socket.on("notification:update", handleNotificationUpdate);
		socket.on("notifications:update", handleAllNotificationsUpdate);
		return () => {
			socket.off("notification:new", handleNewNotification);
			socket.off("notification:update", handleNotificationUpdate);
			socket.off("notifications:update", handleAllNotificationsUpdate);
		};
	}, [socket]);
	(0, import_react.useEffect)(() => {
		if (!socketNotifications || !Array.isArray(socketNotifications)) fetchNotifications(currentPage);
	}, [
		fetchNotifications,
		currentPage,
		socketNotifications
	]);
	return {
		notifications,
		loading,
		currentPage,
		totalPages,
		setCurrentPage,
		fetchNotifications,
		markOneAsRead,
		markAllAsRead,
		markAsReadLocal
	};
};
//#endregion
//#region src/pages/global/NotificationPage/hooks/useNotificationNavigation.js
var useNotificationNavigation = () => {
	const navigate = useNavigate();
	return {
		handleBackToDashboard: (0, import_react.useCallback)(() => {
			navigate(`/${jwtEncode({ page: "dashboard" })}`);
		}, [navigate]),
		handleDetailClick: (0, import_react.useCallback)((notif, onMarkAsRead) => {
			if (notif.status === 1) onMarkAsRead(notif.id);
			navigate(`/${jwtEncode({
				page: "notificationDetailPage",
				id: notif.id,
				type: notif.type,
				type_id: notif.type_id,
				title: notif.title,
				body: notif.body,
				created_at: notif.created_at
			})}`);
		}, [navigate])
	};
};
//#endregion
//#region src/pages/global/NotificationPage/hooks/useNotificationFilter.js
var debounce = (func, delay) => {
	let timeoutId;
	return (...args) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => func.apply(null, args), delay);
	};
};
var SEARCH_CONFIG = {
	MIN_CHARACTERS: 2,
	DEBOUNCE_DELAY: 300,
	SEARCH_FIELDS: [
		"title",
		"body",
		"type"
	]
};
var useNotificationFilter = (notifications = []) => {
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const [filterType, setFilterType] = (0, import_react.useState)("all");
	const [selectedCategory, setSelectedCategory] = (0, import_react.useState)("all");
	const debouncedSearch = (0, import_react.useMemo)(() => debounce((term) => {
		setSearchTerm(term);
	}, SEARCH_CONFIG.DEBOUNCE_DELAY), []);
	const filteredNotifications = (0, import_react.useMemo)(() => {
		let filtered = [...notifications];
		if (searchTerm.length >= SEARCH_CONFIG.MIN_CHARACTERS) {
			const searchLower = searchTerm.toLowerCase();
			filtered = filtered.filter((notif) => SEARCH_CONFIG.SEARCH_FIELDS.some((field) => {
				const value = notif[field];
				return value && value.toString().toLowerCase().includes(searchLower);
			}));
		}
		if (filterType !== "all") filtered = filtered.filter((notif) => {
			if (filterType === "unread") return notif.status === 1;
			if (filterType === "read") return notif.status === 2;
			return true;
		});
		if (selectedCategory !== "all") filtered = filtered.filter((notif) => notif.type === selectedCategory);
		return filtered;
	}, [
		notifications,
		searchTerm,
		filterType,
		selectedCategory
	]);
	const availableCategories = (0, import_react.useMemo)(() => {
		const categories = /* @__PURE__ */ new Set();
		notifications.forEach((notif) => {
			if (notif.type) categories.add(notif.type);
		});
		return Array.from(categories);
	}, [notifications]);
	const clearFilters = (0, import_react.useCallback)(() => {
		setSearchTerm("");
		setFilterType("all");
		setSelectedCategory("all");
	}, []);
	const activeFiltersCount = (0, import_react.useMemo)(() => {
		let count = 0;
		if (searchTerm) count++;
		if (filterType !== "all") count++;
		if (selectedCategory !== "all") count++;
		return count;
	}, [
		searchTerm,
		filterType,
		selectedCategory
	]);
	return {
		searchTerm,
		filterType,
		selectedCategory,
		filteredNotifications,
		availableCategories,
		activeFiltersCount,
		hasActiveFilters: activeFiltersCount > 0,
		setSearchTerm: debouncedSearch,
		setFilterType,
		setSelectedCategory,
		clearFilters
	};
};
//#endregion
//#region src/pages/global/NotificationPage/config/notificationConfig.js
var NOTIFICATION_CONFIG = {
	ITEMS_PER_PAGE: 10,
	MAX_ITEMS_PER_PAGE: 50,
	FEATURES: {
		SEARCH: true,
		FILTER: true,
		CATEGORIES: true,
		BULK_ACTIONS: true,
		REAL_TIME: true,
		PUSH_NOTIFICATIONS: false,
		NOTIFICATION_PREFERENCES: false
	},
	TYPES: {
		TRANSACTION: "transaction",
		PAYMENT: "payment",
		SYSTEM: "system",
		PROMOTION: "promotion",
		REMINDER: "reminder",
		ANNOUNCEMENT: "announcement"
	},
	TYPE_LABELS: {
		transaction: "Transaksi",
		payment: "Pembayaran",
		system: "Sistem",
		promotion: "Promosi",
		reminder: "Pengingat",
		announcement: "Pengumuman"
	},
	FILTER_OPTIONS: [
		{
			value: "all",
			label: "Semua"
		},
		{
			value: "unread",
			label: "Belum Dibaca"
		},
		{
			value: "read",
			label: "Sudah Dibaca"
		}
	],
	SEARCH_CONFIG: {
		MIN_CHARACTERS: 2,
		DEBOUNCE_DELAY: 300,
		SEARCH_FIELDS: [
			"title",
			"body",
			"type"
		]
	},
	BULK_ACTIONS: [
		{
			value: "mark_read",
			label: "Tandai Dibaca",
			icon: "fa-check"
		},
		{
			value: "mark_unread",
			label: "Tandai Belum Dibaca",
			icon: "fa-envelope"
		},
		{
			value: "delete",
			label: "Hapus",
			icon: "fa-trash",
			danger: true
		}
	],
	REAL_TIME_CONFIG: {
		RECONNECT_ATTEMPTS: 5,
		RECONNECT_DELAY: 1e3,
		HEARTBEAT_INTERVAL: 3e4
	},
	UI: {
		SKELETON_COUNT: 3,
		ANIMATION_DURATION: 300,
		AUTO_REFRESH_INTERVAL: 6e4
	},
	API: {
		ENDPOINTS: {
			LIST: "/notifications",
			MARK_READ: "/notifications/mark-read",
			MARK_ALL_READ: "/notifications/mark-all-read",
			DELETE: "/notifications",
			PREFERENCES: "/notifications/preferences"
		},
		TIMEOUT: 1e4
	}
};
//#endregion
//#region src/pages/global/NotificationPage/services/NotificationService.js
var NotificationService = class {
	static async getNotifications(filter = {}) {
		try {
			return await uNotification.getNotifications(filter);
		} catch (error) {
			console.error("NotificationService.getNotifications error:", error);
			throw error;
		}
	}
	static async markAsRead(ids) {
		try {
			return await uNotification.markAsRead(ids);
		} catch (error) {
			console.error("NotificationService.markAsRead error:", error);
			throw error;
		}
	}
	static async getNotificationCount(memberId) {
		try {
			const filter = {
				member_id: memberId,
				count_only: true
			};
			return (await uNotification.getNotifications(filter))?.data?.total || 0;
		} catch (error) {
			console.error("NotificationService.getNotificationCount error:", error);
			return 0;
		}
	}
	static async deleteNotification(id) {
		try {
			return await uNotification.deleteNotification(id);
		} catch (error) {
			console.error("NotificationService.deleteNotification error:", error);
			throw error;
		}
	}
};
//#endregion
//#region src/pages/global/NotificationPage/NotificationDetailPage.jsx
var NotificationDetailPage = ({ decodedToken }) => {
	const navigate = useNavigate();
	const { socket } = useProfile();
	const [markingRead, setMarkingRead] = (0, import_react.useState)(false);
	const [currentStatus, setCurrentStatus] = (0, import_react.useState)(decodedToken?.status || 1);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const detail = (0, import_react.useMemo)(() => ({
		id: decodedToken?.id,
		title: decodedToken?.title || "Detail Notifikasi",
		body: decodedToken?.body || "-",
		type: decodedToken?.type || "-",
		type_id: decodedToken?.type_id || "-",
		status: currentStatus,
		createdAt: decodedToken?.created_at || null
	}), [decodedToken, currentStatus]);
	const TYPE_CONFIG = {
		transaction: {
			icon: "fa-shopping-cart",
			color: "primary",
			label: "Transaksi"
		},
		payment: {
			icon: "fa-credit-card",
			color: "success",
			label: "Pembayaran"
		},
		system: {
			icon: "fa-cog",
			color: "warning",
			label: "Sistem"
		},
		promotion: {
			icon: "fa-tag",
			color: "info",
			label: "Promosi"
		},
		reminder: {
			icon: "fa-clock",
			color: "secondary",
			label: "Pengingat"
		},
		announcement: {
			icon: "fa-bullhorn",
			color: "dark",
			label: "Pengumuman"
		},
		pinjaman_approval: {
			icon: "fa-check-circle",
			color: "success",
			label: "Persetujuan Pinjaman"
		},
		simpanan_success: {
			icon: "fa-check-circle",
			color: "info",
			label: "Simpanan Berhasil"
		},
		status_update: {
			icon: "fa-info-circle",
			color: "primary",
			label: "Update Status"
		},
		warning: {
			icon: "fa-exclamation-triangle",
			color: "warning",
			label: "Peringatan"
		},
		error: {
			icon: "fa-exclamation-triangle",
			color: "danger",
			label: "Error"
		}
	};
	const getNotificationIcon = (type) => {
		const config = TYPE_CONFIG[type] || TYPE_CONFIG.system;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: `fa ${config.icon} text-${config.color}` });
	};
	const getTypeLabel = (type) => {
		return (TYPE_CONFIG[type] || TYPE_CONFIG.system).label;
	};
	const getStatusBadge = () => {
		if (detail.status === 1) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			bg: "danger",
			pill: true,
			children: "Baru"
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			bg: "secondary",
			pill: true,
			children: "Dibaca"
		});
	};
	const handleBack = () => {
		navigate(`/${jwtEncode({ page: "notificationPage" })}`);
	};
	const markAsRead = (0, import_react.useCallback)(async () => {
		if (detail.status !== 1 || markingRead) return;
		setMarkingRead(true);
		try {
			await uNotification.markAsRead(detail.id);
			if (socket?.connected) socket.emit("notification:mark_read", { id: detail.id });
			setCurrentStatus(2);
		} catch (error) {
			console.error("Gagal menandai notifikasi dibaca:", error);
		} finally {
			setMarkingRead(false);
		}
	}, [
		detail,
		markingRead,
		socket
	]);
	(0, import_react.useEffect)(() => {
		if (!decodedToken?.id) {
			setError("Notifikasi tidak ditemukan");
			setLoading(false);
		} else setLoading(false);
	}, [decodedToken]);
	(0, import_react.useEffect)(() => {
		if (detail.status === 1 && detail.id && !loading) markAsRead();
	}, [
		detail.id,
		detail.status,
		markAsRead,
		loading
	]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "d-flex justify-content-center align-items-center",
		style: { minHeight: "400px" },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
				animation: "border",
				variant: "primary",
				className: "mb-3"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: "Memuat detail notifikasi..."
			})]
		})
	});
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "d-flex justify-content-center align-items-center",
		style: { minHeight: "400px" },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaExclamationTriangle, {
					size: 48,
					className: "text-warning mb-3"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
					className: "text-danger mb-2",
					children: "Error"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted mb-3",
					children: error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline-primary",
					onClick: handleBack,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaArrowLeft, { className: "me-2" }), "Kembali ke Notifikasi"]
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "row page-titles",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "col-md-8 col-12 align-self-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: "text-themecolor mb-0 mt-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					role: "button",
					onClick: handleBack,
					className: "me-3 text-primary",
					style: { cursor: "pointer" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaArrowLeft, { className: "me-2" })
				}), "Detail Notifikasi"]
			})
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default, {
		className: "shadow-sm notification-detail-card hover:shadow-lg transition-shadow duration-300",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Header, {
			className: "d-flex justify-content-between align-items-center py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "d-flex align-items-center flex-wrap flex-grow-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "me-3",
					children: getNotificationIcon(detail.type)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-grow-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
						className: "mb-1 text-truncate",
						children: detail.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "small text-muted",
						children: detail.createdAt ? new Date(detail.createdAt).toLocaleString("id-ID", {
							day: "numeric",
							month: "long",
							year: "numeric",
							hour: "2-digit",
							minute: "2-digit"
						}) : "-"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "d-flex align-items-center gap-2 ms-2",
				children: [getStatusBadge(), markingRead && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
					animation: "border",
					size: "sm",
					variant: "primary"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "notification-detail-body mb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 fs-6",
					children: detail.body
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "notification-detail-meta",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
					className: "text-muted mb-3",
					children: "Informasi Detail"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "row",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "col-md-4 col-sm-6 mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
								className: "text-muted d-block",
								children: "ID Notifikasi"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "fw-semibold",
								children: detail.id ?? "-"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "col-md-4 col-sm-6 mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
								className: "text-muted d-block",
								children: "Tipe"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "fw-semibold text-capitalize",
								children: getTypeLabel(detail.type)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "col-md-4 col-sm-6 mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
								className: "text-muted d-block",
								children: "Referensi"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "fw-semibold",
								children: detail.type_id || "-"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "col-md-4 col-sm-6 mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
								className: "text-muted d-block",
								children: "Status"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: getStatusBadge() })]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 d-flex gap-2 flex-wrap",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline-primary",
					onClick: handleBack,
					className: "hover:bg-primary hover:text-white transition-colors duration-200",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaArrowLeft, { className: "me-2" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "d-none d-sm-inline",
							children: "Kembali ke Notifikasi"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "d-sm-none",
							children: "Kembali"
						})
					]
				}), detail.status === 1 && !markingRead && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "primary",
					onClick: markAsRead,
					className: "hover:scale-105 transition-transform duration-200",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheckCircle, { className: "me-2" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "d-none d-sm-inline",
							children: "Tandai Dibaca"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "d-sm-none",
							children: "Dibaca"
						})
					]
				})]
			})
		] })]
	})] });
};
//#endregion
export { NOTIFICATION_CONFIG, NotificationBulkActions, NotificationCard, NotificationDetailPage, NotificationFilters, NotificationItem, NotificationList, NotificationPagination, NotificationService, NotificationPage as default, useNotificationData, useNotificationFeatures, useNotificationFilter, useNotificationNavigation };
