import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const CompleteProfile = () => {
  const navigate = useNavigate();

  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    phone: "",
    gender: "",
    profileImage: "",
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);

      setPreview(imageUrl);

      setFormData({
        ...formData,
        profileImage: imageUrl,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentUser =
      JSON.parse(localStorage.getItem("currentUser")) || {};

    const updatedUser = {
      ...currentUser,
      ...formData,
    };

    localStorage.setItem(
      "currentUser",
      JSON.stringify(updatedUser)
    );

    navigate("/verify-code");
  };

  return (
    <section className="min-h-screen bg-secondary px-4 lg:px-10 py-6">
      <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-10 items-center min-h-screen">
        
        {/* LEFT */}
        <div className="max-w-[680px] w-full mx-auto">

          <Link
                       to="/"
                       className="flex items-center gap-3 mb-10"
                     >
                       <div className="w-[45px] h-[45px] rounded-full bg-primary flex items-center justify-center">
                         <span className="text-accent text-2xl font-bold">F</span>
                       </div>
         
                       <h1 className="text-2xl md:text-4xl font-bold text-zinc-800">
                         Furniture<span className="text-accent">.</span>
                       </h1>
                     </Link>

          <h1 className="text-5xl font-semibold mb-4">
            Complete Your Profile
          </h1>

          <p className="text-zinc-500 text-lg mb-10">
            Don’t worry, only you can see your personal data.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Upload */}
            <div>
              <label className="text-xl font-medium mb-4 block">
                Profile Photo (Optional)
              </label>

              <label className="w-52 h-52 border border-dashed border-zinc-300 rounded-3xl flex items-center justify-center cursor-pointer bg-white overflow-hidden">

                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center">
                    <i className="ri-image-add-line text-5xl text-zinc-400"></i>
                    <p className="text-zinc-400 mt-3 text-lg">
                      Browse Photo
                    </p>
                  </div>
                )}

                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>

            {/* Phone */}
            <div>
              <label className="text-xl font-medium mb-3 block">
                Phone *
              </label>

              <input
                type="text"
                placeholder="Enter Phone Number"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value,
                  })
                }
                className="w-full h-16 rounded-full px-7 border border-zinc-200 bg-white outline-none"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="text-xl font-medium mb-3 block">
                Gender *
              </label>

              <select
                value={formData.gender}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    gender: e.target.value,
                  })
                }
                className="w-full h-16 rounded-full px-7 border border-zinc-200 bg-white outline-none"
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <button className="w-full h-16 rounded-full bg-primary text-white text-xl font-medium hover:opacity-90 transition">
              Complete Profile
            </button>
          </form>
        </div>

        {/* RIGHT */}
        <div className="hidden lg:block h-[92vh] rounded-[32px] overflow-hidden">
          <img
            src="/public/images/complete-profile.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default CompleteProfile;