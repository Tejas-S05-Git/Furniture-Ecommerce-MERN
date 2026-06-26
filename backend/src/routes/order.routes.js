const express = require("express");

const router = express.Router();

const {
  createOrder,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  getAllOrders,
  updatePayment,
} = require("../controllers/order.controller");

const protect = require("../middleware/auth.middleware");

const authorize = require("../middleware/role.middleware");

router.post("/", protect, createOrder);

router.get("/:id", protect, getOrderById);

router.get("/", protect, authorize("admin", "super_admin"), getAllOrders);

router.put("/:id/status",protect,authorize("admin", "super_admin"),updateOrderStatus,);

router.delete("/:id", protect, authorize("admin", "super_admin"), deleteOrder);
router.patch("/:id/payment", protect, updatePayment);

module.exports = router;
