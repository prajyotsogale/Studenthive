import { useEffect, useState } from "react";
import "../styles/ListingDetails.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { facilities } from "../data";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import Footer from "../components/Footer"
import { useSupplier } from "../context/Refresh";
import { useGetListingDetails } from "../hooks/listing";
import { useCreateBooking } from "../hooks/booking";

const ListingDetails = () => {
  const {getListingDetails , listing, loading} = useGetListingDetails();
  const {createBooking} = useCreateBooking();

  const { listingId } = useParams();

  

  useEffect(() => {
    getListingDetails(listingId);
  }, []);


  /* BOOKING CALENDAR */
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    // Update the selected date range when user makes a selection
    setDateRange([ranges.selection]);
  };

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round(end - start) / (1000 * 60 * 60 * 24); // Calculate the difference in day unit

  /* SUBMIT BOOKING */
  const customerId = useSelector((state) => state?.user?._id);

  const navigate = useNavigate()
  const {setPrice} = useSupplier();
    
  const handleSubmit = async () => {
      const bookingForm = {
        customerId,
        listingId,
        hostId: listing.creator._id,
        startDate: dateRange[0].startDate.toDateString(),
        endDate: dateRange[0].endDate.toDateString(),
        totalPrice: listing.price * dayCount,
      }

      const result = await createBooking(bookingForm);
      if(result.status) {
        navigate("/raz")
      }

  }

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      
      <div className="listing-details">
        <div className="title">
          <h1>{listing?.title}</h1>
          <div></div>
        </div>

        <div className="photos">
          {listing?.listingPhoto?.map((item) => (
            <img
              src={item}
              alt="listing photo"
            />
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
          {/* <img
            src={`http://localhost:3001/${listing.creator.profileImagePath.replace(
              "public",
              ""
            )}`}
          /> */}
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
              {listing?.amenities[0].split(",").map((item, index) => (
                <div className="facility" key={index}>
                  <div className="facility_icon">
                    {
                      facilities?.find((facility) => facility.name === item)
                        ?.icon
                    }
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2>How long do you want to stay?</h2>
            <div className="date-range-calendar">
              <DateRange ranges={dateRange} onChange={handleSelect} />
              {dayCount > 1 ? (
                <h2>
                  ₹{listing?.price} / {dayCount} nights
                </h2>
              ) : (
                <h2>
                  ₹{listing?.price} / {dayCount} night
                </h2>
              )}

              <h2>Total price: ₹{Math.round(listing?.price / dayCount)}</h2>
              <p>Start Date: {dateRange[0].startDate.toDateString()}</p>
              <p>End Date: {dateRange[0].endDate.toDateString()}</p>
              <Link to={`/raz`}><button className="button" type="submit" onClick={handleSubmit}>
                BOOKING
              </button></Link>
              
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ListingDetails;
