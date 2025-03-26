import { useEffect, useState } from "react";
import "../styles/ListingDetails.scss";

import { addMonths } from "date-fns"; // ✅ Import fixed
import { useNavigate, useParams } from "react-router-dom";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import { useSupplier } from "../context/Refresh";
import { useGetListingDetails } from "../hooks/listing";
import { useCreateBooking } from "../hooks/booking";

const ListingDetails = () => {
  const { getListingDetails, listing, loading } = useGetListingDetails();
  const { createBooking } = useCreateBooking();
  const { listingId } = useParams();
  const navigate = useNavigate();
  const { setPrice } = useSupplier();
  const customerId = useSelector((state) => state?.user?._id);

  // ✅ Default stay duration in months
  const [months, setMonths] = useState(1);
  localStorage.setItem("months" , months);
  // ✅ Store booked date ranges from API
  const [bookedDateRanges, setBookedDateRanges] = useState([]);

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    getListingDetails(listingId);

    const fetchBooking = async () => {
      try {
        const response = await fetch(
          `https://studenthive.onrender.com/bookings/getbookings/${listingId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const bookings = await response.json();
        if (Array.isArray(bookings)) {
          const transformedBookings = bookings.map((booking) => ({
            start: new Date(booking.startDate),
            end: new Date(booking.endDate),
          }));
          setBookedDateRanges(transformedBookings);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBooking();
  }, [listingId]);

  // ✅ Disable booked date ranges
  const isDateDisabled = (date) => {
    return bookedDateRanges.some(
      (range) => date >= range.start && date <= range.end
    );
  };

  // ✅ Handle date selection & auto-set end date
  const handleSelect = (ranges) => {
    let start = new Date(ranges.selection.startDate);
    let end = addMonths(start, months); // ✅ Use `addMonths` instead of manual `.setMonth()`


    // ✅ Prevent booking overlap with booked dates
    for (let range of bookedDateRanges) {
      if (
        (start >= range.start && start <= range.end) || // Start inside booked range
        (end >= range.start && end <= range.end) || // End inside booked range
        (start <= range.start && end >= range.end) // Selected range fully covers a booked range
      ) {
        alert(
          "Selected dates overlap with an already booked period. Please choose a different range."
        );
        return;
      }
    }

    setDateRange([{ startDate: start, endDate: end, key: "selection" }]);
  };

  // ✅ Calculate total price
  const totalPrice = listing?.price ? listing.price * months : 0;

  // ✅ Handle booking submission
  console.log(listingId) ;
const handleSubmit = async () => {
    navigate(`/c/${listingId}`);
  };

  localStorage.setItem("startDate" ,  dateRange[0].startDate.toDateString())
  localStorage.setItem("endDate" ,  dateRange[0].endDate.toDateString())

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <div className="listing-details">
        <div className="title">
          <h1>{listing?.title}</h1>
        </div>

        <div className="photos">
          {listing?.listingPhoto?.map((item, index) => (
            <img key={index} src={item} alt="listing photo" />
          ))}
        </div>

        <h2>
          {listing?.type} in {listing?.city}, {listing?.province},{" "}
          {listing?.country}
        </h2>
        <p>
          {listing?.guestCount} guests - {listing?.bedroomCount} bedroom(s) -{" "}
          {listing?.bedCount} bed(s) - {listing?.bathroomCount} bathroom(s)
        </p>
        <hr />

        <div className="profile">
          <h3>
            Hosted by {listing?.creator?.firstName} {listing?.creator?.lastName}
          </h3>
        </div>
        <hr />

        <h3>Description</h3>
        <p>{listing?.description}</p>
        <hr />

        <h3>{listing?.highlight}</h3>
        <p>{listing?.highlightDesc}</p>
        <hr />

        <div className="booking">
          <div>
            <h2>What this place offers?</h2>
            <div className="amenities">
              {listing?.amenities?.[0]
                ? listing.amenities[0].split(",").map((item, index) => (
                    <div className="facility" key={index}>
                      <p>{item}</p>
                    </div>
                  ))
                : "No amenities listed"}
            </div>
          </div>

          <div>
            <h2>How long do you want to stay?</h2>
            <label>
              Select Duration (Months):
              <select
                onChange={(e) => setMonths(parseInt(e.target.value))}
                value={months}
              >
                {[...Array(12).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    {num + 1} Month{num > 0 ? "s" : ""}
                  </option>
                ))}
              </select>
            </label>

            <div className="date-range-calendar">
              <DateRange
                ranges={dateRange}
                onChange={handleSelect}
                minDate={new Date()}
                showMonthAndYearPickers={true}
                disabledDates={bookedDateRanges.map((range) => range.start)} // ✅ Fix invalid prop
              />

              <h2>₹{listing?.price} / month</h2>
              <h2>Total price: ₹{totalPrice}</h2>
              <p>Start Date: {dateRange[0].startDate.toDateString()}</p>
              <p>End Date: {dateRange[0].endDate.toDateString()}</p>
              <button className="button" type="submit" onClick={handleSubmit}>
                BOOKING
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ListingDetails;