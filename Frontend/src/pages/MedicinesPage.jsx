import React, { useState } from "react";
import MedicineCard from "../components/MedicineCard"; 
import { medicines } from "../Data/medicinesData.js";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function MedicinesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Extract unique categories from medicines
  const categories = ["All", ...new Set(medicines.map((med) => med.category))];

  // Filter medicines based on search query & category
  const filteredMedicines = medicines.filter((med) => {
    const matchesSearch = med.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || med.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 p-6">
      <Navbar />
      {/* Page Title */}
      <h1 className="mt-10 text-3xl md:text-4xl font-bold text-green-600 mb-6 text-center animate-pulse">
        Our Medicines
      </h1>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-4">
        <input
          type="text"
          placeholder="Search for a medicine..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-4 focus:ring-green-400 transition-all duration-300 placeholder-gray-400 text-gray-700 shadow-md hover:scale-105"
        />
      </div>

      {/* Category Filters */}
      <div className="flex justify-center flex-wrap gap-4 mb-8">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full font-medium transition-colors duration-300 ${
              selectedCategory === cat
                ? "bg-green-500 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-green-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Medicines Grid */}
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredMedicines.length > 0 ? (
          filteredMedicines.map((med, idx) => (
            <div
              key={idx}
              className="transform hover:-translate-y-2 hover:scale-105 transition-transform duration-300"
            >
              <MedicineCard
                name={med.name}
                image={med.image}
                description={med.description}
              />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full animate-pulse text-xl">
            No medicines found.
          </p>
        )}
      </main>

      <div className="mt-10"> <Footer /></div>
     
    </div>
  );
}
