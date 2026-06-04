import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post(
      "/auth/register",
      formData
    );

    alert(response.data.message);

    navigate("/login");
  } catch (error) {
    alert(
      error.response?.data?.message ||
        "Registration Failed"
    );
  }
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

          <h1 className="text-5xl font-semibold mb-3">Sign Up</h1>

          <p className="text-zinc-500 text-lg mb-10">
            Fill your information below or register with your social account.
          </p>

          <form onSubmit={handleRegister} className="space-y-6">

            <div className="grid md:grid-cols-2 gap-5">
              <input
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
                className="w-full h-16 rounded-full px-7 border border-zinc-200"
              />

              <input
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
                className="w-full h-16 rounded-full px-7 border border-zinc-200"
              />
            </div>

            <input
              name="email"
              type="email"
              placeholder="Enter Email Address"
              onChange={handleChange}
              className="w-full h-16 rounded-full px-7 border border-zinc-200"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                onChange={handleChange}
                className="w-full h-16 rounded-full px-7 border border-zinc-200"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl text-primary"
              >
                <i className={showPassword ? "ri-eye-line" : "ri-eye-off-line"}></i>
              </button>
            </div>

            <button className="w-full h-16 rounded-full bg-primary text-white text-xl">
              Sign Up
            </button>

            <div className="text-center text-zinc-500">
              Already have an account?{" "}
              <Link to="/login" className="text-primary underline">
                Sign In
              </Link>
            </div>
          </form>
        </div>

        {/* RIGHT */}
        <div className="hidden lg:block h-[92vh] rounded-[32px] overflow-hidden">
          <img
            src="/public/images/register-banner.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Register;