import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

 const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post(
      "/auth/login",
      {
        email: formData.email,
        password: formData.password,
      }
    );

   login(response.data.user);

navigate("/my-account");

   
  } catch (error) {
    alert(
      error.response?.data?.message ||
        "Invalid Email or Password"
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

          <h1 className="text-5xl font-semibold mb-3">Sign In</h1>

          <p className="text-zinc-500 text-lg mb-10">
            Please fill your detail to access your account.
          </p>

          <form onSubmit={handleLogin} className="space-y-6">

            <div>
              <label className="text-xl font-medium block mb-3">Email *</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email Address"
                onChange={handleChange}
                className="w-full h-16 rounded-full px-7 border border-zinc-200 bg-white outline-none"
              />
            </div>

            <div>
              <label className="text-xl font-medium block mb-3">Password *</label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password"
                  onChange={handleChange}
                  className="w-full h-16 rounded-full px-7 border border-zinc-200 bg-white outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl text-primary"
                >
                  <i className={showPassword ? "ri-eye-line" : "ri-eye-off-line"}></i>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">

              <label className="flex items-center gap-3 text-lg">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                />
                Remember me
              </label>

              <Link
                to="/forgot-password"
                className="text-primary underline text-lg"
              >
                Forgot Password?
              </Link>
            </div>

            <button className="w-full h-16 rounded-full bg-primary hover:opacity-90 text-white text-xl font-medium">
              Sign In
            </button>

            <div className="text-center text-zinc-500">
              Don’t have an account?{" "}
              <Link to="/register" className="text-primary underline">
                Sign Up
              </Link>
            </div>
          </form>
        </div>

        {/* RIGHT */}
        <div className="hidden lg:block h-[92vh] rounded-[32px] overflow-hidden">
          <img
            src="/public/images/login-banner.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Login;