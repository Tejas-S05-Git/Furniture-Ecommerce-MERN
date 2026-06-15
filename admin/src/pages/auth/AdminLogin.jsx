import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Eye,
    EyeOff,
    ShieldCheck,
} from "lucide-react";

import api from "../../services/api";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const AdminLogin = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [loading, setLoading] =
        useState(false);

    const [
        showPassword,
        setShowPassword,
    ] = useState(false);

    const [formData, setFormData] =
        useState({
            email: "",
            password: "",
            remember: true,
        });

    const handleChange = (e) => {
        const {
            name,
            value,
            checked,
            type,
        } = e.target;

        setFormData({
            ...formData,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const response =
                await api.post(
                    "/auth/login",
                    {
                        email: formData.email,
                        password: formData.password,
                    }
                );

            const user =
                response.data.user;

            if (
                user.role !== "admin" &&
                user.role !== "super_admin"
            ) {
                toast.error(
                    "Unauthorized Access"
                );

                return;
            }

            login(user);

            toast.success(
                `Welcome ${user.firstName || "Admin"
                }`
            );

            setTimeout(() => {
                if (
                    user.role ===
                    "super_admin"
                ) {
                    navigate(
                        "/sa/dashboard"
                    );
                } else {
                    navigate(
                        "/admin/dashboard"
                    );
                }
            }, 1000);

        } catch (error) {
            toast.error(
                error.response?.data
                    ?.message ||
                "Login Failed"
            );
        } finally {
            setLoading(false);
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
                            <span className="text-accent text-2xl font-bold">
                                A
                            </span>
                        </div>

                        <h1 className="text-2xl md:text-4xl font-bold text-zinc-800">
                            Admin<span className="text-accent">.</span>
                        </h1>
                    </Link>

                    <h1 className="text-5xl font-semibold mb-3">
                        Sign In
                    </h1>

                    <p className="text-zinc-500 text-lg mb-10">
                        Login to manage products, orders,
                        customers and store settings.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        <div>
                            <label className="text-xl font-medium block mb-3">
                                Email *
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                placeholder="Enter Email Address"
                                onChange={handleChange}
                                required
                                className="w-full h-16 rounded-full px-7 border border-zinc-200 bg-white outline-none"
                            />
                        </div>
                        <div>
                            <label className="text-xl font-medium block mb-3">
                                Password *
                            </label>

                            <div className="relative">
                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="password"
                                    value={formData.password}
                                    placeholder="Enter Password"
                                    onChange={handleChange}
                                    required
                                    className="w-full h-16 rounded-full px-7 border border-zinc-200 bg-white outline-none"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                    className="absolute right-6 top-1/2 -translate-y-1/2 text-primary"
                                >
                                    {showPassword ? (
                                        <EyeOff />
                                    ) : (
                                        <Eye />
                                    )}
                                </button>
                            </div>
                        </div>
                        <div
                            className="
                flex
                items-center
                justify-between
                "
                        >
                            <label
                                className="
                  flex
                  items-center
                  gap-2
                  "
                            >
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={
                                        formData.remember
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                                Remember Me
                            </label>

                            <Link
                                to="/forgot-password"
                                className="
                  text-primary
                  font-medium
                  "
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        <button
  disabled={loading}
  className="
  w-full
  h-16
  rounded-full
  bg-primary
  hover:opacity-90
  text-white
  text-xl
  font-medium
  disabled:opacity-60
  disabled:cursor-not-allowed
  "
>
  {loading
    ? "Signing In..."
    : "Sign In"}
</button>
                    </form>
                </div>

                {/* Right */}

                <div className="hidden lg:block h-[92vh] rounded-[32px] overflow-hidden">
                    <img
                        src="/images/login-banner.jpg"
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>





            </div>
        </section>

    )
};

export default AdminLogin;