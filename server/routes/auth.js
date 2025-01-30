const router = require("express").Router();
const multer = require("multer");

const { login, register } = require("../controllers/auth");
const { verifyJWT } = require("../middlewares/verify");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  },
});

const upload = multer({ storage });


router.post("/register", upload.single("profileImage"), register);
router.post("/login" ,login )

module.exports = router