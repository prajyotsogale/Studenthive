import React from "react";
import "../../styles/BookingRequestPage.css"; // Import CSS file
import { ChevronLeft, Mail } from "lucide-react";

const BookingRequestPage = () => {
  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <ChevronLeft className="icon" />
        <h1>Request to Book</h1>
      </div>

      <div className="grid">
        <div className="left-panel">
          {/* Trip Details */}
          <div className="trip-details">
            <h2>Your Trip</h2>

            <div className="detail-item">
              <div className="detail-label">Dates</div>
              <button className="edit-button">Edit</button>
              <div className="detail-value">23–28 Mar</div>
            </div>

            <div className="detail-item">
              <div className="detail-label">Guests</div>
              <button className="edit-button">Edit</button>
              <div className="detail-value">1 guest</div>
            </div>
          </div>

          {/* Login Section */}
          <div className="login-section">
            <h2>Log in or sign up to book</h2>

            <div className="country-selector">
              <div className="label">Country/Region</div>
              <div className="selector">
                <span>India (+91)</span>
                <ChevronLeft className="icon rotate" />
              </div>
            </div>

            <input type="text" className="input-field" placeholder="Phone number" />

            <p className="info-text">
              We'll call or text you to confirm your number. Standard message and data rates apply. 
              <span className="underline"> Privacy Policy</span>
            </p>

            <button className="primary-button">Continue</button>

            <div className="divider">
              <div className="line"></div>
              <span>or</span>
              <div className="line"></div>
            </div>

            <div className="social-login">
              <button className="social-button">Facebook</button>
              <button className="social-button">Google</button>
              <button className="social-button">Apple</button>
            </div>

            <button className="email-button">
              <Mail className="icon" />
              Continue with email
            </button>
          </div>
        </div>

        {/* Right Panel - Property Details */}
        <div className="right-panel">
          <div className="property-card">
            <div className="property-info">
              <img src="/placeholder.svg" alt="Property" className="property-image" />
              <div>
                <h3>Hemals Homestay @Cyan</h3>
                <p className="property-type">Room in farm stay</p>
                <div className="ratings">
                  <span>★ 4.91 (33 reviews)</span> • <span>♦️ Superhost</span>
                </div>
              </div>
            </div>

            {/* Price Details */}
            <h3>Price Details</h3>
            <div className="price-item">
              <span>₹4,000 x 5 nights</span>
              <span>₹20,000</span>
            </div>
            <div className="price-item">
              <span className="underline">Service Fee</span>
              <span>₹2,823.54</span>
            </div>
            <div className="price-item total">
              <span>Total (INR)</span>
              <span>₹25,223.54</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingRequestPage;
