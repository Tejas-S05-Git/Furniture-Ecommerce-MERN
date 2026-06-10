import { useState } from "react";
import toast from "react-hot-toast";

const GeneralSettings = () => {
  const [formData, setFormData] =
    useState({
      storeName:
        "Furniture Store",

      storeEmail:
        "admin@furniture.com",

      storePhone:
        "+91 9876543210",

      storeAddress:
        "Pune, Maharashtra, India",
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
      "Settings saved successfully"
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
        General Settings
      </h2>

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-6
        "
      >
        {/* Store Name */}

        <div>
          <label
            className="
            block
            mb-2
            font-medium
            "
          >
            Store Name
          </label>

          <input
            type="text"
            name="storeName"
            value={
              formData.storeName
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

        {/* Store Email */}

        <div>
          <label
            className="
            block
            mb-2
            font-medium
            "
          >
            Store Email
          </label>

          <input
            type="email"
            name="storeEmail"
            value={
              formData.storeEmail
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

        {/* Store Phone */}

        <div>
          <label
            className="
            block
            mb-2
            font-medium
            "
          >
            Store Phone
          </label>

          <input
            type="text"
            name="storePhone"
            value={
              formData.storePhone
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

        {/* Store Address */}

        <div>
          <label
            className="
            block
            mb-2
            font-medium
            "
          >
            Store Address
          </label>

          <input
            type="text"
            name="storeAddress"
            value={
              formData.storeAddress
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

export default GeneralSettings;