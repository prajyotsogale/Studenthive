const router = require("express").Router();
const multer = require("multer");
const cloudinary = require("../utils/cloudinary");

const Listing = require("../models/Listing");
const User = require("../models/User");
const { verifyJWT } = require("../middlewares/verify");
const { createListing, getListing, getListingBySearch, getListingByListingId } = require("../controllers/listing");

/* Configuration Multer for File Upload */
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage });

/* CREATE LISTING */
router.post("/create", upload.array("listingPhotos"), createListing );

/* GET lISTINGS BY CATEGORY */
router.get("/", getListing )

/* GET LISTINGS BY SEARCH */
router.get("/search/:search", getListingBySearch )

/* LISTING DETAILS */
router.get("/:listingId", getListingByListingId)

module.exports = router
