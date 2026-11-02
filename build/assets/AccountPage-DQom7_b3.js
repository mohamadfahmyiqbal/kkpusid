import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, T as require_sweetalert2_all, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { Cn as FaIdCard, E as Button, En as FaKey, Ln as FaPhone, Nn as FaMapMarkerAlt, Ot as FaBriefcase, Pr as useNavigate, Pt as FaCamera, Qn as FaShieldAlt, S as Card_default, Zt as FaCreditCard, _r as FaUserCircle, an as FaExclamationTriangle, bn as FaHistory, br as FaUserFriends, c as Spinner, en as FaEdit, er as FaSignInAlt, g as Form_default, h as InputGroup_default, hr as FaUser, jn as FaLock, kn as FaLink, kt as FaBuilding, l as Row, ln as FaFileAlt, p as Modal_default, pr as FaUniversity, r as StateManagedSelect$1, tn as FaEnvelope, wt as FaBell, x as Col, xr as FaUserMinus, xt as FaArrowRight, yr as FaUserEdit } from "./vendor-react-D5pUDmay.js";
import { n as getSocket } from "./socket-CtRvCIQ2.js";
import { s as jwtEncode } from "./index-BaUN0sjk.js";
import { t as SwalAlert } from "./SwalAlert-C3kBxD_o.js";
import { t as uGlobal } from "./UGlobal-MGBt7b3Z.js";
import { t as profileService } from "./profileService-CtUrDUsl.js";
//#region src/pages/anggota/AccountPage/AccountPage.css
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_sweetalert2_all = /* @__PURE__ */ __toESM(require_sweetalert2_all());
//#endregion
//#region src/pages/anggota/AccountPage/components/ProfileSkeleton.jsx
var import_jsx_runtime = require_jsx_runtime();
function ProfileSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "card ap-profile-header-card mb-4 p-4 skeleton-shimmer",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "d-flex align-items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-circle bg-light",
				style: {
					width: "100px",
					height: "100px",
					opacity: .1
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-grow-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-light mb-2 rounded",
						style: {
							width: "200px",
							height: "24px",
							opacity: .1
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-light mb-2 rounded",
						style: {
							width: "120px",
							height: "16px",
							opacity: .1
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-light rounded",
						style: {
							width: "150px",
							height: "14px",
							opacity: .1
						}
					})
				]
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default, {
		className: "ap-info-card mb-4 skeleton-shimmer",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default.Header, {
			className: "ap-card-header p-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-light rounded",
				style: {
					width: "150px",
					height: "20px",
					opacity: .1
				}
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default.Body, {
			className: "p-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { children: [
				1,
				2,
				3
			].map((colIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
				md: 4,
				className: "mb-3",
				children: [
					1,
					2,
					3
				].map((rowIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-light mb-1 rounded",
						style: {
							width: "80px",
							height: "12px",
							opacity: .1
						}
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-light rounded",
						style: {
							width: "150px",
							height: "16px",
							opacity: .1
						}
					})]
				}, rowIndex))
			}, colIndex)) })
		})]
	})] });
}
//#endregion
//#region src/pages/anggota/AccountPage/components/ProfileHeaderCard.jsx
var formatDate$1 = (dateStr) => {
	if (!dateStr || dateStr === "-") return "-";
	try {
		const date = new Date(dateStr);
		if (isNaN(date.getTime())) return dateStr;
		return `${date.getDate()} ${[
			"Januari",
			"Februari",
			"Maret",
			"April",
			"Mei",
			"Juni",
			"Juli",
			"Agustus",
			"September",
			"Oktober",
			"November",
			"Desember"
		][date.getMonth()]} ${date.getFullYear()}`;
	} catch (e) {
		return dateStr;
	}
};
var getInitials = (name) => {
	if (!name) return "?";
	const parts = name.trim().split(/\s+/);
	if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
	return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};
