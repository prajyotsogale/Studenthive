import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CreateListing from "./pages/CreateListing";
import ListingDetails from "./pages/ListingDetails";
import TripList from "./pages/TripList";
import WishList from "./pages/WishList";
import PropertyList from "./pages/PropertyList";
import ReservationList from "./pages/ReservationList";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import PaymentGateway from "./pages/PaymentGateway";

import Checkout from "./pages/Checkout";

import RazorpayGateway from "./pages/Booking/RazorpayGateway";
import BookingRequestPage from "./pages/Booking/BookingRequestPage";
import Success from "./pages/Success";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/payment" element={<PaymentGateway />} />
        
          <Route path="/c/:id" element={<Checkout/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/properties/:listingId" element={<ListingDetails />} />
          <Route path="/properties/category/:category" element={<CategoryPage />} />
          <Route path="/properties/search/:search" element={<SearchPage />} />
          <Route path="/:userId/trips" element={<TripList />} />
          <Route path="/:userId/wishList" element={<WishList />} />
          <Route path="/raz" element={<RazorpayGateway />} />
          {/* <Route path="/abc" element={<BookingRequestPage />} /> */}

          <Route path="/:userId/properties" element={<PropertyList />} />
          <Route path="/:userId/reservations" element={<ReservationList />} />
          <Route path="/Success" element={<Success/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
