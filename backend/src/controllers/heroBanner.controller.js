const HeroBanner = require("../models/HeroBanner.model");

const cloudinary = require("../config/cloudinary");

const createHeroBanner = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      badgeText,
      topTag,
      buttonText,
      buttonLink,
      backgroundColor,
      active,
    } = req.body;

    let imageUrl = "";

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "furniture/hero-banners",
            },
            (error, result) => {
              if (error) reject(error);

              resolve(result);
            },
          )
          .end(req.file.buffer);
      });

      imageUrl = result.secure_url;
    }

    const banner = await HeroBanner.create({
      title,
      subtitle,
      badgeText,
      topTag,
      buttonText,
      buttonLink,
      backgroundColor,
      image: imageUrl,
      active,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Hero banner created successfully",
      banner,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};



  const getHeroBanners =
  async (req, res) => {
    try {
      const banners =
        await HeroBanner.find()
          .populate(
            "createdBy",
            "firstName lastName email"
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
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  };

  const getHeroBannerById =
  async (req, res) => {
    try {
      const banner =
        await HeroBanner.findById(
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
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  };

  const updateHeroBanner =
  async (req, res) => {
    try {
      const banner =
        await HeroBanner.findById(
          req.params.id
        );

      if (!banner) {
        return res.status(404).json({
          success: false,
          message:
            "Banner not found",
        });
      }

      let imageUrl =
        banner.image;

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
                      "furniture/hero-banners",
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

      banner.title =
        req.body.title ??
        banner.title;

      banner.subtitle =
        req.body.subtitle ??
        banner.subtitle;

      banner.badgeText =
        req.body.badgeText ??
        banner.badgeText;

      banner.topTag =
        req.body.topTag ??
        banner.topTag;

      banner.buttonText =
        req.body.buttonText ??
        banner.buttonText;

      banner.buttonLink =
        req.body.buttonLink ??
        banner.buttonLink;

      banner.backgroundColor =
        req.body.backgroundColor ??
        banner.backgroundColor;

      banner.active =
        req.body.active ??
        banner.active;

      banner.image =
        imageUrl;

      await banner.save();

      res.status(200).json({
        success: true,
        message:
          "Banner updated successfully",
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

  const deleteHeroBanner =
  async (req, res) => {
    try {
      const banner =
        await HeroBanner.findById(
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
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  };

  module.exports = {
   createHeroBanner,
  getHeroBanners,
  getHeroBannerById,
  updateHeroBanner,
  deleteHeroBanner,
};