var getAvatarGradient = (name) => {
	const AVATAR_GRADIENTS = [
		["#3b82f6", "#2563eb"],
		["#8b5cf6", "#7c3aed"],
		["#10b981", "#059669"],
		["#f59e0b", "#d97706"],
		["#ef4444", "#dc2626"],
		["#06b6d4", "#0891b2"],
		["#ec4899", "#db2777"],
		["#14b8a6", "#0d9488"]
	];
	if (!name) return AVATAR_GRADIENTS[0];
	let hash = 0;
	for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
	return AVATAR_GRADIENTS[Math.abs(hash) % AVATAR_GRADIENTS.length];
};
var getFotoSrc = (foto) => {
	if (!foto) return "";
	return foto.startsWith("data:image") ? foto : `data:image/jpeg;base64,${foto}`;
};
function ProfileHeaderCard({ userProfile, onEditPhoto }) {
	const fotoSrc = getFotoSrc(userProfile?.foto);
	const initials = getInitials(userProfile?.nama);
	const [gradFrom, gradTo] = getAvatarGradient(userProfile?.nama);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default, {
		className: "ap-profile-header-card mb-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
			className: "p-4 d-flex align-items-center justify-content-between flex-wrap gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "d-flex align-items-center gap-4 flex-wrap",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ap-avatar-wrapper",
					children: [fotoSrc ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: fotoSrc,
						alt: "Foto Profil",
						className: "ap-avatar-img"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "ap-avatar-img d-flex align-items-center justify-content-center",
						style: {
							background: `linear-gradient(135deg, ${gradFrom}, ${gradTo})`,
							fontSize: "36px",
							fontWeight: "800",
							color: "#ffffff",
							letterSpacing: "1px",
							userSelect: "none"
						},
						children: initials
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "ap-avatar-edit-btn",
						onClick: onEditPhoto,
						title: "Ubah Foto Profil",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCamera, {})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "fw-bold text-white mb-1",
						children: userProfile?.nama
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "d-flex flex-column gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ap-role-badge",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaIdCard, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: userProfile?.jabatan || "Calon Anggota" })]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "opacity-75 fs-7",
							children: [
								"Bergabung sejak",
								" ",
								userProfile?.join_date && userProfile.join_date !== "-" ? formatDate$1(userProfile.join_date) : "-"
							]
						})]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ap-verified-box ms-md-auto align-items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaShieldAlt, { className: "ap-verified-icon" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-start d-flex flex-column",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "text-white fs-7",
						children: "Akun Anda Terverifikasi"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "opacity-75 fs-8",
						children: [
							"Terakhir diperbarui",
							" ",
							userProfile?.updated_at && userProfile.updated_at !== "-" ? formatDate$1(userProfile.updated_at) : "-"
						]
					})]
				})]
			})]
		})
	});
}
//#endregion
//#region src/pages/anggota/AccountPage/components/ProfileInfoCards.jsx
var formatDate = (dateStr) => {
	if (!dateStr || dateStr === "-") return "-";
	try {
		const date = new Date(dateStr);
		if (isNaN(date.getTime())) return dateStr;
		return `${date.getDate()} ${[
			"Januari",
			"Februari",
			"Maret",
			"April",
			"Mei",
			"Juni",
			"Juli",
			"Agustus",
			"September",
			"Oktober",
			"November",
			"Desember"
		][date.getMonth()]} ${date.getFullYear()}`;
	} catch (e) {
		return dateStr;
	}
};
function ProfileInfoCards({ userProfile, onOpenEditModal }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default, {
		className: "ap-info-card mb-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "card-header ap-card-header d-flex justify-content-between align-items-center py-3 px-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ap-header-title",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUser, { className: "ap-header-icon" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Informasi Pribadi & Kontak" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline-primary",
				className: "ap-edit-btn",
				onClick: () => onOpenEditModal("pribadi"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaEdit, { className: "me-2" }), "Edit Profil"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default.Body, {
			className: "p-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ap-grid-container",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ap-grid-item",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ap-info-item",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ap-info-label",
									children: "ID Anggota"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ap-info-value",
									children: userProfile?.no_anggota || "-"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ap-info-item",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ap-info-label",
									children: "NIK (KTP)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ap-info-value",
									children: userProfile?.nik_ktp || "-"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ap-info-item",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ap-info-label",
									children: "Alamat Domisili"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "ap-info-value",
									children: [userProfile?.alamat || "-", (userProfile?.rt || userProfile?.rw) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "d-block text-muted small",
										children: [
											"RT ",
											userProfile?.rt || "-",
											" / RW ",
											userProfile?.rw || "-"
										]
									})]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ap-grid-item",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ap-info-item",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ap-info-label",
								children: "Jenis Kelamin"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ap-info-value",
								children: userProfile?.gender || "-"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ap-info-item",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ap-info-label",
								children: "Tanggal Bergabung"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ap-info-value",
								children: userProfile?.join_date && userProfile.join_date !== "-" ? formatDate(userProfile.join_date) : "-"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ap-grid-item",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ap-info-item",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ap-info-label",
									children: "Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ap-info-value",
									children: userProfile?.email || "-"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ap-info-item",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ap-info-label",
									children: "No. Telepon / WhatsApp"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ap-info-value",
									children: userProfile?.telepon || "-"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ap-info-item",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ap-info-label",
									children: "Status Akun"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ap-status-badge",
									children: "Aktif"
								})]
							})
						]
					})
				]
			})
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
		className: "g-4 mb-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
				lg: 4,
				md: 6,
				sm: 12,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default, {
					className: "ap-info-card h-100",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card-header ap-card-header d-flex justify-content-between align-items-center py-3 px-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ap-header-title d-flex align-items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUniversity, { className: "text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "fs-6 fw-bold",
								children: "Rekening Bank"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "link",
							className: "p-0 text-primary text-decoration-none fw-semibold fs-7",
							onClick: () => onOpenEditModal("bank"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaEdit, { className: "me-1" }), " Ubah"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
						className: "p-4 d-flex flex-column justify-content-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "d-flex flex-column gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "ap-info-item",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ap-info-label",
										children: "Nama Bank"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "ap-info-value fs-6 text-dark",
										children: userProfile?.bank_name || "-"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "ap-info-item",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ap-info-label",
										children: "Nomor Rekening"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ap-info-value fw-bold text-primary font-monospace fs-6",
										children: userProfile?.bank_account_no || "-"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "ap-info-item",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ap-info-label",
										children: "Atas Nama Pemilik"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ap-info-value",
										children: userProfile?.account_holder || "-"
									})]
								})
							]
						}), (!userProfile?.bank_account_no || userProfile?.bank_account_no === "-") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 p-2 rounded bg-warning-subtle text-warning-emphasis fs-8 d-flex align-items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaExclamationTriangle, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Belum diatur. Segera lengkapi untuk penarikan dana." })]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
				lg: 4,
				md: 6,
				sm: 12,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default, {
					className: "ap-info-card h-100",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card-header ap-card-header d-flex justify-content-between align-items-center py-3 px-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ap-header-title d-flex align-items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaBriefcase, { className: "text-success" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "fs-6 fw-bold",
								children: "Pekerjaan"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "link",
							className: "p-0 text-primary text-decoration-none fw-semibold fs-7",
							onClick: () => onOpenEditModal("pekerjaan"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaEdit, { className: "me-1" }), " Ubah"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default.Body, {
						className: "p-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "d-flex flex-column gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "ap-info-item",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ap-info-label",
										children: "Pekerjaan / Jabatan"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "ap-info-value fs-6 text-dark",
										children: userProfile?.occupation || "-"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "ap-info-item",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ap-info-label",
										children: "Instansi / Perusahaan"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ap-info-value",
										children: userProfile?.employer_name || "-"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "ap-info-item",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ap-info-label",
										children: "Alamat Kantor / Usaha"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ap-info-value",
										children: userProfile?.employer_address || "-"
									})]
								})
							]
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
				lg: 4,
				md: 12,
				sm: 12,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default, {
					className: "ap-info-card h-100",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card-header ap-card-header d-flex justify-content-between align-items-center py-3 px-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ap-header-title d-flex align-items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUserFriends, { className: "text-danger" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "fs-6 fw-bold",
								children: "Kontak Darurat"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "link",
							className: "p-0 text-primary text-decoration-none fw-semibold fs-7",
							onClick: () => onOpenEditModal("darurat"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaEdit, { className: "me-1" }), " Ubah"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default.Body, {
						className: "p-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "d-flex flex-column gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "ap-info-item",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ap-info-label",
										children: "Nama Kontak"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "ap-info-value fs-6 text-dark",
										children: userProfile?.contact_name || "-"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "ap-info-item",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ap-info-label",
										children: "Hubungan"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ap-info-value",
										children: userProfile?.relation || "-"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "ap-info-item",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ap-info-label",
										children: "No. Telepon Darurat"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ap-info-value font-monospace",
										children: userProfile?.phone_number_emergency || "-"
									})]
								})
							]
						})
					})]
				})
			})
		]
	})] });
}
//#endregion
//#region src/pages/anggota/AccountPage/components/SecurityAndActivitySection.jsx
function SecurityAndActivitySection({ userProfile, onOpenPasswordModal, onTerminateKeanggotaan, onShowNotification }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-start mt-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
				className: "ap-section-title",
				children: "Akses Cepat"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "ap-section-desc",
				children: "Kelola akun dan keamanan Anda dengan mudah."
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
			className: "g-3 mb-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
					lg: 3,
					md: 6,
					sm: 12,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ap-quick-card",
						onClick: onOpenPasswordModal,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "d-flex align-items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "ap-quick-icon-wrapper",
								style: {
									backgroundColor: "#eff6ff",
									color: "#2563eb"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaLock, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "d-block text-slate-800 fs-7",
									children: "Reset Password"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted",
									style: { fontSize: "10.5px" },
									children: "Ubah password berkala"
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaArrowRight, { className: "ap-quick-arrow" })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
					lg: 3,
					md: 6,
					sm: 12,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ap-quick-card",
						onClick: () => onShowNotification("Akun Anda telah terverifikasi sebagai anggota.", "success"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "d-flex align-items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "ap-quick-icon-wrapper",
								style: {
									backgroundColor: "#f0fdf4",
									color: "#16a34a"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaShieldAlt, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "d-block text-slate-800 fs-7",
									children: "Verifikasi Akun"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted",
									style: { fontSize: "10.5px" },
									children: "Verifikasi identitas aman"
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaArrowRight, { className: "ap-quick-arrow" })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
					lg: 3,
					md: 6,
					sm: 12,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ap-quick-card",
						onClick: () => onShowNotification("Preferensi notifikasi default telah aktif.", "success"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "d-flex align-items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "ap-quick-icon-wrapper",
								style: {
									backgroundColor: "#faf5ff",
									color: "#7c3aed"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaBell, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "d-block text-slate-800 fs-7",
									children: "Pengaturan Notif"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted",
									style: { fontSize: "10.5px" },
									children: "Kelola notifikasi Anda"
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaArrowRight, { className: "ap-quick-arrow" })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
					lg: 3,
					md: 6,
					sm: 12,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ap-quick-card",
						onClick: () => onShowNotification("Semua aktivitas telah ditampilkan.", "success"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "d-flex align-items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "ap-quick-icon-wrapper",
								style: {
									backgroundColor: "#fffbeb",
									color: "#d97706"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaHistory, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "d-block text-slate-800 fs-7",
									children: "Riwayat Aktivitas"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted",
									style: { fontSize: "10.5px" },
									children: "Aktivitas terbaru akun"
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaArrowRight, { className: "ap-quick-arrow" })]
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
			className: "g-4 mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
				lg: 6,
				md: 12,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ap-security-card text-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
							className: "fw-bold mb-3",
							children: "Keamanan Akun"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ap-list-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ap-row-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaLock, { className: "ap-row-icon" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "ap-row-label",
									children: "Password"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ap-row-desc",
									children: "Terakhir diubah 2 bulan yang lalu"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "link",
								className: "text-decoration-none text-primary fw-bold p-0 fs-7",
								onClick: onOpenPasswordModal,
								children: "Ubah"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ap-list-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ap-row-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaShieldAlt, { className: "ap-row-icon" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "ap-row-label",
									children: "Verifikasi Dua Langkah"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ap-row-desc",
									children: "Keamanan ekstra untuk masuk akun"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ap-active-text",
								children: "Aktif"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ap-list-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ap-row-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaEnvelope, { className: "ap-row-icon" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "ap-row-label",
									children: "Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ap-row-desc",
									children: userProfile?.email
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ap-verified-badge",
								children: "Terverifikasi"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ap-list-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ap-row-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaPhone, { className: "ap-row-icon" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "ap-row-label",
									children: "Nomor Telepon"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ap-row-desc",
									children: userProfile?.telepon
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ap-verified-badge",
								children: "Terverifikasi"
							})]
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
				lg: 6,
				md: 12,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ap-activity-card text-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
								className: "fw-bold mb-1",
								children: "Ringkasan Aktivitas"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted fs-8",
								children: "Aktivitas terakhir pada akun Anda."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ap-activity-item",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "ap-act-icon-box",
								style: {
									backgroundColor: "#d1fae5",
									color: "#065f46"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaSignInAlt, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ap-act-text",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Login berhasil" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "25 Mei 2024, 10:30 WIB" })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ap-activity-item",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "ap-act-icon-box",
								style: {
									backgroundColor: "#dbeafe",
									color: "#1e40af"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUserEdit, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ap-act-text",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Profil diperbarui" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "20 Mei 2024, 14:25 WIB" })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ap-activity-item",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "ap-act-icon-box",
								style: {
									backgroundColor: "#fef3c7",
									color: "#92400e"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaFileAlt, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ap-act-text",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Dokumen diunggah" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "18 Mei 2024, 09:15 WIB" })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-center mt-3 pt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "link",
								className: "text-decoration-none fw-bold p-0 text-primary fs-7",
								onClick: () => onShowNotification("Semua aktivitas telah ditampilkan.", "success"),
								children: "Lihat Semua Aktivitas"
							})
						})
					]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default, {
			className: "ap-danger-card mb-4 text-start",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
				className: "d-flex align-items-center justify-content-between flex-wrap gap-3 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "d-flex align-items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaExclamationTriangle, { className: "ap-danger-icon" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
						className: "fw-bold text-danger mb-1",
						children: "Zona Berbahaya"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted mb-0 fs-7",
						children: "Tindakan berikut bersifat permanen dan tidak dapat dibatalkan."
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline-danger",
					className: "ap-danger-btn",
					onClick: onTerminateKeanggotaan,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUserMinus, {}), " Berhenti Keanggotaan"]
				})]
			})
		})
	] });
}
//#endregion
//#region src/pages/anggota/AccountPage/components/edit-profile/EditProfileNavTabs.jsx
var EDIT_PROFILE_TABS = [
	{
		key: "pribadi",
		label: "Pribadi & Alamat",
		icon: FaUser
	},
	{
		key: "bank",
		label: "Rekening Bank",
		icon: FaUniversity
	},
	{
		key: "pekerjaan",
		label: "Pekerjaan",
		icon: FaBriefcase
	},
	{
		key: "darurat",
		label: "Kontak Darurat",
		icon: FaUserFriends
	}
];
function EditProfileNavTabs({ activeTab, onTabSelect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "d-flex ap-modal-tabs px-4 pt-3 bg-light border-bottom",
		children: EDIT_PROFILE_TABS.map(({ key, label, icon: Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: `ap-modal-tab-btn ${activeTab === key ? "active" : ""}`,
			onClick: () => onTabSelect(key),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })]
		}, key))
	});
}
//#endregion
//#region src/pages/anggota/AccountPage/components/edit-profile/EditProfileFooter.jsx
function EditProfileFooter({ activeTab, setActiveTab, onHide, isSubmitting }) {
	const tabKeys = EDIT_PROFILE_TABS.map((t) => t.key);
	const currentIdx = tabKeys.indexOf(activeTab);
	const handlePrev = () => {
		if (currentIdx > 0) setActiveTab(tabKeys[currentIdx - 1]);
	};
	const handleNext = () => {
		if (currentIdx < tabKeys.length - 1) setActiveTab(tabKeys[currentIdx + 1]);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "modal-footer d-flex justify-content-between border-top",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "d-flex gap-2",
			children: [currentIdx > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline-secondary",
				size: "sm",
				onClick: handlePrev,
				children: "← Sebelumnya"
			}), currentIdx < tabKeys.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline-primary",
				size: "sm",
				onClick: handleNext,
				children: "Selanjutnya →"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "d-flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "light",
				onClick: onHide,
				disabled: isSubmitting,
				children: "Tutup"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "primary",
				type: "submit",
				form: "editProfileForm",
				disabled: isSubmitting,
				children: isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
					as: "span",
					animation: "border",
					size: "sm",
					role: "status",
					"aria-hidden": "true"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ms-2",
					children: "Menyimpan..."
				})] }) : "Simpan Semua Perubahan"
			})]
		})]
	});
}
//#endregion
//#region src/pages/anggota/AccountPage/components/edit-profile/TabPribadiAlamat.jsx
function TabPribadiAlamat({ formData, setFormData, errors, isSubmitting, handleChange, userProfile, provinces, regencies, districts, villages }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "ap-section-header-box",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaIdCard, { className: "ap-section-header-icon" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
				className: "fw-bold mb-0 text-dark",
				children: "Data Identitas Pribadi"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
				className: "text-muted",
				children: "Perbarui nama, NIK, dan kontak pribadi Anda"
			})] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
			className: "g-3 mb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
				md: 6,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
					controlId: "formNama",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Label, {
							className: "small fw-semibold",
							children: ["Nama Lengkap ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-danger",
								children: "*"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
							type: "text",
							placeholder: "Nama lengkap sesuai KTP",
							name: "nama",
							value: formData.nama,
							onChange: handleChange,
							isInvalid: !!errors.nama,
							disabled: isSubmitting,
							className: "ap-form-control"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control.Feedback, {
							type: "invalid",
							children: errors.nama
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
				md: 6,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
					controlId: "formNik",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
						className: "small fw-semibold",
						children: "NIK (Nomor Induk Kependudukan)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
						type: "text",
						placeholder: "16 digit NIK KTP",
						name: "nik_ktp",
						maxLength: 16,
						value: formData.nik_ktp,
						onChange: handleChange,
						disabled: isSubmitting,
						className: "ap-form-control"
					})]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
			className: "g-3 mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
				md: 6,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
					controlId: "formEmail",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
							className: "small fw-semibold",
							children: "Alamat Email"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
							type: "email",
							value: userProfile?.email || "",
							readOnly: true,
							disabled: true,
							className: "bg-light ap-form-control text-muted"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Text, {
							className: "text-muted fs-8",
							children: "Email akun utama tidak dapat diubah sendiri."
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
				md: 6,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
					controlId: "formTelepon",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Label, {
							className: "small fw-semibold",
							children: ["Nomor Telepon / WA ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-danger",
								children: "*"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
							type: "tel",
							placeholder: "08123456789",
							name: "telepon",
							value: formData.telepon,
							onChange: handleChange,
							isInvalid: !!errors.telepon,
							disabled: isSubmitting,
							className: "ap-form-control"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control.Feedback, {
							type: "invalid",
							children: errors.telepon
						})
					]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "ap-section-header-box mt-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaMapMarkerAlt, { className: "ap-section-header-icon" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
				className: "fw-bold mb-0 text-dark",
				children: "Alamat & Domisili Sesuai KTP"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
				className: "text-muted",
				children: "Pilih wilayah administrasi dan alamat rumah"
			})] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
			className: "g-3 mb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
				md: 6,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
					className: "small fw-semibold",
					children: "Provinsi"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateManagedSelect$1, {
					options: provinces,
					placeholder: "Pilih Provinsi...",
					onChange: (opt) => {
						setFormData((prev) => ({
							...prev,
							province_id: opt?.value || "",
							city_id: "",
							district_id: "",
							subdistrict_id: ""
						}));
					},
					value: provinces.find((p) => p.value === formData.province_id) || null,
					isDisabled: isSubmitting
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
				md: 6,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
					className: "small fw-semibold",
					children: "Kota / Kabupaten"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateManagedSelect$1, {
					options: regencies,
					placeholder: "Pilih Kota/Kabupaten...",
					isDisabled: !formData.province_id || isSubmitting,
					onChange: (opt) => {
						setFormData((prev) => ({
							...prev,
							city_id: opt?.value || "",
							district_id: "",
							subdistrict_id: ""
						}));
					},
					value: regencies.find((r) => r.value === formData.city_id) || null
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
			className: "g-3 mb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
				md: 6,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
					className: "small fw-semibold",
					children: "Kecamatan"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateManagedSelect$1, {
					options: districts,
					placeholder: "Pilih Kecamatan...",
					isDisabled: !formData.city_id || isSubmitting,
					onChange: (opt) => {
						setFormData((prev) => ({
							...prev,
							district_id: opt?.value || "",
							subdistrict_id: ""
						}));
					},
					value: districts.find((d) => d.value === formData.district_id) || null
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
				md: 6,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
					className: "small fw-semibold",
					children: "Kelurahan / Desa"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateManagedSelect$1, {
					options: villages,
					placeholder: "Pilih Kelurahan/Desa...",
					isDisabled: !formData.district_id || isSubmitting,
					onChange: (opt) => {
						setFormData((prev) => ({
							...prev,
							subdistrict_id: opt?.value || ""
						}));
					},
					value: villages.find((v) => v.value === formData.subdistrict_id) || null
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
			className: "g-3 mb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
				md: 6,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
					className: "small fw-semibold",
					children: "RT"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
					type: "text",
					placeholder: "Contoh: 001",
					name: "rt",
					value: formData.rt,
					onChange: handleChange,
					disabled: isSubmitting,
					className: "ap-form-control"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
				md: 6,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
					className: "small fw-semibold",
					children: "RW"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
					type: "text",
					placeholder: "Contoh: 005",
					name: "rw",
					value: formData.rw,
					onChange: handleChange,
					disabled: isSubmitting,
					className: "ap-form-control"
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
			className: "mb-2",
			controlId: "formAlamat",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Label, {
					className: "small fw-semibold",
					children: [
						"Alamat Lengkap (Jalan / No. Rumah / RT / RW)",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-danger",
							children: "*"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
					as: "textarea",
					rows: 3,
					placeholder: "Contoh: Jl. Diponegoro No. 45",
					name: "alamat",
					value: formData.alamat,
					onChange: handleChange,
					isInvalid: !!errors.alamat,
					disabled: isSubmitting,
					className: "ap-form-control"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control.Feedback, {
					type: "invalid",
					children: errors.alamat
				})
			]
		})
	] });
}
//#endregion
//#region src/pages/anggota/AccountPage/components/edit-profile/TabRekeningBank.jsx
function TabRekeningBank({ formData, errors, isSubmitting, handleChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "ap-section-header-box",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUniversity, { className: "ap-section-header-icon" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
				className: "fw-bold mb-0 text-dark",
				children: "Informasi Rekening Bank"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
				className: "text-muted",
				children: "Data rekening utama untuk transaksi penarikan simpanan dan pinjaman koperasi"
			})] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
			className: "g-3 mb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
				md: 6,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
					controlId: "formBankName",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Label, {
							className: "small fw-semibold",
							children: ["Nama Bank ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-danger",
								children: "*"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup_default, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup_default.Text, {
							className: "bg-light",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUniversity, { className: "text-muted" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
							type: "text",
							placeholder: "Contoh: BCA, Mandiri, BRI, BNI",
							name: "bank_name",
							value: formData.bank_name,
							onChange: handleChange,
							isInvalid: !!errors.bank_name,
							disabled: isSubmitting,
							className: "ap-form-control"
						})] }),
						errors.bank_name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-danger small mt-1",
							children: errors.bank_name
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
				md: 6,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
					controlId: "formBankAccountNo",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Label, {
						className: "small fw-semibold",
						children: ["Nomor Rekening ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-danger",
							children: "*"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup_default, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup_default.Text, {
						className: "bg-light",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCreditCard, { className: "text-muted" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
						type: "text",
						placeholder: "Masukkan nomor rekening",
						name: "bank_account_no",
						value: formData.bank_account_no,
						onChange: handleChange,
						disabled: isSubmitting,
						className: "ap-form-control font-monospace"
					})] })]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
			className: "g-3 mb-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
				md: 12,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
					controlId: "formAccountHolder",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Label, {
							className: "small fw-semibold",
							children: ["Nama Pemilik Rekening ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-danger",
								children: "*"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup_default, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup_default.Text, {
							className: "bg-light",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUserCircle, { className: "text-muted" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
							type: "text",
							placeholder: "Nama pemilik rekening sesuai buku tabungan",
							name: "account_holder",
							value: formData.account_holder,
							onChange: handleChange,
							disabled: isSubmitting,
							className: "ap-form-control"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Text, {
							className: "text-muted fs-8",
							children: "Pastikan nama pemilik rekening sama dengan nama anggota terdaftar untuk mempercepat proses verifikasi."
						})
					]
				})
			})
		})
	] });
}
//#endregion
//#region src/pages/anggota/AccountPage/components/edit-profile/TabPekerjaan.jsx
function TabPekerjaan({ formData, isSubmitting, handleChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "ap-section-header-box",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaBriefcase, { className: "ap-section-header-icon" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
				className: "fw-bold mb-0 text-dark",
				children: "Informasi Pekerjaan"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
				className: "text-muted",
				children: "Data pekerjaan atau usaha anggota saat ini"
			})] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
			className: "g-3 mb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
				md: 6,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
					controlId: "formOccupation",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
						className: "small fw-semibold",
						children: "Pekerjaan / Jabatan"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup_default, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup_default.Text, {
						className: "bg-light",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaBriefcase, { className: "text-muted" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
						type: "text",
						placeholder: "Contoh: Karyawan Swasta, Wiraswasta, PNS",
						name: "occupation",
						value: formData.occupation,
						onChange: handleChange,
						disabled: isSubmitting,
						className: "ap-form-control"
					})] })]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
				md: 6,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
					controlId: "formEmployerName",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
						className: "small fw-semibold",
						children: "Nama Instansi / Perusahaan"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup_default, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup_default.Text, {
						className: "bg-light",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaBuilding, { className: "text-muted" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
						type: "text",
						placeholder: "Contoh: PT Sumber Rezeki Makmur",
						name: "employer_name",
						value: formData.employer_name,
						onChange: handleChange,
						disabled: isSubmitting,
						className: "ap-form-control"
					})] })]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
			className: "mb-2",
			controlId: "formEmployerAddress",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
				className: "small fw-semibold",
				children: "Alamat Tempat Bekerja / Usaha"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup_default, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup_default.Text, {
				className: "bg-light",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaMapMarkerAlt, { className: "text-muted" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
				as: "textarea",
				rows: 3,
				placeholder: "Masukkan alamat lengkap kantor atau lokasi usaha",
				name: "employer_address",
				value: formData.employer_address,
				onChange: handleChange,
				disabled: isSubmitting,
				className: "ap-form-control"
			})] })]
		})
	] });
}
//#endregion
//#region src/pages/anggota/AccountPage/components/edit-profile/TabKontakDarurat.jsx
function TabKontakDarurat({ formData, isSubmitting, handleChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "ap-section-header-box",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUserFriends, { className: "ap-section-header-icon" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
				className: "fw-bold mb-0 text-dark",
				children: "Kontak Darurat"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
				className: "text-muted",
				children: "Kerabat atau pihak yang dapat dihubungi saat situasi darurat"
			})] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
			className: "g-3 mb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
				md: 6,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
					controlId: "formContactName",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
						className: "small fw-semibold",
						children: "Nama Kontak Darurat"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup_default, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup_default.Text, {
						className: "bg-light",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUserFriends, { className: "text-muted" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
						type: "text",
						placeholder: "Nama lengkap kerabat / penjamin",
						name: "contact_name",
						value: formData.contact_name,
						onChange: handleChange,
						disabled: isSubmitting,
						className: "ap-form-control"
					})] })]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
				md: 6,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
					controlId: "formRelation",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
						className: "small fw-semibold",
						children: "Hubungan / Relasi"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup_default, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup_default.Text, {
						className: "bg-light",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaLink, { className: "text-muted" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
						type: "text",
						placeholder: "Contoh: Suami/Istri, Orang Tua, Saudara",
						name: "relation",
						value: formData.relation,
						onChange: handleChange,
						disabled: isSubmitting,
						className: "ap-form-control"
					})] })]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
			className: "mb-2",
			controlId: "formPhoneEmergency",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
				className: "small fw-semibold",
				children: "Nomor Telepon Darurat"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup_default, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup_default.Text, {
				className: "bg-light",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaPhone, { className: "text-muted" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
				type: "tel",
				placeholder: "Contoh: 08123456789",
				name: "phone_number_emergency",
				value: formData.phone_number_emergency,
				onChange: handleChange,
				disabled: isSubmitting,
				className: "ap-form-control"
			})] })]
		})
	] });
}
//#endregion
//#region src/pages/anggota/AccountPage/components/edit-profile/useCascadingRegions.js
function useCascadingRegions(show, provinceId, cityId, districtId) {
	const [provinces, setProvinces] = (0, import_react.useState)([]);
	const [regencies, setRegencies] = (0, import_react.useState)([]);
	const [districts, setDistricts] = (0, import_react.useState)([]);
	const [villages, setVillages] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		if (show) uGlobal.getProvinces().then((res) => {
			if (res && res.data) setProvinces(res.data.map((p) => ({
				value: p.id,
				label: p.name
			})));
		}).catch((err) => console.error("Error loading provinces:", err));
	}, [show]);
	(0, import_react.useEffect)(() => {
		if (provinceId) uGlobal.getRegencies(provinceId).then((res) => {
			if (res && res.data) setRegencies(res.data.map((r) => ({
				value: r.id,
				label: r.name
			})));
		}).catch((err) => console.error("Error loading regencies:", err));
		else setRegencies([]);
	}, [provinceId]);
	(0, import_react.useEffect)(() => {
		if (cityId) uGlobal.getDistricts(cityId).then((res) => {
			if (res && res.data) setDistricts(res.data.map((d) => ({
				value: d.id,
				label: d.name
			})));
		}).catch((err) => console.error("Error loading districts:", err));
		else setDistricts([]);
	}, [cityId]);
	(0, import_react.useEffect)(() => {
		if (districtId) uGlobal.getVillages(districtId).then((res) => {
			if (res && res.data) setVillages(res.data.map((v) => ({
				value: v.id,
				label: v.name
			})));
		}).catch((err) => console.error("Error loading villages:", err));
		else setVillages([]);
	}, [districtId]);
	return {
		provinces,
		regencies,
		districts,
		villages
	};
}
//#endregion
//#region src/pages/anggota/AccountPage/components/EditProfileModal.jsx
function EditProfileModal({ show, onHide, activeTab, setActiveTab, formData, setFormData, errors, isSubmitting, onSubmit, error, userProfile, handleChange }) {
	const { provinces, regencies, districts, villages } = useCascadingRegions(show, formData.province_id, formData.city_id, formData.district_id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal_default, {
		show,
		onHide,
		size: "lg",
		centered: true,
		scrollable: true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal_default.Header, {
				closeButton: true,
				className: "border-bottom pb-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal_default.Title, {
					className: "d-flex align-items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaEdit, { className: "text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "fw-bold",
						children: "Edit Profil & Data Pendaftaran"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditProfileNavTabs, {
				activeTab,
				onTabSelect: setActiveTab
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal_default.Body, {
				className: "p-4",
				children: [error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwalAlert, {
					variant: "danger",
					className: "mb-3",
					children: error
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default, {
					onSubmit,
					id: "editProfileForm",
					children: [
						activeTab === "pribadi" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabPribadiAlamat, {
							formData,
							setFormData,
							errors,
							isSubmitting,
							handleChange,
							userProfile,
							provinces,
							regencies,
							districts,
							villages
						}),
						activeTab === "bank" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabRekeningBank, {
							formData,
							errors,
							isSubmitting,
							handleChange
						}),
						activeTab === "pekerjaan" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabPekerjaan, {
							formData,
							isSubmitting,
							handleChange
						}),
						activeTab === "darurat" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabKontakDarurat, {
							formData,
							isSubmitting,
							handleChange
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditProfileFooter, {
				activeTab,
				setActiveTab,
				onHide,
				isSubmitting
			})
		]
	});
}
//#endregion
//#region src/pages/anggota/AccountPage/components/ChangePasswordModal.jsx
function ChangePasswordModal({ show, onHide, passwordData, passwordErrors, isChangingPassword, handlePasswordInputChange, handlePasswordSubmit }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal_default, {
		show,
		onHide,
		centered: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal_default.Header, {
			closeButton: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal_default.Title, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaKey, { className: "me-2 text-primary" }), "Ubah Password"] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal_default.Body, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default, {
			onSubmit: handlePasswordSubmit,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
					className: "mb-3",
					controlId: "formCurrentPassword",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Label, { children: ["Password Saat Ini ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-danger",
							children: "*"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
							type: "password",
							placeholder: "Masukkan password saat ini",
							name: "currentPassword",
							value: passwordData.currentPassword,
							onChange: handlePasswordInputChange,
							isInvalid: !!passwordErrors.currentPassword,
							disabled: isChangingPassword,
							className: "ap-form-control"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control.Feedback, {
							type: "invalid",
							children: passwordErrors.currentPassword
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
					className: "mb-3",
					controlId: "formNewPassword",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Label, { children: ["Password Baru ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-danger",
							children: "*"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
							type: "password",
							placeholder: "Masukkan password baru (minimal 6 karakter)",
							name: "newPassword",
							value: passwordData.newPassword,
							onChange: handlePasswordInputChange,
							isInvalid: !!passwordErrors.newPassword,
							disabled: isChangingPassword,
							className: "ap-form-control"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control.Feedback, {
							type: "invalid",
							children: passwordErrors.newPassword
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
					className: "mb-4",
					controlId: "formConfirmPassword",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Label, { children: ["Konfirmasi Password Baru ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-danger",
							children: "*"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
							type: "password",
							placeholder: "Masukkan ulang password baru",
							name: "confirmPassword",
							value: passwordData.confirmPassword,
							onChange: handlePasswordInputChange,
							isInvalid: !!passwordErrors.confirmPassword,
							disabled: isChangingPassword,
							className: "ap-form-control"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control.Feedback, {
							type: "invalid",
							children: passwordErrors.confirmPassword
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "d-flex gap-2 justify-content-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline-secondary",
						onClick: onHide,
						disabled: isChangingPassword,
						children: "Batal"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "primary",
						type: "submit",
						disabled: isChangingPassword,
						children: isChangingPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
							as: "span",
							animation: "border",
							size: "sm",
							role: "status",
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ms-2",
							children: "Mengubah..."
						})] }) : "Ubah Password"
					})]
				})
			]
		}) })]
	});
}
//#endregion
//#region src/pages/anggota/AccountPage/AccountPage.jsx
function AccountPage() {
	const navigate = useNavigate();
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)("");
	const [userProfile, setUserProfile] = (0, import_react.useState)(null);
	const [showEditModal, setShowEditModal] = (0, import_react.useState)(false);
	const [activeTab, setActiveTab] = (0, import_react.useState)("pribadi");
	const [formData, setFormData] = (0, import_react.useState)({
		nama: "",
		telepon: "",
		nik_ktp: "",
		alamat: "",
		province_id: "",
		city_id: "",
		district_id: "",
		subdistrict_id: "",
		rt: "",
		rw: "",
		bank_name: "",
		bank_account_no: "",
		account_holder: "",
		occupation: "",
		employer_name: "",
		employer_address: "",
		contact_name: "",
		phone_number_emergency: "",
		relation: ""
	});
	const [errors, setErrors] = (0, import_react.useState)({});
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const [showPasswordModal, setShowPasswordModal] = (0, import_react.useState)(false);
	const [passwordData, setPasswordData] = (0, import_react.useState)({
		currentPassword: "",
		newPassword: "",
		confirmPassword: ""
	});
	const [passwordErrors, setPasswordErrors] = (0, import_react.useState)({});
	const [isChangingPassword, setIsChangingPassword] = (0, import_react.useState)(false);
	const syncProfileToFormData = (0, import_react.useCallback)((profile) => {
		if (!profile) return;
		setFormData({
			nama: profile.nama || "",
			telepon: profile.telepon || "",
			nik_ktp: profile.nik_ktp || "",
			alamat: profile.alamat || "",
			province_id: profile.province_id || "",
			city_id: profile.city_id || "",
			district_id: profile.district_id || "",
			subdistrict_id: profile.subdistrict_id || "",
			rt: profile.rt || "",
			rw: profile.rw || "",
			bank_name: profile.bank_name && profile.bank_name !== "-" ? profile.bank_name : "",
			bank_account_no: profile.bank_account_no && profile.bank_account_no !== "-" ? profile.bank_account_no : "",
			account_holder: profile.account_holder && profile.account_holder !== "-" ? profile.account_holder : "",
			occupation: profile.occupation || "",
			employer_name: profile.employer_name || "",
			employer_address: profile.employer_address || "",
			contact_name: profile.contact_name || "",
			phone_number_emergency: profile.phone_number_emergency || "",
			relation: profile.relation || ""
		});
	}, []);
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
	const loadProfileData = async () => {
		try {
			setLoading(true);
			setError("");
			const response = await profileService.getProfile();
			if (response.success) {
				const profileData = profileService.mapBackendToFrontend(response.data);
				setUserProfile(profileData);
				syncProfileToFormData(profileData);
			} else setError(response.message || "Gagal memuat data profil");
		} catch (err) {
			console.error("Error loading profile:", err);
			setError(err.message || "Terjadi kesalahan saat memuat data profil");
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		loadProfileData();
	}, []);
	(0, import_react.useEffect)(() => {
		const socket = getSocket();
		if (socket) {
			const handleProfileUpdate = (data) => {
				const updatedProfile = profileService.mapBackendToFrontend(data);
				setUserProfile(updatedProfile);
				syncProfileToFormData(updatedProfile);
			};
			socket.on("profile:update", handleProfileUpdate);
			return () => socket.off("profile:update", handleProfileUpdate);
		}
	}, [syncProfileToFormData]);
	const validateForm = (0, import_react.useCallback)(() => {
		const newErrors = {};
		if (!formData.nama.trim()) newErrors.nama = "Nama lengkap wajib diisi";
		if (!formData.telepon.trim()) newErrors.telepon = "Nomor telepon wajib diisi";
		if (!formData.alamat.trim()) newErrors.alamat = "Alamat wajib diisi";
		if (formData.bank_account_no && !formData.bank_name) newErrors.bank_name = "Nama bank wajib diisi jika nomor rekening diisi";
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}, [formData]);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value
		}));
		if (errors[name]) setErrors((prev) => ({
			...prev,
			[name]: ""
		}));
	};
	const handleOpenEditModal = (tab = "pribadi") => {
		setActiveTab(tab);
		syncProfileToFormData(userProfile);
		setErrors({});
		setShowEditModal(true);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) return;
		try {
			setIsSubmitting(true);
			const backendData = profileService.mapFrontendToBackend(formData);
			const response = await profileService.updateProfile(backendData);
			if (response.success) {
				const updatedProfile = profileService.mapBackendToFrontend(response.data);
				setUserProfile(updatedProfile);
				syncProfileToFormData(updatedProfile);
				setErrors({});
				setShowEditModal(false);
				showNotification("Profil berhasil diperbarui!", "success");
			} else showNotification(response.message || "Gagal memperbarui profil", "danger");
		} catch (err) {
			console.error("Error updating profile:", err);
			showNotification(err.message || "Terjadi kesalahan saat memperbarui profil", "danger");
		} finally {
			setIsSubmitting(false);
		}
	};
	const validatePasswordForm = (0, import_react.useCallback)(() => {
		const newErrors = {};
		if (!passwordData.currentPassword.trim()) newErrors.currentPassword = "Password saat ini wajib diisi";
		if (!passwordData.newPassword.trim()) newErrors.newPassword = "Password baru wajib diisi";
		else if (passwordData.newPassword.length < 6) newErrors.newPassword = "Password baru minimal 6 karakter";
		if (!passwordData.confirmPassword.trim()) newErrors.confirmPassword = "Konfirmasi password wajib diisi";
		else if (passwordData.newPassword !== passwordData.confirmPassword) newErrors.confirmPassword = "Password baru tidak cocok";
		setPasswordErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}, [passwordData]);
	const handlePasswordInputChange = (e) => {
		const { name, value } = e.target;
		setPasswordData((prev) => ({
			...prev,
			[name]: value
		}));
		if (passwordErrors[name]) setPasswordErrors((prev) => ({
			...prev,
			[name]: ""
		}));
	};
	const handlePasswordSubmit = async (e) => {
		e.preventDefault();
		if (!validatePasswordForm()) return;
		try {
			setIsChangingPassword(true);
			await new Promise((resolve) => setTimeout(resolve, 1e3));
			setPasswordData({
				currentPassword: "",
				newPassword: "",
				confirmPassword: ""
			});
			setPasswordErrors({});
			setShowPasswordModal(false);
			showNotification("Password berhasil diubah!", "success");
		} catch (err) {
			console.error("Error changing password:", err);
			showNotification("Gagal mengubah password. Silakan coba lagi.", "danger");
		} finally {
			setIsChangingPassword(false);
		}
	};
	const handleTerminateKeanggotaan = async () => {
		navigate(`/${jwtEncode({ page: "resignationCheck" })}`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "ap-container py-3 dash-fade-in",
		children: [
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileSkeleton, {}) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SwalAlert, {
				variant: "danger",
				className: "m-3 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwalAlert.Heading, { children: "Error Memuat Data" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: error }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline-danger",
						onClick: loadProfileData,
						children: "Coba Lagi"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileHeaderCard, {
					userProfile,
					onEditPhoto: () => showNotification("Fitur mengubah foto profil akan segera hadir!", "info")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileInfoCards, {
					userProfile,
					onOpenEditModal: handleOpenEditModal
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SecurityAndActivitySection, {
					userProfile,
					onOpenPasswordModal: () => setShowPasswordModal(true),
					onTerminateKeanggotaan: handleTerminateKeanggotaan,
					onShowNotification: showNotification
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditProfileModal, {
				show: showEditModal,
				onHide: () => setShowEditModal(false),
				activeTab,
				setActiveTab,
				formData,
				setFormData,
				errors,
				isSubmitting,
				onSubmit: handleSubmit,
				error,
				userProfile,
				handleChange
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChangePasswordModal, {
				show: showPasswordModal,
				onHide: () => setShowPasswordModal(false),
				passwordData,
				passwordErrors,
				isChangingPassword,
				handlePasswordInputChange,
				handlePasswordSubmit
			})
		]
	});
}
//#endregion
export { AccountPage as default };
