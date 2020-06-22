import React from "react";
import visa from "payment-icons/min/flat/visa.svg";
import mastercard from "payment-icons/min/flat/mastercard.svg";
import maestro from "payment-icons/min/flat/maestro.svg";
import amex from "payment-icons/min/flat/amex.svg";
import Logo from "../../ui/Logo";
const logo = (logoName) => (
  <span style={{ margin: 5, marginTop: 7.5 }}>
    <img width={40} alt={logoName} src={logoName} />
  </span>
);
const PaymentLogos = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <div style={{ marginTop: -5 }}>
      <Logo size="small" />
    </div>
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      {logo(visa)}
      {logo(mastercard)}
      {logo(maestro)}
      {logo(amex)}
    </div>
  </div>
);

export default PaymentLogos;
