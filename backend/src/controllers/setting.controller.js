const Setting = require("../models/Setting.model");

const cloudinary = require("../config/cloudinary");


const getSettings =
  async (req, res) => {
    try {
      let settings =
        await Setting.findOne();

      if (!settings) {
        settings =
          await Setting.create({});
      }

      res.status(200).json({
        success: true,
        settings,
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

  const updateSettings =
  async (req, res) => {
    try {
      let settings =
        await Setting.findOne();

      if (!settings) {
        settings =
          await Setting.create({});
      }

      Object.assign(
        settings,
        req.body
      );

      await settings.save();

      res.status(200).json({
        success: true,
        message:
          "Settings updated successfully",
        settings,
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


  const updateBranding =
  async (req, res) => {
    try {
      let settings =
        await Setting.findOne();

      if (!settings) {
        settings =
          await Setting.create({});
      }

      if (req.files?.logo) {
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
                      "furniture/settings",
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
                  req.files.logo[0]
                    .buffer
                );
            }
          );

        settings.logo =
          result.secure_url;
      }

      if (
        req.files?.favicon
      ) {
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
                      "furniture/settings",
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
                  req.files.favicon[0]
                    .buffer
                );
            }
          );

        settings.favicon =
          result.secure_url;
      }

      await settings.save();

      res.status(200).json({
        success: true,
        message:
          "Branding updated successfully",
        settings,
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
  getSettings,
  updateSettings,
  updateBranding,
};