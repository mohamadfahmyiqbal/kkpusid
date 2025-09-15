import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import UInvoice from "../../../utils/UInvoice";

// Mapping method ke logo
const paymentLogos = {
  credit_card: "../assets/logo/credit-card.png",
  bank_transfer: "../assets/logo/bank.png",
  gopay: "../assets/logo/gopay.png",
  shopeepay: "../assets/logo/shopeepay.png",
  bca_va: "../assets/logo/bca.png",
  bni_va: "../assets/logo/bni.png",
  bri_va: "../assets/logo/bri.png",
  permata_va: "../assets/logo/permata.png",
  other_va: "../assets/logo/other.png",
  akulaku: "../assets/logo/akulaku.png",
  indomaret: "../assets/logo/indomaret.png",
  alfamart: "../assets/logo/alfamart.png",
  echannel: "../assets/logo/echannel.png",
  qris: "../assets/logo/qris.png",
  default: "../assets/logo/default-payment.png",
};

// Custom Option untuk render logo + text
const Option = (props) => (
  <components.Option {...props}>
    <div className="d-flex align-items-center">
      <img
        src={paymentLogos[props.data.value] || paymentLogos.default}
        alt={props.data.label}
        style={{ width: 30, height: 30, objectFit: "contain", marginRight: 10 }}
      />
      <div>
        <div className="fw-bold">{props.data.label}</div>
        <small className="text-muted">
          {props.data.feeText} | {props.data.description}
        </small>
      </div>
    </div>
  </components.Option>
);

// Custom SingleValue (yang tampil di box select setelah dipilih)
const SingleValue = (props) => (
  <components.SingleValue {...props}>
    <div className="d-flex align-items-center">
      <img
        src={paymentLogos[props.data.value] || paymentLogos.default}
        alt={props.data.label}
        style={{ width: 25, height: 25, objectFit: "contain", marginRight: 10 }}
      />
      <span>{props.data.label}</span>
    </div>
  </components.SingleValue>
);

export default function PaymentMethods({
  paymentStatus,
  selectedMethod,
  onPay,
  token,
}) {
  const [methods, setMethods] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPaymentFees = async () => {
      if (!token) return;

      try {
        setLoading(true);
        const res = await UInvoice.getPaymentFees({ token });

        if (res?.data?.data) {
          setMethods(res.data.data);
        }
      } catch (error) {
        console.error("Gagal mengambil metode pembayaran:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentFees();
  }, [token]);

  if (loading) return <div>Memuat metode pembayaran...</div>;
  if (!methods || methods.length === 0) return null;

  // Ubah data ke format react-select
  const options = methods.map((method) => ({
    value: method.payment_method,
    label: method.payment_method.replace("_", " "),
    description: method.description,
    feeText:
      method.fee_type === "percentage"
        ? `${method.fee_value}%`
        : `Rp ${parseFloat(method.fee_value).toLocaleString("id-ID")}`,
    raw: method, // simpan full object supaya gampang diambil saat dipilih
  }));

  // Cari selected option
  const selectedOption = options.find((opt) => opt.value === selectedMethod);

  return (
    <div className="mt-4">
      <h5 className="fw-bold">Available Payment Methods:</h5>
      <Select
        isDisabled={paymentStatus === "PAID"}
        options={options}
        value={selectedOption || null}
        onChange={(option) => onPay(option.raw)}
        components={{ Option, SingleValue }}
        placeholder="Pilih metode pembayaran..."
      />
    </div>
  );
}
