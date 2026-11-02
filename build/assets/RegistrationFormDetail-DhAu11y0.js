import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, T as require_sweetalert2_all, gn as require_jsx_runtime, mt as require_prop_types } from "./vendor-rpDlma0K.js";
import { Cn as FaIdCard, Cr as FaUserShield, D as Badge, E as Button, Gt as FaClipboardCheck, Nn as FaMapMarkerAlt, On as FaLightbulb, Ot as FaBriefcase, Pr as useNavigate, Pt as FaCamera, Rn as FaPhoneAlt, S as Card_default, T as CardBody, Xn as FaSave, Zt as FaCreditCard, _r as FaUserCircle, an as FaExclamationTriangle, ar as FaSyncAlt, br as FaUserFriends, bt as FaArrowLeft, c as Spinner, en as FaEdit, fn as FaFileSignature, fr as FaUndo, g as Form_default, h as InputGroup_default, hr as FaUser, kn as FaLink, kt as FaBuilding, l as Row, n as require_react_webcam, pr as FaUniversity, r as StateManagedSelect$1, sr as FaTimes, tn as FaEnvelope, u as ProgressBar, w as CardHeader, wn as FaInfoCircle, wr as FaUserTag, x as Col, xt as FaArrowRight, zt as FaCheckCircle } from "./vendor-react-D5pUDmay.js";
import { t as api } from "./common-qX05v8MF.js";
import { n as useProfile } from "./ProfileContext-DQCnAT09.js";
import { s as jwtEncode } from "./index-BaUN0sjk.js";
import { t as SwalAlert } from "./SwalAlert-C3kBxD_o.js";
import { t as uGlobal } from "./UGlobal-MGBt7b3Z.js";
//#region src/pages/anggota/RegistrationFormDetail/services/AnggotaService.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_sweetalert2_all = /* @__PURE__ */ __toESM(require_sweetalert2_all());
var AnggotaService = { submitRegistration: (formData) => {
	return api.post("/anggota/pendaftaran", formData, { timeout: 3e4 });
} };
//#endregion
//#region src/pages/anggota/RegistrationFormDetail/components/registrationFormHelpers.js
var STEP_LABELS = [
	"Data Pribadi",
	"Akun & Kontak",
	"Foto KTP",
	"Swafoto",
	"Pekerjaan",
	"Kontak Darurat",
	"Rekening Bank",
	"Ringkasan"
];
var validateStep = (currentStep, data) => {
	let stepErrors = {};
	if (currentStep === 1) {
		if (!data.nik_ktp || data.nik_ktp.length !== 16) stepErrors.nik_ktp = "NIK harus 16 digit.";
		if (!data.full_name) stepErrors.full_name = "Nama lengkap wajib diisi.";
		if (!data.alamat_ktp) stepErrors.alamat_ktp = "Alamat wajib diisi.";
		if (!data.province_id) stepErrors.province_id = "Provinsi wajib dipilih.";
		if (!data.city_id) stepErrors.city_id = "Kota/Kabupaten wajib dipilih.";
		if (!data.district_id) stepErrors.district_id = "Kecamatan wajib dipilih.";
		if (!data.subdistrict_id) stepErrors.subdistrict_id = "Kelurahan wajib dipilih.";
	}
	if (currentStep === 2) {
		if (!data.tipeAnggota) stepErrors.tipeAnggota = "Tipe anggota wajib dipilih.";
		if (!data.phone_number) stepErrors.phone_number = "Nomor HP wajib diisi.";
		if (!data.email) stepErrors.email = "Email wajib diisi.";
	}
	if (currentStep === 3 && !data.foto_ktp) stepErrors.foto_ktp = "Foto KTP wajib diambil.";
	if (currentStep === 4 && !data.foto_swafoto) stepErrors.foto_swafoto = "Swafoto wajib diambil.";
	if (currentStep === 5) {
		if (!data.occupation) stepErrors.occupation = "Pekerjaan wajib diisi.";
		if (!data.employer_name) stepErrors.employer_name = "Nama tempat bekerja wajib diisi.";
		if (!data.employer_address) stepErrors.employer_address = "Alamat tempat bekerja wajib diisi.";
	}
	if (currentStep === 6) {
		if (!data.contact_name) stepErrors.contact_name = "Nama kontak darurat wajib diisi.";
		if (!data.phone_number_emergency) stepErrors.phone_number_emergency = "No. HP kontak darurat wajib diisi.";
		if (!data.relation) stepErrors.relation = "Hubungan wajib diisi.";
	}
	if (currentStep === 7) {
		if (!data.bank_name) stepErrors.bank_name = "Nama bank wajib diisi.";
		if (!data.bank_account_no) stepErrors.bank_account_no = "Nomor rekening wajib diisi.";
		if (!data.account_holder) stepErrors.account_holder = "Nama pemilik rekening wajib diisi.";
	}
	return stepErrors;
};
//#endregion
//#region src/pages/anggota/RegistrationFormDetail/components/RegistrationProgressBar.jsx
var import_prop_types = /* @__PURE__ */ __toESM(require_prop_types());
var import_jsx_runtime = require_jsx_runtime();
function RegistrationProgressBar({ step, totalSteps, stepLabels, progressPercent, onStepClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "position-relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBar, {
			now: progressPercent,
			variant: "primary",
			className: "rounded-0",
			style: { height: "6px" }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "position-absolute top-0 end-0 small fw-bold text-primary pe-3",
			style: {
				marginTop: "-20px",
				fontSize: "11px"
			},
			children: [Math.round(progressPercent), "%"]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
		className: "bg-white border-0 p-3 p-md-4 pb-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "d-flex flex-wrap justify-content-between align-items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "d-flex align-items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "step-badge-counter bg-primary text-white me-3",
					children: step
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
					className: "mb-0 fw-bold",
					children: stepLabels[step - 1]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", {
					className: "text-muted",
					children: [
						"Langkah ",
						step,
						" dari ",
						totalSteps
					]
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
				bg: "light",
				className: "text-primary border px-3 py-2 rounded-pill",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUserCircle, { className: "me-1" }), " Calon Anggota"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "step-indicators",
			children: Array.from({ length: totalSteps }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `step-dot ${i + 1 === step ? "active" : i + 1 < step ? "completed" : ""}`,
				title: `Langkah ${i + 1}: ${stepLabels[i]}`,
				style: { cursor: "pointer" },
				onClick: () => {
					if (i + 1 < step && onStepClick) onStepClick(i + 1);
				}
			}, i))
		})]
	})] });
}
RegistrationProgressBar.propTypes = {
	step: import_prop_types.default.number.isRequired,
	totalSteps: import_prop_types.default.number.isRequired,
	stepLabels: import_prop_types.default.arrayOf(import_prop_types.default.string).isRequired,
	progressPercent: import_prop_types.default.number.isRequired,
	onStepClick: import_prop_types.default.func.isRequired
};
//#endregion
//#region src/pages/anggota/RegistrationFormDetail/components/steps/Step1PersonalData.jsx
var Step1PersonalData = ({ formData, handleChange, errors, setFormData }) => {
	const [provinces, setProvinces] = (0, import_react.useState)([]);
	const [regencies, setRegencies] = (0, import_react.useState)([]);
	const [districts, setDistricts] = (0, import_react.useState)([]);
	const [villages, setVillages] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		uGlobal.getProvinces().then((res) => {
			setProvinces(res.data.map((p) => ({
				value: p.id,
				label: p.name
			})));
		});
	}, []);
	(0, import_react.useEffect)(() => {
		if (formData.province_id) uGlobal.getRegencies(formData.province_id).then((res) => setRegencies(res.data.map((r) => ({
			value: r.id,
			label: r.name
		}))));
		if (formData.city_id) uGlobal.getDistricts(formData.city_id).then((res) => setDistricts(res.data.map((d) => ({
			value: d.id,
			label: d.name
		}))));
		if (formData.district_id) uGlobal.getVillages(formData.district_id).then((res) => setVillages(res.data.map((v) => ({
			value: v.id,
			label: v.name
		}))));
	}, [
		formData.province_id,
		formData.city_id,
		formData.district_id
	]);
	const handleProvinceSelect = (opt) => {
		setFormData({
			...formData,
			province_id: opt?.value || "",
			provinsi: opt?.label || "",
			city_id: "",
			kota_kab: "",
			district_id: "",
			kecamatan: "",
			subdistrict_id: "",
			kelurahan: ""
		});
		setRegencies([]);
		setDistricts([]);
		setVillages([]);
		if (opt) uGlobal.getRegencies(opt.value).then((res) => setRegencies(res.data.map((r) => ({
			value: r.id,
			label: r.name
		}))));
	};
	const handleRegencySelect = (opt) => {
		setFormData({
			...formData,
			city_id: opt?.value || "",
			kota_kab: opt?.label || "",
			district_id: "",
			kecamatan: "",
			subdistrict_id: "",
			kelurahan: ""
		});
		setDistricts([]);
		setVillages([]);
		if (opt) uGlobal.getDistricts(opt.value).then((res) => setDistricts(res.data.map((d) => ({
			value: d.id,
			label: d.name
		}))));
	};
	const handleDistrictSelect = (opt) => {
		setFormData({
			...formData,
			district_id: opt?.value || "",
			kecamatan: opt?.label || "",
			subdistrict_id: "",
			kelurahan: ""
		});
		setVillages([]);
		if (opt) uGlobal.getVillages(opt.value).then((res) => setVillages(res.data.map((v) => ({
			value: v.id,
			label: v.name
		}))));
	};
	const selectStyles = {
		control: (base, state) => ({
			...base,
			borderRadius: "12px",
			border: state.isFocused ? "1px solid #86b7fe" : "none",
			boxShadow: state.isFocused ? "0 0 0 0.25rem rgba(13,110,253,.25)" : "0 .125rem .25rem rgba(0,0,0,.075)",
			padding: "2px",
			backgroundColor: "#fff"
		}),
		menu: (base) => ({
			...base,
			borderRadius: "12px",
			overflow: "hidden",
			boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)"
		})
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "d-flex align-items-center mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "icon-box bg-soft-primary text-primary me-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaIdCard, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
					className: "fw-bold mb-0 text-dark",
					children: "Data Pribadi & Identitas"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
					className: "text-muted",
					children: "Tulis nama lengkap dan nomor identitas NIK sesuai dengan KTP Anda"
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
				className: "g-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
					md: 6,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Label, {
						className: "fw-bold small mb-2",
						children: ["NIK KTP ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-danger",
							children: "*"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup_default, {
						className: "shadow-sm rounded-12 overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup_default.Text, {
								className: "bg-white border-0 py-2 ps-3 text-muted",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaIdCard, { size: 14 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
								type: "text",
								name: "nik_ktp",
								value: formData.nik_ktp || "",
								onChange: handleChange,
								isInvalid: !!errors.nik_ktp,
								maxLength: 16,
								className: "border-0 py-2",
								placeholder: "Masukkan 16 digit NIK"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control.Feedback, {
								type: "invalid",
								tooltip: true,
								children: errors.nik_ktp
							})
						]
					})] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
					md: 6,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Label, {
						className: "fw-bold small mb-2",
						children: ["Nama Lengkap ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-danger",
							children: "*"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup_default, {
						className: "shadow-sm rounded-12 overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup_default.Text, {
								className: "bg-white border-0 py-2 ps-3 text-muted",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUser, { size: 14 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
								type: "text",
								name: "full_name",
								value: formData.full_name || "",
								onChange: handleChange,
								isInvalid: !!errors.full_name,
								placeholder: "Nama lengkap sesuai KTP",
								className: "border-0 py-2"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control.Feedback, {
								type: "invalid",
								tooltip: true,
								children: errors.full_name
							})
						]
					})] })
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "d-flex align-items-center mt-5 mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "icon-box bg-soft-primary text-primary me-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaMapMarkerAlt, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
					className: "fw-bold mb-0 text-dark",
					children: "Detail Domisili"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
					className: "text-muted",
					children: "Tentukan lokasi tempat tinggal Anda berdasarkan alamat KTP"
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
					className: "mb-3 g-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
						md: 6,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Label, {
								className: "fw-bold small mb-2",
								children: ["Provinsi ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-danger",
									children: "*"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateManagedSelect$1, {
								classNamePrefix: "rs",
								styles: selectStyles,
								options: provinces,
								placeholder: "Pilih Provinsi...",
								onChange: handleProvinceSelect,
								value: provinces.find((p) => p.value === formData.province_id) || null
							}),
							errors.province_id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-danger small mt-1",
								children: errors.province_id
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
						md: 6,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Label, {
								className: "fw-bold small mb-2",
								children: ["Kota / Kabupaten ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-danger",
									children: "*"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateManagedSelect$1, {
								classNamePrefix: "rs",
								styles: selectStyles,
								options: regencies,
								placeholder: "Pilih Kota...",
								isDisabled: !formData.province_id,
								onChange: handleRegencySelect,
								value: regencies.find((r) => r.value === formData.city_id) || null
							}),
							errors.city_id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-danger small mt-1",
								children: errors.city_id
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
					className: "mb-3 g-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
						md: 6,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Label, {
								className: "fw-bold small mb-2",
								children: ["Kecamatan ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-danger",
									children: "*"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateManagedSelect$1, {
								classNamePrefix: "rs",
								styles: selectStyles,
								options: districts,
								placeholder: "Pilih Kecamatan...",
								isDisabled: !formData.city_id,
								onChange: handleDistrictSelect,
								value: districts.find((d) => d.value === formData.district_id) || null
							}),
							errors.district_id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-danger small mt-1",
								children: errors.district_id
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
						md: 6,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Label, {
								className: "fw-bold small mb-2",
								children: ["Kelurahan ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-danger",
									children: "*"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateManagedSelect$1, {
								classNamePrefix: "rs",
								styles: selectStyles,
								options: villages,
								placeholder: "Pilih Kelurahan...",
								isDisabled: !formData.district_id,
								onChange: (opt) => setFormData({
									...formData,
									subdistrict_id: opt?.value || "",
									kelurahan: opt?.label || ""
								}),
								value: villages.find((v) => v.value === formData.subdistrict_id) || null
							}),
							errors.subdistrict_id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-danger small mt-1",
								children: errors.subdistrict_id
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
					className: "mb-3 g-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
						md: 6,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
							className: "fw-bold small mb-2",
							children: "RT"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
							type: "text",
							name: "rt",
							value: formData.rt || "",
							onChange: handleChange,
							className: "rounded-12 border-0 shadow-sm py-2 px-3 bg-white",
							placeholder: "Contoh: 001"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
						md: 6,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
							className: "fw-bold small mb-2",
							children: "RW"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
							type: "text",
							name: "rw",
							value: formData.rw || "",
							onChange: handleChange,
							className: "rounded-12 border-0 shadow-sm py-2 px-3 bg-white",
							placeholder: "Contoh: 001"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					className: "mb-3 g-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
						xs: 12,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Label, {
								className: "fw-bold small mb-2",
								children: ["Alamat Lengkap (Jalan / Blok / No) ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-danger",
									children: "*"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
								as: "textarea",
								rows: 2,
								name: "alamat_ktp",
								value: formData.alamat_ktp || "",
								onChange: handleChange,
								isInvalid: !!errors.alamat_ktp,
								className: "rounded-12 border-0 shadow-sm py-3 px-4",
								placeholder: "Contoh: Jl. Sudirman No. 123, Blok A5"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control.Feedback, {
								type: "invalid",
								children: errors.alamat_ktp
							})
						] })
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "alert alert-info d-flex align-items-center rounded-12 mt-4 mb-0 border-0 bg-white shadow-sm p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaInfoCircle, {
						className: "text-primary me-2 flex-shrink-0",
						size: 16
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
						className: "text-muted",
						children: "Pastikan semua data yang Anda masukkan sudah benar dan sesuai dengan identitas resmi KTP Anda untuk mempercepat proses verifikasi."
					})]
				})
			] })
		]
	});
};
var Step1PersonalData_default = import_react.memo(Step1PersonalData);
//#endregion
//#region src/pages/anggota/RegistrationFormDetail/components/steps/Step2Account.jsx
/**
* Komponen untuk mengisi Account Info (Langkah 2).
* Dioptimasi dengan UI modern dan class global dari App.css.
*/
var Step2Account_default = import_react.memo(function Step2Account({ formData, handleChange, errors }) {
	const selectStyles = {
		control: (base, state) => ({
			...base,
			borderRadius: "12px",
			border: state.isFocused ? "1px solid #86b7fe" : "none",
			boxShadow: state.isFocused ? "0 0 0 0.25rem rgba(13,110,253,.25)" : "0 .125rem .25rem rgba(0,0,0,.075)",
			padding: "2px",
			backgroundColor: "#fff"
		}),
		menu: (base) => ({
			...base,
			borderRadius: "12px",
			overflow: "hidden",
			boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)"
		})
	};
	const tipeAnggotaOptions = [{
		value: "5",
		label: "Anggota Reguler"
	}, {
		value: "6",
		label: "Anggota Luar Biasa"
	}];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "d-flex align-items-center mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "icon-box bg-soft-primary text-primary me-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUserTag, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
				className: "fw-bold mb-0 text-dark",
				children: "Informasi Akun"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
				className: "text-muted",
				children: "Tentukan tipe keanggotaan dan kontak aktif Anda"
			})] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
			className: "g-3 mb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
				md: 6,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
					controlId: "formTipeAnggota",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Label, {
							className: "fw-bold small mb-2",
							children: ["Tipe Anggota ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-danger",
								children: "*"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateManagedSelect$1, {
							classNamePrefix: "rs",
							styles: selectStyles,
							options: tipeAnggotaOptions,
							placeholder: "Pilih Tipe Anggota",
							onChange: (opt) => handleChange({ target: {
								name: "tipeAnggota",
								value: opt ? opt.value : ""
							} }),
							value: tipeAnggotaOptions.find((o) => o.value === String(formData.tipeAnggota)) || null
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control.Feedback, {
							type: "invalid",
							children: errors.tipeAnggota
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 small text-muted d-flex align-items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaInfoCircle, { className: "me-1 text-primary flex-shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Anggota Luar Biasa untuk non-karyawan/mitra." })]
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
				md: 6,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
					controlId: "formNoTlp",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Label, {
							className: "fw-bold small mb-2",
							children: ["No. WhatsApp/HP ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-danger",
								children: "*"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup_default, {
							className: "shadow-sm rounded-12 overflow-hidden",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup_default.Text, {
									className: "bg-white border-0 py-2 ps-3 text-muted",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaPhoneAlt, { size: 14 })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
									type: "tel",
									name: "phone_number",
									placeholder: "Contoh: 08123456789",
									value: formData.phone_number || "",
									onChange: handleChange,
									isInvalid: !!errors.phone_number,
									className: "border-0 py-2"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control.Feedback, {
									type: "invalid",
									tooltip: true,
									children: errors.phone_number
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
							className: "text-muted mt-2 d-block",
							children: "Gunakan nomor yang terhubung dengan WhatsApp."
						})
					]
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
			className: "g-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
				md: 6,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
					controlId: "formEmail",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Label, {
							className: "fw-bold small mb-2",
							children: ["Alamat Email ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-danger",
								children: "*"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup_default, {
							className: "shadow-sm rounded-12 overflow-hidden",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup_default.Text, {
									className: "bg-light border-0 py-2 ps-3 text-muted",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaEnvelope, { size: 14 })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
									type: "email",
									name: "email",
									placeholder: "nama@domain.com",
									value: formData.email || "",
									onChange: handleChange,
									isInvalid: !!errors.email,
									className: "border-0 py-2 bg-light text-muted",
									disabled: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control.Feedback, {
									type: "invalid",
									tooltip: true,
									children: errors.email
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
							className: "text-muted mt-2 d-block",
							children: "Alamat email diambil dari akun registrasi Anda."
						})
					]
				})
			})
		})] })]
	});
});
//#endregion
//#region src/components/ui/WebcamCaptureField.jsx
var import_react_webcam = /* @__PURE__ */ __toESM(require_react_webcam());
var getPhotoStatus = (photoData) => {
	return photoData ? "Foto Telah Diambil" : "Belum Diambil";
};
function WebcamCaptureField({ fieldName, label, capturedImage, setCapturedImage, isInvalid, errorText, defaultFacingMode = "user" }) {
	const webcamRef = (0, import_react.useRef)(null);
	const [isCameraActive, setIsCameraActive] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [facingMode, setFacingMode] = (0, import_react.useState)(defaultFacingMode);
	const handleToggleCamera = (0, import_react.useCallback)(() => {
		if (isCameraActive) setLoading(false);
		setIsCameraActive((prev) => !prev);
	}, [isCameraActive]);
	const handleCapture = (0, import_react.useCallback)(() => {
		if (webcamRef.current) {
			setLoading(true);
			setCapturedImage(fieldName, webcamRef.current.getScreenshot());
			setIsCameraActive(false);
			setLoading(false);
		}
	}, [fieldName, setCapturedImage]);
	const handleRetake = (0, import_react.useCallback)(() => {
		setCapturedImage(fieldName, null);
		setIsCameraActive(true);
	}, [fieldName, setCapturedImage]);
	const handleSwitchCamera = (0, import_react.useCallback)(() => {
		setFacingMode((prev) => prev === "user" ? "environment" : "user");
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "d-flex justify-content-between align-items-center mb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
					className: "mb-0",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `badge bg-${capturedImage ? "success" : "secondary"} text-white`,
					children: getPhotoStatus(capturedImage)
				})]
			}),
			!capturedImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default, {
				className: `mb-3 text-center ${isInvalid ? "border-danger" : "border"}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, { children: [
					isCameraActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_webcam.default, {
						audio: false,
						ref: webcamRef,
						screenshotFormat: "image/jpeg",
						videoConstraints: { facingMode },
						className: "w-100 mb-3",
						style: {
							maxWidth: "100%",
							maxHeight: "300px",
							objectFit: "cover"
						}
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto border rounded d-flex align-items-center justify-content-center bg-light text-secondary mb-3",
						style: {
							height: "200px",
							width: "100%",
							border: "2px dashed #6c757d"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCamera, { size: 50 })
					}),
					isCameraActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "d-flex justify-content-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "primary",
								onClick: handleCapture,
								disabled: loading,
								className: "me-2",
								children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
										animation: "border",
										size: "sm",
										className: "me-2"
									}),
									" ",
									"Mengambil..."
								] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCamera, { className: "me-2" }), " Ambil Foto"] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "secondary",
								onClick: handleSwitchCamera,
								className: "me-2",
								title: "Ganti Kamera",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaSyncAlt, { className: "me-2" }), " Ganti Kamera"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "danger",
								onClick: handleToggleCamera,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaTimes, { className: "me-2" }), " Tutup Kamera"]
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "info",
						onClick: handleToggleCamera,
						disabled: loading,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCamera, { className: "me-2" }), " Buka Kamera"]
					}),
					isInvalid && errorText && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
						className: "d-block text-danger mt-2",
						children: errorText
					})
				] })
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default, {
				className: "mb-3 text-center border-success",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: capturedImage,
						alt: `Foto ${label} Preview`,
						style: {
							maxWidth: "100%",
							maxHeight: "250px",
							objectFit: "contain",
							border: "1px solid #ddd"
						},
						className: "mb-3 rounded"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "fw-bold text-success mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheckCircle, { className: "me-2" }), " Foto berhasil diambil!"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "warning",
						onClick: handleRetake,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUndo, { className: "me-2" }), " Ambil Ulang Foto"]
					})
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Text, {
				className: "text-muted",
				children: "Pastikan wajah atau dokumen terlihat jelas dan tidak blur."
			})
		]
	});
}
//#endregion
//#region src/pages/anggota/RegistrationFormDetail/components/steps/Step3CaptureKTP.jsx
/**
* Komponen untuk mengambil foto KTP (Langkah 3).
* Dioptimasi dengan panduan visual dan UI modern.
*/
var Step3CaptureKTP_default = import_react.memo(function Step3CaptureKTP({ formData, setFormData, errors }) {
	const handleSetCapturedImage = (0, import_react.useCallback)((fieldName, base64Image) => {
		setFormData((prevData) => ({
			...prevData,
			[fieldName]: base64Image
		}));
	}, [setFormData]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "d-flex align-items-center mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "icon-box bg-soft-primary text-primary me-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCamera, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
				className: "fw-bold mb-0 text-dark",
				children: "Dokumentasi KTP"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
				className: "text-muted",
				children: "Ambil foto KTP asli untuk verifikasi identitas"
			})] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
			className: "g-4 align-items-stretch",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
				lg: 7,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-3 p-md-4 rounded-20 bg-white border shadow-sm h-100 d-flex flex-column justify-content-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebcamCaptureField, {
						fieldName: "foto_ktp",
						label: "Foto Kartu Tanda Penduduk (KTP)",
						capturedImage: formData.foto_ktp,
						setCapturedImage: handleSetCapturedImage,
						isInvalid: !!errors.foto_ktp,
						defaultFacingMode: "environment"
					}), !!errors.foto_ktp && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Control.Feedback, {
						type: "invalid",
						style: { display: "block" },
						className: "mt-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaInfoCircle, { className: "me-1" }),
							" ",
							errors.foto_ktp
						]
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
				lg: 5,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "requirement-items bg-light p-3 p-md-4 rounded-20 border h-100 d-flex flex-column justify-content-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
							className: "fw-bold text-dark mb-3",
							children: "Panduan Foto KTP:"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "list-unstyled mb-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "d-flex align-items-start mb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheckCircle, { className: "text-success mt-1 me-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "small",
										children: "KTP berada di dalam bingkai kamera."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "d-flex align-items-start mb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaLightbulb, { className: "text-warning mt-1 me-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "small",
										children: "Pastikan cahaya terang dan tidak ada pantulan lampu."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "d-flex align-items-start mb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheckCircle, { className: "text-success mt-1 me-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "small",
										children: "Teks dan foto pada KTP terbaca dengan jelas (tidak buram)."
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 text-center opacity-25",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaIdCard, { size: 80 })
						})
					]
				})
			})]
		})]
	});
});
//#endregion
//#region src/pages/anggota/RegistrationFormDetail/components/steps/Step4Swafoto.jsx
/**
* Komponen untuk mengambil Swafoto dengan KTP (Langkah 4).
* Dioptimasi dengan panduan visual agar verifikasi wajah lebih akurat.
*/
var Step4Swafoto_default = import_react.memo(function Step4Swafoto({ formData, setFormData, errors }) {
	const handleSetCapturedImage = (0, import_react.useCallback)((fieldName, base64Image) => {
		setFormData((prevData) => ({
			...prevData,
			[fieldName]: base64Image
		}));
	}, [setFormData]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "d-flex align-items-center mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "icon-box bg-soft-primary text-primary me-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUserShield, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
				className: "fw-bold mb-0 text-dark",
				children: "Verifikasi Wajah (Swafoto)"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
				className: "text-muted",
				children: "Pastikan identitas Anda valid dengan swafoto memegang KTP"
			})] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
			className: "g-4 align-items-stretch",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
				lg: 7,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-3 p-md-4 rounded-20 bg-white border shadow-sm h-100 d-flex flex-column justify-content-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebcamCaptureField, {
						fieldName: "foto_swafoto",
						label: "Ambil Swafoto",
						capturedImage: formData.foto_swafoto,
						setCapturedImage: handleSetCapturedImage,
						isInvalid: !!errors.foto_swafoto
					}), !!errors.foto_swafoto && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Control.Feedback, {
						type: "invalid",
						style: { display: "block" },
						className: "mt-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaExclamationTriangle, { className: "me-1" }),
							" ",
							errors.foto_swafoto
						]
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
				lg: 5,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "requirement-items bg-light p-3 p-md-4 rounded-20 border h-100 d-flex flex-column justify-content-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
							className: "fw-bold text-dark mb-3",
							children: "Instruksi Swafoto:"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "list-unstyled mb-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "d-flex align-items-start mb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheckCircle, { className: "text-success mt-1 me-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "small",
										children: "Pegang KTP di bawah dagu/depan dada."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "d-flex align-items-start mb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheckCircle, { className: "text-success mt-1 me-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "small",
										children: "Wajah dan data KTP harus terlihat jelas secara bersamaan."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "d-flex align-items-start mb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaLightbulb, { className: "text-warning mt-1 me-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "small",
										children: "Hindari penggunaan kacamata hitam, masker, atau topi."
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 text-center text-muted opacity-50",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Contoh Swafoto yang Benar" })
						})
					]
				})
			})]
		})]
	});
});
//#endregion
//#region src/pages/anggota/RegistrationFormDetail/components/steps/Step5Employment.jsx
var Step5Employment_default = import_react.memo(function Step5Employment({ formData, handleChange, errors }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "d-flex align-items-center mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "icon-box bg-soft-primary text-primary me-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaBriefcase, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
				className: "fw-bold mb-0 text-dark",
				children: "Informasi Pekerjaan"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
				className: "text-muted",
				children: "Data pekerjaan atau usaha Anda saat ini"
			})] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
			className: "g-3 mb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
				md: 6,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Label, {
					className: "fw-bold small mb-2",
					children: ["Pekerjaan ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-danger",
						children: "*"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup_default, {
					className: "shadow-sm rounded-12 overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup_default.Text, {
							className: "bg-white border-0 py-2 ps-3 text-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaBriefcase, { size: 14 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
							type: "text",
							name: "occupation",
							value: formData.occupation || "",
							onChange: handleChange,
							isInvalid: !!errors.occupation,
							className: "border-0 py-2",
							placeholder: "Contoh: Pegawai Swasta, Wiraswasta"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control.Feedback, {
							type: "invalid",
							tooltip: true,
							children: errors.occupation
						})
					]
				})] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
				md: 6,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Label, {
					className: "fw-bold small mb-2",
					children: ["Nama Perusahaan / Tempat Bekerja ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-danger",
						children: "*"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup_default, {
					className: "shadow-sm rounded-12 overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup_default.Text, {
							className: "bg-white border-0 py-2 ps-3 text-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaBuilding, { size: 14 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
							type: "text",
							name: "employer_name",
							value: formData.employer_name || "",
							onChange: handleChange,
							isInvalid: !!errors.employer_name,
							className: "border-0 py-2",
							placeholder: "Contoh: PT ABC Sentosa"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control.Feedback, {
							type: "invalid",
							tooltip: true,
							children: errors.employer_name
						})
					]
				})] })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
			className: "g-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
				xs: 12,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Label, {
					className: "fw-bold small mb-2",
					children: ["Alamat Perusahaan / Tempat Bekerja ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-danger",
						children: "*"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup_default, {
					className: "shadow-sm rounded-12 overflow-hidden align-items-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup_default.Text, {
							className: "bg-white border-0 py-3 ps-3 text-muted h-100",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaMapMarkerAlt, { size: 14 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
							as: "textarea",
							rows: 3,
							name: "employer_address",
							value: formData.employer_address || "",
							onChange: handleChange,
							isInvalid: !!errors.employer_address,
							className: "border-0 py-3 pe-4",
							placeholder: "Masukkan Alamat Lengkap Tempat Bekerja"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control.Feedback, {
							type: "invalid",
							tooltip: true,
							children: errors.employer_address
						})
					]
				})] })
			})
		})] })]
	});
});
//#endregion
//#region src/pages/anggota/RegistrationFormDetail/components/steps/Step6EmergencyContact.jsx
var Step6EmergencyContact_default = import_react.memo(function Step6EmergencyContact({ formData, handleChange, errors }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "d-flex align-items-center mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "icon-box bg-soft-primary text-primary me-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUserFriends, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
				className: "fw-bold mb-0 text-dark",
				children: "Kontak Darurat"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
				className: "text-muted",
				children: "Informasi yang dapat dihubungi dalam situasi darurat"
			})] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
			className: "g-3 mb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
				md: 6,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Label, {
					className: "fw-bold small mb-2",
					children: ["Nama Kontak Darurat ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-danger",
						children: "*"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup_default, {
					className: "shadow-sm rounded-12 overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup_default.Text, {
							className: "bg-white border-0 py-2 ps-3 text-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUserFriends, { size: 14 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
							type: "text",
							name: "contact_name",
							value: formData.contact_name || "",
							onChange: handleChange,
							isInvalid: !!errors.contact_name,
							className: "border-0 py-2",
							placeholder: "Nama Lengkap Kontak Darurat"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control.Feedback, {
							type: "invalid",
							tooltip: true,
							children: errors.contact_name
						})
					]
				})] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
				md: 6,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Label, {
					className: "fw-bold small mb-2",
					children: ["No. HP Kontak Darurat ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-danger",
						children: "*"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup_default, {
					className: "shadow-sm rounded-12 overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup_default.Text, {
							className: "bg-white border-0 py-2 ps-3 text-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaPhoneAlt, { size: 14 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
							type: "tel",
							name: "phone_number_emergency",
							value: formData.phone_number_emergency || "",
							onChange: handleChange,
							isInvalid: !!errors.phone_number_emergency,
							className: "border-0 py-2",
							placeholder: "Contoh: 08123456789"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control.Feedback, {
							type: "invalid",
							tooltip: true,
							children: errors.phone_number_emergency
						})
					]
				})] })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
			className: "g-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
				md: 6,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Label, {
					className: "fw-bold small mb-2",
					children: ["Hubungan dengan Anda ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-danger",
						children: "*"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup_default, {
					className: "shadow-sm rounded-12 overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup_default.Text, {
							className: "bg-white border-0 py-2 ps-3 text-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaLink, { size: 14 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
							type: "text",
							name: "relation",
							value: formData.relation || "",
							onChange: handleChange,
							isInvalid: !!errors.relation,
							className: "border-0 py-2",
							placeholder: "Contoh: Saudara Kandung, Suami/Istri, Teman"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control.Feedback, {
							type: "invalid",
							tooltip: true,
							children: errors.relation
						})
					]
				})] })
			})
		})] })]
	});
});
//#endregion
//#region src/pages/anggota/RegistrationFormDetail/components/steps/Step7BankData.jsx
var Step7BankData_default = import_react.memo(function Step7BankData({ formData, handleChange, errors }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "d-flex align-items-center mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "icon-box bg-soft-primary text-primary me-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUniversity, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
				className: "fw-bold mb-0 text-dark",
				children: "Informasi Rekening Bank"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
				className: "text-muted",
				children: "Data rekening untuk transaksi keuangan koperasi"
			})] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
			className: "g-3 mb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
				md: 6,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Label, {
					className: "fw-bold small mb-2",
					children: ["Nama Bank ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-danger",
						children: "*"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup_default, {
					className: "shadow-sm rounded-12 overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup_default.Text, {
							className: "bg-white border-0 py-2 ps-3 text-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUniversity, { size: 14 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
							type: "text",
							name: "bank_name",
							value: formData.bank_name || "",
							onChange: handleChange,
							isInvalid: !!errors.bank_name,
							className: "border-0 py-2",
							placeholder: "Contoh: Bank Mandiri"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control.Feedback, {
							type: "invalid",
							tooltip: true,
							children: errors.bank_name
						})
					]
				})] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
				md: 6,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Label, {
					className: "fw-bold small mb-2",
					children: ["Nomor Rekening ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-danger",
						children: "*"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup_default, {
					className: "shadow-sm rounded-12 overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup_default.Text, {
							className: "bg-white border-0 py-2 ps-3 text-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCreditCard, { size: 14 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
							type: "text",
							name: "bank_account_no",
							value: formData.bank_account_no || "",
							onChange: handleChange,
							isInvalid: !!errors.bank_account_no,
							className: "border-0 py-2",
							placeholder: "Masukkan Nomor Rekening"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control.Feedback, {
							type: "invalid",
							tooltip: true,
							children: errors.bank_account_no
						})
					]
				})] })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
			className: "g-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
				md: 6,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Label, {
						className: "fw-bold small mb-2",
						children: ["Nama Pemilik Rekening ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-danger",
							children: "*"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup_default, {
						className: "shadow-sm rounded-12 overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup_default.Text, {
								className: "bg-white border-0 py-2 ps-3 text-muted",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUserCircle, { size: 14 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
								type: "text",
								name: "account_holder",
								value: formData.account_holder || "",
								onChange: handleChange,
								isInvalid: !!errors.account_holder,
								className: "border-0 py-2",
								placeholder: "Nama Pemilik Rekening Sesuai Buku Tabungan"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control.Feedback, {
								type: "invalid",
								tooltip: true,
								children: errors.account_holder
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
						className: "text-muted mt-2 d-block",
						children: "Pastikan nama pemilik sesuai dengan identitas KTP."
					})
				] })
			})
		})] })]
	});
});
//#endregion
//#region src/pages/anggota/RegistrationFormDetail/components/steps/PhotoDisplay.jsx
var PhotoDisplay_default = import_react.memo(function PhotoDisplay({ label, base64Image: imageSource }) {
	const PlaceholderIcon = label === "KTP" ? FaIdCard : FaCamera;
	const src = imageSource;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "text-center p-2 border rounded-12 bg-light shadow-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "small fw-bold text-muted mb-2",
			children: label
		}), src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src,
			alt: label,
			className: "img-fluid rounded border shadow-sm",
			style: {
				height: "140px",
				width: "100%",
				objectFit: "contain",
				backgroundColor: "#000"
			},
			onError: (e) => {
				e.target.onerror = null;
				e.target.src = "https://placehold.co/400x300?text=Error+Loading+Image";
			}
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border rounded-8 bg-white d-flex align-items-center justify-content-center",
			style: { height: "140px" },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderIcon, {
				size: 30,
				className: "opacity-25"
			})
		})]
	});
});
//#endregion
//#region src/pages/anggota/RegistrationFormDetail/components/steps/Step8Summary.jsx
var DetailItem = ({ label, value }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "d-flex justify-content-between align-items-center py-2 px-1 border-bottom border-light flex-wrap",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-muted small fw-medium me-2",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "fw-semibold text-dark text-end small text-break",
		style: {
			maxWidth: "100%",
			flex: "1 1 auto",
			textAlign: "right"
		},
		children: value || "-"
	})]
});
var SectionWrapper = ({ title, icon: Icon, onEdit, children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "bg-white rounded-20 border shadow-sm p-2 p-md-3 mb-3 h-100 d-flex flex-column",
	style: { borderColor: "#f1f5f9" },
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "d-flex justify-content-between align-items-center border-bottom pb-2 mb-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h6", {
			className: "fw-bold mb-0 text-dark d-flex align-items-center",
			style: { fontSize: "14px" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "bg-soft-primary text-primary rounded-8 p-2 me-2 d-inline-flex align-items-center justify-content-center",
				style: {
					width: "32px",
					height: "32px"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 14 })
			}), title]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "outline-primary",
			size: "sm",
			className: "px-3 py-1 rounded-pill fw-semibold border-1",
			style: {
				fontSize: "11px",
				transition: "all 0.2s"
			},
			onClick: onEdit,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaEdit, {
				className: "me-1",
				size: 10
			}), " Edit"]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex-grow-1",
		children
	})]
});
var Step8Summary_default = import_react.memo(function Step8Summary({ formData, handleEditStep, isCommitmentChecked, setIsCommitmentChecked }) {
	const memberTypeMap = {
		5: "Reguler",
		6: "Anggota Luar Biasa"
	};
	const fullAddress = `
    ${formData.alamat_ktp || ""} 
    RT.${formData.rt || "00"}/RW.${formData.rw || "00"}, 
    ${formData.kelurahan || "-"}, ${formData.kecamatan || "-"}, 
    ${formData.kota_kab || "-"}, ${formData.provinsi || "-"}
  `.replace(/\s+/g, " ").trim();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "d-flex align-items-center mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "icon-box bg-soft-primary text-primary me-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaClipboardCheck, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
					className: "fw-bold mb-0 text-dark",
					children: "Ringkasan Permohonan"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
					className: "text-muted",
					children: "Tinjau kembali seluruh data Anda sebelum dikirimkan ke pengurus"
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
				className: "g-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
					lg: 6,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionWrapper, {
								title: "Data Pribadi",
								icon: FaUser,
								onEdit: () => handleEditStep(1),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "d-flex flex-column gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailItem, {
											label: "Nama Lengkap",
											value: formData.full_name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailItem, {
											label: "NIK KTP",
											value: formData.nik_ktp
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailItem, {
											label: "Alamat KTP",
											value: fullAddress
										})
									]
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionWrapper, {
								title: "Informasi Akun",
								icon: FaUserCircle,
								onEdit: () => handleEditStep(2),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "d-flex flex-column gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailItem, {
											label: "Tipe Anggota",
											value: memberTypeMap[formData.tipeAnggota]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailItem, {
											label: "Alamat Email",
											value: formData.email
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailItem, {
											label: "No. WhatsApp / HP",
											value: formData.phone_number
										})
									]
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionWrapper, {
								title: "Rekening Bank",
								icon: FaCreditCard,
								onEdit: () => handleEditStep(7),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "d-flex flex-column gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailItem, {
											label: "Nama Bank",
											value: formData.bank_name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailItem, {
											label: "Nomor Rekening",
											value: formData.bank_account_no || formData.account_number
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailItem, {
											label: "Pemilik Rekening",
											value: formData.account_holder
										})
									]
								})
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
					lg: 6,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionWrapper, {
								title: "Dokumen Foto",
								icon: FaCamera,
								onEdit: () => handleEditStep(3),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
									className: "g-3 mt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
										xs: 6,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoDisplay_default, {
											base64Image: formData.foto_ktp || formData.ktp_photo,
											label: "KTP"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
										xs: 6,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoDisplay_default, {
											base64Image: formData.foto_swafoto || formData.selfie_photo,
											label: "Swafoto"
										})
									})]
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionWrapper, {
								title: "Pekerjaan",
								icon: FaBriefcase,
								onEdit: () => handleEditStep(5),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "d-flex flex-column gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailItem, {
											label: "Pekerjaan",
											value: formData.occupation || formData.job_title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailItem, {
											label: "Tempat Bekerja",
											value: formData.employer_name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailItem, {
											label: "Alamat Kantor",
											value: formData.employer_address
										})
									]
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionWrapper, {
								title: "Kontak Darurat",
								icon: FaUserFriends,
								onEdit: () => handleEditStep(6),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "d-flex flex-column gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailItem, {
											label: "Nama Kontak",
											value: formData.contact_name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailItem, {
											label: "No. Handphone",
											value: formData.phone_number_emergency
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailItem, {
											label: "Hubungan",
											value: formData.relation
										})
									]
								})
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 p-2 p-md-3 rounded-20 bg-white border shadow-sm",
				style: { borderColor: "#f1f5f9" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-start border-4 border-info rounded-12 shadow-sm p-2 p-md-3 mb-3 bg-white d-flex align-items-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaInfoCircle, {
						className: "text-info me-2 mt-1 flex-shrink-0",
						size: 16
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "small text-muted",
						style: { lineHeight: "1.6" },
						children: [
							"Dengan menekan tombol ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Kirim Sekarang" }),
							", Anda menyatakan telah membaca, memahami, dan menyetujui seluruh Anggaran Dasar serta Anggaran Rumah Tangga (AD/ART) Koperasi Paguyuban Usaha Sukses."
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `p-3 p-md-4 rounded-12 border shadow-sm d-flex align-items-center ${isCommitmentChecked ? "bg-primary bg-opacity-10 border-primary" : "bg-white"}`,
					style: {
						cursor: "pointer",
						transition: "all 0.3s ease"
					},
					onClick: () => setIsCommitmentChecked(!isCommitmentChecked),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Check, {
						type: "checkbox",
						id: "commitmentCheck",
						checked: isCommitmentChecked,
						onChange: (e) => {},
						style: {
							transform: "scale(1.2)",
							pointerEvents: "none"
						},
						className: "mb-0 m-0"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "small fw-bold text-dark ms-3",
						style: { userSelect: "none" },
						children: [
							"Saya menyatakan bahwa seluruh data yang saya masukkan adalah ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-primary",
								children: "benar, valid"
							}),
							", dan dapat dipertanggungjawabkan sesuai hukum yang berlaku."
						]
					})]
				})]
			})
		]
	});
});
//#endregion
//#region src/pages/anggota/RegistrationFormDetail/components/RegistrationStepContent.jsx
function RegistrationStepContent({ step, formData, errors, handleChange, setFormData, handleSetCapturedImage, isCommitmentChecked, setIsCommitmentChecked, setStep }) {
	const commonProps = {
		formData,
		handleChange,
		errors,
		setFormData,
		handleSetCapturedImage
	};
	switch (step) {
		case 1: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step1PersonalData_default, { ...commonProps });
		case 2: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step2Account_default, {
			...commonProps,
			isDataLoaded: false
		});
		case 3: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step3CaptureKTP_default, { ...commonProps });
		case 4: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step4Swafoto_default, { ...commonProps });
		case 5: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step5Employment_default, { ...commonProps });
		case 6: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step6EmergencyContact_default, { ...commonProps });
		case 7: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step7BankData_default, { ...commonProps });
		case 8: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step8Summary_default, {
			...commonProps,
			isCommitmentChecked,
			setIsCommitmentChecked,
			handleEditStep: setStep
		});
		default: return null;
	}
}
RegistrationStepContent.propTypes = {
	step: import_prop_types.default.number.isRequired,
	formData: import_prop_types.default.object.isRequired,
	errors: import_prop_types.default.object.isRequired,
	handleChange: import_prop_types.default.func.isRequired,
	setFormData: import_prop_types.default.func.isRequired,
	handleSetCapturedImage: import_prop_types.default.func.isRequired,
	isCommitmentChecked: import_prop_types.default.bool.isRequired,
	setIsCommitmentChecked: import_prop_types.default.func.isRequired,
	setStep: import_prop_types.default.func.isRequired
};
//#endregion
//#region src/pages/anggota/RegistrationFormDetail/components/RegistrationFormFooter.jsx
function RegistrationFormFooter({ step, isLastStep, isSubmitting, isCommitmentChecked, onBack, onPrev, onNext, onSubmit }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "d-flex justify-content-between align-items-center mt-5 pt-4 border-top",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: step === 1 ? "outline-danger" : "light",
			className: `px-4 py-2 fw-bold rounded-12 ${step === 1 ? "text-danger" : "text-muted"}`,
			onClick: () => step === 1 ? onBack() : onPrev(),
			disabled: isSubmitting,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaArrowLeft, { className: "me-2" }), step === 1 ? "Batalkan" : "Sebelumnya"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "d-flex align-items-center gap-2",
			children: isLastStep ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "primary",
				className: "px-4 px-md-5 py-2 fw-bold shadow-sm rounded-12",
				onClick: onSubmit,
				disabled: !isCommitmentChecked || isSubmitting,
				children: isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
					size: "sm",
					className: "me-2",
					animation: "border"
				}), "Mengirim..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaSave, { className: "me-2" }), " Kirim Sekarang"] })
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "primary",
				className: "px-4 px-md-5 py-2 fw-bold shadow-sm rounded-12",
				onClick: onNext,
				children: ["Selanjutnya ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaArrowRight, { className: "ms-2" })]
			})
		})]
	});
}
RegistrationFormFooter.propTypes = {
	step: import_prop_types.default.number.isRequired,
	isLastStep: import_prop_types.default.bool.isRequired,
	isSubmitting: import_prop_types.default.bool.isRequired,
	isCommitmentChecked: import_prop_types.default.bool.isRequired,
	onBack: import_prop_types.default.func.isRequired,
	onPrev: import_prop_types.default.func.isRequired,
	onNext: import_prop_types.default.func.isRequired,
	onSubmit: import_prop_types.default.func.isRequired
};
//#endregion
//#region src/pages/anggota/RegistrationFormDetail/pages/RegistrationFormDetail.jsx
function RegistrationFormDetail() {
	const navigate = useNavigate();
	const stepContainerRef = (0, import_react.useRef)(null);
	const { userData } = useProfile();
	const [step, setStep] = (0, import_react.useState)(1);
	const [formData, setFormData] = (0, import_react.useState)(() => {
		const saved = localStorage.getItem("temp_reg_data");
		return saved ? JSON.parse(saved) : {};
	});
	const [errors, setErrors] = (0, import_react.useState)({});
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const [isCommitmentChecked, setIsCommitmentChecked] = (0, import_react.useState)(false);
	const [submitError, setSubmitError] = (0, import_react.useState)(null);
	const isLastStep = step === 8;
	const progressPercent = step / 8 * 100;
	(0, import_react.useEffect)(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}, [step]);
	(0, import_react.useEffect)(() => {
		if (userData) setFormData((prev) => {
			let updated = false;
			const next = { ...prev };
			if (userData.phone_number && prev.phone_number !== userData.phone_number) {
				next.phone_number = userData.phone_number;
				updated = true;
			}
			if (userData.email && prev.email !== userData.email) {
				next.email = userData.email;
				updated = true;
			}
			return updated ? next : prev;
		});
	}, [userData]);
	(0, import_react.useEffect)(() => {
		localStorage.setItem("temp_reg_data", JSON.stringify(formData));
	}, [formData]);
	const handleBack = (0, import_react.useCallback)(() => {
		navigate(`/${jwtEncode({ page: "registrationPage" })}`);
	}, [navigate]);
	const handleChange = (0, import_react.useCallback)((e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value
		}));
		setErrors((prev) => ({
			...prev,
			[name]: void 0
		}));
	}, []);
	const handleSetCapturedImage = (0, import_react.useCallback)((fieldName, base64Image) => {
		setFormData((prev) => ({
			...prev,
			[fieldName]: base64Image
		}));
		setErrors((prev) => ({
			...prev,
			[fieldName]: void 0
		}));
	}, []);
	const nextStep = (0, import_react.useCallback)(() => {
		const currentErrors = validateStep(step, formData);
		if (Object.keys(currentErrors).length > 0) {
			setErrors(currentErrors);
			return;
		}
		setErrors({});
		if (step < 8) setStep((s) => s + 1);
	}, [step, formData]);
	const prevStep = (0, import_react.useCallback)(() => {
		setErrors({});
		if (step > 1) setStep((s) => s - 1);
	}, [step]);
	const handleSubmit = (0, import_react.useCallback)(async () => {
		if (!isCommitmentChecked) return;
		const finalErrors = {};
		for (let i = 1; i < 8; i += 1) Object.assign(finalErrors, validateStep(i, formData));
		if (Object.keys(finalErrors).length > 0) {
			setErrors(finalErrors);
			setSubmitError("Masih ada data yang belum lengkap. Silakan cek kembali.");
			return;
		}
		setIsSubmitting(true);
		setSubmitError(null);
		try {
			const response = await AnggotaService.submitRegistration(formData);
			if (response.data?.status === true) {
				localStorage.removeItem("temp_reg_data");
				const regLink = `/${jwtEncode({ page: "registrationPage" })}`;
				import_sweetalert2_all.default.fire({
					icon: "success",
					title: "Berhasil",
					html: `Pengajuan pendaftaran anggota berhasil dikirim.<br><br><a href="${regLink}" class="btn btn-primary btn-sm mt-2">Lihat Status Pendaftaran</a>`,
					showConfirmButton: false,
					showCloseButton: true
				});
			} else setSubmitError(response.data?.message || "Gagal mengirim data permohonan.");
		} catch (err) {
			setSubmitError(err?.response?.data?.message || "Terjadi kesalahan sistem saat pengiriman data.");
		} finally {
			setIsSubmitting(false);
		}
	}, [isCommitmentChecked, formData]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pb-5 dash-fade-in dashboard-shell",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				className: "g-0 justify-content-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
					xs: 12,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default, {
						className: "border-0 shadow-none rounded-0 overflow-hidden min-vh-100",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegistrationProgressBar, {
							step,
							totalSteps: 8,
							stepLabels: STEP_LABELS,
							progressPercent,
							onStepClick: setStep
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardBody, {
							className: "p-3 p-md-4 pt-0",
							children: [
								submitError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SwalAlert, {
									variant: "danger",
									className: "rounded-12 border-0 shadow-sm d-flex align-items-center",
									dismissible: true,
									onClose: () => setSubmitError(null),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaFileSignature, { className: "me-2" }), submitError]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "step-container",
									ref: stepContainerRef,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegistrationStepContent, {
										step,
										formData,
										errors,
										handleChange,
										setFormData,
										handleSetCapturedImage,
										isCommitmentChecked,
										setIsCommitmentChecked,
										setStep
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegistrationFormFooter, {
									step,
									isLastStep,
									isSubmitting,
									isCommitmentChecked,
									onBack: handleBack,
									onPrev: prevStep,
									onNext: nextStep,
									onSubmit: handleSubmit
								})
							]
						})]
					})
				})
			})
		})
	});
}
//#endregion
export { RegistrationFormDetail as default };
