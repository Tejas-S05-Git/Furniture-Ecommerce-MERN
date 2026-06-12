const Order = require("../models/Order.model");

const Product = require("../models/Product.model");



const createOrder = async (
  req,
  res
) => {
  try {
    const {
      items,
      shippingAddress,
      paymentMethod,
      notes,
    } = req.body;

    if (
      !items ||
      items.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "No order items found",
      });
    }

    let totalAmount = 0;

    const orderItems = [];

    for (const item of items) {
      const product =
        await Product.findById(
          item.productId
        );

      if (!product) {
        return res.status(404).json({
          success: false,
          message:
            "Product not found",
        });
      }

      const subtotal =
        product.price *
        item.quantity;

      totalAmount += subtotal;

      orderItems.push({
        product:
          product._id,

        title:
          product.title,

        thumbnail:
          product.thumbnail,

        price:
          product.price,

        quantity:
          item.quantity,

        subtotal,
      });
    }

    const order =
      await Order.create({
        customer:
          req.user.id,

        items:
          orderItems,

        shippingAddress,

        paymentMethod,

        totalAmount,

        notes,
      });

    res.status(201).json({
      success: true,
      message:
        "Order placed successfully",
      order,
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


const getAllOrders = async (
  req,
  res
) => {
  try {
    const orders =
      await Order.find()
        .populate(
          "customer",
          "firstName lastName email"
        )
        .populate(
          "items.product",
          "title thumbnail"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getOrderById = async (
  req,
  res
) => {
  try {
    const order =
      await Order.findById(
        req.params.id
      )
        .populate(
          "customer",
          "firstName lastName email"
        )
        .populate(
          "items.product"
        );

    if (!order) {
      return res.status(404).json({
        success: false,
        message:
          "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const updateOrderStatus =
  async (req, res) => {
    try {
      const { orderStatus } =
        req.body;

      const order =
        await Order.findById(
          req.params.id
        );

      if (!order) {
        return res.status(404).json({
          success: false,
          message:
            "Order not found",
        });
      }

      order.orderStatus =
        orderStatus;

      await order.save();

      res.status(200).json({
        success: true,
        message:
          "Order status updated",
        order,
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

  const deleteOrder = async (
  req,
  res
) => {
  try {
    const order =
      await Order.findById(
        req.params.id
      );

    if (!order) {
      return res.status(404).json({
        success: false,
        message:
          "Order not found",
      });
    }

    await order.deleteOne();

    res.status(200).json({
      success: true,
      message:
        "Order deleted successfully",
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
   createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};