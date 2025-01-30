const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const register =  async (req, res) => {
    try {
     
      const { firstName, lastName, email, password ,role } = req.body;
      const profileImage = req.file;
      if (!profileImage) {
        return res.status(400).send("No file uploaded");
      }
  
     
      const profileImagePath = profileImage.path;
  
     
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: "User already exists!" });
      }
  
     
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
  
     
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        profileImagePath,
        role
      });
  
     
      await newUser.save();
  
     
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
     
      const { email, password , role } = req.body
       
      const user = await User.findOne({ email , role });
      if (!user) {
        return res.status(409).json({ message: "User doesn't exist!" });
      }
  
     
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Credentials!"})
      }
  
     
      const token = jwt.sign({ id: user }, process.env.JWT_SECRET , { expiresIn: "8h" })
      delete user.password
  
      res.status(200).json({ token, user , role })
  
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err.message })
    }
  }

module.exports = { register, login };
