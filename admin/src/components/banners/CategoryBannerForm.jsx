import { useState } from "react";
import toast from "react-hot-toast";

const defaultFormData = {
  title: "",
  itemsCount: "",
  rating: "",
  startingPrice: "",
  badge: "",
  status: "Active",
};

const CategoryBannerForm = ({
  initialData = defaultFormData,
  isEdit = false,
}) => {
  const [formData, setFormData] =
    useState(initialData);

  const [imageFile, setImageFile] =
    useState(null);

  const [
    imagePreview,
    setImagePreview,
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

    setImageFile(file);

    setImagePreview(
      URL.createObjectURL(file)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error(
        "Category name is required"
      );
      return;
    }

    if (!imagePreview) {
      toast.error(
        "Category image is required"
      );
      return;
    }

    if (!formData.itemsCount) {
      toast.error(
        "Items count is required"
      );
      return;
    }

    if (!formData.startingPrice) {
      toast.error(
        "Starting price is required"
      );
      return;
    }

    const categoryData = {
      ...formData,
      image:
        imageFile ||
        imagePreview,
    };

    console.log(
      "Category Banner:",
      categoryData
    );

    toast.success(
      isEdit
        ? "Category banner updated successfully"
        : "Category banner created successfully"
    );

    if (!isEdit) {
      setFormData(
        defaultFormData
      );

      setImageFile(null);

      setImagePreview(
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
      {/* Category Info */}

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
          Category Information
        </h2>

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
          "
        >
          {/* Name */}

          <div>
            <label className="block mb-2 font-medium">
              Category Name
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
              placeholder="Living Room"
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

          {/* Products */}

          <div>
            <label className="block mb-2 font-medium">
              Product Count
            </label>

            <input
              type="number"
              name="itemsCount"
              value={
                formData.itemsCount
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
            />
          </div>

          {/* Rating */}

          <div>
            <label className="block mb-2 font-medium">
              Rating
            </label>

            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              name="rating"
              value={
                formData.rating
              }
              onChange={
                handleChange
              }
              placeholder="4.8"
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

          {/* Price */}

          <div>
            <label className="block mb-2 font-medium">
              Starting Price
            </label>

            <input
              type="number"
              name="startingPrice"
              value={
                formData.startingPrice
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
            />
          </div>

          {/* Badge */}

          <div>
            <label className="block mb-2 font-medium">
              Badge
            </label>

            <input
              type="text"
              name="badge"
              value={
                formData.badge
              }
              onChange={
                handleChange
              }
              placeholder="Best Seller"
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
      </div>

      {/* Image Upload */}

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
          Category Image
        </h2>

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

        {imagePreview && (
          <div className="mt-6">
            <img
              src={
                imagePreview
              }
              alt=""
              className="
              w-full
              max-w-md
              h-72
              object-contain
              bg-zinc-50
              rounded-3xl
              border
              "
            />
          </div>
        )}
      </div>

      {/* Buttons */}

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
            ? "Update Category Banner"
            : "Create Category Banner"}
        </button>

        <button
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

export default CategoryBannerForm;