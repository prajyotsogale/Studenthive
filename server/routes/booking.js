const router = require("express").Router();
const { createBooking } = require("../controllers/booking");

/* CREATE BOOKING */
router.post("/create", createBooking );

module.exports = router;