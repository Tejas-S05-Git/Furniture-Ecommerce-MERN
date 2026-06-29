import React, { useState, useEffect, } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UploadCloud, Image as ImageIcon, Layers, FileText } from "lucide-react";
import api from "../../services/api";

const defaultFormData = {
  title: "",
  itemsCount: "",
  rating: "",
  startingPrice: "",
  badge: "",
  status: "Active",
};

const CategoryBannerForm = ({ initialData = defaultFormData, isEdit = false }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialData);
  const [imageFile, setImageFile] = useState(null);

  const [imagePreview, setImagePreview] = useState(
    initialData?.image || null
  );
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        itemsCount: initialData.itemsCount || "",
        rating: initialData.rating || "",
        startingPrice:
          initialData.startingPrice || "",
        badge: initialData.badge || "",
        status:
          initialData.status || "Active",
      });

      setImagePreview(
        initialData.image || null
      );
    }
  }, [initialData]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Category name is required");
      return;
    }

    if (!imagePreview) {
      toast.error("Category image is required");
      return;
    }

    if (!formData.itemsCount) {
      toast.error("Items count is required");
      return;
    }

    if (!formData.startingPrice) {
      toast.error("Starting price is required");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("itemsCount", formData.itemsCount);
    formDataToSend.append("rating", formData.rating);
    formDataToSend.append("startingPrice", formData.startingPrice);
    formDataToSend.append("badge", formData.badge);
    formDataToSend.append("status", formData.status);

    if (imageFile) {
      formDataToSend.append("image", imageFile);
    }

    try {
      if (isEdit) {
        await api.put(`/category-banners/${initialData._id}`, formDataToSend);
        toast.success("Category Banner Updated");
      } else {
        await api.post("/category-banners", formDataToSend);
        toast.success("Category Banner Created");
      }
      navigate("/admin/category-banners");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }

    if (!isEdit) {
      setFormData(defaultFormData);
      setImageFile(null);
      setImagePreview(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl mx-auto pb-10">

      {/* SECTION 1: CORE CATEGORY DETAILS */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6 border-b border-zinc-100 pb-4">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
            <Layers size={20} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">Category Specifications</h2>
            <p className="text-xs text-zinc-500">Configure public naming scopes and catalog metrics fields.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Category Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-zinc-700">Category Name</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Living Room Furniture"
              className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-zinc-400 focus:ring-4 focus:ring-zinc-100 transition-all placeholder:text-zinc-400"
            />
          </div>

          {/* Product Count */}
          <div>
            <label className="block mb-2 text-sm font-medium text-zinc-700">Product Allocation Count</label>
            <input
              type="number"
              name="itemsCount"
              value={formData.itemsCount}
              onChange={handleChange}
              placeholder="e.g., 140"
              className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-zinc-400 focus:ring-4 focus:ring-zinc-100 transition-all placeholder:text-zinc-400"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block mb-2 text-sm font-medium text-zinc-700">Display Rating Index</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              placeholder="e.g., 4.8"
              className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-zinc-400 focus:ring-4 focus:ring-zinc-100 transition-all placeholder:text-zinc-400"
            />
          </div>

          {/* Starting Price */}
          <div>
            <label className="block mb-2 text-sm font-medium text-zinc-700">Starting Price Base (₹)</label>
            <input
              type="number"
              name="startingPrice"
              value={formData.startingPrice}
              onChange={handleChange}
              placeholder="e.g., 2999"
              className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-zinc-400 focus:ring-4 focus:ring-zinc-100 transition-all placeholder:text-zinc-400"
            />
          </div>

          {/* Badge */}
          <div>
            <label className="block mb-2 text-sm font-medium text-zinc-700">Ribbon Badge Text</label>
            <input
              type="text"
              name="badge"
              value={formData.badge}
              onChange={handleChange}
              placeholder="e.g., Best Seller / Trending"
              className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-zinc-400 focus:ring-4 focus:ring-zinc-100 transition-all placeholder:text-zinc-400"
            />
          </div>

          {/* Status Select Option */}
          <div>
            <label className="block mb-2 text-sm font-medium text-zinc-700">Visibility Rule State</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-zinc-400 focus:ring-4 focus:ring-zinc-100 transition-all cursor-pointer text-zinc-700"
            >
              <option value="Active">Active (Visible across menu headers)</option>
              <option value="Inactive">Inactive (Stored in drafts system)</option>
            </select>
          </div>
        </div>
      </div>

      {/* SECTION 2: MEDIA INTERFACE CONFIGURATIONS */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6 border-b border-zinc-100 pb-4">
          <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
            <FileText size={20} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">Creative Brand Assets</h2>
            <p className="text-xs text-zinc-500">Handle high resolution transparent creative design media layout uploads.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Enhanced Drag Drop Layout Mask Area */}
          <div className="md:col-span-1">
            <label className="block mb-2 text-sm font-medium text-zinc-700">Category Cover File</label>
            <label className="group flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 hover:border-zinc-400 rounded-xl p-5 cursor-pointer bg-zinc-50/50 hover:bg-zinc-50 transition-all text-center">
              <UploadCloud size={24} className="text-zinc-400 group-hover:text-zinc-600 transition-colors mb-2" />
              <span className="text-xs font-semibold text-zinc-600">Upload new layout asset</span>
              <span className="text-[10px] text-zinc-400 mt-0.5">Supports high-res PNG / SVG templates</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
              />
            </label>
          </div>

          {/* Conditional Asset Rendering Space */}
          {imagePreview && (
            <div className="md:col-span-2">
              <h3 className="text-sm font-semibold text-zinc-800 mb-2 flex items-center gap-1.5">
                <ImageIcon size={14} className="text-zinc-400" />
                Live Mask Layer Preview
              </h3>
              <div className="rounded-xl overflow-hidden border border-zinc-200 bg-zinc-50 p-4 flex items-center justify-center">
                <img
                  src={imagePreview}
                  alt="Asset Preview Rendering"
                  className="max-h-[180px] object-contain rounded-lg shadow-sm"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER ACTIONS STRIP */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          className="bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-sm px-6 py-3 rounded-xl transition-colors shadow-sm"
        >
          {isEdit ? "Update Categorization Info" : "Publish Live Category Card"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/admin/category-banners")}
          className="border border-zinc-200 hover:bg-zinc-50 text-zinc-600 font-medium text-sm px-6 py-3 rounded-xl transition-colors"
        >
          Cancel
        </button>
      </div>

    </form>
  );
};

export default CategoryBannerForm;