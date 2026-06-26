const Order = require("../models/Order.model");

const Product = require("../models/Product.model");

const Coupon = require("../models/Coupon.model");
const crypto = require("crypto");

const createOrder = async (req, res) => {
  try {
    const {
      items,
      shippingAddress,
      paymentMethod,
      notes,

      coupon,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No order items found",
      });
    }
    const orderItems = [];

    let calculatedSubtotal = 0;

    let finalDiscount = 0;

    let finalShipping = 0;

    let finalTax = 0;

    let finalTotal = calculatedSubtotal;

    for (const item of items) {
      const product = await Product.findById(item._id);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      const subtotal = product.price * item.quantity;

      calculatedSubtotal += subtotal;

      orderItems.push({
        product: product._id,

        title: product.title,

        thumbnail: product.thumbnail,

        price: product.price,

        quantity: item.quantity,

        subtotal,
      });
    }

    // Shipping
    finalShipping = calculatedSubtotal >= 500 ? 0 : 50;

    // Tax
    finalTax = Math.round(calculatedSubtotal * 0.18);

    // Coupon Validation
    if (coupon) {
      const couponData = await Coupon.findById(coupon);

      if (!couponData) {
        return res.status(404).json({
          success: false,
          message: "Coupon not found",
        });
      }

      if (couponData.status !== "Active") {
        return res.status(400).json({
          success: false,
          message: "Coupon inactive",
        });
      }

      if (new Date() > couponData.expiryDate) {
        return res.status(400).json({
          success: false,
          message: "Coupon expired",
        });
      }

      if (couponData.usedCount >= couponData.usageLimit) {
        return res.status(400).json({
          success: false,
          message: "Coupon usage limit reached",
        });
      }

      if (calculatedSubtotal < couponData.minOrderAmount) {
        return res.status(400).json({
          success: false,
          message: `Minimum order amount is ₹${couponData.minOrderAmount}`,
        });
      }

      if (couponData.discountType === "Percentage") {
        finalDiscount = (calculatedSubtotal * couponData.discountValue) / 100;

        if (couponData.maxDiscount > 0) {
          finalDiscount = Math.min(finalDiscount, couponData.maxDiscount);
        }
      } else {
        finalDiscount = couponData.discountValue;
      }
    }

    // Final Total
    finalTotal = calculatedSubtotal + finalShipping + finalTax - finalDiscount;

    const order = await Order.create({
      customer: req.user.id,

      items: orderItems,

      shippingAddress,

      paymentMethod,

      coupon,

      discount: finalDiscount,

      shipping: finalShipping,

      tax: finalTax,

      totalAmount: finalTotal,

      notes,
    });

    if (coupon) {
      const couponData = await Coupon.findById(coupon);

      if (couponData) {
        couponData.usedCount += 1;

        await couponData.save();
      }
    }

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customer", "firstName lastName email")
      .populate("items.product", "title thumbnail")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("customer", "firstName lastName email")
      .populate("items.product")
      .populate("coupon", "code discountType discountValue");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.orderStatus = orderStatus;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const updatePayment = async (req, res) => {
  try {
    const {
      paymentMethod,
      paymentStatus,
      paymentId,
      razorpayOrderId,
      razorpaySignature,
    } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.paymentMethod = paymentMethod;

    order.paymentStatus = paymentStatus;

    if (paymentStatus === "paid") {
      order.orderStatus = "processing";
    }

    if (paymentId) {
      order.paymentId = paymentId;
    }

    if (razorpayOrderId) {
      order.razorpayOrderId = razorpayOrderId;
    }

    if (razorpaySignature) {
      order.razorpaySignature = razorpaySignature;
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: "Payment Updated",
      order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    await order.deleteOne();

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
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
   createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  updatePayment,
  deleteOrder,
};
