import React, { useState, useEffect } from "react";
import MedicineCard from "../components/MedicineCard";
import { medicines } from "../Data/medicinesData.js";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import Pagination from "../components/Pagination.jsx";
import { toast, ToastContainer } from 'react-toastify';

export default function MedicinesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [medicinesData, setMedicinesData] = useState([]);
  const [totalMedicines, setTotalMedicines] = useState(0);
  const [lastDocId, setLastDocId] = useState(null);

  const categories = [
        "All",
        "Painkiller",
        "Antibiotic",
        "Muscle Relaxant",
        "Diabetes",
        "Acid Reducer",
        "Heart",
        "Anti-inflammatory",
        "Supplement",
        "Epilepsy/Anxiety",
    ];
  // Reset to first page if filters/search change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);


  useEffect(() => {
  const fetchData = async () => {
    try {
      const queryParams = new URLSearchParams({
        itemsPerPage: itemsPerPage,
        selectedCategory: selectedCategory,
        lastDocId: lastDocId
      });

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/get/medicines?${queryParams}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch medicines");
      }

      const result = await response.json();
      if (result.success) {
        setMedicinesData(result.medicines);
        setTotalMedicines(result.total);
        setLastDocId(result.lastVisibleId);
      }
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
}, [currentPage, itemsPerPage, selectedCategory]);


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
            className={`px-4 py-2 rounded-full font-medium transition-colors duration-300 ${selectedCategory === cat
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
        {medicinesData.length > 0 ? (
          medicinesData.map((med, idx) => (
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

      {/* Pagination */}
      <Pagination
        totalItems={totalMedicines}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}

      />

      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
}
