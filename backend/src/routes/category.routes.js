const express = require("express");

const router = express.Router();

const { createCategory,getAllCategories, getCategoryById, updateCategory, deleteCategory } = require("../controllers/category.controller");
const protect = require("../middleware/auth.middleware");

const authorize = require("../middleware/role.middleware");
const upload = require("../middleware/upload.middleware");

router.post("/", protect, authorize( "admin", "super_admin"),upload.single("image"),createCategory
);
router.get("/",protect,authorize("admin","super_admin"),getAllCategories);
router.get("/:id",protect,authorize("admin","super_admin"),getCategoryById);
router.put(
  "/:id",
  protect,
  authorize("admin", "super_admin"),
  upload.single("image"),
  updateCategory
);
router.delete("/:id",protect,authorize("admin","super_admin"),deleteCategory);

module.exports = router;
