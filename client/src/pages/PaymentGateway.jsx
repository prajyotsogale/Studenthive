import React, { useState } from "react";
import { useSupplier } from "../context/Refresh";

const PaymentGateway = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
  };

  const containerStyle = {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "14px",
    marginBottom: "15px",
  };

  const buttonStyle = {
    display: "block",
    width: "100%",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
  };
   const {price} = useSupplier();
    console.log(price)
  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: "center", color: "#007bff" }}>Checkout Details</h2>
      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>Full Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required style={inputStyle} />

        <label style={labelStyle}>Email Address</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required style={inputStyle} />

        <label style={labelStyle}>Phone Number</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required style={inputStyle} />

        <label style={labelStyle}>Shipping Address</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} required style={inputStyle} />

        <label style={labelStyle}>City</label>
        <input type="text" name="city" value={formData.city} onChange={handleChange} required style={inputStyle} />

        <label style={labelStyle}>State / Province</label>
        <input type="text" name="state" value={formData.state} onChange={handleChange} required style={inputStyle} />

        <label style={labelStyle}>Zip / Postal Code</label>
        <input type="text" name="zip" value={formData.zip} onChange={handleChange} required style={inputStyle} />

        <label style={labelStyle}>Card Number</label>
        <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} required style={inputStyle} />

        <label style={labelStyle}>Expiry Date</label>
        <input type="text" name="expiry" value={formData.expiry} onChange={handleChange} required style={inputStyle} />

        <label style={labelStyle}>CVC</label>
        <input type="text" name="cvc" value={formData.cvc} onChange={handleChange} required style={inputStyle} />

        <button type="submit" style={buttonStyle}>Proceed to Payment</button>
      </form>
    </div>
  );
};

export default PaymentGateway;
