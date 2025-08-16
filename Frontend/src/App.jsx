import React, { useState, useEffect } from 'react';
import MedicineCard from './components/MedicineCard';
import Navbar from './components/Navbar';
import { Search } from 'lucide-react';
import SearchBar from './components/SearchBar';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import MedicineCardSkeleton from './components/MedicineCardSkeleton';


function App() {
  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [medicinesData, setMedicinesData] = useState([]);
  const [isResponse, setIsResponse] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams({
          page: 1,
          itemsPerPage: 5,
          selectedCategory: 'All',
          lastDocId: null
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
          setIsResponse(true);
          return
        }
        setIsResponse(true);
      } catch (error) {

      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen animated-bg bg-gradient-to-br from-blue-200 via-green-200 to-yellow-100 p-6">
      <Navbar />
      <SearchBar query={query} setQuery={setQuery} setSearchData={setSearchData} />
      <main className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        {isResponse ?(
        <>
          {query === "" ? (
            <>
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
                      price={med.price}
                    />
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600 col-span-full animate-pulse text-xl">
                  No medicines found.
                </p>
              )}
            </>

          ) : (
            <>
              {searchData.length > 0 ? (
                searchData.map((med, idx) => (
                  <div
                    key={idx}
                    className="transform hover:-translate-y-2 hover:scale-105 transition-transform duration-300"
                  >
                    <MedicineCard
                      name={med.name}
                      image={med.image}
                      description={med.description}
                      price={med.price}
                    />
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-600 col-span-full animate-pulse text-xl">
                  Nothing found for "{query}".
                  <hr className="border-t border-green-600 w-1/2 sm:w-1/3 md:w-1/4 mx-auto my-2" />
                </div>
              )}
            </>
          )}
        </>
        ):<MedicineCardSkeleton />}
      </main>
      <AboutUs />
      <Footer />
    </div>

  );
}

export default App;