const router = require("express").Router()

const Booking = require("../models/Booking")
const User = require("../models/User")
const Listing = require("../models/Listing")
const { getTripsByUserId, getListingByUserId, getProperties, getReservations } = require("../controllers/User")
const { verifyJWT } = require("../middlewares/verify")
const { verify } = require("jsonwebtoken")

/* GET TRIP LIST */
router.get("/:userId/trips",verifyJWT , getTripsByUserId )

/* ADD LISTING TO WISHLIST */
router.patch("/:userId/:listingId",verifyJWT , getListingByUserId)

/* GET PROPERTY LIST */
router.get("/properties/:userId",verifyJWT , getProperties)

/* GET RESERVATION LIST */
router.get("/:userId/reservations",verifyJWT , getReservations )


module.exports = router
