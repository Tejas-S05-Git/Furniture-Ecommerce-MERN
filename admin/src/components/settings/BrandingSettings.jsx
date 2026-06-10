import { useState } from "react";
import toast from "react-hot-toast";

const BrandingSettings = () => {
  const [logoPreview, setLogoPreview] =
    useState(null);

  const [
    faviconPreview,
    setFaviconPreview,
  ] = useState(null);

  const handleLogoUpload = (
    e
  ) => {
    const file =
      e.target.files?.[0];

    if (!file) return;

    setLogoPreview(
      URL.createObjectURL(file)
    );
  };

  const handleFaviconUpload = (
    e
  ) => {
    const file =
      e.target.files?.[0];

    if (!file) return;

    setFaviconPreview(
      URL.createObjectURL(file)
    );
  };

  const handleSave = () => {
    toast.success(
      "Branding settings saved successfully"
    );
  };

  return (
    <div
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
        Branding Settings
      </h2>

      <div
        className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-8
        "
      >
        {/* Logo */}

        <div>
          <label
            className="
            block
            font-medium
            mb-3
            "
          >
            Store Logo
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={
              handleLogoUpload
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

          {logoPreview && (
            <div
              className="
              mt-6
              border
              rounded-3xl
              p-6
              bg-zinc-50
              "
            >
              <img
                src={logoPreview}
                alt=""
                className="
                h-28
                object-contain
                mx-auto
                "
              />
            </div>
          )}
        </div>

        {/* Favicon */}

        <div>
          <label
            className="
            block
            font-medium
            mb-3
            "
          >
            Favicon
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={
              handleFaviconUpload
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

          {faviconPreview && (
            <div
              className="
              mt-6
              border
              rounded-3xl
              p-6
              bg-zinc-50
              flex
              justify-center
              "
            >
              <img
                src={
                  faviconPreview
                }
                alt=""
                className="
                w-20
                h-20
                object-contain
                "
              />
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={handleSave}
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
    </div>
  );
};

export default BrandingSettings;