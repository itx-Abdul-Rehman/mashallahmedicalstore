import React, { useState, useEffect } from 'react';
import MedicineCard from './components/MedicineCard';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import MedicineCardSkeleton from './components/MedicineCardSkeleton';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { setCartItem, clearCartItem } from "./redux/Cart/cartItemSlice.js";
import { setShowCart } from "./redux/Cart/showCartSlice.js";
import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [medicinesData, setMedicinesData] = useState([]);
  const [isResponse, setIsResponse] = useState(false);
  const [currentStep, setCurrentStep] = useState('cart')
  const [placedOrderResponse, setPlacedOrderResponse] = useState(true);
  const cartItems = useSelector((state) => state.cartItem.value);
  const showCart = useSelector((state) => state.showCart.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams({
          page: 1,
          itemsPerPage: 6,
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
    <div className="min-h-screen animated-bg bg-gradient-to-br from-blue-200 via-green-200 to-yellow-100 p-6">
      <Navbar />
      <ToastContainer />
      <SearchBar query={query} setQuery={setQuery} setSearchData={setSearchData} setIsResponse={setIsResponse} />
      <main className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
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
              </ >
            )}
          </>
        ) : <MedicineCardSkeleton />}
      </main>

      {(showCart && currentStep === 'cart') && (
        <Cart onAddMore={handleAddMore} onCloseCart={onCloseCart} onConfirmPayment={onConfirmPayment} />
      )}

      {(showCart && currentStep === 'checkout') && (
        <Checkout onPlaceOrder={onPlaceOrder} onBack={onBack}
          placedOrderResponse={placedOrderResponse} />
      )}

      <div className="text-center mt-8">
        <button onClick={() => { navigate("/medicines"); }}
          className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600'>Explore More</button>
      </div>
      <AboutUs />
      <Footer />
    </div>

  );
}

export default App;