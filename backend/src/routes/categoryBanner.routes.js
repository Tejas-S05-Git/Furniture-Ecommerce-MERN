const express = require("express");

const router = express.Router();

const {
  createCategoryBanner,
  getCategoryBanners,
  getCategoryBannerById,
  updateCategoryBanner,
  deleteCategoryBanner,
} = require("../controllers/categoryBanner.controller");

const protect = require("../middleware/auth.middleware");

const authorize = require("../middleware/role.middleware");

const upload = require("../middleware/upload.middleware");

router.post(
  "/",
  protect,
  authorize("admin", "super_admin"),
  upload.single("image"),
  createCategoryBanner,
);

router.get("/", getCategoryBanners);

router.get("/:id", getCategoryBannerById);

router.put("/:id",protect,authorize("admin", "super_admin"),upload.single("image"),updateCategoryBanner,);

router.delete("/:id",protect,authorize("admin", "super_admin"),deleteCategoryBanner,);

module.exports = router;
