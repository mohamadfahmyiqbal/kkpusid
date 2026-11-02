import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { Cn as FaIdCard, E as Button, Nn as FaMapMarkerAlt, Pr as useNavigate, S as Card_default, bt as FaArrowLeft, dn as FaFileInvoiceDollar, hr as FaUser, l as Row, x as Col, zt as FaCheckCircle } from "./vendor-react-D5pUDmay.js";
import { s as jwtEncode } from "./index-BaUN0sjk.js";
import { t as usePaymentHandler } from "./usePaymentHandler-Dlr6p1nx.js";
import { t as ApprovalPlaceholder } from "./ApprovalPlaceholder-BRIHhb7u.js";
import { t as useSocketListener } from "./SocketListener-C630ms4G.js";
//#region src/pages/anggota/RegistrationSummary/hooks/useApprovalStatus.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var useApprovalStatus = (is_approved_pengawas, is_approved_ketua, bill_id, current_step_id, final_status) => {
	return (0, import_react.useMemo)(() => {
		const status = final_status?.toUpperCase() || "";
		const isRejected = status === "REJECTED" || status === "DITOLAK";
		const pengawasDone = is_approved_pengawas == true || status === "APPROVED" || status === "WAITING_PAYMENT";
		const ketuaDone = is_approved_ketua == true || status === "APPROVED" || status === "WAITING_PAYMENT";
		const readyForInvoice = pengawasDone && ketuaDone && !isRejected || status === "APPROVED" || status === "WAITING_PAYMENT";
		let pengawasRejected = false;
		let ketuaRejected = false;
		if (isRejected) if (!pengawasDone) pengawasRejected = true;
		else ketuaRejected = true;
		return {
			pengawasDone,
			ketuaDone,
			pengawasRejected,
			ketuaRejected,
			isRejected,
			readyForInvoice
		};
	}, [
		is_approved_pengawas,
		is_approved_ketua,
		current_step_id,
		final_status
	]);
};
//#endregion
//#region src/pages/anggota/RegistrationSummary/hooks/useRegistrationSocket.js
var useRegistrationSocket = (registration_id, setData) => {
	useSocketListener((0, import_react.useCallback)((payload) => {
		if (String(payload.entityId).toLowerCase() === String(registration_id).toLowerCase() && (payload.entityRef === "member_registration" || payload.entityRef === "members")) setData((prev) => {
			return {
				...prev,
				final_status: payload.status || prev.final_status,
				is_approved_pengawas: payload.is_approved_pengawas !== void 0 ? payload.is_approved_pengawas : prev.is_approved_pengawas,
				is_approved_ketua: payload.is_approved_ketua !== void 0 ? payload.is_approved_ketua : prev.is_approved_ketua,
				bill_id: payload.billId || payload.bill_id || prev.bill_id,
				current_step_id: payload.current_step_id || prev.current_step_id,
				member: {
					...prev.member,
					status: payload.status ? {
						...prev.member?.status,
						status_name: payload.status === "APPROVED" ? "APPROVED" : prev.member?.status?.status_name
					} : prev.member?.status
				},
				approvals: payload.approval_step_id ? [...(prev.approvals || []).filter((a) => a.approval_step_id !== payload.approval_step_id), {
					approval_step_id: payload.approval_step_id,
					note: payload.note,
					step: {
						step_order: payload.step_order,
						verifierRole: { role_name: payload.role_name }
					}
				}] : prev.approvals
			};
		});
	}, [registration_id, setData]));
};
//#endregion
//#region src/pages/anggota/RegistrationSummary/pages/RegistrationSummary.jsx
var import_jsx_runtime = require_jsx_runtime();
function RegistrationSummary({ data: initialData, onBackToDashboard, baseUrl }) {
	const navigate = useNavigate();
	const [data, setData] = (0, import_react.useState)(initialData);
	const { paymentSuccess, paymentData } = usePaymentHandler();
	(0, import_react.useEffect)(() => {
		setData(initialData);
	}, [initialData]);
	/**
	* SOCKET LISTENER
	*/
	useRegistrationSocket(data?.registration_id, setData);
	const getImgSrc = (img) => {
		if (!img) return "";
		if (img.startsWith("http") || img.startsWith("data:")) return img;
		return `${baseUrl ? baseUrl.replace(/\/$/, "") : ""}${img.startsWith("/") ? img : `/${img}`}`;
	};
	const { registration_id, bill_id, full_name, nik_ktp, address_ktp, foto_ktp, foto_swafoto, ktp_photo_path, selfie_photo_path, final_status, is_approved_pengawas, is_approved_ketua, current_step_id, member } = data || {};
	/**
	* LOGIKA STEPPER SIKRON (FIXED)
	*/
	const approvalStatus = useApprovalStatus(is_approved_pengawas, is_approved_ketua, bill_id, current_step_id, final_status);
	const handleNavigateToInvoice = (0, import_react.useCallback)(() => {
		navigate(`/${jwtEncode({
			page: "billingPage",
			registration_id,
			billId: bill_id,
			category: "MEMBER_REGISTRATION",
			filter: { registration_id },
			displayName: "Pendaftaran Anggota",
			return: "registrationPage",
			bankInfo: approvalStatus.ketuaDone ? {
				bank_name: data?.bank_name,
				bank_account_no: data?.bank_account_no,
				account_holder: data?.account_holder
			} : null
		})}`);
	}, [
		navigate,
		registration_id,
		bill_id
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-fluid py-4 bg-light min-vh-100",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "d-flex align-items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "icon-box bg-soft-primary text-primary me-3 d-flex align-items-center justify-content-center",
						style: {
							width: "48px",
							height: "48px",
							borderRadius: "12px"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaIdCard, { size: 20 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "fw-bold mb-0 text-dark",
						style: { fontSize: "18px" },
						children: "Detail Pendaftaran"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
						className: "text-muted",
						children: "Berikut adalah detail permohonan keanggotaan Anda."
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline-secondary",
					className: "px-4 py-2 rounded-12 fw-bold text-muted border-light bg-white shadow-sm d-flex align-items-center",
					onClick: onBackToDashboard,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaArrowLeft, {
						className: "me-2",
						size: 12
					}), " Kembali"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default, {
				className: "border-0 shadow-sm rounded-20 p-3 p-md-4 mb-3 mb-md-4",
				style: { borderColor: "#f1f5f9" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
					className: "align-items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
						md: 2,
						className: "text-center text-md-start mb-3 mb-md-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto mx-md-0 rounded-circle bg-soft-primary text-primary d-flex align-items-center justify-content-center",
							style: {
								width: "80px",
								height: "80px"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUser, { size: 36 })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
						md: 10,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "d-flex flex-column gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
									className: "border-bottom border-light pb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
										xs: 4,
										md: 3,
										className: "text-muted fw-medium small",
										children: "Nama"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
										xs: 8,
										md: 9,
										className: "fw-bold text-dark text-start",
										children: full_name || "-"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
									className: "border-bottom border-light pb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
										xs: 4,
										md: 3,
										className: "text-muted fw-medium small",
										children: "Nomor Identitas (NIK)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
										xs: 8,
										md: 9,
										className: "fw-bold text-dark text-start",
										children: nik_ktp || "-"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
									className: "pb-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
										xs: 4,
										md: 3,
										className: "text-muted fw-medium small",
										children: "Status Anggota"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
										xs: 8,
										md: 9,
										className: "text-start",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill fw-bold",
											style: { fontSize: "11px" },
											children: member?.status?.status_name || "Calon Anggota"
										})
									})]
								})
							]
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default, {
				className: "border-0 shadow-sm rounded-20 p-3 p-md-4 mb-3 mb-md-4",
				style: { borderColor: "#f1f5f9" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "d-flex align-items-center border-bottom pb-3 mb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "bg-soft-primary text-primary rounded-8 p-2 me-2 d-inline-flex align-items-center justify-content-center",
						style: {
							width: "32px",
							height: "32px"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaIdCard, { size: 14 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
						className: "fw-bold mb-0 text-dark",
						style: { fontSize: "14px" },
						children: "Verifikasi Dokumen"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
					className: "g-3 mt-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
						md: 6,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center p-3 border rounded-12 bg-light shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "small fw-bold text-muted mb-2",
								children: "Foto KTP"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: getImgSrc(foto_ktp || ktp_photo_path),
								className: "img-fluid rounded border shadow-sm",
								alt: "KTP",
								style: {
									maxHeight: "200px",
									objectFit: "contain",
									width: "100%",
									backgroundColor: "#fff"
								},
								onError: (e) => {
									e.target.onerror = null;
									e.target.src = "https://placehold.co/400x300?text=Gambar+Tidak+Ditemukan";
								}
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
						md: 6,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center p-3 border rounded-12 bg-light shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "small fw-bold text-muted mb-2",
								children: "Swafoto"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: getImgSrc(foto_swafoto || selfie_photo_path),
								className: "img-fluid rounded border shadow-sm",
								alt: "Selfie",
								style: {
									maxHeight: "200px",
									objectFit: "contain",
									width: "100%",
									backgroundColor: "#fff"
								},
								onError: (e) => {
									e.target.onerror = null;
									e.target.src = "https://placehold.co/400x300?text=Gambar+Tidak+Ditemukan";
								}
							})]
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default, {
				className: "border-0 shadow-sm rounded-20 p-3 p-md-4 mb-3 mb-md-4",
				style: { borderColor: "#f1f5f9" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "d-flex align-items-center border-bottom pb-3 mb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "bg-soft-primary text-primary rounded-8 p-2 me-2 d-inline-flex align-items-center justify-content-center",
						style: {
							width: "32px",
							height: "32px"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaMapMarkerAlt, { size: 14 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
						className: "fw-bold mb-0 text-dark",
						style: { fontSize: "14px" },
						children: "Detail Domisili (Sesuai KTP)"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "d-flex flex-column gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
							className: "border-bottom border-light pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
								xs: 4,
								md: 3,
								className: "text-muted fw-medium small",
								children: "Provinsi"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
								xs: 8,
								md: 9,
								className: "fw-semibold text-dark text-start",
								children: data?.provinsi || "-"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
							className: "border-bottom border-light pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
								xs: 4,
								md: 3,
								className: "text-muted fw-medium small",
								children: "Kota / Kabupaten"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
								xs: 8,
								md: 9,
								className: "fw-semibold text-dark text-start",
								children: data?.kota_kab || "-"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
							className: "border-bottom border-light pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
								xs: 4,
								md: 3,
								className: "text-muted fw-medium small",
								children: "Kecamatan"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
								xs: 8,
								md: 9,
								className: "fw-semibold text-dark text-start",
								children: data?.kecamatan || "-"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
							className: "border-bottom border-light pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
								xs: 4,
								md: 3,
								className: "text-muted fw-medium small",
								children: "Kelurahan"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
								xs: 8,
								md: 9,
								className: "fw-semibold text-dark text-start",
								children: data?.kelurahan || "-"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
							className: "border-bottom border-light pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
								xs: 4,
								md: 3,
								className: "text-muted fw-medium small",
								children: "RT / RW"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
								xs: 8,
								md: 9,
								className: "fw-semibold text-dark text-start",
								children: [
									"RT.",
									data?.rt || "00",
									" / RW.",
									data?.rw || "00"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
							className: "pb-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
								xs: 4,
								md: 3,
								className: "text-muted fw-medium small",
								children: "Alamat Lengkap"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
								xs: 8,
								md: 9,
								className: "fw-semibold text-dark text-start",
								children: address_ktp || "-"
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default, {
				className: "border-0 shadow-sm rounded-20 p-3 p-md-4 mb-3 mb-md-4",
				style: { borderColor: "#f1f5f9" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "d-flex align-items-center border-bottom pb-3 mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "bg-soft-primary text-primary rounded-8 p-2 me-2 d-inline-flex align-items-center justify-content-center",
							style: {
								width: "32px",
								height: "32px"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheckCircle, { size: 14 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
							className: "fw-bold mb-0 text-dark",
							style: { fontSize: "14px" },
							children: "Status Persetujuan"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "position-relative py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "position-absolute top-50 start-50 translate-middle-y bg-light",
							style: {
								height: "2px",
								zIndex: 1,
								left: "25%",
								right: "25%"
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
							className: "position-relative justify-content-center",
							style: { zIndex: 2 },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
								xs: 5,
								md: 4,
								className: "text-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApprovalPlaceholder, {
									role: "Pengawas",
									isApproved: approvalStatus.pengawasDone,
									isRejected: approvalStatus.pengawasRejected,
									note: data?.approvals?.find((a) => a.step?.verifierRole?.role_name === "Pengawas" || a.step?.step_order === 1)?.note || data?.approvals?.find((a) => data?.flow?.steps?.find((s) => s.approval_step_id === a.approval_step_id && s.step_order === 1))?.note
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
								xs: 5,
								md: 4,
								className: "text-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApprovalPlaceholder, {
									role: "Ketua",
									isApproved: approvalStatus.ketuaDone,
									isRejected: approvalStatus.ketuaRejected,
									note: data?.approvals?.find((a) => a.step?.verifierRole?.role_name === "Ketua" || a.step?.step_order === 2)?.note || data?.approvals?.find((a) => data?.flow?.steps?.find((s) => s.approval_step_id === a.approval_step_id && s.step_order === 2))?.note
								})
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-center mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-2 rounded-pill bg-light d-inline-block px-4 border border-light shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "small fw-bold text-muted",
								children: "POSISI BERKAS: "
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "small fw-bold text-primary",
								children: final_status === "APPROVED" || final_status === "DISETUJUI" ? bill_id ? "MENUNGGU PEMBAYARAN" : "APPROVED" : approvalStatus.isRejected ? "DITOLAK" : approvalStatus.pengawasDone && !approvalStatus.ketuaDone ? "DI APPROVAL KETUA" : !approvalStatus.pengawasDone ? "DI VERIFIKASI PENGAWAS" : final_status?.toUpperCase() || "MENUNGGU ANTRIAN"
							})]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 d-grid gap-2",
				children: [approvalStatus.readyForInvoice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "success",
					className: "w-100 fw-bold py-3 shadow-sm border-0 rounded-12 btn-gradient-success",
					onClick: handleNavigateToInvoice,
					style: {
						fontSize: "15px",
						letterSpacing: "0.5px"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaFileInvoiceDollar, { className: "me-2" }), " BAYAR SIMPANAN SEKARANG"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "link",
					className: "w-100 text-decoration-none text-secondary fw-bold mt-2",
					onClick: onBackToDashboard,
					children: "Kembali ke Dashboard"
				})]
			})
		]
	});
}
//#endregion
export { RegistrationSummary as default };
