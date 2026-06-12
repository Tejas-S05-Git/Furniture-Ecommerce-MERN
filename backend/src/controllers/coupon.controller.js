
const Coupon = require("../models/Coupon.model");
const createCoupon = async (
  req,
  res
) => {
  try {
    const {
      code,
      discountType,
      discountValue,
      minOrderAmount,
      maxDiscount,
      usageLimit,
      expiryDate,
      description,
      status,
    } = req.body;

    const existingCoupon =
      await Coupon.findOne({
        code: code.toUpperCase(),
      });

    if (existingCoupon) {
      return res.status(400).json({
        success: false,
        message:
          "Coupon already exists",
      });
    }

    const coupon =
      await Coupon.create({
        code:
          code.toUpperCase(),

        discountType,
        discountValue,

        minOrderAmount,

        maxDiscount,

        usageLimit,

        expiryDate,

        description,

        status,

        createdBy:
          req.user.id,
      });

    res.status(201).json({
      success: true,
      message:
        "Coupon created successfully",
      coupon,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Server Error",
    });
  }
};

const getAllCoupons = async (
  req,
  res
) => {
  try {
    const coupons =
      await Coupon.find()
        .populate(
          "createdBy",
          "firstName lastName email"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      success: true,
      count: coupons.length,
      coupons,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getCouponById = async (
  req,
  res
) => {
  try {
    const coupon =
      await Coupon.findById(
        req.params.id
      );

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message:
          "Coupon not found",
      });
    }

    res.status(200).json({
      success: true,
      coupon,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const updateCoupon = async (
  req,
  res
) => {
  try {
    const coupon =
      await Coupon.findById(
        req.params.id
      );

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message:
          "Coupon not found",
      });
    }

    Object.keys(req.body).forEach(
      (key) => {
        coupon[key] =
          req.body[key];
      }
    );

    await coupon.save();

    res.status(200).json({
      success: true,
      message:
        "Coupon updated successfully",
      coupon,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Server Error",
    });
  }
};

const deleteCoupon = async (
  req,
  res
) => {
  try {
    const coupon =
      await Coupon.findById(
        req.params.id
      );

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message:
          "Coupon not found",
      });
    }

    await coupon.deleteOne();

    res.status(200).json({
      success: true,
      message:
        "Coupon deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Server Error",
    });
  }
};

const applyCoupon = async (
  req,
  res
) => {
  try {
    const {
      code,
      orderAmount,
    } = req.body;

    const coupon =
      await Coupon.findOne({
        code:
          code.toUpperCase(),
        status: "Active",
      });

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message:
          "Invalid Coupon",
      });
    }

    if (
      new Date() >
      coupon.expiryDate
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Coupon Expired",
      });
    }

    if (
      coupon.usedCount >=
      coupon.usageLimit
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Coupon Usage Limit Reached",
      });
    }

    if (
      orderAmount <
      coupon.minOrderAmount
    ) {
      return res.status(400).json({
        success: false,
        message: `Minimum order amount is ₹${coupon.minOrderAmount}`,
      });
    }

    let discount = 0;

    if (
      coupon.discountType ===
      "Percentage"
    ) {
      discount =
        (orderAmount *
          coupon.discountValue) /
        100;

      if (
        coupon.maxDiscount >
        0
      ) {
        discount = Math.min(
          discount,
          coupon.maxDiscount
        );
      }
    } else {
      discount =
        coupon.discountValue;
    }

    res.status(200).json({
      success: true,
      coupon,
      discount,
      finalAmount:
        orderAmount -
        discount,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Server Error",
    });
  }
};
module.exports = {
  createCoupon,
  getAllCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
  applyCoupon,
};