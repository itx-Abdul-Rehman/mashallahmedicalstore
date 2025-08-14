import React from "react";
import { NavLink } from "react-router-dom";

export default function NavbarAdmin() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-teal-500 text-transparent bg-clip-text cursor-pointer">
          Mashallah Medical Store
        </h1>
      </div>
    </nav>
  );
}
