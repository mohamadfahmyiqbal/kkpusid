import api from "../../../../utils/api/common";

export const loginService = {
  accountLogin(payload) {
    return api.post("/auth/accountLogin", payload);
  },
};

