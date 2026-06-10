import { useState } from "react";
import toast from "react-hot-toast";

const Profile = () => {
  const [profileImage, setProfileImage] =
    useState(
      "https://i.pravatar.cc/300?img=12"
    );

  const [formData, setFormData] =
    useState({
      name: "Tejas Salunkhe",

      email:
        "admin@furniture.com",

      phone:
        "+91 9876543210",

      address:
        "Pune, Maharashtra",

      bio:
        "Managing Furniture Ecommerce Store",

      role:
        "Super Admin",

      joinedAt:
        "15 Jan 2025",

      facebook: "",

      instagram: "",

      linkedin: "",

      twitter: "",
    });

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

    setProfileImage(
      URL.createObjectURL(file)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success(
      "Profile updated successfully"
    );
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <div
        className="
        bg-white
        rounded-3xl
        border
        border-zinc-100
        p-6
        "
      >
        <div
          className="
          flex
          flex-col
          md:flex-row
          gap-6
          items-center
          "
        >
          <div className="relative">
            <img
              src={profileImage}
              alt=""
              className="
              w-32
              h-32
              rounded-full
              object-cover
              border-4
              border-primary/20
              "
            />

            <label
              className="
              absolute
              bottom-0
              right-0
              bg-primary
              text-white
              px-3
              py-1
              rounded-full
              text-xs
              cursor-pointer
              "
            >
              Edit

              <input
                type="file"
                accept="image/*"
                onChange={
                  handleImage
                }
                hidden
              />
            </label>
          </div>

          <div className="text-center md:text-left">
            <h1
              className="
              text-3xl
              font-bold
              "
            >
              {formData.name}
            </h1>

            <p className="text-zinc-500 mt-2">
              {formData.email}
            </p>

            <div
              className="
              flex
              flex-wrap
              gap-3
              mt-4
              justify-center
              md:justify-start
              "
            >
              <span
                className="
                px-4
                py-2
                rounded-full
                bg-primary/10
                text-primary
                text-sm
                "
              >
                {formData.role}
              </span>

              <span
                className="
                px-4
                py-2
                rounded-full
                bg-secondary
                text-sm
                "
              >
                Joined:
                {" "}
                {
                  formData.joinedAt
                }
              </span>
            </div>
          </div>
        </div>
      </div>

      <form
        onSubmit={
          handleSubmit
        }
        className="space-y-8"
      >
        {/* Personal Info */}

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
            Personal Information
          </h2>

          <div
            className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
            "
          >
            <div>
              <label className="block mb-2 font-medium">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={
                  formData.name
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

            <div>
              <label className="block mb-2 font-medium">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={
                  formData.email
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

            <div>
              <label className="block mb-2 font-medium">
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={
                  formData.phone
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

            <div>
              <label className="block mb-2 font-medium">
                Address
              </label>

              <input
                type="text"
                name="address"
                value={
                  formData.address
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

          <div className="mt-6">
            <label className="block mb-2 font-medium">
              Bio
            </label>

            <textarea
              rows={4}
              name="bio"
              value={
                formData.bio
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
              resize-none
              "
            />
          </div>
        </div>

        {/* Social Links */}

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
            Social Links
          </h2>

          <div
            className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
            "
          >
            {[
              "facebook",
              "instagram",
              "linkedin",
              "twitter",
            ].map((item) => (
              <div key={item}>
                <label className="block mb-2 font-medium capitalize">
                  {item}
                </label>

                <input
                  type="url"
                  name={item}
                  value={
                    formData[
                      item
                    ]
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
            ))}
          </div>
        </div>

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
          Save Changes
        </button>

      </form>
    </div>
  );
};

export default Profile;