const router = require("express").Router();
const { createBooking } = require("../controllers/booking");
const { verifyJWT } = require("../middlewares/verify");

/* CREATE BOOKING */
router.post("/create",verifyJWT , createBooking );

module.exports = router;