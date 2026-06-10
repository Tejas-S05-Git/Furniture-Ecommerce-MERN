import { useState } from "react";
import toast from "react-hot-toast";

const SocialSettings = () => {
  const [formData, setFormData] =
    useState({
      facebook: "",
      instagram: "",
      twitter: "",
      pinterest: "",
      youtube: "",
    });

  const handleChange = (e) => {
    const { name, value } =
      e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success(
      "Social links updated successfully"
    );

    console.log(formData);
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
        Social Media Links
      </h2>

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-6
        "
      >
        {/* Facebook */}

        <div>
          <label className="block mb-2 font-medium">
            Facebook URL
          </label>

          <input
            type="url"
            name="facebook"
            value={
              formData.facebook
            }
            onChange={
              handleChange
            }
            placeholder="https://facebook.com/yourpage"
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

        {/* Instagram */}

        <div>
          <label className="block mb-2 font-medium">
            Instagram URL
          </label>

          <input
            type="url"
            name="instagram"
            value={
              formData.instagram
            }
            onChange={
              handleChange
            }
            placeholder="https://instagram.com/yourpage"
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

        {/* Twitter */}

        <div>
          <label className="block mb-2 font-medium">
            Twitter URL
          </label>

          <input
            type="url"
            name="twitter"
            value={
              formData.twitter
            }
            onChange={
              handleChange
            }
            placeholder="https://twitter.com/yourpage"
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

        {/* Pinterest */}

        <div>
          <label className="block mb-2 font-medium">
            Pinterest URL
          </label>

          <input
            type="url"
            name="pinterest"
            value={
              formData.pinterest
            }
            onChange={
              handleChange
            }
            placeholder="https://pinterest.com/yourpage"
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

        {/* YouTube */}

        <div className="md:col-span-2">
          <label className="block mb-2 font-medium">
            YouTube URL
          </label>

          <input
            type="url"
            name="youtube"
            value={
              formData.youtube
            }
            onChange={
              handleChange
            }
            placeholder="https://youtube.com/@yourchannel"
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
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default SocialSettings;