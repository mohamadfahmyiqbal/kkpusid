import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { Dn as FaLayerGroup, Er as FaUsers, Fn as FaMoneyBillWave, Kt as FaClipboardList, Mt as FaCalendarAlt, Pr as useNavigate, Rt as FaCheck, an as FaExclamationTriangle, b as Container, c as Spinner, g as Form_default, l as Row, wn as FaInfoCircle, x as Col } from "./vendor-react-D5pUDmay.js";
import { n as AnimatePresence, t as motion } from "./vendor-framer-fx3iiH1e.js";
import { n as useProfile } from "./ProfileContext-DQCnAT09.js";
import { s as jwtEncode } from "./index-BaUN0sjk.js";
import { t as Button } from "./Button-DpYzkz3l.js";
import { t as SwalAlert } from "./SwalAlert-C3kBxD_o.js";
import { t as Card } from "./Card-DeCk4TVr.js";
import { n as getApiUrl, t as buildSummaryData } from "./arisanHelpers-Dxoh5B_0.js";
//#region src/pages/program/arisan/components/FormInputField.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FormInputField = import_react.memo(({ label, value, name, type = "text", readOnly = false, onChange, placeholder = "", error = "", required = false, icon: Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
	className: "mb-4 custom-input-group",
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Label, {
			className: "form-label d-flex align-items-center",
			children: [
				Icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					className: "me-2 text-teal",
					size: 14
				}),
				label,
				required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-danger ms-1",
					children: "*"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
			type,
			name,
			value,
			placeholder,
			readOnly,
			onChange,
			className: `custom-flat-input ${error ? "border-danger error-shake" : ""}`,
			isInvalid: !!error
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: {
				opacity: 0,
				height: 0
			},
			animate: {
				opacity: 1,
				height: "auto"
			},
			exit: {
				opacity: 0,
				height: 0
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control.Feedback, {
				type: "invalid",
				className: "d-block mt-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
					className: "text-danger fw-bold",
					children: error
				})
			})
		}) })
	]
}));
//#endregion
//#region src/pages/program/arisan/components/ArisanApplicantForm.jsx
function ArisanApplicantForm({ formData, errors, isLoading, onChange, akadText }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		variant: "form",
		className: "p-3 p-md-4 mb-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card.Body, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "form-section-header",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
					className: "fw-bold font-outfit mb-0 text-dark",
					children: "Informasi Pendaftar"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormInputField, {
				label: "Nama Anggota",
				name: "namaAnggota",
				value: formData.namaAnggota,
				onChange,
				placeholder: "Masukkan nama lengkap pendaftar",
				error: errors.namaAnggota,
				readOnly: isLoading,
				icon: FaUsers,
				required: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormInputField, {
				label: "Nama Peserta Ke-2",
				name: "namaPeserta2",
				value: formData.namaPeserta2,
				onChange,
				placeholder: "Masukkan nama perwakilan / peserta cadangan",
				error: errors.namaPeserta2,
				readOnly: isLoading,
				icon: FaUsers,
				required: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "form-section-header mt-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
					className: "fw-bold font-outfit mb-0 text-dark",
					children: "Detail Program"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormInputField, {
				label: "Nama Program",
				name: "programArisan",
				value: formData.programArisan,
				icon: FaLayerGroup,
				readOnly: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormInputField, {
				label: "Periode Angsuran",
				name: "periode",
				value: formData.periode,
				icon: FaCalendarAlt,
				readOnly: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
				className: "mb-4 custom-input-group",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Label, {
					className: "form-label d-flex align-items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaClipboardList, {
						className: "me-2 text-teal",
						size: 14
					}), "Keterangan Pembukaan Arisan"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
					as: "textarea",
					rows: 3,
					name: "keterangan",
					value: formData.keterangan,
					onChange,
					placeholder: "Tambahkan keterangan pendukung pendaftaran...",
					readOnly: isLoading,
					className: "custom-flat-input"
				})]
			})
		] })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		variant: "form",
		className: "p-3 p-md-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card.Body, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "form-section-header",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
				className: "fw-bold font-outfit mb-0 text-dark",
				children: "Akad Perjanjian"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "small text-muted mb-0 leading-relaxed font-plus-jakarta",
			children: akadText
		})] })
	})] });
}
//#endregion
//#region src/pages/program/arisan/components/SummaryDetail.jsx
var SummaryDetail = import_react.memo(({ summaryData }) => {
	const getIcon = (key) => {
		if (key.includes("Kategori")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaInfoCircle, {
			className: "text-white opacity-75",
			size: 14
		});
		if (key.includes("Target")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaMoneyBillWave, {
			className: "text-white opacity-75",
			size: 14
		});
		if (key.includes("Setoran")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheck, {
			className: "text-white opacity-75",
			size: 14
		});
		if (key.includes("Peserta")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUsers, {
			className: "text-white opacity-75",
			size: 14
		});
		if (key.includes("Durasi")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCalendarAlt, {
			className: "text-white opacity-75",
			size: 14
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaLayerGroup, {
			className: "text-white opacity-75",
			size: 14
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "overflow-hidden",
		style: {
			background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
			border: "none"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "d-flex justify-content-between align-items-center p-4",
			style: { borderBottom: "1px solid rgba(255, 255, 255, 0.2)" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
				className: "fw-bold mb-0 font-outfit text-white",
				children: "Ringkasan Arisan"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "summary-badge-premium text-white",
				style: { background: "rgba(255, 255, 255, 0.2)" },
				children: "Detail Grup"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "summary-grid",
				children: Object.entries(summaryData).map(([key, value]) => {
					const isTarget = key.includes("Target");
					const isContribution = key.includes("Setoran");
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "summary-item",
						style: { borderBottom: "1px dashed rgba(255, 255, 255, 0.2)" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "d-flex align-items-center gap-2",
							children: [getIcon(key), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "small fw-bold text-white opacity-75",
								children: key
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `fw-bold text-white ${isTarget || isContribution ? "large-amount-display" : ""}`,
							style: { color: "white" },
							children: value
						})]
					}, key);
				})
			})
		})]
	});
});
//#endregion
//#region src/pages/program/arisan/components/ArisanAgreementSidebar.jsx
function ArisanAgreementSidebar({ summaryData, agreedAkad, onAgreedAkadChange, agreedTerms, onAgreedTermsChange, isSubmitDisabled, isLoading, programArisan }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "d-flex flex-column gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryDetail, { summaryData }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				variant: "form",
				className: "p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "form-section-header mb-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
						className: "fw-bold font-outfit mb-0 text-dark",
						children: "Pernyataan Persetujuan"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "d-flex flex-column gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "custom-checkbox-premium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							id: "checkAkad",
							checked: agreedAkad,
							onChange: (e) => onAgreedAkadChange(e.target.checked),
							className: "form-check-input",
							disabled: isLoading
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "checkAkad",
							className: "form-check-label",
							children: "Saya menyetujui ketentuan Akad Perjanjian."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "custom-checkbox-premium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							id: "checkSyarat",
							checked: agreedTerms,
							onChange: (e) => onAgreedTermsChange(e.target.checked),
							className: "form-check-input",
							disabled: isLoading
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "checkSyarat",
							className: "form-check-label",
							children: "Saya bersedia menaati Syarat & Ketentuan program."
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "d-grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "form",
					type: "submit",
					disabled: isSubmitDisabled,
					isLoading,
					loadingText: "Memproses Pengajuan...",
					className: "w-100 d-flex flex-column align-items-center justify-content-center py-3",
					children: !isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "fw-bold",
						style: { fontSize: "16px" },
						children: "Proses Pengajuan Arisan"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
						className: "opacity-75",
						style: { fontSize: "11px" },
						children: programArisan ? "Konfirmasi Pendaftaran" : "Pilih Program Terlebih Dahulu"
					})] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-center mt-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", {
						className: "text-muted d-flex align-items-center justify-content-center gap-1",
						style: { fontSize: "11px" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaInfoCircle, {}), " Setujui akad & ketentuan untuk melanjutkan."]
					})
				})]
			})
		]
	});
}
//#endregion
//#region src/pages/program/arisan/FormPengajuanArisan.jsx
function FormPengajuanArisan({ decodedToken }) {
	const navigate = useNavigate();
	const { userData } = useProfile();
	const arisanId = decodedToken?.arisanId;
	const [formData, setFormData] = (0, import_react.useState)({
		namaAnggota: "",
		namaPeserta2: "",
		keterangan: "",
		programArisan: "",
		periode: ""
	});
	(0, import_react.useEffect)(() => {
		if (userData) setFormData((prev) => ({
			...prev,
			namaAnggota: prev.namaAnggota || userData.full_name || userData.name || userData.member?.name || ""
		}));
	}, [userData]);
	const [arisanData, setArisanData] = (0, import_react.useState)(null);
	const [isLoadingProducts, setIsLoadingProducts] = (0, import_react.useState)(true);
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const [errors, setErrors] = (0, import_react.useState)({});
	const [agreedAkad, setAgreedAkad] = (0, import_react.useState)(false);
	const [agreedTerms, setAgreedTerms] = (0, import_react.useState)(false);
	const [notification, setNotification] = (0, import_react.useState)({
		show: false,
		type: "",
		message: ""
	});
	const showNotification = (0, import_react.useCallback)((type, message) => {
		setNotification({
			show: true,
			type,
			message
		});
		setTimeout(() => {
			setNotification((prev) => ({
				...prev,
				show: false
			}));
		}, 5e3);
	}, []);
	const updateFormData = (data) => {
		if (!data) return;
		setFormData((prev) => ({
			...prev,
			programArisan: `${data.program_name || ""} - ${data.batch_name || ""}`,
			periode: data.start_date ? `${new Date(data.start_date).toLocaleDateString("id-ID", {
				month: "long",
				year: "numeric"
			})} - ${data.end_date ? new Date(data.end_date).toLocaleDateString("id-ID", {
				month: "long",
				year: "numeric"
			}) : ""}` : ""
		}));
	};
	const fetchArisanDetail = (0, import_react.useCallback)(async () => {
		if (arisanId === void 0 || arisanId === null) {
			showNotification("danger", "ID Arisan tidak ditemukan. Silakan pilih arisan dari daftar.");
			setIsLoadingProducts(false);
			return;
		}
		try {
			const token = localStorage.getItem("token");
			if (!token) throw new Error("Token tidak ditemukan. Silakan login kembali.");
			const response = await fetch(getApiUrl(`program/arisan/detail/${arisanId}`), {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				}
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.message || "Gagal mengambil detail arisan");
			setArisanData(result.data);
			updateFormData(result.data);
		} catch (error) {
			console.error("Error fetching arisan detail:", error);
			showNotification("danger", `Gagal memuat detail arisan: ${error.message}`);
		} finally {
			setIsLoadingProducts(false);
		}
	}, [arisanId, showNotification]);
	(0, import_react.useEffect)(() => {
		fetchArisanDetail();
	}, [fetchArisanDetail]);
	const validateForm = (0, import_react.useCallback)(() => {
		const newErrors = {};
		if (!formData.namaAnggota || formData.namaAnggota.trim().length < 3) newErrors.namaAnggota = "Nama anggota minimal 3 karakter";
		if (!formData.namaPeserta2 || formData.namaPeserta2.trim().length < 3) newErrors.namaPeserta2 = "Nama peserta kedua minimal 3 karakter";
		if (!formData.programArisan) newErrors.programArisan = "Program arisan belum terpilih";
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}, [formData]);
	const handleInputChange = (0, import_react.useCallback)((e) => {
		const { name, value } = e.target;
		setErrors((prev) => ({
			...prev,
			[name]: ""
		}));
		setFormData((prev) => ({
			...prev,
			[name]: value
		}));
	}, []);
	const handleProses = (0, import_react.useCallback)(async () => {
		if (!validateForm()) {
			showNotification("danger", "Mohon periksa kembali data yang Anda masukkan");
			return;
		}
		setIsLoading(true);
		try {
			const token = localStorage.getItem("token");
			if (!token) throw new Error("Token tidak ditemukan. Silakan login kembali.");
			const applicationData = {
				arisan_id: arisanId,
				item_name: formData.programArisan,
				nama_anggota: formData.namaAnggota,
				nama_peserta_2: formData.namaPeserta2,
				periode: formData.periode,
				keterangan: formData.keterangan
			};
			const response = await fetch(getApiUrl("financing/apply-arisan"), {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify(applicationData)
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.message || "Gagal mengirim pengajuan arisan");
			localStorage.setItem("currentArisanId", result.data.arisan_id);
			showNotification("success", "Pengajuan arisan berhasil dikirim!");
			setTimeout(() => {
				navigate(`/${jwtEncode({
					page: "transactionDetailPage",
					financingId: result.data.financing_id,
					action: "arisanEnrollment",
					return: "programPage"
				})}`);
			}, 2e3);
		} catch (error) {
			showNotification("danger", `Gagal mengirim pengajuan: ${error.message}`);
		} finally {
			setIsLoading(false);
		}
	}, [
		formData,
		arisanId,
		navigate,
		validateForm,
		showNotification
	]);
	const summaryData = (0, import_react.useMemo)(() => {
		return buildSummaryData(arisanData);
	}, [arisanData]);
	const akadText = (0, import_react.useMemo)(() => {
		return arisanData?.akad_text || "Berdasarkan akad Musyarakah Mutanaqisah (Kerjasama yang berkurang), di mana peserta bergabung dalam program arisan dengan pembayaran berkala sesuai kesepakatan.";
	}, [arisanData]);
	const isSubmitDisabled = isLoading || isLoadingProducts || !agreedAkad || !agreedTerms;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "form-page-container px-3 pb-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "floating-alert-container",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: notification.show && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					y: -20,
					scale: .95
				},
				animate: {
					opacity: 1,
					y: 0,
					scale: 1
				},
				exit: {
					opacity: 0,
					y: -20,
					scale: .95
				},
				transition: { duration: .2 },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SwalAlert, {
					variant: notification.type,
					className: "alert-premium d-flex align-items-center",
					dismissible: true,
					onClose: () => setNotification((prev) => ({
						...prev,
						show: false
					})),
					children: [notification.type === "success" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheck, {
						className: "me-2 text-success",
						size: 18
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaExclamationTriangle, {
						className: "me-2 text-danger",
						size: 18
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-outfit fw-bold",
						children: notification.message
					})]
				})
			}) })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
			fluid: true,
			className: "mt-4 px-0",
			children: isLoadingProducts ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center py-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
					animation: "border",
					variant: "teal",
					role: "status",
					className: "mb-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "visually-hidden",
						children: "Memuat data..."
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted",
					children: "Memuat detail grup arisan..."
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default, {
				onSubmit: (e) => {
					e.preventDefault();
					handleProses();
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
					className: "g-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
						lg: 7,
						xl: 8,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: {
								opacity: 0,
								x: -20
							},
							animate: {
								opacity: 1,
								x: 0
							},
							transition: { delay: .1 },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArisanApplicantForm, {
								formData,
								errors,
								isLoading,
								onChange: handleInputChange,
								akadText
							})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
						lg: 5,
						xl: 4,
						className: "sticky-summary-column",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: {
								opacity: 0,
								x: 20
							},
							animate: {
								opacity: 1,
								x: 0
							},
							transition: { delay: .2 },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArisanAgreementSidebar, {
								summaryData,
								agreedAkad,
								onAgreedAkadChange: setAgreedAkad,
								agreedTerms,
								onAgreedTermsChange: setAgreedTerms,
								isSubmitDisabled,
								isLoading,
								programArisan: formData.programArisan
							})
						})
					})]
				})
			})
		})]
	});
}
//#endregion
export { FormPengajuanArisan as default };
