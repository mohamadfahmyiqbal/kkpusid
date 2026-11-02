import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { E as Button, Pr as useNavigate, S as Card_default, b as Container, c as Spinner, g as Form_default, l as Row, mr as FaUpload, u as ProgressBar, x as Col } from "./vendor-react-D5pUDmay.js";
import { t as api } from "./common-qX05v8MF.js";
import { s as jwtEncode } from "./index-BaUN0sjk.js";
import { t as SwalAlert } from "./SwalAlert-C3kBxD_o.js";
import { t as profileService } from "./profileService-CtUrDUsl.js";
//#region src/pages/investasi/FormPendanaanSyariah/components/FormProgressBar.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FormProgressBar({ progress }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default, {
		className: "shadow-sm border-0 mb-4 rounded-4",
		style: {
			position: "sticky",
			top: "80px",
			zIndex: 10
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
			className: "px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "d-flex justify-content-between align-items-center mb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted fw-bold small text-uppercase",
					style: { letterSpacing: "0.5px" },
					children: "Kelengkapan Formulir"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: `fw-bold px-3 py-1 rounded-pill small ${progress === 100 ? "bg-success text-white" : "bg-primary bg-opacity-10 text-primary"}`,
					children: [progress, "%"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBar, {
				now: progress,
				variant: progress === 100 ? "success" : "primary",
				style: {
					height: "8px",
					borderRadius: "10px"
				},
				className: "bg-light shadow-sm"
			})]
		})
	});
}
//#endregion
//#region src/pages/investasi/FormPendanaanSyariah/components/formHelpers.js
var SECTOR_OPTIONS = [
	"Retail",
	"Food & Beverage",
	"Jasa",
	"Manufaktur",
	"Pertanian",
	"Lainnya"
];
var INITIAL_FORM_DATA = {
	namaUsaha: "",
	pemilikUsaha: "",
	sektor: "",
	alamat: "",
	omsetTahunan: "",
	tujuanPendanaan: "",
	targetDana: "",
	periodeModal: 12,
	omsetKerjasama: "",
	bagiHasil: "",
	buktiKepemilikan: null,
	buktiKerjasama: null,
	filePendukung: null,
	akadAgreed: false
};
var formatCurrency = (value) => {
	if (!value) return "";
	return new Intl.NumberFormat("id-ID").format(value);
};
var parseCurrency = (value) => {
	if (!value) return "";
	return String(value).replace(/\D/g, "");
};
var calculateProgress = (formData) => {
	const fields = [
		"namaUsaha",
		"pemilikUsaha",
		"alamat",
		"omsetTahunan",
		"tujuanPendanaan",
		"targetDana",
		"bagiHasil",
		"buktiKepemilikan",
		"akadAgreed"
	];
	const filled = fields.filter((field) => {
		if (field === "akadAgreed") return formData[field];
		if (field === "buktiKepemilikan") return formData[field] !== null;
		return formData[field] && String(formData[field]).trim() !== "";
	}).length;
	return Math.round(filled / fields.length * 100);
};
//#endregion
//#region src/pages/investasi/FormPendanaanSyariah/components/BusinessInfoSection.jsx
function BusinessInfoSection({ formData, errors, loading, firstInputRef, onChange, onCurrencyChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
			md: 12,
			className: "mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "d-flex align-items-center mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold me-3 shadow-sm",
					style: {
						width: "36px",
						height: "36px"
					},
					children: "1"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "fw-bold mb-0 text-dark",
					children: "Informasi Usaha"
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
			md: 12,
			className: "mb-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
					className: "fw-semibold text-dark",
					htmlFor: "nama-usaha",
					children: "Nama Usaha"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
					id: "nama-usaha",
					ref: firstInputRef,
					name: "namaUsaha",
					value: formData.namaUsaha,
					onChange,
					placeholder: "Contoh: Kedai Kopi Nusantara",
					className: "p-3 bg-light border-0",
					isInvalid: !!errors.namaUsaha,
					disabled: loading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control.Feedback, {
					type: "invalid",
					children: errors.namaUsaha
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
			md: 6,
			className: "mb-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
					className: "fw-semibold text-dark",
					htmlFor: "pemilik",
					children: "Nama Pemilik Usaha"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
					id: "pemilik",
					name: "pemilikUsaha",
					value: formData.pemilikUsaha,
					onChange,
					placeholder: "Sesuai KTP",
					className: "p-3 bg-light border-0",
					isInvalid: !!errors.pemilikUsaha,
					disabled: loading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control.Feedback, {
					type: "invalid",
					children: errors.pemilikUsaha
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
			md: 6,
			className: "mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
				className: "fw-semibold text-dark",
				htmlFor: "sektor",
				children: "Sektor Bisnis Utama"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Select, {
				id: "sektor",
				name: "sektor",
				value: formData.sektor,
				onChange,
				className: "p-3 bg-light border-0",
				disabled: loading,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: "-- Pilih sektor industri --"
				}), SECTOR_OPTIONS.map((sector) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: sector,
					children: sector
				}, sector))]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
			md: 12,
			className: "mb-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
					className: "fw-semibold text-dark",
					htmlFor: "alamat",
					children: "Alamat Lengkap Tempat Usaha"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
					id: "alamat",
					as: "textarea",
					rows: 3,
					name: "alamat",
					value: formData.alamat,
					onChange,
					placeholder: "Jalan, RT/RW, Kelurahan, Kecamatan, Kota/Kabupaten",
					className: "p-3 bg-light border-0",
					isInvalid: !!errors.alamat,
					disabled: loading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control.Feedback, {
					type: "invalid",
					children: errors.alamat
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
			md: 12,
			className: "mb-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
					className: "fw-semibold text-dark",
					htmlFor: "omset",
					children: "Estimasi Omset Tahunan Saat Ini"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
					id: "omset",
					type: "text",
					value: formData.omsetTahunan ? `Rp ${formatCurrency(formData.omsetTahunan)}` : "",
					onChange: (e) => onCurrencyChange("omsetTahunan", e),
					placeholder: "Min. Rp 10.000.000",
					className: "p-3 bg-light border-0 fw-bold text-success",
					isInvalid: !!errors.omsetTahunan,
					disabled: loading,
					inputMode: "numeric"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control.Feedback, {
					type: "invalid",
					children: errors.omsetTahunan
				})
			]
		})
	] });
}
//#endregion
//#region src/pages/investasi/FormPendanaanSyariah/components/FundingPlanSection.jsx
function FundingPlanSection({ formData, errors, loading, onChange, onCurrencyChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
			md: 12,
			className: "mb-4 mt-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "my-5 opacity-10" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "d-flex align-items-center mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold me-3 shadow-sm",
					style: {
						width: "36px",
						height: "36px"
					},
					children: "2"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "fw-bold mb-0 text-dark",
					children: "Rencana Pendanaan"
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
			md: 12,
			className: "mb-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
					className: "fw-semibold text-dark",
					htmlFor: "tujuan",
					children: "Tujuan Penggunaan Dana"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
					id: "tujuan",
					as: "textarea",
					rows: 3,
					name: "tujuanPendanaan",
					value: formData.tujuanPendanaan,
					onChange,
					placeholder: "Contoh: Penambahan modal kerja untuk membeli stok bahan baku menjelang Idul Fitri",
					className: "p-3 bg-light border-0",
					isInvalid: !!errors.tujuanPendanaan,
					disabled: loading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control.Feedback, {
					type: "invalid",
					children: errors.tujuanPendanaan
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
			md: 6,
			className: "mb-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
					className: "fw-semibold text-dark",
					htmlFor: "target",
					children: "Target Dana yang Dibutuhkan"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
					id: "target",
					type: "text",
					value: formData.targetDana ? `Rp ${formatCurrency(formData.targetDana)}` : "",
					onChange: (e) => onCurrencyChange("targetDana", e),
					placeholder: "Min. Rp 5.000.000",
					className: "p-3 bg-light border-0 fw-bold text-primary",
					isInvalid: !!errors.targetDana,
					disabled: loading,
					inputMode: "numeric"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control.Feedback, {
					type: "invalid",
					children: errors.targetDana
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
			md: 6,
			className: "mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
				className: "fw-semibold text-dark",
				htmlFor: "periode",
				children: "Periode Pengembalian Modal"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Select, {
				id: "periode",
				name: "periodeModal",
				value: formData.periodeModal,
				onChange,
				className: "p-3 bg-light border-0",
				disabled: loading,
				children: [
					6,
					12,
					18,
					24,
					36
				].map((periode) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
					value: periode,
					children: [periode, " Bulan"]
				}, periode))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
			md: 6,
			className: "mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
				className: "fw-semibold text-dark",
				htmlFor: "omset-kerjasama",
				children: "Estimasi Omset Selama Periode Pendanaan (Bulanan)"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
				id: "omset-kerjasama",
				type: "text",
				value: formData.omsetKerjasama ? `Rp ${formatCurrency(formData.omsetKerjasama)}` : "",
				onChange: (e) => onCurrencyChange("omsetKerjasama", e),
				placeholder: "Cth: Rp 5.000.000",
				className: "p-3 bg-light border-0",
				disabled: loading,
				inputMode: "numeric"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
			md: 6,
			className: "mb-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
					className: "fw-semibold text-dark",
					htmlFor: "bagi-hasil",
					children: "Tawaran Bagi Hasil Investor (%)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
					id: "bagi-hasil",
					type: "number",
					name: "bagiHasil",
					value: formData.bagiHasil,
					onChange,
					placeholder: "Contoh: 15",
					className: "p-3 bg-light border-0 fw-bold text-success",
					isInvalid: !!errors.bagiHasil,
					disabled: loading,
					min: "1",
					max: "50"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control.Feedback, {
					type: "invalid",
					children: errors.bagiHasil
				})
			]
		})
	] });
}
//#endregion
//#region src/pages/investasi/FormPendanaanSyariah/components/DocumentUploadSection.jsx
function DocumentUploadSection({ errors, loading, onFileChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
			md: 12,
			className: "mb-4 mt-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "my-5 opacity-10" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "d-flex align-items-center mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold me-3 shadow-sm",
					style: {
						width: "36px",
						height: "36px"
					},
					children: "3"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "fw-bold mb-0 text-dark",
					children: "Dokumen Legalitas & Pendukung"
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
			md: 6,
			className: "mb-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Label, {
					className: "fw-semibold text-dark",
					htmlFor: "bukti-kepemilikan",
					children: [
						"Bukti Kepemilikan Usaha (NIB/SIUP/SKDU)",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-danger",
							children: "*"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
					id: "bukti-kepemilikan",
					type: "file",
					onChange: (e) => onFileChange("buktiKepemilikan", e),
					className: "p-3 bg-light border-0",
					isInvalid: !!errors.buktiKepemilikan,
					disabled: loading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control.Feedback, {
					type: "invalid",
					children: errors.buktiKepemilikan
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Text, {
					className: "text-muted d-block mt-2",
					children: "Format: PDF, JPG, PNG (Maks 5MB)"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
			md: 6,
			className: "mb-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
					className: "fw-semibold text-dark",
					htmlFor: "bukti-kerjasama",
					children: "Bukti Kerjasama / Kontrak (Opsional)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
					id: "bukti-kerjasama",
					type: "file",
					className: "p-3 bg-light border-0",
					onChange: (e) => onFileChange("buktiKerjasama", e),
					disabled: loading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Text, {
					className: "text-muted d-block mt-2",
					children: "Format: PDF, JPG, PNG (Maks 5MB)"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
			md: 12,
			className: "mb-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
					className: "fw-semibold text-dark",
					htmlFor: "file-pendukung",
					children: "Dokumen Pendukung Tambahan (Opsional)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
					id: "file-pendukung",
					type: "file",
					className: "p-3 bg-light border-0",
					onChange: (e) => onFileChange("filePendukung", e),
					disabled: loading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Text, {
					className: "text-muted d-block mt-2",
					children: "Seperti proposal bisnis atau rekap laporan keuangan."
				})
			]
		})
	] });
}
//#endregion
//#region src/pages/investasi/FormPendanaanSyariah/components/AgreementAndActions.jsx
function AgreementAndActions({ akadAgreed, error, loading, onAkadChange, onBack }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
		md: 12,
		className: "mb-4 mt-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-light p-4 rounded-4 border",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Check, {
				type: "checkbox",
				id: "akad-agreement",
				checked: akadAgreed,
				onChange: onAkadChange,
				isInvalid: !!error,
				disabled: loading,
				label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "fw-semibold text-dark ms-2",
					children: "Saya menyatakan bahwa seluruh data yang diberikan adalah benar, serta menyetujui seluruh ketentuan dan akad pembiayaan syariah yang berlaku di Koperasi."
				})
			}), error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-danger small mt-2 ms-4 fw-bold",
				children: error
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "d-flex flex-column flex-md-row justify-content-between mt-5 pt-4 border-top",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "light",
			className: "px-5 py-3 fw-bold text-muted mb-3 mb-md-0 rounded-pill shadow-sm transition-transform hover-scale",
			onClick: onBack,
			disabled: loading,
			children: "Batal"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "primary",
			type: "submit",
			className: "px-5 py-3 fw-bold shadow-lg rounded-pill transition-transform hover-scale d-flex align-items-center justify-content-center",
			disabled: loading,
			style: {
				background: "linear-gradient(135deg, #075985 0%, #0369a1 40%, #0ea5e9 100%)",
				border: "none"
			},
			children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
				animation: "border",
				size: "sm",
				className: "me-2"
			}), "Memproses Pengajuan..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUpload, { className: "me-2 mb-1" }), "Kirim Pengajuan Pendanaan"] })
		})]
	})] });
}
//#endregion
//#region src/pages/investasi/FormPendanaanSyariah/FormPendanaanSyariah.jsx
var FormPendanaanSyariah = () => {
	const navigate = useNavigate();
	const firstInputRef = (0, import_react.useRef)(null);
	const [formData, setFormData] = (0, import_react.useState)(INITIAL_FORM_DATA);
	const [errors, setErrors] = (0, import_react.useState)({});
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [submitError, setSubmitError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const fetchProfile = async () => {
			try {
				const response = await profileService.getProfile();
				const profileData = response.data || response;
				const mappedProfile = profileService.mapBackendToFrontend(profileData);
				setFormData((prev) => ({
					...prev,
					pemilikUsaha: mappedProfile.nama || "",
					alamat: mappedProfile.alamat || ""
				}));
			} catch (err) {
				console.error("Gagal mengambil profil", err);
			}
		};
		fetchProfile();
		if (firstInputRef.current) firstInputRef.current.focus();
	}, []);
	const handleCurrencyChange = (0, import_react.useCallback)((field, e) => {
		const rawValue = parseCurrency(e.target.value);
		setFormData((prev) => ({
			...prev,
			[field]: rawValue
		}));
		setErrors((prev) => ({
			...prev,
			[field]: ""
		}));
	}, []);
	const handleChange = (0, import_react.useCallback)((e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value
		}));
		setErrors((prev) => ({
			...prev,
			[name]: ""
		}));
	}, []);
	const handleFileChange = (0, import_react.useCallback)((field, e) => {
		const file = e.target.files[0];
		setFormData((prev) => ({
			...prev,
			[field]: file
		}));
		setErrors((prev) => ({
			...prev,
			[field]: ""
		}));
	}, []);
	const handleAkadChange = (0, import_react.useCallback)((e) => {
		setFormData((prev) => ({
			...prev,
			akadAgreed: e.target.checked
		}));
	}, []);
	const validateForm = (0, import_react.useCallback)(() => {
		const newErrors = {};
		const targetDana = parseInt(String(formData.targetDana).replace(/\D/g, ""), 10) || 0;
		const omsetTahunan = parseInt(String(formData.omsetTahunan).replace(/\D/g, ""), 10) || 0;
		if (!formData.namaUsaha) newErrors.namaUsaha = "Nama usaha wajib diisi";
		if (!formData.pemilikUsaha) newErrors.pemilikUsaha = "Pemilik usaha wajib diisi";
		if (!formData.alamat) newErrors.alamat = "Alamat wajib diisi";
		if (!formData.omsetTahunan || omsetTahunan < 1e7) newErrors.omsetTahunan = "Minimal omset tahunan: Rp 10.000.000";
		if (!formData.tujuanPendanaan) newErrors.tujuanPendanaan = "Tujuan pendanaan wajib diisi";
		if (!formData.targetDana || targetDana < 5e6) newErrors.targetDana = "Minimal target dana: Rp 5.000.000";
		if (!formData.bagiHasil) newErrors.bagiHasil = "Bagi hasil wajib diisi";
		if (!formData.buktiKepemilikan) newErrors.buktiKepemilikan = "Bukti kepemilikan wajib diupload";
		if (!formData.akadAgreed) newErrors.akadAgreed = "Anda harus menyetujui akad";
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}, [formData]);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) return;
		setLoading(true);
		setSubmitError(null);
		try {
			const targetDanaNum = parseInt(String(formData.targetDana).replace(/\D/g, ""), 10);
			const tenureNum = parseInt(formData.periodeModal, 10);
			const monthlyInstallment = Math.round(targetDanaNum / tenureNum);
			const payload = {
				category: "Pendanaan Syariah UMKM",
				item_name: formData.tujuanPendanaan,
				amount_requested: targetDanaNum,
				down_payment: 0,
				principal_amount: targetDanaNum,
				tenure: tenureNum,
				monthly_installment: monthlyInstallment,
				metode_pencairan: "Non Tunai",
				nama_nasabah: formData.pemilikUsaha,
				no_rekening: "0000000000",
				bank_tujuan: "Bank Syariah",
				business_name: formData.namaUsaha,
				business_sector: formData.sektor,
				business_address: formData.alamat,
				estimated_yearly_turnover: parseInt(String(formData.omsetTahunan).replace(/\D/g, ""), 10) || 0,
				estimated_monthly_turnover: parseInt(String(formData.omsetKerjasama).replace(/\D/g, ""), 10) || 0,
				investor_profit_share: parseFloat(formData.bagiHasil) || 0
			};
			const financingId = (await api.post("/financing/apply", payload)).data?.data?.financing_id;
			if (financingId) {
				if (formData.buktiKepemilikan || formData.buktiKerjasama || formData.filePendukung) {
					const uploadData = new FormData();
					if (formData.buktiKepemilikan) uploadData.append("evidence", formData.buktiKepemilikan);
					if (formData.buktiKerjasama) uploadData.append("buktiKerjasama", formData.buktiKerjasama);
					if (formData.filePendukung) uploadData.append("filePendukung", formData.filePendukung);
					try {
						await api.post(`/financing/evidence/${financingId}`, uploadData, { headers: { "Content-Type": "multipart/form-data" } });
					} catch (uploadError) {
						console.error("Upload error:", uploadError);
					}
				}
				navigate(`/${jwtEncode({
					page: "transactionDetailPage",
					financingId,
					return: "pendanaanSyariah",
					data: {
						id: financingId,
						amount: payload.principal_amount,
						item_price: payload.amount_requested,
						monthly_installment: monthlyInstallment,
						cooperation_months: payload.tenure,
						purpose: payload.item_name,
						item_name: payload.item_name,
						account_type: "Pendanaan Syariah",
						akad_type: "Murabahah",
						method: "Non Tunai",
						status: "PENDING",
						created_at: (/* @__PURE__ */ new Date()).toISOString(),
						is_approved_pengawas: false,
						is_approved_ketua: false,
						is_approved_bendahara: false,
						is_rejected: false,
						member: {
							full_name: payload.nama_nasabah,
							member_code: "-",
							member_type: "Reguler"
						},
						bank_name: payload.bank_tujuan,
						bank_account_name: payload.nama_nasabah,
						bank_account_no: payload.no_rekening,
						catalog: {
							target_name: payload.item_name,
							category: payload.category,
							target_amount: payload.principal_amount,
							term_months: payload.tenure
						}
					}
				})}`);
			} else throw new Error("Gagal mendapatkan ID Pengajuan");
		} catch (err) {
			setSubmitError(err?.response?.data?.message || "Gagal mengirim pengajuan");
		} finally {
			setLoading(false);
		}
	};
	const handleBack = (0, import_react.useCallback)(() => {
		navigate(`/${jwtEncode({ page: "pendanaanSyariah" })}`);
	}, [navigate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pb-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
			fluid: true,
			className: "px-3 px-md-4 mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				className: "justify-content-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
					xl: 10,
					className: "mx-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormProgressBar, { progress: (0, import_react.useMemo)(() => {
						return calculateProgress(formData);
					}, [formData]) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default, {
						className: "shadow-sm border-0 rounded-4 overflow-hidden mb-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
							height: "8px",
							background: "linear-gradient(135deg, #075985 0%, #0369a1 40%, #0ea5e9 100%)"
						} }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
							className: "p-4 p-md-5",
							children: [submitError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwalAlert, {
								variant: "danger",
								className: "mb-4 border-0 shadow-sm rounded-3",
								children: submitError
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default, {
								onSubmit: handleSubmit,
								noValidate: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BusinessInfoSection, {
										formData,
										errors,
										loading,
										firstInputRef,
										onChange: handleChange,
										onCurrencyChange: handleCurrencyChange
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FundingPlanSection, {
										formData,
										errors,
										loading,
										onChange: handleChange,
										onCurrencyChange: handleCurrencyChange
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentUploadSection, {
										errors,
										loading,
										onFileChange: handleFileChange
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgreementAndActions, {
										akadAgreed: formData.akadAgreed,
										error: errors.akadAgreed,
										loading,
										onAkadChange: handleAkadChange,
										onBack: handleBack
									})
								] })
							})]
						})]
					})]
				})
			})
		})
	});
};
//#endregion
export { FormPendanaanSyariah as default };
