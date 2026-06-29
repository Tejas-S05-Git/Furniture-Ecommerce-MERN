import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";

const SeoSettings = () => {
  const [formData, setFormData] =
    useState({
      metaTitle:
        "Furniture Store",

      metaDescription:
        "",

      metaKeywords:
        "",

      googleAnalytics:
        "",

      googleTagManager:
        "",
    });
  const [loading, setLoading] =
    useState(false);

  const fetchSettings = async () => {
    try {

      const response =
        await api.get("/settings");

      const settings =
        response.data.settings;

      setFormData({
        metaTitle:
          settings.metaTitle || "",

        metaDescription:
          settings.metaDescription || "",

        metaKeywords:
          settings.metaKeywords || "",

        googleAnalytics:
          settings.googleAnalytics || "",

        googleTagManager:
          settings.googleTagManager || "",
      });

    } catch (error) {

      console.log(error);

      toast.error(
        "Unable to load SEO settings"
      );

    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);
  const handleChange = (e) => {
    const { name, value } =
      e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await api.put(
        "/settings",
        formData
      );

      toast.success(
        "SEO Settings Updated Successfully"
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Unable to update SEO settings"
      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
      bg-white
      border
      border-zinc-100
      rounded-3xl
      p-6
      "
    >
      <h2
        className="
        text-xl
        font-semibold
        mb-6
        "
      >
        SEO Settings
      </h2>

      <div className="space-y-6">

        {/* Meta Title */}

        <div>
          <label className="block mb-2 font-medium">
            Meta Title
          </label>

          <input
            type="text"
            name="metaTitle"
            value={
              formData.metaTitle
            }
            onChange={
              handleChange
            }
            placeholder="Furniture Store"
            className="
            w-full
            border
            border-zinc-200
            rounded-2xl
            px-4
            py-3
            "
          />
        </div>

        {/* Meta Description */}

        <div>
          <label className="block mb-2 font-medium">
            Meta Description
          </label>

          <textarea
            rows={5}
            name="metaDescription"
            value={
              formData.metaDescription
            }
            onChange={
              handleChange
            }
            placeholder="Enter SEO description..."
            className="
            w-full
            border
            border-zinc-200
            rounded-2xl
            px-4
            py-3
            resize-none
            "
          />
        </div>

        {/* Keywords */}

        <div>
          <label className="block mb-2 font-medium">
            Meta Keywords
          </label>

          <input
            type="text"
            name="metaKeywords"
            value={
              formData.metaKeywords
            }
            onChange={
              handleChange
            }
            placeholder="furniture, sofa, chair, table"
            className="
            w-full
            border
            border-zinc-200
            rounded-2xl
            px-4
            py-3
            "
          />
        </div>

        {/* Google Analytics */}

        <div>
          <label className="block mb-2 font-medium">
            Google Analytics ID
          </label>

          <input
            type="text"
            name="googleAnalytics"
            value={
              formData.googleAnalytics
            }
            onChange={
              handleChange
            }
            placeholder="G-XXXXXXXXXX"
            className="
            w-full
            border
            border-zinc-200
            rounded-2xl
            px-4
            py-3
            "
          />
        </div>

        {/* GTM */}

        <div>
          <label className="block mb-2 font-medium">
            Google Tag Manager ID
          </label>

          <input
            type="text"
            name="googleTagManager"
            value={
              formData.googleTagManager
            }
            onChange={
              handleChange
            }
            placeholder="GTM-XXXXXXX"
            className="
            w-full
            border
            border-zinc-200
            rounded-2xl
            px-4
            py-3
            "
          />
        </div>

      </div>

      <div className="mt-8">
        <button
          type="submit"
          disabled={loading}
          className="
          bg-primary
          text-white
          px-8
          py-3
          rounded-2xl
          hover:opacity-90
          transition
          "
        >
          {loading
            ? "Saving..."
            : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default SeoSettings;