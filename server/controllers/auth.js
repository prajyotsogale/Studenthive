const cloudinary = require('../utils/cloudinary');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


const register = async (req, res) => {
    try {
      /* Take all information from the form */
      const { firstName, lastName, email, password , role} = req.body;
      /* The uploaded file is available as req.file */
      const profileImage = req.file;
      const result = await cloudinary.uploader.upload(profileImage.path);
      
      
      if (!profileImage) {
        return res.status(400).send("No file uploaded");
      }
  
      /* Check if user exists */
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: "User already exists!" });
      }
  
      /* Hass the password */
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
  
      /* Create a new User */
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        userImage: result.secure_url,
        role
      });
  
  
      /* Save the new User */
      await newUser.save();
  
      /* Send a successful message */
      res
        .status(200)
        .json({ message: "User registered successfully!", user: newUser });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ message: "Registration failed!", error: err.message });
    }
  };

  const login =  async (req, res) => {
    try {
      /* Take the infomation from the form */
      const { email, password, role } = req.body;
      
      /* Check if user exists */
      const user = await User.findOne({ email , role });
      if (!user) {
        return res.status(409).json({ message: "User doesn't exist!" });
      }

      
      /* Compare the password with the hashed password */
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Credentials!"})
      }
  
      /* Generate JWT token */
      const token = jwt.sign({ id: user }, process.env.JWT_SECRET)
      delete user.password
  
      return res.status(200).json({ token, user ,role })
  
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: err.message })
    }
  }

  module.exports = { register , login };