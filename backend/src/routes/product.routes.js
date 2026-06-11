const express = require("express");

const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

const protect = require("../middleware/auth.middleware");

const authorize = require("../middleware/role.middleware");

const upload = require("../middleware/upload.middleware");

router.post(
  "/",
  protect,
  authorize("admin", "super_admin"),
  upload.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
    {
      name: "images",
      maxCount: 10,
    },
  ]),
  createProduct,
);

router.get("/", protect, authorize("admin", "super_admin"), getAllProducts);
router.get("/:id", protect, authorize("admin", "super_admin"), getProductById);
router.put("/:id",protect,authorize( "admin","super_admin"),updateProduct);
router.delete("/:id",protect,authorize("admin","super_admin"),deleteProduct);

module.exports = router;
