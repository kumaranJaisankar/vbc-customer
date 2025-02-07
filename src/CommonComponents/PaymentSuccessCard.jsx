import React from "react";
import { FiCheckCircle } from "react-icons/fi";
const successStyle = {
  borderRadius: "200px",
  height: "200px",
  width: "200px",
  background: "#F8FAF5",
  margin: "0 auto",
};

const checkIconStyle = {
  width: "35px",
  height: "35px",
  color: "#42ba96",
};
export const PaymentSuccess = () => {
  return (
    <>
      <div className="success-card">
        <div style={{ successStyle }} className="flex align-center justify-center">
          <FiCheckCircle style={{ ...checkIconStyle }} />
        </div>
        <h1 className={"success-color"}>Success</h1>
        <p>
          We received your purchase request;
          <br /> we'll be in touch shortly!
        </p>
      </div>
    </>
  );
};
