import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import Progress from "./Progress.jsx";
import { useState } from "react";

export default function NavbarAdmin({ isShowLogout }) {
  const navigate = useNavigate();
  const [isResponse, setIsResponse] = useState(true)

  const handleLogout = async () => {
    if (!isResponse) return;
    try {
      setIsResponse(false)
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/logout`, {
        method: "GET",
      });
      setIsResponse(true)
      const result = await response.json();

      if (!response.ok || !result.success) {
        toast.error(result.message || "Logout failed");
      }
      toast.success(result.message || "Logout successful");
      localStorage.removeItem("adminToken");
      setTimeout(() => {
        navigate("/admin/login");
      }, 1500);
    } catch (error) {
      toast.error("Logout failed");
    }
  };


  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <ToastContainer />
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-teal-500 text-transparent bg-clip-text cursor-pointer">
          Mashallah Medical Store
        </h1>

        {isShowLogout &&
          <>
            {isResponse ? (
              <FaSignOutAlt onClick={handleLogout} className="text-gray-600  hover:text-green-500 cursor-pointer" />
            ) : (<Progress />)}
          </>
        }
      </div>

    </nav>
  );
}
