const User = require("../models/User.model");
const Order = require("../models/Order.model");
const getAllCustomers = async (
  req,
  res
) => {
  try {
    const customers =
      await User.find({
        role: "customer",
      })
        .select("-password")
        .sort({
          createdAt: -1,
        });

    const customersWithStats =
      await Promise.all(
        customers.map(
          async (customer) => {
            const orders =
              await Order.find({
                customer:
                  customer._id,
              });

            const totalOrders =
              orders.length;

            const totalSpent =
              orders.reduce(
                (
                  acc,
                  order
                ) =>
                  acc +
                  order.totalAmount,
                0
              );

            return {
              ...customer.toObject(),

              totalOrders,

              totalSpent,
            };
          }
        )
      );

    res.status(200).json({
      success: true,
      count:
        customersWithStats.length,
      customers:
        customersWithStats,
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

const getCustomerById = async (
  req,
  res
) => {
  try {
    const customer =
      await User.findById(
        req.params.id
      ).select("-password");

    if (!customer) {
      return res.status(404).json({
        success: false,
        message:
          "Customer not found",
      });
    }

    const orders =
      await Order.find({
        customer:
          customer._id,
      }).sort({
        createdAt: -1,
      });

    const totalOrders =
      orders.length;

    const totalSpent =
      orders.reduce(
        (acc, order) =>
          acc +
          order.totalAmount,
        0
      );

    res.status(200).json({
      success: true,
      customer,
      orders,
      totalOrders,
      totalSpent,
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
const toggleCustomerStatus = async (req, res) => {
  try {
    const customer = await User.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    customer.isActive = !customer.isActive;

    await customer.save();

    res.status(200).json({
      success: true,
      message: customer.isActive ? "Customer Activated" : "Customer Blocked",
      customer,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const customer = await User.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    await customer.deleteOne();

    res.status(200).json({
      success: true,
      message: "Customer deleted successfully",
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
  getAllCustomers,
  getCustomerById,
  toggleCustomerStatus,
  deleteCustomer,
};
