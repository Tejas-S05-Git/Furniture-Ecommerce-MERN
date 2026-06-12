const mongoose = require("mongoose");

const settingSchema =
  new mongoose.Schema(
    {
      storeName: String,

      storeEmail: String,

      storePhone: String,

      storeAddress: String,

      logo: String,

      favicon: String,

      metaTitle: String,

      metaDescription: String,

      metaKeywords: String,

      googleAnalytics: String,

      googleTagManager: String,

      facebook: String,

      instagram: String,

      twitter: String,

      pinterest: String,

      youtube: String,

      twoFactorAuth: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "Setting",
  settingSchema
);