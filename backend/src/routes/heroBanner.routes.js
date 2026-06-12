const express = require("express");

const router = express.Router();

const {
  createHeroBanner,
  getHeroBanners,
  getHeroBannerById,
  updateHeroBanner,
  deleteHeroBanner,
} = require("../controllers/heroBanner.controller");

const protect = require("../middleware/auth.middleware");

const authorize = require("../middleware/role.middleware");

const upload = require("../middleware/upload.middleware");

router.post("/",protect,authorize("admin", "super_admin"),upload.single("image"),createHeroBanner,);
router.get("/", getHeroBanners);
router.get("/:id", getHeroBannerById);
router.put("/:id",protect,authorize("admin", "super_admin"),upload.single("image"),updateHeroBanner,);
router.delete("/:id",protect,authorize("admin", "super_admin"),deleteHeroBanner,);

module.exports = router;
