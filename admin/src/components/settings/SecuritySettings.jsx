import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";

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
  const [loading, setLoading] =
    useState(false);

  const fetchSettings = async () => {
    try {

      const response =
        await api.get("/settings");

      const settings =
        response.data.settings;

      setFormData((prev) => ({
        ...prev,

        adminEmail:
          settings.adminEmail || "",

        twoFactorAuth:
          settings.twoFactorAuth || false,
      }));

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);
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

  const handleSubmit = async (e) => {

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

    try {

      setLoading(true);

      await api.put(
        "/settings",
        {
          adminEmail:
            formData.adminEmail,

          twoFactorAuth:
            formData.twoFactorAuth,
        }
      );

      if (
        formData.currentPassword &&
        formData.newPassword
      ) {

        await api.put(
          "/auth/change-password",
          {
            currentPassword:
              formData.currentPassword,

            newPassword:
              formData.newPassword,
          }
        );

      }

      toast.success(
        "Security Settings Updated Successfully"
      );

      setFormData((prev) => ({
        ...prev,

        currentPassword: "",

        newPassword: "",

        confirmPassword: "",
      }));

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Unable to update settings"
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

export default SecuritySettings;