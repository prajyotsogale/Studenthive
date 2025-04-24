const router = require("express").Router();
require("dotenv").config();
const crypto = require("crypto");
const Razorpay = require("razorpay"); // ✅ Correct import
const { createBooking, getBookingsById } = require("../controllers/booking");
const { verifyJWT } = require("../middlewares/verify");

// ✅ Initialize Razorpay instance with API Keys
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,        // ✅ Load from .env
  key_secret: process.env.RAZORPAY_KEY_SECRET // ✅ Load from .env
});

/* CREATE BOOKING */
router.post("/create", verifyJWT, createBooking);
router.get("/getbookings/:id", verifyJWT, getBookingsById);

/* CREATE ORDER */
router.post("/create-order", async (req, res) => {
    try {
      const { amount } = req.body;
    const currency = "INR";
      
      console.log("Received order request:", amount, currency);
  
      const options = {
        amount: amount*100, // Convert to paisa
        currency,
        receipt: `order_rcptid_${Date.now()}`,
      };
  
      const order = await razorpay.orders.create(options);
      console.log("Order Created:", order); // ✅ Debug log
  
      res.json(order);
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ error: error.message });
    }
  });
  

/* VERIFY PAYMENT */
router.post('/verify-payment', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "Missing payment details" });
    }

    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === razorpay_signature) {
      console.log("✅ Payment Verified Successfully");
      return res.json({ success: true, payment_id: razorpay_payment_id });
    } else {
      console.log("❌ Signature mismatch");
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    console.error("❌ Error verifying payment:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
