import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

 const handleLogout = async () => {
  try {
    await api.post("/auth/logout");

    logout();

    toast.success("Logged out successfully");

    navigate("/login");
  } catch (error) {
    toast.error("Logout failed");
  }
};

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold">
        Logout
      </h2>

      <p className="text-zinc-500">
        Are you sure you want to logout?
      </p>

      <button
        onClick={handleLogout}
        className="bg-primary text-white px-8 py-4 rounded-full hover:opacity-90 transition"
      >
        Yes, Logout
      </button>
    </div>
  );
};

export default Logout;