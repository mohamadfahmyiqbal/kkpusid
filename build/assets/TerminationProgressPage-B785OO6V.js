import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { E as Button, O as Alert_default, S as Card_default, c as Spinner, l as Row, x as Col, zt as FaCheckCircle } from "./vendor-react-D5pUDmay.js";
import { n as useProfile } from "./ProfileContext-DQCnAT09.js";
import "./index-BaUN0sjk.js";
import { t as apiClient } from "./api-BfASpAPH.js";
//#region src/pages/global/termination/TerminationProgressPage.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TerminationProgressPage = () => {
	const { fetchUserProfile } = useProfile();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [fetching, setFetching] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)("");
	const [termination, setTermination] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const fetchStatus = async () => {
			try {
				setFetching(true);
				const res = await apiClient.get("/anggota/berhenti-keanggotaan/status");
				if (res.data?.data) setTermination(res.data.data);
			} catch (err) {
				console.error("Gagal memuat status pengajuan", err);
			} finally {
				setFetching(false);
			}
		};
		fetchStatus();
	}, []);
	if (fetching) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container mt-5 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
			animation: "border",
			variant: "primary"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
			className: "mt-3",
			children: "Memuat detail pengajuan..."
		})]
	});
	if (!termination) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container mt-5 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Anda tidak memiliki pengajuan berhenti keanggotaan yang aktif." })
	});
	const handleConfirm = async () => {
		setLoading(true);
		setError("");
		try {
			await apiClient.post("/anggota/berhenti-keanggotaan/konfirmasi");
			await fetchUserProfile();
		} catch (err) {
			setError(err.response?.data?.message || "Gagal melakukan konfirmasi");
		} finally {
			setLoading(false);
		}
	};
	const isWaitingConfirmation = termination.status === "WAITING_CONFIRMATION";
	const submitDate = termination.submitted_at || termination.createdAt || termination.created_at;
	const approvals = termination.approvals || [];
	const pengawasDone = approvals.some((a) => a.step?.verifierRole?.role_name === "PENGAWAS" && a.status === "APPROVED");
	const ketuaDone = approvals.some((a) => a.step?.verifierRole?.role_name === "KETUA" && a.status === "APPROVED");
	const bendaharaDone = approvals.some((a) => a.step?.verifierRole?.role_name === "BENDAHARA" && a.status === "APPROVED");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container mt-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default, {
			className: "shadow-sm border-0 rounded-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
				className: "p-4 p-md-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mb-4 text-center fw-bold",
						children: "Proses Pengunduran Diri Anggota"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "alert alert-info border-info border-opacity-25 bg-info bg-opacity-10 mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h5", {
							className: "alert-heading text-info-emphasis",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "fa fa-info-circle me-2" }), "Akun Dalam Proses Penutupan"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-0 text-info-emphasis",
							children: "Selama proses pengunduran diri berjalan, Anda tidak dapat mengakses menu aplikasi lainnya."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-5 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h5", {
							className: "fw-bold mb-2",
							children: ["Status Pengajuan: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "badge bg-primary px-3 py-2 ms-2",
								children: termination.status
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-muted",
							children: ["Diajukan pada: ", submitDate ? new Date(submitDate).toLocaleDateString("id-ID", {
								day: "numeric",
								month: "long",
								year: "numeric"
							}) : "-"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
						className: "text-uppercase text-muted fw-bold ls-1 mb-3 text-center",
						children: "Status Persetujuan Pengurus"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						className: "mb-5 gy-3 justify-content-center",
						children: [
							{
								role: "Pengawas",
								done: pengawasDone
							},
							{
								role: "Ketua",
								done: ketuaDone
							},
							{
								role: "Bendahara",
								done: bendaharaDone
							}
						].map((step, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
							xs: 4,
							md: 3,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `p-3 rounded-4 text-center h-100 d-flex flex-column justify-content-center align-items-center ${step.done ? "bg-success bg-opacity-10 border border-success border-opacity-25" : "bg-light border"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `mb-2 ${step.done ? "text-success" : "text-muted"}`,
										children: step.done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheckCircle, { size: 28 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "spinner-grow spinner-grow-sm",
											role: "status",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "visually-hidden",
												children: "Loading..."
											})
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
										className: "d-block fw-bold text-dark mb-1",
										children: step.role
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
										className: `fw-medium ${step.done ? "text-success" : "text-muted"}`,
										children: step.done ? "Disetujui" : "Menunggu"
									})
								]
							})
						}, idx))
					}),
					isWaitingConfirmation && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border border-success border-opacity-25 p-4 rounded-4 bg-success bg-opacity-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h5", {
								className: "text-success mb-3 fw-bold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "fa fa-check-circle me-2" }), "Dana Hak Anggota Telah Ditransfer"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-success-emphasis",
								children: "Bendahara telah memproses pengembalian hak Anda. Silakan periksa rekening Anda dan konfirmasi jika dana sudah diterima."
							}),
							termination.payment_proof_path && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: `https://api.kkpus.id/api/${termination.payment_proof_path.startsWith("/") ? termination.payment_proof_path.slice(1) : termination.payment_proof_path.startsWith("uploads/") ? termination.payment_proof_path.replace(/^uploads\//, "uploads/") : termination.payment_proof_path}`,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "btn btn-outline-success",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "fa fa-file-image-o me-2" }), "Lihat Bukti Transfer"]
								})
							}),
							error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert_default, {
								variant: "danger",
								children: error
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "success",
								onClick: handleConfirm,
								disabled: loading,
								className: "w-100 fw-bold py-3 mt-2 rounded-pill shadow-sm",
								children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
									animation: "border",
									size: "sm"
								}) : "Konfirmasi Dana Diterima & Nonaktifkan Akun Saya"
							})
						]
					}),
					!isWaitingConfirmation && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center p-4 bg-light rounded-4 border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
								animation: "border",
								variant: "primary",
								className: "mb-3"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
								className: "fw-bold",
								children: "Menunggu Proses Persetujuan..."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted mb-0",
								children: "Pengajuan Anda sedang diperiksa secara berurutan oleh Pengawas, Ketua, dan Bendahara."
							})
						]
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        .ls-1 { letter-spacing: 1px; }
      ` })]
	});
};
//#endregion
export { TerminationProgressPage as default };
