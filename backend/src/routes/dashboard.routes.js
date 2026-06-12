const express = require("express");

const router = express.Router();

const {
  getDashboardAnalytics,
} = require("../controllers/dashboard.controller");

const protect = require("../middleware/auth.middleware");

const authorize = require("../middleware/role.middleware");

router.get("/",protect,authorize("admin", "super_admin"),getDashboardAnalytics,);

module.exports = router;
