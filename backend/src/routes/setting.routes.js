const express =
  require("express");

const router =
  express.Router();

const {
  getSettings,
  updateSettings,
  updateBranding,
} = require(
  "../controllers/setting.controller"
);

const protect =
  require(
    "../middleware/auth.middleware"
  );

const authorize =
  require(
    "../middleware/role.middleware"
  );

const upload =
  require(
    "../middleware/upload.middleware"
  );

router.get(
  "/",
  protect,
  authorize(
    "admin",
    "super_admin"
  ),
  getSettings
);

router.put(
  "/",
  protect,
  authorize(
    "admin",
    "super_admin"
  ),
  updateSettings
);

router.put(
  "/branding",
  protect,
  authorize(
    "admin",
    "super_admin"
  ),
  upload.fields([
    {
      name: "logo",
      maxCount: 1,
    },
    {
      name: "favicon",
      maxCount: 1,
    },
  ]),
  updateBranding
);

module.exports = router;