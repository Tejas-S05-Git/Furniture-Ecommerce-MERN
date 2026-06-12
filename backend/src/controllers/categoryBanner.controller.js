const CategoryBanner = require("../models/CategoryBanner.model");

const cloudinary = require("../config/cloudinary");


const createCategoryBanner =
  async (req, res) => {
    try {
      const {
        title,
        itemsCount,
        rating,
        startingPrice,
        badge,
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
                      "furniture/category-banners",
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
        await CategoryBanner.create(
          {
            title,
            image:
              imageUrl,
            itemsCount,
            rating,
            startingPrice,
            badge,
            status,
            createdBy:
              req.user.id,
          }
        );

      res.status(201).json({
        success: true,
        message:
          "Category banner created successfully",
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

  const getCategoryBanners =
  async (req, res) => {
    try {
      const banners =
        await CategoryBanner.find()
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
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  };

  const getCategoryBannerById =
  async (req, res) => {
    try {
      const banner =
        await CategoryBanner.findById(
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

  const updateCategoryBanner =
  async (req, res) => {
    try {
      const banner =
        await CategoryBanner.findById(
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
                      "furniture/category-banners",
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

      banner.itemsCount =
        req.body.itemsCount ??
        banner.itemsCount;

      banner.rating =
        req.body.rating ??
        banner.rating;

      banner.startingPrice =
        req.body.startingPrice ??
        banner.startingPrice;

      banner.badge =
        req.body.badge ??
        banner.badge;

      banner.status =
        req.body.status ??
        banner.status;

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


  const deleteCategoryBanner =
  async (req, res) => {
    try {
      const banner =
        await CategoryBanner.findById(
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
  createCategoryBanner,
  getCategoryBanners,
  getCategoryBannerById,
  updateCategoryBanner,
  deleteCategoryBanner,
};