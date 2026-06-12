const express = require("express");

const router = express.Router();

const {
  createReview,
  getProductReviews,
  getAllReviews,
  approveReview,
  deleteReview,
} = require("../controllers/review.controller");

const protect = require("../middleware/auth.middleware");

const authorize = require("../middleware/role.middleware");

router.post("/", protect, createReview);

router.get("/product/:productId", getProductReviews);

router.get("/", protect, authorize("admin", "super_admin"), getAllReviews);

router.patch("/:id/approve",protect,authorize("admin", "super_admin"),approveReview,);

router.delete("/:id", protect, authorize("admin", "super_admin"), deleteReview);

module.exports = router;
