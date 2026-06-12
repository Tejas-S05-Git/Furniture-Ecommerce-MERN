const mongoose = require("mongoose");

const offerBannerSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },

      subtitle: {
        type: String,
        default: "",
      },

      discount: {
        type: Number,
        required: true,
      },

      badge: {
        type: String,
        default: "",
      },

      image: {
        type: String,
        required: true,
      },

      buttonText: {
        type: String,
        default: "Shop Now",
      },

      buttonLink: {
        type: String,
        default: "/shop",
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
  "OfferBanner",
  offerBannerSchema
);
