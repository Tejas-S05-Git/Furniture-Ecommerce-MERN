import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UploadCloud, Image as ImageIcon, Layout, Palette } from "lucide-react";
import api from "../../services/api";

const defaultFormData = {
  title: "",
  subtitle: "",
  badgeText: "",
  topTag: "",
  buttonText: "",
  buttonLink: "",
  backgroundColor: "#FFBB35",
  status: "Active",
};

const HeroBannerForm = ({ initialData = defaultFormData, isEdit = false }) => {
  const [formData, setFormData] = useState(initialData);
  const [bannerFile, setBannerFile] = useState(null);
  const navigate = useNavigate();

  const [bannerPreview, setBannerPreview] = useState(
    initialData?.image || null
  );

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

    setBannerFile(file);
    setBannerPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const form = new FormData();

      form.append("title", formData.title);

      form.append("subtitle", formData.subtitle);

      form.append("badgeText", formData.badgeText);

      form.append("topTag", formData.topTag);

      form.append("buttonText", formData.buttonText);

      form.append("buttonLink", formData.buttonLink);

      form.append("backgroundColor", formData.backgroundColor);

      form.append(
        "active",
        formData.status === "Active"
      );

      if (bannerFile) {

        form.append(
          "image",
          bannerFile
        );

      }

      if (isEdit) {

        await api.put(
          `/hero-banners/${initialData._id}`,
          form
        );

        toast.success(
          "Banner updated successfully"
        );

      }

      else {

        await api.post(
          "/hero-banners",
          form
        );

        toast.success(
          "Banner created successfully"
        );

      }

      navigate("/admin/banners");

    }

    catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }

  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl mx-auto pb-10">

      {/* SECTION 1: BANNER META INFORMATION */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6 border-b border-zinc-100 pb-4">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
            <Layout size={20} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">Banner Content</h2>
            <p className="text-xs text-zinc-500">Configure textual layouts and contextual metadata.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Title */}
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-medium text-zinc-700">Banner Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Premium Gaming Ergonomics"
              className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-zinc-400 focus:ring-4 focus:ring-zinc-100 transition-all placeholder:text-zinc-400"
            />
          </div>

          {/* Discount Badge */}
          <div>
            <label className="block mb-2 text-sm font-medium text-zinc-700">Discount Badge</label>
            <input
              type="text"
              name="badgeText"
              value={formData.badgeText}
              onChange={handleChange}
              placeholder="e.g., Flat 20% Off"
              className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-zinc-400 focus:ring-4 focus:ring-zinc-100 transition-all placeholder:text-zinc-400"
            />
          </div>

          {/* Top Tag */}
          <div>
            <label className="block mb-2 text-sm font-medium text-zinc-700">Top Tag Title</label>
            <input
              type="text"
              name="topTag"
              value={formData.topTag}
              onChange={handleChange}
              placeholder="e.g., SEASONAL SALE"
              className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-zinc-400 focus:ring-4 focus:ring-zinc-100 transition-all placeholder:text-zinc-400"
            />
          </div>

          {/* Button Text */}
          <div>
            <label className="block mb-2 text-sm font-medium text-zinc-700">Action Button Text</label>
            <input
              type="text"
              name="buttonText"
              value={formData.buttonText}
              onChange={handleChange}
              placeholder="e.g., Shop Now"
              className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-zinc-400 focus:ring-4 focus:ring-zinc-100 transition-all placeholder:text-zinc-400"
            />
          </div>

          {/* Button Link */}
          <div>
            <label className="block mb-2 text-sm font-medium text-zinc-700">Action Destination URL</label>
            <input
              type="text"
              name="buttonLink"
              value={formData.buttonLink}
              onChange={handleChange}
              placeholder="e.g., /catalog/gaming-chairs"
              className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-zinc-400 focus:ring-4 focus:ring-zinc-100 transition-all placeholder:text-zinc-400"
            />
          </div>

          {/* Status Configuration */}
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-medium text-zinc-700">Visibility Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-zinc-400 focus:ring-4 focus:ring-zinc-100 transition-all cursor-pointer text-zinc-700"
            >
              <option value="Active">Active (Visible globally)</option>
              <option value="Inactive">Inactive (Hidden from storefront)</option>
            </select>
          </div>

          {/* Subtitle Textarea */}
          <div className="md:col-span-2 mt-1">
            <label className="block mb-2 text-sm font-medium text-zinc-700">Description Subtitle</label>
            <textarea
              rows={3}
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              placeholder="Provide a compelling descriptive baseline for this promotion..."
              className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-zinc-400 focus:ring-4 focus:ring-zinc-100 transition-all resize-none placeholder:text-zinc-400"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: DESIGN INTERFACE PARAMETERS */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6 border-b border-zinc-100 pb-4">
          <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
            <Palette size={20} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">Design Specifications</h2>
            <p className="text-xs text-zinc-500">Handle palette options, file configurations, and rendering previews.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Color Picker Structure */}
          <div>
            <label className="block mb-2 text-sm font-medium text-zinc-700">Canvas Canvas Background Color</label>
            <div className="flex gap-3 items-center">
              <div className="relative w-14 h-11 rounded-xl border border-zinc-200 overflow-hidden shrink-0 shadow-sm">
                <input
                  type="color"
                  name="backgroundColor"
                  value={formData.backgroundColor}
                  onChange={handleChange}
                  className="absolute -inset-2 w-[200%] h-[200%] cursor-pointer border-none p-0"
                />
              </div>
              <input
                type="text"
                value={formData.backgroundColor}
                onChange={handleChange}
                name="backgroundColor"
                placeholder="#000000"
                className="flex-1 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-zinc-400 font-mono text-zinc-700"
              />
            </div>
          </div>

          {/* Clean Upload Area UI Dropzone */}
          <div>
            <label className="block mb-2 text-sm font-medium text-zinc-700">Creative Media File</label>
            <label className="group flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 hover:border-zinc-400 rounded-xl p-4 cursor-pointer bg-zinc-50/50 hover:bg-zinc-50 transition-all text-center">
              <UploadCloud size={24} className="text-zinc-400 group-hover:text-zinc-600 transition-colors mb-1.5" />
              <span className="text-xs font-semibold text-zinc-600">Click to upload assets</span>
              <span className="text-[10px] text-zinc-400 mt-0.5">Supports PNG, JPEG, SVG up to 5MB</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Scaled Preview Asset Box */}
        {bannerPreview && (
          <div className="mt-6 border-t border-zinc-100 pt-6">
            <h3 className="text-sm font-semibold text-zinc-800 mb-3 flex items-center gap-1.5">
              <ImageIcon size={15} className="text-zinc-400" />
              Storefront Preview Rendering
            </h3>
            <div className="rounded-xl overflow-hidden border border-zinc-200 bg-zinc-50 flex items-center justify-center p-4">
              <img
                src={bannerPreview}
                alt="Banner View Rendering"
                className="w-full max-h-[260px] object-contain rounded-lg shadow-sm"
              />
            </div>
          </div>
        )}
      </div>

      {/* --- EXECUTION ACTION FOOTE BLOCK --- */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          className="bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-sm px-6 py-3 rounded-xl transition-colors shadow-sm"
        >
          {isEdit ? "Save Configurations" : "Launch Promotion Banner"}
        </button>

        <button
          onClick={() => navigate(-1)}
          type="button"
          className="border border-zinc-200 hover:bg-zinc-50 text-zinc-600 font-medium text-sm px-6 py-3 rounded-xl transition-colors"
        >
          Cancel
        </button>
      </div>

    </form>
  );
};

export default HeroBannerForm;