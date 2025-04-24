import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Success.scss"; // Add a corresponding CSS file for styling
import { AiOutlineCheckCircle } from "react-icons/ai";


const Success = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); // Navigate to the home page or any other relevant page
  };

  return (
    <div className="success-container">
      <div className="success-card">
        <AiOutlineCheckCircle className="success-icon" />
        <h1>Payment Successful!</h1>
        <p>Thank you for your payment. Your transaction has been completed successfully.</p>
        <button className="success-button" onClick={handleGoHome}>
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Success;