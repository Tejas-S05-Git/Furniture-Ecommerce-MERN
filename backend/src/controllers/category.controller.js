const Category = require("../models/Category.model");
const cloudinary = require("../config/cloudinary");
const createCategory = async (req, res) => {
  try {
    const {
      name,
      slug,
      description,
      parentCategory,
      status,
      featured,
      seoTitle,
      seoDescription,
    } = req.body;

    const existingCategory = await Category.findOne({
      slug,
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    let imageUrl = "";

if (req.file) {
  const result =
    await new Promise(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder:
                "furniture/categories",
            },
            (error, result) => {
              if (error)
                reject(error);

              resolve(result);
            }
          )
          .end(req.file.buffer);
      }
    );

  imageUrl = result.secure_url;
}

    const category = await Category.create({
      name,
      slug,
      description,
      image: imageUrl,
      parentCategory: parentCategory || null,
      status,
      featured,
      seoTitle,
      seoDescription,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


const getAllCategories = async (
  req,
  res
) => {
  try {
    const categories =
      await Category.find()
        .populate(
          "createdBy",
          "firstName lastName email"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getCategoryById = async (
  req,
  res
) => {
  try {
    const category =
      await Category.findById(
        req.params.id
      )
        .populate(
          "createdBy",
          "firstName lastName email"
        )
        .populate(
          "parentCategory",
          "name slug"
        );

    if (!category) {
      return res.status(404).json({
        success: false,
        message:
          "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


const updateCategory = async (
  req,
  res
) => {
  try {
    const {
      name,
      slug,
      description,
      parentCategory,
      status,
      featured,
      seoTitle,
      seoDescription,
    } = req.body;

    const category =
      await Category.findById(
        req.params.id
      );

    if (!category) {
      return res.status(404).json({
        success: false,
        message:
          "Category not found",
      });
    }

    category.name =
      name || category.name;

    category.slug =
      slug || category.slug;

    category.description =
      description ||
      category.description;

    category.parentCategory =
      parentCategory || null;

    category.status =
      status || category.status;

    category.featured =
      featured;

    category.seoTitle =
      seoTitle ||
      category.seoTitle;

    category.seoDescription =
      seoDescription ||
      category.seoDescription;

    await category.save();

    res.status(200).json({
      success: true,
      message:
        "Category updated successfully",
      category,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const deleteCategory = async (
  req,
  res
) => {
  try {
    const category =
      await Category.findById(
        req.params.id
      );

    if (!category) {
      return res.status(404).json({
        success: false,
        message:
          "Category not found",
      });
    }

    await category.deleteOne();

    res.status(200).json({
      success: true,
      message:
        "Category deleted successfully",
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
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
