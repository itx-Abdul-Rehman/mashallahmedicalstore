import React, { useState, useEffect } from "react";
import MedicineCard from "../components/MedicineCard";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import Pagination from "../components/Pagination.jsx";
import SearchBar from "../components/SearchBar.jsx";
import MedicineCardSkeleton from "../components/MedicineCardSkeleton.jsx";
import { useSelector, useDispatch } from "react-redux";
import { setCartItem, clearCartItem } from "../redux/Cart/cartItemSlice.js";
import { setShowCart } from "../redux/Cart/showCartSlice.js";
import Cart from "../components/Cart.jsx";
import { useNavigate } from "react-router-dom";
import Checkout from "../components/Checkout.jsx";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MedicinesPage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [medicinesData, setMedicinesData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [totalMedicines, setTotalMedicines] = useState(0);
  const [lastDocId, setLastDocId] = useState(null);
  const [isResponse, setIsResponse] = useState(false);
  const [currentStep, setCurrentStep] = useState('cart')
  const [placedOrderResponse, setPlacedOrderResponse] = useState(true);
  const cartItems = useSelector((state) => state.cartItem.value);
  const showCart = useSelector((state) => state.showCart.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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


  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams({
          page: currentPage,
          itemsPerPage: itemsPerPage,
          selectedCategory: selectedCategory,
          lastDocId: lastDocId
        });

        setIsResponse(false)
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/get/medicines?${queryParams}`
        );

        if (!response.ok) {

        }

        const result = await response.json();
        if (result.success) {
          setMedicinesData(result.medicines);
          setTotalMedicines(result.total);
          setLastDocId(result.lastVisibleId);
          setIsResponse(true);
        }
        setIsResponse(true);
      } catch (error) {
        setIsResponse(true);
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage, selectedCategory]);

  const handleAddToCart = ({ id, name, image, option, price, quantity }) => {
    dispatch(setCartItem({ id, name, image, option, price, quantity }));

  }

  const handleAddMore = () => {
    dispatch(setShowCart(false));
    navigate('/medicines');
  }

  const onCloseCart = () => {
    dispatch(setShowCart(false));
  };

  const onConfirmPayment = () => {
    setCurrentStep('checkout')
  }

  const onPlaceOrder = async (orderDetails) => {
    try {
      setPlacedOrderResponse(false)
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/place-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
      });
      setPlacedOrderResponse(true);
      const result = await response.json();
      if (result.success) {
        dispatch(clearCartItem());
        dispatch(setShowCart(false));
        setCurrentStep('cart');
        toast.success(result.message || 'Order placed successfully');
      } else {
        toast.error(result.message || 'Failed to place order');
      }
    } catch (error) {
      toast.error('Failed to place order');
    }
  }

  const onBack = () => {
    setCurrentStep('cart')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 p-6">
      <Navbar />
      <ToastContainer />
      {/* Page Title */}
      <h1 className="mt-10 text-3xl md:text-4xl font-bold text-green-600 mb-6 text-center animate-pulse">
        Our Medicines
      </h1>

      {/* Search Bar */}
      <SearchBar query={query} setQuery={setQuery} setSearchData={setSearchData} setIsResponse={setIsResponse} />

      {/* Category Filters */}
      {query === "" && (
        <div className="mt-10 flex justify-center flex-wrap gap-4 mb-8">
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
      )}

      {/* Medicines Grid */}
      <main className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {isResponse ? (
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
                        id={med.id}
                        name={med.name}
                        image={med.image}
                        description={med.description}
                        price={med.price}
                        pricePerStrip={med.pricePerStrip}
                        onAddToCart={handleAddToCart}
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
                        id={med.id}
                        name={med.name}
                        image={med.image}
                        description={med.description}
                        price={med.price}
                        pricePerStrip={med.pricePerStrip}
                        onAddToCart={handleAddToCart}
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
        ) : (
          <MedicineCardSkeleton />
        )}
      </main>

      {(showCart && currentStep === 'cart') && (
        <Cart onAddMore={handleAddMore} onCloseCart={onCloseCart} onConfirmPayment={onConfirmPayment} />
      )}

      {(showCart && currentStep === 'checkout') && (
        <Checkout onPlaceOrder={onPlaceOrder} onBack={onBack} 
        placedOrderResponse={placedOrderResponse} />
      )}

      {/* Pagination */}
      {query === "" && (
        <Pagination
          totalItems={totalMedicines}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}

      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
}
