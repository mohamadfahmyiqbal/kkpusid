import { toast } from "react-toastify";

const getMessage = (res, customMsg) => {
  if (customMsg) return customMsg;
  if (res?.data?.message) return res.data.message;
  return "Terjadi kesalahan";
};

export default function notification(res, customMsg = "") {
  if (!res || typeof res.status !== "number") {
    toast.error("Tidak ada response dari server");
    return;
  }

  const msg = getMessage(res, customMsg);

  if ([200, 201].includes(res.status)) {
    toast.success(msg);
  } else if ([400, 404].includes(res.status)) {
    toast.warn(msg);
  } else if ([401, 403].includes(res.status)) {
    toast.error(msg);
  } else {
    toast.error(msg);
  }
}
