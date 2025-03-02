const Booking = require("../models/Booking");

const createBooking = async (req, res) => {
    try {
      const { customerId, hostId, listingId, startDate, endDate, totalPrice } = req.body;
  
      // Check if end date is after start date
      if (new Date(startDate) >= new Date(endDate)) {
        return res.status(400).json({ message: "End date must be after start date." });
      }
  
      // Check for existing bookings with overlapping dates
      const existingBookings = await Booking.find({
        listingId: listingId,
        $and: [
          { startDate: { $lt: endDate } },
          { endDate: { $gt: startDate } }
        ]
      });
  
      if (existingBookings.length > 0) {
        return res.status(409).json({ message: "This property is already booked for the selected dates." });
      }
  
      // Create and save new booking if no overlap
      const newBooking = new Booking({ customerId, hostId, listingId, startDate, endDate, totalPrice });
      await newBooking.save();
      res.status(200).json(newBooking);
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Failed to create a new Booking!", error: err.message });
    }
  };

    module.exports = { createBooking };