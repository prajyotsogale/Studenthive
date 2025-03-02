
const cloudinary = require('../utils/cloudinary');
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");


const User = require("../models/User");
const { register, login } = require('../controllers/auth');

/* Configuration Multer for File Upload */
const storage = multer.diskStorage({
  
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage });

/* USER REGISTER */
router.post("/register", upload.single("profileImage"), register);

/* USER LOGIN*/
router.post("/login", login)

module.exports = router