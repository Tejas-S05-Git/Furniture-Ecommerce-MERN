const Product = require("../models/Product.model");
const Category = require("../models/Category.model");

const cloudinary = require("../config/cloudinary");



const createProduct = async (
  req,
  res
) => {
  try {
    const {
      title,
      category,
      brand,
      sku,

      shortDescription,
      description,

      price,
      oldPrice,
      discount,

      quantity,
      stock,

      color,
      material,

      features,
      tags,
      colors,

      seoTitle,
      seoDescription,

      featured,
      active,

      additionalInformation,
    } = req.body;

    const generatedSlug = title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

    const existingProduct =
      await Product.findOne({
        $or: [
          {
            slug: generatedSlug,
          },
          {
            sku,
          },
        ],
      });

    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message:
          "Product already exists",
      });
    }

    const categoryExists =
      await Category.findById(
        category
      );

    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message:
          "Category not found",
      });
    }

    const parsedFeatures =
      features
        ? JSON.parse(features)
        : [];

    const parsedTags = tags
      ? JSON.parse(tags)
      : [];

    const parsedColors =
      colors
        ? JSON.parse(colors)
        : [];

    const parsedAdditionalInformation =
      additionalInformation
        ? JSON.parse(
            additionalInformation
          )
        : {};

    let thumbnailUrl = "";

    const galleryUrls = [];

    if (
      req.files &&
      req.files.thumbnail
    ) {
      const file =
        req.files.thumbnail[0];

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
                    "furniture/products/thumbnails",
                },
                (
                  error,
                  result
                ) => {
                  if (error)
                    reject(error);

                  resolve(
                    result
                  );
                }
              )
              .end(
                file.buffer
              );
          }
        );

      thumbnailUrl =
        result.secure_url;
    }

    if (
      req.files &&
      req.files.images
    ) {
      for (const file of req.files
        .images) {
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
                      "furniture/products/gallery",
                  },
                  (
                    error,
                    result
                  ) => {
                    if (error)
                      reject(
                        error
                      );

                    resolve(
                      result
                    );
                  }
                )
                .end(
                  file.buffer
                );
            }
          );

        galleryUrls.push(
          result.secure_url
        );
      }
    }

    const product =
      await Product.create({
        title,
        slug:
          generatedSlug,

        category,

        brand,
        sku,

        shortDescription,
        description,

        price,
        oldPrice,
        discount,

        quantity,
        stock,

        color,
        material,

        thumbnail:
          thumbnailUrl,

        images:
          galleryUrls,

        features:
          parsedFeatures,

        tags:
          parsedTags,

        colors:
          parsedColors,

        seoTitle,
        seoDescription,

        featured,
        active,

        additionalInformation:
          parsedAdditionalInformation,

        createdBy:
          req.user.id,
      });

    res.status(201).json({
      success: true,
      message:
        "Product created successfully",
      product,
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


const getAllProducts = async (
  req,
  res
) => {
  try {
    const products =
      await Product.find()
        .populate(
          "category",
          "name slug"
        )
        .populate(
          "createdBy",
          "firstName lastName email"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getProductById = async (
  req,
  res
) => {
  try {
    const product =
      await Product.findById(
        req.params.id
      )
        .populate(
          "category",
          "name slug"
        )
        .populate(
          "createdBy",
          "firstName lastName email"
        );

    if (!product) {
      return res.status(404).json({
        success: false,
        message:
          "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const updateProduct = async (
  req,
  res
) => {
  try {
    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message:
          "Product not found",
      });
    }

    const parseField = (
      value
    ) => {
      if (
        !value ||
        value === "undefined"
      ) {
        return undefined;
      }

      let parsed =
        JSON.parse(value);

      // Handle old malformed data
      if (
        Array.isArray(parsed) &&
        parsed.length === 1 &&
        typeof parsed[0] ===
          "string" &&
        parsed[0].startsWith(
          "["
        )
      ) {
        parsed = JSON.parse(
          parsed[0]
        );
      }

      return parsed;
    };

    // Parse JSON fields
    req.body.features =
      parseField(
        req.body.features
      );

    req.body.tags =
      parseField(
        req.body.tags
      );

    req.body.colors =
      parseField(
        req.body.colors
      );

    req.body.additionalInformation =
      parseField(
        req.body
          .additionalInformation
      );

    // Remove undefined fields
    Object.keys(req.body).forEach(
      (key) => {
        if (
          req.body[key] ===
          undefined
        ) {
          delete req.body[key];
        }
      }
    );

    // Update normal fields
    Object.keys(req.body).forEach(
      (key) => {
        product[key] =
          req.body[key];
      }
    );

    // Update Thumbnail
    if (
      req.files &&
      req.files.thumbnail
    ) {
      const file =
        req.files.thumbnail[0];

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
                    "furniture/products/thumbnails",
                },
                (
                  error,
                  result
                ) => {
                  if (
                    error
                  ) {
                    reject(
                      error
                    );
                  }

                  resolve(
                    result
                  );
                }
              )
              .end(
                file.buffer
              );
          }
        );

      product.thumbnail =
        result.secure_url;
    }

    // Update Gallery Images
    if (
      req.files &&
      req.files.images
    ) {
      const galleryUrls =
        [];

      for (const file of req
        .files.images) {
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
                      "furniture/products/gallery",
                  },
                  (
                    error,
                    result
                  ) => {
                    if (
                      error
                    ) {
                      reject(
                        error
                      );
                    }

                    resolve(
                      result
                    );
                  }
                )
                .end(
                  file.buffer
                );
            }
          );

        galleryUrls.push(
          result.secure_url
        );
      }

      product.images =
        galleryUrls;
    }

    console.log(
      "FEATURES:",
      product.features
    );

    console.log(
      "TAGS:",
      product.tags
    );

    console.log(
      "COLORS:",
      product.colors
    );

    console.log(
      "ADDITIONAL:",
      product.additionalInformation
    );

    await product.save();

    res.status(200).json({
      success: true,
      message:
        "Product updated successfully",
      product,
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

const deleteProduct = async (
  req,
  res
) => {
  try {
    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message:
          "Product not found",
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message:
        "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};

