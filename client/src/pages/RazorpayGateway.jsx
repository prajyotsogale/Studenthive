import React, { useEffect } from "react";
import { useSupplier } from "../context/Refresh";
import { useLocation } from "react-router-dom";


const RazorpayGateway = () => {
    const location = useLocation();


    const price = location.state?.price || 0;

    console.log(price)
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.setAttribute("data-key", "rzp_live_Cj4Nty3eyy07Vi");
    script.setAttribute("data-amount", price * 100);
    script.setAttribute("data-currency", "INR");
    script.setAttribute("data-id", `order_${Math.floor(Math.random() * (100 - 10 + 1)) + 10}`);
    script.setAttribute("data-buttontext", "Pay with Razorpay");
    script.setAttribute("data-name", "StudentHive Corp");
    script.setAttribute("data-description", "Monthly Subscription");
    script.setAttribute("data-image", "https://github.com/prajyotsogale/Studenthive/blob/main/client/public/assets/logo.png");
    script.setAttribute("data-prefill.name", "Gaurav Kumar");
    script.setAttribute("data-prefill.email", "gaurav.kumar@example.com");
    script.setAttribute("data-theme.color", "#F37254");
    document.getElementById("razorpay-form").appendChild(script);
  }, []);

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f8f9fa",
    padding: "20px",
  };

  const cardStyle = {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    maxWidth: "400px",
    width: "100%",
  };

  const buttonStyle = {
    display: "inline-block",
    padding: "12px 20px",
    marginTop: "20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background 0.3s ease",
  };

  const buttonHover = {
    backgroundColor: "#0056b3",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ color: "#333" }}>Payment Checkout</h2>
        <form id="razorpay-form" action="https://www.studenthive.college" method="POST">
          {/* <input type="hidden" custom="Hidden Element" name="hidden" /> */}
          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
          >
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
};
export default RazorpayGateway;
