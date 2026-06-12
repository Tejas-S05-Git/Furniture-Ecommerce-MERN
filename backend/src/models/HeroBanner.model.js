const mongoose = require("mongoose");

const heroBannerSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },

      subtitle: {
        type: String,
        required: true,
      },

      badgeText: {
        type: String,
        default: "",
      },

      topTag: {
        type: String,
        default: "",
      },

      buttonText: {
        type: String,
        default: "Shop Now",
      },

      buttonLink: {
        type: String,
        default: "/shop",
      },

      backgroundColor: {
        type: String,
        default: "#F3F3F3",
      },

      image: {
        type: String,
        required: true,
      },

      active: {
        type: Boolean,
        default: true,
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

module.exports =
  mongoose.model(
    "HeroBanner",
    heroBannerSchema
  );