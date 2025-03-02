const router = require("express").Router()

const Booking = require("../models/Booking")
const User = require("../models/User")
const Listing = require("../models/Listing")
const { getTripsByUserId, getListingByUserId, getProperties, getReservations } = require("../controllers/User")

/* GET TRIP LIST */
router.get("/:userId/trips", getTripsByUserId )

/* ADD LISTING TO WISHLIST */
router.patch("/:userId/:listingId", getListingByUserId)

/* GET PROPERTY LIST */
router.get("/:userId/properties", getProperties)

/* GET RESERVATION LIST */
router.get("/:userId/reservations", getReservations )


module.exports = router
