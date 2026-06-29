const User = require("../models/User.model");
const Product = require("../models/Product.model");
const Order = require("../models/Order.model");

const getDashboardAnalytics = async (req, res) => {
  try {
    // ==========================
    // Stats
    // ==========================

    const totalCustomers = await User.countDocuments({
      role: "customer",
    });

    const totalProducts = await Product.countDocuments();

    const totalOrders = await Order.countDocuments();

    const orders = await Order.find();

    const totalRevenue = orders.reduce(
      (acc, order) => acc + order.totalAmount,
      0,
    );

    // ==========================
    // Revenue Chart
    // ==========================

    const revenueResult = await Order.aggregate([
      {
        $group: {
          _id: {
            month: {
              $month: "$createdAt",
            },
          },
          revenue: {
            $sum: "$totalAmount",
          },
        },
      },
      {
        $sort: {
          "_id.month": 1,
        },
      },
    ]);

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const revenueChart = months.map((month, index) => {
      const found = revenueResult.find((item) => item._id.month === index + 1);

      return {
        month,
        revenue: found ? found.revenue : 0,
      };
    });

    // ==========================
    // Orders Status Chart
    // ==========================

    const orderStatusResult = await Order.aggregate([
      {
        $group: {
          _id: "$orderStatus",
          value: {
            $sum: 1,
          },
        },
      },
    ]);

    const statusList = [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];

    const ordersChart = statusList.map((status) => {
      const found = orderStatusResult.find((item) => item._id === status);

      return {
        name: status.charAt(0).toUpperCase() + status.slice(1),
        value: found ? found.value : 0,
      };
    });

    // ==========================
    // Today's Summary
    // ==========================

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);

    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayOrders = await Order.find({
      createdAt: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    const todayRevenue = todayOrders.reduce(
      (acc, order) => acc + order.totalAmount,
      0,
    );

    const todayCustomers = await User.countDocuments({
      role: "customer",
      createdAt: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    const todaySummary = {
      revenue: todayRevenue,
      orders: todayOrders.length,
      customers: todayCustomers,
    };
    // ==========================
    // Recent Orders
    // ==========================

    const recentOrders = await Order.find()
      .populate("customer", "firstName lastName email")
      .sort({
        createdAt: -1,
      })
      .limit(5);

    // ==========================
    // Low Stock
    // ==========================

    const lowStockProducts = await Product.find({
      quantity: {
        $lte: 5,
      },
    }).limit(5);
    console.log(lowStockProducts);

    // ==========================
    // Top Selling Products
    // ==========================

    const topProducts = await Order.aggregate([
      {
        $unwind: "$items",
      },
      {
        $group: {
          _id: "$items.product",
          totalSold: {
            $sum: "$items.quantity",
          },
        },
      },
      {
        $sort: {
          totalSold: -1,
        },
      },
      {
        $limit: 5,
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $project: {
          _id: 1,
          title: "$product.title",
          thumbnail: "$product.thumbnail",
          price: "$product.price",
          quantity: "$product.quantity",
          totalSold: 1,

          revenue: {
            $multiply: ["$totalSold", "$product.price"],
          },
        },
      },
    ]);

    // ==========================
    // Response
    // ==========================

    res.status(200).json({
      success: true,

      stats: {
        totalRevenue,
        totalOrders,
        totalCustomers,
        totalProducts,
      },

      revenueChart,

      ordersChart,

      recentOrders,

      lowStockProducts,

      topProducts,

      todaySummary,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  getDashboardAnalytics,
};
