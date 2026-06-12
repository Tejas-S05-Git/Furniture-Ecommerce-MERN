const Review = require("../models/Review.model");

const Product = require("../models/Product.model");
const createReview = async (req, res) => {
  try {
    const { productId, rating, title, comment } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const review = await Review.create({
      customer: req.user.id,

      product: productId,

      rating,

      title,

      comment,
    });

    res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      review,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getProductReviews =
  async (req, res) => {
    try {
      const reviews =
        await Review.find({
          product:
            req.params.productId,

          approved: true,
        })
          .populate(
            "customer",
            "firstName lastName"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        success: true,
        count:
          reviews.length,
        reviews,
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

  const getAllReviews = async (
  req,
  res
) => {
  try {
    const reviews =
      await Review.find()
        .populate(
          "customer",
          "firstName lastName email"
        )
        .populate(
          "product",
          "title"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
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

const approveReview = async (
  req,
  res
) => {
  try {
    const review =
      await Review.findById(
        req.params.id
      );

    if (!review) {
      return res.status(404).json({
        success: false,
        message:
          "Review not found",
      });
    }

    review.approved =
      !review.approved;

    await review.save();

    res.status(200).json({
      success: true,
      message:
        review.approved
          ? "Review Approved"
          : "Review Unapproved",
      review,
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

const deleteReview = async (
  req,
  res
) => {
  try {
    const review =
      await Review.findById(
        req.params.id
      );

    if (!review) {
      return res.status(404).json({
        success: false,
        message:
          "Review not found",
      });
    }

    await review.deleteOne();

    res.status(200).json({
      success: true,
      message:
        "Review deleted successfully",
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
  createReview,
  getProductReviews,
  getAllReviews,
  approveReview,
  deleteReview,
};
