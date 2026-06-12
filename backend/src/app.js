const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");
const categoryRoutes = require("./routes/category.routes");
const productRoutes = require("./routes/product.routes");
const customerRoutes = require("./routes/customer.routes");
const orderRoutes = require("./routes/order.routes");
const couponRoutes = require("./routes/coupon.routes");
const reviewRoutes = require("./routes/review.routes");
const heroBannerRoutes = require("./routes/heroBanner.routes");
const categoryBannerRoutes = require("./routes/categoryBanner.routes");
const offerBannerRoutes = require("./routes/offerBanner.routes");
const settingRoutes = require("./routes/setting.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/hero-banners", heroBannerRoutes);
app.use("/api/category-banners", categoryBannerRoutes);
app.use("/api/offer-banners", offerBannerRoutes);
app.use("/api/settings", settingRoutes);
app.use("/api/dashboard", dashboardRoutes);
module.exports = app;
