import { useState } from "react";

const CategoryForm = () => {
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    parentCategory: "",
    status: "active",
    featured: false,
    seoTitle: "",
    seoDescription: "",
  });

  const handleNameChange = (e) => {
    const value = e.target.value;

    setFormData({
      ...formData,
      name: value,
      slug: value
        .toLowerCase()
        .replace(/\s+/g, "-"),
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImagePreview(
      URL.createObjectURL(file)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
      bg-white
      rounded-3xl
      border
      border-zinc-100
      p-6
      lg:p-8
      space-y-8
    "
    >
      {/* Category Information */}

      <div>
        <h2 className="text-xl font-semibold mb-6">
          Category Information
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium">
              Category Name
            </label>

            <input
              type="text"
              value={formData.name}
              onChange={handleNameChange}
              placeholder="Bedroom"
              className="
              w-full
              border
              rounded-2xl
              px-4
              py-3
              outline-none
            "
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Slug
            </label>

            <input
              type="text"
              value={formData.slug}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  slug: e.target.value,
                })
              }
              placeholder="bedroom"
              className="
              w-full
              border
              rounded-2xl
              px-4
              py-3
              outline-none
            "
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block mb-2 font-medium">
            Description
          </label>

          <textarea
            rows={5}
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description:
                  e.target.value,
              })
            }
            className="
            w-full
            border
            rounded-2xl
            p-4
            outline-none
          "
          />
        </div>

        <div className="mt-6">
          <label className="block mb-2 font-medium">
            Parent Category
          </label>

          <select
            value={
              formData.parentCategory
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                parentCategory:
                  e.target.value,
              })
            }
            className="
            w-full
            border
            rounded-2xl
            px-4
            py-3
          "
          >
            <option value="">
              No Parent Category
            </option>

            <option value="Living Room">
              Living Room
            </option>

            <option value="Bedroom">
              Bedroom
            </option>

            <option value="Dining Room">
              Dining Room
            </option>
          </select>
        </div>
      </div>

      {/* Media */}

      <div>
        <h2 className="text-xl font-semibold mb-6">
          Media
        </h2>

        <label
          className="
          border-2
          border-dashed
          rounded-3xl
          p-10
          text-center
          block
          cursor-pointer
        "
        >
          <input
            type="file"
            hidden
            onChange={
              handleImageChange
            }
          />

          <p className="font-medium">
            Upload Category Image
          </p>

          <p className="text-sm text-zinc-500 mt-2">
            JPG, PNG, WEBP
          </p>
        </label>

        {imagePreview && (
          <img
            src={imagePreview}
            alt=""
            className="
            w-48
            h-48
            object-cover
            rounded-2xl
            mt-6
          "
          />
        )}
      </div>

      {/* SEO */}

      <div>
        <h2 className="text-xl font-semibold mb-6">
          SEO Information
        </h2>

        <div className="space-y-6">
          <input
            type="text"
            placeholder="Meta Title"
            value={formData.seoTitle}
            onChange={(e) =>
              setFormData({
                ...formData,
                seoTitle:
                  e.target.value,
              })
            }
            className="
            w-full
            border
            rounded-2xl
            px-4
            py-3
          "
          />

          <textarea
            rows={4}
            placeholder="Meta Description"
            value={
              formData.seoDescription
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                seoDescription:
                  e.target.value,
              })
            }
            className="
            w-full
            border
            rounded-2xl
            p-4
          "
          />
        </div>
      </div>

      {/* Settings */}

      <div>
        <h2 className="text-xl font-semibold mb-6">
          Settings
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium">
              Status
            </label>

            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status:
                    e.target.value,
                })
              }
              className="
              w-full
              border
              rounded-2xl
              px-4
              py-3
            "
            >
              <option value="active">
                Active
              </option>

              <option value="inactive">
                Inactive
              </option>
            </select>
          </div>

          <div className="flex items-center">
            <label className="flex items-center gap-3 mt-8">
              <input
                type="checkbox"
                checked={
                  formData.featured
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    featured:
                      e.target.checked,
                  })
                }
              />

              Featured Category
            </label>
          </div>
        </div>
      </div>

      {/* Actions */}

      <div className="flex justify-end gap-4 pt-4">
        <button
          type="button"
          className="
          px-6
          py-3
          border
          rounded-2xl
        "
        >
          Cancel
        </button>

        <button
          type="submit"
          className="
          bg-primary
          text-white
          px-6
          py-3
          rounded-2xl
        "
        >
          Save Category
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;