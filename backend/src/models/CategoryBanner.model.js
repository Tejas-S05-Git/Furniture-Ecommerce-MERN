const mongoose = require("mongoose");

const categoryBannerSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },

      image: {
        type: String,
        required: true,
      },

      itemsCount: {
        type: Number,
        default: 0,
      },

      rating: {
        type: Number,
        default: 0,
      },

      startingPrice: {
        type: Number,
        default: 0,
      },

      badge: {
        type: String,
        default: "",
      },

      status: {
        type: String,
        enum: [
          "Active",
          "Inactive",
        ],
        default: "Active",
      },

      createdBy: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "CategoryBanner",
  categoryBannerSchema
);