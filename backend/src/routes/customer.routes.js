const express = require("express");

const router = express.Router();

const {
  getAllCustomers,
  getCustomerById,
  toggleCustomerStatus,
  deleteCustomer,
} = require("../controllers/customer.controller");

const protect = require("../middleware/auth.middleware");

const authorize = require("../middleware/role.middleware");

router.get("/", protect, authorize("admin", "super_admin"), getAllCustomers);

router.get("/:id", protect, authorize("admin", "super_admin"), getCustomerById);

router.patch("/:id/status",protect,authorize("admin", "super_admin"),toggleCustomerStatus,);

router.delete("/:id",protect,authorize("admin", "super_admin"),deleteCustomer,);

module.exports = router;
