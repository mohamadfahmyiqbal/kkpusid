import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { $t as FaDownload, D as Badge, Dt as FaBookOpen, E as Button, Jn as FaRegFilePdf, Pr as useNavigate, S as Card_default, Wn as FaQuestionCircle, a as Tabs, b as Container, bt as FaArrowLeft, c as Spinner, en as FaEdit, g as Form_default, l as Row, ln as FaFileAlt, m as ListGroup_default, qt as FaClock, s as Tab_default, x as Col, zt as FaCheckCircle } from "./vendor-react-D5pUDmay.js";
import { o as jwtDecodePage, s as jwtEncode } from "./index-BaUN0sjk.js";
import { t as SwalAlert } from "./SwalAlert-C3kBxD_o.js";
import { t as TrainingService } from "./training.service-Bgth343V.js";
//#region src/pages/training/DetailMateri/DetailMateri.css
var import_react = /* @__PURE__ */ __toESM(require_react());
//#endregion
//#region src/pages/training/DetailMateri/DetailMateri.jsx
var import_jsx_runtime = require_jsx_runtime();
var DetailMateri = () => {
	const navigate = useNavigate();
	const [materiData, setMateriData] = (0, import_react.useState)(null);
	const [activeTab, setActiveTab] = (0, import_react.useState)("materi");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const [savingNotes, setSavingNotes] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const pathParts = window.location.pathname.split("/");
		const lastPart = pathParts[pathParts.length - 1];
		try {
			const decoded = jwtDecodePage(lastPart);
			const kurikulumId = decoded?.kurikulumId;
			const type = decoded?.type;
			const fetchMateriData = async () => {
				try {
					setLoading(true);
					const response = await TrainingService.getMaterials(kurikulumId);
					if (response.status) {
						const materials = response.data;
						setMateriData({
							id: kurikulumId,
							title: materials[0]?.curriculum?.curriculum_name || "Materi Training",
							type: type || "WAJIB",
							description: materials[0]?.curriculum?.description || "Pelajari materi ini untuk meningkatkan pengetahuan Anda.",
							duration: "-",
							modules: materials.map((m) => ({
								id: m.material_id,
								title: m.material_title,
								duration: m.duration || "15 menit",
								documentUrl: m.content_url,
								completed: m.evaluations?.length > 0 && m.evaluations[0].passed,
								quizCompleted: m.evaluations?.length > 0 && m.evaluations[0].passed
							})),
							progress: 0
						});
						const passedCount = materials.filter((m) => m.evaluations?.length > 0 && m.evaluations[0].passed).length;
						const progress = materials.length > 0 ? Math.round(passedCount / materials.length * 100) : 0;
						setMateriData((prev) => ({
							...prev,
							progress
						}));
						if (materials.length > 0 && materials[0].notes?.length > 0) setNotes(materials[0].notes[0].note_content);
					}
				} catch (err) {
					setError("Gagal memuat detail materi");
				} finally {
					setLoading(false);
				}
			};
			fetchMateriData();
		} catch (e) {
			console.error("Error decoding URL:", e);
			setError("URL tidak valid");
			setLoading(false);
		}
	}, []);
	const handleSaveNotes = async () => {
		if (!notes.trim() || !materiData) return;
		setSavingNotes(true);
		try {
			const materialId = materiData.modules?.[0]?.id;
			if (materialId) {
				await TrainingService.saveNote(materialId, notes);
				setMateriData((prev) => ({
					...prev,
					savedNotes: notes
				}));
			}
		} catch (err) {
			setError("Gagal menyimpan catatan");
		} finally {
			setSavingNotes(false);
		}
	};
	const handleDownload = (0, import_react.useCallback)((url, filename) => {}, []);
	const handleReadMateri = (0, import_react.useCallback)((modulId) => {
		navigate(`/${jwtEncode({
			page: "bacaMateri",
			kurikulumId: materiData?.id,
			modulId,
			type: materiData?.type
		})}`);
	}, [navigate, materiData]);
	const handleStartQuizMateri = (0, import_react.useCallback)((modulId) => {
		console.log("Start quiz for module:", modulId);
	}, []);
	const handleStartEvaluasi = (0, import_react.useCallback)(() => {
		navigate(`/${jwtEncode({
			page: "evaluasi",
			kurikulumId: materiData?.id,
			type: materiData?.type
		})}`);
	}, [navigate, materiData]);
	const handleBack = (0, import_react.useCallback)(() => {
		navigate(`/${jwtEncode({ page: "trainingDashboard" })}`);
	}, [navigate]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "d-flex flex-column justify-content-center align-items-center vh-100 bg-white",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
			animation: "border",
			variant: "primary",
			size: "lg"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-muted fw-medium",
			children: "Menyiapkan materi belajar..."
		})]
	});
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		className: "mt-5 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SwalAlert, {
			variant: "danger",
			className: "rounded-4 shadow-sm border-0 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
				className: "fw-bold mb-3",
				children: error
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "danger",
				className: "rounded-pill px-4",
				onClick: handleBack,
				children: "Kembali ke Dashboard"
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "detail-materi-container pb-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
			fluid: true,
			className: "mt-4 px-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				className: "mx-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
					xs: 12,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default, {
						className: "shadow-sm border-0 rounded-4 overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
							className: "p-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
								activeKey: activeTab,
								onSelect: (k) => setActiveTab(k),
								className: "custom-detail-tabs nav-pills p-4 bg-light bg-opacity-50 border-bottom",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tab_default, {
										eventKey: "materi",
										title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "d-flex align-items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaBookOpen, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Materi Belajar" })]
										}),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-4 p-md-5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "d-flex justify-content-between align-items-center mb-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
													className: "fw-bold mb-0",
													children: "Modul Pembelajaran"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
													bg: "info",
													className: "bg-opacity-10 text-info px-3 py-2 rounded-pill",
													children: [materiData.modules.length, " Modul Tersedia"]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListGroup_default, {
												variant: "flush",
												className: "border-0",
												children: materiData.modules.map((modul) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListGroup_default.Item, {
													className: `module-list-item d-flex align-items-center gap-3 ${modul.completed ? "completed" : ""}`,
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: `module-icon-box ${modul.completed ? "bg-success bg-opacity-10 text-success" : "bg-primary bg-opacity-10 text-primary"}`,
															children: modul.completed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheckCircle, { size: 20 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaBookOpen, { size: 20 })
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex-grow-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
																className: `fw-bold mb-1 ${modul.completed ? "text-success" : "text-dark"}`,
																children: modul.title
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", {
																className: "text-muted d-flex align-items-center gap-2",
																children: [
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaClock, { size: 12 }),
																	" ",
																	modul.duration
																]
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "d-flex gap-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
																variant: modul.completed ? "outline-success" : "primary",
																size: "sm",
																className: "rounded-pill px-4 fw-bold",
																onClick: () => handleReadMateri(modul.id),
																children: modul.completed ? "Baca Lagi" : "Baca Materi"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
																variant: modul.quizCompleted ? "success" : "outline-warning",
																size: "sm",
																className: "rounded-pill px-3 fw-bold d-flex align-items-center gap-2",
																onClick: () => handleStartQuizMateri(modul.id),
																disabled: !modul.completed && !modul.quizCompleted,
																children: [
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaQuestionCircle, {}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Quiz" }),
																	modul.quizCompleted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheckCircle, { size: 12 })
																]
															})]
														})
													]
												}, modul.id))
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tab_default, {
										eventKey: "dokumen",
										title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "d-flex align-items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaFileAlt, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Dokumen Materi" })]
										}),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-4 p-md-5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
												className: "fw-bold mb-4",
												children: "Materi Pendukung (.PDF)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListGroup_default, {
												variant: "flush",
												children: materiData.modules.map((modul) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListGroup_default.Item, {
													className: "module-list-item d-flex align-items-center gap-3",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "module-icon-box bg-danger bg-opacity-10 text-danger",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaRegFilePdf, { size: 22 })
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex-grow-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
																className: "fw-bold mb-0",
																children: modul.title
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
																className: "text-muted",
																children: "PDF Document"
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
															variant: "outline-danger",
															size: "sm",
															className: "rounded-pill px-3",
															onClick: () => handleDownload(modul.documentUrl, modul.title),
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaDownload, {
																size: 14,
																className: "me-1"
															}), " Download"]
														})
													]
												}, modul.id))
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tab_default, {
										eventKey: "catatan",
										title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "d-flex align-items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaEdit, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Catatan Saya" })]
										}),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-4 p-md-5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "d-flex justify-content-between align-items-center mb-4",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
														className: "fw-bold mb-0",
														children: "Catatan Pembelajaran"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
														className: "text-muted",
														children: "Otomatis tersimpan sebagai draft"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Group, {
													className: "mb-4",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
														as: "textarea",
														className: "notes-textarea",
														rows: 8,
														value: notes,
														onChange: (e) => setNotes(e.target.value),
														placeholder: "Tulis hal-hal penting yang Anda pelajari hari ini..."
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-end",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														variant: "primary",
														className: "px-5 py-2 fw-bold rounded-pill shadow-sm",
														onClick: handleSaveNotes,
														disabled: savingNotes,
														children: savingNotes ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
															animation: "border",
															size: "sm",
															className: "me-2"
														}), "Menyimpan..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Simpan Catatan" })
													})
												})
											]
										})
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 bg-light border-top d-flex flex-column flex-md-row justify-content-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "link",
									className: "btn-back-elegant text-decoration-none d-flex align-items-center justify-content-center gap-2",
									onClick: handleBack,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaArrowLeft, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Kembali ke Dashboard" })]
								}), materiData.progress >= 80 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "success",
									className: "px-5 py-2 fw-black rounded-pill shadow-md border-0",
									onClick: handleStartEvaluasi,
									style: { background: "linear-gradient(135deg, #10b981 0%, #059669 100%)" },
									children: "AMBIL EVALUASI SEKARANG"
								})]
							})]
						})
					})
				})
			})
		})
	});
};
//#endregion
export { DetailMateri as default };
