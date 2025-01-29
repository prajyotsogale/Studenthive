const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const User = require("../models/User");

/* Configuration Multer for File Upload */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Use a timestamp for a unique filename
  },
});

const upload = multer({ storage });

/* USER REGISTER */
router.post("/register", upload.single("profileImage"), async (req, res) => {
  try {
    // Retrieve user details from the request body
    const { firstName, lastName, email, password } = req.body;

    // Check for missing fields
    if (!firstName || !lastName || !email || !password) {
      console.log("Error: Missing required fields");
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Check if a profile image was uploaded
    const profileImage = req.file;
    if (!profileImage) {
      console.log("Error: No profile image uploaded");
      return res.status(400).json({ message: "Profile image is required!" });
    }

    // Path to the uploaded profile photo
    const profileImagePath = profileImage.path;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Error: User already exists");
      return res.status(409).json({ message: "User already exists!" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profileImagePath,
    });

    // Save the new user
    await newUser.save();

    // Send a successful registration response
    res.status(200).json({ message: "User registered successfully!", user: newUser });
  } catch (err) {
    console.error("Registration failed:", err);
    res.status(500).json({ message: "Registration failed!", error: err.message });
  }
});

/* USER LOGIN */
router.post("/login", async (req, res) => {
  try {
    // Retrieve user details from the request body
    const { email, password } = req.body;

    // Check for missing fields
    if (!email || !password) {
      console.log("Error: Missing email or password");
      return res.status(400).json({ message: "Email and password are required!" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log("Error: User does not exist");
      return res.status(404).json({ message: "User doesn't exist!" });
    }

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Error: Invalid credentials");
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    delete user.password; // Do not include the password in the response

    res.status(200).json({ token, user });
  } catch (err) {
    console.error("Login failed:", err);
    res.status(500).json({ message: "Login failed!", error: err.message });
  }
});

module.exports = router;
