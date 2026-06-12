const User = require("../models/User.model");
const Product = require("../models/Product.model");
const Order = require("../models/Order.model");

const getDashboardAnalytics =
  async (req, res) => {
    try {
      const totalCustomers =
        await User.countDocuments({
          role: "customer",
        });

      const totalProducts =
        await Product.countDocuments();

      const totalOrders =
        await Order.countDocuments();

      const orders =
        await Order.find();

      const totalRevenue =
        orders.reduce(
          (acc, order) =>
            acc +
            order.totalAmount,
          0
        );

      const recentOrders =
        await Order.find()
          .populate(
            "customer",
            "firstName lastName email"
          )
          .sort({
            createdAt: -1,
          })
          .limit(5);

      const lowStockProducts =
        await Product.find({
          quantity: {
            $lte: 5,
          },
        }).limit(5);

        const topProducts =
  await Order.aggregate([
    {
      $unwind: "$items",
    },

    {
      $group: {
        _id:
          "$items.product",

        totalSold: {
          $sum:
            "$items.quantity",
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
  ]);

      res.status(200).json({
        success: true,

        stats: {
          totalRevenue,
          totalOrders,
          totalCustomers,
          totalProducts,
        },

        recentOrders,

        lowStockProducts,
         topProducts,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  };

  

  module.exports = {
  getDashboardAnalytics,
};