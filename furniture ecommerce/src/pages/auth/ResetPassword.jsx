import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.password || !formData.confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const resetEmail = localStorage.getItem("resetEmail");
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((user) =>
      user.email === resetEmail
        ? { ...user, password: formData.password }
        : user
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    localStorage.removeItem("resetEmail");

    alert("Password reset successfully");

    navigate("/login");
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
            Set New Password
          </h1>

          <p className="text-zinc-500 text-lg mb-10">
            Must be at least 8 character
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Password */}
            <div>
              <label className="text-xl font-medium block mb-3">
                Password *
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                  className="w-full h-16 rounded-full px-7 border border-zinc-200 bg-white outline-none"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl text-primary"
                >
                  <i
                    className={
                      showPassword
                        ? "ri-eye-line"
                        : "ri-eye-off-line"
                    }
                  ></i>
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-xl font-medium block mb-3">
                Confirm Password *
              </label>

              <div className="relative">
                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter Password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full h-16 rounded-full px-7 border border-zinc-200 bg-white outline-none"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl text-primary"
                >
                  <i
                    className={
                      showConfirmPassword
                        ? "ri-eye-line"
                        : "ri-eye-off-line"
                    }
                  ></i>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-16 rounded-full bg-primary text-white text-xl font-medium hover:opacity-90 transition"
            >
              Reset Password
            </button>
          </form>
        </div>

        {/* RIGHT */}
        <div className="hidden lg:block h-[92vh] rounded-[32px] overflow-hidden">
          <img
            src="/public/images/reset-password.jpg"
            alt="reset password"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;