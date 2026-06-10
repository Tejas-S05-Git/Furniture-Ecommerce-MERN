import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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

const HeroBannerForm = ({
  initialData = defaultFormData,
  isEdit = false,
}) => {
  const [formData, setFormData] =
    useState(initialData);

  const [bannerFile, setBannerFile] =
    useState(null);

    const navigate = useNavigate();

  const [
    bannerPreview,
    setBannerPreview,
  ] = useState(
    initialData?.image || null
  );

  const handleChange = (e) => {
    const { name, value } =
      e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImage = (e) => {
    const file =
      e.target.files?.[0];

    if (!file) return;

    setBannerFile(file);

    setBannerPreview(
      URL.createObjectURL(file)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error(
        "Banner title is required"
      );
      return;
    }

    if (
      !formData.subtitle.trim()
    ) {
      toast.error(
        "Subtitle is required"
      );
      return;
    }

    if (!bannerPreview) {
      toast.error(
        "Banner image is required"
      );
      return;
    }

    const bannerData = {
      ...formData,

      image:
        bannerFile ||
        bannerPreview,
    };

    console.log(
      "Banner Data:",
      bannerData
    );

    toast.success(
      isEdit
        ? "Banner updated successfully"
        : "Banner created successfully"
    );

    if (!isEdit) {
      setFormData(
        defaultFormData
      );

      setBannerFile(null);

      setBannerPreview(
        null
      );
    }
  };

  return (
    <form
      onSubmit={
        handleSubmit
      }
      className="space-y-8"
    >
      {/* Banner Information */}

      <div
        className="
        bg-white
        rounded-3xl
        border
        border-zinc-100
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
          Banner Information
        </h2>

        <div
          className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-6
          "
        >
          {/* Title */}

          <div>
            <label className="block mb-2 font-medium">
              Banner Title
            </label>

            <input
              type="text"
              name="title"
              value={
                formData.title
              }
              onChange={
                handleChange
              }
              placeholder="Latest Gaming Chairs"
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

          {/* Badge */}

          <div>
            <label className="block mb-2 font-medium">
              Discount Badge
            </label>

            <input
              type="text"
              name="badgeText"
              value={
                formData.badgeText
              }
              onChange={
                handleChange
              }
              placeholder="Flat 20% Discount"
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

          {/* Top Tag */}

          <div>
            <label className="block mb-2 font-medium">
              Top Tag
            </label>

            <input
              type="text"
              name="topTag"
              value={
                formData.topTag
              }
              onChange={
                handleChange
              }
              placeholder="HOT SALE"
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

          {/* Button Text */}

          <div>
            <label className="block mb-2 font-medium">
              Button Text
            </label>

            <input
              type="text"
              name="buttonText"
              value={
                formData.buttonText
              }
              onChange={
                handleChange
              }
              placeholder="Shop Now"
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

          {/* Button Link */}

          <div>
            <label className="block mb-2 font-medium">
              Button Link
            </label>

            <input
              type="text"
              name="buttonLink"
              value={
                formData.buttonLink
              }
              onChange={
                handleChange
              }
              placeholder="/shop"
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

          {/* Status */}

          <div>
            <label className="block mb-2 font-medium">
              Status
            </label>

            <select
              name="status"
              value={
                formData.status
              }
              onChange={
                handleChange
              }
              className="
              w-full
              border
              border-zinc-200
              rounded-2xl
              px-4
              py-3
              "
            >
              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>
            </select>
          </div>
        </div>

        {/* Subtitle */}

        <div className="mt-6">
          <label className="block mb-2 font-medium">
            Subtitle
          </label>

          <textarea
            rows={4}
            name="subtitle"
            value={
              formData.subtitle
            }
            onChange={
              handleChange
            }
            placeholder="Discover premium gaming chairs..."
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
      </div>

      {/* Design Settings */}

      <div
        className="
        bg-white
        rounded-3xl
        border
        border-zinc-100
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
          Design Settings
        </h2>

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
          "
        >
          {/* Color Picker */}

          <div>
            <label className="block mb-2 font-medium">
              Background Color
            </label>

            <div className="flex gap-4 items-center">
              <input
                type="color"
                name="backgroundColor"
                value={
                  formData.backgroundColor
                }
                onChange={
                  handleChange
                }
                className="
                w-16
                h-12
                border
                rounded-xl
                "
              />

              <input
                type="text"
                value={
                  formData.backgroundColor
                }
                onChange={
                  handleChange
                }
                name="backgroundColor"
                className="
                flex-1
                border
                border-zinc-200
                rounded-2xl
                px-4
                py-3
                "
              />
            </div>
          </div>

          {/* Upload */}

          <div>
            <label className="block mb-2 font-medium">
              Banner Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={
                handleImage
              }
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

        {/* Preview */}

        {bannerPreview && (
          <div className="mt-8">
            <h3
              className="
              font-medium
              mb-4
              "
            >
              Banner Preview
            </h3>

            <div
              className="
              rounded-3xl
              overflow-hidden
              border
              "
            >
              <img
                src={
                  bannerPreview
                }
                alt=""
                className="
                w-full
                h-[220px]
                md:h-[320px]
                object-contain
                "
              />
            </div>
          </div>
        )}
      </div>

      {/* Actions */}

      <div
        className="
        flex
        flex-col
        sm:flex-row
        gap-4
        "
      >
        <button
          type="submit"
          className="
          bg-primary
          text-white
          px-8
          py-3
          rounded-2xl
          "
        >
          {isEdit
            ? "Update Banner"
            : "Create Banner"}
        </button>

        <button
        onClick={()=>navigate(-1)}
        
          type="button"
          className="
          border
          border-zinc-200
          px-8
          py-3
          rounded-2xl
          "
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default HeroBannerForm;