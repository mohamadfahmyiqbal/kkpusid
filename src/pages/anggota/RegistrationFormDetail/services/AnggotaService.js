import http from "../../../../utils/api/common";

const submitRegistration = (formData) => {
  return http.post("/anggota/pendaftaran", formData, {
    timeout: 30000,
  });
};

export default { submitRegistration };
