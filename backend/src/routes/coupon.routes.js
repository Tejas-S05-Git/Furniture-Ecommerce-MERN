const express = require("express");

const router = express.Router();

const { createCoupon } = require("../controllers/coupon.controller");

const protect = require("../middleware/auth.middleware");

const authorize = require("../middleware/role.middleware");

router.post("/", protect, authorize("admin", "super_admin"), createCoupon);

router.get("/", protect, authorize("admin", "super_admin"), getAllCoupons);

router.get("/:id", protect, authorize("admin", "super_admin"), getCouponById);

router.put("/:id", protect, authorize("admin", "super_admin"), updateCoupon);

router.delete("/:id", protect, authorize("admin", "super_admin"), deleteCoupon);

router.post("/apply", protect, applyCoupon);

module.exports = router;
