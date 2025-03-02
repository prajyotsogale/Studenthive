const cloudinary = require("../utils/cloudinary");
const Listing = require("../models/Listing");
const User = require("../models/User");
const { verifyJWT } = require("../middlewares/verify");


/* CREATE LISTING */
const createListing = async (req, res) => {
    try {
      /* Take the information from the form */
      const {
        creator,
        category,
        type,
        streetAddress,
        aptSuite,
        city,
        province,
        country,
        guestCount,
        bedroomCount,
        bedCount,
        bathroomCount,
        amenities,
        title,
        description,
        highlight,
        highlightDesc,
        price,
      } = req.body;
  
      const listingPhotos = req.files
  
      if (!listingPhotos) {
        return res.status(400).send("No file uploaded.")
      }
  
      const result = await Promise.all(
        listingPhotos.map(async (file) => {
          return await cloudinary.uploader.upload(file.path);
        })
      );
  
      const singlePhoto = result.map((item) => item.secure_url)
  
  
  
      const newListing = new Listing({
        listingPhoto: singlePhoto,
        creator,
        category,
        type,
        streetAddress,
        aptSuite,
        city,
        province,
        country,
        guestCount,
        bedroomCount,
        bedCount,
        bathroomCount,
        amenities,
        title,
        description,
        highlight,
        highlightDesc,
        price,
      })
  
      await newListing.save()
  
      res.status(200).json(newListing)
    } catch (err) {
      res.status(409).json({ message: "Fail to create Listing", error: err.message })
      console.log(err)
    }
}

const getListing = async (req, res) => {
    const qCategory = req.query.category
  
    try {
      let listings
      if (qCategory) {
        listings = await Listing.find({ category: qCategory }).populate("creator")
      } else {
        listings = await Listing.find().populate("creator")
      }
  
      res.status(200).json(listings)
    } catch (err) {
      res.status(404).json({ message: "Fail to fetch listings", error: err.message })
      console.log(err)
    }
  }

  const getListingBySearch = async (req, res) => {
    const { search } = req.params
  
    try {
      let listings = []
  
      if (search === "all") {
        listings = await Listing.find().populate("creator")
      } else {
        listings = await Listing.find({
          $or: [
            { category: {$regex: search, $options: "i" } },
            { title: {$regex: search, $options: "i" } },
          ]
        }).populate("creator")
      }
  
      res.status(200).json(listings)
    } catch (err) {
      res.status(404).json({ message: "Fail to fetch listings", error: err.message })
      console.log(err)
    }
  }

  const getListingByListingId = async (req, res) => {
    try {
      const { listingId } = req.params
      const listing = await Listing.findById(listingId).populate("creator")
      res.status(202).json(listing)
    } catch (err) {
      res.status(404).json({ message: "Listing can not found!", error: err.message })
    }
  }

  module.exports = { createListing, getListing, getListingBySearch, getListingByListingId }