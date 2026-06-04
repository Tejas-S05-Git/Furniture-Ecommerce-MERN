import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Please enter your email");
      return;
    }

    localStorage.setItem("resetEmail", email);

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
            Forgot Password?
          </h1>

          <p className="text-zinc-500 text-lg mb-10 max-w-md">
            Don’t worry, we’ll send you reset instructions.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">

            <div>
              <label className="text-xl font-medium block mb-3">
                Email *
              </label>

              <input
                type="email"
                placeholder="Enter Email Here"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full h-16 rounded-full px-7 border border-zinc-200 bg-white outline-none focus:border-primary transition"
              />
            </div>

            <button
              type="submit"
              className="w-full h-16 rounded-full bg-primary text-white text-xl font-medium hover:opacity-90 transition"
            >
              Submit
            </button>

            <p className="text-center text-lg text-zinc-600">
              Remember Password?{" "}
              <Link
                to="/login"
                className="text-primary underline font-medium"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>

        {/* RIGHT */}
        <div className="hidden lg:block h-[92vh] rounded-[32px] overflow-hidden">
          <img
            src="/public/images/forgot-password.jpg"
            alt="forgot password"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;