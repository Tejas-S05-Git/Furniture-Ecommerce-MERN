import { useState } from "react";
import toast from "react-hot-toast";

const SecuritySettings = () => {
  const [formData, setFormData] =
    useState({
      adminEmail:
        "admin@furniture.com",

      currentPassword: "",

      newPassword: "",

      confirmPassword: "",

      twoFactorAuth: false,
    });

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.newPassword &&
      formData.newPassword !==
        formData.confirmPassword
    ) {
      toast.error(
        "Passwords do not match"
      );

      return;
    }

    toast.success(
      "Security settings updated successfully"
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
        Security Settings
      </h2>

      <div className="space-y-6">

        {/* Admin Email */}

        <div>
          <label
            className="
            block
            mb-2
            font-medium
            "
          >
            Admin Email
          </label>

          <input
            type="email"
            name="adminEmail"
            value={
              formData.adminEmail
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

        {/* Current Password */}

        <div>
          <label
            className="
            block
            mb-2
            font-medium
            "
          >
            Current Password
          </label>

          <input
            type="password"
            name="currentPassword"
            value={
              formData.currentPassword
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

        {/* New Password */}

        <div>
          <label
            className="
            block
            mb-2
            font-medium
            "
          >
            New Password
          </label>

          <input
            type="password"
            name="newPassword"
            value={
              formData.newPassword
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

        {/* Confirm Password */}

        <div>
          <label
            className="
            block
            mb-2
            font-medium
            "
          >
            Confirm Password
          </label>

          <input
            type="password"
            name="confirmPassword"
            value={
              formData.confirmPassword
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

        {/* Two Factor */}

        <div
          className="
          flex
          items-center
          justify-between
          border
          border-zinc-100
          rounded-2xl
          p-4
          "
        >
          <div>
            <h3
              className="
              font-medium
              "
            >
              Two Factor Authentication
            </h3>

            <p
              className="
              text-sm
              text-zinc-500
              mt-1
              "
            >
              Add extra security to
              your account
            </p>
          </div>

          <label
            className="
            relative
            inline-flex
            items-center
            cursor-pointer
            "
          >
            <input
              type="checkbox"
              name="twoFactorAuth"
              checked={
                formData.twoFactorAuth
              }
              onChange={
                handleChange
              }
              className="sr-only peer"
            />

            <div
              className="
              w-12
              h-6
              bg-zinc-300
              rounded-full
              peer
              peer-checked:bg-primary
              after:content-['']
              after:absolute
              after:top-[2px]
              after:left-[2px]
              after:bg-white
              after:w-5
              after:h-5
              after:rounded-full
              after:transition-all
              peer-checked:after:translate-x-6
              "
            />
          </label>
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

export default SecuritySettings;