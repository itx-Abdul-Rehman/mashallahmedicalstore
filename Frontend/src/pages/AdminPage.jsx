import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import NavbarAdmin from "../components/NavbarAdmin";

export default function AdminPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-green-100 p-6">
        <NavbarAdmin isShowLogout={true}/>
      <div className="max-w-5xl mx-auto">
        <h1 className="mt-10 text-3xl font-bold text-green-600 mb-6 text-center">
          Admin Dashboard
        </h1>

        <button
          onClick={() => navigate("/admin/add")}
          className="mb-6 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-lg transition-all duration-300"
        >
          Add New Medicine
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <NavLink  to="/admin/manage">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center cursor-pointer hover:scale-105 transition-transform">
              <h2 className="font-bold text-lg text-green-600 mb-2">Manage Medicines</h2>
              <p className="text-gray-700">Edit or delete existing medicines.</p>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
