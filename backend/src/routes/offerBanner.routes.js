const express = require("express");

const router = express.Router();

const {
  createOfferBanner,
  getOfferBanners,
  getOfferBannerById,
  deleteOfferBanner,
} = require("../controllers/offerBanner.controller");

const protect = require("../middleware/auth.middleware");

const authorize = require("../middleware/role.middleware");

const upload = require("../middleware/upload.middleware");

router.post("/",protect,authorize("admin", "super_admin"),upload.single("image"),createOfferBanner,);

router.get("/", getOfferBanners);

router.get("/:id", getOfferBannerById);

router.delete("/:id",protect,authorize("admin", "super_admin"),deleteOfferBanner,);

module.exports = router;
