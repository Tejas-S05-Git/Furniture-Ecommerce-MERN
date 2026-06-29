const express = require("express");
const protect = require("../middleware/auth.middleware");

const router = express.Router();

const {
  register,
  login,
  me,
  logout,
  changePassword,
} = require("../controllers/auth.controller");

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, me);
router.post("/logout", logout);
router.put("/change-password", protect, changePassword);

module.exports = router;
