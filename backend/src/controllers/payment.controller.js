const crypto = require("crypto");

const razorpay = require("../config/razorpay");

const Order = require("../models/Order.model");
const createRazorpayOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const options = {
      amount: order.totalAmount * 100,

      currency: "INR",

      receipt: order._id.toString(),
    };

    const razorpayOrder = await razorpay.orders.create(options);

    order.razorpayOrderId = razorpayOrder.id;

    await order.save();

    res.status(200).json({
      success: true,

      razorpayOrder,

      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,

      message: "Server Error",
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,

      razorpay_payment_id,

      razorpay_signature,

      orderId,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expected !== razorpay_signature) {
      return res.status(400).json({
        success: false,

        message: "Payment Verification Failed",
      });
    }

    const order = await Order.findById(orderId);

    order.paymentStatus = "paid";

    order.orderStatus = "processing";

    order.paymentMethod = "razorpay";

    order.paymentId = razorpay_payment_id;

    order.razorpayOrderId = razorpay_order_id;

    order.razorpaySignature = razorpay_signature;

    await order.save();

    res.status(200).json({
      success: true,

      message: "Payment Verified",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,

      message: "Server Error",
    });
  }
};

module.exports = {
  createRazorpayOrder,
  verifyPayment,
};
