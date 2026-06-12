const OfferBanner = require("../models/OfferBanner.model");

const cloudinary = require("../config/cloudinary");


const createOfferBanner =
  async (req, res) => {
    try {
      const {
        title,
        subtitle,
        discount,
        badge,
        buttonText,
        buttonLink,
        status,
      } = req.body;

      let imageUrl = "";

      if (req.file) {
        const result =
          await new Promise(
            (
              resolve,
              reject
            ) => {
              cloudinary.uploader
                .upload_stream(
                  {
                    folder:
                      "furniture/offer-banners",
                  },
                  (
                    error,
                    result
                  ) => {
                    if (
                      error
                    )
                      reject(
                        error
                      );

                    resolve(
                      result
                    );
                  }
                )
                .end(
                  req.file.buffer
                );
            }
          );

        imageUrl =
          result.secure_url;
      }

      const banner =
        await OfferBanner.create(
          {
            title,
            subtitle,
            discount,
            badge,
            image:
              imageUrl,
            buttonText,
            buttonLink,
            status,
            createdBy:
              req.user.id,
          }
        );

      res.status(201).json({
        success: true,
        message:
          "Offer banner created successfully",
        banner,
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

  const getOfferBanners =
  async (req, res) => {
    try {
      const banners =
        await OfferBanner.find()
          .populate(
            "createdBy",
            "firstName lastName"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        success: true,
        count:
          banners.length,
        banners,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  };

  const getOfferBannerById =
  async (req, res) => {
    try {
      const banner =
        await OfferBanner.findById(
          req.params.id
        );

      if (!banner) {
        return res.status(404).json({
          success: false,
          message:
            "Banner not found",
        });
      }

      res.status(200).json({
        success: true,
        banner,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  };

  const deleteOfferBanner =
  async (req, res) => {
    try {
      const banner =
        await OfferBanner.findById(
          req.params.id
        );

      if (!banner) {
        return res.status(404).json({
          success: false,
          message:
            "Banner not found",
        });
      }

      await banner.deleteOne();

      res.status(200).json({
        success: true,
        message:
          "Banner deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  };

  module.exports = {
  createOfferBanner,
  getOfferBanners,
  getOfferBannerById,
  deleteOfferBanner,
};