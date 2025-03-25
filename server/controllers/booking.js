const { get } = require("mongoose");
const Booking = require("../models/Booking");
const createBooking = async (req, res) => {
  try {
    const { hostId, listingId, startDate, endDate, totalPrice } = req.body;
    const customerId = req.user.id;

    console.log("Received Dates:", customerId, startDate, endDate);

    // Convert incoming dates to proper format
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    // Check if parsed dates are valid
    if (isNaN(parsedStartDate.getTime()) || isNaN(parsedEndDate.getTime())) {
      return res.status(400).json({ message: "Invalid date format!" });
    }

    // Convert dates to `YYYY-MM-DD` format for storage
    const formattedStartDate = parsedStartDate.toISOString().split("T")[0];
    const formattedEndDate = parsedEndDate.toISOString().split("T")[0];

    console.log("Formatted Dates:", formattedStartDate, formattedEndDate);

    // Check if end date is after start date
    if (parsedStartDate >= parsedEndDate) {
      return res.status(400).json({ message: "End date must be after start date." });
    }

    // Check for existing bookings with overlapping dates
    const existingBookings = await Booking.find({
      listingId,
      $and: [
        { startDate: { $lt: formattedEndDate } },
        { endDate: { $gt: formattedStartDate } }
      ]
    });

    if (existingBookings.length > 0) {
      return res.status(409).json({ message: "This property is already booked for the selected dates.", status: false });
    }

    // Create and save new booking
    const newBooking = new Booking({
      customerId,
      hostId,
      listingId,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      totalPrice
    });

    await newBooking.save();
    res.status(200).json(newBooking);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to create a new Booking!", error: err.message });
  }
};


  const getBookingsById = async (req, res) => {
    const { id } = req.params;
    try {
      const bookings = await Booking.find({ listingId: id });
      res.status(200).json(bookings );
    } catch (error) {
      res.status(404).json({ message: "No bookings found!" });
    }
  }

    module.exports = { createBooking , getBookingsById };