import React, { useEffect } from "react";
import "../styles/checkout.scss";
import { useGetListingDetails } from "../hooks/listing";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateBooking } from "../hooks/booking";


const RequestToBookPage = () => {
  const { id } = useParams();
  const {createBooking} = useCreateBooking();
  const navigate = useNavigate();
  const { getListingDetails, listing, loading } = useGetListingDetails();

  // Fetch listing details
  useEffect(() => {
    getListingDetails(id);
  }, [id]);

  // Retrieve stored booking details
  const month = localStorage.getItem("months") || 1;
  const startDateStr = localStorage.getItem("startDate");
  const endDateStr = localStorage.getItem("endDate");

  // Ensure valid date parsing
  const startDate = startDateStr ? new Date(startDateStr) : null;
  const endDate = endDateStr ? new Date(endDateStr) : null;

  // Function to format dates properly
  const formatDate = (date) => (date && !isNaN(date.getTime()) ? date.toLocaleDateString("en-GB") : "Invalid Date");

  // Price Calculation
  const basePrice = listing?.price ? listing.price * month : 0;
  const serviceFee = basePrice * 0.02;
  const taxAmount = basePrice * 0.05;
  const totalPrice = basePrice + serviceFee + taxAmount;
  localStorage.setItem("price", totalPrice);
  const bookingForm = {
    listingId : listing?._id ,
    hostId : listing?.creator?._id ,
    startDate: startDateStr,
    endDate: endDateStr ,
    totalPrice,
  }
  // Handle Booking Button Click
  const handleOnClick = async() => {
    const result = await createBooking(bookingForm);
    navigate("/raz");
  }



  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <a href="#" className="back-link">&#8592;</a>
        <h1>Request to Book</h1>
      </div>

      {/* Content */}
      <div className="content">
        <div className="main-content">
          {/* Trip Details */}
          <div className="trip-details">
            <h2>Your Trip</h2>
            <div className="detail-row">
              <div className="detail-header">
                <div>
                  <p className="detail-label">Dates</p>
                  <p>{formatDate(startDate)} - {formatDate(endDate)}</p>
                </div>
                <a href="#" className="link-edit">Edit</a>
              </div>
            </div>
            <div className="detail-row">
              <div className="detail-header">
                <div>
                  <p className="detail-label">Guests</p>
                  <p>1 guest</p>
                </div>
                <a href="#" className="link-edit">Edit</a>
              </div>
            </div>
          </div>
        </div>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Property Card */}
          {listing && (
            <div className="card-property">
              <div className="info-property">
                <div className="image-property">
                  <img src={listing.listingPhoto?.[0]} alt="Property" />
                </div>
                <div>
                  <h3 className="name-property">{listing.title}</h3>
                  <p className="type-property">Bed Count: {listing.bedroomCount}</p>
                  <p className="rating-property">
                    <span className="icon-star">★</span> 4.91 (33 reviews) • <span className="label-superhost">Superhost</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Price Details */}
          {listing && (
            <div className="details-price">
              <h3>Price Details</h3>
              <div className="row-price border-bottom">
                <span>₹{listing.price} x {month} months</span>
                <span>₹{basePrice.toFixed(2)}</span>
              </div>
              <div className="row-price border-bottom">
                <span>Service fee (2%)</span>
                <span>₹{serviceFee.toFixed(2)}</span>
              </div>
              <div className="row-price border-bottom">
                <span>Taxes (5%)</span>
                <span>₹{taxAmount.toFixed(2)}</span>
              </div>
              <div className="row-price text-total">
                <span>Total (INR)</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="row-price text-total">
                <button className="button-book" onClick={handleOnClick}>Book</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestToBookPage;
