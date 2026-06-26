const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");

const {createRazorpayOrder,verifyPayment,} = require("../controllers/payment.controller");

router.post("/create-order",protect,createRazorpayOrder,);

router.post("/verify",protect,verifyPayment,);

module.exports = router;
